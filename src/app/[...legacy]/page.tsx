import { notFound, permanentRedirect } from 'next/navigation';

import { productService } from '@/services';

interface LegacyPageProps {
  params: Promise<{ legacy: string[] }>;
}

/**
 * Catch-all for old site URLs that are not handled by middleware.
 *
 * Legacy part pages were named after the part or brand-part pair
 * (`AAF-216A4373P0001.html`). Their aliases are already stored on each
 * `Product`, so a 301 to the canonical `/products/{slug}` keeps whatever
 * authority the old URL had instead of dropping it on a generic catalogue
 * page. Unknown `.html` files fall back to the catalogue index; every other
 * unknown path renders the real 404 page.
 */
export default async function LegacyPage({ params }: LegacyPageProps) {
  const { legacy } = await params;
  const raw = legacy.join('/');

  let clean = raw;
  try {
    clean = decodeURIComponent(raw);
  } catch {
    // keep the raw value when it is not valid percent-encoding
  }

  const product = productService.getBySlug(clean.replace(/\.html?$/i, '').trim());

  if (product) {
    permanentRedirect(`/products/${product.slug}`);
  }

  if (/\.html?$/i.test(clean)) {
    permanentRedirect('/products');
  }

  notFound();
}
