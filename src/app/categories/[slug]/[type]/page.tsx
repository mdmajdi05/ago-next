import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { categoryService, productService } from '@/services';
import { CatalogHero } from '@/components/catalog/catalog-hero';
import {
  ListingExplorer,
  type ListingFacet,
  type ListingProduct,
} from '@/components/catalog/listing-explorer';
import { MIN_PRODUCTS_PER_TYPE_PAGE } from '@/lib/catalog/taxonomy';
import { getCategoryImage } from '@/lib/catalog/images';
import { getPartCardImage } from '@/lib/catalog/category-visuals';
import { slugifyBrand } from '@/services/brandService';
import {
  breadcrumbSchema,
  buildPageMetadata,
  collectionPageSchema,
} from '@/lib/seo';

/** Products per paginated page. 24 = six full rows on the 4-column grid. */
const PER_PAGE = 24;

interface TypePageProps {
  params: Promise<{ slug: string; type: string }>;
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

function getTypeSummary(slug: string, type: string) {
  const category = categoryService.getBySlug(slug);
  const typeSummary = category
    ? productService.getTypes(category.slug).find((item) => item.slug === type)
    : undefined;
  if (
    !category ||
    !typeSummary ||
    typeSummary.count < MIN_PRODUCTS_PER_TYPE_PAGE
  ) {
    return undefined;
  }
  return { category, typeSummary };
}

export async function generateMetadata({
  params,
  searchParams,
}: TypePageProps): Promise<Metadata> {
  const { slug, type } = await params;
  const query = await searchParams;
  const resolved = getTypeSummary(slug, type);

  if (!resolved) {
    return buildPageMetadata({
      title: 'Page Not Found',
      description: 'The requested part type could not be found.',
      path: `/categories/${slug}/${type}`,
      noIndex: true,
    });
  }

  const { category, typeSummary } = resolved;
  const products = productService.getByType(category.slug, typeSummary.slug);
  const brands = Array.from(new Set(products.map((product) => product.brand)));

  const isFiltered = Boolean(query.search || toArray(query.brand).length);
  const pageCount = Math.max(1, Math.ceil(products.length / PER_PAGE));
  const page = Math.min(toInt(query.page), pageCount);
  const pageLabel = page > 1 ? ` – Page ${page} of ${pageCount}` : '';

  return buildPageMetadata({
    title:
      page > 1
        ? `${typeSummary.name} – ${category.name}${pageLabel}`
        : `${typeSummary.name} – ${typeSummary.count.toLocaleString('en-US')} ${category.name} Part Numbers`,
    description: `Browse ${typeSummary.count.toLocaleString('en-US')} ${typeSummary.name.toLowerCase()} in the ${category.name.toLowerCase()} range from ${brands.slice(0, 5).join(', ')}. AGO Aviation verifies part numbers, condition and availability, with worldwide quote-based supply.${pageLabel ? ` Page ${page} of ${pageCount}.` : ''}`,
    path:
      isFiltered || page <= 1
        ? `/categories/${category.slug}/${typeSummary.slug}`
        : `/categories/${category.slug}/${typeSummary.slug}?page=${page}`,
    noIndex: isFiltered,
    keywords: [
      `${typeSummary.name} spare parts`,
      `${typeSummary.name.toLowerCase()} ${category.name.toLowerCase()}`,
      `buy ${typeSummary.name.toLowerCase()}`,
      ...brands
        .slice(0, 6)
        .map((brand) => `${brand} ${typeSummary.name.toLowerCase()}`),
    ],
    image: getCategoryImage(category.slug),
    imageAlt: `${typeSummary.name} supplied by AGO Aviation`,
  });
}

export default async function TypePage({
  params,
  searchParams,
}: TypePageProps) {
  const { slug, type } = await params;
  const query = await searchParams;
  const resolved = getTypeSummary(slug, type);
  if (!resolved) notFound();

  const { category, typeSummary } = resolved;
  const allProducts = productService.getByType(
    category.slug,
    typeSummary.slug,
  );

  const brandCounts = new Map<string, number>();
  for (const product of allProducts) {
    brandCounts.set(product.brand, (brandCounts.get(product.brand) || 0) + 1);
  }
  const brands = [...brandCounts.entries()]
    .map(([name, count]) => ({ name, slug: slugifyBrand(name), count }))
    .sort((a, b) => b.count - a.count);

  const selectedBrands = toArray(query.brand).filter((name) =>
    brandCounts.has(name),
  );
  const search = (
    Array.isArray(query.search) ? query.search[0] : query.search || ''
  ).trim();
  const sort = ['az', 'za', 'brand'].includes(String(query.sort))
    ? String(query.sort)
    : 'default';

  let filtered = allProducts;
  if (selectedBrands.length) {
    const wanted = new Set(selectedBrands);
    filtered = filtered.filter((product) => wanted.has(product.brand));
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
      preview: 8,
    },
  ];

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: category.name, path: `/categories/${category.slug}` },
      {
        name: typeSummary.name,
        path: `/categories/${category.slug}/${typeSummary.slug}`,
      },
    ]),
    collectionPageSchema({
      name: `${typeSummary.name} – ${category.name}`,
      description: `${typeSummary.count} ${typeSummary.name.toLowerCase()} part numbers in the ${category.name} range.`,
      path: `/categories/${category.slug}/${typeSummary.slug}`,
      items: pageItems.map((product) => ({
        name: `${product.brand} ${product.partNumber}`,
        url: `/products/${product.slug}`,
      })),
    }),
  ];

  const allCategories = categoryService.getAll();
  const filtersActive = selectedBrands.length > 0 || search.length > 0;

  return (
    <main className="min-h-screen bg-[#f5f8fb] text-[#09233b] leading-[normal]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />

      <CatalogHero
        breadcrumbs={[
          { label: 'Products', href: '/products' },
          { label: category.name, href: `/categories/${category.slug}` },
          { label: typeSummary.name },
        ]}
        title={typeSummary.name}
        description={
          <>
            {typeSummary.count.toLocaleString('en-US')}{' '}
            {typeSummary.name.toLowerCase()} part numbers in the {category.name}{' '}
            range, supplied by {brands.length}{' '}
            {brands.length === 1 ? 'brand' : 'brands'} worldwide on request.
          </>
        }
        categories={allCategories}
        searchDefault={search}
        categoryDefault={category.name}
        hiddenParams={{ type: typeSummary.slug }}
        ribbonTitle={
          <>
            {category.name}
            <br />
            {typeSummary.name}
          </>
        }
      />

      <ListingExplorer
        basePath={`/categories/${category.slug}/${typeSummary.slug}`}
        entityName={typeSummary.name}
        entityShort={typeSummary.name}
        icon={category.icon || 'Package'}
        overview={`${typeSummary.name} part numbers in the ${category.name} range, verified against your requirement and quoted on request.`}
        overviewTitle="Type Overview"
        totalCount={allProducts.length}
        products={products}
        totalMatches={totalMatches}
        page={page}
        pageCount={pageCount}
        perPage={PER_PAGE}
        facets={facets}
        search={search}
        sort={sort}
        resultsTitle={`${filtersActive ? 'Matching' : 'Available'} ${typeSummary.name}`}
        helpTitle={`Need Help Sourcing ${typeSummary.name}?`}
        helpText={`Send us the part number and our ${category.short.toLowerCase()} team will verify availability and condition.`}
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-xl font-extrabold text-[#102d50]">
            Brands supplying {typeSummary.name}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {brands.map((brand) => (
              <li key={brand.slug}>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#24455f] transition hover:border-blue-300 hover:bg-blue-50"
                >
                  {brand.name} ({brand.count.toLocaleString('en-US')})
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-xl font-extrabold text-[#102d50]">
            Continue browsing
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            <li>
              <Link
                href={`/categories/${category.slug}`}
                className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#24455f] transition hover:border-blue-300 hover:bg-blue-50"
              >
                All {category.name} →
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#24455f] transition hover:border-blue-300 hover:bg-blue-50"
              >
                Full catalogue →
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
