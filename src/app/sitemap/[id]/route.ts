import { generateSitemaps, routesForChunk } from '@/lib/sitemap';

export const revalidate = 86_400;

// Pre-render every chunk at build time so crawlers get a static file instead
// of a server-rendered response.
export async function generateStaticParams() {
  return generateSitemaps().map(({ id }) => ({ id: `${id}.xml` }));
}

/**
 * Serves one sitemap chunk: `/sitemap/0.xml` holds the non-product routes,
 * `/sitemap/1.xml` … `/sitemap/6.xml` hold the product URLs (10,000 each).
 * Every chunk stays well under Google's 50,000-URL-per-file limit.
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

  const entries = routesForChunk(id);

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...entries.flatMap((entry) => {
      const images = (entry.images || []).map(
        (image) => `    <image:image><image:loc>${image}</image:loc></image:image>`
      );

      return [
        '  <url>',
        `    <loc>${entry.url}</loc>`,
        `    <lastmod>${new Date(entry.lastModified ?? new Date()).toISOString()}</lastmod>`,
        `    <changefreq>${entry.changeFrequency || 'monthly'}</changefreq>`,
        `    <priority>${entry.priority ?? 0.5}</priority>`,
        ...images,
        '  </url>',
      ];
    }),
    '</urlset>',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
}
