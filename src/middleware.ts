import { NextResponse, type NextRequest } from 'next/server';

const FILE_EXTENSION = /\.[a-zA-Z0-9]+$/;

/**
 * 301 redirects for legacy URLs:
 *  - uppercase paths  -> lowercase canonical paths
 *  - `*.html` URLs    -> clean routes (root-level legacy products -> /products/*)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  const isHtml = /\.html$/i.test(pathname);

  // Let real static assets through untouched.
  if (FILE_EXTENSION.test(pathname) && !isHtml) {
    return NextResponse.next();
  }

  let target = pathname;

  if (isHtml) {
    target = target.replace(/\.html$/i, '');

    const isNested =
      target.startsWith('/products/') ||
      target.startsWith('/brands/') ||
      target.startsWith('/categories/');

    if (!isNested) {
      target = `/products/${target.replace(/^\/+/, '')}`;
    }
  }

  const normalized = target.toLowerCase();

  if (normalized !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = normalized;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|ago-aviation).*)',
  ],
};
