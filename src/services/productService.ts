import productsData from '@/data/static/products/products.json';
import { Product, ProductFilters, ProductSearchResult, ProductTypeSummary } from '@/types/product';
import { slugifyBrand } from '@/services/brandService';
import CategoryService from '@/services/categoryService';
import { siteConfig } from '@/config/site';
import {
  buildCanonicalSlug,
  normalizeLegacyUrl,
  normalizePartNumber,
  slugifyCatalogValue,
} from '@/lib/catalog/normalize';
import { classifyProduct } from '@/lib/catalog/classify';
import { DEFAULT_TYPE, TAXONOMY_BY_CATEGORY } from '@/lib/catalog/taxonomy';

interface RawProduct {
  name: string;
  title: string;
  part: string;
  brand: string;
  category: string;
  url: string;
  keywords?: string;
  description?: string;
  specifications?: Record<string, string>;
  image?: string;
}

const rawProducts = productsData as RawProduct[];

// Count duplicate titles once so quality scoring is deterministic.
const titleCounts = new Map<string, number>();
for (const raw of rawProducts) {
  const key = raw.title.trim().toLowerCase();
  titleCounts.set(key, (titleCounts.get(key) || 0) + 1);
}

const normalizedProducts: Product[] = rawProducts.map((raw) => {
  const category = CategoryService.getByName(raw.category);
  const categorySlug =
    category?.slug || slugifyCatalogValue(raw.category || 'uncategorized');
  const partNumber = normalizePartNumber(raw.part);
  const duplicateTitle = (titleCounts.get(raw.title.trim().toLowerCase()) || 0) > 1;
  const baseTitle = raw.title.trim();
  const displayTitle =
    duplicateTitle &&
    partNumber &&
    !baseTitle.toLowerCase().includes(partNumber.toLowerCase())
      ? `${partNumber} ${baseTitle}`
      : baseTitle;

  const classification = classifyProduct(
    {
      title: raw.title,
      part: partNumber,
      brand: raw.brand,
      category: raw.category,
      categorySlug,
      url: raw.url,
      keywords: raw.keywords,
      description: raw.description,
      image: raw.image,
    },
    duplicateTitle
  );

  const type = classification.type || DEFAULT_TYPE;
  const slug = buildCanonicalSlug(raw.brand, raw.part);

  const aliases = Array.from(
    new Set(
      [
        normalizeLegacyUrl(raw.url).toLowerCase(),
        raw.url.trim().replace(/\.html$/i, '').toLowerCase(),
        partNumber.toLowerCase(),
        raw.name.trim().toLowerCase(),
      ].filter(Boolean)
    )
  );

  return {
    name: raw.name,
    title: raw.title,
    part: raw.part,
    partNumber,
    brand: raw.brand,
    category: raw.category,
    url: raw.url,
    slug,
    type: type.name,
    typeSlug: type.slug,
    categorySlug,
    displayTitle,
    isDuplicateTitle: duplicateTitle,
    tier: classification.tier,
    entityType: classification.entityType,
    qualityScore: classification.qualityScore,
    indexable: classification.indexable,
    aliases,
    canonicalUrl: `${siteConfig.url}/products/${slug}`,
    keywords: raw.keywords,
    description: raw.description,
    specifications: raw.specifications,
    image: raw.image,
  };
});

// Fast lookup indexes
const canonicalSlugMap = new Map<string, Product>();
const legacyMap = new Map<string, Product>();
const partMap = new Map<string, Product>();
const brandKeyMap = new Map<string, Product[]>();
const categoryKeyMap = new Map<string, Product[]>();

for (const product of normalizedProducts) {
  canonicalSlugMap.set(product.slug, product);
  partMap.set(product.partNumber.toLowerCase(), product);

  for (const alias of product.aliases) {
    if (!legacyMap.has(alias)) legacyMap.set(alias, product);
  }

  const brandKey = slugifyBrand(product.brand);
  const brandList = brandKeyMap.get(brandKey) || [];
  brandList.push(product);
  brandKeyMap.set(brandKey, brandList);

  const categoryList = categoryKeyMap.get(product.categorySlug) || [];
  categoryList.push(product);
  categoryKeyMap.set(product.categorySlug, categoryList);
}

/** Returns every normalized product in the catalogue. */
export function getAll(): Product[] {
  return [...normalizedProducts];
}

/** Returns only products that are allowed to be indexed. */
export function getIndexable(): Product[] {
  return normalizedProducts.filter((product) => product.indexable);
}

/**
 * Retrieves a product by canonical slug, legacy URL, alias or part number.
 */
export function getBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const clean = decodeURIComponent(slug).trim().replace(/\.html$/i, '').trim();
  const lower = clean.toLowerCase();

  return (
    canonicalSlugMap.get(lower) ||
    legacyMap.get(lower) ||
    partMap.get(lower) ||
    normalizedProducts.find((product) =>
      product.aliases.includes(lower)
    )
  );
}

/** Retrieves all products for a brand name or slug. */
export function getByBrand(brandNameOrSlug: string): Product[] {
  if (!brandNameOrSlug) return [];
  const target = slugifyBrand(brandNameOrSlug);
  return [...(brandKeyMap.get(target) || [])];
}

/** Retrieves all products for a category name or slug. */
export function getByCategory(categorySlugOrName: string): Product[] {
  if (!categorySlugOrName) return [];
  const clean = categorySlugOrName.trim().toLowerCase();
  const category = CategoryService.getBySlug(clean);
  const slug = category?.slug || slugifyCatalogValue(clean);
  return [...(categoryKeyMap.get(slug) || [])];
}

/** Retrieves products for a category + type pair. */
export function getByType(categorySlug: string, typeSlug: string): Product[] {
  return normalizedProducts.filter(
    (product) =>
      product.categorySlug === categorySlug && product.typeSlug === typeSlug
  );
}

/** Returns type summaries (with counts) for a category. */
export function getTypes(categorySlug: string): ProductTypeSummary[] {
  const taxonomy = TAXONOMY_BY_CATEGORY.get(categorySlug);
  const products = categoryKeyMap.get(categorySlug) || [];
  const counts = new Map<string, number>();

  for (const product of products) {
    counts.set(product.typeSlug, (counts.get(product.typeSlug) || 0) + 1);
  }

  const definitions = taxonomy?.types || [];
  const summaries: ProductTypeSummary[] = definitions.map((type) => ({
    slug: type.slug,
    name: type.name,
    categorySlug,
    count: counts.get(type.slug) || 0,
  }));

  const fallbackCount = counts.get(DEFAULT_TYPE.slug) || 0;
  if (fallbackCount > 0) {
    summaries.push({
      slug: DEFAULT_TYPE.slug,
      name: DEFAULT_TYPE.name,
      categorySlug,
      count: fallbackCount,
    });
  }

  return summaries.filter((summary) => summary.count > 0);
}

/**
 * Searches and filters products with pagination.
 */
export function search(filters: ProductFilters): ProductSearchResult {
  const {
    search: searchParam,
    brand,
    category,
    type,
    page = 1,
    limit = 12,
  } = filters;

  let results = normalizedProducts;

  if (brand && brand.trim() !== '') {
    const target = slugifyBrand(brand);
    results = results.filter((product) => slugifyBrand(product.brand) === target);
  }

  if (category && category.trim() !== '') {
    const clean = category.trim().toLowerCase();
    const matched = CategoryService.getBySlug(clean);
    const targetSlug = matched?.slug || slugifyCatalogValue(clean);
    results = results.filter((product) => product.categorySlug === targetSlug);
  }

  if (type && type.trim() !== '') {
    const targetType = slugifyCatalogValue(type);
    results = results.filter((product) => product.typeSlug === targetType);
  }

  if (searchParam && searchParam.trim() !== '') {
    const tokens = searchParam
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    results = results.filter((product) => {
      const haystack = [
        product.title,
        product.part,
        product.partNumber,
        product.brand,
        product.category,
        product.type,
        product.keywords || '',
        product.name,
        product.description || '',
      ]
        .join(' ')
        .toLowerCase();

      return tokens.every((token) => haystack.includes(token));
    });
  }

  const total = results.length;
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const offset = (safePage - 1) * safeLimit;

  return {
    products: results.slice(offset, offset + safeLimit),
    total,
    page: safePage,
    totalPages,
  };
}

/** Returns every canonical slug so every product route can be generated. */
export function getAllSlugs(): string[] {
  return Array.from(new Set(normalizedProducts.map((product) => product.slug)));
}

/** Returns canonical slugs for indexable products only (used by sitemaps). */
export function getIndexableSlugs(): string[] {
  return getIndexable().map((product) => product.slug);
}

/**
 * A–Z part number index. Groups by first character.
 */
export function getPartIndex(): { key: string; products: Product[] }[] {
  const groups = new Map<string, Product[]>();

  for (const product of getIndexable()) {
    const first = product.partNumber.charAt(0).toUpperCase();
    const key = /[A-Z]/.test(first) ? first : /[0-9]/.test(first) ? '0-9' : 'Other';
    const list = groups.get(key) || [];
    list.push(product);
    groups.set(key, list);
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, products]) => ({
      key,
      products: products.sort((a, b) =>
        a.partNumber.localeCompare(b.partNumber)
      ),
    }));
}

/** Curated list of featured products (Tier A first). */
export function getFeatured(count: number = 8): Product[] {
  const priority = normalizedProducts
    .filter((product) => product.tier === 'A')
    .sort((a, b) => b.qualityScore - a.qualityScore);

  const featured = priority.slice(0, count);

  if (featured.length < count) {
    const seen = new Set(featured.map((product) => product.slug));
    for (const product of normalizedProducts) {
      if (seen.has(product.slug)) continue;
      featured.push(product);
      seen.add(product.slug);
      if (featured.length >= count) break;
    }
  }

  return featured;
}

/** Returns related products, preferring the same type then category/brand. */
export function getRelated(product: Product, limit: number = 4): Product[] {
  const sameType = normalizedProducts.filter(
    (candidate) =>
      candidate.slug !== product.slug &&
      candidate.categorySlug === product.categorySlug &&
      candidate.typeSlug === product.typeSlug
  );

  const sameCategory = normalizedProducts.filter(
    (candidate) =>
      candidate.slug !== product.slug &&
      candidate.categorySlug === product.categorySlug &&
      candidate.typeSlug !== product.typeSlug
  );

  const sameBrand = normalizedProducts.filter(
    (candidate) =>
      candidate.slug !== product.slug &&
      slugifyBrand(candidate.brand) === slugifyBrand(product.brand) &&
      candidate.categorySlug !== product.categorySlug
  );

  const seen = new Set<string>();
  const related: Product[] = [];

  for (const candidate of [...sameType, ...sameCategory, ...sameBrand]) {
    if (seen.has(candidate.slug)) continue;
    related.push(candidate);
    seen.add(candidate.slug);
    if (related.length >= limit) break;
  }

  return related;
}

export const ProductService = {
  getAll,
  getIndexable,
  getBySlug,
  getByBrand,
  getByCategory,
  getByType,
  getTypes,
  search,
  getAllSlugs,
  getIndexableSlugs,
  getPartIndex,
  getFeatured,
  getRelated,
};

export default ProductService;
