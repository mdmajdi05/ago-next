import fs from 'node:fs';
import path from 'node:path';

/**
 * Imported legacy catalogue rows.
 *
 * The file is intentionally read from disk at runtime instead of being
 * imported as a JS module. A static `import` pulls the 19 MB JSON into every
 * server chunk that touches `productService`, which bloats the webpack cache
 * and slows the build down dramatically. Reading it once and caching the
 * parsed value keeps the bundle small while still giving build-time code
 * (sitemaps, `generateStaticParams`) the full dataset.
 */
export interface LegacyRawProduct {
  name: string;
  title: string;
  part: string;
  brand: string;
  category: string;
  url: string;
  keywords?: string;
  description?: string;
  image?: string;
  specifications?: Record<string, string>;
}

const CATALOG_PATH = 'src/data/static/products/legacy-catalog.json';

let cached: LegacyRawProduct[] | null = null;

export function getLegacyCatalog(): LegacyRawProduct[] {
  if (cached) return cached;

  const absolute = path.join(process.cwd(), CATALOG_PATH);
  const parsed = JSON.parse(fs.readFileSync(absolute, 'utf8'));

  if (!Array.isArray(parsed)) {
    throw new Error(`Legacy catalogue at ${absolute} did not contain an array`);
  }

  cached = parsed as LegacyRawProduct[];
  return cached;
}
