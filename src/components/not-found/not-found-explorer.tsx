'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export interface NotFoundProduct {
  slug: string;
  title: string;
  partNumber: string;
  brand: string;
  category: string;
  categorySlug: string;
  type: string;
  image: string;
  keywords?: string;
}

export interface NotFoundBrand {
  name: string;
  slug: string;
  count: number;
}

export interface NotFoundCategory {
  name: string;
  slug: string;
  short: string;
  description: string;
  count: number;
}

interface NotFoundExplorerProps {
  products: NotFoundProduct[];
  featured: NotFoundProduct[];
  brands: NotFoundBrand[];
  categories: NotFoundCategory[];
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

function bigrams(value: string): string[] {
  const clean = normalize(value).replace(/\s+/g, '');
  const result: string[] = [];

  for (let index = 0; index < clean.length - 1; index += 1) {
    result.push(clean.slice(index, index + 2));
  }

  return result;
}

function diceCoefficient(a: string, b: string): number {
  const first = bigrams(a);
  const second = bigrams(b);

  if (first.length === 0 || second.length === 0) return 0;

  const counts = new Map<string, number>();
  for (const gram of first) {
    counts.set(gram, (counts.get(gram) || 0) + 1);
  }

  let intersection = 0;
  for (const gram of second) {
    const remaining = counts.get(gram) || 0;
    if (remaining > 0) {
      intersection += 1;
      counts.set(gram, remaining - 1);
    }
  }

  return (2 * intersection) / (first.length + second.length);
}

function scoreProduct(
  product: NotFoundProduct,
  rawQuery: string,
  categoryText = ''
): number {
  const query = normalize(rawQuery);
  if (!query) return 0;

  const title = normalize(product.title);
  const brand = normalize(product.brand);
  const category = normalize(product.category);
  const type = normalize(product.type);
  const part = normalize(product.partNumber);
  const keywords = normalize(product.keywords || '');
  const categoryDetail = normalize(categoryText);
  const haystack = `${title} ${brand} ${category} ${type} ${part} ${keywords} ${categoryDetail}`;
  const tokens = query.split(' ').filter(Boolean);
  const words = haystack.split(' ');

  let score = 0;

  if (part === query) score += 250;
  if (haystack.includes(query)) score += 120;
  if (brand === query) score += 80;
  if (category === query) score += 60;

  for (const token of tokens) {
    if (haystack.includes(token)) {
      score += 15;
    } else if (
      words.some((word) => word.startsWith(token) || token.startsWith(word))
    ) {
      score += 8;
    }
  }

  score += Math.round(diceCoefficient(query, `${title} ${brand}`) * 40);
  score += Math.round(diceCoefficient(query, category) * 20);
  score += Math.round(diceCoefficient(query, part) * 30);

  return score;
}

function productMatchesQuery(
  product: NotFoundProduct,
  rawQuery: string,
  categoryText = ''
): boolean {
  const query = normalize(rawQuery);
  if (!query) return false;

  const haystack = normalize(
    `${product.title} ${product.partNumber} ${product.brand} ${product.category} ${product.type} ${product.keywords || ''} ${categoryText}`
  );

  return haystack.includes(query);
}

export function NotFoundExplorer({
  products,
  featured,
  brands,
  categories,
}: NotFoundExplorerProps) {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');

  const categoryTextBySlug = useMemo(() => {
    const map = new Map<string, string>();
    for (const category of categories) {
      map.set(
        category.slug,
        `${category.name} ${category.short} ${category.description}`
      );
    }
    return map;
  }, [categories]);

  const matches = useMemo(() => {
    const clean = query.trim();
    if (!clean) return [];

    return products
      .map((product) => ({
        product,
        score: scoreProduct(
          product,
          clean,
          categoryTextBySlug.get(product.categorySlug) || ''
        ),
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((entry) => entry.product);
  }, [products, query, categoryTextBySlug]);

  const exactCount = useMemo(() => {
    const clean = query.trim();
    if (!clean) return 0;
    return products.filter((product) =>
      productMatchesQuery(
        product,
        clean,
        categoryTextBySlug.get(product.categorySlug) || ''
      )
    ).length;
  }, [products, query, categoryTextBySlug]);

  const hasQuery = query.trim().length > 0;
  const showingFallback = hasQuery && matches.length === 0;
  const displayProducts = hasQuery && matches.length > 0 ? matches : featured;

  const search = (value: string) => {
    setInput(value);
    setQuery(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(input);
  };

  const clearSearch = () => {
    setInput('');
    setQuery('');
  };

  const enquiryHref = `mailto:${siteConfig.email.sales}?subject=${encodeURIComponent(
    query.trim() ? `Part enquiry: ${query.trim()}` : 'Part enquiry from AGO Aviation'
  )}&body=${encodeURIComponent(
    `Hello AGO Aviation,\n\nI am looking for: ${
      query.trim() || '[part number / description]'
    }\n\nPlease share availability, lead time and pricing.\n`
  )}`;

  const quoteHref = (partNumber: string) =>
    `mailto:${siteConfig.email.sales}?subject=${encodeURIComponent(
      `Quotation request for ${partNumber}`
    )}`;

  const heading = !hasQuery
    ? 'Popular parts from our catalogue'
    : showingFallback
      ? `No exact match for “${query.trim()}” — here are parts customers often ask for`
      : exactCount > 0
        ? `Results for “${query.trim()}”`
        : `No exact match for “${query.trim()}” — similar parts you may need`;

  return (
    <div>
      {/* SEARCH */}
      <section className="relative -mt-8 px-4">
        <div className="mx-auto max-w-[1100px]">
          <form
            onSubmit={handleSubmit}
            role="search"
            className="flex flex-col gap-2 rounded-2xl border border-[#e2eaf1] bg-white p-2 shadow-[0_18px_45px_rgba(9,35,59,0.14)] sm:flex-row"
          >
            <label htmlFor="not-found-search" className="sr-only">
              Search products by part number, name or brand
            </label>
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-[#f5f8fb] px-4">
              <i className="fa-solid fa-magnifying-glass text-[#7b8b99]" aria-hidden="true" />
              <input
                id="not-found-search"
                type="search"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Search by part number, product name or brand…"
                className="h-12 w-full bg-transparent text-sm text-[#09233b] outline-none placeholder:text-[#7b8b99]"
              />
            </div>

            <button
              type="submit"
              className="h-12 rounded-xl bg-[#ffc45b] px-6 text-sm font-extrabold text-[#09233b] transition hover:bg-[#ffd27f]"
            >
              Search parts
            </button>

            {hasQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="h-12 rounded-xl border border-[#d5dfe8] px-4 text-xs font-bold text-[#40576b] transition hover:border-[#e8a928] hover:text-[#09233b]"
              >
                Clear
              </button>
            )}
          </form>

          <p className="mt-2 px-2 text-[11px] text-[#607287]">
            Try a part number like <b>G61B06</b>, a brand like <b>Siemens</b>, or a
            component like <b>combustion liner</b>.
          </p>
        </div>
      </section>

      {/* RESULTS */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[1.2px] text-[#b77b1c]">
                <i className="h-[2px] w-[31px] bg-[#f5b83f]" />
                {hasQuery ? 'Catalogue search' : 'Products & Parts'}
              </p>
              <h2 className="mt-2 max-w-3xl text-xl font-bold leading-snug text-[#09233b] md:text-2xl">
                {heading}
              </h2>
              {hasQuery && (
                <p className="mt-1 text-xs text-[#40576b]">
                  {exactCount > 0
                    ? `${exactCount} exact match${exactCount === 1 ? '' : 'es'} found in the catalogue.`
                    : 'We could not find an exact part number, so we are showing the closest matches.'}
                </p>
              )}
            </div>

            {hasQuery && matches.length > 0 && (
              <Link
                href={`/products?search=${encodeURIComponent(query.trim())}`}
                className="text-xs font-bold text-[#b77b1c] hover:underline"
              >
                View all matching products →
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {displayProducts.map((product) => (
              <article
                key={product.slug}
                className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e2eaf1] bg-white shadow-[0_3px_12px_#102b4508] transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative h-36 bg-gradient-to-b from-white to-[#f7f9fb]">
                  <img
                    src={product.image}
                    alt={`${product.title} ${product.partNumber}`}
                    className="h-full w-full object-contain p-3"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#dce8f2] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#0b3b66]">
                    {product.brand}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                  <p className="text-[9px] font-bold uppercase tracking-wide text-[#b77b1c]">
                    {product.category}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-[13px] font-bold leading-snug text-[#09233b]">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-[10px] text-[#40576b]">
                    P/N: {product.partNumber} · {product.type}
                  </p>

                  <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-[#e7f6ec] px-2.5 py-1 text-[9px] font-bold text-[#1f7a43]">
                    ● Available on request
                  </span>

                  <div className="mt-auto flex gap-2 pt-4">
                    <a
                      href={quoteHref(product.partNumber)}
                      className="flex-1 rounded-lg bg-[#062a43] px-2 py-2 text-center text-[10px] font-bold text-white transition hover:bg-[#0b3b66]"
                    >
                      Request a Quote
                    </a>
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex-1 rounded-lg border border-[#28445a] px-2 py-2 text-center text-[10px] font-bold text-[#09233b] transition hover:border-[#e8a928]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="bg-[#edf4fa] px-4 py-10">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[1.2px] text-[#b77b1c]">
                <i className="h-[2px] w-[31px] bg-[#f5b83f]" />
                Brands we support
              </p>
              <h2 className="mt-2 text-xl font-bold text-[#09233b] md:text-2xl">
                Search parts by manufacturer
              </h2>
            </div>
            <Link
              href="/brands"
              className="text-xs font-bold text-[#b77b1c] hover:underline"
            >
              View all brands →
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button
                key={brand.slug}
                type="button"
                onClick={() => search(brand.name)}
                className="inline-flex items-center gap-2 rounded-full border border-[#d5dfe8] bg-white px-4 py-2 text-xs font-bold text-[#24455f] transition hover:border-[#e8a928] hover:text-[#0b3b66]"
              >
                {brand.name}
                <span className="rounded-full bg-[#eef4f9] px-2 py-0.5 text-[10px] font-semibold text-[#607287]">
                  {brand.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white px-4 py-10">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[1.2px] text-[#b77b1c]">
                <i className="h-[2px] w-[31px] bg-[#f5b83f]" />
                Browse by category
              </p>
              <h2 className="mt-2 text-xl font-bold text-[#09233b] md:text-2xl">
                Find the right product family
              </h2>
            </div>
            <Link
              href="/part-numbers"
              className="text-xs font-bold text-[#b77b1c] hover:underline"
            >
              Browse A–Z part index →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => search(category.name)}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#e2eaf1] bg-[#f8fafc] px-4 py-3 text-left transition hover:border-[#e8a928] hover:bg-white"
              >
                <span>
                  <span className="block text-sm font-bold text-[#09233b]">
                    {category.name}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-[#607287]">
                    {category.count} part{category.count === 1 ? '' : 's'}
                  </span>
                </span>
                <span className="text-[#b77b1c]">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-4 pb-14 pt-2">
        <div className="mx-auto max-w-[1320px]">
          <div className="overflow-hidden rounded-2xl bg-[#05283f] p-7 text-white shadow-xl md:p-10">
            <p className="flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[1.2px] text-[#ffc45b]">
              <i className="h-[2px] w-[31px] bg-[#f5b83f]" />
              Still need help?
            </p>
            <h2 className="mt-2 max-w-2xl text-2xl font-bold leading-tight md:text-3xl">
              Can&apos;t find the exact part? Send us your requirement.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#dce8ef]">
              Share a part number, drawing or the details of the component you need.
              Our team will check availability, confirm the correct part and send a
              quotation directly to your inbox.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={enquiryHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffc45b] px-6 py-3 text-sm font-extrabold text-[#09233b] transition hover:bg-[#ffd27f]"
              >
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                Email {siteConfig.email.sales}
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-[#ffc45b] hover:text-[#ffc45b]"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                WhatsApp us
              </a>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-[#ffc45b] hover:text-[#ffc45b]"
              >
                <i className="fa-solid fa-house" aria-hidden="true" />
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
