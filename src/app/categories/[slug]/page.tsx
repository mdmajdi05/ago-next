import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';
import { categoryService, productService, brandService } from '@/services';
import {
  CategoryExplorer,
  type ExplorerBrand,
  type ExplorerProduct,
  type ExplorerType,
} from '@/components/categories/category-explorer';
import { MIN_PRODUCTS_PER_TYPE_PAGE } from '@/lib/catalog/taxonomy';
import { getCategoryImage } from '@/lib/catalog/images';
import {
  getPartCardImage,
  getTypeTileImage,
} from '@/lib/catalog/category-visuals';
import { slugifyBrand } from '@/services/brandService';
import {
  breadcrumbSchema,
  buildPageMetadata,
  collectionPageSchema,
} from '@/lib/seo';

/** Products per paginated page. 24 = six full rows on the 4-column grid. */
const PER_PAGE = 24;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return (Array.isArray(value) ? value : [value]).filter(Boolean);
}

function toInt(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = parseInt(raw || '1', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
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

  const isFiltered = Boolean(
    query.search ||
      toArray(query.brand).length ||
      toArray(query.type).length,
  );

  // Clamp out-of-range page numbers so the canonical always points at a page
  // that actually exists.
  const pageCount = Math.max(1, Math.ceil(products.length / PER_PAGE));
  const page = Math.min(toInt(query.page), pageCount);
  const pageLabel = page > 1 ? ` – Page ${page} of ${pageCount}` : '';

  return buildPageMetadata({
    title:
      page > 1
        ? `${category.name}${pageLabel}`
        : `${category.name} – ${products.length.toLocaleString('en-US')} Spare Parts from ${brands.length} Brands`,
    description: `Browse ${products.length} ${category.name.toLowerCase()} for gas turbines and industrial plants, including ${brandLabel}. AGO Aviation verifies part numbers, condition and availability, with worldwide delivery and quote-based supply.${pageLabel ? ` Page ${page} of ${pageCount}.` : ''}`,
    path:
      isFiltered || page <= 1
        ? `/categories/${category.slug}`
        : `/categories/${category.slug}?page=${page}`,
    noIndex: isFiltered,
    keywords: [
      `${category.name} spare parts`,
      `${category.name.toLowerCase()} gas turbine`,
      `buy ${category.name.toLowerCase()}`,
      ...brands
        .slice(0, 6)
        .map((brand) => `${brand.name} ${category.name.toLowerCase()}`),
    ],
    image: getCategoryImage(category.slug),
    imageAlt: `${category.name} supplied by AGO Aviation`,
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const category = categoryService.getBySlug(slug);
  if (!category) notFound();

  const allProducts = productService.getByCategory(slug);
  const types = productService.getTypes(category.slug);

  // Brand counts come from the live category inventory, not a static list.
  const brandCounts = new Map<string, number>();
  for (const product of allProducts) {
    brandCounts.set(product.brand, (brandCounts.get(product.brand) || 0) + 1);
  }
  const brands: ExplorerBrand[] = [...brandCounts.entries()]
    .map(([name, count]) => ({ name, slug: slugifyBrand(name), count }))
    .sort((a, b) => b.count - a.count);

  const typeLinks: ExplorerType[] = types.map((type) => ({
    slug: type.slug,
    name: type.name,
    count: type.count,
    href:
      type.count >= MIN_PRODUCTS_PER_TYPE_PAGE
        ? `/categories/${category.slug}/${type.slug}`
        : `/products?category=${category.slug}&type=${type.slug}`,
    image: getTypeTileImage(type.slug),
  }));

  const tiles: ExplorerType[] = [
    {
      slug: 'all',
      name: `All ${category.short}`,
      count: allProducts.length,
      href: `/categories/${category.slug}`,
      image:
        category.slug === 'turbine-parts'
          ? getTypeTileImage('all-turbine-parts')
          : undefined,
    },
    ...typeLinks,
  ];

  const selectedBrands = toArray(query.brand).filter((name) =>
    brandCounts.has(name),
  );
  const selectedTypes = toArray(query.type).filter((typeSlug) =>
    types.some((type) => type.slug === typeSlug),
  );
  const search = (Array.isArray(query.search) ? query.search[0] : query.search || '')
    .trim();
  const sort = ['az', 'za', 'brand'].includes(String(query.sort))
    ? String(query.sort)
    : 'default';

  // Server-side filtering across the whole category, not just one page.
  let filtered = allProducts;
  if (selectedBrands.length) {
    const wanted = new Set(selectedBrands);
    filtered = filtered.filter((product) => wanted.has(product.brand));
  }
  if (selectedTypes.length) {
    const wanted = new Set(selectedTypes);
    filtered = filtered.filter((product) => wanted.has(product.typeSlug));
  }
  if (search) {
    const needle = search.toLowerCase();
    filtered = filtered.filter((product) =>
      `${product.displayTitle} ${product.partNumber} ${product.brand}`
        .toLowerCase()
        .includes(needle),
    );
  }

  if (sort === 'az') {
    filtered = [...filtered].sort((a, b) =>
      a.displayTitle.localeCompare(b.displayTitle),
    );
  } else if (sort === 'za') {
    filtered = [...filtered].sort((a, b) =>
      b.displayTitle.localeCompare(a.displayTitle),
    );
  } else if (sort === 'brand') {
    filtered = [...filtered].sort(
      (a, b) =>
        a.brand.localeCompare(b.brand) ||
        a.partNumber.localeCompare(b.partNumber),
    );
  }

  const totalMatches = filtered.length;
  const pageCount = Math.max(1, Math.ceil(totalMatches / PER_PAGE));
  const page = Math.min(toInt(query.page), pageCount);
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const products: ExplorerProduct[] = pageItems.map((product) => ({
    slug: product.slug,
    title: product.displayTitle,
    partNumber: product.partNumber,
    brand: product.brand,
    type: product.type,
    image: getPartCardImage(product.partNumber, product.typeSlug),
  }));

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
      items: pageItems.map((product) => ({
        name: `${product.brand} ${product.partNumber}`,
        url: `/products/${product.slug}`,
      })),
    }),
  ];

  const allCategories = categoryService.getAll();

  return (
    <main className={cn('min-h-screen bg-[#f5f8fb] text-[#09233b] leading-[normal]')}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />

      {/* HERO — mirrors the catalogue page hero */}
      <section className="relative h-[500px] min-h-[500px] overflow-hidden bg-[#06263b] text-white md:h-[350px] md:min-h-[350px]">
        <div
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{
            backgroundImage: `linear-gradient(90deg,#06263bea,#06263b99),url("/assets/img/engine-lm2500-banner.jpg")`,
          }}
        />
        <div
          className="absolute inset-y-0 left-[46%] right-0 hidden bg-cover bg-center md:block"
          style={{
            backgroundImage: `linear-gradient(90deg,#06263b 0%,transparent 28%),url("/assets/img/engine-lm2500-banner.jpg")`,
          }}
        />

        <div className="relative z-[1] px-5 py-9 md:px-[7.3%] md:pb-[22px] md:pt-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-[#c9d9e6]"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">›</span>
            <Link href="/products" className="hover:text-white">
              Products
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-[#ffc34f]">{category.name}</span>
          </nav>

          <p className="flex items-center gap-2.5 text-[13px] font-extrabold leading-[normal] tracking-[1.2px] text-[#ffc34f]">
            <i className="h-[2px] w-[31px] bg-[#f5b83f]" /> GAS TURBINE
            &amp; INDUSTRIAL SPARE PARTS
          </p>

          <h1 className="my-2.5 text-[39px] font-bold leading-[1.02] tracking-[-1.5px] md:text-[49px] md:leading-[1.01]">
            {category.name}
          </h1>

          <p className="my-3 max-w-[640px] text-[13px] leading-[1.5] text-[#e7eff5] md:text-[15px]">
            {category.description} {allProducts.length.toLocaleString('en-US')}{' '}
            part numbers across {brands.length} brands, supplied worldwide on
            request.
          </p>

          <form
            action="/products"
            method="GET"
            role="search"
            className="mt-4 flex min-h-12 w-full flex-wrap overflow-hidden rounded-[10px] bg-white text-[#09233b] md:h-12 md:w-[min(690px,65vw)] md:flex-nowrap"
          >
            <select
              name="category"
              defaultValue={category.name}
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

      <CategoryExplorer
        categoryName={category.name}
        categoryShort={category.short}
        categorySlug={category.slug}
        icon={category.icon || 'Package'}
        totalCount={allProducts.length}
        products={products}
        totalMatches={totalMatches}
        page={page}
        pageCount={pageCount}
        perPage={PER_PAGE}
        brands={brands}
        types={typeLinks}
        tiles={tiles}
        selectedBrands={selectedBrands}
        selectedTypes={selectedTypes}
        search={search}
        sort={sort}
      />

      {/* Internal links: part types and brands */}
      <section className="mx-auto max-w-[1440px] px-5 pb-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-xl font-extrabold text-[#102d50]">
            Browse {category.name} by part type
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {typeLinks.map((type) => (
              <li key={type.slug}>
                <a
                  href={type.href}
                  className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#24455f] transition hover:border-blue-300 hover:bg-blue-50"
                >
                  {type.name} ({type.count.toLocaleString('en-US')})
                </a>
              </li>
            ))}
          </ul>

          {brands.length > 0 && (
            <>
              <h2 className="mt-8 text-xl font-extrabold text-[#102d50]">
                Brands in {category.name}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {brands.slice(0, 24).map((brand) => (
                  <li key={brand.slug}>
                    <a
                      href={`/brands/${brand.slug}`}
                      className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#24455f] transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      {brand.name} ({brand.count.toLocaleString('en-US')})
                    </a>
                  </li>
                ))}
                {brands.length > 24 && (
                  <li>
                    <a
                      href="/brands"
                      className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      All {brands.length} brands →
                    </a>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
