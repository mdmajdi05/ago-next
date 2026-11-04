import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { productService, brandService, categoryService } from '@/services';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
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

function buildPageParams(
  search: string,
  brand: string,
  category: string,
  page: number,
  limit: number,
): Record<string, string> {
  const params: Record<string, string> = {};
  if (search) params.search = search;
  if (brand) params.brand = brand;
  if (category) params.category = category;
  params.page = String(page);
  params.limit = String(limit);
  return params;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
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

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'All products', href: '/products' },
  ];

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbs} />

      <section className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary block mb-3">
          Catalogue
        </p>
        <h1 className="text-3xl font-bold text-primary tracking-tight mb-3">
          All gas turbine & industrial spare parts
        </h1>
        <p className="text-muted">
          Browse {total} part reference{total !== 1 ? 's' : ''} across{' '}
          {allBrands.length} brands. Filter by category and brand or search by part number.
        </p>
      </section>

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
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {products.map((product) => (
                  <li key={product.slug}>
                    <Link href={`/products/${product.slug}`} className="block">
                      <div className={cn(
                        'aspect-video rounded-xl border border-line bg-slate-50 overflow-hidden group-hover:border-primary transition-colors relative',
                      )}>
                        <Image
                          src={product.image || '/images/engine-100.jpeg'}
                          alt={product.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-primary group-hover:underline">
                        {product.title}
                      </h3>
                      <p className="mt-1 text-sm font-mono text-muted">{product.part}</p>
                      <p className="mt-1 text-xs text-muted">
                        {product.brand} &middot; {product.category}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>

              <nav className={cn('mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm')}>
                <div className="text-muted">
                  Page <span className="font-semibold text-ink">{page}</span> of{' '}
                  <span className="font-semibold text-ink">{totalPages}</span>
                </div>
                <div className="flex items-center gap-3">
                  {page > 1 && (
                    <Link
                      href={`/products?${new URLSearchParams(buildPageParams(search, brand, category, page - 1, limit)).toString()}`}
                      className="px-3 py-1.5 border border-line rounded-xl text-sm text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      &larr; Prev
                    </Link>
                  )}
                  {page < totalPages && (
                    <Link
                      href={`/products?${new URLSearchParams(buildPageParams(search, brand, category, page + 1, limit)).toString()}`}
                      className="px-3 py-1.5 border border-primary rounded-xl text-sm text-secondary bg-primary hover:bg-primary-dark transition-colors"
                    >
                      Next &rarr;
                    </Link>
                  )}
                </div>
              </nav>
            </>
          )}
        </section>
      </div>

      <section className="mt-16">
        <div className={cn('rounded-xl border border-line bg-soft p-8 md:p-12 text-center')}>
          <h2 className="text-2xl font-bold text-primary uppercase tracking-wider mb-3 block">
            Need a part number confirmed today?
          </h2>
          <p className="text-muted max-w-[600px] mx-auto mb-6">
            Send us the OEM reference, equipment model or a nameplate photo. Our engineering desk replies
            with availability, condition and lead time — usually within a few hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-secondary rounded-[20px_0px] px-6 py-3 text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Request a quote
            </Link>
            <Link
              href={`https://wa.me/917011123269`}
              rel="noopener"
              target="_blank"
              className="border border-line rounded-xl px-6 py-3 text-sm font-medium text-ink hover:bg-primary hover:text-white transition-colors"
            >
              WhatsApp the desk
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
