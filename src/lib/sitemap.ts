import type { MetadataRoute } from 'next';
import { getAll as getAllProducts, getTypes } from '@/services/productService';
import { getAllSlugs as getBrandSlugs } from '@/services/brandService';
import {
  getAll as getCategories,
  getAllSlugs as getCategorySlugs,
} from '@/services/categoryService';
import { MIN_PRODUCTS_PER_TYPE_PAGE } from '@/lib/catalog/taxonomy';
import { blogPosts } from '@/data/blog/posts';
import { getPlatformSlugs } from '@/data/platforms';
import { getProductImage } from '@/lib/catalog/images';
import { siteConfig } from '@/config/site';
import fs from 'fs';
import path from 'path';

const baseUrl = siteConfig.url;

/**
 * Google accepts at most 50,000 URLs per sitemap file. The catalogue has more
 * than that, so products are split into 10,000-URL chunks and the non-product
 * routes live in chunk 0. `/sitemap.xml` lists every chunk.
 */
export const PRODUCTS_PER_SITEMAP = 10_000;

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

/** Chunk ids: 0 holds the non-product routes, 1..N hold product URLs. */
export function generateSitemaps(): Array<{ id: number }> {
  const total = getAllProducts().length;
  const chunks = Math.max(1, Math.ceil(total / PRODUCTS_PER_SITEMAP));
  return Array.from({ length: chunks + 1 }, (_, id) => ({ id }));
}

function staticRoutes(): MetadataRoute.Sitemap {
  return [
    { path: '', priority: 1, lastModified: staticLastmod },
    { path: '/products', priority: 0.9, lastModified: productsLastmod },
    { path: '/categories', priority: 0.8, lastModified: navLastmod },
    { path: '/brands', priority: 0.8, lastModified: brandsLastmod },
    { path: '/platforms', priority: 0.8, lastModified: platformsLastmod },
    { path: '/part-numbers', priority: 0.8, lastModified: productsLastmod },
    { path: '/services', priority: 0.7, lastModified: staticLastmod },
    { path: '/about', priority: 0.6, lastModified: staticLastmod },
    { path: '/contact', priority: 0.6, lastModified: staticLastmod },
    { path: '/blog', priority: 0.6, lastModified: blogLastmod },
    { path: '/privacy', priority: 0.2, lastModified: staticLastmod },
    { path: '/terms', priority: 0.2, lastModified: staticLastmod },
    { path: '/disclaimer', priority: 0.2, lastModified: staticLastmod },
  ].map(({ path: p, priority, lastModified }) => ({
    url: `${baseUrl}${p}`,
    lastModified,
    changeFrequency: p === '' ? 'weekly' : 'monthly',
    priority,
  }));
}

/** Chunk 0: every non-product route (home, catalogue hubs, blog, platforms). */
export function nonProductRoutes(): MetadataRoute.Sitemap {
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

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified),
    changeFrequency: 'monthly',
    priority: 0.6,
    images: [`${baseUrl}${post.image}`],
  }));

  const platformRoutes: MetadataRoute.Sitemap = getPlatformSlugs().map((slug) => ({
    url: `${baseUrl}/platforms/${slug}`,
    lastModified: platformsLastmod,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticRoutes(),
    ...categoryRoutes,
    ...typeRoutes,
    ...brandRoutes,
    ...platformRoutes,
    ...blogRoutes,
  ];
}

/** Chunks 1..N: the product URLs, 10,000 per chunk. */
export function productRoutes(id: number): MetadataRoute.Sitemap {
  const productLastmod = new Date(
    Math.max(productsLastmod.getTime(), legacyCatalogLastmod.getTime())
  );

  const start = (id - 1) * PRODUCTS_PER_SITEMAP;
  const products = getAllProducts().slice(start, start + PRODUCTS_PER_SITEMAP);

  return products.map((product) => ({
    url: product.canonicalUrl,
    lastModified: productLastmod,
    changeFrequency: 'monthly',
    priority: product.tier === 'A' ? 0.8 : 0.6,
    ...(product.tier === 'A'
      ? { images: [getProductImage(product)].filter(Boolean) as string[] }
      : {}),
  }));
}

/** Every URL for a given chunk id. */
export function routesForChunk(id: number): MetadataRoute.Sitemap {
  return id === 0 ? nonProductRoutes() : productRoutes(id);
}
