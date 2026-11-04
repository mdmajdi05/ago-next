import type { MetadataRoute } from 'next';
import { getAllSlugs as getProductSlugs } from '@/services/productService';
import { getAllSlugs as getBrandSlugs } from '@/services/brandService';
import { getAllSlugs as getCategorySlugs } from '@/services/categoryService';
import { siteConfig } from '@/config/site';

const baseUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/contact',
    '/products',
    '/brands',
    '/blog',
    '/about',
    '/services',
    '/disclaimer',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
  }));

  const productRoutes: MetadataRoute.Sitemap = getProductSlugs().map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified,
  }));

  const brandRoutes: MetadataRoute.Sitemap = getBrandSlugs().map((slug) => ({
    url: `${baseUrl}/brands/${slug}`,
    lastModified,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getCategorySlugs().map((slug) => ({
    url: `${baseUrl}/categories/${slug}`,
    lastModified,
  }));

  return [...staticRoutes, ...productRoutes, ...brandRoutes, ...categoryRoutes];
}
