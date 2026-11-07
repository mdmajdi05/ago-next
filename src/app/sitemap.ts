import type { MetadataRoute } from 'next';
import {
  getIndexable as getIndexableProducts,
  getTypes,
} from '@/services/productService';
import { getAllSlugs as getBrandSlugs } from '@/services/brandService';
import {
  getAll as getCategories,
  getAllSlugs as getCategorySlugs,
} from '@/services/categoryService';
import { MIN_PRODUCTS_PER_TYPE_PAGE } from '@/lib/catalog/taxonomy';
import { siteConfig } from '@/config/site';

const baseUrl = siteConfig.url;
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '', priority: 1 },
    { path: '/products', priority: 0.9 },
    { path: '/categories', priority: 0.8 },
    { path: '/brands', priority: 0.8 },
    { path: '/part-numbers', priority: 0.8 },
    { path: '/services', priority: 0.7 },
    { path: '/about', priority: 0.6 },
    { path: '/contact', priority: 0.6 },
    { path: '/blog', priority: 0.6 },
    { path: '/privacy', priority: 0.2 },
    { path: '/terms', priority: 0.2 },
    { path: '/disclaimer', priority: 0.2 },
  ].map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getCategorySlugs().map(
    (slug) => ({
      url: `${baseUrl}/categories/${slug.toLowerCase()}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  );

  const brandRoutes: MetadataRoute.Sitemap = getBrandSlugs().map((slug) => ({
    url: `${baseUrl}/brands/${slug.toLowerCase()}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const typeRoutes: MetadataRoute.Sitemap = getCategories().flatMap((category) =>
    getTypes(category.slug)
      .filter((type) => type.count >= MIN_PRODUCTS_PER_TYPE_PAGE)
      .map((type) => ({
        url: `${baseUrl}/categories/${category.slug}/${type.slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
  );

  // Only canonical, indexable product pages belong in the sitemap.
  const productRoutes: MetadataRoute.Sitemap = getIndexableProducts().map(
    (product) => ({
      url: product.canonicalUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: product.tier === 'A' ? 0.8 : 0.6,
    })
  );

  return [...staticRoutes, ...categoryRoutes, ...typeRoutes, ...brandRoutes, ...productRoutes];
}
