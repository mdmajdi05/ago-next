/**
 * Catalog normalization helpers.
 *
 * Single place where part numbers, slugs and legacy URLs are cleaned so every
 * page, sitemap entry and internal link uses the same canonical value.
 */

/** Uppercase, trim and collapse whitespace. Keeps `/` and `.` for display. */
export function normalizePartNumber(value: string): string {
  return (value || '').trim().replace(/\s+/g, ' ').toUpperCase();
}

/** URL-safe slug from any value (part number, brand, title). */
export function slugifyCatalogValue(value: string): string {
  return (value || '')
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Canonical product slug: `{brand}-{part}`.
 * e.g. GE + G61B06 -> ge-g61b06
 *      Siemens + 1.105.30179.11.000 -> siemens-1-105-30179-11-000
 */
export function buildCanonicalSlug(brand: string, part: string): string {
  return slugifyCatalogValue(`${brand}-${part}`);
}

/** Strips a trailing `.html` and normalizes slashes from a legacy URL. */
export function normalizeLegacyUrl(url?: string): string {
  if (!url) return '';
  return url
    .trim()
    .replace(/\.html$/i, '')
    .replace(/^\/+/, '')
    .replace(/\/+/g, '-');
}
