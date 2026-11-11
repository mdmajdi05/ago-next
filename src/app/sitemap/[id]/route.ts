import { generateSitemaps, renderUrlset, routesForChunk } from '@/lib/sitemap';

export const revalidate = 86_400;

// Pre-render every chunk at build time so crawlers get a static file instead
// of a server-rendered response.
export async function generateStaticParams() {
  return generateSitemaps().map(({ id }) => ({ id: `${id}.xml` }));
}

/**
 * Serves one sitemap chunk: `/sitemap/0.xml` holds the non-product routes,
 * `/sitemap/1.xml` … `/sitemap/6.xml` hold the product URLs (10,000 each).
 * Every chunk stays well under Google's 50,000-URL / 50 MB per-file limit.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id: rawId } = await params;
  const id = Number(rawId.replace(/\.xml$/i, ''));

  const valid = generateSitemaps().some((chunk) => chunk.id === id);
  if (!Number.isFinite(id) || !valid) {
    return new Response('Not Found', { status: 404 });
  }

  const body = renderUrlset(routesForChunk(id));

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
}
