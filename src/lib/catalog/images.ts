import type { Product } from '@/types/product';

/**
 * Category-level image fallbacks so product pages do not all share a single
 * generic image (which reads as duplicate content to search engines).
 */
const CATEGORY_IMAGES: Record<string, string> = {
  'turbine-parts': '/ago-aviation/category-turbine.jpg',
  'compressor-parts': '/ago-aviation/category-engine.jpg',
  'valves-actuators': '/ago-aviation/category-fuel.jpg',
  'automation-controls': '/ago-aviation/category-electrical.jpg',
  instrumentation: '/ago-aviation/category-avionics.jpg',
  'electrical-motors': '/ago-aviation/category-electrical.jpg',
  'mechanical-transmission-bearings': '/ago-aviation/category-engine.jpg',
  'seals-filters': '/ago-aviation/category-accessories.jpg',
  'piping-fittings': '/ago-aviation/category-fuel.jpg',
};

const DEFAULT_IMAGE = '/ago-aviation/product-turbine-blade.jpg';

export function getCategoryImage(categorySlug: string): string {
  return CATEGORY_IMAGES[categorySlug] || DEFAULT_IMAGE;
}

export function getProductImage(product: Product): string {
  return product.image || getCategoryImage(product.categorySlug);
}
