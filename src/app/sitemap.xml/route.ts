import { siteConfig } from '@/config/site';
import { generateSitemaps } from '@/lib/sitemap';

export const revalidate = 86_400;

/**
 * `/sitemap.xml` is the sitemap index. It only lists the chunk files — no
 * individual URLs — because a single sitemap file may hold at most 50,000
 * URLs and the catalogue has 52,821.
 *
 * Chunk 0 holds the non-product routes; chunks 1..N hold the product URLs,
 * 10,000 each.
 */
export async function GET(): Promise<Response> {
  const maps = generateSitemaps();
  const lastmod = new Date().toISOString();

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...maps.map(
      ({ id }) =>
        `  <sitemap><loc>${siteConfig.url}/sitemap/${id}.xml</loc><lastmod>${lastmod}</lastmod></sitemap>`
    ),
    '</sitemapindex>',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
}
