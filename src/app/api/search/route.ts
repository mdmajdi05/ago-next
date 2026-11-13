import { NextResponse } from 'next/server';
import { brandService, categoryService, productService } from '@/services';

export const dynamic = 'force-dynamic';

export interface SearchSuggestionProduct {
  slug: string;
  title: string;
  partNumber: string;
  brand: string;
  type: string;
}

export interface SearchSuggestionEntity {
  slug: string;
  name: string;
  count: number;
}

export interface SearchResponse {
  query: string;
  products: SearchSuggestionProduct[];
  brands: SearchSuggestionEntity[];
  categories: SearchSuggestionEntity[];
  total: number;
}

const EMPTY: SearchResponse = {
  query: '',
  products: [],
  brands: [],
  categories: [],
  total: 0,
};

/** Minimum characters before the typeahead queries the catalogue. */
const MIN_QUERY = 1;

export async function GET(request: Request) {
  const query = (new URL(request.url).searchParams.get('q') || '')
    .replace(/\s+/g, ' ')
    .trim();

  if (query.length < MIN_QUERY) {
    return NextResponse.json<SearchResponse>(
      { ...EMPTY, query },
      { headers: { 'Cache-Control': 'public, max-age=60' } },
    );
  }

  const needle = query.toLowerCase();
  // Fetch a wider slice so part numbers that start with the query rank first.
  const { products, total } = productService.search({
    search: query,
    limit: 40,
  });

  const ranked = [...products].sort((a, b) => {
    const score = (product: (typeof products)[number]) => {
      const part = product.partNumber.toLowerCase();
      const title = product.displayTitle.toLowerCase();
      if (part === needle) return 0;
      if (part.startsWith(needle)) return 1;
      if (title.startsWith(needle)) return 2;
      return 3;
    };
    return (
      score(a) - score(b) ||
      a.displayTitle.localeCompare(b.displayTitle)
    );
  });

  const brands = brandService
    .getAll()
    .filter((brand) => brand.name.toLowerCase().includes(needle))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 4)
    .map((brand) => ({
      slug: brand.slug,
      name: brand.name,
      count: brand.count,
    }));

  const categories = categoryService
    .getAll()
    .filter(
      (category) =>
        category.name.toLowerCase().includes(needle) ||
        category.short.toLowerCase().includes(needle),
    )
    .slice(0, 4)
    .map((category) => ({
      slug: category.slug,
      name: category.name,
      count: category.count ?? 0,
    }));

  const payload: SearchResponse = {
    query,
    total,
    products: ranked.slice(0, 7).map((product) => ({
      slug: product.slug,
      title: product.displayTitle,
      partNumber: product.partNumber,
      brand: product.brand,
      type: product.type,
    })),
    brands,
    categories,
  };

  return NextResponse.json<SearchResponse>(payload, {
    headers: { 'Cache-Control': 'public, max-age=60' },
  });
}
