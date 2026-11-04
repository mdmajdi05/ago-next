import brandsData from '@/data/static/brands/brands.json';
import navData from '@/data/static/nav.json';
import { Brand, BrandGroup } from '@/types/brand';

interface RawBrand {
  name: string;
  count: number;
  group: string;
  categories: string[];
  description?: string;
}

/**
 * Generates a clean URL-friendly slug from a brand name
 * e.g., "Atlas Copco" -> "atlas-copco", "Allen-Bradley" -> "allen-bradley"
 */
export function slugifyBrand(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Normalize all brands from brands.json with their slug
const normalizedBrands: Brand[] = (brandsData as RawBrand[]).map((b) => ({
  name: b.name,
  slug: slugifyBrand(b.name),
  count: b.count,
  group: b.group,
  categories: [...b.categories],
  description: b.description,
}));

// Quick lookup maps
const brandSlugMap = new Map<string, Brand>();
const brandNameMap = new Map<string, Brand>();

for (const brand of normalizedBrands) {
  brandSlugMap.set(brand.slug.toLowerCase(), brand);
  brandNameMap.set(brand.name.toLowerCase(), brand);
}

// Build BrandGroup list using navData.groups with normalized brands
const normalizedGroups: BrandGroup[] = (navData.groups || []).map((group) => ({
  name: group.name,
  description: group.description,
  brands: group.brands.map((b) => {
    const existing = brandNameMap.get(b.name.toLowerCase());
    return (
      existing || {
        name: b.name,
        slug: slugifyBrand(b.name),
        count: b.count,
        group: b.group,
        categories: [...b.categories],
        description: undefined,
      }
    );
  }),
}));

/**
 * Returns all 23 brands augmented with slug
 */
export function getAll(): Brand[] {
  return [...normalizedBrands];
}

/**
 * Retrieves a brand by its slug or name (case-insensitive)
 */
export function getBySlug(slug: string): Brand | undefined {
  if (!slug) return undefined;
  const clean = decodeURIComponent(slug).trim().toLowerCase().replace(/\.html$/i, '');
  const slugified = clean.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  return (
    brandSlugMap.get(clean) ||
    brandSlugMap.get(slugified) ||
    brandNameMap.get(clean) ||
    normalizedBrands.find(
      (b) =>
        b.slug === clean ||
        b.slug === slugified ||
        b.name.toLowerCase() === clean
    )
  );
}

/**
 * Retrieves a brand by its display name
 */
export function getByName(name: string): Brand | undefined {
  if (!name) return undefined;
  const clean = name.trim().toLowerCase();
  return (
    brandNameMap.get(clean) ||
    normalizedBrands.find((b) => b.name.toLowerCase() === clean)
  );
}

/**
 * Returns all brand groups (Turbines & Power, Rotating Equipment, Automation & Controls,
 * Instrumentation & Monitoring, Valves & Flow Control, Electrical & Motors)
 */
export function getGroups(): BrandGroup[] {
  return [...normalizedGroups];
}

/**
 * Returns all brand slugs for static route generation (generateStaticParams)
 */
export function getAllSlugs(): string[] {
  return normalizedBrands.map((b) => b.slug);
}

export const BrandService = {
  getAll,
  getBySlug,
  getByName,
  getGroups,
  getAllSlugs,
  slugifyBrand,
};

export default BrandService;
