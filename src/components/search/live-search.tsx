'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, Package, Search } from 'lucide-react';

interface SuggestionProduct {
  slug: string;
  title: string;
  partNumber: string;
  brand: string;
  type: string;
}

interface SuggestionEntity {
  slug: string;
  name: string;
  count: number;
}

interface SearchData {
  query: string;
  products: SuggestionProduct[];
  brands: SuggestionEntity[];
  categories: SuggestionEntity[];
  total: number;
}

interface LiveSearchProps {
  variant?: 'header' | 'hero';
  placeholder?: string;
  defaultValue?: string;
  categories?: { slug: string; name: string; short: string }[];
  categoryDefault?: string;
  hiddenParams?: Record<string, string>;
  className?: string;
}

const MIN_QUERY = 1;
const DEBOUNCE_MS = 180;

function highlight(text: string, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return text;
  const index = text.toLowerCase().indexOf(needle);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-transparent font-extrabold text-[#b77b1c]">
        {text.slice(index, index + needle.length)}
      </mark>
      {text.slice(index + needle.length)}
    </>
  );
}

/**
 * Typeahead catalogue search. Queries `/api/search` as the visitor types
 * (debounced) and shows matching part numbers, brands and categories.
 */
export function LiveSearch({
  variant = 'header',
  placeholder = 'Search here',
  defaultValue = '',
  categories = [],
  categoryDefault,
  hiddenParams,
  className = '',
}: LiveSearchProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const [query, setQuery] = useState(defaultValue);
  const [data, setData] = useState<SearchData | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Fetch suggestions as the visitor types.
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < MIN_QUERY) {
      setData(null);
      setOpen(false);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error('Search failed');
        const payload = (await response.json()) as SearchData;
        if (cancelled) return;
        setData(payload);
        setOpen(true);
        setActiveIndex(-1);
      } catch (error) {
        if (cancelled || (error as Error).name === 'AbortError') return;
        setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  // Close on outside click.
  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const isHero = variant === 'hero';
  const trimmedQuery = query.trim();
  const showDropdown = open && trimmedQuery.length >= MIN_QUERY;
  const hasResults = Boolean(
    data &&
      (data.products.length > 0 ||
        data.brands.length > 0 ||
        data.categories.length > 0),
  );

  const items = data
    ? [
        ...data.products.map((product) => ({
          href: `/products/${product.slug}`,
        })),
        ...data.brands.map((brand) => ({ href: `/brands/${brand.slug}` })),
        ...data.categories.map((category) => ({
          href: `/categories/${category.slug}`,
        })),
        { href: `/products?search=${encodeURIComponent(trimmedQuery)}` },
      ]
    : [];

  const goTo = (href: string) => {
    setOpen(false);
    setActiveIndex(-1);
    router.push(href);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!showDropdown || items.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % items.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? items.length - 1 : index - 1));
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      goTo(items[activeIndex].href);
    }
  };

  const itemIndex = (section: 'products' | 'brands' | 'categories', index: number) => {
    if (!data) return -1;
    if (section === 'products') return index;
    if (section === 'brands') return data.products.length + index;
    return data.products.length + data.brands.length + index;
  };

  const formClassName = isHero
    ? 'flex min-h-12 w-full flex-wrap overflow-hidden rounded-[10px] bg-white text-[#09233b] md:h-12 md:w-[min(690px,65vw)] md:flex-nowrap'
    : 'relative flex w-full items-center rounded-full border border-[#0b3b66]/15 bg-[#f4f7fb] p-1 pr-[46px]';

  return (
    <div
      ref={rootRef}
      className={`relative w-full ${isHero ? 'mt-4' : ''} ${className}`}
    >
      <form
        action="/products"
        method="GET"
        role="search"
        className={formClassName}
        onSubmit={(event) => {
          if (activeIndex >= 0 && items[activeIndex]) {
            event.preventDefault();
            goTo(items[activeIndex].href);
          } else {
            setOpen(false);
          }
        }}
      >
        {hiddenParams &&
          Object.entries(hiddenParams).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}

        {isHero && categories.length > 0 && (
          <select
            name="category"
            defaultValue={categoryDefault}
            aria-label="Product category"
            className="h-11 max-w-[125px] border-r border-[#dce4eb] bg-white px-2 text-[11px] font-bold outline-none md:h-full md:max-w-none md:px-4 md:text-[13px]"
          >
            <option value="">All Products</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.name}>
                {item.short}
              </option>
            ))}
          </select>
        )}

        <input
          type="search"
          name="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            if (trimmedQuery.length >= MIN_QUERY && data) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Search spare parts"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls={listId}
          className={
            isHero
              ? 'h-11 min-w-0 flex-1 px-2.5 text-[11px] outline-none md:h-full md:px-4 md:text-[13px]'
              : 'h-[42px] w-full min-w-0 bg-transparent px-4 text-[12px] text-[#10243a] outline-none'
          }
        />

        <button
          type="submit"
          aria-label="Search"
          className={
            isHero
              ? 'h-11 w-12 bg-[#ffc45b] text-[30px] leading-none md:h-full md:w-[66px]'
              : 'absolute right-2 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#f0a843] text-[#17191c] transition hover:bg-[#ffc66f]'
          }
        >
          {loading ? (
            <Loader2
              size={isHero ? 18 : 16}
              className={isHero ? 'mx-auto animate-spin' : 'animate-spin'}
            />
          ) : isHero ? (
            '⌕'
          ) : (
            <Search size={16} />
          )}
        </button>
      </form>

      {showDropdown && (
        <div
          id={listId}
          role="listbox"
          aria-label="Search suggestions"
          className={`absolute top-[calc(100%+8px)] z-[80] max-h-[70vh] overflow-y-auto rounded-2xl border border-[#dbe5ee] bg-white shadow-[0_20px_50px_rgba(10,28,48,0.18)] ${
            isHero ? 'left-0 right-0' : 'right-0 w-[min(92vw,400px)]'
          }`}
        >
          {!hasResults && !loading && (
            <p className="px-4 py-5 text-[12px] text-[#718394]">
              No matches for “{trimmedQuery}”. Try a part number, brand or
              category.
            </p>
          )}

          {data && data.products.length > 0 && (
            <div className="border-b border-[#eef3f8] py-2">
              <p className="px-4 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9b6917]">
                Products
              </p>
              {data.products.map((product, index) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setActiveIndex(itemIndex('products', index))}
                  className={`flex items-start gap-3 px-4 py-2 transition ${
                    activeIndex === itemIndex('products', index)
                      ? 'bg-[#f4f8fc]'
                      : 'hover:bg-[#f4f8fc]'
                  }`}
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#eef4fa] text-[#12549a]">
                    <Package size={14} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-[11px] font-bold text-[#12385f]">
                      {highlight(product.partNumber, trimmedQuery)}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-[#5b7184]">
                      {highlight(product.title, trimmedQuery)}
                    </span>
                  </span>
                  <span className="ml-auto shrink-0 pt-1 text-[10px] font-semibold text-[#8496a5]">
                    {product.brand}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {data && data.brands.length > 0 && (
            <div className="border-b border-[#eef3f8] py-2">
              <p className="px-4 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9b6917]">
                Brands
              </p>
              {data.brands.map((brand, index) => (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setActiveIndex(itemIndex('brands', index))}
                  className={`flex items-center justify-between px-4 py-2 text-[12px] transition ${
                    activeIndex === itemIndex('brands', index)
                      ? 'bg-[#f4f8fc]'
                      : 'hover:bg-[#f4f8fc]'
                  }`}
                >
                  <span className="font-bold text-[#12385f]">
                    {highlight(brand.name, trimmedQuery)}
                  </span>
                  <span className="text-[10px] text-[#8496a5]">
                    {brand.count.toLocaleString('en-US')} parts
                  </span>
                </Link>
              ))}
            </div>
          )}

          {data && data.categories.length > 0 && (
            <div className="border-b border-[#eef3f8] py-2">
              <p className="px-4 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9b6917]">
                Categories
              </p>
              {data.categories.map((category, index) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() =>
                    setActiveIndex(itemIndex('categories', index))
                  }
                  className={`flex items-center justify-between px-4 py-2 text-[12px] transition ${
                    activeIndex === itemIndex('categories', index)
                      ? 'bg-[#f4f8fc]'
                      : 'hover:bg-[#f4f8fc]'
                  }`}
                >
                  <span className="font-bold text-[#12385f]">
                    {highlight(category.name, trimmedQuery)}
                  </span>
                  {category.count > 0 && (
                    <span className="text-[10px] text-[#8496a5]">
                      {category.count.toLocaleString('en-US')} parts
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}

          {data && data.total > 0 && (
            <Link
              href={`/products?search=${encodeURIComponent(trimmedQuery)}`}
              onClick={() => setOpen(false)}
              onMouseEnter={() => setActiveIndex(items.length - 1)}
              className={`flex items-center justify-between px-4 py-3 text-[11px] font-extrabold text-[#0b3b66] transition ${
                activeIndex === items.length - 1
                  ? 'bg-[#fdf1de]'
                  : 'hover:bg-[#fdf1de]'
              }`}
            >
              <span>View all results for “{trimmedQuery}”</span>
              <span className="text-[10px] font-semibold text-[#8496a5]">
                {data.total.toLocaleString('en-US')} matches →
              </span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

/** Hero button keeps the arrow glyph; header shows a spinner while loading. */
export default LiveSearch;
