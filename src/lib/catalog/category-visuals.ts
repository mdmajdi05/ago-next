import { getCategoryImage } from './images';

/**
 * Imagery used by the category explorer cards and tiles.
 *
 * These are UI illustrations supplied with the approved category-page concept,
 * not product photography. They are only rendered in listing cards; structured
 * data keeps using `getCategoryImage()`.
 */

/** Part-type tile illustrations, keyed by type slug. */
const TYPE_IMAGES: Record<string, string> = {
  'all-turbine-parts': '/images/categories/all-turbine-parts.webp',
  'gas-turbine-components': '/images/categories/gas-turbine.webp',
  'engine-assemblies': '/images/categories/engine-assembly.webp',
  bearings: '/images/categories/bearings.webp',
  'fasteners-hardware': '/images/categories/fasteners.webp',
  general: '/images/categories/general-parts.webp',
};

/**
 * Part-type illustrations that also make sense on an individual part card.
 * The generic "general parts" drawing is intentionally excluded: it would be
 * repeated on thousands of unrelated part numbers, so those cards get a
 * neutral placeholder instead.
 */
const TYPE_CARD_IMAGES: Record<string, string> = {
  'gas-turbine-components': '/images/categories/gas-turbine.webp',
  'engine-assemblies': '/images/categories/engine-assembly.webp',
  bearings: '/images/categories/bearings.webp',
  'fasteners-hardware': '/images/categories/fasteners.webp',
};

/** Illustrations supplied with the concept for the featured part numbers. */
const PART_IMAGES: Record<string, string> = {
  G61B06: '/images/products/g61b06.webp',
  'LIST-1': '/images/products/list-1.webp',
  'GE-GAS-TURBINE-SPARE-PART-WS': '/images/products/ge-gas-turbine.webp',
  INDUSTRIAL: '/images/products/industrial-turbine.webp',
  LM2500: '/images/products/lm2500.webp',
  '114A7073P006': '/images/products/self-locking-nut.webp',
  '354A1513P131': '/images/products/spark-plug.webp',
  C6434D0Z5: '/images/products/spring-cylinder.webp',
};

export function getTypeTileImage(typeSlug?: string): string | undefined {
  return typeSlug ? TYPE_IMAGES[typeSlug] : undefined;
}

/**
 * Card image for a catalogue part, or `undefined` when the concept has no
 * illustration for it (the card then renders a neutral placeholder).
 */
export function getPartCardImage(
  partNumber: string,
  typeSlug: string
): string | undefined {
  const key = partNumber.trim().toUpperCase();
  return PART_IMAGES[key] || TYPE_CARD_IMAGES[typeSlug];
}

/** Category photograph, still used for social previews and structured data. */
export { getCategoryImage };
