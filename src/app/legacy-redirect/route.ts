import { NextResponse } from 'next/server';

import { siteConfig } from '@/config/site';
import { productService } from '@/services';

export const dynamic = 'force-dynamic';

/**
 * Resolves an unmapped legacy `.html` URL to its canonical product page and
 * returns a real 301.
 *
 * Middleware proxies only legacy filenames here. The lookup uses the aliases
 * stored on each imported product, so all 52k old part pages can redirect
 * without shipping a multi-megabyte redirect map to the edge runtime.
 */
export async function GET(request: Request): Promise<Response> {
  // Middleware passes the original legacy path in a header, because a
  // rewrite keeps the original request URL.
  const raw = request.headers.get('x-legacy-path') || '';

  let clean = raw;
  try {
    clean = decodeURIComponent(raw);
  } catch {
    // keep the raw value when it is not valid percent-encoding
  }

  const product = productService.getBySlug(
    clean.replace(/\.html?$/i, '').replace(/^\/+/, '').trim()
  );

  if (product) {
    return NextResponse.redirect(product.canonicalUrl, 301);
  }

  return NextResponse.redirect(`${siteConfig.url}/products`, 301);
}
