# AGO Aviation — Deep Code, Performance & Scalability Audit

> Date: 2026-11-10
> Scope: full Next.js 15 app (`src/`), data layer, build pipeline, UI, SEO, Docker
> Method: static analysis, bundle inspection, runtime benchmarks, route audit

---

## 0. TL;DR — The 7 things actually hurting you

| # | Issue | Evidence | Severity |
|---|-------|----------|----------|
| 1 | **19 MB JSON catalogue is imported into the JS module graph** | `.next/server/app/page.js` = **20.6 MB**; `legacy-catalog.json` = **18.9 MB / 52,465 rows** | 🔴 P0 |
| 2 | **404 page sends the entire 52,821-product catalogue to the browser** | `not-found.tsx:37` → client payload **13.6 MB** | 🔴 P0 |
| 3 | **Sitemap has ~52,917 URLs — Google's limit is 50,000** | `sitemap.ts:95` | 🔴 P0 |
| 4 | **41,167 descriptions are the same sentence with only the part number changed** | "Genuine ABB {part} spare part for automation and controls. Request a quote…" | 🔴 P0 (SEO) |
| 5 | **`/products` is fully dynamic and filters 52k rows per request** | measured 28 ms brand filter + 48 ms full-text scan, per hit | 🟠 P1 |
| 6 | **160 KB of legacy CSS + 183 Font Awesome icons from a render-blocking CDN** | `globals.css` 76 KB + `home-sections.css` 84 KB, loaded on *every* route; `layout.tsx:84` | 🟠 P1 |
| 7 | **Dockerfile is broken for standalone output** (assets 404 in container) | see §7 | 🔴 P0 (deploy) |

Build cost baseline observed: **~20–25 min** production build, **466 MB** webpack cache, **17.2 s** just to boot the service module in tests.

---

## 1. Architecture map

```
src/
├─ app/                    24 route files (13 static + 11 dynamic)
│  ├─ page.tsx             homepage (419 lines, 294 of them commented dead code)
│  ├─ products/page.tsx    catalogue listing (655 lines, dynamic ƒ)
│  ├─ products/[slug]/     product detail (741 lines)
│  ├─ categories/[slug]/[type]/
│  ├─ brands/[slug]/       capped at 96 products
│  ├─ part-numbers/        A–Z index
│  ├─ platforms/[slug]/    21 model guides
│  └─ sitemap.ts / robots.ts
├─ components/             29 client components, 4,460 lines
│  ├─ home/                18 client components (whole homepage is client-side)
│  ├─ layout/              header (311 l), footer, floatBar
│  ├─ sections/            12 legacy components — mostly dead
│  └─ products/            catalog-filters
├─ services/               productService, brandService, categoryService
├─ lib/catalog/            taxonomy, classify, normalize, productContent, menu
├─ data/static/            products.json (133 KB) + legacy-catalog.json (18.9 MB)
└─ styles/                 globals.css (76 KB) + home-sections.css (84 KB) + contact-section.css (12 KB, dead)
```

Total app code: **24,132 lines** across 108 files. Data is **99.7%** of the repo weight.

---

## 2. P0 — Build & runtime killers

### 2.1 The 18.9 MB JSON is in the module graph

`src/services/productService.ts:1`
```ts
import legacyData from "@/data/static/products/legacy-catalog.json";
```

Then at module scope (`:175`):
```ts
const normalizedProducts: Product[] = buildCatalogue();
```

`buildCatalogue()` normalises **52,465 rows**: slug generation (NFKD + regex), alias arrays, taxonomy regex matching, duplicate-title map. That runs **once per Node worker**.

Consequences measured:

| Metric | Value |
|---|---|
| `legacy-catalog.json` on disk | 18.9 MB |
| `.next/server/app/page.js` | **20.6 MB** |
| `.next/cache/webpack` | **466 MB** |
| Vitest module "collect" time | **17.2 s** |
| Production build | **~20–25 min** |

Worse: `src/app/layout.tsx:10,16` imports `buildCatalogMenu()`, which imports `productService`. So the 19 MB is pulled into the **root server bundle for every route**, not just catalogue routes.

**Fix options**

| Option | Impact | Effort |
|---|---|---|
| Move to SQLite (`better-sqlite3`) + prepared statements, generated at build | bundle 20.6 MB → <1 MB, build minutes → seconds | 2–3 days |
| Keep JSON but load lazily via `fs.readFileSync` inside a memoised singleton, and never import it in `layout`/`menu` | bundle 20.6 MB → ~2 MB, ~60% build reduction | 0.5 day |
| Ship a **precomputed compact index** (only `slug, part, brand, category, type, title` in an NDJSON), drop aliases/derived fields from the runtime payload | file 18.9 MB → ~4–6 MB | 1 day |
| Reduce dataset itself (see §2.4) | 52k → 5–10k rows | 1–2 days |

Recommended: **lazy load + compact index now**, SQLite later.

### 2.2 404 page serialises 13.6 MB to the client

`src/app/not-found.tsx:37`
```ts
const products = productService.getAll().map(toExplorerProduct);
```
That array is passed as props to a `'use client'` component (`not-found-explorer.tsx`, 496 lines). React must serialise every field of every product into the RSC payload.

Measured payload: **52,821 entries / 13.6 MB uncompressed**. Every 404 (bots hit these constantly) pays this cost — memory, bandwidth, TTFB, and Googlebot crawl budget.

**Fix:** cap to ~150 products (`getFeatured(8)` + first N per category, or a lazy `/api/search` endpoint). Target payload **< 100 KB**. Effort: 2 hours.

### 2.3 Sitemap exceeds Google's 50,000-URL limit

Current output:

```
13 static + 9 categories + ~23 types + 30 brands + 21 platforms
+ 356 curated + 52,465 imported + 21 blog  ≈ 52,917 URLs
```

Google/Bing reject a single sitemap above **50,000 URLs / 50 MB**. You also put 52k auto-generated pages in one file with the same `lastmod`.

**Fix:** use `generateSitemaps()` (Next 15) to split into:
- `sitemap.xml` → index
- `sitemap/1.xml` → core pages + curated
- `sitemap/2.xml` … `sitemap/6.xml` → imported parts in chunks of 10k
- `sitemap/images.xml` → Tier A images only

Effort: half a day.

### 2.4 41,167 pages are near-duplicate thin content

Every short/empty description was replaced with a single template:

```
Genuine ABB 1MRS050209 spare part for automation and controls.
Request a quote for availability, condition and lead time from AGO Aviation.
```

Only `{brand}`, `{part}`, `{category}` change. That is **programmatic near-duplication at scale** — the exact pattern Google classifies as "Crawled – currently not indexed" / "Discovered – currently not indexed". It also contradicts the original goal ("no duplicate pages").

**Recommended tiering**

| Tier | Rows | Treatment |
|---|---|---|
| A — real specs/description/image | ~93 curated + a few hundred | `index, follow`, full schema, images |
| B — real OEM one-liner ("BEARING F4B-SCM-208") | ~10k | `index, follow`, unique generated copy per type |
| C — only part number + brand | ~42k | **`noindex, follow`**, excluded from sitemap, still reachable & searchable |

This alone fixes index bloat, cuts sitemap under the limit, and reduces build/output size massively. Effort: 1 day (a flag + sitemap filter; `classify.ts` already has the tier field).

### 2.5 Sitemap/route count vs. `dynamicParams`

`products/[slug]` prerenders only 355 slugs (`getStaticSlugs()`), rest are on-demand. That is correct, but **ISR/cache headers are missing**, so the first hit for each of 52k pages re-renders on the server. Add `export const revalidate = 86400` or `Cache-Control: s-maxage`, ideally `generateStaticParams` for Tier A/B only + ISR.

---

## 3. P1 — Performance & scalability

### 3.1 `search()` is O(n) per request with per-row string building

`productService.ts:348`

```ts
results = results.filter((product) => slugifyBrand(product.brand) === target);
// and
const haystack = [title, part, partNumber, brand, category, type, keywords, name, description]
  .join(" ").toLowerCase();
```

Benchmarked against the real 52k dataset:

| Operation | Time |
|---|---|
| brand filter (slugify per row) | **28.3 ms** |
| full-text scan (join + lowercase per row) | **48.3 ms** |
| both + render | ~80–120 ms per request |

`/products` is `ƒ (Dynamic)` — so this happens on **every single catalogue request**, single-threaded Node. Under load this is the first thing to fall over.

**Fix**
- Precompute `brandKey`, `searchKey` (lowercased haystack) **once** when building the catalogue.
- Replace `filter` chains with index lookups (`brandKeyMap`, `categoryTypeKeyMap` already exist).
- For search: build a MiniSearch/FlexSearch index at boot and query it (sub-ms).
- Cache the `/products` result set per query string.

Effort: 1 day. Expected: 80–120 ms → <10 ms.

### 3.2 Repeated full-array allocations

```ts
getAll()        → [...normalizedProducts]     // 52k copy per call
getIndexable()  → normalizedProducts.filter() // 52k new array per call
getAllSlugs()   → new Set + new array
```

Called by sitemap, part-numbers, not-found, menu. Make them module constants computed once (`const INDEXABLE = normalizedProducts.filter(...)`).

### 3.3 Brand/category pages cap at 96 with no pagination

`brands/[slug]`, `categories/[slug]`, `categories/[slug]/[type]` render `slice(0, 96)` then link to `/products?brand=…`. That filtered URL is **noindexed** (per `generateMetadata` in products page). So 96 of 37,047 GE parts are crawlable on the brand page, and the "view all" link goes to a noindex page. That is an internal-linking dead end.

**Fix:** implement `/brands/[slug]/page/[n]` (or `?page=` with `index,follow` + self-canonical) and link it. Keep the 96-cap only for the first page.

### 3.4 `getRelated` mixes types across categories

`typeKeyMap` is keyed by `typeSlug` only, so "bearings" from Turbine Parts can surface "bearings" from Compressors. Use the existing `categoryTypeKeyMap` for the first pass.

### 3.5 Middleware imports product JSON at the edge

`src/middleware.ts` imports `products.json` (133 KB), `brands.json`, `nav.json` and builds a redirect Map on every cold start. It also never covers the 52k imported parts (only 356 curated URLs). Move the redirect map to a generated `legacy-redirects.json` (already flattened) and import that — or better, generate a static redirect config.

**Coverage gap found:** **95 real legacy HTML pages** are not mapped and fall through to the blind `/products` 301, including:
- `category-seals-filters.html`, `category-electrical-motors.html`, `category-turbine-parts.html` (should map to their category)
- `index.html` (should map to `/`)
- `About.html`, `Disclaimer.html`, `blog.html`
- ~60 real product pages (e.g. `ABB-POSITIONER-V18345-1020521001.html`, `314A5266P001-VALVE-GE-GAS-TURBINE-SPARE-PARTS.html`)

Low SEO value lost, but easy to fix by generating the map from the legacy folder instead of hand-maintaining it.

### 3.6 CSS shipped globally (160 KB raw)

`layout.tsx:13-14` imports `globals.css` (76 KB, 4,122 lines) and `home-sections.css` (84 KB, 3,254 lines) on **every** route.

- `home-sections.css` is 647 `.home-page` selectors that only ever apply to the homepage.
- `contact-section.css` (12 KB) is imported **only** by `components/sections/ContactSection.tsx`, which is **dead** → the file is dead too.
- Compiled CSS payload: 240 KB.

**Fix:** move `home-sections.css` import into the homepage route (or a `home.css` imported by `app/page.tsx`), delete `contact-section.css`, and split `globals.css` into tokens/base/layout. Expected saving: **~60–70% CSS on every non-home page**.

### 3.7 Font Awesome CDN is render-blocking

`layout.tsx:84`
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
```
183 `<i className="fa-solid …">` usages. That is a third-party CSS + webfont request in the critical path, on every page, for icons that could be inline SVG.

**Fix:** npm `@fortawesome` tree-shaken subset, or replace the ~15 distinct icons with inline SVGs. Expected LCP improvement: 200–500 ms on mobile.

### 3.8 Images

- **17 raw `<img>` vs 11 `next/image`** — raw images are unoptimised, no width/height → CLS.
- **18 duplicate image files** between `public/images` and `public/assets/img` (e.g. `alstom.png` 687 KB twice, `cta-bg.png` 522 KB twice). **~3.4 MB of pure duplication.**
- `public/images/alstom.png` **687 KB** PNG — should be WebP/AVIF at ~30 KB.
- `next.config.ts` still uses the deprecated `images.domains` (Next 15 warning); `remotePatterns` already covers it.

### 3.9 Homepage is 18 client components

All of `components/home/*` (except `HomePage.tsx`, which is dead) start with `"use client"`, even pure-static markup like `BrandsSection`, `IndustriesSection`, `CertificationsSection`. That means:

- 18 hydration boundaries
- banner/marquee/counter/hero-slider JS on first load
- `<PageSplash>` overlays the screen for **600 ms** (or until `load`), then animates out — this directly delays LCP and looks like a stall on slow connections

**Fix:** only `HomePageEffects` (and the splash) need `"use client"`. Make the rest server components. Remove the splash or make it a CSS-only 150 ms fade.

---

## 4. P1 — Dead code & duplication (safe deletions)

My importer/usage analysis (verified with grep, relative imports included):

| File | Lines | Status |
|---|---|---|
| `src/components/home/HomePage.tsx` | 45 | **dead** — `/` uses `app/page.tsx` |
| `src/components/home/SiteHeader.tsx` | 443 | **dead** — duplicate of `layout/header.tsx` |
| `src/components/home/SiteFooter.tsx` | 371 | **dead** — duplicate of `layout/footer.tsx` |
| `src/components/home/Topbar.tsx` | 4.4 KB | dead (header uses `layout/topBar.tsx`) |
| `src/components/layout/megaMenu.tsx` | 48 | dead — logic inlined in header |
| `src/components/layout/mobileMenu.tsx` | 136 | dead — logic inlined in header |
| `src/components/sections/*` (11 of 13) | ~950 | dead (`aboutBlock`, `productGrid`, `stats`, `aboutFrame`, `hero`, `brandMarquee`, `howWeWorkSection`, `materialsSection`, `serviceSection`, `whyUsSection`, `faqSection`, `ContactSection`, `aboutIntro` only used by nothing) |
| `src/styles/contact-section.css` | 448 | dead (only imported by dead component) |
| `src/app/products/[slug]/EnquiryForm.tsx` | 213 | dead (page uses inline form) |
| `src/config/navigation.ts` | 121 | dead |
| `src/types/enquiry.ts`, `src/types/index.ts` | 13 | dead |
| `src/app/page.tsx` lines ~125–419 | **294** | commented-out old homepage |
| `src/lib/performance.ts` | — | not imported anywhere |

Total removable: **~2,500+ lines** and one dead 12 KB stylesheet. Also `src/components/ui/badge.tsx` and `card.tsx` are barely referenced — audit before keeping.

### Unused npm dependencies

Verified zero imports:

```
motion                    (0 imports)
lucide-react              (0 imports)
@radix-ui/react-dialog    (0 imports)
@radix-ui/react-dropdown-menu (0 imports)
```

Removing these cuts install time and audit surface. (`web-vitals` **is** used by `components/sections/web-vitals.tsx`.)

### Stale copy / hardcoded numbers

The catalogue now has 52,821 products, but copy still says:

- `app/page.tsx:25` — "350+ part numbers … 20 more brands"
- `app/products/page.tsx:66` — "350+ … across 23 brands"
- `app/part-numbers/page.tsx:10` — "Search 350+ …"
- `app/platforms/[slug]/page.tsx:350` — "350+ part numbers"

These are now factually wrong (and Google may treat them as misleading). Either compute from the service or say "50,000+".

---

## 5. UI / UX clutter — concrete findings

### 5.1 Homepage
1. **Splash screen** covers the page for 600 ms — no content is visible on first paint → bad LCP/CLS and feels slow.
2. **14 sections**, each individually wrapped in `<div className="home-page w-full">` even though `document.body` also gets `.home-page`. Redundant DOM + confusing CSS scoping.
3. **Hero slider** carries full autoplay/dot/mouse logic for exactly **one** slide (`HeroSection.tsx`).
4. **BrandsSection marquee** duplicates the entire brand list twice (`aria-hidden` copy) and links to `?search=` URLs that are **noindexed** — the links send users and bots to non-indexable pages. Several brands linked this way (Rolls-Royce, Solar, Alstom, Ansaldo, Zorya) **do not exist** in `brands.json`, so they are dead ends.
5. **Stat counters** animate from 0 — the number is unreadable until JS runs (need a static fallback).
6. **Duplicate contact affordances**: FloatBar, header CTA, hero CTA, CTA banner, contact section, footer — 6 competing "contact us" paths on one page.

### 5.2 `/products`
1. **500 px hero** sits above the catalogue — on mobile users scroll a full screen before seeing a single product.
2. Three-column desktop layout: filters (240–288 px) + listing + **quote card (365 px)**. At 1024–1280 px the listing is squeezed to ~400 px (2 cards), while the quote card gets 365 px.
3. Filters are a `<form method="GET">` with a full page reload per change (`onChange={submit}`) — no instant feedback, scroll jumps to top.
4. The brand `<select>` lists 30 brands; the category `<select>` lists 9 — fine, but there is **no active-filter chip / clear-all**, so after 3 filters the user cannot see what is applied.
5. Pagination is now windowed (good) but there is **no "jump to page"** and no result count near the controls.

### 5.3 Header
- One 311-line component implements **two menus** (desktop hover mega panel + mobile accordion), with duplicated link rendering.
- Desktop mega menu opens on `group-hover` / `focus-within` only — awkward on touch laptops.
- The header receives the **entire catalogue menu** (`buildCatalogMenu()` output) as props on every page.

### 5.4 404
- Excellent content, but as noted it ships 13.6 MB. Also the page is **pre-rendered**, so that payload is baked into `_not-found` output.
- Uses Font Awesome `<i>` icons, so if the CDN is blocked the icons vanish entirely.

### 5.5 Styling hygiene
- **451** arbitrary Tailwind values (`[#062a43]`, `[39px]`, …) — hard to theme, and a sign the legacy CSS was ported 1:1.
- **17** inline `style={{…}}` blocks.
- Two parallel styling systems: Tailwind utilities + 160 KB of hand-written CSS with `.home-page` prefixes.
- `h-[500px]` hero and fixed pixel typography (`text-[39px]`) break at intermediate widths.

---

## 6. SEO issues still open

| Issue | Status | Fix |
|---|---|---|
| Sitemap > 50k URLs | 🔴 broken | sitemap index (§2.3) |
| 42k thin/duplicate descriptions | 🔴 risk | tiering + noindex (§2.4) |
| "350+" stale copy in metadata | 🟠 | compute counts |
| 51 duplicate raw titles | 🟡 handled by `displayTitle` + unique page title | verify listings show `displayTitle` |
| Brand marquee → noindex `?search=` links | 🟠 | link to brand/category pages |
| 95 legacy pages → blind `/products` 301 | 🟡 | generate redirect map |
| Category/brand pages cap at 96, no page 2 | 🟠 | paginated, indexable pages |
| `images.domains` deprecated | 🟡 | remove, keep `remotePatterns` |
| No `llms.txt` content check | 🟡 | file exists (8 KB) — validate |
| No `hreflang` (single locale) | ✅ n/a | — |
| Canonicals / JSON-LD | ✅ verified previously (458 URLs) | re-run after changes |

---

## 7. Docker / deployment

`Dockerfile` — current runtime stage:

```dockerfile
COPY --from=builder /app/.next/standalone ./.next/standalone
COPY --from=builder /app/.next/static ./.next/static
CMD ["node", ".next/standalone/server.js"]
```

This is **not** how Next standalone works. `server.js` resolves `.next/static` and `public` **relative to its own directory**. The correct layout is:

```dockerfile
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
CMD ["node", "server.js"]
```

As written, the container will boot but every `/_next/static/*` and `/public/*` asset will **404** (broken CSS/JS/images in production).

Other Docker notes:
- `NEXT_PUBLIC_*` values are inlined at **build** time; the Dockerfile passes none. Add `ARG`/`ENV` before `RUN npm run build` or use runtime env for non-public values.
- `next.config.ts` is copied but never used by the standalone server — harmless, remove.
- No `HEALTHCHECK`, no `output: 'standalone'` verification step.
- `node:20-alpine` + Next 15 image optimisation needs `sharp`; add `sharp` to deps for production image optimisation on Alpine.

---

## 8. Tooling / project hygiene

| Item | Finding |
|---|---|
| ESLint | **no config file**, but `npm run lint` exists → `next lint` in Next 15 prompts interactively and fails in CI |
| CI | none (no `.github/workflows`) — no typecheck/build gate on push |
| Tests | 34 tests pass, but boot alone is 17 s because of the 52k dataset |
| README | missing |
| `TODO.md`, `docs/`, `prompt/prompt.md` | committed to the repo (fine, but `prompt/` looks like scratch) |
| `tsconfig` target | `ES2017` — raise to `ES2022` to reduce transpilation |
| Node version | no `.nvmrc` / `engines` — local is v26, Docker is v20 (mismatch risk) |
| Env | `.env.local` present locally; no runtime validation (`zod`) |
| `tsconfig.tsbuildinfo` | not gitignored? (it is gitignored via `*.tsbuildinfo`) ✅ |

---

## 9. Prioritised action plan

### Week 1 — unblock build + deploy (P0)
1. **Fix Dockerfile** standalone layout (30 min) ← blocks production
2. **Cap the 404 payload** to ~150 products (2 h)
3. **Sitemap index** split ≤ 10k URLs each (4 h)
4. **Lazy-load the catalogue** (`fs` + memoised singleton; remove `productService` from `layout`/`menu`) (4 h)
5. **Fix stale "350+" copy** (30 min)
6. **Remove 4 unused deps** (15 min)

Expected: build **20 min → ~8–10 min**, server bundle **20.6 MB → ~3 MB**, 404 **13.6 MB → <100 KB**.

### Week 2 — SEO integrity + runtime speed (P1)
7. **Tier A/B/C + `noindex` for Tier C**, sitemap only A/B (1 day)
8. **Precompute search keys + brand keys**, index-based filtering (1 day)
9. **Paginated brand/category pages** that are indexable (1 day)
10. **Generate legacy redirect map** from the legacy folder (4 h)
11. Remove dead code + dead CSS (~2,500 lines) (half day)

Expected: `/products` 80–120 ms → <10 ms; index bloat removed; CSS payload −60%.

### Week 3 — Core Web Vitals + UI (P1/P2)
12. Move `home-sections.css` to the homepage only; delete `contact-section.css` (2 h)
13. Replace Font Awesome CDN with tree-shaken icons/inline SVG (half day)
14. Convert static homepage sections to server components (half day)
15. Remove/defer splash screen (1 h)
16. `next/image` everywhere + delete 18 duplicate images + convert 687 KB PNGs (half day)
17. Products page layout fix: shrink hero, move quote card below listing on ≤1280 px, add active-filter chips + clear-all (1 day)

### Week 4 — scale (P2)
18. Move catalogue to SQLite/Postgres + FlexSearch index (2–3 days)
19. ISR/cache headers on product routes (half day)
20. CI: typecheck + build + lighthouse budget; add ESLint flat config (half day)

---

## 10. What is actually good (don't break it)

- Centralised `seo.ts` metadata/JSON-LD and self-canonicals — previously audited clean (458/458 URLs).
- `classify.ts` already has the `tier` field needed for the indexing fix.
- `brandService.getGroups()` now derives from `brands.json` — no orphan brand pages.
- Slug collision handling (`-2`, `-3`) is correct.
- Windowed pagination is correct.
- Legacy redirect model (apex → www, case normalisation, `.html` fallback) is sound — just needs a generated map.
- Typed services with tests; `tsc --noEmit` clean.

---

## 11. Metrics to watch after fixes

| Metric | Now | Target |
|---|---|---|
| Production build | ~20–25 min | < 5 min |
| `page.js` server bundle | 20.6 MB | < 2 MB |
| 404 RSC payload | 13.6 MB | < 100 KB |
| `/products` TTFB (search) | 80–120 ms | < 30 ms |
| CSS on non-home pages | ~240 KB | < 80 KB |
| Sitemap URLs per file | 52,917 | ≤ 10,000 |
| Indexable product pages | 52,821 | ~8–12k (tiered) |
| Client components on `/` | 18 | ≤ 3 |
| Duplicate public images | 18 files / 3.4 MB | 0 |

---

*Report generated from live measurements on the current `main` (commit `03e609e`).*
