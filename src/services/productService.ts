import productsData from "@/data/static/products/products.json";
import { getLegacyCatalog, type LegacyRawProduct } from "./legacyCatalog";
import { Product, ProductFilters, ProductSearchResult, ProductTypeSummary } from "@/types/product";
import { slugifyBrand } from "@/services/brandService";
import CategoryService from "@/services/categoryService";
import { siteConfig } from "@/config/site";
import {
  buildCanonicalSlug,
  normalizeLegacyUrl,
  normalizePartNumber,
  slugifyCatalogValue,
} from "@/lib/catalog/normalize";
import { classifyProduct } from "@/lib/catalog/classify";
import { DEFAULT_TYPE, TAXONOMY_BY_CATEGORY } from "@/lib/catalog/taxonomy";

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

// ---------------------------------------------------------------------------
// Merge curated catalogue with imported legacy parts
// ---------------------------------------------------------------------------

const legacyRaw = getLegacyCatalog();

/**
 * Removes the boilerplate sentence added by the description enrichment pass.
 * The original catalogue text is kept (it is often a real component label or
 * an OEM one-liner), so page copy can be rebuilt from source data instead of
 * repeating one template across tens of thousands of pages.
 */
function cleanLegacyDescription(
  value: string | undefined,
  brand: string,
  part: string
): string | undefined {
  if (!value) return value;

  let text = value.replace(/\s+/g, " ").trim();
  text = text
    .replace(
      /\s+spare part for [^.]{1,140}\.\s*Request a quote for availability, condition and lead time(?: from AGO Aviation)?\.?\s*$/i,
      ""
    )
    .trim();

  const escape = (input: string) =>
    input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const stub = new RegExp(
    `^Genuine\\s+${escape(brand)}\\s+${escape(part)}\\s*$`,
    "i"
  );
  text = text.replace(stub, "").trim();

  return text || undefined;
}

// Count duplicate titles once so quality scoring is deterministic.
const titleCounts = new Map<string, number>();
for (const raw of rawProducts) {
  const key = raw.title.trim().toLowerCase();
  titleCounts.set(key, (titleCounts.get(key) || 0) + 1);
}

/**
 * Normalises a raw product (curated or legacy) into a `Product`.  Legacy
 * rows carry no image/specifications, so those stay undefined and the copy is
 * generated deterministically downstream by `productContent`.
 */
function normalizeRaw(raw: RawProduct | LegacyRawProduct, isLegacy: boolean): Product {
  const category = CategoryService.getByName(raw.category);
  const categorySlug =
    category?.slug || slugifyCatalogValue(raw.category || "uncategorized");
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
        raw.url.trim().replace(/\.html$/i, "").toLowerCase(),
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
    description: isLegacy
      ? cleanLegacyDescription(raw.description, raw.brand, raw.part)
      : raw.description,
    specifications: raw.specifications,
    image: raw.image,
    _legacy: isLegacy,
  };
}

/**
 * Builds the unified catalogue: curated products first, then imported legacy
 * parts that do not collide on part number.  Slug collisions between the two
 * sources are resolved with a numeric suffix (`-2`, `-3`, …) so every route
 * stays unique.
 */
function buildCatalogue(): Product[] {
  const products: Product[] = [];

  // Curated products first (authoritative).
  for (const raw of rawProducts) {
    products.push(normalizeRaw(raw, false));
  }

  const seenParts = new Set(products.map((p) => p.partNumber.toLowerCase()));
  const seenSlugs = new Set(products.map((p) => p.slug));

  // Imported legacy parts, deduplicated by part number and by slug.
  const legacySlugSuffix = new Map<string, number>();
  for (const raw of legacyRaw) {
    const partNumber = normalizePartNumber(raw.part);
    if (seenParts.has(partNumber.toLowerCase())) continue;

    let slug = buildCanonicalSlug(raw.brand, raw.part);
    if (seenSlugs.has(slug)) {
      const n = (legacySlugSuffix.get(slug) || 0) + 1;
      legacySlugSuffix.set(slug, n);
      slug = `${slug}-${n}`;
    }
    seenSlugs.add(slug);

    const legacyProduct = normalizeRaw(raw, true);
    // Recompute derived fields that depend on the (possibly suffixed) slug.
    legacyProduct.slug = slug;
    legacyProduct.canonicalUrl = `${siteConfig.url}/products/${slug}`;
    products.push(legacyProduct);
    seenParts.add(partNumber.toLowerCase());
  }

  return products;
}

const normalizedProducts: Product[] = buildCatalogue();

// ---------------------------------------------------------------------------
// Fast lookup indexes
// ---------------------------------------------------------------------------

const canonicalSlugMap = new Map<string, Product>();
const legacyMap = new Map<string, Product>();
const partMap = new Map<string, Product>();
const brandKeyMap = new Map<string, Product[]>();
const categoryKeyMap = new Map<string, Product[]>();
const typeKeyMap = new Map<string, Product[]>();
const categoryTypeKeyMap = new Map<string, Product[]>();

/**
 * Lower-cased search text is computed once at boot and attached as a
 * non-enumerable property, so filtering 52k rows does not rebuild a string
 * per request and the value is never serialised to the client.
 */
interface SearchableProduct extends Product {
  _search?: string;
}

for (const product of normalizedProducts) {
  Object.defineProperty(product, "_search", {
    value: [
      product.title,
      product.part,
      product.partNumber,
      product.brand,
      product.category,
      product.type,
      product.keywords || "",
      product.name,
      product.description || "",
    ]
      .join(" ")
      .toLowerCase(),
    enumerable: false,
    configurable: false,
    writable: false,
  });

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

  const typeList = typeKeyMap.get(product.typeSlug) || [];
  typeList.push(product);
  typeKeyMap.set(product.typeSlug, typeList);

  const categoryTypeKey = `${product.categorySlug}|${product.typeSlug}`;
  const categoryTypeList = categoryTypeKeyMap.get(categoryTypeKey) || [];
  categoryTypeList.push(product);
  categoryTypeKeyMap.set(categoryTypeKey, categoryTypeList);
}

// Precomputed once: these lists are requested by every sitemap, listing and
// pagination render, and allocating a new 52k-element array each time is pure
// overhead.
const indexableProducts = normalizedProducts.filter((product) => product.indexable);
const indexableSlugs = indexableProducts.map((product) => product.slug);
const staticSlugs = normalizedProducts
  .filter(
    (product) =>
      !product._legacy || product.tier === "A" || product.entityType === "listing"
  )
  .map((product) => product.slug);

/** Returns every normalized product in the catalogue. */
export function getAll(): Product[] {
  return normalizedProducts;
}

/** Returns only products that are allowed to be indexed. */
export function getIndexable(): Product[] {
  return indexableProducts;
}

/** Returns canonical slugs for indexable products (used by sitemaps). */
export function getIndexableSlugs(): string[] {
  return indexableSlugs;
}

/**
 * Returns canonical slugs for the priority/static subset of products.
 *
 * Only curated products plus high-priority (Tier A) legacy parts are
 * statically prerendered; the rest rely on `dynamicParams = true` so the
 * build stays fast while every URL remains reachable.
 */
export function getStaticSlugs(): string[] {
  return staticSlugs;
}

/** Retrieves a product by canonical slug, legacy URL, alias or part number. */
export function getBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const clean = decodeURIComponent(slug).trim().replace(/\.html$/i, "").trim();
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
  return brandKeyMap.get(target) || [];
}

/** Returns the number of products for a brand name or slug. */
export function getCountByBrand(brandNameOrSlug: string): number {
  if (!brandNameOrSlug) return 0;
  const target = slugifyBrand(brandNameOrSlug);
  return (brandKeyMap.get(target) || []).length;
}

/** Retrieves all products for a category name or slug. */
export function getByCategory(categorySlugOrName: string): Product[] {
  if (!categorySlugOrName) return [];
  const clean = categorySlugOrName.trim().toLowerCase();
  const category = CategoryService.getBySlug(clean);
  const slug = category?.slug || slugifyCatalogValue(clean);
  return categoryKeyMap.get(slug) || [];
}

/** Returns the number of products for a category name or slug. */
export function getCountByCategory(categorySlugOrName: string): number {
  if (!categorySlugOrName) return 0;
  const clean = categorySlugOrName.trim().toLowerCase();
  const category = CategoryService.getBySlug(clean);
  const slug = category?.slug || slugifyCatalogValue(clean);
  return (categoryKeyMap.get(slug) || []).length;
}

/** Retrieves products for a category + type pair. */
export function getByType(categorySlug: string, typeSlug: string): Product[] {
  return categoryTypeKeyMap.get(`${categorySlug}|${typeSlug}`) || [];
}

/** Returns the number of products for a category + type pair. */
export function getCountByType(categorySlug: string, typeSlug: string): number {
  return (categoryTypeKeyMap.get(`${categorySlug}|${typeSlug}`) || []).length;
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

/** Returns type index: every type slug -> product count. */
export function getTypeIndex(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const product of normalizedProducts) {
    counts[product.typeSlug] = (counts[product.typeSlug] || 0) + 1;
  }
  return counts;
}

/**
 * Searches and filters products with pagination.
 *
 * Indexed filters use the precomputed brand/category/type maps, and free-text
 * search uses the per-product `_search` string, so a request no longer rebuilds
 * a haystack for all 52k rows.
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

  const brandTarget = brand && brand.trim() !== "" ? slugifyBrand(brand) : "";
  const categoryTarget = category && category.trim() !== ""
    ? (CategoryService.getBySlug(category.trim().toLowerCase())?.slug ||
        slugifyCatalogValue(category.trim()))
    : "";
  const typeTarget =
    type && type.trim() !== "" ? slugifyCatalogValue(type.trim()) : "";
  const tokens =
    searchParam && searchParam.trim() !== ""
      ? searchParam.trim().toLowerCase().split(/\s+/).filter(Boolean)
      : [];

  // Pick the smallest index that applies, then filter only those rows.
  let base: Product[];
  if (categoryTarget && typeTarget) {
    base = categoryTypeKeyMap.get(`${categoryTarget}|${typeTarget}`) || [];
  } else if (categoryTarget) {
    base = categoryKeyMap.get(categoryTarget) || [];
  } else if (typeTarget) {
    base = typeKeyMap.get(typeTarget) || [];
  } else if (brandTarget) {
    base = brandKeyMap.get(brandTarget) || [];
  } else {
    base = normalizedProducts;
  }

  const needsScan =
    tokens.length > 0 ||
    (brandTarget && base !== brandKeyMap.get(brandTarget)) ||
    (categoryTarget && base !== categoryKeyMap.get(categoryTarget)) ||
    (typeTarget && base !== typeKeyMap.get(typeTarget) &&
      base !== categoryTypeKeyMap.get(`${categoryTarget}|${typeTarget}`));

  let results: Product[];

  if (!needsScan) {
    results = base;
  } else {
    const matched: Product[] = [];

    for (let index = 0; index < base.length; index += 1) {
      const product = base[index];

      if (brandTarget && slugifyBrand(product.brand) !== brandTarget) continue;
      if (categoryTarget && product.categorySlug !== categoryTarget) continue;
      if (typeTarget && product.typeSlug !== typeTarget) continue;

      if (tokens.length > 0) {
        const haystack = (product as SearchableProduct)._search || "";
        let matches = true;
        for (const token of tokens) {
          if (!haystack.includes(token)) {
            matches = false;
            break;
          }
        }
        if (!matches) continue;
      }

      matched.push(product);
    }

    results = matched;
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

/**
 * A–Z part number index. Groups by first character.  Capped at the first
 * 200 products per group so the page stays renderable at scale.
 */
export function getPartIndex(): { key: string; products: Product[] }[] {
  const groups = new Map<string, Product[]>();

  for (const product of getIndexable()) {
    const first = product.partNumber.charAt(0).toUpperCase();
    const key = /[A-Z]/.test(first) ? first : /[0-9]/.test(first) ? "0-9" : "Other";
    const list = groups.get(key) || [];
    if (list.length < 200) list.push(product);
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
    .filter((product) => product.tier === "A")
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
  const sameType = typeKeyMap.get(product.typeSlug) || [];
  const sameCategory = categoryKeyMap.get(product.categorySlug) || [];
  const sameBrand = brandKeyMap.get(slugifyBrand(product.brand)) || [];

  const seen = new Set<string>();
  const related: Product[] = [];

  const take = (candidate: Product): boolean => {
    if (candidate.slug === product.slug || seen.has(candidate.slug)) return false;
    seen.add(candidate.slug);
    related.push(candidate);
    return related.length >= limit;
  };

  for (const candidate of sameType) {
    if (take(candidate)) return related;
  }
  for (const candidate of sameCategory) {
    if (take(candidate)) return related;
  }
  for (const candidate of sameBrand) {
    if (take(candidate)) return related;
  }

  return related;
}

export const ProductService = {
  getAll,
  getIndexable,
  getIndexableSlugs,
  getBySlug,
  getByBrand,
  getByCategory,
  getByType,
  getTypes,
  getTypeIndex,
  getCountByBrand,
  getCountByCategory,
  getCountByType,
  search,
  getAllSlugs,
  getStaticSlugs,
  getPartIndex,
  getFeatured,
  getRelated,
};

export default ProductService;
