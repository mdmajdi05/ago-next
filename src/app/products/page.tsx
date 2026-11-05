import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { productService, brandService, categoryService } from '@/services';
import { cn } from '@/lib/utils';
import { ProductFilters } from '@/types/product';

export const metadata: Metadata = {
  title: 'All Gas Turbine & Industrial Spare Parts',
  description:
    'Browse genuine gas turbine, compressor, automation and industrial spare parts across 24 brands. Search by part number, brand or category and request a quote.',
  openGraph: {
    title: 'All Gas Turbine & Industrial Spare Parts | AGO Aviation',
    description:
      'Browse genuine gas turbine, compressor, automation and industrial spare parts across 24 brands. Search by part number, brand or category and request a quote.',
    type: 'website',
    url: 'https://www.agoaviation.com/products',
    images: [{ url: 'https://www.agoaviation.com/images/engine-100.jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Gas Turbine & Industrial Spare Parts | AGO Aviation',
    description:
      'Browse genuine gas turbine, compressor, automation and industrial spare parts across 24 brands.',
  },
};

interface SearchParams {
  search?: string;
  brand?: string;
  category?: string;
  page?: string;
  limit?: string;
}

interface ProductsPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const search = Array.isArray(params.search)
    ? (params.search[0] || '').trim()
    : (params.search || '').trim();
  const brand = Array.isArray(params.brand)
    ? (params.brand[0] || '').trim()
    : (params.brand || '').trim();
  const category = Array.isArray(params.category)
    ? (params.category[0] || '').trim()
    : (params.category || '').trim();
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1);
  const limit = Math.max(1, Math.min(parseInt(params.limit || '12', 10) || 12, 100));

  const filters: ProductFilters = { page, limit };
  if (search) filters.search = search;
  if (brand) filters.brand = brand;
  if (category) filters.category = category;

  const { products, total, totalPages } = productService.search(filters);
  const allBrands = brandService.getAll();
  const allCategories = categoryService.getAll();
  const hasFilters = Boolean(search || brand || category);

  return (
    <main>
      <section className="ago-page-hero">
        <div className="ago-container">
          <div className="ago-page-hero__inner">
            <span className="ago-eyebrow">Catalogue</span>
            <h1>All gas turbine &amp; industrial spare parts</h1>
            <p>
              Browse {total} part reference{total !== 1 ? 's' : ''} across {allBrands.length} brands.
              Filter by category and brand or search by part number.
            </p>
            <div className="ago-page-hero__actions">
              <Link href="/contact" className="ago-btn ago-btn--primary">
                Request a quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <nav className="ago-crumbs" aria-label="Breadcrumb">
        <div className="ago-container">
          <Link href="/">Home</Link>
          <span className="ago-crumbs__sep">/</span>
          <span>All products</span>
        </div>
      </nav>

      <section className="ago-section ago-section--surface">
        <div className="ago-container">
          <div className="lg:flex lg:gap-10">
            <aside className="lg:w-72 flex-shrink-0">
              <section className="mb-8">
                <form action="" method="GET" className="space-y-3">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 block">
                    Search parts
                  </h2>
                  <input
                    name="search"
                    defaultValue={search || undefined}
                    placeholder="Search part numbers, brands or descriptions…"
                    className="w-full border border-line rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-secondary rounded-[20px_0px] px-4 py-3 text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    Search
                  </button>
                </form>
              </section>

              <section className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 block">
                  Brands
                </h2>
                <div className="space-y-2">
                  {allBrands.map((b) => (
                    <label key={b.slug} className="block cursor-pointer group">
                      <input
                        type="checkbox"
                        name="brand"
                        value={b.name}
                        defaultChecked={brand === b.name}
                        className="mr-2 rounded text-primary focus:ring-primary"
                      />
                      <span className="text-ink">{b.name}</span>{' '}
                      <span className="text-muted text-xs">({b.count})</span>
                    </label>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 block">
                  Categories
                </h2>
                <div className="space-y-2">
                  {allCategories.map((c) => (
                    <label key={c.slug} className="block cursor-pointer group">
                      <input
                        type="checkbox"
                        name="category"
                        value={c.name}
                        defaultChecked={category === c.name}
                        className="mr-2 rounded text-primary focus:ring-primary"
                      />
                      <span className="text-ink">{c.name}</span>{' '}
                      <span className="text-muted text-xs">({c.count ?? 0})</span>
                    </label>
                  ))}
                </div>
              </section>
            </aside>

            <section className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-sm text-muted">
                    Showing <span className="font-semibold text-ink">{products.length}</span> of{' '}
                    <span className="font-semibold text-ink">{total}</span> parts
                  </p>
                </div>
                {hasFilters && (
                  <Link
                    href="/products"
                    className="text-sm text-primary font-medium hover:underline underline-offset-4"
                  >
                    Clear filters
                  </Link>
                )}
              </div>

              {products.length === 0 ? (
                <div className="rounded-xl border border-line bg-slate-50 p-16 text-center">
                  <p className="text-muted">
                    No products match your filters. Try a different search or{' '}
                    <Link href="/contact" className="text-primary hover:underline font-medium">
                      ask our team
                    </Link>
                    .
                  </p>
                </div>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {products.map((product) => (
                    <li key={product.slug}>
                      <Link href={`/products/${product.slug}`} className="block h-full">
                        <div
                          className={cn(
                            'overflow-hidden rounded-xl border border-line bg-slate-50 transition-colors hover:border-primary relative h-full',
                          )}
                        >
                          <div className="relative aspect-video">
                            <Image
                              src={product.image || '/images/engine-100.jpeg'}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary mb-2 block">
                              {product.brand}
                            </span>
                            <h3 className="text-base font-semibold text-ink leading-snug mb-2">
                              {product.title}
                            </h3>
                            <p className="text-xs text-muted line-clamp-3">{product.description}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {totalPages > 1 && (
                <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Product pagination">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((n) => (
                    <Link
                      key={n}
                      href={{ pathname: '/products', query: { ...params, page: String(n) } }}
                      className={cn(
                        'inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm',
                        n === page
                          ? 'border-primary bg-primary text-white'
                          : 'border-line bg-white text-ink hover:border-primary hover:text-primary',
                      )}
                    >
                      {n}
                    </Link>
                  ))}
                </nav>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
