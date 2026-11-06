
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  productService,
  brandService,
  categoryService,
} from '@/services';
import { cn } from '@/lib/utils';
import { ProductFilters } from '@/types/product';

export const metadata: Metadata = {
  title: 'All Gas Turbine & Industrial Spare Parts',
  description:
    'Browse genuine gas turbine, compressor, automation and industrial spare parts across 24 brands. Search by part number, brand or category and request a quote.',
  openGraph: {
    title: 'All Gas Turbine & Industrial Spare Parts | AGO Aviation',
    description:
      'Browse genuine gas turbine, compressor, automation and industrial spare parts across 24 brands.',
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

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const search = (params.search || '').trim();
  const brand = (params.brand || '').trim();
  const category = (params.category || '').trim();

  const page = Math.max(1, parseInt(params.page || '1', 10) || 1);
  const limit = Math.max(
    1,
    Math.min(parseInt(params.limit || '12', 10) || 12, 100)
  );

  const filters: ProductFilters = { page, limit };

  if (search) filters.search = search;
  if (brand) filters.brand = brand;
  if (category) filters.category = category;

  const { products, total, totalPages } =
    productService.search(filters);

  const allBrands = brandService.getAll();
  const allCategories = categoryService.getAll();

  const hasFilters = Boolean(search || brand || category);

  const paginationQuery = {
    ...(search ? { search } : {}),
    ...(brand ? { brand } : {}),
    ...(category ? { category } : {}),
    limit: String(limit),
  };

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#10243A]">

      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-[#09233B] text-white">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-[#174C72]/40 blur-[100px]" />
          <div className="absolute -bottom-48 left-[20%] h-[400px] w-[400px] rounded-full bg-[#F0A843]/10 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="max-w-[850px]">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#F0A843]/30 bg-[#F0A843]/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#F0A843]" />
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#FFD18A]">
                AGO Aviation · Product Catalogue
              </span>
            </div>

            <h1 className="max-w-[800px] text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-[64px]">
              Industrial &amp; Gas Turbine
              <span className="mt-2 block text-[#F0A843]">
                Spare Parts
              </span>
            </h1>

            <p className="mt-7 max-w-[650px] text-base leading-8 text-slate-300 sm:text-lg">
              Explore our extensive catalogue of gas turbine,
              compressor, automation and industrial spare parts.
              Find the right components by brand, category or part
              number and request a quotation from our team.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-xl bg-[#F0A843] px-7 py-4 text-sm font-bold text-[#10243A] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFC16A]"
              >
                Request a Quote
                <span className="text-lg">→</span>
              </Link>

              <span className="text-sm text-slate-400">
                Explore our complete product range
              </span>
            </div>
          </div>

          {/* HERO STATS */}
          <div className="mt-16 grid max-w-[750px] grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-8">
            <div>
              <p className="text-3xl font-extrabold text-white sm:text-4xl">
                {total}+
              </p>
              <p className="mt-2 text-xs font-medium text-slate-400 sm:text-sm">
                Product References
              </p>
            </div>

            <div>
              <p className="text-3xl font-extrabold text-white sm:text-4xl">
                {allBrands.length}+
              </p>
              <p className="mt-2 text-xs font-medium text-slate-400 sm:text-sm">
                Global Brands
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-3xl font-extrabold text-[#F0A843] sm:text-4xl">
                B2B
              </p>
              <p className="mt-2 text-xs font-medium text-slate-400 sm:text-sm">
                Quotation Based Enquiries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-5 py-4 text-xs sm:px-8 lg:px-12">
          <Link
            href="/"
            className="font-medium text-slate-500 transition-colors hover:text-[#F0A843]"
          >
            Home
          </Link>

          <span className="text-slate-300">/</span>

          <span className="font-semibold text-[#09233B]">
            All Products
          </span>
        </div>
      </div>

      {/* MAIN CATALOGUE */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-10">

            {/* FILTER SIDEBAR */}
            <aside className="lg:sticky lg:top-24">
              <form
                action="/products"
                method="GET"
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_25px_rgba(15,35,55,0.04)]"
              >
                {/* FILTER HEADER */}
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#09233B] text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 fill-none stroke-current"
                        strokeWidth="1.8"
                      >
                        <path d="M4 7h16M7 12h10m-7 5h4" />
                        <circle cx="8" cy="7" r="1" fill="currentColor" />
                        <circle cx="16" cy="12" r="1" fill="currentColor" />
                      </svg>
                    </span>

                    <h2 className="text-base font-bold text-[#09233B]">
                      Filters
                    </h2>
                  </div>

                  {hasFilters && (
                    <Link
                      href="/products"
                      className="text-xs font-semibold text-[#D78B26] hover:underline"
                    >
                      Clear all
                    </Link>
                  )}
                </div>

                {/* SEARCH */}
                <div className="border-b border-slate-100 p-5">
                  <label
                    htmlFor="product-search"
                    className="mb-3 block text-xs font-bold uppercase tracking-[1.2px] text-[#09233B]"
                  >
                    Search Products
                  </label>

                  <div className="relative">
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m16 16 4 4" />
                    </svg>

                    <input
                      id="product-search"
                      type="search"
                      name="search"
                      defaultValue={search}
                      placeholder="Part number, brand..."
                      className="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] pl-10 pr-3 text-sm text-[#09233B] outline-none transition-all placeholder:text-slate-400 focus:border-[#F0A843] focus:bg-white focus:ring-4 focus:ring-[#F0A843]/10"
                    />
                  </div>
                </div>

                {/* BRAND FILTER */}
                <div className="border-b border-slate-100 p-5">
                  <label
                    htmlFor="brand-filter"
                    className="mb-3 block text-xs font-bold uppercase tracking-[1.2px] text-[#09233B]"
                  >
                    Filter by Brand
                  </label>

                  <select
                    id="brand-filter"
                    name="brand"
                    defaultValue={brand}
                    className="h-12 w-full cursor-pointer rounded-xl border border-slate-200 bg-[#F8FAFC] px-3 text-sm text-[#09233B] outline-none transition-all focus:border-[#F0A843] focus:ring-4 focus:ring-[#F0A843]/10"
                  >
                    <option value="">All Brands</option>
                    {allBrands.map((b) => (
                      <option key={b.slug} value={b.name}>
                        {b.name} ({b.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* CATEGORY FILTER */}
                <div className="p-5">
                  <label
                    htmlFor="category-filter"
                    className="mb-3 block text-xs font-bold uppercase tracking-[1.2px] text-[#09233B]"
                  >
                    Product Category
                  </label>

                  <select
                    id="category-filter"
                    name="category"
                    defaultValue={category}
                    className="h-12 w-full cursor-pointer rounded-xl border border-slate-200 bg-[#F8FAFC] px-3 text-sm text-[#09233B] outline-none transition-all focus:border-[#F0A843] focus:ring-4 focus:ring-[#F0A843]/10"
                  >
                    <option value="">All Categories</option>
                    {allCategories.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name} ({c.count ?? 0})
                      </option>
                    ))}
                  </select>
                </div>

                {/* APPLY FILTERS */}
                <div className="border-t border-slate-100 bg-slate-50 p-5">
                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#09233B] px-5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#17466A] hover:shadow-lg hover:shadow-[#09233B]/15"
                  >
                    Apply Filters
                    <span>→</span>
                  </button>
                </div>
              </form>

              {/* SIDEBAR CTA */}
              <div className="mt-5 overflow-hidden rounded-2xl bg-[#09233B] p-6 text-white">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-[#F0A843]/15 text-[#FFD18A]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 fill-none stroke-current"
                    strokeWidth="1.7"
                  >
                    <path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.4L3 20l1.2-4.7A8.5 8.5 0 1 1 21 11.5Z" />
                  </svg>
                </span>

                <h3 className="text-lg font-bold">
                  Need Help Finding a Part?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Tell us what you need. Our team can assist you with
                  your spare parts enquiry.
                </p>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#FFD18A] hover:text-white"
                >
                  Contact Our Team
                  <span>→</span>
                </Link>
              </div>
            </aside>

            {/* PRODUCTS CONTENT */}
            <div className="min-w-0">

              {/* RESULTS HEADER */}
              <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[1.8px] text-[#D78B26]">
                    Explore Our Collection
                  </span>

                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#09233B] sm:text-3xl">
                    All Products
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Showing{' '}
                    <strong className="text-[#09233B]">
                      {products.length}
                    </strong>{' '}
                    of{' '}
                    <strong className="text-[#09233B]">
                      {total}
                    </strong>{' '}
                    product references
                  </p>
                </div>

                {hasFilters && (
                  <Link
                    href="/products"
                    className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:border-[#F0A843] hover:text-[#D78B26]"
                  >
                    <span>✕</span>
                    Reset Filters
                  </Link>
                )}
              </div>

              {/* ACTIVE FILTERS */}
              {hasFilters && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {search && (
                    <span className="rounded-full border border-[#F0A843]/30 bg-[#F0A843]/10 px-3 py-1.5 text-xs font-medium text-[#09233B]">
                      Search: {search}
                    </span>
                  )}

                  {brand && (
                    <span className="rounded-full border border-[#F0A843]/30 bg-[#F0A843]/10 px-3 py-1.5 text-xs font-medium text-[#09233B]">
                      Brand: {brand}
                    </span>
                  )}

                  {category && (
                    <span className="rounded-full border border-[#F0A843]/30 bg-[#F0A843]/10 px-3 py-1.5 text-xs font-medium text-[#09233B]">
                      Category: {category}
                    </span>
                  )}
                </div>
              )}

              {/* PRODUCT GRID */}
              {products.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-slate-400">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-8 w-8 fill-none stroke-current"
                      strokeWidth="1.6"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m16 16 4 4M8 11h6" />
                    </svg>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#09233B]">
                    No Products Found
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    We couldn&apos;t find products matching your
                    current search or filters. Try different
                    keywords or reset your filters.
                  </p>

                  <Link
                    href="/products"
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#09233B] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#17466A]"
                  >
                    View All Products
                    <span>→</span>
                  </Link>
                </div>
              ) : (
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <li
                      key={product.slug}
                      className="group min-w-0"
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,35,55,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F0A843]/60 hover:shadow-[0_15px_40px_rgba(15,35,55,0.10)]"
                      >
                        {/* PRODUCT IMAGE */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#F1F5F9]">
                          <Image
                            src={
                              product.image ||
                              '/images/engine-100.jpeg'
                            }
                            alt={product.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* BRAND LABEL */}
                          <span className="absolute left-4 top-4 rounded-md border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[1px] text-[#09233B] shadow-sm backdrop-blur">
                            {product.brand}
                          </span>

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09233B]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>

                        {/* PRODUCT DETAILS */}
                        <div className="flex flex-1 flex-col p-5">
                          <span className="mb-3 text-[10px] font-bold uppercase tracking-[1.5px] text-[#D78B26]">
                            Product Reference
                          </span>

                          <h3 className="line-clamp-2 min-h-[48px] text-[16px] font-bold leading-6 text-[#09233B] transition-colors group-hover:text-[#B9781F]">
                            {product.title}
                          </h3>

                          <p className="mt-3 line-clamp-3 min-h-[60px] text-[12px] leading-5 text-slate-500">
                            {product.description}
                          </p>

                          {/* CARD FOOTER */}
                          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                            <span className="text-xs font-semibold text-slate-500">
                              View Details
                            </span>

                            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#F0A843]/15 text-[#B9781F] transition-all duration-300 group-hover:bg-[#F0A843] group-hover:text-[#09233B]">
                              <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4 fill-none stroke-current"
                                strokeWidth="2"
                              >
                                <path d="M5 12h14m-7-7 7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* PAGINATION */}
              {totalPages > 1 && (
                <nav
                  className="mt-12 flex flex-wrap items-center justify-center gap-2"
                  aria-label="Product pagination"
                >
                  {page > 1 && (
                    <Link
                      href={{
                        pathname: '/products',
                        query: {
                          ...paginationQuery,
                          page: String(page - 1),
                        },
                      }}
                      className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#09233B] transition-colors hover:border-[#F0A843]"
                    >
                      ← Previous
                    </Link>
                  )}

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((n) => (
                    <Link
                      key={n}
                      href={{
                        pathname: '/products',
                        query: {
                          ...paginationQuery,
                          page: String(n),
                        },
                      }}
                      aria-current={n === page ? 'page' : undefined}
                      className={cn(
                        'inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-bold transition-all',
                        n === page
                          ? 'border-[#09233B] bg-[#09233B] text-white shadow-md shadow-[#09233B]/15'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-[#F0A843] hover:text-[#09233B]'
                      )}
                    >
                      {n}
                    </Link>
                  ))}

                  {page < totalPages && (
                    <Link
                      href={{
                        pathname: '/products',
                        query: {
                          ...paginationQuery,
                          page: String(page + 1),
                        },
                      }}
                      className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#09233B] transition-colors hover:border-[#F0A843]"
                    >
                      Next →
                    </Link>
                  )}
                </nav>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM QUOTE CTA */}
      <section className="px-5 pb-16 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[24px] bg-[#09233B] px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#F0A843]/10 blur-[80px]" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-[650px]">
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#FFD18A]">
                Need a Specific Component?
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
                Let&apos;s Find the Right Part for Your Equipment.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Send us your part number or requirements.
                Our team will help you with your spare parts enquiry.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-[#F0A843] px-7 py-4 text-sm font-extrabold text-[#09233B] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFC16A]"
            >
              Request a Quote
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
