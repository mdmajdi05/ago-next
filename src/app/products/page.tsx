import type { Metadata } from 'next';
import Link from 'next/link';
import {
  productService,
  brandService,
  categoryService,
} from '@/services';
import { cn } from '@/lib/utils';
import { Product, ProductFilters } from '@/types/product';
import { CatalogFilters } from '@/components/products/catalog-filters';
import {
  breadcrumbSchema,
  buildPageMetadata,
  collectionPageSchema,
} from '@/lib/seo';

interface SearchParams {
  search?: string;
  brand?: string;
  category?: string;
  type?: string;
  page?: string;
  limit?: string;
}

interface ProductsPageProps {
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const params = await searchParams;

  // Filtered / searched variants (e.g. /products?search=xxx or ?brand=yyy)
  // should not be indexed — only the canonical catalogue pages should.
  const isFiltered = Boolean(
    params?.search || params?.brand || params?.category || params?.type
  );

  const requestedPage = Math.max(1, parseInt(params?.page || '1', 10) || 1);
  const requestedLimit = Math.max(
    1,
    Math.min(parseInt(params?.limit || '12', 10) || 12, 100)
  );

  // Every paginated catalogue page is self-canonical so Google can index the
  // full inventory instead of folding pages 2..N into page 1. Page 1 keeps the
  // clean /products URL; later pages carry their own page (and non-default
  // limit) parameter so each URL has exactly one canonical version.
  const query: string[] = [];
  if (requestedPage > 1) query.push(`page=${requestedPage}`);
  if (requestedLimit !== 12) query.push(`limit=${requestedLimit}`);
  const canonicalPath = query.length
    ? `/products?${query.join('&')}`
    : '/products';

  const pageLabel =
    requestedPage > 1 ? ` – Page ${requestedPage}` : '';

  const catalogueSize = productService.getAll().length.toLocaleString('en-US');
  const brandCount = brandService.getAll().length;

  return buildPageMetadata({
    title: `Gas Turbine & Industrial Spare Parts Catalogue${pageLabel}`,
    description:
      requestedPage > 1
        ? `Browse page ${requestedPage} of the AGO Aviation gas turbine and industrial spare parts catalogue. Compare part numbers across ${brandCount} brands and request a verified quote with condition and documentation confirmed.`
        : `Search ${catalogueSize} gas turbine, compressor, valve, automation, instrumentation and electrical spare parts across ${brandCount} brands. Filter by part number, brand or category and request a verified quote.`,
    path: canonicalPath,
    keywords: [
      'gas turbine spare parts',
      'industrial spare parts catalogue',
      'gas turbine parts by part number',
      'buy gas turbine spares',
      'OEM spare parts supplier',
    ],
    image: '/ago-aviation/category-turbine.jpg',
    imageAlt: 'AGO Aviation gas turbine and industrial spare parts catalogue',
    noIndex: isFiltered,
  });
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
  const type = (params.type || '').trim();

  const requestedPage = Math.max(1, parseInt(params.page || '1', 10) || 1);
  const limit = Math.max(
    1,
    Math.min(parseInt(params.limit || '12', 10) || 12, 100)
  );

  const filters: ProductFilters = { page: requestedPage, limit };

  if (search) filters.search = search;
  if (brand) filters.brand = brand;
  if (category) filters.category = category;
  if (type) filters.type = type;

  const {
    products,
    total,
    totalPages,
    page: currentPage,
  } = productService.search(filters);

  const allBrands = brandService.getAll();
  const allCategories = categoryService.getAll();
  const featuredCategories = allCategories.slice(0, 6);

  const rangeStart = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const rangeEnd = total === 0 ? 0 : rangeStart + products.length - 1;

  const paginationQuery = {
    ...(search ? { search } : {}),
    ...(brand ? { brand } : {}),
    ...(category ? { category } : {}),
    ...(type ? { type } : {}),
    limit: String(limit),
  };

  const schemaQuery: string[] = [];
  if (currentPage > 1) schemaQuery.push(`page=${currentPage}`);
  if (limit !== 12) schemaQuery.push(`limit=${limit}`);
  const schemaPath = schemaQuery.length
    ? `/products?${schemaQuery.join('&')}`
    : '/products';

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
    ]),
    collectionPageSchema({
      name: 'Gas Turbine & Industrial Spare Parts Catalogue',
      description:
        'Search gas turbine, compressor, valve, automation, instrumentation and electrical spare parts by part number, brand or category.',
      path: schemaPath,
      items: products.map((product) => ({
        name: `${product.brand} ${product.partNumber}`,
        url: `/products/${product.slug}`,
      })),
    }),
  ];

  return (
    <main className={cn('min-h-screen bg-[#f5f8fb] text-[#09233b] leading-[normal]')}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      {/* HERO */}
      <section className="relative h-[500px] min-h-[500px] overflow-hidden bg-[#06263b] text-white md:h-[350px] md:min-h-[350px]">
        <div
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{
            backgroundImage: `linear-gradient(90deg,#06263bea,#06263b99),url("${A}hero-engine.jpg")`,
          }}
        />
        <div
          className="absolute inset-y-0 left-[46%] right-0 hidden bg-cover bg-center md:block"
          style={{
            backgroundImage: `linear-gradient(90deg,#06263b 0%,transparent 28%),url("${A}hero-engine.jpg")`,
          }}
        />

        <div className="relative z-[1] px-5 py-9 md:px-[7.3%] md:pb-[22px] md:pt-8">
          <p className="flex items-center gap-2.5 text-[13px] font-extrabold leading-[normal] tracking-[1.2px] text-[#ffc34f]">
            <i className="h-[2px] w-[31px] bg-[#f5b83f]" /> GAS TURBINE
            &amp; INDUSTRIAL SPARE PARTS
          </p>

          <h1 className="my-2.5 text-[39px] font-bold leading-[1.02] tracking-[-1.5px] md:text-[49px] md:leading-[1.01]">
            Find the Right Industrial
            <br />
            Parts. <em className="not-italic text-[#ffc04f]">Faster.</em>
          </h1>

          <p className="my-3 text-[13px] leading-[1.5] text-[#e7eff5] md:text-[15px]">
            Explore our gas turbine, compressor, automation and industrial
            spare parts inventory and connect with our team
            <br className="hidden md:block" /> for availability, technical
            details and competitive quotations.
          </p>

          <form
            action="/products"
            method="GET"
            role="search"
            className="mt-4 flex min-h-12 w-full flex-wrap overflow-hidden rounded-[10px] bg-white text-[#09233b] md:h-12 md:w-[min(690px,65vw)] md:flex-nowrap"
          >
            <select
              name="category"
              defaultValue={category}
              aria-label="Product category"
              className="h-11 max-w-[125px] border-r border-[#dce4eb] bg-white px-2 text-[11px] font-bold outline-none md:h-full md:max-w-none md:px-4 md:text-[13px]"
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
              className="h-11 min-w-0 flex-1 px-2.5 text-[11px] outline-none md:h-full md:px-4 md:text-[13px]"
            />

            <button
              type="submit"
              aria-label="Search"
              className="h-11 w-12 bg-[#ffc45b] text-[30px] leading-none md:h-full md:w-[66px]"
            >
              ⌕
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-3 md:gap-x-8">
            <div className="flex items-center gap-1.5 border-r border-white/30 pr-2.5 last:border-0 md:gap-3 md:pr-[30px]">
              <b className="text-[21px] font-normal leading-none text-[#ffc04f] md:text-[28px]">
                ✈
              </b>
              <span>
                <strong className="block text-[10px] md:text-xs">
                  Global Supply
                </strong>
                <small className="mt-[3px] block text-[9px] text-[#d2e0e9] md:text-[10px]">
                  Sourcing from trusted OEMs
                </small>
              </span>
            </div>

            <div className="flex items-center gap-1.5 border-r border-white/30 pr-2.5 last:border-0 md:gap-3 md:pr-[30px]">
              <b className="text-[21px] font-normal leading-none text-[#ffc04f] md:text-[28px]">
                ♢
              </b>
              <span>
                <strong className="block text-[10px] md:text-xs">
                  Quality-Assured Parts
                </strong>
                <small className="mt-[3px] block text-[9px] text-[#d2e0e9] md:text-[10px]">
                  Inspected &amp; verified
                </small>
              </span>
            </div>

            <div className="flex items-center gap-1.5 border-r border-white/30 pr-2.5 last:border-0 md:gap-3 md:pr-[30px]">
              <b className="text-[21px] font-normal leading-none text-[#ffc04f] md:text-[28px]">
                ◷
              </b>
              <span>
                <strong className="block text-[10px] md:text-xs">
                  Quick Quotations
                </strong>
                <small className="mt-[3px] block text-[9px] text-[#d2e0e9] md:text-[10px]">
                  Get a response fast
                </small>
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 right-0 z-[2] hidden border-l-[5px] border-[#ffc04f] bg-[#062b45]/[0.85] px-8 py-4 pl-[46px] [clip-path:polygon(9%_0,100%_0,100%_100%,0_100%)] md:block">
          <b className="block text-[17px] leading-[1.2]">
            Gas Turbine &amp;
            <br />
            Industrial Components
          </b>
          <small className="mt-[5px] block text-[11px]">
            OEM | Aftermarket | Repair Support
          </small>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        id="categories"
        className="grid grid-cols-1 gap-5 bg-[#edf4fa] px-4 py-6 md:grid-cols-[210px_minmax(0,1fr)] md:gap-7 md:px-[6.2%] md:pb-5 md:pt-[19px] cat:grid-cols-[260px_minmax(0,1fr)] desk:h-[242px]"
      >
        <div>
          <p className="flex items-center gap-2.5 text-[11px] font-extrabold tracking-[1.2px]">
            <i className="h-[2px] w-[31px] bg-[#f5b83f]" /> BROWSE BY
            CATEGORY
          </p>
          <h2 className="my-2 text-[27px] font-bold leading-[1.12]">
            Explore Our
            <br className="hidden md:block" /> Product Range
          </h2>
          <p className="max-w-none text-[13px] leading-[1.5] text-[#344b60] md:max-w-[190px]">
            Discover parts by system or application.
          </p>
          <Link
            href="#products"
            className="mt-1 inline-flex items-center gap-[15px] rounded-[10px] border border-[#e8a928] px-[18px] py-[9px] text-xs font-bold"
          >
            View All Categories <b>→</b>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3.5 cat:grid-cols-6">
          {featuredCategories.map((item) => (
            <Link
              key={item.slug}
              href={`/categories/${item.slug}`}
              className="relative min-w-0 overflow-hidden rounded-[15px] border border-[#e2eaf1] bg-white pb-3.5 shadow-[0_3px_10px_#0a2b4510] transition hover:-translate-y-1 hover:shadow-lg desk:h-[199px]"
            >
              <img
                src={categoryImage(item.slug)}
                alt={item.name}
                className="h-[100px] w-full object-cover md:h-[92px]"
              />
              <strong className="line-clamp-2 block px-3 pt-[9px] text-[13px] font-bold leading-[1.15]">
                {item.name}
              </strong>
              <small className="line-clamp-2 block px-3 py-[7px] text-[10px] leading-[1.35] text-[#344b60]">
                {item.description}
              </small>
              <b className="absolute bottom-2 right-2 h-[21px] w-[21px] rounded-full bg-[#ffc75f] text-center text-[13px] font-bold leading-[21px] text-white">
                →
              </b>
            </Link>
          ))}
        </div>
      </section>

      {/* CATALOGUE */}
      <section
        id="products"
        className="grid grid-cols-1 items-start gap-4 bg-[#f8fafc] px-4 py-5 md:grid-cols-[240px_minmax(0,1fr)] md:gap-3.5 md:px-[3.8%] md:pb-3.5 md:pt-[18px] cat:grid-cols-[288px_minmax(0,1fr)_365px]"
      >
        {/* FILTERS */}
        <aside className="rounded-[15px] border border-[#e0e8ef] bg-white px-4 py-[18px] shadow-[0_3px_12px_#102b4508] desk:min-h-[346px]">
          <CatalogFilters
            brands={allBrands}
            categories={allCategories}
            search={search}
            brand={brand}
            category={category}
          />
        </aside>

        {/* LISTING */}
        <div className="min-w-0 px-0 md:px-2">
          <div className="mb-[18px] mt-1 flex items-start justify-between gap-2 md:items-center">
            <div>
              <h2 className="text-[21px] font-bold leading-[1.2] md:text-[23px]">
                All Products
              </h2>
              <p className="my-[5px] text-[11px] text-[#40576b]">
                Showing{' '}
                <b>
                  {rangeStart} – {rangeEnd}
                </b>{' '}
                of {total} products
              </p>
              <Link
                href="/part-numbers"
                className="text-[10px] font-bold text-[#b77b1c] hover:underline md:text-[11px]"
              >
                Browse A–Z part number index →
              </Link>
            </div>

            <label className="whitespace-nowrap text-[10px] md:text-[11px]">
              Sort by:{' '}
              <select
                defaultValue="relevance"
                aria-label="Sort products"
                className="ml-1.5 rounded-[8px] border border-[#d5dfe8] bg-white p-2 text-[11px] text-[#09233b]"
              >
                <option value="relevance">Relevance</option>
                <option value="part">Part Number</option>
              </select>
            </label>
          </div>

          {products.length === 0 ? (
            <div className="rounded-[14px] border border-[#e7edf2] bg-white p-10 text-center">
              <h3 className="text-xl font-extrabold">No Products Found</h3>
              <p className="mx-auto mt-2 max-w-md text-[13px] text-[#40576b]">
                We couldn&apos;t find products matching your current search
                or filters. Try different keywords or reset your filters.
              </p>
              <Link
                href="/products"
                className="mt-5 inline-block rounded-[8px] bg-[#062a43] px-5 py-2.5 text-xs font-bold text-white"
              >
                View All Products →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3 max-[390px]:grid-cols-1">
              {products.map((product) => (
                <article
                  key={product.slug}
                  className="min-w-0 overflow-hidden rounded-[14px] border border-[#e7edf2] bg-white shadow-[0_3px_12px_#102b4508] max-[390px]:grid max-[390px]:grid-cols-[40%_1fr]"
                >
                  <img
                    src={productImage(product)}
                    alt={`${product.displayTitle} ${product.partNumber}`}
                    className="h-[110px] w-full bg-gradient-to-b from-white to-[#f7f9fb] object-contain p-[7px] md:h-[118px] max-[390px]:h-full max-[390px]:min-h-[220px]"
                  />

                  <div className="px-[9px] pb-2.5 md:px-[13px] md:pb-3">
                    <span className="inline-block rounded-[12px] bg-[#dce8f2] px-2 py-[3px] text-[9px] font-extrabold uppercase">
                      {product.brand}
                    </span>

                    <h3 className="mb-0.5 mt-[7px] line-clamp-2 text-[13px] font-bold leading-[1.2] md:text-[15px]">
                      {product.displayTitle}
                    </h3>

                    <p className="my-[5px] text-[11px] text-[#344b60]">
                      P/N: {product.partNumber} · {product.type}
                    </p>

                    <p className="my-[5px] line-clamp-2 text-[9px] leading-[1.35] text-[#20394f] md:text-[10px]">
                      {product.description ||
                        product.keywords ||
                        'Industrial spare part available on request.'}
                    </p>

                    <span className="mb-2.5 mt-1 inline-block rounded-full bg-[#ffe6ae] px-2.5 py-1 text-[10px] font-bold text-[#925500]">
                      ● Quote on Request
                    </span>

                    <div className="flex gap-1.5 max-[760px]:flex-col">
                      <a
                        href={quoteHref(product.partNumber)}
                        className="flex-1 whitespace-nowrap rounded-[7px] bg-[#062a43] px-1.5 py-2.5 text-center text-[10px] font-bold text-white"
                      >
                        Request a Quote
                      </a>
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 whitespace-nowrap rounded-[7px] border border-[#28445a] px-1.5 py-2.5 text-center text-[10px] font-bold"
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
              className="mt-5 flex flex-wrap items-center justify-center gap-1.5"
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
                  className="inline-flex h-8 items-center justify-center rounded-[8px] border border-[#d5dfe8] bg-white px-2.5 text-[11px] font-bold text-[#40576b] hover:border-[#e8a928] hover:text-[#09233b]"
                >
                  ← Previous
                </Link>
              )}

              {/* Windowed pagination: first, ellipsis, window around current, ellipsis, last. */}
              {(() => {
                const window = 2;
                const pages: (number | "...")[] = [];
                const push = (p: number | null) => {
                  if (p === null) {
                    if (pages[pages.length - 1] !== "...") pages.push("...");
                  } else if (p >= 1 && p <= totalPages) {
                    pages.push(p);
                  }
                };
                push(1);
                for (
                  let p = Math.max(2, currentPage - window);
                  p <= Math.min(totalPages - 1, currentPage + window);
                  p++
                ) {
                  push(p);
                }
                if (currentPage - window > 2) {
                  pages.splice(1, 0, "...");
                }
                if (currentPage + window < totalPages - 1) {
                  pages.splice(pages.length - 1, 0, "...");
                }
                if (pages.length > 0 && pages[pages.length - 1] !== totalPages) {
                  pages.push(totalPages);
                }

                // de-duplicate while preserving order
                const seen = new Set<string | number>();
                const unique = pages.filter((p) => {
                  const key = p === "..." ? "..." : String(p);
                  if (seen.has(key)) return false;
                  seen.add(key);
                  return true;
                });

                return unique.map((pageNumber) => {
                  if (pageNumber === "...") {
                    return (
                      <span
                        key="ellipsis"
                        className="inline-flex h-8 min-w-8 items-center justify-center rounded-[8px] border border-[#d5dfe8] bg-white px-2 text-[11px] font-bold text-[#40576b]"
                      >
                        …
                      </span>
                    );
                  }
                  return (
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
                        pageNumber === currentPage ? "page" : undefined
                      }
                      className={cn(
                        "inline-flex h-8 min-w-8 items-center justify-center rounded-[8px] border px-2 text-[11px] font-bold",
                        pageNumber === currentPage
                          ? "border-[#062a43] bg-[#062a43] text-white"
                          : "border-[#d5dfe8] bg-white text-[#40576b] hover:border-[#e8a928] hover:text-[#09233b]"
                      )}
                    >
                      {pageNumber}
                    </Link>
                  );
                });
              })()}

              {currentPage < totalPages && (
                <Link
                  href={{
                    pathname: '/products',
                    query: {
                      ...paginationQuery,
                      page: String(currentPage + 1),
                    },
                  }}
                  className="inline-flex h-8 items-center justify-center rounded-[8px] border border-[#d5dfe8] bg-white px-2.5 text-[11px] font-bold text-[#40576b] hover:border-[#e8a928] hover:text-[#09233b]"
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
          className="overflow-hidden rounded-[15px] bg-[#05283f] text-white shadow-lg md:col-start-2 md:grid md:grid-cols-[42%_1fr] cat:col-auto cat:block desk:min-h-[348px]"
        >
          <img
            src={`${A}quote-engineer.jpg`}
            alt="Aviation engineer inspecting an engine"
            className="h-40 w-full object-cover opacity-85 md:h-full md:min-h-[280px] cat:h-[180px] cat:min-h-0"
          />

          <div className="px-5 pb-[22px] md:p-4 cat:px-7 cat:pb-6 cat:pt-0">
            <i className="mb-[7px] mt-[18px] block h-[2px] w-[31px] bg-[#f5b83f] md:mt-2 cat:mt-[18px]" />

            <h2 className="mb-3 text-[25px] font-bold leading-[1.1] md:text-[27px]">
              Can’t Find the
              <br />
              Part You Need?
            </h2>

            <p className="mb-[17px] text-[13px] leading-[1.5] text-[#dce8ef]">
              Share your part number or requirements. Our experts will help
              you source the right component.
            </p>

            <a
              href="mailto:sale@agoaviation.com?subject=Parts%20Requirement"
              className="flex items-center justify-center gap-2 rounded-[10px] bg-[#ffc354] px-2.5 py-3.5 text-[13px] font-extrabold text-[#09233b]"
            >
              ✉ &nbsp; Send Your Requirement <b className="ml-auto">→</b>
            </a>

            <a
              href="https://wa.me/917011123269"
              className="mt-[17px] inline-block text-xs font-bold text-white hover:text-[#ffc354]"
            >
              ◉ &nbsp; Chat on WhatsApp&nbsp; →
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
