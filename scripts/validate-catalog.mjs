#!/usr/bin/env node
/**
 * Catalog validation script — runs at build time.
 * Exits non-zero on critical errors (duplicate slugs, conflicting identities).
 * Warns on non-critical issues (missing description, image, etc.).
 */

import fs from 'fs';
import path from 'path';

const productsPath = path.join(process.cwd(), 'src/data/static/products/products.json');
const brandsPath = path.join(process.cwd(), 'src/data/static/brands/brands.json');
const navPath = path.join(process.cwd(), 'src/data/static/nav.json');

function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function slugify(value) {
  return (value || '')
    .toString()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildCanonicalSlug(brand, part) {
  return slugify(`${brand}-${part}`);
}

const products = loadJSON(productsPath);
const brands = loadJSON(brandsPath);
const nav = loadJSON(navPath);

const errors = [];
const warnings = [];

// 1. Duplicate canonical slugs
const slugMap = new Map();
for (const p of products) {
  const slug = buildCanonicalSlug(p.brand, p.part);
  if (slugMap.has(slug)) {
    errors.push(`Duplicate canonical slug "${slug}": ${p.brand} ${p.part} AND ${slugMap.get(slug).brand} ${slugMap.get(slug).part}`);
  } else {
    slugMap.set(slug, p);
  }
}

// 2. Duplicate legacy URLs
const urlMap = new Map();
for (const p of products) {
  const clean = p.url.trim().replace(/\.html$/i, '').toLowerCase();
  if (urlMap.has(clean)) {
    warnings.push(`Duplicate legacy URL "${clean}": ${p.brand} ${p.part} AND ${urlMap.get(clean).brand} ${urlMap.get(clean).part}`);
  } else {
    urlMap.set(clean, p);
  }
}

// 3. Duplicate titles (lowercased)
const titleMap = new Map();
for (const p of products) {
  const key = p.title.trim().toLowerCase();
  if (!titleMap.has(key)) titleMap.set(key, []);
  titleMap.get(key).push(p);
}
for (const [title, list] of titleMap) {
  if (list.length > 1) {
    warnings.push(`Duplicate title (${list.length}x): "${title}" — parts: ${list.map(p => `${p.brand} ${p.part}`).join(', ')}`);
  }
}

// 4. Missing required fields
for (const p of products) {
  if (!p.name?.trim()) errors.push(`Missing name: ${p.brand} ${p.part}`);
  if (!p.title?.trim()) errors.push(`Missing title: ${p.brand} ${p.part}`);
  if (!p.part?.trim()) errors.push(`Missing part: ${p.brand} ${p.name || p.title}`);
  if (!p.brand?.trim()) errors.push(`Missing brand: ${p.part}`);
  if (!p.category?.trim()) errors.push(`Missing category: ${p.brand} ${p.part}`);
  if (!p.url?.trim()) errors.push(`Missing url: ${p.brand} ${p.part}`);
  if (!p.keywords?.trim()) warnings.push(`Missing keywords: ${p.brand} ${p.part}`);
}

// 5. Brand consistency with nav.json
const navBrands = new Set(nav.brands.map(b => b.name));
for (const p of products) {
  if (!navBrands.has(p.brand)) {
    warnings.push(`Product brand "${p.brand}" not in nav.json: ${p.brand} ${p.part}`);
  }
}

// 6. Category consistency
const navCategories = new Set(nav.categories.map(c => c.name));
for (const p of products) {
  if (!navCategories.has(p.category)) {
    warnings.push(`Product category "${p.category}" not in nav.json: ${p.brand} ${p.part}`);
  }
}

// 7. Generic part numbers flagged
const genericParts = new Set([
  'list-1', 'industrial', 'compressor', 'parts-ws', 'turbomar',
  'management', 'multilin', 'honeywell', 'honneywell', 'governor',
  'woodward', 'transmitters', 'circuit-breakers', 'spares-ws',
  'controls', 'conveyor', 'swagelok'
]);
for (const p of products) {
  if (genericParts.has(p.part.trim().toLowerCase())) {
    warnings.push(`Generic part number "${p.part}" — review if this should be a product family page: ${p.brand} ${p.part}`);
  }
}

// 8. Products with no valid part number (no digit)
for (const p of products) {
  if (!/\d/.test(p.part)) {
    warnings.push(`Part number has no digits: "${p.part}" (${p.brand} ${p.title})`);
  }
}

// Output
console.log('\n=== CATALOG VALIDATION ===');
console.log(`Products: ${products.length}`);
console.log(`Brands: ${brands.length}`);
console.log(`Categories: ${nav.categories.length}`);
console.log(`\nErrors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}\n`);

if (errors.length) {
  console.log('❌ CRITICAL ERRORS (build will fail):');
  for (const e of errors) console.log('  -', e);
}

if (warnings.length) {
  console.log('⚠️  WARNINGS (review recommended):');
  for (const w of warnings.slice(0, 50)) console.log('  -', w);
  if (warnings.length > 50) console.log(`  ... and ${warnings.length - 50} more`);
}

console.log('\n=== DONE ===');

process.exit(errors.length > 0 ? 1 : 0);