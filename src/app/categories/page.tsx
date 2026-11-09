import type { Metadata } from 'next';
import Link from 'next/link';

import { categoryService, productService } from '@/services';
import { breadcrumbSchema, buildPageMetadata, collectionPageSchema } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Gas Turbine & Industrial Spare Parts Categories',
  description:
    'Browse 9 spare parts categories covering turbine parts, compressors, valves, automation, instrumentation, electrical motors, mechanical transmission, seals and piping.',
  path: '/categories',
  keywords: [
    'gas turbine parts categories',
    'industrial spare parts categories',
    'turbine parts by category',
    'spare parts catalogue categories',
  ],
  image: '/ago-aviation/category-turbine.jpg',
  imageAlt: 'AGO Aviation spare parts categories',
});

const CATEGORY_IMAGES: Record<string, string> = {
  'turbine-parts': '/ago-aviation/category-turbine.jpg',
  'compressor-parts': '/ago-aviation/category-engine.jpg',
  'valves-actuators': '/ago-aviation/category-fuel.jpg',
  'automation-controls': '/ago-aviation/category-electrical.jpg',
  instrumentation: '/ago-aviation/category-avionics.jpg',
  'electrical-motors': '/ago-aviation/category-electrical.jpg',
  'mechanical-transmission-bearings': '/ago-aviation/category-engine.jpg',
  'seals-filters': '/ago-aviation/category-accessories.jpg',
  'piping-fittings': '/ago-aviation/category-fuel.jpg',
};

export default function CategoriesPage() {
  const categories = categoryService.getAll();

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Categories', path: '/categories' },
    ]),
    collectionPageSchema({
      name: 'Gas Turbine & Industrial Spare Parts Categories',
      description:
        'Browse gas turbine, compressor, valve, automation, instrumentation, electrical, mechanical, seal and piping spare part categories.',
      path: '/categories',
      items: categories.map((category) => ({
        name: category.name,
        url: `/categories/${category.slug}`,
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
          Catalogue
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          Product Categories
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#d7e3ec] md:text-base">
          Explore our gas turbine and industrial spare parts catalogue by
          category. Each category lists the parts, brands and sub-types we
          supply worldwide.
        </p>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = productService.getByCategory(category.slug).length;
            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group overflow-hidden rounded-2xl border border-[#e1e8ee] bg-white shadow-[0_5px_22px_rgba(12,39,60,0.04)] transition hover:-translate-y-1 hover:border-[#d69a32] hover:shadow-[0_16px_36px_rgba(12,39,60,0.1)]"
              >
                <div className="relative h-36 overflow-hidden bg-[#eef3f7]">
                  <img
                    src={
                      CATEGORY_IMAGES[category.slug] ||
                      '/ago-aviation/category-accessories.jpg'
                    }
                    alt={`${category.name} category`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-base font-bold text-[#123c5b]">
                      {category.name}
                    </h2>
                    <span className="rounded-full bg-[#e7f0f7] px-2.5 py-1 text-[10px] font-bold text-[#174666]">
                      {count} parts
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-6 text-[#5d7182]">
                    {category.description}
                  </p>
                  <span className="mt-4 inline-block text-[11px] font-bold text-[#d69a32]">
                    Browse category →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-[#e1e8ee] bg-white p-6">
          <p className="text-sm font-bold text-[#123c5b]">
            Can&apos;t find the part you need?
          </p>
          <Link
            href="/part-numbers"
            className="text-sm font-bold text-[#d69a32] hover:underline"
          >
            Browse the A–Z part number index →
          </Link>
        </div>
      </section>
    </main>
  );
}
