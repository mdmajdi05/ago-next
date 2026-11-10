import { siteConfig } from '@/config/site';
import { generateSitemaps } from '../sitemap';

export const revalidate = 86_400;

export async function GET(): Promise<Response> {
  const maps = await generateSitemaps();
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
