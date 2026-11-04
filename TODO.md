# AGO Aviation — Next.js Migration TODO & Tracking

> **Project**: HTML → Next.js 15 Migration  
> **Started**: 2026-11-03  
> **HTML Source**: `/Users/macbookpro/Desktop/agoaviation/agoaviation-html/` (564 HTML files)  
> **Target**: `/Users/macbookpro/Desktop/agoaviation/agoaviation-next/`  
> **Reference**: `prompt/prompt.md` — DO NOT MODIFY

---

## PHASE STATUS OVERVIEW

| Phase | Description | Status | Agent |
|-------|-------------|--------|-------|
| 1 | Website Audit & Inventory | 🟢 Verified Complete | Main & Subagents |
| 2 | Next.js Project Setup & Dependencies | 🟢 Verified Complete | Main (npm 375 packages added) |
| 3 | TypeScript Types & Data Models | 🟢 Verified Complete | Data Agent (types/product, brand, category, enquiry) |
| 4 | Static Data & Service Layer | 🟢 Verified Complete | Data Agent (356 products, 23 brands, 9 categories) |
| 5 | Layout Components (Header, Footer, Nav) | 🟡 In Progress | Layout Agent |
| 6 | Core Pages (Home, About, Contact, Blog) | 🟡 In Progress | Home & Inner Pages Agents |
| 7 | Category Pages | 🟡 In Progress | Inner Pages Agent |
| 8 | Brand Pages | 🟡 In Progress | Inner Pages Agent |
| 9 | Product Dynamic Pages | 🟡 In Progress | Inner Pages Agent |
| 10 | SEO & Structured Data | 🟡 In Progress | Foundation & Inner Pages Agents |
| 11 | Performance Optimization | 🔴 Not Started | Perf Agent |
| 12 | Testing & QA | 🔴 Not Started | QA Agent |

---

## PHASE 1 — AUDIT & INVENTORY

### Pages Identified (HTML Source)
- [ ] index.html → `/` (Home)
- [ ] contact.html → `/contact`
- [ ] products.html → `/products`
- [ ] brands.html → `/brands`
- [ ] blog.html → `/blog`
- [ ] general-Electric-(GE).html → `/brands/ge`
- [ ] Speedtronic.html → `/brands/speedtronic`
- [ ] Swagelok.html → `/brands/swagelok`
- [ ] QUALITROL.html → `/brands/qualitrol`
- [ ] Control-and-Automation.html → `/control-and-automation`
- [ ] category-turbine-parts.html → `/categories/turbine-parts`
- [ ] category-automation-controls.html → `/categories/automation-controls`
- [ ] category-seals-filters.html → `/categories/seals-filters`
- [ ] category-electrical-motors.html → `/categories/electrical-motors`
- [ ] category-valves-actuators.html → `/categories/valves-actuators`
- [ ] category-compressor-parts.html → `/categories/compressor-parts`
- [ ] category-instrumentation.html → `/categories/instrumentation`
- [ ] category-piping-fittings.html → `/categories/piping-fittings`
- [ ] category-mechanical-transmission-bearings.html → `/categories/mechanical-transmission-bearings`
- [ ] O-GE-Turbine-and-Generator-Parts.html → `/ge-turbine-generator-parts`
- [ ] Top-brand-and-spare-parts.html → `/top-brands`
- [ ] ~500+ individual product pages → `/products/[slug]` (dynamic)

### Brand Pages (from HTML)
- GE (59 parts)
- Siemens (22 parts)
- Atlas Copco (20 parts)
- ITT Goulds (15 parts)
- Woodward
- Allen-Bradley
- ABB
- Bently Nevada
- Honeywell
- Metso/Neles
- Panametrics
- Swagelok
- Qualitrol
- Gutor
- Flender
- Milton Roy

### Key Info Extracted
- **Company**: WS Turbomar Private Limited (AGO Aviation)
- **Phone**: +91 7011123269
- **Email**: sale@agoaviation.com / contactus@agoaviation.com
- **Address**: A-24/5, 3rd Floor, NH-19, Mohan Cooperative Industrial Estate, New Delhi, Delhi 110044
- **GA ID**: G-78KJF6NWPV
- **GTM ID**: GTM-W7CKR2ZB
- **Font**: Yantramanav (Google Fonts)
- **Colors**: Primary blue #0b3d6b
- **Socials**: Facebook, Twitter/X, LinkedIn, Instagram

---

## PHASE 2 — NEXT.JS PROJECT SETUP

### Tech Stack
- [x] Next.js 15 (App Router)
- [x] React 19
- [x] TypeScript (strict mode)
- [x] Tailwind CSS v4
- [ ] Lucide Icons
- [ ] Shadcn UI / Radix UI (selective)
- [ ] React Hook Form + Zod
- [ ] Motion (framer-motion)
- [ ] next/font (Yantramanav)
- [ ] next/image

### Project Structure (target)
```
src/
├── app/
│   ├── (site)/
│   │   ├── page.tsx (Home)
│   │   ├── contact/page.tsx
│   │   ├── products/page.tsx
│   │   ├── products/[slug]/page.tsx
│   │   ├── brands/page.tsx
│   │   ├── brands/[slug]/page.tsx
│   │   ├── categories/[slug]/page.tsx
│   │   └── blog/page.tsx
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/ (Header, Footer, Navigation)
│   ├── ui/ (Button, Card, Badge)
│   ├── sections/ (Hero, ProductGrid, etc.)
│   └── shared/
├── data/
│   └── static/
│       ├── products/ (JSON files)
│       ├── brands/ (JSON)
│       └── categories/ (JSON)
├── services/
├── types/
├── lib/
│   └── seo/
└── config/
```

---

## PHASE 3-4 — DATA ARCHITECTURE

- [ ] TypeScript interfaces: Product, Brand, Category, Enquiry
- [ ] Products JSON data (from 500+ HTML pages)
- [ ] Brands JSON data
- [ ] Categories JSON data
- [ ] Navigation data
- [ ] Service layer (ProductService, BrandService, CategoryService)
- [ ] Static data provider

---

## PHASE 5 — LAYOUT COMPONENTS

- [ ] TopBar (email + phone)
- [ ] Header (logo + navigation)
- [ ] MegaMenu (dropdown navigation)
- [ ] MobileMenu
- [ ] Footer (4-column layout)
- [ ] FloatBar (back-to-top + WhatsApp)
- [ ] PageSplash (loading animation)
- [ ] Breadcrumbs

---

## PHASE 6 — CORE PAGES

- [ ] Home page (hero slider, stats, categories, brands, FAQ)
- [ ] Contact page (form + map + contact info)
- [ ] Products listing page (filtering, pagination)
- [ ] Blog page
- [ ] About page
- [ ] Brands page (grouped by category)
- [ ] Disclaimer, Privacy, Terms pages

---

## PHASE 7-8 — CATEGORY & BRAND PAGES

- [ ] /categories/[slug] dynamic pages (9 categories)
- [ ] /brands/[slug] dynamic pages (16+ brands)

---

## PHASE 9 — PRODUCT DYNAMIC PAGES

- [ ] /products/[slug] template
- [ ] generateStaticParams (all 500+ products)
- [ ] Product SEO metadata
- [ ] Product structured data (JSON-LD)
- [ ] Enquiry form

---

## PHASE 10 — SEO & GEO

- [ ] Metadata API for all pages
- [ ] Dynamic sitemap.ts
- [ ] robots.ts
- [ ] Organization schema
- [ ] BreadcrumbList schema
- [ ] Product schema
- [ ] FAQ schema
- [ ] Canonical URLs
- [ ] Open Graph + Twitter cards
- [ ] llms.txt

---

## PHASE 11 — PERFORMANCE

- [ ] next/image optimization
- [ ] next/font (Yantramanav)
- [ ] Code splitting
- [ ] React Server Components (primary)
- [ ] Client Components (interactive only)
- [ ] Lazy loading
- [ ] LCP optimization

---

## PHASE 12 — TESTING & QUALITY

- [ ] TypeScript build pass
- [ ] ESLint pass
- [ ] Production build
- [ ] Lighthouse scores (target: Performance 95+, SEO 100)
- [ ] Broken link check
- [ ] Responsive testing (mobile/tablet/desktop)
- [ ] Visual comparison with original

---

## CHANGE LOG

| Date | Change | Agent |
|------|--------|-------|
| 2026-11-03 | TODO file created, audit started | Main |
| 2026-11-03 | HTML project analyzed: 564 files identified | Main |

---

## NOTES & DECISIONS

1. URL structure: Remove `.html` extensions, use clean URLs
2. Product pages: Use slugs derived from HTML filenames
3. No database, no custom backend — static JSON only
4. Yantramanav font: Load via next/font/google
5. GA + GTM: Preserve existing IDs (G-78KJF6NWPV, GTM-W7CKR2ZB)
6. WhatsApp + email CTAs preserved from original
7. Brand colors: #0b3d6b (primary navy blue)
