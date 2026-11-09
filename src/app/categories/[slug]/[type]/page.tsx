import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { categoryService, productService } from '@/services';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { MIN_PRODUCTS_PER_TYPE_PAGE } from '@/lib/catalog/taxonomy';
import { getCategoryImage } from '@/lib/catalog/images';
import {
  breadcrumbSchema,
  buildPageMetadata,
  collectionPageSchema,
} from '@/lib/seo';

interface TypePageProps {
  params: Promise<{ slug: string; type: string }>;
}

export async function generateStaticParams() {
  return categoryService.getAll().flatMap((category) =>
    productService
      .getTypes(category.slug)
      .filter((type) => type.count >= MIN_PRODUCTS_PER_TYPE_PAGE)
      .map((type) => ({ slug: category.slug, type: type.slug }))
  );
}

export async function generateMetadata({
  params,
}: TypePageProps): Promise<Metadata> {
  const { slug, type } = await params;
  const category = categoryService.getBySlug(slug);
  const typeSummary = category
    ? productService.getTypes(category.slug).find((item) => item.slug === type)
    : undefined;

  if (!category || !typeSummary || typeSummary.count < MIN_PRODUCTS_PER_TYPE_PAGE) {
    return buildPageMetadata({
      title: 'Page Not Found',
      description: 'The requested part type could not be found.',
      path: `/categories/${slug}/${type}`,
      noIndex: true,
    });
  }

  const products = productService.getByType(category.slug, typeSummary.slug);
  const brands = Array.from(new Set(products.map((product) => product.brand)));

  return buildPageMetadata({
    title: `${typeSummary.name} – ${typeSummary.count} ${category.name} Part Numbers`,
    description: `Browse ${typeSummary.count} ${typeSummary.name.toLowerCase()} in the ${category.name.toLowerCase()} range from ${brands.slice(0, 5).join(', ')}. AGO Aviation verifies part numbers, condition and availability, with worldwide quote-based supply.`,
    path: `/categories/${category.slug}/${typeSummary.slug}`,
    keywords: [
      `${typeSummary.name} spare parts`,
      `${typeSummary.name.toLowerCase()} ${category.name.toLowerCase()}`,
      `buy ${typeSummary.name.toLowerCase()}`,
      ...brands.slice(0, 6).map((brand) => `${brand} ${typeSummary.name.toLowerCase()}`),
    ],
    image: getCategoryImage(category.slug),
    imageAlt: `${typeSummary.name} supplied by AGO Aviation`,
  });
}

export default async function TypePage({ params }: TypePageProps) {
  const { slug, type } = await params;
  const category = categoryService.getBySlug(slug);

  if (!category) notFound();

  const typeSummary = productService
    .getTypes(category.slug)
    .find((item) => item.slug === type);

  if (!typeSummary || typeSummary.count < MIN_PRODUCTS_PER_TYPE_PAGE) {
    notFound();
  }

  const products = productService.getByType(category.slug, typeSummary.slug);

  const breadcrumbs = [
    { label: 'Products', href: '/products' },
    { label: category.name, href: `/categories/${category.slug}` },
    {
      label: typeSummary.name,
      href: `/categories/${category.slug}/${typeSummary.slug}`,
    },
  ];

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: category.name, path: `/categories/${category.slug}` },
      {
        name: typeSummary.name,
        path: `/categories/${category.slug}/${typeSummary.slug}`,
      },
    ]),
    collectionPageSchema({
      name: `${typeSummary.name} – ${category.name}`,
      description: `${typeSummary.count} ${typeSummary.name.toLowerCase()} part numbers in the ${category.name} range.`,
      path: `/categories/${category.slug}/${typeSummary.slug}`,
      items: products
        .slice(0, 50)
        .map((product) => ({
          name: `${product.brand} ${product.partNumber}`,
          url: `/products/${product.slug}`,
        })),
    }),
  ];

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className="mt-4 rounded-2xl border border-line bg-slate-50 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          {category.name}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-primary">
          {typeSummary.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Browse {typeSummary.count} {typeSummary.name.toLowerCase()} part
          numbers supplied by AGO Aviation. Send your requirement for
          availability, condition and quotation.
        </p>
        <Link
          href={`/categories/${category.slug}`}
          className="mt-4 inline-block text-sm font-bold text-[#b77b1c] hover:underline"
        >
          ← Back to {category.name}
        </Link>
      </header>

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              href={`/products/${product.slug}`}
              className="block h-full rounded-xl border border-line bg-white p-4 transition-colors hover:border-primary"
            >
              <p className="line-clamp-2 text-sm font-semibold text-primary">
                {product.displayTitle}
              </p>
              <p className="mt-1 font-mono text-xs text-muted">
                {product.partNumber}
              </p>
              <p className="mt-1 text-xs text-muted">{product.brand}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
