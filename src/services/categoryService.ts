import navData from '@/data/static/nav.json';
import { Category } from '@/types/category';

// Map of category slug to Lucide icon name for frontend presentation
const CATEGORY_ICON_MAP: Record<string, string> = {
  'turbine-parts': 'Flame',
  'compressor-parts': 'Cog',
  'valves-actuators': 'Sliders',
  'automation-controls': 'Cpu',
  'instrumentation': 'Gauge',
  'electrical-motors': 'Zap',
  'mechanical-transmission-bearings': 'RotateCw',
  'seals-filters': 'ShieldCheck',
  'piping-fittings': 'Pipette',
};

const normalizedCategories: Category[] = (navData.categories as Category[]).map((cat) => ({
  ...cat,
  icon: cat.icon || CATEGORY_ICON_MAP[cat.slug] || 'Package',
}));

const categorySlugMap = new Map<string, Category>();
const categoryNameMap = new Map<string, Category>();

for (const cat of normalizedCategories) {
  categorySlugMap.set(cat.slug.toLowerCase(), cat);
  categoryNameMap.set(cat.name.toLowerCase(), cat);
}

/**
 * Returns all 9 product categories from nav.json
 */
export function getAll(): Category[] {
  return [...normalizedCategories];
}

/**
 * Retrieves a category by its slug or legacy HTML page name or name
 */
export function getBySlug(slug: string): Category | undefined {
  if (!slug) return undefined;
  const clean = decodeURIComponent(slug).trim().toLowerCase().replace(/\.html$/i, '');
  return (
    categorySlugMap.get(clean) ||
    categoryNameMap.get(clean) ||
    normalizedCategories.find(
      (c) =>
        c.slug.toLowerCase() === clean ||
        c.name.toLowerCase() === clean ||
        c.short.toLowerCase() === clean ||
        c.page.toLowerCase().replace(/\.html$/i, '') === clean
    )
  );
}

/**
 * Retrieves a category by exact or case-insensitive category name
 */
export function getByName(name: string): Category | undefined {
  if (!name) return undefined;
  const clean = name.trim().toLowerCase();
  return (
    categoryNameMap.get(clean) ||
    normalizedCategories.find((c) => c.name.toLowerCase() === clean)
  );
}

/**
 * Returns all category slugs for static route generation (generateStaticParams)
 */
export function getAllSlugs(): string[] {
  return normalizedCategories.map((c) => c.slug);
}

export const CategoryService = {
  getAll,
  getBySlug,
  getByName,
  getAllSlugs,
};

export default CategoryService;
