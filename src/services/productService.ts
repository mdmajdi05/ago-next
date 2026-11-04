import productsData from '@/data/static/products/products.json';
import { Product, ProductFilters, ProductSearchResult } from '@/types/product';
import { slugifyBrand } from '@/services/brandService';
import { CategoryService } from '@/services/categoryService';

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

/**
 * Normalizes a product URL or part number into a clean, URL-safe slug
 */
function deriveSlug(url?: string, part?: string): string {
  if (url) {
    const cleaned = url.trim().replace(/\.html$/i, '').trim();
    if (cleaned) {
      return cleaned;
    }
  }
  if (part) {
    return part
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  return '';
}

// Normalize all raw products from products.json
const normalizedProducts: Product[] = (productsData as RawProduct[]).map((raw) => {
  const slug = deriveSlug(raw.url, raw.part);
  return {
    name: raw.name,
    title: raw.title,
    part: raw.part,
    brand: raw.brand,
    category: raw.category,
    url: raw.url,
    slug,
    keywords: raw.keywords,
    description: raw.description,
    specifications: raw.specifications,
    image: raw.image,
  };
});

// Fast lookup indexes
const slugMap = new Map<string, Product>();
const slugLowerMap = new Map<string, Product>();
const partLowerMap = new Map<string, Product>();

for (const product of normalizedProducts) {
  slugMap.set(product.slug, product);
  slugLowerMap.set(product.slug.toLowerCase(), product);
  partLowerMap.set(product.part.toLowerCase(), product);
}

/**
 * Returns all normalized products
 */
export function getAll(): Product[] {
  return [...normalizedProducts];
}

/**
 * Retrieves a product by its unique slug (case-insensitive, strips .html)
 */
export function getBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const clean = decodeURIComponent(slug).trim().replace(/\.html$/i, '').trim();
  const cleanLower = clean.toLowerCase();

  return (
    slugMap.get(clean) ||
    slugLowerMap.get(cleanLower) ||
    partLowerMap.get(cleanLower) ||
    normalizedProducts.find(
      (p) =>
        p.slug.toLowerCase() === cleanLower ||
        p.url.trim().replace(/\.html$/i, '').toLowerCase() === cleanLower ||
        p.part.toLowerCase() === cleanLower
    )
  );
}

/**
 * Retrieves all products matching a brand name or slug
 * e.g., getByBrand("GE") or getByBrand("atlas-copco")
 */
export function getByBrand(brandNameOrSlug: string): Product[] {
  if (!brandNameOrSlug) return [];
  const target = brandNameOrSlug.trim().toLowerCase();
  const targetSlug = slugifyBrand(target);

  return normalizedProducts.filter((p) => {
    const pBrand = p.brand.trim().toLowerCase();
    return pBrand === target || slugifyBrand(pBrand) === targetSlug;
  });
}

/**
 * Retrieves all products matching a category name or slug
 * e.g., getByCategory("compressor-parts") or getByCategory("Turbine Parts")
 */
export function getByCategory(categorySlugOrName: string): Product[] {
  if (!categorySlugOrName) return [];
  const query = categorySlugOrName.trim().toLowerCase();

  // Try resolving through CategoryService first
  const matchedCategory =
    CategoryService.getBySlug(query) || CategoryService.getByName(query);

  if (matchedCategory) {
    const targetName = matchedCategory.name.toLowerCase();
    return normalizedProducts.filter((p) => p.category.toLowerCase() === targetName);
  }

  // Fallback to direct name or slug matching
  const targetSlug = query.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return normalizedProducts.filter((p) => {
    const pCat = p.category.trim().toLowerCase();
    const pCatSlug = pCat.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return pCat === query || pCatSlug === targetSlug;
  });
}

/**
 * Searches and filters products with pagination
 * Supports text search across title, part, brand, category, keywords, name
 */
export function search(filters: ProductFilters): ProductSearchResult {
  const { search: searchParam, brand, category, page = 1, limit = 12 } = filters;

  let results = normalizedProducts;

  // Filter by brand
  if (brand && brand.trim() !== '') {
    const targetBrand = brand.trim().toLowerCase();
    const targetBrandSlug = slugifyBrand(targetBrand);
    results = results.filter((p) => {
      const pBrand = p.brand.toLowerCase();
      return pBrand === targetBrand || slugifyBrand(pBrand) === targetBrandSlug;
    });
  }

  // Filter by category
  if (category && category.trim() !== '') {
    const targetCategory = category.trim().toLowerCase();
    const matchedCategory =
      CategoryService.getBySlug(targetCategory) || CategoryService.getByName(targetCategory);

    if (matchedCategory) {
      const targetName = matchedCategory.name.toLowerCase();
      results = results.filter((p) => p.category.toLowerCase() === targetName);
    } else {
      const catSlug = targetCategory.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      results = results.filter((p) => {
        const pCat = p.category.toLowerCase();
        const pCatSlug = pCat.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        return pCat === targetCategory || pCatSlug === catSlug;
      });
    }
  }

  // Text search against title, part, brand, category, keywords, name
  if (searchParam && searchParam.trim() !== '') {
    const tokens = searchParam
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    results = results.filter((p) => {
      const haystack = [
        p.title,
        p.part,
        p.brand,
        p.category,
        p.keywords || '',
        p.name,
        p.description || '',
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
  const paginatedProducts = results.slice(offset, offset + safeLimit);

  return {
    products: paginatedProducts,
    total,
    page: safePage,
    totalPages,
  };
}

/**
 * Returns all product slugs for static route generation (generateStaticParams)
 */
export function getAllSlugs(): string[] {
  return normalizedProducts.map((p) => p.slug);
}

/**
 * Returns a curated list of featured products representing key categories and brands
 */
export function getFeatured(count: number = 8): Product[] {
  // Curated list of high-profile industrial parts
  const priorityParts = [
    'LM2500', // GE LM2500 Gas Turbine Parts
    '1616543900', // Atlas Copco Air Compressor
    '1.105.30179.11.000', // Siemens Engine Assembly
    'PV212-22-P', // GE Druck Hydraulic Hand Pump
    '100.1/3-S211-9002', // ITT Goulds Pump
    'G61B06', // GE Turbine Component
    '114A7073P006', // GE Self-Locking Nut
    '1900071032', // Atlas Copco Regulator
    '354A1513P131', // GE Spark Plug Lead
    'C6434D0Z5', // GE Cylinder Assembly
  ];

  const featured: Product[] = [];
  const seenSlugs = new Set<string>();

  for (const partNumber of priorityParts) {
    const found = normalizedProducts.find(
      (p) => p.part.toLowerCase() === partNumber.toLowerCase()
    );
    if (found && !seenSlugs.has(found.slug)) {
      featured.push(found);
      seenSlugs.add(found.slug);
    }
  }

  // Fill up if needed up to count
  if (featured.length < count) {
    for (const p of normalizedProducts) {
      if (!seenSlugs.has(p.slug)) {
        featured.push(p);
        seenSlugs.add(p.slug);
        if (featured.length >= count) break;
      }
    }
  }

  return featured.slice(0, count);
}

/**
 * Returns related products sharing the same category and/or brand
 */
export function getRelated(product: Product, limit: number = 4): Product[] {
  return normalizedProducts
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.category === product.category || p.brand === product.brand)
    )
    .slice(0, limit);
}

export const ProductService = {
  getAll,
  getBySlug,
  getByBrand,
  getByCategory,
  search,
  getAllSlugs,
  getFeatured,
  getRelated,
};

export default ProductService;
