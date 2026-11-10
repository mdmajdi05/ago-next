import { siteConfig } from '@/config/site';
import { getAll as getAllProducts } from '@/services/productService';
import { getTypes } from '@/services/productService';
import { getAllSlugs as getBrandSlugs } from '@/services/brandService';
import {
  getAll as getCategories,
  getAllSlugs as getCategorySlugs,
} from '@/services/categoryService';
import { MIN_PRODUCTS_PER_TYPE_PAGE } from '@/lib/catalog/taxonomy';
import { blogPosts } from '@/data/blog/posts';
import { getPlatformSlugs } from '@/data/platforms';
import fs from 'fs';
import path from 'path';

const baseUrl = siteConfig.url;

/** 10,000 URLs per chunk — Google caps at 50,000 per sitemap file. */
const PRODUCTS_PER_SITEMAP = 10_000;

// Use file mtimes as genuine last-modified dates instead of "now".
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

/** Split the catalogue into chunks: chunk 0 = static routes, 1..N = product chunks. */
function generateSitemapChunks(): Array<{ id: number }> {
  const total = getAllProducts().length;
  const chunks = Math.max(1, Math.ceil(total / PRODUCTS_PER_SITEMAP));
  return Array.from({ length: chunks + 1 }, (_, id) => ({ id }));
}

/** Build chunk 0: non-product routes for /sitemap/0.xml. */
function buildChunk0(): Array<{
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}> {
  const now = new Date().toISOString();

  const core = [
    { path: '', priority: 1 },
    { path: '/products', priority: 0.9 },
    { path: '/categories', priority: 0.8 },
    { path: '/brands', priority: 0.8 },
    { path: '/platforms', priority: 0.8 },
    { path: '/part-numbers', priority: 0.8 },
    { path: '/services', priority: 0.7 },
    { path: '/about', priority: 0.6 },
    { path: '/contact', priority: 0.6 },
    { path: '/privacy', priority: 0.2 },
    { path: '/terms', priority: 0.2 },
    { path: '/disclaimer', priority: 0.2 },
  ].map(({ path, priority }) => ({
    url: baseUrl + path,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority,
  }));

  const categories = getCategorySlugs().map((slug) => ({
    url: baseUrl + '/categories/' + slug.toLowerCase(),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const brands = getBrandSlugs().map((slug) => ({
    url: baseUrl + '/brands/' + slug.toLowerCase(),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const types = getCategories().flatMap((category) =>
    getTypes(category.slug)
      .filter((type) => type.count >= MIN_PRODUCTS_PER_TYPE_PAGE)
      .map((type) => ({
        url: baseUrl + '/categories/' + category.slug + '/' + type.slug,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      }))
  );

  const blog = (blogPosts || []).map((post) => ({
    url: baseUrl + '/blog/' + post.slug,
    lastModified: post.dateModified
      ? new Date(post.dateModified).toISOString()
      : now,
    changeFrequency: 'monthly',
    priority: 0.6,
    images: [baseUrl + post.image],
  }));

  const platforms = getPlatformSlugs().map((slug) => ({
    url: baseUrl + '/platforms/' + slug,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...core, ...categories, ...brands, ...types, ...blog, ...platforms];
}

/** Build product-URL entries for a given chunk ID (chunks 1..N). */
function productChunkUrls(chunkId: number): Array<{ url: string; lastmod: string }> {
  const start = (chunkId - 1) * PRODUCTS_PER_SITEMAP;
  const end = start + PRODUCTS_PER_SITEMAP;
  const products = getAllProducts().slice(start, end);
  const now = new Date().toISOString();
  return products.map((p) => ({
    url: baseUrl + '/products/' + p.slug,
    lastmod: now,
  }));
}

export const revalidate = 86_400;

export async function GET(request: Request): Promise<Response> {
  const maps = generateSitemapChunks();
  const now = new Date().toISOString();

  // Chunk 0 entries go into the sitemap index as <urlset> entries
  const chunk0 = buildChunk0();

  // Assemble the full sitemapindex XML
  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  // List every chunk (including chunk 0) so Google knows where to fetch URL sets
  for (const { id } of maps) {
    lines.push(
      `  <sitemap><loc>${baseUrl}/sitemap/${id}.xml</loc><lastmod>${now}</lastmod></sitemap>`
    );
  }

  // Chunk 0: non-product URL set as <urlset> entries
  for (const entry of chunk0) {
    lines.push(
      `  <url><loc>${entry.url}</loc><lastmod>${entry.lastModified}</lastmod></url>`
    );
  }

  // Product URL sets for chunks 1 through N
  for (const { id } of maps.slice(1)) {
    const urls = productChunkUrls(id);
    for (const u of urls) {
      lines.push(
        `  <url><loc>${u.url}</loc><lastmod>${u.lastmod}</lastmod></url>`
      );
    }
  }

  lines.push('</sitemapindex>');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
}