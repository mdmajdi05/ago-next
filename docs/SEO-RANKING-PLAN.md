# Ranking 52,465 catalogue rows — honest strategy and applied fixes

## 1. The honest answer

No supplier site can make 52,000 pages with a part number, a brand and one
component label rank in Google. Pages that add no information beyond the part
number are treated as thin programmatic pages, and Google's scaled-content
policy explicitly targets that pattern. Submitting more of them faster does not
change the outcome.

What *does* work:

1. **Every page must contain a real, distinct record.** We now preserve the
   original legacy description and extract dimensions, materials, models,
   standards, applications, ratings, quantities and cross-references when they
   genuinely exist. No specifications are invented.
2. **Concentrate authority on hub pages.** Category, type, brand and platform
   pages target the head terms. Product pages target long-tail part-number
   queries and link back to their hubs.
3. **Tier the catalogue for effort, not for exclusion.** Tier A/B pages get
   richer content, images and schema first. Tier C pages stay live and
   indexable, but should be enriched progressively with OEM data.
4. **Keep crawl budget under control.** A sitemap index now splits the
   catalogue into 10,000-URL files, and filtered URLs stay `noindex`.

## 2. What was fixed

| # | Problem | Fix | Where |
|---|---|---|---|
| 1 | 19 MB JSON imported as a JS module | Read the file from disk once at runtime, cache it, and include it in the standalone trace. It is no longer part of the webpack module graph. | `src/services/legacyCatalog.ts`, `next.config.ts` |
| 2 | 404 sends the whole catalogue | Only 140 suggestion products are serialised; full search stays on `/products`. | `src/app/not-found.tsx` |
| 3 | Sitemap above 50,000 URLs | `generateSitemaps()` writes seven chunks (routes + six product chunks of 10,000). `/sitemap.xml` is the sitemap index and lists every chunk; `/sitemap-index.xml` redirects to it. | `src/app/sitemap.ts`, `src/app/sitemap.xml/route.ts`, `next.config.ts`, `src/app/robots.ts` |
| 4 | 37k+ descriptions shared one appended template | The enrichment suffix is stripped at import and from the data file. Body copy is rebuilt from the original record plus real attributes, with 12 openers, 6 record leads, 6 context leads and 12 closers selected deterministically per part. | `src/services/productService.ts`, `src/lib/catalog/productContent.ts`, `scripts/clean-legacy-descriptions.mjs` |
| 5 | `/products` scanned 52k rows per request | Search text is computed once and stored as a non-enumerable property; brand/category/type filters use precomputed maps and avoid scanning; unfiltered pages slice directly. | `src/services/productService.ts` |
| 6 | Font Awesome CDN blocked rendering | Self-hosted WOFF2 files and a 2.7 KB icon subset generated from the classes actually used. No third-party CSS request. | `public/fonts/fa-subset.css`, `src/app/layout.tsx` |
| 7 | Docker standalone layout was wrong | Standalone output is copied to the runtime root, static files sit beside `server.js`, public files are copied to `public/`, with a health check. | `Dockerfile` |

Additional: ISR (`revalidate = 86400`) on product, category, type and brand
pages so the long tail is cached after its first render.

Legacy URLs: known legacy pages get a 301 in middleware; every other `.html`
URL (including all 52k imported part pages) is proxied to
`/legacy-redirect`, resolved against the product aliases and sent with a real
301 to `/products/{slug}`. Unknown `.html` files 301 to `/products`.

### Measured result

- `npm run build`: compile 7.2 s, 490 static pages, no type errors.
- `.next/server/app/page.js`: **78 KB** (was 20.6 MB).
- `legacy-catalog.json`: **14 MB** after stripping the template (was 18.9 MB).
- Sitemap: `/sitemap/0.xml` has 121 routes; product chunks 1–5 have 10,000
  URLs each and chunk 6 has 2,821 — every file is below the 50,000 limit.
- `scripts/clean-legacy-descriptions.mjs`: **41,167** descriptions changed,
  **3,940** stub-only descriptions emptied.
- Content test: all 52,465 rows have non-empty copy, unique meta descriptions,
  no old template and more than 400 distinct page skeletons.

## 3. Ranking plan

### Tier A — curated and high-value parts (~350)
- Full technical copy, extracted attributes, image, FAQ, Product schema.
- Linked from category/brand hubs and related-part blocks.
- Priority 0.8 in the sitemap.

### Tier B — real OEM one-liners and technical labels (~10,000)
- Original record text plus component-type context and all extracted data.
- Indexable, in the sitemap, linked from type/brand hubs.

### Tier C — part number + label only (~42,000)
- Live, indexable, searchable, with an honest "no specification held" note.
- In the sitemap with priority 0.6.
- Enrich progressively: add manufacturer datasheets, photos, cross-references
  and supersession data. Move rows to Tier B/A as real data arrives.

### Hubs to grow
- `/categories/[slug]` and `/categories/[slug]/[type]` for head terms.
- `/brands/[slug]` for brand + part-number queries.
- `/platforms/[slug]` for engine-model queries.
- `/part-numbers` for A–Z lookup queries.
- Add fitment/supersession tables only where source data supports them.

## 4. Content rules

- Never invent dimensions, materials, ratings, prices, availability or fitment.
- Preserve the source description verbatim (whitespace-normalised).
- Attributes are shown only when a regex finds them in the title, keywords or
  description.
- Every page states the part number in the opening and closing paragraph.
- Meta descriptions are unique and capped at 160 characters.
- The test suite checks all 52,465 rows for non-empty copy, unique metas,
  absence of the old template and at least 400 distinct page skeletons.

## 5. Verification

```bash
npx tsc --noEmit
npx vitest run
npm run build
```

After build:

```bash
grep -c "<url>" .next/server/app/sitemap/0.xml   # non-product routes
find .next/standalone -name legacy-catalog.json  # traced data file
du -h .next/server/app/page.js                   # should be far below 20 MB
```

Google Search Console: submit `/sitemap.xml`, then monitor
"Page indexing" for Crawled/Discovered-not-indexed. A falling duplicate count
and rising indexed count is the signal that the content change worked.
