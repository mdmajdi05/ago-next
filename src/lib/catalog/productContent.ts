import type { Product } from '@/types/product';

/**
 * Deterministic, per-product copy generation.
 *
 * The source catalogue contains real but short records: a component label, an
 * OEM one-liner, or a dense technical string with dimensions, materials and
 * reference numbers. This module preserves those facts, extracts whatever
 * attributes are genuinely present, and combines them with category context
 * and a large set of phrasing variants.
 *
 * Nothing here invents specifications, prices, fitment or availability. When a
 * record has no technical data, the copy says so instead of pretending.
 */

interface CategoryContext {
  intro: string;
  applications: string[];
  inspection: string[];
}

const CATEGORY_CONTEXT: Record<string, CategoryContext> = {
  'turbine-parts': {
    intro:
      'Turbine parts operate in the hot gas path and rotating section, where thermal cycling, oxidation and tip-clearance loss drive most replacement decisions.',
    applications: [
      'Combustion inspections, hot gas path overhauls and turbine module repairs',
      'Blade, nozzle, shroud and transition piece replacement programmes',
      'Performance recovery, clearance restoration and outage spares planning',
      'Rotor, casing and stationary component refurbishment',
      'Outage kitting and long-lead spares provisioning',
    ],
    inspection: [
      'Dimensional and visual checks against the drawing, sample or OEM reference',
      'Material, coating and hardness verification where the specification requires it',
      'Photographic condition record and documentation review before dispatch',
      'Serial and batch traceability review against the purchase record',
      'Packaging and preservation checks for long-distance shipment',
    ],
  },
  'compressor-parts': {
    intro:
      'Compressor and pump components set the pressure and flow available to the rest of the plant, so wear, fouling and seal leakage quickly show up as lost efficiency.',
    applications: [
      'Compressor overhauls, rotor and impeller replacement and casing repairs',
      'Pump refurbishment, seal replacement and flow restoration',
      'Efficiency recovery and reliability programmes on rotating equipment',
      'Air inlet, filtration and intercooler maintenance',
      'Lube oil and sealing system upgrades',
    ],
    inspection: [
      'Dimensional checks on fits, clearances and mounting interfaces',
      'Runout, balance and surface condition assessment where applicable',
      'Documentation and traceability review before shipment',
      'Impeller, diffuser and volute condition assessment',
      'Bearing, seal and coupling interface verification',
    ],
  },
  'valves-actuators': {
    intro:
      'Valves and actuators control fuel, air, steam and process flow, so seat tightness, travel and actuation response are the parameters that matter most.',
    applications: [
      'Fuel gas, air, steam and process isolation and control duties',
      'Actuator, positioner and solenoid replacement on existing valve bodies',
      'Shutdown, turnaround and flow-control upgrade projects',
      'Pressure-reducing and safety-relief station maintenance',
      'Control loop refurbishment and obsolescence replacement',
    ],
    inspection: [
      'Pressure and leak testing where the specification requires it',
      'Travel, stroke and actuation checks against the datasheet',
      'Seat, trim and body condition assessment before dispatch',
      'Spring range, diaphragm and packing condition review',
      'Mounting, flange and connection dimension verification',
    ],
  },
  'automation-controls': {
    intro:
      'Automation and control hardware carries the trip, protection and sequencing logic for the plant, so revision compatibility and firmware context matter as much as the part number.',
    applications: [
      'Control system upgrades, card replacement and obsolescence programmes',
      'Turbine control, protection and sequencing retrofits',
      'Legacy PLC, relay and drive replacement where the original is discontinued',
      'I/O, communication and historian integration projects',
      'Cyber-hardening and lifecycle extension programmes',
    ],
    inspection: [
      'Configuration and revision checks against the existing system',
      'Functional and communication checks where test equipment is available',
      'Documentation review and firmware/configuration notes before dispatch',
      'Module, rack and terminal compatibility verification',
      'Packing, ESD protection and shipping documentation review',
    ],
  },
  instrumentation: {
    intro:
      'Instrumentation provides the measurements that protect the machine and prove its performance, so range, signal type and calibration context must match the installation.',
    applications: [
      'Condition monitoring, vibration and proximity measurement systems',
      'Pressure, temperature, flow and gas analysis measurement points',
      'Control loop upgrades and obsolescence replacement projects',
      'Protection system testing and sensor replacement',
      'Calibration, verification and traceability programmes',
    ],
    inspection: [
      'Range, signal and interface checks against the datasheet',
      'Calibration or functional verification where the specification requires it',
      'Accessory and documentation review before shipment',
      'Probe, cable and connector condition assessment',
      'Certification and calibration record review',
    ],
  },
  'electrical-motors': {
    intro:
      'Electrical motors and power components keep auxiliaries, pumps and compressors running, so frame size, mounting, enclosure and electrical characteristics all need to match.',
    applications: [
      'Auxiliary pump, fan and compressor drive replacement',
      'Motor refurbishment, rewind and bearing replacement programmes',
      'Breaker, contactor and protection upgrade projects',
      'Variable-speed drive and starter replacement',
      'Switchgear, relay and power distribution maintenance',
    ],
    inspection: [
      'Frame, mounting and shaft dimension checks against the datasheet',
      'Insulation and winding checks where test facilities are available',
      'Nameplate, rating and documentation review before dispatch',
      'Terminal box, cooling and enclosure condition assessment',
      'Electrical test records and traceability review',
    ],
  },
  'mechanical-transmission-bearings': {
    intro:
      'Mechanical transmission and bearing components carry load and control alignment, so fits, clearances and lubrication condition determine service life.',
    applications: [
      'Gearbox, coupling and bearing replacement during overhauls',
      'Alignment correction and vibration-reduction programmes',
      'Load-path and transmission reliability improvements',
      'Shaft, hub and coupling refurbishment',
      'Preventive maintenance and spares stocking',
    ],
    inspection: [
      'Bore, shaft and mounting dimension checks',
      'Surface, clearance and fit assessment against the drawing',
      'Traceability and documentation review before shipment',
      'Lubrication and sealing arrangement verification',
      'Runout and balance checks where applicable',
    ],
  },
  'seals-filters': {
    intro:
      'Seals, gaskets and filter elements protect the machine from leakage and contamination, making material compatibility and dimensional fit the critical checks.',
    applications: [
      'Routine maintenance, filter changes and leak repairs',
      'Seal replacement during overhauls and shutdowns',
      'Contamination control and lubrication system upgrades',
      'Air intake, fuel and lube oil filtration',
      'Gasket, packing and O-ring replacement programmes',
    ],
    inspection: [
      'Dimensional and material checks against the sample or drawing',
      'Temperature, pressure and media compatibility review',
      'Batch, certificate and packaging verification before dispatch',
      'Sealing surface and lip condition assessment',
      'Filter rating and media construction verification',
    ],
  },
  'piping-fittings': {
    intro:
      'Piping and fittings must match the tube, thread and pressure class of the existing system, so material grade and connection geometry are the primary checks.',
    applications: [
      'Instrument air, fuel gas, lube oil and utility piping work',
      'Tube, union and fitting replacement during maintenance',
      'Small-bore piping upgrades and leak repairs',
      'Sampling, purge and analysis line construction',
      'High-pressure and high-temperature piping maintenance',
    ],
    inspection: [
      'Thread, tube and connection dimension checks',
      'Material grade and pressure-class verification',
      'Documentation and packaging review before shipment',
      'Surface finish and thread condition assessment',
      'Heat-number and certificate review where available',
    ],
  },
};

const GENERIC_CONTEXT: CategoryContext = {
  intro:
    'The part is used in gas turbine and industrial plant systems where dimensional fit, material condition and documented traceability determine reliable service.',
  applications: [
    'Routine maintenance, overhauls and breakdown replacement',
    'Obsolescence and legacy part replacement programmes',
    'Reliability and performance improvement projects',
    'Outage planning and spares provisioning',
    'Like-for-like replacement of discontinued references',
  ],
  inspection: [
    'Dimensional and visual checks against the drawing or sample',
    'Condition and material assessment where the specification requires it',
    'Documentation review before dispatch',
    'Packaging and preservation checks',
    'Traceability review against the purchase record',
  ],
};

/** A factual technical detail extracted from the source record. */
export interface ProductAttribute {
  label: string;
  value: string;
}

export interface ProductContent {
  overview: string[];
  applications: string[];
  inspection: string[];
  metaDescription: string;
  attributes: ProductAttribute[];
  /** Short component label from the original catalogue record, if present. */
  recordLabel?: string;
  /** Longer original description, preserved verbatim (whitespace-normalised). */
  recordDescription?: string;
  /** Factual note about the shape of the part number. */
  partProfile: string;
}

function hash(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pickIndex(seed: string, length: number): number {
  return hash(seed) % length;
}

function rotate<T>(items: T[], seed: string, count: number): T[] {
  if (items.length === 0) return [];
  const start = pickIndex(seed, items.length);
  const result: T[] = [];
  for (let i = 0; i < Math.min(count, items.length); i += 1) {
    result.push(items[(start + i) % items.length]);
  }
  return result;
}

function normalise(value: string): string {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanValue(value: string, max = 90): string {
  const text = normalise(value)
    .replace(
      /^(?:STANDARD|SPECIFICATION|SPEC|MATERIAL|MATL|SIZE|MODEL|MOD|APPLICATION|MAKE|MANUFACTURER|MANUFACTURE|QTY|DWG|DRAWING)\s*[:#/]\s*/i,
      ''
    )
    .replace(/^[\s:;#/|,.-]+/, '')
    .replace(/[\s;|,.-]+$/, '');

  if (!text) return '';
  if (text.length <= max) return text;

  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : max).trim()}…`;
}

/**
 * Taxonomy type names are mostly plural ("Filters & Elements", "Control
 * Valves"). Use a range phrase so the copy never says "a filters & elements".
 */
function typePhrase(type: string): string {
  const value = type.trim().toLowerCase();
  if (!value) return 'the catalogue range';
  return `the ${value} range`;
}

function firstMatch(source: string, patterns: RegExp[]): string {
  for (const pattern of patterns) {
    const match = pattern.exec(source);
    if (match && match[1]) {
      const value = cleanValue(match[1]);
      if (value) return value;
    }
  }
  return '';
}

const DIMENSION_PATTERN =
  /\b\d+(?:[.,]\d+)?\s*(?:MM|CM|IN|INCH|")?\s*[X×]\s*\d+(?:[.,]\d+)?\s*(?:MM|CM|IN|INCH|")?(?:\s*[X×]\s*\d+(?:[.,]\d+)?\s*(?:MM|CM|IN|INCH|")?)?/i;

const FIELD_PATTERNS: Array<{
  label: string;
  patterns: RegExp[];
  max?: number;
}> = [
  {
    label: 'Size',
    patterns: [/\bSIZE\s*[:#]?\s*([^;|]{2,50})/i],
    max: 50,
  },
  {
    label: 'Material',
    patterns: [/\b(?:MATERIAL|MATL)\s*[:#]?\s*([^;|]{2,70})/i],
    max: 70,
  },
  {
    label: 'Model',
    patterns: [/\b(?:MODEL|MOD\.?)\s*[:#]?\s*([A-Z0-9][A-Z0-9./() -]{1,40})/i],
    max: 40,
  },
  {
    label: 'Specification',
    patterns: [
      /\b(?:STANDARD|SPECIFICATION|SPEC)\s*[:#/]?\s*([^;|]{2,80})/i,
    ],
    max: 80,
  },
  {
    label: 'Application',
    patterns: [/\bAPPLICATION\s*[:#]?\s*([^;|]{2,90})/i],
    max: 90,
  },
  {
    label: 'Make',
    patterns: [/\b(?:MAKE|MANUFACTURER|MANUFACTURE)\s*[:#/]?\s*([^;|]{2,60})/i],
    max: 60,
  },
  {
    label: 'Drawing',
    patterns: [/\b(?:DWG|DRAWING)\s*[:#]?\s*([A-Z0-9][A-Z0-9./ -]{1,40})/i],
    max: 40,
  },
  {
    label: 'Quantity',
    patterns: [/\bQTY\s*[:=#]?\s*(\d{1,6})/i],
    max: 12,
  },
  {
    label: 'Rating',
    patterns: [/\b(\d[\d.,/]*\s*(?:V(?:DC|AC)?|AMPS?|A|HP|KW|PSI|BAR|RPM|HZ|°C|°F))\b/i],
    max: 40,
  },
  {
    label: 'Weight',
    patterns: [/\b(\d+(?:\.\d+)?\s*(?:KG|LBS?|LB))\b/i],
    max: 20,
  },
];

function extractAttributes(product: Product): ProductAttribute[] {
  const source = normalise(
    `${product.title} ; ${product.keywords || ''}`
  );

  const attributes: ProductAttribute[] = [];
  const seen = new Set<string>();

  const push = (label: string, value: string) => {
    const clean = cleanValue(value);
    if (!clean || clean.length < 2) return;
    const key = clean.toLowerCase();
    if (seen.has(key)) return;
    if (key === product.partNumber.toLowerCase()) return;
    if (/spare part|request a quote|ago aviation/i.test(clean)) return;
    seen.add(key);
    attributes.push({ label, value: clean });
  };

  const dimension = DIMENSION_PATTERN.exec(source);
  if (dimension) push('Dimensions', dimension[0]);

  for (const field of FIELD_PATTERNS) {
    if (attributes.length >= 7) break;
    const value = firstMatch(source, field.patterns);
    if (!value) continue;
    if (field.label === 'Size' && dimension && value.includes(dimension[0])) continue;
    push(field.label, value);
  }

  const reference = firstMatch(source, [
    /\b(?:P\/?N|PART\s*(?:NO\.?|NUMBER)|REF(?:ERENCE)?)\s*[:#]?\s*([A-Z0-9][A-Z0-9./-]{2,})/i,
  ]);
  if (reference && reference.toUpperCase() !== product.partNumber.toUpperCase()) {
    push('Cross-reference', reference);
  }

  return attributes.slice(0, 7);
}

function partProfile(partNumber: string): string {
  const value = partNumber.trim();
  const numeric = /^\d+$/.test(value);
  const alphanumeric = /^[A-Z0-9-]+$/i.test(value);
  const groups = value.split('-').filter(Boolean).length;

  const shape = numeric
    ? 'an all-numeric reference'
    : alphanumeric
      ? 'an alphanumeric reference'
      : 'a mixed-format reference';

  const grouping =
    groups > 1 ? ` arranged in ${groups} hyphen-separated groups` : '';

  return `${value} is ${shape} of ${value.length} characters${grouping}.`;
}

const OPENERS: Array<
  (brand: string, part: string, type: string, label?: string) => string
> = [
  (brand, part, type, label) =>
    `${brand} ${part} is listed by AGO Aviation under ${typePhrase(type)}${label ? `, with the component description “${label}”` : ''}.`,
  (brand, part, type, label) =>
    `AGO Aviation catalogues the ${brand} ${part} under ${typePhrase(type)}${label ? `, recorded as “${label}”` : ''}.`,
  (brand, part, type, label) =>
    `The ${brand} ${part} appears in the AGO Aviation catalogue under ${typePhrase(type)}${label ? `, with the source record reading “${label}”` : ''}.`,
  (brand, part, type, label) =>
    `Part number ${part} from ${brand} sits under ${typePhrase(type)}${label ? ` and is described in the source record as “${label}”` : ''}.`,
  (brand, part, type, label) =>
    `This page covers the ${brand} ${part}, catalogued under ${typePhrase(type)}${label ? ` with the note “${label}”` : ''}, and supplied on quotation by AGO Aviation.`,
  (brand, part, type, label) =>
    `${brand} ${part} is held in the AGO Aviation sourcing catalogue under ${typePhrase(type)}${label ? ` with the component label “${label}”` : ''}.`,
  (brand, part, type, label) =>
    `AGO Aviation lists ${brand} ${part} under ${typePhrase(type)}${label ? `, originally recorded as “${label}”` : ''}, for industrial and gas turbine applications.`,
  (brand, part, type, label) =>
    `The reference ${part} from ${brand} belongs to ${typePhrase(type)}${label ? ` and is listed in our records as “${label}”` : ''}.`,
  (brand, part, type, label) =>
    `${brand} ${part} is recorded under ${typePhrase(type)} in the AGO Aviation catalogue${label ? `; the source description is “${label}”` : ''}.`,
  (brand, part, type, label) =>
    `Catalogued by AGO Aviation, ${brand} ${part} sits under ${typePhrase(type)}${label ? ` under the label “${label}”` : ''}.`,
  (brand, part, type, label) =>
    `${brand} ${part} is part of ${typePhrase(type)}${label ? ` under the label “${label}”` : ''} and is quoted against the exact part number.`,
  (brand, part, type, label) =>
    `The ${brand} ${part} record falls under ${typePhrase(type)}${label ? ` with the note “${label}”` : ''}, available through AGO Aviation on request.`,
];

const RECORD_LEADS: Array<(brand: string, part: string) => string> = [
  (brand, part) =>
    `The catalogue record for ${part} preserves the wording supplied with the ${brand} reference rather than replacing it with generic marketing text.`,
  (brand, part) =>
    `Everything shown for ${part} is taken from the ${brand} catalogue row; no dimensions, materials or ratings have been added by AGO Aviation.`,
  (brand, part) =>
    `The source entry for ${part} is kept intact below so engineers can compare it with the drawing, nameplate or removal record.`,
  (brand, part) =>
    `This ${brand} entry is short in the source data, which is normal for legacy turbine catalogues; the part number remains the primary identifier.`,
  (brand, part) =>
    `For ${part}, the original catalogue text is the authoritative description available to us, and it is reproduced without embellishment.`,
  (brand, part) =>
    `The ${brand} record is intentionally factual: it tells you what the catalogue states and leaves fitment confirmation to the quotation stage.`,
];

const EMPTY_RECORD_NOTES: Array<(type: string, part: string) => string> = [
  (type, part) =>
    `No dimensional, material or rating data is held for ${part} beyond the component type, so the configuration is confirmed against the installed unit before an offer is made.`,
  (type, part) =>
    `The source row for ${part} does not include a technical specification. Our team therefore verifies the item by part number, nameplate or sample before quoting.`,
  (type, part) =>
    `${part} is recorded by part number and component type only. Where a drawing or datasheet exists, it is requested from the manufacturer or matched against your removal record.`,
  (type, part) =>
    `Because the legacy catalogue carries no additional data for ${part}, the enquiry is checked against the existing item rather than assumed from a similar-looking listing.`,
  (type, part) =>
    `The item is listed without a published specification for ${part}; condition, configuration and documentation are therefore confirmed case by case.`,
  (type, part) =>
    `Only the part number and component class are available for ${part}. That is enough to start a trace, but not enough to promise a fit without verification.`,
];

const CONTEXT_LEADS: Array<(type: string) => string> = [
  (type) =>
    `In service, components in ${typePhrase(type)} are selected by interface dimensions, operating environment and the documentation the plant requires, not by appearance alone.`,
  (type) =>
    `Replacement decisions in ${typePhrase(type)} usually start with the installed reference, the overhaul scope and the lead time available before the next outage.`,
  (type) =>
    `The useful comparison for a part in ${typePhrase(type)} is the original specification: mounting, connections, material and any certification called for by the plant.`,
  (type) =>
    `Because this part belongs to ${typePhrase(type)}, the quotation is built around the exact reference, the required condition and the paperwork needed for acceptance.`,
  (type) =>
    `A part in ${typePhrase(type)} that looks similar can still differ at the interface, so the part number and source record are checked before anything is offered.`,
  (type) =>
    `Legacy references in ${typePhrase(type)} often pass through several supersessions; the original number is the anchor for tracing the correct replacement.`,
];

const CLOSERS: Array<(brand: string, part: string) => string> = [
  (brand, part) =>
    `Send the ${brand} ${part} reference, quantity and destination to AGO Aviation and the team will confirm availability, condition options and lead time.`,
  (brand, part) =>
    `For a quotation on ${brand} ${part}, include the quantity, required condition and any documentation or certification your plant needs.`,
  (brand, part) =>
    `Quote ${part} in your enquiry so the ${brand} configuration, condition and paperwork can be checked before pricing is confirmed.`,
  (brand, part) =>
    `AGO Aviation can cross-reference superseded ${brand} numbers where records allow; start with ${part} and the application details.`,
  (brand, part) =>
    `Availability for ${part} is confirmed on request, together with new, refurbished or as-removed options where those are suitable.`,
  (brand, part) =>
    `To progress ${brand} ${part}, send the part number, quantity, destination and any drawing or nameplate photo you already hold.`,
  (brand, part) =>
    `The next step is a part-number check: send ${part} with the installed configuration and our sourcing team will respond with options.`,
  (brand, part) =>
    `Enquiries for ${brand} ${part} are handled individually, so the offer reflects the unit and the documentation you require.`,
  (brand, part) =>
    `If ${part} has been superseded, include the old and new references and we will trace the ${brand} record as far as the available data allows.`,
  (brand, part) =>
    `Request a quote for ${brand} ${part} with your required delivery window, and the team will confirm what can be committed.`,
  (brand, part) =>
    `Use the enquiry form or email the ${part} reference directly; no online price is shown because condition and documentation change the offer.`,
  (brand, part) =>
    `AGO Aviation supplies worldwide against confirmed part numbers, so include ${part}, the quantity and the destination port or site.`,
];

const META_TEMPLATES: Array<
  (brand: string, part: string, type: string, category: string, detail: string) => string
> = [
  (brand, part, type, category, detail) =>
    `${brand} ${part}: ${type.toLowerCase()} in the ${category} range.${detail} Request a verified quote from AGO Aviation.`,
  (brand, part, type, category, detail) =>
    `Part ${part} from ${brand}, ${type.toLowerCase()}.${detail} AGO Aviation confirms condition, configuration and documentation on quotation.`,
  (brand, part, type, category, detail) =>
    `Looking for ${brand} ${part}?${detail} ${type} listed under ${category}; send your quantity and destination for a quote.`,
  (brand, part, type, category, detail) =>
    `${brand} ${part} ${type.toLowerCase()} record.${detail} Enquire with AGO Aviation for availability, condition options and lead time.`,
  (brand, part, type, category, detail) =>
    `${part} (${brand}) is catalogued as ${type.toLowerCase()}.${detail} Request pricing and documentation from AGO Aviation.`,
  (brand, part, type, category, detail) =>
    `AGO Aviation supplies ${brand} ${part}, ${type.toLowerCase()} for ${category}.${detail} Quote against the exact part number.`,
  (brand, part, type, category, detail) =>
    `${brand} ${part}: ${type.toLowerCase()} reference with source description.${detail} Ask AGO Aviation for availability and condition.`,
  (brand, part, type, category, detail) =>
    `Enquire about ${brand} ${part} (${type.toLowerCase()}).${detail} AGO Aviation handles verification, condition and worldwide delivery.`,
];

function truncateMeta(value: string): string {
  const text = normalise(value);
  if (text.length <= 158) return text;
  const cut = text.slice(0, 155);
  const space = cut.lastIndexOf(' ');
  return `${cut.slice(0, space > 100 ? space : 155).trim()}…`;
}

export function buildProductContent(product: Product): ProductContent {
  const context = CATEGORY_CONTEXT[product.categorySlug] || GENERIC_CONTEXT;
  const seed = `${product.partNumber}|${product.brand}|${product.categorySlug}|${product.typeSlug}`;

  const source = normalise(product.description || '');
  const recordDescription =
    source.length >= 20 ? cleanValue(source, 640) : undefined;
  const firstClause = source.split(/[.;|]/)[0]?.trim() || '';
  const recordLabel =
    firstClause.length >= 3 && firstClause.length <= 90
      ? firstClause
      : source.length >= 3 && source.length <= 90
        ? source
        : undefined;

  const attributes = extractAttributes(product);

  const opener = OPENERS[pickIndex(`${seed}|open`, OPENERS.length)](
    product.brand,
    product.partNumber,
    product.type,
    recordLabel
  );

  const recordLead =
    RECORD_LEADS[pickIndex(`${seed}|lead`, RECORD_LEADS.length)](
      product.brand,
      product.partNumber
    );

  const attributeParagraph =
    attributes.length > 0
      ? `${recordLead} Recorded details: ${attributes
          .map((item) => `${item.label.toLowerCase()} ${item.value}`)
          .join('; ')}.`
      : `${recordLead} ${
          EMPTY_RECORD_NOTES[
            pickIndex(`${seed}|empty`, EMPTY_RECORD_NOTES.length)
          ](product.type, product.partNumber)
        }`;

  const contextParagraph = `${context.intro} ${
    CONTEXT_LEADS[pickIndex(`${seed}|context`, CONTEXT_LEADS.length)](
      product.type
    )
  }`;

  const closer = CLOSERS[pickIndex(`${seed}|close`, CLOSERS.length)](
    product.brand,
    product.partNumber
  );

  const overview = [opener, attributeParagraph, contextParagraph, closer];

  const applications = [
    ...rotate(context.applications, `${seed}|apps`, 3),
    `Existing ${product.brand} installations that reference part number ${product.partNumber}`,
  ];

  const inspection = [
    ...rotate(context.inspection, `${seed}|inspect`, 3),
    `Final part-number and quantity check on ${product.partNumber} before dispatch`,
  ];

  const detail =
    attributes.length > 0
      ? ` Recorded ${attributes[0].label.toLowerCase()}: ${attributes[0].value}.`
      : recordLabel
        ? ` Source record: ${recordLabel}.`
        : '';

  const metaDescription = truncateMeta(
    META_TEMPLATES[pickIndex(`${seed}|meta`, META_TEMPLATES.length)](
      product.brand,
      product.partNumber,
      product.type,
      product.category,
      detail
    )
  );

  return {
    overview,
    applications,
    inspection,
    metaDescription,
    attributes,
    recordLabel,
    recordDescription,
    partProfile: partProfile(product.partNumber),
  };
}
