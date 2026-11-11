import { generateSitemaps, renderSitemapIndex } from '@/lib/sitemap';

export const revalidate = 86_400;

/**
 * `/sitemap.xml` is the sitemap index. It only lists the chunk files — no
 * individual URLs — because a single sitemap file may hold at most 50,000
 * URLs and 50 MB, and the catalogue has 52,821 product URLs.
 *
 * Chunk 0 holds the non-product routes; chunks 1..N hold the product URLs,
 * 10,000 each.
 */
export async function GET(): Promise<Response> {
  const ids = generateSitemaps().map(({ id }) => id);
  const body = renderSitemapIndex(ids, new Date().toISOString());

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
}
