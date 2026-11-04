import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import productService from '@/services/productService';
import brandService from '@/services/brandService';
import categoryService from '@/services/categoryService';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Products - Gas Turbine Parts & Spares',
  description:
    'Browse genuine gas turbine parts and spares from GE, Siemens, ABB, Atlas Copco and other authorized brands. Worldwide supply for power plants, oil & gas, and industrial operators.',
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

function productImageUrl(image?: string): string {
  return image || '/images/engine-100.jpeg';
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const search = (params.search || '').trim();
  const brand = (params.brand || '').trim();
  const category = (params.category || '').trim();
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1);
  const limit = Math.max(1, Math.min(parseInt(params.limit || '12', 10) || 12, 100));

  function pageParams(p: number) {
    return {
      ...(search ? { search } : {}),
      ...(brand ? { brand } : {}),
      ...(category ? { category } : {}),
      page: String(p),
      limit: String(limit),
    };
  }

  const { products, total, totalPages } = productService.search({
    search: search || undefined,
    brand: brand || undefined,
    category: category || undefined,
    page,
    limit,
  });

  const allBrands = brandService.getAll();
  const allCategories = categoryService.getAll();

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#0b3d6b] tracking-tight">Products</h1>
        <p className="mt-2 text-slate-600">
          Genuine gas turbine parts and spares from authorized distributors. {total} part{total !== 1 ? 's' : ''} available.
        </p>
      </header>

      <div className="lg:flex lg:gap-8">
        <aside className="lg:w-72 flex-shrink-0">
          <section className="mb-6">
            <form action="" method="GET" className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0b3d6b] mb-4">Search</h2>
              <input
                name="search"
                defaultValue={search}
                placeholder="Part number, title or keyword…"
                className={cn(
                  'w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0b3d6b] focus:border-[#0b3d6b] outline-none',
                  search && 'border-[#0b3d6b]',
                )}
              />
              <button
                type="submit"
                className="w-full bg-[#0b3d6b] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#093257] transition"
              >
                Search parts
              </button>
            </form>
          </section>

          <section className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0b3d6b] mb-4">Brands</h2>
            <div className="space-y-2">
              {allBrands.map((b) => (
                <label key={b.slug} className="block cursor-pointer">
                  <input
                    type="checkbox"
                    name="brand"
                    value={b.name}
                    defaultChecked={brand === b.name}
                    className="mr-2 rounded text-[#0b3d6b] focus:ring-[#0b3d6b]"
                  />
                  {b.name} <span className="text-slate-400 text-xs">({b.count})</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0b3d6b] mb-4">Categories</h2>
            <div className="space-y-2">
              {allCategories.map((c) => (
                <label key={c.slug} className="block cursor-pointer">
                  <input
                    type="checkbox"
                    name="category"
                    value={c.name}
                    defaultChecked={category === c.name}
                    className="mr-2 rounded text-[#0b3d6b] focus:ring-[#0b3d6b]"
                  />
                  {c.name} <span className="text-slate-400 text-xs">({c.count ?? 0})</span>
                </label>
              ))}
            </div>
          </section>
        </aside>

        <section className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-[#0b3d6b]">{products.length}</span> of{' '}
                <span className="font-semibold text-[#0b3d6b]">{total}</span> parts
              </p>
            </div>
            {(search || brand || category) && (
              <Link
                href="/products"
                className="text-sm text-[#0b3d6b] hover:underline underline-offset-4"
              >
                Clear filters
              </Link>
            )}
          </div>

          {products.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-16 text-center">
              <p className="text-slate-600">No products match your filters.</p>
            </div>
          ) : (
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((product) => (
                  <li key={product.slug}>
                    <Link href={`/products/${product.slug}`} className="block group">
                      <div className={cn('aspect-video rounded-xl border border-slate-200 bg-slate-50 overflow-hidden group-hover:border-[#0b3d6b] transition relative')}>
                        <Image
                          src={productImageUrl(product.image)}
                          alt={product.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-[#0b3d6b] group-hover:underline">
                        {product.title}
                      </h3>
                      <p className="mt-1 text-sm font-mono text-slate-500">{product.part}</p>
                      <p className="text-xs text-slate-400">
                        {product.brand} &middot; {product.category}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>

              <nav className={cn('mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4')}>
                <div className="text-sm text-slate-600">
                  Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
                </div>
                <div className="flex items-center gap-3">
                  {page > 1 && (
                    <Link
                      href={`/products?${new URLSearchParams(pageParams(page - 1)).toString()}`}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-[#0b3d6b] hover:bg-[#0b3d6b] hover:text-white transition"
                    >
                      &larr; Prev
                    </Link>
                  )}
                  {page < totalPages && (
                    <Link
                      href={`/products?${new URLSearchParams(pageParams(page + 1)).toString()}`}
                      className="px-3 py-1.5 border border-[#0b3d6b] rounded-lg text-sm text-white bg-[#0b3d6b] hover:bg-[#093257] transition"
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
    </main>
  );
}
