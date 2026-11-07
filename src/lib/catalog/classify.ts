import { DEFAULT_TYPE, TAXONOMY_BY_CATEGORY, TAXONOMY_BY_CATEGORY_NAME, TypeDefinition } from './taxonomy';

/**
 * Part numbers that are actually generic labels rather than real part codes.
 * These pages are kept reachable but marked noindex so they do not dilute the
 * catalogue with thin content.
 */
const GENERIC_PART_VALUES = new Set([
  'list-1',
  'industrial',
  'compressor',
  'parts-ws',
  'turbomar',
  'management',
  'multilin',
  'honeywell',
  'honneywell',
  'governor',
  'woodward',
  'transmitters',
  'circuit-breakers',
  'spares-ws',
  'controls',
  'conveyor',
  'swagelok',
]);

const LISTING_URL_PATTERNS = [
  /-spare-part-list(?:-|$)/,
  /-spare-parts-list/,
  /pump-list/,
  /information-packet/,
];

const LISTING_TITLES = new Set([
  'gas turbine spare part',
  'industrial gas turbine parts',
  'motor product information packet',
]);

/** High-value parts chosen for full content and priority indexing (Tier A). */
export const PRIORITY_PARTS = new Set(
  [
    'G61B06',
    'LM2500',
    '114A7073P006',
    '354A1513P131',
    '112E1675G001',
    'C6434D0Z5',
    '1616543900',
    '1900071032',
    '1.105.30179.11.000',
    'PV212-22-P',
    '100.1/3-S211-9002',
    'RB070S067X1MNN',
    'GM0120PQ1MNN',
    'V18348.10.1.1.3.2.1.1.1.1.0.CF3',
    'A3309120801',
    '943140',
    'SELA36AT0150',
    'IS220PTURH1A',
    'CR306C002ACDT',
    'IC693CPU36',
    '871C-DH10M30-A2',
    '415-P73E',
    'VL3507',
    'PL22-FML-DC24V',
    '3WL91110AD050AA0',
    '27177',
    '159-858-880',
    'SS-600-6-4',
    'SS-600-3',
    'SS-400-1-8',
    '1756-IF8',
    '1769-IF8',
    '369-HI-R-M-0-0-0-E',
    '735-5-5-HI-485',
    'F650BAB10HI',
    'MMII-PD-1-2-240',
    '3300 XL',
    '3500/53',
    '1900/65A',
    'AT868',
    'GM868',
    'GX868',
    'ACS800',
    'ACS880',
    'M2CA355LA',
    'H3SH13-A',
    'H3RV8',
    'H2NV105B',
    '3196MT',
  ].map((part) => part.toUpperCase())
);

export interface ClassificationInput {
  title: string;
  part: string;
  brand: string;
  category: string;
  categorySlug: string;
  url: string;
  keywords?: string;
  description?: string;
  image?: string;
}

export interface ClassificationResult {
  type: TypeDefinition;
  entityType: 'part' | 'family' | 'listing';
  tier: 'A' | 'B' | 'C';
  indexable: boolean;
  qualityScore: number;
}

function matchesAny(haystack: string, keywords: string[]): boolean {
  return keywords.some((keyword) => haystack.includes(keyword));
}

/** Picks the first matching subcategory for a product. */
export function classifyType(input: ClassificationInput): TypeDefinition {
  const taxonomy =
    TAXONOMY_BY_CATEGORY.get(input.categorySlug) ||
    TAXONOMY_BY_CATEGORY_NAME.get(input.category.toLowerCase());

  if (!taxonomy) return DEFAULT_TYPE;

  const haystack = [input.title, input.part, input.keywords || '']
    .join(' ')
    .toLowerCase();

  for (const type of taxonomy.types) {
    if (matchesAny(haystack, type.keywords)) {
      return type;
    }
  }

  return DEFAULT_TYPE;
}

function isListing(input: ClassificationInput): boolean {
  const url = (input.url || '').toLowerCase();
  const title = (input.title || '').trim().toLowerCase();

  if (LISTING_URL_PATTERNS.some((pattern) => pattern.test(url))) return true;
  if (LISTING_TITLES.has(title)) return true;

  return false;
}

function isGenericFamily(input: ClassificationInput): boolean {
  const part = (input.part || '').trim().toLowerCase();
  return GENERIC_PART_VALUES.has(part);
}

/**
 * Computes entity type, quality score, tier and indexability.
 * `duplicateTitle` is supplied by the catalogue service.
 */
export function classifyProduct(
  input: ClassificationInput,
  duplicateTitle: boolean
): ClassificationResult {
  const type = classifyType(input);

  const entityType = isListing(input)
    ? 'listing'
    : isGenericFamily(input)
      ? 'family'
      : 'part';

  const partNumber = (input.part || '').toUpperCase();
  const title = (input.title || '').trim();

  let qualityScore = 0;
  if (/\d/.test(partNumber)) qualityScore += 30;
  if (partNumber.length >= 4) qualityScore += 10;
  if (title.length >= 8) qualityScore += 10;
  if (!duplicateTitle) qualityScore += 15;
  if (input.brand) qualityScore += 10;
  if (input.category) qualityScore += 10;
  if (input.description) qualityScore += 10;
  if (input.image) qualityScore += 5;

  const indexable = entityType === 'part';
  const tier = !indexable
    ? 'C'
    : PRIORITY_PARTS.has(partNumber)
      ? 'A'
      : 'B';

  return {
    type,
    entityType,
    tier,
    indexable,
    qualityScore: Math.min(100, qualityScore),
  };
}
