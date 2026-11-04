import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categoryService, productService, brandService } from '@/services';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = categoryService.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryService.getBySlug(slug);
  if (!category) {
    return {
      title: 'Category Not Found - AGO Aviation',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: category.name,
    description:
      category.description || `Genuine ${category.name} gas turbine parts from AGO Aviation.`,
    openGraph: {
      title: category.name,
      description: category.description,
      type: 'website',
      url: `https://www.agoaviation.com/categories/${category.slug}`,
      images: [{ url: siteConfig.ogImage }],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryService.getBySlug(slug);
  if (!category) notFound();

  const products = productService.getByCategory(slug);
  const brands = brandService.getAll().filter((brand) =>
    brand.categories.includes(category.name),
  );

  const breadcrumbs = [
    { label: 'Products', href: '/products' },
    { label: category.name, href: `/categories/${category.slug}` },
  ];

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="lg:flex lg:gap-12">
        <div className="lg:w-1/3 shrink-0">
          <div className="rounded-xl border border-line bg-slate-50 p-8 text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {category.name}
            </h1>
            <p className="mt-1 text-sm text-muted">{category.description}</p>
            <p className="mt-3 text-sm font-semibold text-ink">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
          </div>

          {brands.length > 0 && (
            <section className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3 block">
                Brands in this category
              </h2>
              <ul className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <li key={brand.slug}>
                    <Link
                      href={`/brands/${brand.slug}`}
                      className="text-sm border border-line rounded-full px-3 py-1 text-muted hover:bg-primary hover:text-white transition-colors"
                    >
                      {brand.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <section className="flex-1">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-wider mb-6 block">
            {category.name} Products
          </h2>
          {products.length === 0 ? (
            <p className="text-muted">No products listed in this category.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="rounded-xl border border-line bg-slate-50 p-4 hover:border-primary transition-colors">
                      <p className="text-sm font-semibold text-primary line-clamp-2">
                        {product.title}
                      </p>
                      <p className="text-xs text-muted mt-1">{product.part}</p>
                      <p className="text-xs text-muted mt-1">{product.brand}</p>
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
