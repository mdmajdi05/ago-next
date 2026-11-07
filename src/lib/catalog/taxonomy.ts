/**
 * Product taxonomy: category -> types (subcategories).
 *
 * `keywords` are matched against the product title, part number and keywords.
 * Order matters: the first matching type wins, so keep the most specific type
 * first and the broad "parts / kits" type last.
 */

export interface TypeDefinition {
  slug: string;
  name: string;
  keywords: string[];
}

export interface CategoryTaxonomy {
  slug: string;
  name: string;
  types: TypeDefinition[];
}

export const CATALOG_TAXONOMY: CategoryTaxonomy[] = [
  {
    slug: 'turbine-parts',
    name: 'Turbine Parts',
    types: [
      {
        slug: 'gas-turbine-components',
        name: 'Gas Turbine Components',
        keywords: ['gas turbine component', 'gas turbine parts', 'industrial gas turbine', 'lm2500'],
      },
      {
        slug: 'engine-assemblies',
        name: 'Engine Assemblies',
        keywords: ['engine assembly', 'cylinder assembly', 'assembly'],
      },
      {
        slug: 'bearings',
        name: 'Bearings',
        keywords: ['bearing'],
      },
      {
        slug: 'fasteners-hardware',
        name: 'Fasteners & Hardware',
        keywords: ['nut', 'bolt', 'screw', 'spark plug'],
      },
    ],
  },
  {
    slug: 'compressor-parts',
    name: 'Compressors & Pumps',
    types: [
      {
        slug: 'air-compressors',
        name: 'Air Compressors',
        keywords: ['air compressor'],
      },
      {
        slug: 'pumps',
        name: 'Pumps',
        keywords: ['pump'],
      },
      {
        slug: 'compressor-components',
        name: 'Compressor Components',
        keywords: ['compressor', 'regulator', 'thermostat', 'casing', 'impeller'],
      },
      {
        slug: 'repair-kits',
        name: 'Repair Kits',
        keywords: ['kit'],
      },
    ],
  },
  {
    slug: 'valves-actuators',
    name: 'Valves & Actuators',
    types: [
      {
        slug: 'control-valves',
        name: 'Control Valves',
        keywords: ['control valve', 'leslie control valve', 'throttle valve', 'needle valve'],
      },
      {
        slug: 'ball-valves',
        name: 'Ball Valves',
        keywords: ['ball valve'],
      },
      {
        slug: 'butterfly-valves',
        name: 'Butterfly Valves',
        keywords: ['butterfly valve'],
      },
      {
        slug: 'solenoid-valves',
        name: 'Solenoid Valves',
        keywords: ['solenoid valve'],
      },
      {
        slug: 'relief-valves',
        name: 'Relief & Safety Valves',
        keywords: ['relief valve', 'pressure relief', 'relief device'],
      },
      {
        slug: 'positioners',
        name: 'Valve Positioners',
        keywords: ['positioner'],
      },
      {
        slug: 'actuators',
        name: 'Actuators',
        keywords: ['actuator', 'air cylinder'],
      },
      {
        slug: 'valve-parts-kits',
        name: 'Valve Parts & Kits',
        keywords: ['valve', 'kit', 'controller', 'segment', 'strainer'],
      },
    ],
  },
  {
    slug: 'automation-controls',
    name: 'Automation & Controls',
    types: [
      {
        slug: 'plcs-controllers',
        name: 'PLCs & Controllers',
        keywords: ['plc', 'controller', 'compactlogix', 'micrologix', 'symphony', 'control module', 'rack'],
      },
      {
        slug: 'io-modules',
        name: 'I/O Modules & Boards',
        keywords: ['module', 'input', 'output', 'io board', 'terminal board'],
      },
      {
        slug: 'drives',
        name: 'Drives & VFDs',
        keywords: ['drive', 'vfd', 'powerflex', 'acs800', 'acs880'],
      },
      {
        slug: 'power-supplies',
        name: 'Power Supplies',
        keywords: ['power supply', 'power board', 'npsm'],
      },
      {
        slug: 'relays-protection',
        name: 'Relays & Protection',
        keywords: ['relay', 'protection', 'multilin', 'feeder', 'generator'],
      },
      {
        slug: 'monitoring-systems',
        name: 'Monitoring Systems',
        keywords: ['monitor', '3500', '1900/65a', 'machinery', 'overspeed', 'mark v'],
      },
      {
        slug: 'hmi-terminals',
        name: 'HMI & Terminals',
        keywords: ['panelview', 'terminal'],
      },
      {
        slug: 'networking',
        name: 'Industrial Networking',
        keywords: ['switch', 'ionet'],
      },
    ],
  },
  {
    slug: 'instrumentation',
    name: 'Instrumentation',
    types: [
      {
        slug: 'sensors-probes',
        name: 'Sensors & Probes',
        keywords: ['sensor', 'probe', 'proximitor', 'accelerometer', 'transducer'],
      },
      {
        slug: 'transmitters',
        name: 'Transmitters',
        keywords: ['transmitter'],
      },
      {
        slug: 'gauges-switches',
        name: 'Gauges & Switches',
        keywords: ['gauge', 'switch', 'microswitch'],
      },
      {
        slug: 'flow-measurement',
        name: 'Flow Measurement',
        keywords: ['flowmeter', 'flow transmitter', 'panaflow'],
      },
      {
        slug: 'analysers-detectors',
        name: 'Analysers & Detectors',
        keywords: ['analyser', 'analyzer', 'detector', 'gas detection', 'sensepoint', 'hygrometer', 'moisture'],
      },
      {
        slug: 'flame-detection',
        name: 'Flame Detection',
        keywords: ['flame scanner', 'flame'],
      },
      {
        slug: 'monitoring-systems',
        name: 'Monitoring Systems',
        keywords: ['monitor', 'vibration'],
      },
    ],
  },
  {
    slug: 'electrical-motors',
    name: 'Electrical & Motors',
    types: [
      {
        slug: 'motors',
        name: 'Motors',
        keywords: ['motor'],
      },
      {
        slug: 'drives',
        name: 'Drives',
        keywords: ['drive', 'acs800', 'acs880'],
      },
      {
        slug: 'circuit-breakers',
        name: 'Circuit Breakers',
        keywords: ['circuit breaker', 'mccb', 'breaker', 'ats'],
      },
      {
        slug: 'contactors-starters',
        name: 'Contactors & Starters',
        keywords: ['starter', 'contact', 'contact kit'],
      },
      {
        slug: 'transformers',
        name: 'Transformers',
        keywords: ['transformer', 'current ct'],
      },
      {
        slug: 'batteries-ups',
        name: 'Batteries & UPS',
        keywords: ['battery', 'ups', 'charger'],
      },
      {
        slug: 'power-supplies',
        name: 'Power Supplies',
        keywords: ['power supply', 'dc pow'],
      },
      {
        slug: 'electrical-components',
        name: 'Electrical Components',
        keywords: ['capacitor', 'converter', 'electronic', 'fan', 'push button', 'panel meter', 'component', 'sub assembly'],
      },
    ],
  },
  {
    slug: 'mechanical-transmission-bearings',
    name: 'Mechanical Power Transmission',
    types: [
      {
        slug: 'gearboxes',
        name: 'Gearboxes & Gear Units',
        keywords: ['gearbox', 'gear unit', 'reducer', 'gear motor'],
      },
      {
        slug: 'bearings',
        name: 'Bearings',
        keywords: ['bearing'],
      },
      {
        slug: 'couplings',
        name: 'Couplings',
        keywords: ['coupling'],
      },
      {
        slug: 'shafts',
        name: 'Shafts & Hardware',
        keywords: ['shaft', 'stud', 'nut lock'],
      },
      {
        slug: 'conveyors',
        name: 'Conveyors',
        keywords: ['belt conveyor'],
      },
    ],
  },
  {
    slug: 'seals-filters',
    name: 'Seals, Filters & Consumables',
    types: [
      {
        slug: 'filters-elements',
        name: 'Filters & Elements',
        keywords: ['filter', 'element'],
      },
      {
        slug: 'seals-gaskets',
        name: 'Seals & Gaskets',
        keywords: ['seal', 'gasket', 'o-ring'],
      },
      {
        slug: 'service-kits',
        name: 'Service Kits',
        keywords: ['service pack', 'kit'],
      },
      {
        slug: 'fluids',
        name: 'Fluids & Lubricants',
        keywords: ['fluid', 'oil'],
      },
    ],
  },
  {
    slug: 'piping-fittings',
    name: 'Piping & Fittings',
    types: [
      {
        slug: 'fittings',
        name: 'Fittings & Adapters',
        keywords: ['union', 'connector', 'adapter', 'nipple', 'bushing', 'cap', 'bulkhead'],
      },
      {
        slug: 'tees-connectors',
        name: 'Tees & Connectors',
        keywords: ['tee'],
      },
      {
        slug: 'tubing',
        name: 'Tubing',
        keywords: ['tube'],
      },
    ],
  },
];

export const TAXONOMY_BY_CATEGORY = new Map(
  CATALOG_TAXONOMY.map((category) => [category.slug, category])
);

export const TAXONOMY_BY_CATEGORY_NAME = new Map(
  CATALOG_TAXONOMY.map((category) => [category.name.toLowerCase(), category])
);

/** Minimum number of products a type needs before it gets its own page. */
export const MIN_PRODUCTS_PER_TYPE_PAGE = 3;

export const DEFAULT_TYPE: TypeDefinition = {
  slug: 'general',
  name: 'General Parts',
  keywords: [],
};
