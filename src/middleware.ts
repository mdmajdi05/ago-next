import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import productsData from './data/static/products/products.json';
import brandsData from './data/static/brands/brands.json';
import navData from './data/static/nav.json';

interface RawProduct {
  brand: string;
  part: string;
  url: string;
}

interface RawBrand {
  name: string;
}

interface RawCategory {
  slug: string;
  page: string;
}

/** Same slug algorithm used by the catalogue services. */
function slugify(value: string): string {
  return (value || '')
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Normalizes a legacy filename so case, spaces and punctuation do not matter. */
function legacyKey(value: string): string {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // keep the raw value if it is not valid percent-encoding
  }

  return decoded
    .replace(/^\/+/, '')
    .replace(/\.html?$/i, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Build a single lookup table from the catalogue, brands and categories.
const legacyRedirects = new Map<string, string>();

for (const category of navData.categories as RawCategory[]) {
  legacyRedirects.set(legacyKey(category.page), `/categories/${category.slug}`);
  legacyRedirects.set(
    legacyKey(`category-${category.slug}`),
    `/categories/${category.slug}`
  );
}

for (const brand of brandsData as RawBrand[]) {
  const slug = slugify(brand.name);
  legacyRedirects.set(legacyKey(brand.name), `/brands/${slug}`);
  legacyRedirects.set(legacyKey(`${brand.name}.html`), `/brands/${slug}`);
}

// Products take precedence over generic brand/category keys.
for (const product of productsData as RawProduct[]) {
  const slug = slugify(`${product.brand}-${product.part}`);
  legacyRedirects.set(legacyKey(product.url), `/products/${slug}`);
}

// Hand-mapped legacy landing pages and articles that have no 1:1 catalogue row.
const manualRedirects: Record<string, string> = {
  // Catalogue and platform landing pages
  'ge-gas-turbine-spare-parts-inventory': '/products',
  'top-brand-and-spare-parts': '/brands',
  'gt13e2-gt8c1-2-parts-catalog': '/categories/turbine-parts',
  'general-electric-6fa-turbine-parts-369': '/categories/turbine-parts',
  'general-electric-ge': '/brands/ge',
  'ge-turbine': '/brands/ge',
  'turbine-parts': '/categories/turbine-parts',
  'engine-portfolio': '/products',
  'stock-and-inventory': '/products',
  'turbine-platforms': '/products',
  'lm2500-spare-parts': '/products/ge-lm2500',
  'lm5000-spare-parts': '/categories/turbine-parts',
  'lm6000-spare-parts': '/categories/turbine-parts',
  'cfm56-engine-parts': '/categories/turbine-parts',
  'ge-lm-2500-turbine-parts-specialist-1': '/products/ge-lm2500',

  // Legacy brand pages that are not in the current catalogue
  alstom: '/categories/turbine-parts',
  ansaldo: '/categories/turbine-parts',
  'zorya-mashproekt': '/categories/turbine-parts',
  'solar-turbines': '/categories/turbine-parts',
  'rolls-royce': '/categories/turbine-parts',

  // Specific legacy part pages whose old filename differs from the data row
  'bently-nevada-330130-040-00-00-top-spare-parts': '/brands/bently-nevada',
  'bently-nevada-turbine-monitoring-system-precharger-330180-50-00':
    '/products/bently-nevada-330180-50-00',

  // Static pages
  home: '/',
  index: '/',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  products: '/products',
  brands: '/brands',
  blog: '/blog',

  // Blog articles
  'evaluate-industrial-spare-parts-supplier':
    '/blog/evaluate-industrial-spare-parts-supplier',
  'gas-turbine-spare-parts-procurement-checklist':
    '/blog/gas-turbine-spare-parts-procurement-checklist',
  'gas-turbine-hot-gas-path-parts-guide':
    '/blog/gas-turbine-hot-gas-path-parts-guide',
  'verify-gas-turbine-spare-part-number':
    '/blog/verify-gas-turbine-spare-part-number',
  'gas-turbine-outage-spares-planning':
    '/blog/gas-turbine-outage-spares-planning',
  'ge-frame-5-6-7-9': '/blog/ge-frame-5-6-7-9',
};

for (const [source, destination] of Object.entries(manualRedirects)) {
  legacyRedirects.set(legacyKey(source), destination);
}

const CANONICAL_HOST = 'www.agoaviation.com';
const APEX_HOST = 'agoaviation.com';

export function middleware(request: NextRequest) {
  const { pathname, host } = request.nextUrl;
  const requestHost = request.headers.get('host') || host || '';

  // Send the apex domain to the canonical www host.
  if (requestHost.split(':')[0].toLowerCase() === APEX_HOST) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Canonicalise mixed-case paths for routes that are not legacy files.
  const hasFileExtension = /\.[a-z0-9]+$/i.test(pathname);
  if (!hasFileExtension && pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  // Only legacy .html URLs need lookup; current routes are left untouched.
  if (/\.html?$/i.test(pathname)) {
    const destination = legacyRedirects.get(legacyKey(pathname));

    if (destination) {
      const url = request.nextUrl.clone();
      url.pathname = destination;
      return NextResponse.redirect(url, 301);
    }

    // Any other .html URL is an old page we no longer serve. Send it to the
    // catalogue index instead of returning a soft 404.
    const url = request.nextUrl.clone();
    url.pathname = '/products';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run on every path except Next internals and static assets.
     */
    '/((?!_next/static|_next/image|favicon.ico|images|assets|ago-aviation|fonts).*)',
  ],
};
