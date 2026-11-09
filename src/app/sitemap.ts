import type { MetadataRoute } from 'next';
import { getAll as getAllProducts, getTypes } from '@/services/productService';
import { getAllSlugs as getBrandSlugs } from '@/services/brandService';
import {
  getAll as getCategories,
  getAllSlugs as getCategorySlugs,
} from '@/services/categoryService';
import { MIN_PRODUCTS_PER_TYPE_PAGE } from '@/lib/catalog/taxonomy';
import { siteConfig } from '@/config/site';
import { blogPosts } from '@/data/blog/posts';
import { getPlatformSlugs } from '@/data/platforms';
import { getProductImage } from '@/lib/catalog/images';
import fs from 'fs';
import path from 'path';

const baseUrl = siteConfig.url;

// Use file mtimes as genuine last-modified dates instead of "now".
// This keeps crawlers from re-crawling every URL on every build.
function mtime(rel: string, fallback: Date): Date {
  try {
    return fs.statSync(path.join(process.cwd(), rel)).mtime;
  } catch {
    return fallback;
  }
}

const buildTime = new Date();
const staticLastmod = mtime('src/app/page.tsx', buildTime);
const productsLastmod = mtime('src/data/static/products/products.json', buildTime);
const legacyCatalogLastmod = mtime(
  'src/data/static/products/legacy-catalog.json',
  buildTime
);
const brandsLastmod = mtime('src/data/static/brands/brands.json', buildTime);
const navLastmod = mtime('src/data/static/nav.json', buildTime);
const categoryLastmod = mtime('src/app/categories/[slug]/page.tsx', navLastmod);
const blogLastmod = mtime('src/data/blog/posts.ts', staticLastmod);
const platformsLastmod = mtime('src/data/platforms.ts', staticLastmod);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '', priority: 1, lastModified: staticLastmod },
    { path: '/products', priority: 0.9, lastModified: productsLastmod },
    { path: '/categories', priority: 0.8, lastModified: navLastmod },
    { path: '/brands', priority: 0.8, lastModified: brandsLastmod },
    { path: '/platforms', priority: 0.8, lastModified: platformsLastmod },
    { path: '/part-numbers', priority: 0.8, lastModified: productsLastmod },
    { path: '/services', priority: 0.7, lastModified: staticLastmod },
    { path: '/about', priority: 0.6, lastModified: staticLastmod },
    { path: '/contact', priority: 0.6, lastModified: staticLastmod },
    { path: '/blog', priority: 0.6, lastModified: staticLastmod },
    { path: '/privacy', priority: 0.2, lastModified: staticLastmod },
    { path: '/terms', priority: 0.2, lastModified: staticLastmod },
    { path: '/disclaimer', priority: 0.2, lastModified: staticLastmod },
  ].map(({ path: p, priority, lastModified }) => ({
    url: `${baseUrl}${p}`,
    lastModified,
    changeFrequency: p === '' ? 'weekly' : 'monthly',
    priority,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getCategorySlugs().map(
    (slug) => ({
      url: `${baseUrl}/categories/${slug.toLowerCase()}`,
      lastModified: categoryLastmod,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  );

  const brandRoutes: MetadataRoute.Sitemap = getBrandSlugs().map((slug) => ({
    url: `${baseUrl}/brands/${slug.toLowerCase()}`,
    lastModified: brandsLastmod,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const typeRoutes: MetadataRoute.Sitemap = getCategories().flatMap((category) =>
    getTypes(category.slug)
      .filter((type) => type.count >= MIN_PRODUCTS_PER_TYPE_PAGE)
      .map((type) => ({
        url: `${baseUrl}/categories/${category.slug}/${type.slug}`,
        lastModified: categoryLastmod,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
  );

  // Every genuine product page is canonical and indexable.
  // Product routes use the newer of products.json / legacy-catalog.json mtime.
  const productLastmod = new Date(
    Math.max(productsLastmod.getTime(), legacyCatalogLastmod.getTime())
  );
  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map(
    (product) => ({
      url: product.canonicalUrl,
      lastModified: productLastmod,
      changeFrequency: 'monthly',
      priority: product.tier === 'A' ? 0.8 : 0.6,
      ...(product.tier === 'A'
        ? { images: [getProductImage(product)].filter(Boolean) as string[] }
        : {}),
    })
  );

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified),
    changeFrequency: 'monthly',
    priority: 0.6,
    images: [`${baseUrl}${post.image}`],
  }));

  const platformRoutes: MetadataRoute.Sitemap = getPlatformSlugs().map(
    (slug) => ({
      url: `${baseUrl}/platforms/${slug}`,
      lastModified: platformsLastmod,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  );

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...typeRoutes,
    ...brandRoutes,
    ...platformRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}
