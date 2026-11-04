export interface Product {
  name: string;
  title: string;
  part: string;
  brand: string;
  category: string;
  url: string;
  slug: string;
  keywords?: string;
  description?: string;
  specifications?: Record<string, string>;
  image?: string;
}

export interface ProductFilters {
  search?: string;
  brand?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
