import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { brandService, categoryService, productService } from '@/services';
import { CatalogHero } from '@/components/catalog/catalog-hero';
import {
  ListingExplorer,
  type ListingFacet,
  type ListingProduct,
  type ListingTile,
} from '@/components/catalog/listing-explorer';
import { getCategoryImage } from '@/lib/catalog/images';
import { getPartCardImage } from '@/lib/catalog/category-visuals';
import {
  breadcrumbSchema,
  buildPageMetadata,
  collectionPageSchema,
} from '@/lib/seo';

/** Products per paginated page. 24 = six full rows on the 4-column grid. */
const PER_PAGE = 24;

interface BrandPageProps {
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
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const brand = brandService.getBySlug(slug);
  if (!brand) {
    return buildPageMetadata({
      title: 'Brand Not Found',
      description: 'The requested manufacturer could not be found.',
      path: `/brands/${slug}`,
      noIndex: true,
    });
  }

  const products = productService.getByBrand(slug);
  const categories = categoryService
    .getAll()
    .filter((category) => brand.categories.includes(category.name));
  const categoryNames = categories.slice(0, 4).map((category) => category.name);

  const isFiltered = Boolean(
    query.search || toArray(query.category).length || toArray(query.type).length,
  );

  const pageCount = Math.max(1, Math.ceil(products.length / PER_PAGE));
  const page = Math.min(toInt(query.page), pageCount);
  const pageLabel = page > 1 ? ` – Page ${page} of ${pageCount}` : '';

  return buildPageMetadata({
    title:
      page > 1
        ? `${brand.name} Spare Parts${pageLabel}`
        : `${brand.name} Spare Parts – ${products.length.toLocaleString('en-US')} Part Numbers`,
    description: `Source ${brand.name} gas turbine and industrial spare parts from AGO Aviation. Browse ${products.length.toLocaleString('en-US')} ${brand.name} part numbers across ${categoryNames.join(', ') || brand.group}, with part-number verification, condition options and worldwide delivery.${pageLabel ? ` Page ${page} of ${pageCount}.` : ''}`,
    path:
      isFiltered || page <= 1
        ? `/brands/${brand.slug}`
        : `/brands/${brand.slug}?page=${page}`,
    noIndex: isFiltered,
    keywords: [
      `${brand.name} spare parts`,
      `${brand.name} parts`,
      `${brand.name} gas turbine parts`,
      `${brand.name} replacement parts`,
      ...categories
        .slice(0, 5)
        .map((category) => `${brand.name} ${category.name}`),
    ],
    image: categories[0] ? getCategoryImage(categories[0].slug) : undefined,
    imageAlt: `${brand.name} spare parts supplied by AGO Aviation`,
  });
}

export default async function BrandPage({
  params,
  searchParams,
}: BrandPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const brand = brandService.getBySlug(slug);
  if (!brand) notFound();

  const allProducts = productService.getByBrand(slug);

  // Category and part-type counts for this brand's inventory.
  const categoryCounts = new Map<string, { name: string; count: number }>();
  const typeCounts = new Map<string, { name: string; count: number }>();
  for (const product of allProducts) {
    const category = categoryCounts.get(product.categorySlug);
    categoryCounts.set(product.categorySlug, {
      name: product.category,
      count: (category?.count || 0) + 1,
    });
    const type = typeCounts.get(product.typeSlug);
    typeCounts.set(product.typeSlug, {
      name: product.type,
      count: (type?.count || 0) + 1,
    });
  }

  const categoryOptions = [...categoryCounts.entries()]
    .map(([value, { name, count }]) => ({ value, label: name, count }))
    .sort((a, b) => b.count - a.count);

  const typeOptions = [...typeCounts.entries()]
    .map(([value, { name, count }]) => ({ value, label: name, count }))
    .sort((a, b) => b.count - a.count);

  const selectedCategories = toArray(query.category).filter((value) =>
    categoryCounts.has(value),
  );
  const selectedTypes = toArray(query.type).filter((value) =>
    typeCounts.has(value),
  );
  const search = (
    Array.isArray(query.search) ? query.search[0] : query.search || ''
  ).trim();
  const sort = ['az', 'za', 'brand'].includes(String(query.sort))
    ? String(query.sort)
    : 'default';

  // Server-side filtering across the whole brand inventory.
  let filtered = allProducts;
  if (selectedCategories.length) {
    const wanted = new Set(selectedCategories);
    filtered = filtered.filter((product) =>
      wanted.has(product.categorySlug),
    );
  }
  if (selectedTypes.length) {
    const wanted = new Set(selectedTypes);
    filtered = filtered.filter((product) => wanted.has(product.typeSlug));
  }
  if (search) {
    const needle = search.toLowerCase();
    filtered = filtered.filter((product) =>
      `${product.displayTitle} ${product.partNumber} ${product.type}`
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

  const categories = categoryService
    .getAll()
    .filter((category) => categoryCounts.has(category.slug));

  const tiles: ListingTile[] = categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    count: categoryCounts.get(category.slug)?.count || 0,
    href: `/categories/${category.slug}`,
    icon: category.icon || 'Package',
  }));

  const facets: ListingFacet[] = [
    {
      label: 'Categories',
      param: 'category',
      options: categoryOptions,
      selected: selectedCategories,
      preview: 6,
    },
    {
      label: 'Part Types',
      param: 'type',
      options: typeOptions,
      selected: selectedTypes,
      preview: 8,
    },
  ];

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Brands', path: '/brands' },
      { name: brand.name, path: `/brands/${brand.slug}` },
    ]),
    collectionPageSchema({
      name: `${brand.name} Spare Parts`,
      description:
        brand.description ||
        `${brand.name} gas turbine and industrial spare parts supplied by AGO Aviation.`,
      path: `/brands/${brand.slug}`,
      items: pageItems.map((product) => ({
        name: `${product.brand} ${product.partNumber}`,
        url: `/products/${product.slug}`,
      })),
    }),
  ];

  const allCategories = categoryService.getAll();
  const otherBrands = brandService
    .getAll()
    .filter((item) => item.slug !== brand.slug)
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  const filtersActive =
    selectedCategories.length > 0 || selectedTypes.length > 0 || search.length > 0;

  return (
    <main className="min-h-screen bg-[#f5f8fb] text-[#09233b] leading-[normal]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />

      <CatalogHero
        breadcrumbs={[{ label: 'Brands', href: '/brands' }, { label: brand.name }]}
        title={`${brand.name} Parts`}
        description={
          <>
            {brand.description || `${brand.name} is part of our ${brand.group} range.`}{' '}
            {allProducts.length.toLocaleString('en-US')} part numbers across{' '}
            {categories.length} categories, supplied worldwide on request.
          </>
        }
        categories={allCategories}
        searchDefault={search}
        hiddenParams={{ brand: brand.name }}
        ribbonTitle={
          <>
            {brand.name}
            <br />
            Spare Parts
          </>
        }
        ribbonSubtitle="OEM | Aftermarket | Repair Support"
      />

      <ListingExplorer
        basePath={`/brands/${brand.slug}`}
        entityName={brand.name}
        entityShort={brand.name}
        icon="Package"
        overview={`${brand.name} part numbers from the ${brand.group} range, verified against your requirement and quoted on request.`}
        overviewTitle="Brand Overview"
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
        resultsTitle={`${filtersActive ? 'Matching' : ''} ${brand.name} Part Numbers`.trim()}
        showBrand={false}
        helpTitle={`Need Help Sourcing ${brand.name} Parts?`}
        helpText={`Send us the part number and our ${brand.name} sourcing team will verify availability.`}
      />

      {/* Internal links: categories and other brands */}
      <section className="mx-auto max-w-[1440px] px-5 pb-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-xl font-extrabold text-[#102d50]">
            Browse {brand.name} parts by category
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#24455f] transition hover:border-blue-300 hover:bg-blue-50"
                >
                  {category.name} (
                  {(categoryCounts.get(category.slug)?.count || 0).toLocaleString(
                    'en-US',
                  )}
                  )
                </Link>
              </li>
            ))}
          </ul>

          {otherBrands.length > 0 && (
            <>
              <h2 className="mt-8 text-xl font-extrabold text-[#102d50]">
                Other brands we supply
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {otherBrands.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/brands/${item.slug}`}
                      className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#24455f] transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      {item.name} ({item.count.toLocaleString('en-US')})
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/brands"
                    className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    All brands →
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
