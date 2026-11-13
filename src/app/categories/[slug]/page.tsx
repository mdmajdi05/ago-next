import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';
import { categoryService, productService, brandService } from '@/services';
import { CatalogHero } from '@/components/catalog/catalog-hero';
import {
  ListingExplorer,
  type ListingFacet,
  type ListingProduct,
  type ListingTile,
} from '@/components/catalog/listing-explorer';
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
    query.search || toArray(query.brand).length || toArray(query.type).length,
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
    description: `Browse ${products.length.toLocaleString('en-US')} ${category.name.toLowerCase()} for gas turbines and industrial plants, including ${brandLabel}. AGO Aviation verifies part numbers, condition and availability, with worldwide delivery and quote-based supply.${pageLabel ? ` Page ${page} of ${pageCount}.` : ''}`,
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
  const brands = [...brandCounts.entries()]
    .map(([name, count]) => ({ name, slug: slugifyBrand(name), count }))
    .sort((a, b) => b.count - a.count);

  const typeLinks: ListingTile[] = types.map((type) => ({
    slug: type.slug,
    name: type.name,
    count: type.count,
    href:
      type.count >= MIN_PRODUCTS_PER_TYPE_PAGE
        ? `/categories/${category.slug}/${type.slug}`
        : `/products?category=${category.slug}&type=${type.slug}`,
    image: getTypeTileImage(type.slug),
  }));

  const tiles: ListingTile[] = [
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
  const search = (
    Array.isArray(query.search) ? query.search[0] : query.search || ''
  ).trim();
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

  const products: ListingProduct[] = pageItems.map((product) => ({
    slug: product.slug,
    title: product.displayTitle,
    partNumber: product.partNumber,
    brand: product.brand,
    type: product.type,
    image: getPartCardImage(product.partNumber, product.typeSlug),
  }));

  const facets: ListingFacet[] = [
    {
      label: 'Brands',
      param: 'brand',
      options: brands.map((brand) => ({
        value: brand.name,
        label: brand.name,
        count: brand.count,
      })),
      selected: selectedBrands,
    },
    {
      label: 'Part Types',
      param: 'type',
      options: types.map((type) => ({
        value: type.slug,
        label: type.name,
        count: type.count,
      })),
      selected: selectedTypes,
      preview: 8,
    },
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
      items: pageItems.map((product) => ({
        name: `${product.brand} ${product.partNumber}`,
        url: `/products/${product.slug}`,
      })),
    }),
  ];

  const allCategories = categoryService.getAll();
  const filtersActive =
    selectedBrands.length > 0 || selectedTypes.length > 0 || search.length > 0;

  return (
    <main
      className={cn('min-h-screen bg-[#f5f8fb] text-[#09233b] leading-[normal]')}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />

      <CatalogHero
        breadcrumbs={[
          { label: 'Products', href: '/products' },
          { label: category.name },
        ]}
        title={category.name}
        description={
          <>
            {category.description}{' '}
            {allProducts.length.toLocaleString('en-US')} part numbers across{' '}
            {brands.length} brands, supplied worldwide on request.
          </>
        }
        categories={allCategories}
        searchDefault={search}
        categoryDefault={category.name}
      />

      <ListingExplorer
        basePath={`/categories/${category.slug}`}
        entityName={category.name}
        entityShort={category.short}
        icon={category.icon || 'Package'}
        overview={`OEM, aftermarket and legacy ${category.short.toLowerCase()} part numbers, verified against your requirement and quoted on request.`}
        overviewTitle="Category Overview"
        totalCount={allProducts.length}
        products={products}
        totalMatches={totalMatches}
        page={page}
        pageCount={pageCount}
        perPage={PER_PAGE}
        facets={facets}
        tiles={tiles}
        search={search}
        sort={sort}
        resultsTitle={`${filtersActive ? 'Matching' : 'Available'} ${category.name}`}
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
                <Link
                  href={type.href}
                  className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#24455f] transition hover:border-blue-300 hover:bg-blue-50"
                >
                  {type.name} ({type.count.toLocaleString('en-US')})
                </Link>
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
                    <Link
                      href={`/brands/${brand.slug}`}
                      className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#24455f] transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      {brand.name} ({brand.count.toLocaleString('en-US')})
                    </Link>
                  </li>
                ))}
                {brands.length > 24 && (
                  <li>
                    <Link
                      href="/brands"
                      className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      All {brands.length} brands →
                    </Link>
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
