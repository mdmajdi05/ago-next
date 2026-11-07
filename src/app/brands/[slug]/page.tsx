import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { brandService, productService, categoryService } from '@/services';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = brandService.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = brandService.getBySlug(slug);
  if (!brand) {
    return {
      title: 'Brand Not Found - AGO Aviation',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${brand.name} Spare Parts`,
    description:
      brand.description || `Genuine ${brand.name} gas turbine parts and spares supplied by AGO Aviation worldwide.`,
    alternates: {
      canonical: `${siteConfig.url}/brands/${brand.slug}`,
    },
    openGraph: {
      title: brand.name,
      description: brand.description,
      type: 'website',
      url: `https://www.agoaviation.com/brands/${brand.slug}`,
      images: [{ url: siteConfig.ogImage }],
    },
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = brandService.getBySlug(slug);
  if (!brand) notFound();

  const products = productService.getByBrand(slug);
  const categories = categoryService
    .getAll()
    .filter((category) => brand.categories.includes(category.name));

  const breadcrumbs = [
    { label: 'Brands', href: '/brands' },
    { label: brand.name, href: `/brands/${brand.slug}` },
  ];

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="lg:flex lg:gap-12">
        <div className="lg:w-1/3 shrink-0">
          <div className="rounded-xl border border-line bg-slate-50 p-8 text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {brand.name}
            </h1>
            <p className="text-sm text-muted">{brand.group}</p>
            <p className="mt-3 text-sm font-semibold text-ink">
              {brand.count} product{brand.count !== 1 ? 's' : ''}
            </p>
            {brand.description && (
              <p className="mt-4 text-sm text-muted">{brand.description}</p>
            )}
          </div>

          {categories.length > 0 && (
            <section className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3 block">
                Categories
              </h2>
              <ul className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-sm border border-line rounded-full px-3 py-1 text-muted hover:bg-primary hover:text-white transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <section className="flex-1">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-wider mb-6 block">
            Products by {brand.name}
          </h2>
          {products.length === 0 ? (
            <p className="text-muted">No products listed for this brand.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="rounded-xl border border-line bg-slate-50 p-4 hover:border-primary transition-colors">
                      <p className="text-sm font-semibold text-primary line-clamp-2">
                        {product.title}
                      </p>
                      <p className="text-xs text-muted mt-1">{product.partNumber}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
