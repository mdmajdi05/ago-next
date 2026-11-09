# AGO AVIATION — Implementation Tracker
> Master Plan 2026 | Tracking from 2026-11-07
> Status: `⏳` Pending | `🔄` In Progress | `✅` Done | `❌` Blocked

## Phase 0 — Audit ✅ DONE
- [x] Complete codebase audit (Next.js, Tailwind, services, catalog)
- [x] SEO metadata audit (canonical, OG, schema, sitemap, robots)
- [x] 5 original issues verified independently
- [x] Risk assessment + implementation strategy documented

## Phase 1 — Emergency Technical SEO Fixes
- [x] **P1.1** Fix `SiteHeader.tsx` search param: `name="q"` → `name="search"` (matches `products/page.tsx` SearchParams)
- [x] **P1.2** Standardize hardcoded `https://www.agoaviation.com` → `siteConfig.url` in brand/category OG URLs
- [x] **P1.3** Fix sitemap `lastmod`: replace single `new Date()` with per-entity file mtimes
- [x] **P1.4** Noindex filtered URL variants: when `?search/brand/category/type` present, set `robots: noindex` in `/products` generateMetadata
- [x] **P1.5** Build validation: `npx tsc --noEmit` (clean) + `npm run test` (34/34 pass; `next lint` deprecated — prompts for interactive setup, needs `ESLINT_CONFIG` non-interactive migration)

## Phase 2 — Product Catalog Architecture
- [ ] **P2.1** Audit 82 ambiguous records + 17 generic part numbers — triage report (individual review, no auto-delete)
- [ ] **P2.2** Data validation pipeline: duplicate slug detection, missing-field warnings in build
- [ ] **P2.3** Quality scoring review: Tier A (93 priority parts) content plan
- [ ] **P2.4** Image fallback audit: verify product image mapping (`getProductImage`)

## Phase 3 — Taxonomy & URL Architecture
- [ ] **P3.1** Freeze URL structure: `/products/[slug]`, `/categories/[slug]/[type]`, `/brands/[slug]`
- [ ] **P3.2** Legacy redirect mapping audit (middleware `.html` + uppercase handling)
- [ ] **P3.3** Subcategory rule enforcement: `MIN_PRODUCTS_PER_TYPE_PAGE = 3`

## Phase 4 — Product Page SEO & Content
- [ ] **P4.1** Unique metadata templates per product (title/description from brand+part+type)
- [ ] **P4.2** Structured content templates for Tier B products (verified fields only, no fabrication)
- [ ] **P4.3** Tier A content enrichment (93 priority parts) — descriptions, specs, FAQs
- [ ] **P4.4** Breadcrumb + related products + enquiry form verification

## Phase 5 — Brand & Category Pages
- [ ] **P5.1** Unique title/description per brand & category page
- [ ] **P5.2** Category intro content (150-300 words, useful not filler)
- [ ] **P5.3** Internal linking: brand ↔ category ↔ product type ↔ product

## Phase 6 — UI/UX Improvements (no redesign)
- [ ] **P6.1** Consolidate dual headers (`SiteHeader.tsx` + `layout/header.tsx`) — single implementation
- [ ] **P6.2** Search UX: no-results state, exact part match, keyboard nav, mobile search
- [ ] **P6.3** Product listing: filter chips, clear-all, active filters consistency
- [ ] **P6.4** Responsive QA at 320/375/390/768/1024/1280/1440px

## Phase 7 — Advanced Technical SEO
- [ ] **P7.1** Metadata architecture: centralize helper, per-route overrides
- [ ] **P7.2** JSON-LD validation: Organization, WebSite, BreadcrumbList, Product, FAQPage
- [ ] **P7.3** Open Graph + Twitter coverage on all page types
- [ ] **P7.4** Remove stray `as unknown as string[]` casts on keywords (layout.tsx:87, page.tsx:24)

## Phase 8 — GEO / AEO / AI Search
- [ ] **P8.1** Clear headings, direct answers, entity consistency (AGO Aviation, brands, part numbers)
- [ ] **P8.2** AI-readable HTML: no critical content hidden in JS-only tabs
- [ ] **P8.3** Optional `llms.txt` (not a Google ranking factor)

## Phase 9 — Performance & Core Web Vitals
- [ ] **P9.1** Defer Font Awesome CDN (render-blocking) — `layout.tsx:137-140`
- [ ] **P9.2** Remove dead commented-out homepage (`page.tsx:75-370`) — git history preserves it
- [ ] **P9.3** Audit `motion` library usage; code-split heavy components
- [ ] **P9.4** Deduplicate CSS (home-sections.css 81KB + SiteHeader/SiteFooter inline styles)
- [ ] **P9.5** Lighthouse baseline: mobile + desktop (Performance, A11y, SEO targets)

## Phase 10 — CRO (Quote Conversions)
- [ ] **P10.1** Product-specific enquiry: part number + brand auto-filled in form
- [ ] **P10.2** Form validation, success/error states, accessibility audit
- [ ] **P10.3** Analytics: track product views, search, quote clicks, form submissions (GA4)

## Phase 11 — Security & Code Quality
- [ ] **P11.1** Security headers: add CSP (navigate to production draft, not blocking)
- [ ] **P11.2** Env var review: GA/GTM fallback IDs rotation plan
- [ ] **P11.3** Dependency vulnerability audit (`npm audit`)

## Phase 12 — Testing & QA
- [ ] **P12.1** Lint + TypeScript + Vitest full run
- [ ] **P12.2** SEO validation checklist: canonicals, H1, robots, sitemap, redirects
- [ ] **P12.3** Browser QA: Chrome + Safari mobile/desktop
- [ ] **P12.4** Sitemap/crawl diff baseline vs post-change

## Phase 13 — Deployment & Rollback
- [ ] **P13.1** Staging deploy + SEO/UI QA
- [ ] **P13.2** Redirect + canonical + sitemap verification
- [ ] **P13.3** Rollback plan documented
- [ ] **P13.4** Post-deploy: sitemap resubmit, URL inspection, monitoring

## Phase 14 — GSC & Monitoring (post-deploy)
- [ ] **P14.1** Submit sitemap, verify canonical selection
- [ ] **P14.2** Track KPI dashboard: canonical errors, broken links, impressions, clicks, quotes
- [ ] **P14.3** Core Web Vitals field data monitoring

## Change Log
| Date | Phase | Files Changed | Issue Resolved | Tests |
|---|---|---|---|---|
| 2026-11-07 | Phase 0 | — (audit only) | All findings verified | — |
| | Phase 1 | | | |

## Notes
- No pricing/checkout/cart introduced — business is quote-based per guardrails
- No product identity changed without verification
- No URL changes without redirect mapping
