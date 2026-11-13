'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Cog,
  Cpu,
  Filter,
  Flame,
  Gauge,
  Grid2X2,
  Headphones,
  Heart,
  Layers,
  List,
  MonitorDot,
  Package,
  Pipette,
  Radar,
  Radio,
  RotateCw,
  Search,
  Settings,
  ShieldCheck,
  Sliders,
  Waves,
  X,
  Zap,
} from 'lucide-react';

export interface ExplorerProduct {
  slug: string;
  title: string;
  partNumber: string;
  brand: string;
  type: string;
  image?: string;
}

export interface ExplorerType {
  slug: string;
  name: string;
  count: number;
  href: string;
  image?: string;
}

export interface ExplorerBrand {
  slug: string;
  name: string;
  count: number;
}

interface CategoryExplorerProps {
  categoryName: string;
  categoryShort: string;
  categorySlug: string;
  icon: string;
  /** Total parts in the category (not just this page). */
  totalCount: number;
  /** Parts on the current page. */
  products: ExplorerProduct[];
  totalMatches: number;
  page: number;
  pageCount: number;
  perPage: number;
  types: ExplorerType[];
  tiles: ExplorerType[];
  brands: ExplorerBrand[];
  selectedBrands: string[];
  selectedTypes: string[];
  search: string;
  sort: string;
}

const BRAND_PREVIEW = 5;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function quoteHref(part: string) {
  return `mailto:sale@agoaviation.com?subject=${encodeURIComponent(
    `Quotation request for ${part}`,
  )}`;
}

function CategoryGlyph({
  name,
  size = 34,
}: {
  name: string;
  size?: number;
}) {
  const props = { size, strokeWidth: 1.5 };
  switch (name) {
    case 'Flame':
      return <Flame {...props} />;
    case 'Cog':
      return <Cog {...props} />;
    case 'Sliders':
      return <Sliders {...props} />;
    case 'Cpu':
      return <Cpu {...props} />;
    case 'Gauge':
      return <Gauge {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'RotateCw':
      return <RotateCw {...props} />;
    case 'ShieldCheck':
      return <ShieldCheck {...props} />;
    case 'Pipette':
      return <Pipette {...props} />;
    case 'Radar':
      return <Radar {...props} />;
    case 'Radio':
      return <Radio {...props} />;
    case 'Waves':
      return <Waves {...props} />;
    case 'MonitorDot':
      return <MonitorDot {...props} />;
    default:
      return <Package {...props} />;
  }
}

/**
 * Picks a distinguishing icon for a part type so icon-only tiles do not all
 * look the same. Falls back to the category icon.
 */
function resolveTypeIcon(slug: string, fallback: string): string {
  if (/sensor|probe|detector|analyser|analyzer|flame/.test(slug)) return 'Radar';
  if (/transmitter/.test(slug)) return 'Radio';
  if (/gauge|switch|meter/.test(slug)) return 'Gauge';
  if (/flow|pump|tubing/.test(slug)) return 'Waves';
  if (/monitor/.test(slug)) return 'MonitorDot';
  if (/plc|controller|io-module|hmi|network/.test(slug)) return 'Cpu';
  if (/drive|motor|power|battery/.test(slug)) return 'Zap';
  if (/relay|protection/.test(slug)) return 'ShieldCheck';
  if (/bearing|gear|coupling|shaft|transmission/.test(slug)) return 'Cog';
  if (/filter|seal|gasket/.test(slug)) return 'Filter';
  if (/fitting|tee|connector|piping/.test(slug)) return 'Pipette';
  if (/valve|actuator|solenoid|positioner/.test(slug)) return 'Sliders';
  return fallback;
}

interface HrefOverrides {
  brands?: string[];
  types?: string[];
  search?: string;
  sort?: string;
  page?: number;
}

export function CategoryExplorer({
  categoryName,
  categoryShort,
  categorySlug,
  icon,
  totalCount,
  products,
  totalMatches,
  page,
  pageCount,
  perPage,
  types,
  tiles,
  brands,
  selectedBrands,
  selectedTypes,
  search,
  sort,
}: CategoryExplorerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [searchInput, setSearchInput] = useState(search);
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [brandOpen, setBrandOpen] = useState(true);
  const [typeOpen, setTypeOpen] = useState(true);

  // Keep the input in sync when filters are cleared via a link.
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const filtersActive =
    selectedBrands.length > 0 || selectedTypes.length > 0 || search.length > 0;

  /** Builds a category URL from the current filters plus any overrides. */
  const buildHref = (overrides: HrefOverrides = {}) => {
    const nextBrands = overrides.brands ?? selectedBrands;
    const nextTypes = overrides.types ?? selectedTypes;
    const nextSearch = overrides.search ?? search;
    const nextSort = overrides.sort ?? sort;
    const nextPage = overrides.page ?? page;

    const params = new URLSearchParams();
    if (nextSearch) params.set('search', nextSearch);
    nextBrands.forEach((brand) => params.append('brand', brand));
    nextTypes.forEach((type) => params.append('type', type));
    if (nextSort && nextSort !== 'default') params.set('sort', nextSort);
    if (nextPage > 1) params.set('page', String(nextPage));

    const queryString = params.toString();
    return queryString
      ? `/categories/${categorySlug}?${queryString}`
      : `/categories/${categorySlug}`;
  };

  const navigate = (href: string) => {
    startTransition(() => {
      router.push(href, { scroll: false });
    });
  };

  const toggleBrand = (name: string) => {
    const next = selectedBrands.includes(name)
      ? selectedBrands.filter((item) => item !== name)
      : [...selectedBrands, name];
    navigate(buildHref({ brands: next, page: 1 }));
  };

  const toggleType = (slug: string) => {
    const next = selectedTypes.includes(slug)
      ? selectedTypes.filter((item) => item !== slug)
      : [...selectedTypes, slug];
    navigate(buildHref({ types: next, page: 1 }));
  };

  const submitSearch = (value: string) => {
    navigate(buildHref({ search: value.trim(), page: 1 }));
  };

  const toggleFavorite = (slug: string) => {
    setFavorites((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  };

  const brandOptions = showAllBrands ? brands : brands.slice(0, BRAND_PREVIEW);
  const rangeStart = totalMatches === 0 ? 0 : (page - 1) * perPage + 1;
  const rangeEnd = totalMatches === 0 ? 0 : rangeStart + products.length - 1;

  const paginationPages = (() => {
    const window = 2;
    const pages: (number | '...')[] = [];
    const push = (value: number | null) => {
      if (value === null) {
        if (pages[pages.length - 1] !== '...') pages.push('...');
      } else if (value >= 1 && value <= pageCount) {
        pages.push(value);
      }
    };
    push(1);
    for (
      let item = Math.max(2, page - window);
      item <= Math.min(pageCount - 1, page + window);
      item++
    ) {
      push(item);
    }
    if (page - window > 2) pages.splice(1, 0, '...');
    if (page + window < pageCount - 1) pages.splice(pages.length - 1, 0, '...');
    if (pages.length > 0 && pages[pages.length - 1] !== pageCount) {
      pages.push(pageCount);
    }
    const seen = new Set<string | number>();
    return pages.filter((item) => {
      const key = item === '...' ? '...' : String(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  })();

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-12">
      <div className="grid grid-cols-1 gap-7 py-7 lg:grid-cols-[302px_minmax(0,1fr)]">
        <aside
          className={`space-y-4 ${mobileFilters ? 'block' : 'hidden'} lg:block`}
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Settings size={25} className="text-[#12549a]" />
              <h2 className="font-bold">Category Overview</h2>
            </div>
            <p className="mt-3 pl-9 text-xs leading-relaxed text-slate-600">
              OEM, aftermarket and legacy {categoryShort.toLowerCase()} part
              numbers, verified against your requirement and quoted on request.
            </p>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-orange-50 px-4 py-3">
              <Layers size={25} className="text-[#13549a]" />
              <p className="text-lg font-extrabold">
                {totalCount.toLocaleString('en-US')} Products
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter size={21} className="text-[#12549a]" />
                <h2 className="font-bold">Filter Products</h2>
              </div>
              {filtersActive && (
                <Link
                  href={`/categories/${categorySlug}`}
                  className="text-xs font-semibold text-blue-600 underline"
                >
                  Clear All
                </Link>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitSearch(searchInput);
              }}
              className="mb-5 flex items-center rounded-xl border border-slate-300 px-3 py-2.5"
            >
              <Search size={17} className="shrink-0 text-slate-400" />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder={`Search within ${categoryShort}...`}
                aria-label={`Search within ${categoryName}`}
                className="ml-2 w-full bg-transparent text-xs outline-none"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    if (search) navigate(buildHref({ search: '', page: 1 }));
                  }}
                  aria-label="Clear search"
                  className="shrink-0"
                >
                  <X size={15} />
                </button>
              )}
            </form>

            {brands.length > 0 && (
              <div className="border-b border-slate-200 pb-4">
                <button
                  type="button"
                  onClick={() => setBrandOpen(!brandOpen)}
                  className="flex w-full items-center justify-between text-sm font-bold"
                >
                  Brands
                  {brandOpen ? (
                    <ChevronUp size={17} />
                  ) : (
                    <ChevronDown size={17} />
                  )}
                </button>
                {brandOpen && (
                  <div className="mt-3 space-y-2">
                    {brandOptions.map((brand) => (
                      <label
                        key={brand.slug}
                        className="flex cursor-pointer items-center gap-2 text-xs text-slate-700"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.name)}
                          onChange={() => toggleBrand(brand.name)}
                          className="h-4 w-4 accent-blue-700"
                        />
                        <span>{brand.name}</span>
                        <span className="text-slate-400">
                          ({brand.count.toLocaleString('en-US')})
                        </span>
                      </label>
                    ))}
                    {brands.length > BRAND_PREVIEW && (
                      <button
                        type="button"
                        onClick={() => setShowAllBrands(!showAllBrands)}
                        className="text-xs font-bold text-blue-600"
                      >
                        {showAllBrands ? '− Show Less' : '+ Show More'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {types.length > 0 && (
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setTypeOpen(!typeOpen)}
                  className="flex w-full items-center justify-between text-sm font-bold"
                >
                  Part Types
                  {typeOpen ? (
                    <ChevronUp size={17} />
                  ) : (
                    <ChevronDown size={17} />
                  )}
                </button>
                {typeOpen && (
                  <div className="mt-3 space-y-2">
                    {types.map((type) => (
                      <label
                        key={type.slug}
                        className="flex cursor-pointer items-start gap-2 text-xs text-slate-700"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type.slug)}
                          onChange={() => toggleType(type.slug)}
                          className="mt-0.5 h-4 w-4 accent-blue-700"
                        />
                        <span>{type.name}</span>
                        <span className="shrink-0 text-slate-400">
                          ({type.count.toLocaleString('en-US')})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#07528b] to-[#082b4c] p-5 text-white shadow-md">
            <div className="flex items-start gap-3">
              <Headphones size={30} className="shrink-0" />
              <div>
                <h3 className="text-lg font-bold leading-tight">
                  Need Help Finding the Right Part?
                </h3>
                <p className="mt-2 text-xs text-blue-100">
                  Our {categoryShort} specialists are here to assist you.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-400 px-5 py-2.5 text-xs font-bold text-[#092d50]"
                >
                  Get a Quote <ChevronRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-[27px]">
                Explore <span className="text-blue-700">{categoryName}</span>
              </h2>
              <div className="mt-2 h-1 w-16 rounded-full bg-orange-400" />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileFilters(!mobileFilters)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 lg:hidden"
                aria-expanded={mobileFilters}
              >
                <Filter size={15} /> Filters
              </button>
              <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setView('grid')}
                  aria-pressed={view === 'grid'}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold ${
                    view === 'grid' ? 'bg-blue-700 text-white' : 'text-slate-600'
                  }`}
                >
                  <Grid2X2 size={15} /> Grid View
                </button>
                <button
                  type="button"
                  onClick={() => setView('table')}
                  aria-pressed={view === 'table'}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold ${
                    view === 'table'
                      ? 'bg-blue-700 text-white'
                      : 'text-slate-600'
                  }`}
                >
                  <List size={16} /> Table View
                </button>
              </div>
            </div>
          </div>

          <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {tiles.map((type) => (
              <Link
                key={type.slug}
                href={type.href}
                className="group flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-3 text-center transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                {type.image ? (
                  <img
                    src={type.image}
                    alt=""
                    loading="lazy"
                    className="mb-2 h-[75px] w-full object-contain transition group-hover:scale-105"
                  />
                ) : (
                  <span className="mb-2 flex h-[75px] w-full items-center justify-center text-[#12549a] opacity-80">
                    <CategoryGlyph name={resolveTypeIcon(type.slug, icon)} />
                  </span>
                )}
                <span className="text-xs font-bold leading-tight text-[#12365e]">
                  {type.name}
                </span>
                <span className="mt-1 text-[10px] text-slate-500">
                  {type.count.toLocaleString('en-US')}{' '}
                  {type.count === 1 ? 'part' : 'parts'}
                </span>
              </Link>
            ))}
          </div>

          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold">
                {filtersActive ? 'Matching' : 'Available'} {categoryName}
              </h2>
              <div className="mt-2 h-1 w-16 rounded-full bg-orange-400" />
              <p className="mt-2 text-xs text-slate-500" aria-live="polite">
                Showing{' '}
                <b>
                  {rangeStart}–{rangeEnd}
                </b>{' '}
                of {totalMatches.toLocaleString('en-US')}{' '}
                {totalMatches === 1 ? 'part' : 'parts'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="whitespace-nowrap text-xs text-slate-500">
                Sort by:{' '}
                <select
                  value={sort}
                  onChange={(event) =>
                    navigate(
                      buildHref({ sort: event.target.value, page: 1 }),
                    )
                  }
                  aria-label="Sort products"
                  className="ml-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-[#09233b]"
                >
                  <option value="default">Default</option>
                  <option value="az">Name: A to Z</option>
                  <option value="za">Name: Z to A</option>
                  <option value="brand">Brand: A to Z</option>
                </select>
              </label>
            </div>
          </div>

          {filtersActive && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {selectedBrands.map((brand) => (
                <Link
                  key={`brand-${brand}`}
                  href={buildHref({
                    brands: selectedBrands.filter((item) => item !== brand),
                    page: 1,
                  })}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs text-blue-700 hover:bg-blue-100"
                >
                  {brand} <X size={12} />
                </Link>
              ))}
              {selectedTypes.map((typeSlug) => {
                const type = types.find((item) => item.slug === typeSlug);
                return (
                  <Link
                    key={`type-${typeSlug}`}
                    href={buildHref({
                      types: selectedTypes.filter((item) => item !== typeSlug),
                      page: 1,
                    })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs text-blue-700 hover:bg-blue-100"
                  >
                    {type?.name || typeSlug} <X size={12} />
                  </Link>
                );
              })}
              {search && (
                <Link
                  href={buildHref({ search: '', page: 1 })}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs text-blue-700 hover:bg-blue-100"
                >
                  “{search}” <X size={12} />
                </Link>
              )}
              <Link
                href={`/categories/${categorySlug}`}
                className="text-xs font-bold text-red-500"
              >
                Clear filters
              </Link>
            </div>
          )}

          <div
            className={
              isPending ? 'opacity-60 transition-opacity' : 'transition-opacity'
            }
          >
            {products.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center">
                <Search size={36} className="mx-auto text-slate-300" />
                <h3 className="mt-4 font-bold">No Products Found</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search or filters, or search the full
                  catalogue.
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <Link
                    href={`/categories/${categorySlug}`}
                    className="rounded-lg bg-blue-700 px-5 py-2 text-xs font-bold text-white"
                  >
                    Clear All Filters
                  </Link>
                  {search && (
                    <Link
                      href={`/products?category=${categorySlug}&search=${encodeURIComponent(search)}`}
                      className="rounded-lg border border-blue-700 px-5 py-2 text-xs font-bold text-blue-700"
                    >
                      Search full catalogue
                    </Link>
                  )}
                </div>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {products.map((product) => (
                  <article
                    key={product.slug}
                    className="group relative flex min-h-[250px] flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFavorite(product.slug)}
                      aria-label={
                        favorites.includes(product.slug)
                          ? 'Remove from shortlist'
                          : 'Add to shortlist'
                      }
                      aria-pressed={favorites.includes(product.slug)}
                      className="absolute right-3 top-3 z-10 rounded-full border border-slate-100 bg-white p-1.5 text-slate-500 shadow-sm hover:text-red-500"
                    >
                      <Heart
                        size={17}
                        fill={
                          favorites.includes(product.slug) ? '#ef4444' : 'none'
                        }
                        className={
                          favorites.includes(product.slug) ? 'text-red-500' : ''
                        }
                      />
                    </button>

                    <Link
                      href={`/products/${product.slug}`}
                      className="flex h-[125px] w-full items-center justify-center overflow-hidden rounded-xl bg-white"
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-[#f4f8fc] to-[#e8f0f8] text-[#a9bfd3]"
                        >
                          <Package size={42} strokeWidth={1.1} />
                        </span>
                      )}
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col px-1">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="line-clamp-2 min-h-[36px] pr-6 text-xs font-extrabold leading-relaxed text-[#12385f] hover:text-blue-600">
                          {product.title}
                        </h3>
                      </Link>
                      <p className="mt-1 truncate text-[11px] text-slate-500">
                        {product.partNumber}
                      </p>
                      <div className="mt-2">
                        <Link
                          href={`/brands/${slugify(product.brand)}`}
                          className="inline-flex rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 hover:border-blue-400"
                        >
                          {product.brand}
                        </Link>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                        <CheckCircle2 size={13} className="text-green-600" />
                        Available on request
                      </div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-600 py-2 text-[11px] font-bold text-blue-700 transition hover:border-orange-400 hover:bg-orange-400 hover:text-[#092d50]"
                      >
                        View Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full min-w-[860px] border-collapse text-left text-xs">
                  <caption className="sr-only">
                    {categoryName} part numbers with brand, type, availability
                    and links to request a quote.
                  </caption>
                  <thead className="bg-[#f1f6fa] text-[11px] uppercase tracking-[0.4px] text-[#40576b]">
                    <tr>
                      <th
                        scope="col"
                        className="sticky left-0 z-10 border-r border-slate-200/70 bg-[#f1f6fa] px-4 py-3 font-bold"
                      >
                        Part Number
                      </th>
                      <th scope="col" className="px-4 py-3 font-bold">
                        Description
                      </th>
                      <th scope="col" className="px-4 py-3 font-bold">
                        Brand
                      </th>
                      <th scope="col" className="px-4 py-3 font-bold">
                        Type
                      </th>
                      <th scope="col" className="px-4 py-3 font-bold">
                        Availability
                      </th>
                      <th scope="col" className="px-4 py-3 text-right font-bold">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((product) => (
                      <tr
                        key={product.slug}
                        className="group align-middle transition hover:bg-[#f8fbfe]"
                      >
                        <td className="sticky left-0 z-[1] whitespace-nowrap border-r border-slate-100 bg-white px-4 py-3 font-mono text-[11px] font-semibold text-[#12385f] group-hover:bg-[#f8fbfe]">
                          <Link
                            href={`/products/${product.slug}`}
                            className="hover:text-blue-600"
                          >
                            {product.partNumber}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/products/${product.slug}`}
                            className="font-semibold text-[#12385f] hover:text-blue-600"
                          >
                            {product.title}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <Link
                            href={`/brands/${slugify(product.brand)}`}
                            className="inline-flex rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 hover:border-blue-400"
                          >
                            {product.brand}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {product.type}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                            <CheckCircle2
                              size={13}
                              className="text-green-600"
                            />
                            Available on request
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => toggleFavorite(product.slug)}
                              aria-label={
                                favorites.includes(product.slug)
                                  ? 'Remove from shortlist'
                                  : 'Add to shortlist'
                              }
                              aria-pressed={favorites.includes(product.slug)}
                              className="rounded-md border border-slate-200 p-1.5 text-slate-500 hover:border-red-200 hover:text-red-500"
                            >
                              <Heart
                                size={14}
                                fill={
                                  favorites.includes(product.slug)
                                    ? '#ef4444'
                                    : 'none'
                                }
                                className={
                                  favorites.includes(product.slug)
                                    ? 'text-red-500'
                                    : ''
                                }
                              />
                            </button>
                            <a
                              href={quoteHref(product.partNumber)}
                              className="rounded-md bg-[#062a43] px-2.5 py-1.5 text-[10px] font-bold text-white hover:bg-[#0b3a5b]"
                            >
                              Quote
                            </a>
                            <Link
                              href={`/products/${product.slug}`}
                              className="inline-flex items-center gap-1 rounded-md border border-[#28445a] px-2.5 py-1.5 text-[10px] font-bold text-[#09233b] hover:border-orange-400 hover:bg-orange-400"
                            >
                              View <ArrowRight size={12} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {pageCount > 1 && (
            <nav
              className="mt-6 flex flex-wrap items-center justify-center gap-1.5"
              aria-label={`${categoryName} pagination`}
            >
              {page > 1 && (
                <Link
                  href={buildHref({ page: page - 1 })}
                  rel="prev"
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] font-bold text-[#40576b] hover:border-[#e8a928] hover:text-[#09233b]"
                >
                  ← Previous
                </Link>
              )}

              {paginationPages.map((item) =>
                item === '...' ? (
                  <span
                    key="ellipsis"
                    className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-[11px] font-bold text-[#40576b]"
                  >
                    …
                  </span>
                ) : (
                  <Link
                    key={item}
                    href={buildHref({ page: item })}
                    aria-current={item === page ? 'page' : undefined}
                    className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-[11px] font-bold ${
                      item === page
                        ? 'border-[#062a43] bg-[#062a43] text-white'
                        : 'border-slate-200 bg-white text-[#40576b] hover:border-[#e8a928] hover:text-[#09233b]'
                    }`}
                  >
                    {item}
                  </Link>
                ),
              )}

              {page < pageCount && (
                <Link
                  href={buildHref({ page: page + 1 })}
                  rel="next"
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] font-bold text-[#40576b] hover:border-[#e8a928] hover:text-[#09233b]"
                >
                  Next →
                </Link>
              )}
            </nav>
          )}

          {pageCount > 1 && (
            <p className="mt-3 text-center text-xs text-slate-500">
              Page {page} of {pageCount.toLocaleString('en-US')} ·{' '}
              {totalMatches.toLocaleString('en-US')} parts in {categoryName}
            </p>
          )}

          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-gradient-to-r from-[#082e52] to-[#075b91] p-6 text-white sm:flex-row md:p-8">
            <div>
              <h3 className="text-xl font-extrabold">
                Can&apos;t Find the Part You Need?
              </h3>
              <p className="mt-2 text-sm text-blue-100">
                Send us your part number and our team will help you source it.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-lg bg-orange-400 px-6 py-3 text-sm font-bold text-[#092d50]"
            >
              Request a Quote <ArrowRight className="ml-2 inline" size={16} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CategoryExplorer;
