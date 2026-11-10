import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categoryService, productService, brandService } from '@/services';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { getCategoryImage } from '@/lib/catalog/images';
import {
  breadcrumbSchema,
  buildPageMetadata,
  collectionPageSchema,
} from '@/lib/seo';

// Cap the number of products rendered on a category page so large
// categories (e.g. Turbine Parts with 25k+ parts) stay fast to build.
const CATEGORY_PAGE_CAP = 96;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86_400;

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
    return buildPageMetadata({
      title: 'Category Not Found',
      description: 'The requested product category could not be found.',
      path: `/categories/${slug}`,
      noIndex: true,
    });
  }

  const products = productService.getByCategory(slug);
  const brands = brandService.getAll().filter((brand) =>
    brand.categories.includes(category.name),
  );
  const brandNames = brands.slice(0, 5).map((brand) => brand.name);
  const brandLabel =
    brandNames.length > 0 ? brandNames.join(', ') : 'leading OEMs';

  return buildPageMetadata({
    title: `${category.name} – ${products.length} Spare Parts from ${brands.length} Brands`,
    description: `Browse ${products.length} ${category.name.toLowerCase()} for gas turbines and industrial plants, including ${brandLabel}. AGO Aviation verifies part numbers, condition and availability, with worldwide delivery and quote-based supply.`,
    path: `/categories/${category.slug}`,
    keywords: [
      `${category.name} spare parts`,
      `${category.name.toLowerCase()} gas turbine`,
      `buy ${category.name.toLowerCase()}`,
      ...brands.slice(0, 6).map((brand) => `${brand.name} ${category.name.toLowerCase()}`),
    ],
    image: getCategoryImage(category.slug),
    imageAlt: `${category.name} supplied by AGO Aviation`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryService.getBySlug(slug);
  if (!category) notFound();

  const products = productService.getByCategory(slug);
  const types = productService.getTypes(category.slug);
  const brands = brandService.getAll().filter((brand) =>
    brand.categories.includes(category.name),
  );

  // Only render a capped window on the page; the full catalogue stays
  // reachable via /products?category=xxx.
  const displayProducts = products.slice(0, CATEGORY_PAGE_CAP);
  const showViewMore = products.length > CATEGORY_PAGE_CAP;

  const breadcrumbs = [
    { label: 'Products', href: '/products' },
    { label: category.name, href: `/categories/${category.slug}` },
  ];

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: category.name, path: `/categories/${category.slug}` },
    ]),
    collectionPageSchema({
      name: `${category.name} Spare Parts`,
      description:
        category.description ||
        `${category.name} spare parts supplied by AGO Aviation.`,
      path: `/categories/${category.slug}`,
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

          {types.length > 0 && (
            <section className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3 block">
                Part types
              </h2>
              <ul className="flex flex-wrap gap-2">
                {types.map((type) =>
                  type.count >= 3 ? (
                    <li key={type.slug}>
                      <Link
                        href={`/categories/${category.slug}/${type.slug}`}
                        className="text-sm border border-line rounded-full px-3 py-1 text-muted hover:bg-primary hover:text-white transition-colors"
                      >
                        {type.name} ({type.count})
                      </Link>
                    </li>
                  ) : (
                    <li
                      key={type.slug}
                      className="text-sm border border-line rounded-full px-3 py-1 text-muted"
                    >
                      {type.name} ({type.count})
                    </li>
                  )
                )}
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
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {displayProducts.map((product) => (
                  <li key={product.slug}>
                    <Link href={`/products/${product.slug}`} className="block">
                      <div className="rounded-xl border border-line bg-slate-50 p-4 hover:border-primary transition-colors">
                        <p className="text-sm font-semibold text-primary line-clamp-2">
                          {product.displayTitle}
                        </p>
                        <p className="text-xs text-muted mt-1">{product.partNumber}</p>
                        <p className="text-xs text-muted mt-1">{product.brand}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {showViewMore && (
                <p className="mt-4 text-sm text-muted">
                  Showing {CATEGORY_PAGE_CAP} of {products.length} products.{" "}
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="text-primary hover:underline"
                  >
                    View all {category.name} parts
                  </Link>
                </p>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
