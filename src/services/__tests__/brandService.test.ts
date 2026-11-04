import { describe, it, expect } from 'vitest';
import brandService, {
  getAll,
  getBySlug,
  getByName,
  getGroups,
  getAllSlugs,
} from '../brandService';

describe('BrandService', () => {
  it('getAll returns all brands with slugs', () => {
    const brands = getAll();
    expect(Array.isArray(brands)).toBe(true);
    expect(brands.length).toBeGreaterThan(0);
    brands.forEach((b) => {
      expect(b).toHaveProperty('slug');
      expect(b).toHaveProperty('name');
      expect(b).toHaveProperty('count');
      expect(b).toHaveProperty('group');
      expect(b).toHaveProperty('categories');
    });
  });

  it('getBySlug returns correct brand or undefined', () => {
    const brands = getAll();
    const first = brands[0];
    const found = getBySlug(first.slug);
    expect(found?.slug).toBe(first.slug);
    expect(getBySlug('non-existent')).toBeUndefined();
  });

  it('getByName returns brand by display name', () => {
    const brands = getAll();
    const first = brands[0];
    const found = getByName(first.name);
    expect(found?.name).toBe(first.name);
    expect(getByName('Non Existent Brand')).toBeUndefined();
  });

  it('getGroups returns brand groups', () => {
    const groups = getGroups();
    expect(Array.isArray(groups)).toBe(true);
    expect(groups.length).toBeGreaterThan(0);
    groups.forEach((g) => {
      expect(g).toHaveProperty('name');
      expect(g).toHaveProperty('brands');
      expect(Array.isArray(g.brands)).toBe(true);
    });
  });

  it('getAllSlugs returns unique slugs', () => {
    const slugs = getAllSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('default export matches named exports', () => {
    expect(brandService.getAll).toBe(getAll);
    expect(brandService.getBySlug).toBe(getBySlug);
    expect(brandService.getGroups).toBe(getGroups);
  });
});
