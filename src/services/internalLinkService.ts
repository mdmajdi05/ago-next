import priorityPages from '@/data/internal-links/priority-pages.json';
import { getBySlug } from './productService';
import type { Product } from '@/types/product';

interface PriorityPagesData {
  generatedAt: string;
  counts: {
    drilldown: number;
    indexedProductPages: number;
    assigned: number;
    unassigned: number;
  };
  productLinks: Record<string, string[]>;
  brandLinks: Record<string, string[]>;
  categoryLinks: Record<string, string[]>;
}

const data = priorityPages as PriorityPagesData;

/**
 * Priority pages are product URLs that Google has discovered but not indexed
 * yet (GSC "Discovered – currently not indexed"). They are linked from pages
 * that are already indexed — same brand and category where possible — so the
 * crawler has a short, relevant path to every URL.
 *
 * Regenerate the map with:
 * scripts/generate-priority-internal-links.py <drilldown.xlsx> <indexed.xlsx>
 */
const resolved = new Map<string, Product>();

function resolve(slugs: string[] | undefined): Product[] {
  if (!slugs?.length) return [];

  const products: Product[] = [];
  for (const slug of slugs) {
    let product = resolved.get(slug);
    if (!product) {
      product = getBySlug(slug);
      if (!product) continue;
      resolved.set(slug, product);
    }
    products.push(product);
  }
  return products;
}

/** Priority part numbers linked from this product page (only indexed sources). */
export function getProductLinks(slug: string): Product[] {
  return resolve(data.productLinks[slug]);
}

/** Priority part numbers for a brand hub, e.g. /brands/ge. */
export function getBrandLinks(brandSlug: string): Product[] {
  return resolve(data.brandLinks[brandSlug]);
}

/** Priority part numbers for a category hub, e.g. /categories/turbine-parts. */
export function getCategoryLinks(categorySlug: string): Product[] {
  return resolve(data.categoryLinks[categorySlug]);
}

export const internalLinkService = {
  getProductLinks,
  getBrandLinks,
  getCategoryLinks,
  meta: {
    generatedAt: data.generatedAt,
    counts: data.counts,
  },
};

export default internalLinkService;
