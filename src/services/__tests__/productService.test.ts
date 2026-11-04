import { describe, it, expect } from 'vitest';
import productService, {
  getAll,
  getBySlug,
  getByBrand,
  getByCategory,
  search,
  getAllSlugs,
  getFeatured,
  getRelated,
} from '../productService';

describe('ProductService', () => {
  it('getAll returns all normalized products', () => {
    const products = getAll();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('slug');
    expect(products[0]).toHaveProperty('brand');
    expect(products[0]).toHaveProperty('category');
  });

  it('getBySlug returns correct product or undefined', () => {
    const products = getAll();
    const first = products[0];
    const found = getBySlug(first.slug);
    expect(found?.slug).toBe(first.slug);
    expect(getBySlug('non-existent-slug')).toBeUndefined();
  });

  it('getByBrand returns products matching brand', () => {
    const geProducts = getByBrand('GE');
    expect(geProducts.length).toBeGreaterThan(0);
    geProducts.forEach((p) => {
      expect(p.brand.toLowerCase()).toBe('ge');
    });
  });

  it('getByCategory returns products matching category', () => {
    const turbineProducts = getByCategory('turbine-parts');
    expect(turbineProducts.length).toBeGreaterThan(0);
    turbineProducts.forEach((p) => {
      expect(p.category.toLowerCase()).toBe('turbine parts');
    });
  });

  it('search returns paginated results', () => {
    const result = search({ page: 1, limit: 10 });
    expect(result).toHaveProperty('products');
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('page');
    expect(result).toHaveProperty('totalPages');
    expect(result.products.length).toBeLessThanOrEqual(10);
    expect(result.page).toBe(1);
  });

  it('search with text filter works', () => {
    const result = search({ search: 'turbine', limit: 10 });
    result.products.forEach((p) => {
      const haystack = [p.title, p.part, p.brand, p.category, p.keywords, p.name, p.description]
        .join(' ')
        .toLowerCase();
      expect(haystack).toContain('turbine');
    });
  });

  it('getAllSlugs returns unique slugs', () => {
    const slugs = getAllSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('getFeatured returns curated products', () => {
    const featured = getFeatured(8);
    expect(featured.length).toBeLessThanOrEqual(8);
    expect(featured.length).toBeGreaterThan(0);
  });

  it('getRelated returns products sharing category or brand', () => {
    const products = getAll();
    const first = products[0];
    const related = getRelated(first, 4);
    expect(related.length).toBeLessThanOrEqual(4);
    related.forEach((p) => {
      expect(p.slug).not.toBe(first.slug);
    });
  });

  it('default export matches named exports', () => {
    expect(productService.getAll).toBe(getAll);
    expect(productService.getBySlug).toBe(getBySlug);
    expect(productService.search).toBe(search);
  });
});
