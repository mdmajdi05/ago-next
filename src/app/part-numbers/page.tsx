import type { Metadata } from 'next';
import Link from 'next/link';

import { productService } from '@/services';
import { breadcrumbSchema, buildPageMetadata, collectionPageSchema } from '@/lib/seo';

const catalogueSize = productService.getAll().length.toLocaleString('en-US');

export const metadata: Metadata = buildPageMetadata({
  title: 'A–Z Gas Turbine Part Number Index',
  description:
    `Search ${catalogueSize} gas turbine and industrial part numbers A–Z by brand and category. Find a part number and request availability, lead time and pricing from AGO Aviation.`,
  path: '/part-numbers',
  keywords: [
    'gas turbine part number search',
    'part number index',
    'GE part numbers',
    'Siemens part numbers',
    'industrial spare part lookup',
  ],
  image: '/ago-aviation/product-turbine-blade.jpg',
  imageAlt: 'AGO Aviation A–Z gas turbine part number index',
});

export default function PartNumbersPage() {
  const groups = productService.getPartIndex();
  const total = groups.reduce((sum, group) => sum + group.products.length, 0);

  // Cap each letter group's display so the page stays fast; the full
  // index stays reachable via /products?search=.
  const PART_INDEX_CAP = 60;
  const cappedGroups = groups.map((group) => ({
    ...group,
    products: group.products.slice(0, PART_INDEX_CAP),
  }));
  const allProducts = cappedGroups.flatMap((group) => group.products);

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Part Number Index', path: '/part-numbers' },
    ]),
    collectionPageSchema({
      name: 'A–Z Gas Turbine Part Number Index',
      description:
        'Index of gas turbine and industrial spare part numbers supplied by AGO Aviation.',
      path: '/part-numbers',
      items: allProducts.slice(0, 150).map((product) => ({
        name: `${product.brand} ${product.partNumber}`,
        url: `/products/${product.slug}`,
      })),
    }),
  ];

  return (
    <main className="min-h-screen bg-[#f5f8fb] text-[#102b43]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <section className="bg-[#06263b] px-5 py-14 text-white md:px-[7%] md:py-20">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ffc34f]">
          Catalogue Index
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          Part Number Index
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#d7e3ec] md:text-base">
          {total} indexed part numbers across gas turbine, compressor, valve,
          automation, instrumentation and industrial spare part categories.
        </p>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-10">
        <nav
          aria-label="Part number groups"
          className="mb-8 flex flex-wrap gap-2"
        >
          {cappedGroups.map((group) => (
            <a
              key={group.key}
              href={`#group-${group.key}`}
              className="rounded-full border border-[#d6e1e9] bg-white px-3 py-1.5 text-xs font-bold text-[#123c5b] transition hover:border-[#d69a32] hover:text-[#b77b1c]"
            >
              {group.key} ({group.products.length})
            </a>
          ))}
        </nav>

        <div className="space-y-10">
          {cappedGroups.map((group) => (
            <section key={group.key} id={`group-${group.key}`} className="scroll-mt-28">
              <h2 className="mb-4 border-b border-[#dfe7ed] pb-2 text-xl font-bold text-[#123c5b]">
                {group.key}
              </h2>

              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-[#e1e8ee] bg-white px-4 py-3 transition hover:border-[#d69a32] hover:shadow-[0_8px_20px_rgba(12,39,60,0.06)]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-mono text-xs font-bold text-[#123c5b]">
                        {product.partNumber}
                      </span>
                      <span className="mt-0.5 block truncate text-[10px] text-[#718394]">
                        {product.brand} · {product.type}
                      </span>
                    </span>
                    <span className="shrink-0 text-[#d69a32] transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
