import type { Product } from '@/types/product';

/**
 * Deterministic, per-product copy generation.
 *
 * The source catalogue has no free-text descriptions, so every product page
 * would otherwise share the same template sentence. These helpers combine the
 * part number, brand, type and category with category-specific technical
 * context and a small set of phrasing variants. The result is unique per page
 * without inventing specifications or prices.
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
    ],
    inspection: [
      'Dimensional and visual checks against the drawing, sample or OEM reference',
      'Material, coating and hardness verification where the specification requires it',
      'Photographic condition record and documentation review before dispatch',
    ],
  },
  'compressor-parts': {
    intro:
      'Compressor and pump components set the pressure and flow available to the rest of the plant, so wear, fouling and seal leakage quickly show up as lost efficiency.',
    applications: [
      'Compressor overhauls, rotor and impeller replacement and casing repairs',
      'Pump refurbishment, seal replacement and flow restoration',
      'Efficiency recovery and reliability programmes on rotating equipment',
    ],
    inspection: [
      'Dimensional checks on fits, clearances and mounting interfaces',
      'Runout, balance and surface condition assessment where applicable',
      'Documentation and traceability review before shipment',
    ],
  },
  'valves-actuators': {
    intro:
      'Valves and actuators control fuel, air, steam and process flow, so seat tightness, travel and actuation response are the parameters that matter most.',
    applications: [
      'Fuel gas, air, steam and process isolation and control duties',
      'Actuator, positioner and solenoid replacement on existing valve bodies',
      'Shutdown, turnaround and flow-control upgrade projects',
    ],
    inspection: [
      'Pressure and leak testing where the specification requires it',
      'Travel, stroke and actuation checks against the datasheet',
      'Seat, trim and body condition assessment before dispatch',
    ],
  },
  'automation-controls': {
    intro:
      'Automation and control hardware carries the trip, protection and sequencing logic for the plant, so revision compatibility and firmware context matter as much as the part number.',
    applications: [
      'Control system upgrades, card replacement and obsolescence programmes',
      'Turbine control, protection and sequencing retrofits',
      'Legacy PLC, relay and drive replacement where the original is discontinued',
    ],
    inspection: [
      'Configuration and revision checks against the existing system',
      'Functional and communication checks where test equipment is available',
      'Documentation review and firmware/configuration notes before dispatch',
    ],
  },
  instrumentation: {
    intro:
      'Instrumentation provides the measurements that protect the machine and prove its performance, so range, signal type and calibration context must match the installation.',
    applications: [
      'Condition monitoring, vibration and proximity measurement systems',
      'Pressure, temperature, flow and gas analysis measurement points',
      'Control loop upgrades and obsolescence replacement projects',
    ],
    inspection: [
      'Range, signal and interface checks against the datasheet',
      'Calibration or functional verification where the specification requires it',
      'Accessory and documentation review before shipment',
    ],
  },
  'electrical-motors': {
    intro:
      'Electrical motors and power components keep auxiliaries, pumps and compressors running, so frame size, mounting, enclosure and electrical characteristics all need to match.',
    applications: [
      'Auxiliary pump, fan and compressor drive replacement',
      'Motor refurbishment, rewind and bearing replacement programmes',
      'Breaker, contactor and protection upgrade projects',
    ],
    inspection: [
      'Frame, mounting and shaft dimension checks against the datasheet',
      'Insulation and winding checks where test facilities are available',
      'Nameplate, rating and documentation review before dispatch',
    ],
  },
  'mechanical-transmission-bearings': {
    intro:
      'Mechanical transmission and bearing components carry load and control alignment, so fits, clearances and lubrication condition determine service life.',
    applications: [
      'Gearbox, coupling and bearing replacement during overhauls',
      'Alignment correction and vibration-reduction programmes',
      'Load-path and transmission reliability improvements',
    ],
    inspection: [
      'Bore, shaft and mounting dimension checks',
      'Surface, clearance and fit assessment against the drawing',
      'Traceability and documentation review before shipment',
    ],
  },
  'seals-filters': {
    intro:
      'Seals, gaskets and filter elements protect the machine from leakage and contamination, making material compatibility and dimensional fit the critical checks.',
    applications: [
      'Routine maintenance, filter changes and leak repairs',
      'Seal replacement during overhauls and shutdowns',
      'Contamination control and lubrication system upgrades',
    ],
    inspection: [
      'Dimensional and material checks against the sample or drawing',
      'Temperature, pressure and media compatibility review',
      'Batch, certificate and packaging verification before dispatch',
    ],
  },
  'piping-fittings': {
    intro:
      'Piping and fittings must match the tube, thread and pressure class of the existing system, so material grade and connection geometry are the primary checks.',
    applications: [
      'Instrument air, fuel gas, lube oil and utility piping work',
      'Tube, union and fitting replacement during maintenance',
      'Small-bore piping upgrades and leak repairs',
    ],
    inspection: [
      'Thread, tube and connection dimension checks',
      'Material grade and pressure-class verification',
      'Documentation and packaging review before shipment',
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
  ],
  inspection: [
    'Dimensional and visual checks against the drawing or sample',
    'Condition and material assessment where the specification requires it',
    'Documentation review before dispatch',
  ],
};

const OPENERS = [
  (brand: string, part: string, type: string, category: string) =>
    `${brand} ${part} is a ${type.toLowerCase()} in the ${category.toLowerCase()} range supplied by AGO Aviation.`,
  (brand: string, part: string, type: string, category: string) =>
    `AGO Aviation supplies the ${brand} ${part}, a ${type.toLowerCase()} used across ${category.toLowerCase()} applications.`,
  (brand: string, part: string, type: string, category: string) =>
    `The ${brand} ${part} is catalogued by AGO Aviation as a ${type.toLowerCase()} within the ${category.toLowerCase()} group.`,
];

const CLOSERS = [
  (brand: string, part: string) =>
    `Before quotation we confirm the exact ${brand} ${part} configuration, available condition and required documentation, and we can cross-reference superseded or obsolete references where records allow.`,
  (brand: string, part: string) =>
    `Every enquiry is checked against the ${brand} ${part} part number, the installed configuration and the documentation you require, so the offer matches the unit rather than a similar-looking catalogue row.`,
  (brand: string, part: string) =>
    `Send the ${brand} ${part} reference, quantity and destination and our team will confirm availability, condition options and lead time, including cross-reference support for legacy numbers.`,
];

function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  }
  return h;
}

export interface ProductContent {
  overview: string[];
  applications: string[];
  inspection: string[];
  metaDescription: string;
}

export function buildProductContent(product: Product): ProductContent {
  const context = CATEGORY_CONTEXT[product.categorySlug] || GENERIC_CONTEXT;
  const variant = hash(`${product.partNumber}-${product.brand}`) % OPENERS.length;
  const catalogueTitle = product.displayTitle;

  const opener = OPENERS[variant](
    product.brand,
    product.partNumber,
    product.type,
    product.category
  );

  const overview = [
    `${opener} ${context.intro}`,
    `This catalogue entry is recorded as "${catalogueTitle}". ${CLOSERS[variant](
      product.brand,
      product.partNumber
    )}`,
  ];

  const applications = [
    ...context.applications,
    `Existing ${product.brand} installations requiring a ${product.type.toLowerCase()}`,
  ];

  const metaDescription = `Request a quote for ${product.brand} ${product.partNumber} (${catalogueTitle}), a ${product.type.toLowerCase()} in our ${product.category} range. AGO Aviation verifies configuration, condition and documentation for worldwide supply.`;

  return {
    overview,
    applications,
    inspection: context.inspection,
    metaDescription,
  };
}
