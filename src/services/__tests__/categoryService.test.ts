import { describe, it, expect } from 'vitest';
import categoryService, {
  getAll,
  getBySlug,
  getByName,
  getAllSlugs,
} from '../categoryService';

describe('CategoryService', () => {
  it('getAll returns all categories', () => {
    const categories = getAll();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
    categories.forEach((c) => {
      expect(c).toHaveProperty('slug');
      expect(c).toHaveProperty('name');
      expect(c).toHaveProperty('description');
    });
  });

  it('getBySlug returns correct category or undefined', () => {
    const categories = getAll();
    const first = categories[0];
    const found = getBySlug(first.slug);
    expect(found?.slug).toBe(first.slug);
    expect(getBySlug('non-existent')).toBeUndefined();
  });

  it('getByName returns category by name', () => {
    const categories = getAll();
    const first = categories[0];
    const found = getByName(first.name);
    expect(found?.name).toBe(first.name);
    expect(getByName('Non Existent Category')).toBeUndefined();
  });

  it('getAllSlugs returns unique slugs', () => {
    const slugs = getAllSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('getBySlug matches legacy HTML page names', () => {
    // Categories in nav.json have a "page" field like "category-turbine-parts.html"
    const found = categoryService.getBySlug('category-turbine-parts.html');
    expect(found?.slug).toBe('turbine-parts');
  });
});
