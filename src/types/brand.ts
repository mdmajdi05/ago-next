export interface Brand {
  name: string;
  slug: string;
  count: number;
  group: string;
  categories: string[];
  description?: string;
}

export interface BrandGroup {
  name: string;
  description: string;
  brands: Brand[];
}
