import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { categoryService, productService } from '@/services';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { MIN_PRODUCTS_PER_TYPE_PAGE } from '@/lib/catalog/taxonomy';

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
    return {
      title: 'Page Not Found',
      robots: { index: false, follow: false },
    };
  }

  const title = `${typeSummary.name} - ${category.name}`;
  const description = `Browse ${typeSummary.count} ${typeSummary.name.toLowerCase()} part numbers in the ${category.name} category. Request availability and quotations from AGO Aviation.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/categories/${category.slug}/${typeSummary.slug}`,
    },
    openGraph: {
      title: `${title} | AGO Aviation`,
      description,
      type: 'website',
      url: `${siteConfig.url}/categories/${category.slug}/${typeSummary.slug}`,
      images: [{ url: siteConfig.ogImage }],
    },
  };
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

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
                {product.title}
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
