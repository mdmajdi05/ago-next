import { describe, expect, it } from 'vitest';

import {
  generateSitemaps,
  renderSitemapIndex,
  renderUrlset,
  routesForChunk,
} from '../sitemap';
import { getAll, getBySlug } from '@/services/productService';
import { siteConfig } from '@/config/site';

/**
 * These tests encode Google's sitemap requirements, so a future change cannot
 * silently ship an invalid sitemap:
 * https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
 */

const MAX_URLS_PER_FILE = 50_000;
const HOST = siteConfig.url;

const chunks = generateSitemaps();
const allEntries = chunks.flatMap(({ id }) => routesForChunk(id));

describe('sitemap structure', () => {
  it('keeps every chunk under the 50,000 URL limit', () => {
    for (const { id } of chunks) {
      expect(routesForChunk(id).length).toBeLessThanOrEqual(MAX_URLS_PER_FILE);
    }
  });

  it('uses contiguous chunk ids starting at 0', () => {
    expect(chunks.map(({ id }) => id)).toEqual(chunks.map((_, index) => index));
  });

  it('lists every product exactly once', () => {
    const productUrls = allEntries
      .map((entry) => entry.url)
      .filter((url) => url.includes('/products/'));

    expect(productUrls.length).toBe(getAll().length);
    expect(new Set(productUrls).size).toBe(productUrls.length);
  });

  it('uses absolute, same-host, unique URLs with no characters that need escaping', () => {
    const seen = new Set<string>();

    for (const { url } of allEntries) {
      expect(url === HOST || url.startsWith(`${HOST}/`)).toBe(true);
      expect(url).not.toMatch(/[\s<>&"']/);
      expect(seen.has(url)).toBe(false);
      seen.add(url);
    }
  });

  it('uses absolute image URLs on the same host', () => {
    for (const entry of allEntries) {
      for (const image of entry.images ?? []) {
        expect(image).toMatch(new RegExp(`^${HOST}/`));
      }
    }
  });

  it('resolves every canonical product URL back to the same product', () => {
    for (const product of getAll()) {
      expect(getBySlug(product.slug)?.slug).toBe(product.slug);
    }
  });
});

describe('sitemap XML rendering', () => {
  it('renders an index containing only sitemap entries', () => {
    const xml = renderSitemapIndex(
      chunks.map(({ id }) => id),
      '2026-01-01T00:00:00.000Z'
    );
    const doc = new DOMParser().parseFromString(xml, 'application/xml');

    expect(doc.querySelector('parsererror')).toBeNull();
    expect(doc.documentElement.nodeName).toBe('sitemapindex');
    expect(doc.getElementsByTagName('sitemap').length).toBe(chunks.length);
    expect(doc.getElementsByTagName('url').length).toBe(0);
  });

  it('renders a valid urlset for the non-product chunk', () => {
    const xml = renderUrlset(routesForChunk(0));
    const doc = new DOMParser().parseFromString(xml, 'application/xml');

    expect(doc.querySelector('parsererror')).toBeNull();
    expect(doc.documentElement.nodeName).toBe('urlset');
    expect(doc.getElementsByTagName('url').length).toBeGreaterThan(0);
  });

  it('escapes XML entities instead of emitting broken markup', () => {
    const xml = renderUrlset([
      { url: `${HOST}/products/a&b`, lastModified: new Date(0) },
    ]);
    const doc = new DOMParser().parseFromString(xml, 'application/xml');

    expect(xml).toContain('a&amp;b');
    expect(doc.querySelector('parsererror')).toBeNull();
  });
});
