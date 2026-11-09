export type ProductTier = 'A' | 'B' | 'C';

export type ProductEntityType = 'part' | 'family' | 'listing';

export interface Product {
  name: string;
  title: string;
  /** Raw part number as supplied by the catalogue. */
  part: string;
  /** Normalized, uppercase part number used for display. */
  partNumber: string;
  brand: string;
  category: string;
  /** Legacy source URL (kept for redirects and lookups). */
  url: string;
  /** Canonical, lowercase product slug. */
  slug: string;
  /** Human readable subcategory, e.g. "Control Valves". */
  type: string;
  typeSlug: string;
  /** Canonical category slug, e.g. "valves-actuators". */
  categorySlug: string;
  /** Unique title that disambiguates duplicate catalogue names. */
  displayTitle: string;
  /** True when another catalogue row shares the same title. */
  isDuplicateTitle: boolean;
  tier: ProductTier;
  entityType: ProductEntityType;
  qualityScore: number;
  indexable: boolean;
  aliases: string[];
  canonicalUrl: string;
  keywords?: string;
  description?: string;
  specifications?: Record<string, string>;
  image?: string;
  /** Internal flag: true for imported legacy parts, false for curated. */
  _legacy?: boolean;
}

export interface ProductFilters {
  search?: string;
  brand?: string;
  category?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ProductTypeSummary {
  slug: string;
  name: string;
  categorySlug: string;
  count: number;
}
