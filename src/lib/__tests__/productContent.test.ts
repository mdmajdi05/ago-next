import { describe, expect, it } from 'vitest';

import { productService } from '@/services';
import { buildProductContent } from '@/lib/catalog/productContent';

describe('product content engine', () => {
  const products = productService.getAll();

  it('builds a complete, indexable body for every catalogue row', () => {
    expect(products.length).toBeGreaterThan(50_000);

    for (const product of products) {
      const content = buildProductContent(product);

      expect(content.overview).toHaveLength(4);
      expect(content.applications.length).toBeGreaterThanOrEqual(4);
      expect(content.inspection.length).toBeGreaterThanOrEqual(4);
      expect(content.metaDescription.length).toBeGreaterThan(40);
      expect(content.metaDescription.length).toBeLessThanOrEqual(160);
      expect(content.overview[0]).toContain(product.partNumber);
      expect(content.overview[3]).toContain(product.partNumber);
      expect(content.partProfile).toContain(product.partNumber);

      for (const paragraph of content.overview) {
        expect(paragraph.length).toBeGreaterThan(40);
        expect(paragraph).not.toContain('Request a quote for availability');
      }
    }
  });

  it('never emits the old enrichment template', () => {
    for (const product of products) {
      const content = buildProductContent(product);
      const body = [
        ...content.overview,
        ...content.applications,
        ...content.inspection,
      ].join(' ');

      expect(body).not.toMatch(
        /spare part for [^.]+\.\s*Request a quote for availability, condition and lead time/i
      );
    }
  });

  it('keeps meta descriptions unique across the catalogue', () => {
    const seen = new Set<string>();
    let duplicates = 0;

    for (const product of products) {
      const meta = buildProductContent(product).metaDescription;
      if (seen.has(meta)) duplicates += 1;
      seen.add(meta);
    }

    expect(duplicates).toBe(0);
  });

  it('produces varied page bodies rather than one repeated template', () => {
    const skeletons = new Set<string>();

    for (const product of products) {
      const content = buildProductContent(product);
      const skeleton = content.overview
        .join(' ')
        .replaceAll(product.partNumber, '{part}')
        .replaceAll(product.brand, '{brand}')
        .replace(/\s+/g, ' ')
        .trim();
      skeletons.add(skeleton);
    }

    // 12 openers × 6 record leads × 6 context leads × 12 closers, plus the
    // product-specific attributes, should yield hundreds of distinct shapes.
    expect(skeletons.size).toBeGreaterThan(400);
  });

  it('extracts real attributes when the source record contains them', () => {
    const filter = products.find(
      (product) => product.partNumber === '216A4373P0001'
    );

    expect(filter).toBeDefined();

    const content = buildProductContent(filter!);
    const labels = content.attributes.map((attribute) => attribute.label);

    expect(labels).toContain('Dimensions');
    expect(labels).toContain('Material');
    expect(content.attributes.length).toBeGreaterThanOrEqual(3);
    expect(content.recordDescription?.length).toBeGreaterThan(80);
  });
});
