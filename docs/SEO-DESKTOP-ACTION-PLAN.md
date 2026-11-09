# Search Console performance analysis and desktop action plan

Source: `https___www.agoaviation.com_-Performance-on-Search-2026-11-09.xlsx`
Property: `https://www.agoaviation.com/`
Search type: Web (text-based)
Date range: last 6 months (2026-05-08 to 2026-11-07)

## 1. Headline numbers

| Device | Clicks | Impressions | CTR | Avg. position |
| --- | ---: | ---: | ---: | ---: |
| Desktop | 968 | 73,783 | 1.31% | 52.15 |
| Mobile | 127 | 2,059 | 6.17% | 7.81 |
| Tablet | 0 | 22 | 0.00% | 12.55 |

Desktop is **97.3% of impressions** and **88.4% of clicks**. Mobile has a much
better CTR because it only appears for a small set of strong brand queries, not
because the mobile experience is doing more work. Any serious growth plan has to
start with desktop.

## 2. The decisive finding: the site is a part-number catalogue

| Query type | Queries | Impressions | Clicks |
| --- | ---: | ---: | ---: |
| Part-number-like queries | 653 | 60,531 | 34 |
| Brand / generic queries | 187 | 954 | 226 |

**98.4% of all impressions are exact part-number searches.** Examples from the
export: `l61813g01` (440 impressions), `ds3800npsm` (854), `ds3820pimb1a1b`
(746), `l44920p01` (266), `1704m63g15` (141), `as1895/23-125` (155),
`330180-90-05` (145).

The same queries produce almost no clicks because most rank between position 41
and 100:

| Position band | Queries | Impressions | Clicks | CTR |
| --- | ---: | ---: | ---: | ---: |
| 1-3 | 52 | 390 | 221 | 56.7% |
| 4-10 | 34 | 52 | 2 | 3.8% |
| 11-20 | 30 | 2,539 | 8 | 0.3% |
| 21-40 | 65 | 2,648 | 8 | 0.3% |
| 41-60 | 215 | 16,301 | 11 | 0.1% |
| 61-100 | 409 | 36,010 | 7 | 0.02% |

The business already owns the demand. The job is to move part-number pages from
page 5-10 of Google onto page 1, and to make the snippet worth clicking.

## 3. Legacy page performance

The two legacy `.html` landing pages carried almost all of the old visibility:

| Legacy URL | Clicks | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| `/ge-turbine.html` | 323 | 49,142 | 0.66% | 55.58 |
| `/turbine-Parts.html` | 203 | 26,314 | 0.77% | 53.94 |
| `/ge-frame 5 6 7 9.html` | 61 | 821 | 7.43% | 8.43 |
| `/rolls-royce.html` | 22 | 265 | 8.30% | 27.28 |
| `/siemens.html` | 18 | 228 | 7.89% | 33.35 |
| `/zorya-mashproekt.html` | 17 | 347 | 4.90% | 11.18 |
| `/lm6000-spare-parts.html` | 14 | 123 | 11.38% | 12.00 |
| `/solar-turbines.html` | 8 | 345 | 2.32% | 8.10 |
| `/alstom.html` | 7 | 241 | 2.90% | 43.34 |

These URLs are now 301-redirected. The redirect targets matter: sending a
high-impression platform page to a generic catalogue wastes the relevance it
earned. The redirect map now points model-specific legacy URLs at the matching
platform guide (for example `lm6000-spare-parts.html` →
`/platforms/ge-lm6000` and `gt13e2-gt8c1-2-parts-catalog.html` →
`/platforms/alstom-gt13e2`).

## 4. Desktop geography

| Country | Clicks | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| India | 377 | 2,684 | 14.05% | 11.48 |
| United States | 78 | 55,737 | 0.14% | 59.33 |
| United Arab Emirates | 53 | 647 | 8.19% | 11.55 |
| Italy | 48 | 855 | 5.61% | 28.41 |
| Iran | 46 | 325 | 14.15% | 10.44 |
| Netherlands | 26 | 5,391 | 0.48% | 60.56 |
| Saudi Arabia | 11 | 582 | 1.89% | 27.88 |
| Croatia | 0 | 605 | 0.00% | 40.16 |
| Qatar | 0 | 488 | 0.00% | 36.19 |

The United States alone is **55,737 impressions for 78 clicks**. The Netherlands
is 5,391 impressions for 26 clicks. These are desktop-heavy industrial buyers
searching part numbers; the pages exist but rank too low to be seen.

## 5. What was added or changed in the site

### 5.1 Every catalogue page is self-canonical

- Product, category, type, brand, blog and static pages already emit a
  self-referencing canonical through `buildPageMetadata`.
- `/products` pagination now canonicalises page 1 to `/products` and pages 2..N
  to their own `?page=N` URL (plus `limit` only when it is not the default), so
  paginated inventory is not folded into page 1.
- Filtered and search URLs remain `noindex, follow` so they cannot create
  duplicate-content clusters.

### 5.2 New platform and model guides

Added 21 unique, indexable guides under `/platforms`:

- GE Frame 5, 6 (6B/6FA), 7 (7EA) and 9 (9E)
- GE LM2500, LM5000, LM6000, LM1600 and MS5002D
- Alstom GT11, GT13E2 and GT26
- Siemens SGT-400, SGT-700/800 and SGT-A05
- Rolls-Royce Avon, Zorya-Mashproekt and Solar Turbines
- Bently Nevada 3300/3500, GE Mark IV/V and Woodward controls

Each guide has:

- a unique meta title and description,
- 2-3 paragraphs of platform-specific content,
- the part families normally sourced for that platform,
- a verification-before-quote section,
- platform-specific FAQs with `FAQPage` schema,
- `BreadcrumbList` and `CollectionPage` schema,
- internal links to relevant category, brand and product pages,
- a direct quote CTA (email and WhatsApp).

### 5.3 Internal linking

- Header, mobile menu and footer now link to `/platforms`.
- The home page "Frame & Stage" section links to the eight highest-value
  platform guides.
- Product pages show a "Gas turbine platform guides" block based on the brand,
  linking back into the platform section.
- Platform pages link to related brands, part families and related platforms.
- The blog post `ge-frame-5-6-7-9` remains the editorial version of the same
  query cluster.

### 5.4 Sitemap and AI discovery

- `/platforms` and all 21 platform pages are in `sitemap.xml`.
- `public/llms.txt` now lists every platform guide so AI and answer engines can
  cite the correct page.
- Organization, WebSite, Product, CollectionPage, BreadcrumbList, FAQPage,
  Article and Service schema are all emitted from `src/lib/seo.ts`.

### 5.5 Legacy redirects

- High-impression legacy platform pages now 301 to the most relevant platform
  guide instead of a generic catalogue page.
- All remaining `.html` URLs 301 to `/products` as a safe fallback.
- Apex → `www` and mixed-case path redirects remain in place.

## 6. What to do next (desktop-first)

1. **Request indexing in Search Console** for the 21 platform URLs and the top
   20 part-number pages by impressions.
2. **Rewrite the highest-impression part pages first.** Priority list from the
   export: `ds3800npsm`, `ds3820pimb1a1b`, `ds3800hvdb1k1g`, `l43450p01`,
   `l35166p02`, `l59035p01`, `l57367p01`, `l57378p01`, `l59032p01`.
3. **Add real datasheet content where available.** Part pages rank best when the
   page includes dimensions, material, OEM reference, supersession notes and a
   clear quote path. Do not invent specifications.
4. **Build model-specific part lists.** Link each platform guide to the actual
   part numbers that belong to it once the mapping is confirmed. This is the
   single biggest ranking lever for the part-number long tail.
5. **Earn a few authoritative links.** Supplier directories, turbine service
   directories and OEM cross-reference resources will help the part pages move
   from position 50-80 into the top 20.
6. **Track desktop separately.** The mobile average position (7.81) hides the
   desktop problem (52.15). Report desktop and mobile separately in every
   monthly review.
7. **Add a part-number search landing experience.** The query data shows users
   type an exact number. Make sure the first screen on desktop accepts a part
   number and returns a clear next step, not a generic category grid.
