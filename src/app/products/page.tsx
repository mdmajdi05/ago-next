import type { Metadata } from 'next';
import Link from 'next/link';
import { DM_Sans } from 'next/font/google';
import {
  productService,
  brandService,
  categoryService,
} from '@/services';
import { cn } from '@/lib/utils';
import { Product, ProductFilters } from '@/types/product';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

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

const A = '/ago-aviation/';

const CATEGORY_IMAGES: Record<string, string> = {
  'turbine-parts': 'category-turbine.jpg',
  'compressor-parts': 'category-engine.jpg',
  'valves-actuators': 'category-fuel.jpg',
  'automation-controls': 'category-electrical.jpg',
  instrumentation: 'category-avionics.jpg',
  'electrical-motors': 'category-electrical.jpg',
  'mechanical-transmission-bearings': 'category-engine.jpg',
  'seals-filters': 'category-accessories.jpg',
  'piping-fittings': 'category-fuel.jpg',
};

const PRODUCT_IMAGES: Record<string, string> = {
  'Turbine Parts': 'product-turbine-blade.jpg',
  'Compressors & Pumps': 'product-fuel-control.jpg',
  'Valves & Actuators': 'product-fuel-control.jpg',
  'Automation & Controls': 'product-starter-generator.jpg',
  Instrumentation: 'product-starter-generator.jpg',
  'Electrical & Motors': 'product-starter-generator.jpg',
  'Mechanical Power Transmission': 'product-turbine-blade.jpg',
  'Seals, Filters & Consumables': 'product-fuel-control.jpg',
  'Piping & Fittings': 'product-fuel-control.jpg',
};

function categoryImage(slug: string) {
  return A + (CATEGORY_IMAGES[slug] || 'category-accessories.jpg');
}

function productImage(product: Product) {
  return A + (PRODUCT_IMAGES[product.category] || 'product-turbine-blade.jpg');
}

function quoteHref(part: string) {
  return `mailto:sale@agoaviation.com?subject=${encodeURIComponent(
    `Quotation request for ${part}`
  )}`;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const search = (params.search || '').trim();
  const brand = (params.brand || '').trim();
  const category = (params.category || '').trim();

  const requestedPage = Math.max(1, parseInt(params.page || '1', 10) || 1);
  const limit = Math.max(
    1,
    Math.min(parseInt(params.limit || '12', 10) || 12, 100)
  );

  const filters: ProductFilters = { page: requestedPage, limit };

  if (search) filters.search = search;
  if (brand) filters.brand = brand;
  if (category) filters.category = category;

  const {
    products,
    total,
    totalPages,
    page: currentPage,
  } = productService.search(filters);

  const allBrands = brandService.getAll();
  const allCategories = categoryService.getAll();
  const featuredCategories = allCategories.slice(0, 6);

  const hasFilters = Boolean(search || brand || category);

  const rangeStart = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const rangeEnd = total === 0 ? 0 : rangeStart + products.length - 1;

  const paginationQuery = {
    ...(search ? { search } : {}),
    ...(brand ? { brand } : {}),
    ...(category ? { category } : {}),
    limit: String(limit),
  };

  return (
    <main className={cn('min-h-screen bg-slate-50 text-[#09233b]', dmSans.className)}>
      {/* HERO */}
      <section className="relative isolate min-h-[430px] overflow-hidden bg-[#06263b] text-white md:min-h-[350px]">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-75 md:left-[44%]"
          style={{
            backgroundImage: `linear-gradient(90deg,#06263b 0%,transparent 65%),url("${A}hero-engine.jpg")`,
          }}
        />

        <div className="px-5 py-9 md:px-[7.3%] md:py-8">
          <p className="flex items-center gap-2 text-xs font-extrabold tracking-widest text-amber-300">
            <i className="h-0.5 w-8 bg-amber-400" /> GAS TURBINE &amp;
            INDUSTRIAL SPARE PARTS
          </p>

          <h1 className="mt-3 text-4xl font-extrabold leading-[1.03] tracking-tight md:text-5xl">
            Find the Right Industrial
            <br />
            Parts. <span className="text-amber-400">Faster.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200">
            Explore our gas turbine, compressor, automation and industrial
            spare parts inventory and connect with our team for availability,
            technical details and competitive quotations.
          </p>

          <form
            action="/products"
            method="GET"
            role="search"
            className="mt-5 flex max-w-[690px] overflow-hidden rounded-xl bg-white text-[#09233b]"
          >
            <select
              name="category"
              defaultValue={category}
              aria-label="Product category"
              className="w-[118px] border-r border-slate-200 px-2 text-xs font-bold outline-none sm:w-32"
            >
              <option value="">All Products</option>
              {allCategories.map((item) => (
                <option key={item.slug} value={item.name}>
                  {item.short}
                </option>
              ))}
            </select>

            <input
              type="search"
              name="search"
              defaultValue={search}
              placeholder="Search by Part Number, Product Name or OEM..."
              aria-label="Search products"
              className="min-w-0 flex-1 px-3 text-xs outline-none sm:px-4"
            />

            <button
              type="submit"
              aria-label="Search"
              className="bg-amber-400 px-5 text-2xl"
            >
              ⌕
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-xs">
            <div>
              <b className="block">✈ Global Supply</b>
              <small className="text-slate-300">Sourcing from trusted OEMs</small>
            </div>
            <div>
              <b className="block">♢ Quality-Assured Parts</b>
              <small className="text-slate-300">Inspected &amp; verified</small>
            </div>
            <div>
              <b className="block">◷ Quick Quotations</b>
              <small className="text-slate-300">Get a response fast</small>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 right-0 hidden border-l-4 border-amber-400 bg-[#062b45]/90 px-8 py-4 md:block">
          <b>
            Gas Turbine &amp;
            <br />
            Industrial Components
          </b>
          <small className="mt-1 block text-xs">
            OEM | Aftermarket | Repair Support
          </small>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        id="categories"
        className="grid gap-5 bg-[#edf4fa] px-5 py-6 md:grid-cols-[220px_1fr] md:px-[6.2%]"
      >
        <div>
          <p className="text-[11px] font-extrabold tracking-wide">
            — BROWSE BY CATEGORY
          </p>
          <h2 className="mt-2 text-3xl font-extrabold leading-tight">
            Explore Our
            <br className="hidden md:block" /> Product Range
          </h2>
          <p className="mt-2 max-w-[200px] text-sm text-slate-600">
            Discover parts by system or application.
          </p>
          <Link
            href="#products"
            className="mt-4 inline-flex rounded-lg border border-amber-500 px-5 py-2 text-xs font-bold"
          >
            View All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          {featuredCategories.map((item) => (
            <Link
              key={item.slug}
              href={`/products?category=${encodeURIComponent(item.name)}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white pb-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={categoryImage(item.slug)}
                alt={item.name}
                className="h-24 w-full object-cover"
              />
              <b className="line-clamp-2 block px-3 pt-2 text-sm leading-tight">
                {item.name}
              </b>
              <small className="line-clamp-2 block px-3 pt-2 text-[10px] leading-snug text-slate-600">
                {item.description}
              </small>
              <span className="float-right mr-2 mt-1 rounded-full bg-amber-300 px-2 text-white">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CATALOGUE */}
      <section
        id="products"
        className="grid items-start gap-5 bg-slate-50 px-4 py-5 md:px-[3.8%] xl:grid-cols-[288px_minmax(0,1fr)_365px]"
      >
        {/* FILTERS */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-4 font-extrabold">☷ &nbsp;Filter Products</h3>

          <form action="/products" method="GET">
            <label className="mb-3 block text-xs font-bold">
              Search
              <input
                type="search"
                name="search"
                defaultValue={search}
                placeholder="⌕  Part number or keyword..."
                className="mt-1 h-9 w-full rounded-lg border border-slate-300 px-3 text-xs font-normal outline-amber-400"
              />
            </label>

            <label className="mb-3 block text-xs font-bold">
              Manufacturer / OEM
              <select
                name="brand"
                defaultValue={brand}
                className="mt-1 h-9 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs font-normal"
              >
                <option value="">All Manufacturers</option>
                {allBrands.map((item) => (
                  <option key={item.slug} value={item.name}>
                    {item.name} ({item.count})
                  </option>
                ))}
              </select>
            </label>

            <label className="mb-3 block text-xs font-bold">
              Product Category
              <select
                name="category"
                defaultValue={category}
                className="mt-1 h-9 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs font-normal"
              >
                <option value="">All Categories</option>
                {allCategories.map((item) => (
                  <option key={item.slug} value={item.name}>
                    {item.name} ({item.count ?? 0})
                  </option>
                ))}
              </select>
            </label>

            <p className="mb-2 text-xs font-bold">Condition</p>
            <label className="flex items-center gap-2 text-xs">
              <input type="checkbox" name="condition" value="new" /> New
              (Original)
            </label>
            <label className="mt-3 flex items-center gap-2 text-xs">
              <input type="checkbox" name="condition" value="serviceable" />{' '}
              Overhauled / Serviceable
            </label>

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-[#062a43] px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0b3b66]"
            >
              Apply Filters →
            </button>

            {hasFilters && (
              <Link
                href="/products"
                className="mt-3 block text-center text-[11px] font-bold text-[#b9781f] hover:underline"
              >
                Clear all filters
              </Link>
            )}
          </form>
        </aside>

        {/* LISTING */}
        <div className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-extrabold">All Products</h2>
              <p className="text-xs text-slate-600">
                Showing{' '}
                <b>
                  {rangeStart} – {rangeEnd}
                </b>{' '}
                of {total} products
              </p>
            </div>

            <label className="whitespace-nowrap text-[11px]">
              Sort by:{' '}
              <select
                defaultValue="relevance"
                aria-label="Sort products"
                className="rounded-lg border border-slate-300 bg-white p-2"
              >
                <option value="relevance">Relevance</option>
                <option value="part">Part Number</option>
              </select>
            </label>
          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <h3 className="text-xl font-extrabold">No Products Found</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                We couldn&apos;t find products matching your current search or
                filters. Try different keywords or reset your filters.
              </p>
              <Link
                href="/products"
                className="mt-5 inline-block rounded-lg bg-[#062a43] px-5 py-2.5 text-xs font-bold text-white"
              >
                View All Products →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.slug}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <img
                    src={productImage(product)}
                    alt={`${product.title} ${product.part}`}
                    className="h-32 w-full bg-gradient-to-b from-white to-slate-50 object-contain p-2"
                  />

                  <div className="p-3">
                    <span className="rounded-full bg-slate-200 px-2 py-1 text-[9px] font-extrabold uppercase">
                      {product.brand}
                    </span>

                    <h3 className="mt-2 line-clamp-2 min-h-10 font-extrabold leading-snug">
                      {product.title}
                    </h3>

                    <p className="text-xs text-slate-600">
                      P/N: {product.part}
                    </p>

                    <p className="my-2 line-clamp-2 min-h-8 text-[11px] leading-snug">
                      {product.description ||
                        product.keywords ||
                        'Industrial spare part available on request.'}
                    </p>

                    <span className="inline-block rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-800">
                      ● Quote on Request
                    </span>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <a
                        href={quoteHref(product.part)}
                        className="rounded-lg bg-[#062a43] px-2 py-2.5 text-center text-[10px] font-bold text-white"
                      >
                        Request a Quote
                      </a>
                      <Link
                        href={`/products/${product.slug}`}
                        className="rounded-lg border border-[#28445a] px-2 py-2.5 text-center text-[10px] font-bold"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav
              className="mt-6 flex flex-wrap items-center justify-center gap-1.5"
              aria-label="Product pagination"
            >
              {currentPage > 1 && (
                <Link
                  href={{
                    pathname: '/products',
                    query: {
                      ...paginationQuery,
                      page: String(currentPage - 1),
                    },
                  }}
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-[11px] font-bold text-slate-600 hover:border-amber-500 hover:text-[#09233b]"
                >
                  ← Previous
                </Link>
              )}

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <Link
                  key={pageNumber}
                  href={{
                    pathname: '/products',
                    query: {
                      ...paginationQuery,
                      page: String(pageNumber),
                    },
                  }}
                  aria-current={
                    pageNumber === currentPage ? 'page' : undefined
                  }
                  className={cn(
                    'inline-flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-[11px] font-bold',
                    pageNumber === currentPage
                      ? 'border-[#062a43] bg-[#062a43] text-white'
                      : 'border-slate-300 bg-white text-slate-600 hover:border-amber-500 hover:text-[#09233b]'
                  )}
                >
                  {pageNumber}
                </Link>
              ))}

              {currentPage < totalPages && (
                <Link
                  href={{
                    pathname: '/products',
                    query: {
                      ...paginationQuery,
                      page: String(currentPage + 1),
                    },
                  }}
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-[11px] font-bold text-slate-600 hover:border-amber-500 hover:text-[#09233b]"
                >
                  Next →
                </Link>
              )}
            </nav>
          )}
        </div>

        {/* QUOTE CARD */}
        <aside
          id="contact"
          className="overflow-hidden rounded-2xl bg-[#05283f] text-white shadow-lg"
        >
          <img
            src={`${A}quote-engineer.jpg`}
            alt="Aviation engineer inspecting an engine"
            className="h-44 w-full object-cover"
          />

          <div className="p-6">
            <i className="mb-3 block h-0.5 w-8 bg-amber-400" />

            <h2 className="text-3xl font-extrabold leading-tight">
              Can’t Find the
              <br />
              Part You Need?
            </h2>

            <p className="my-4 text-sm leading-relaxed text-slate-200">
              Share your part number or requirements. Our experts will help
              you source the right component.
            </p>

            <a
              href="mailto:sale@agoaviation.com?subject=Parts%20Requirement"
              className="flex items-center justify-between rounded-xl bg-amber-400 px-4 py-4 text-sm font-extrabold text-[#09233b]"
            >
              ✉ Send Your Requirement <b>→</b>
            </a>

            <a
              href="https://wa.me/917011123269"
              className="mt-5 inline-block text-sm font-bold hover:text-amber-300"
            >
              ◉ &nbsp; Chat on WhatsApp →
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
