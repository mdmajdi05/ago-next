/**
 * Navigation data for the catalogue mega menu.
 *
 * Built on the server from the same centralised services used by the catalogue
 * pages, so menu links always match real categories, types and brands. The
 * result is plain serialisable data passed to the client header.
 */

import { CATALOG_TAXONOMY, MIN_PRODUCTS_PER_TYPE_PAGE } from './taxonomy';
import {
  getByCategory,
  getTypes,
} from '@/services/productService';
import { getAll as getAllBrands, getGroups } from '@/services/brandService';

export interface CatalogMenuLink {
  label: string;
  href: string;
  meta?: string;
}

export interface CatalogMenuSection {
  title: string;
  links: CatalogMenuLink[];
}

export interface CatalogMenuData {
  products: CatalogMenuSection[];
  brandGroups: CatalogMenuSection[];
  brandCount: number;
  productCount: number;
}

export function buildCatalogMenu(): CatalogMenuData {
  const categories = CATALOG_TAXONOMY.map((category) => ({
    category,
    count: getByCategory(category.slug).length,
  }));

  const categoryLinks: CatalogMenuLink[] = categories.map(
    ({ category, count }) => ({
      label: category.name,
      href: `/categories/${category.slug}`,
      meta: `${count} ${count === 1 ? 'part' : 'parts'}`,
    })
  );

  const popularTypeLinks: CatalogMenuLink[] = categories
    .flatMap(({ category }) =>
      getTypes(category.slug).map((type) => ({
        name: type.name,
        slug: type.slug,
        categorySlug: type.categorySlug,
        categoryName: category.name,
        count: type.count,
      }))
    )
    .filter((type) => type.count >= MIN_PRODUCTS_PER_TYPE_PAGE)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 9)
    .map((type) => ({
      label: type.name,
      href: `/categories/${type.categorySlug}/${type.slug}`,
      meta: type.categoryName,
    }));

  const brands = getAllBrands().sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  );

  const topBrandLinks: CatalogMenuLink[] = brands.slice(0, 9).map((brand) => ({
    label: brand.name,
    href: `/brands/${brand.slug}`,
    meta: `${brand.count} ${brand.count === 1 ? 'part' : 'parts'}`,
  }));

  const brandGroups: CatalogMenuSection[] = getGroups().map((group) => ({
    title: group.name,
    links: group.brands.map((brand) => ({
      label: brand.name,
      href: `/brands/${brand.slug}`,
      meta: `${brand.count} ${brand.count === 1 ? 'part' : 'parts'}`,
    })),
  }));

  const productCount = categories.reduce((total, item) => total + item.count, 0);

  return {
    products: [
      { title: 'Browse by Category', links: categoryLinks },
      { title: 'Popular Part Types', links: popularTypeLinks },
      { title: 'Leading Brands', links: topBrandLinks },
    ],
    brandGroups,
    brandCount: brands.length,
    productCount,
  };
}

export default buildCatalogMenu;
