/**
 * Gas turbine platform and control-system guides.
 *
 * The Search Console export shows that AGO Aviation already earns impressions
 * for platform-level searches (GE Frame, LM and MS packages, Alstom GT/GT26,
 * Siemens SGT, Rolls-Royce Avon, Zorya-Mashproekt, Solar Turbines, Bently
 * Nevada 3300/3500 and GE Mark IV/V). These pages give every one of those
 * query clusters a dedicated, unique, indexable landing page and an internal
 * link path back into the part-number catalogue.
 *
 * Nothing here claims an exact fitment. Each page explains what the platform
 * is, which part families are commonly sourced for it and how AGO Aviation
 * verifies a reference before quoting.
 */

export interface PlatformFaq {
  question: string;
  answer: string;
}

export interface PlatformPartFamily {
  name: string;
  href: string;
  note: string;
}

export interface Platform {
  slug: string;
  name: string;
  shortName: string;
  manufacturer: string;
  family: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  intro: string[];
  sourcing: string[];
  verification: string[];
  partFamilies: PlatformPartFamily[];
  relatedBrands: string[];
  relatedPlatforms: string[];
  faqs: PlatformFaq[];
  keywords: string[];
  image?: string;
}

const TURBINE = '/categories/turbine-parts';
const COMPRESSOR = '/categories/compressor-parts';
const VALVES = '/categories/valves-actuators';
const AUTOMATION = '/categories/automation-controls';
const INSTRUMENTATION = '/categories/instrumentation';
const ELECTRICAL = '/categories/electrical-motors';
const MECHANICAL = '/categories/mechanical-transmission-bearings';
const SEALS = '/categories/seals-filters';
const PIPING = '/categories/piping-fittings';

const sharedVerification = [
  'Part number, supersession and OEM reference checked against the installed configuration before quotation.',
  'Condition options, documentation and traceability confirmed in writing with the offer.',
  'Photographs and dimensional checks arranged where the application or specification requires them.',
];

export const platforms: Platform[] = [
  {
    slug: 'ge-frame-5',
    name: 'GE Frame 5 (MS5001) Gas Turbine Parts',
    shortName: 'GE Frame 5',
    manufacturer: 'GE (General Electric)',
    family: 'GE heavy-duty gas turbines',
    metaTitle: 'GE Frame 5 (MS5001) Spare Parts – Hot Gas Path, Controls & Accessories',
    metaDescription:
      'Source GE Frame 5 / MS5001 gas turbine spare parts by part number. AGO Aviation supplies hot gas path components, fuel valves, controls, instrumentation and auxiliaries with verification and worldwide delivery.',
    summary:
      'Hot gas path, fuel system, control and auxiliary spares for GE Frame 5 / MS5001 units.',
    intro: [
      'The GE Frame 5, designated MS5001, is one of the longest-serving heavy-duty gas turbine families in industrial power generation. Many units remain in baseload, peaking and mechanical-drive service, which means the spare-parts market is driven by obsolescence, reverse engineering and the need to keep original documentation traceable.',
      'AGO Aviation supports Frame 5 operators by sourcing and manufacturing components to the original reference, then verifying the part number, revision and installed configuration before an offer is issued. We work from OEM drawings, samples, nameplates and cross-references where the original number has been superseded.',
    ],
    sourcing: [
      'Combustion liners, transition pieces, nozzles, blades, shrouds and hot gas path hardware',
      'Fuel gas and liquid fuel valves, actuators, positioners and filters',
      'Speedtronic control cards, relays, power supplies and legacy electronic modules',
      'Lube oil, cooling, sealing and small-bore piping components',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Blades, nozzles, shrouds and combustion hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel control, isolation and actuation equipment.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Legacy control cards, relays and power supplies.' },
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Vibration, temperature, pressure and speed measurement.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['ge-frame-6', 'ge-frame-7', 'ge-mark-iv-v'],
    faqs: [
      {
        question: 'Can AGO Aviation supply obsolete GE Frame 5 parts?',
        answer:
          'Yes. We routinely source discontinued and superseded Frame 5 references using OEM drawings, samples and cross-references, and we confirm the available condition and documentation before quoting.',
      },
      {
        question: 'Do you supply Frame 5 hot gas path components?',
        answer:
          'We source combustion liners, transition pieces, nozzles, blades and shrouds for Frame 5 units. The exact configuration is verified against the unit and the OEM reference before dispatch.',
      },
      {
        question: 'How do I request a Frame 5 spare part quote?',
        answer:
          'Send the part number, quantity, unit model and destination to sale@agoaviation.com. If the original number is unreadable, send a photograph and nameplate details and we will help identify it.',
      },
    ],
    keywords: [
      'GE Frame 5 spare parts',
      'MS5001 parts',
      'GE Frame 5 hot gas path',
      'Frame 5 gas turbine parts',
      'GE MS5001 spare parts supplier',
    ],
  },
  {
    slug: 'ge-frame-6',
    name: 'GE Frame 6, 6B & 6FA Gas Turbine Parts',
    shortName: 'GE Frame 6',
    manufacturer: 'GE (General Electric)',
    family: 'GE heavy-duty gas turbines',
    metaTitle: 'GE Frame 6, 6B & 6FA Spare Parts – Turbine, Controls & Accessories',
    metaDescription:
      'Find GE Frame 6, 6B and 6FA gas turbine spare parts by part number. Hot gas path, combustion, fuel, control and instrumentation spares supplied with verification and worldwide delivery by AGO Aviation.',
    summary:
      'Combustion, hot gas path, fuel and control spares for GE Frame 6, 6B and 6FA units.',
    intro: [
      'The GE Frame 6 family covers the MS6001 heavy-duty machines and the higher-output 6FA variant. The fleet is widely used in combined-cycle, cogeneration and industrial power applications, so operators need both routine wear parts and long-lead hot gas path components without losing traceability.',
      'Our Frame 6 support starts with the exact model and part number, because 6B and 6FA configurations differ in combustion hardware, cooling and control architecture. We confirm the variant before recommending a component and can cross-reference superseded numbers where records allow.',
    ],
    sourcing: [
      'Combustion liners, transition pieces, fuel nozzles, blades, nozzles and shrouds',
      'Fuel gas skids, control valves, actuators and positioners',
      'Mark IV, Mark V and Mark VI control hardware, cards and power supplies',
      'Vibration probes, transmitters, thermocouples and speed sensors',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Combustion and hot gas path replacement hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel control and isolation equipment.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Speedtronic and auxiliary control hardware.' },
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Monitoring and protection sensors.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['ge-frame-5', 'ge-frame-7', 'ge-mark-iv-v'],
    faqs: [
      {
        question: 'Do Frame 6B and 6FA parts interchange?',
        answer:
          'Not automatically. The two variants differ in combustion and hot gas path configuration, so we verify the exact model, serial number and part number before confirming an offer.',
      },
      {
        question: 'Can you cross-reference a superseded Frame 6 part number?',
        answer:
          'Yes, where OEM records or reliable cross-references exist. Send the old number, unit details and any drawing or photograph and our team will check the current equivalent.',
      },
      {
        question: 'Do you support Frame 6 control system obsolescence?',
        answer:
          'We source legacy Mark IV, Mark V and Mark VI cards, power supplies and related hardware, and we can discuss replacement options where the original module is no longer available.',
      },
    ],
    keywords: [
      'GE Frame 6 spare parts',
      'GE 6FA parts',
      'MS6001 spare parts',
      'Frame 6B gas turbine parts',
      'GE Frame 6 combustion parts',
    ],
  },
  {
    slug: 'ge-frame-7',
    name: 'GE Frame 7 & 7EA Gas Turbine Parts',
    shortName: 'GE Frame 7',
    manufacturer: 'GE (General Electric)',
    family: 'GE heavy-duty gas turbines',
    metaTitle: 'GE Frame 7 & 7EA Spare Parts – Turbine, Combustion & Control Hardware',
    metaDescription:
      'Source GE Frame 7 and 7EA gas turbine spare parts by part number. AGO Aviation supplies combustion, hot gas path, fuel, control and instrumentation components with worldwide quote-based delivery.',
    summary:
      'Combustion, turbine, fuel and control spares for GE Frame 7 and 7EA machines.',
    intro: [
      'Frame 7 and 7EA units form a large part of the global heavy-duty fleet, particularly in combined-cycle power plants. Their operating profile puts sustained demand on combustion hardware, hot gas path components, fuel systems and the control and monitoring equipment that protects the machine.',
      'AGO Aviation supports Frame 7 operators with part-number-led sourcing rather than catalogue guessing. We confirm the model variant, the installed revision and the documentation requirement, then source or manufacture to that reference.',
    ],
    sourcing: [
      'Combustion liners, transition pieces, fuel nozzles, turbine blades and nozzles',
      'Fuel gas and liquid fuel control valves, actuators and filters',
      'Mark V and Mark VI control cards, I/O modules and power supplies',
      'Bently Nevada vibration, proximity and speed monitoring hardware',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Combustion and turbine section replacement parts.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and auxiliary flow-control equipment.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Control, protection and sequencing hardware.' },
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Condition monitoring and measurement devices.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['ge-frame-6', 'ge-frame-9', 'ge-mark-iv-v'],
    faqs: [
      {
        question: 'Do you supply Frame 7EA hot gas path parts?',
        answer:
          'Yes. We source combustion liners, transition pieces, nozzles, blades and shrouds for Frame 7EA and related Frame 7 variants, subject to verification of the exact configuration.',
      },
      {
        question: 'Can AGO Aviation help with Frame 7 control upgrades?',
        answer:
          'We can supply legacy control cards and related hardware, and we can discuss replacement paths where the installed system is obsolete. The final scope depends on the existing architecture.',
      },
      {
        question: 'What information is needed for a Frame 7 quote?',
        answer:
          'Provide the part number, unit model, serial number if available, quantity and destination. Photographs and nameplate details help when the original reference is unclear.',
      },
    ],
    keywords: [
      'GE Frame 7 spare parts',
      'GE 7EA parts',
      'MS7001 spare parts',
      'Frame 7 gas turbine parts',
      'GE Frame 7 combustion parts',
    ],
  },
  {
    slug: 'ge-frame-9',
    name: 'GE Frame 9 & 9E Gas Turbine Parts',
    shortName: 'GE Frame 9',
    manufacturer: 'GE (General Electric)',
    family: 'GE heavy-duty gas turbines',
    metaTitle: 'GE Frame 9 & 9E Spare Parts – Combustion, Turbine & Control Components',
    metaDescription:
      'Find GE Frame 9 and 9E gas turbine spare parts by part number. AGO Aviation supplies hot gas path, combustion, fuel, control and monitoring components with verification and worldwide delivery.',
    summary:
      'Hot gas path, combustion, fuel and control spares for GE Frame 9 and 9E units.',
    intro: [
      'Frame 9 and 9E machines are among the largest heavy-duty gas turbines in utility and combined-cycle service. Because they sit at the centre of plant output, a single missing component can extend an outage, so operators need a supplier who can work from the exact reference rather than a generic description.',
      'AGO Aviation handles Frame 9 enquiries by confirming the machine variant, the part number and the required condition before offering. We support both routine maintenance items and long-lead hot gas path components, including superseded and obsolete references where records allow.',
    ],
    sourcing: [
      'Combustion liners, transition pieces, fuel nozzles, turbine blades, nozzles and shrouds',
      'Fuel gas control valves, actuators, positioners and filters',
      'Mark V, Mark VI and Mark VIe control hardware and power supplies',
      'Vibration, proximity, temperature and pressure instrumentation',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Combustion and turbine section hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and auxiliary flow control.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Turbine control and protection modules.' },
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Monitoring and measurement equipment.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['ge-frame-7', 'ge-frame-6', 'ge-mark-iv-v'],
    faqs: [
      {
        question: 'Can you supply long-lead Frame 9 hot gas path parts?',
        answer:
          'We source long-lead combustion and turbine components and will confirm lead time, condition and documentation in the offer so outage planning can proceed with realistic dates.',
      },
      {
        question: 'Do you support Frame 9E and 9FA variants?',
        answer:
          'Yes, subject to verification of the exact variant and part number. Combustion and hot gas path hardware differs across the family, so we confirm the configuration first.',
      },
      {
        question: 'How do I start a Frame 9 spare parts enquiry?',
        answer:
          'Email the part number, quantity, unit model and destination to sale@agoaviation.com. Include photographs or drawings where the number is damaged or superseded.',
      },
    ],
    keywords: [
      'GE Frame 9 spare parts',
      'GE 9E parts',
      'MS9001 spare parts',
      'Frame 9 gas turbine parts',
      'GE Frame 9 hot gas path',
    ],
  },
  {
    slug: 'ge-lm2500',
    name: 'GE LM2500 Gas Turbine Parts',
    shortName: 'GE LM2500',
    manufacturer: 'GE (General Electric)',
    family: 'GE aeroderivative gas turbines',
    metaTitle: 'GE LM2500 Spare Parts – Aeroderivative Turbine & Accessory Components',
    metaDescription:
      'Source GE LM2500 aeroderivative gas turbine spare parts by part number. AGO Aviation supplies compressor, turbine, fuel, control and monitoring components for LM2500 packages worldwide.',
    summary:
      'Aeroderivative compressor, turbine, fuel and control spares for GE LM2500 packages.',
    intro: [
      'The GE LM2500 is an aeroderivative gas turbine derived from the CF6 family and used in power generation, marine and mechanical-drive packages. Its compact core and high power density make it sensitive to compressor condition, fuel-system cleanliness and the accuracy of the monitoring chain.',
      'AGO Aviation supports LM2500 operators with part-number-led sourcing across the core, accessories and package. Because aeroderivative configurations vary by package integrator, we confirm the assembly, part number and revision before recommending a component.',
    ],
    sourcing: [
      'Compressor blades, vanes, seals and case hardware',
      'Turbine nozzles, blades, discs and hot section components',
      'Fuel nozzles, manifolds, valves and control accessories',
      'Vibration, speed and temperature monitoring instrumentation',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Compressors & pumps', href: COMPRESSOR, note: 'Compressor and accessory rotating components.' },
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Hot section and turbine hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and package flow-control equipment.' },
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Package monitoring and protection devices.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['ge-lm5000', 'ge-lm6000', 'ge-lm1600'],
    faqs: [
      {
        question: 'Do you supply LM2500 parts for marine and industrial packages?',
        answer:
          'Yes. We support LM2500 packages across power generation, marine and mechanical-drive applications, and we confirm the package integrator and configuration before quoting.',
      },
      {
        question: 'Can you source obsolete LM2500 references?',
        answer:
          'We routinely work with superseded and discontinued references using OEM drawings, samples and cross-references, subject to the records available for the specific part.',
      },
      {
        question: 'What details help an LM2500 enquiry?',
        answer:
          'Send the part number, package model, quantity and destination. If the reference is unclear, include photographs of the component and any nameplate or tag information.',
      },
    ],
    keywords: [
      'GE LM2500 spare parts',
      'LM2500 gas turbine parts',
      'LM2500 compressor parts',
      'LM2500 fuel nozzle',
      'aeroderivative gas turbine spares',
    ],
  },
  {
    slug: 'ge-lm5000',
    name: 'GE LM5000 Gas Turbine Parts',
    shortName: 'GE LM5000',
    manufacturer: 'GE (General Electric)',
    family: 'GE aeroderivative gas turbines',
    metaTitle: 'GE LM5000 Spare Parts – Aeroderivative Turbine, Compressor & Controls',
    metaDescription:
      'Find GE LM5000 aeroderivative gas turbine spare parts by part number. AGO Aviation sources compressor, turbine, fuel, control and monitoring components with verification and worldwide delivery.',
    summary:
      'Compressor, turbine, fuel and control spares for GE LM5000 aeroderivative packages.',
    intro: [
      'The GE LM5000 is an aeroderivative gas turbine derived from the CF6-50 engine family and used in industrial power and mechanical-drive service. As the fleet ages, operators increasingly need obsolete and re-engineered components alongside routine wear parts.',
      'AGO Aviation supports LM5000 packages by verifying the exact part number and package configuration before sourcing. We work across the compressor, turbine, fuel system and monitoring chain, and we document the condition and traceability of every offer.',
    ],
    sourcing: [
      'Compressor blades, vanes, seals and case components',
      'Turbine nozzles, blades and hot section hardware',
      'Fuel system valves, nozzles, manifolds and actuators',
      'Control cards, sensors and package instrumentation',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Compressors & pumps', href: COMPRESSOR, note: 'Compressor and accessory components.' },
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Turbine and hot section hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and auxiliary flow control.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Package control and protection hardware.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['ge-lm2500', 'ge-lm6000', 'ge-lm1600'],
    faqs: [
      {
        question: 'Do you support legacy LM5000 packages?',
        answer:
          'Yes. We focus on legacy and obsolescence support, using OEM drawings, samples and cross-references to identify a workable replacement where the original part is discontinued.',
      },
      {
        question: 'Can you supply LM5000 fuel system components?',
        answer:
          'We source fuel nozzles, manifolds, valves and actuators for LM5000 packages, subject to verification of the exact configuration and part number.',
      },
      {
        question: 'How long does an LM5000 quote take?',
        answer:
          'Most enquiries receive an initial response within one business day. Long-lead or obsolete items may require additional technical review before a firm lead time is confirmed.',
      },
    ],
    keywords: [
      'GE LM5000 spare parts',
      'LM5000 gas turbine parts',
      'LM5000 compressor parts',
      'LM5000 fuel system',
      'aeroderivative turbine spares',
    ],
  },
  {
    slug: 'ge-lm6000',
    name: 'GE LM6000 Gas Turbine Parts',
    shortName: 'GE LM6000',
    manufacturer: 'GE (General Electric)',
    family: 'GE aeroderivative gas turbines',
    metaTitle: 'GE LM6000 Spare Parts – Turbine, Compressor, Fuel & Control Components',
    metaDescription:
      'Source GE LM6000 aeroderivative gas turbine spare parts by part number. AGO Aviation supplies compressor, turbine, fuel, control and monitoring components for LM6000 packages worldwide.',
    summary:
      'Aeroderivative compressor, turbine, fuel and control spares for GE LM6000 packages.',
    intro: [
      'The GE LM6000 is a high-power aeroderivative gas turbine derived from the CF6-80C2 and widely used in peaking, combined-cycle and industrial applications. Its dual-rotor architecture and package integration mean that part identification must account for both the engine and the package.',
      'AGO Aviation supports LM6000 operators with part-number verification across the compressor, turbine, fuel system and controls. We confirm the engine variant, package integrator and required documentation before issuing an offer.',
    ],
    sourcing: [
      'Compressor blades, vanes, seals and case hardware',
      'Turbine nozzles, blades and hot section components',
      'Fuel nozzles, manifolds, valves and actuators',
      'Control hardware, vibration probes and package instrumentation',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Compressors & pumps', href: COMPRESSOR, note: 'Compressor and accessory rotating parts.' },
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Turbine and hot section hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and package flow-control equipment.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Control, protection and monitoring hardware.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['ge-lm2500', 'ge-lm5000', 'ge-lm1600'],
    faqs: [
      {
        question: 'Do you supply LM6000 compressor and turbine parts?',
        answer:
          'Yes. We source compressor and turbine section components for LM6000 packages, with the exact part number and engine variant verified before quotation.',
      },
      {
        question: 'Can you help identify an unmarked LM6000 component?',
        answer:
          'Send photographs, dimensions and any tag or nameplate information. Our team will compare the details with available records and propose the most likely reference for verification.',
      },
      {
        question: 'Do you supply LM6000 package accessories as well as engine parts?',
        answer:
          'We support both engine and package-level items, including fuel, control and monitoring components, subject to confirmation of the package configuration.',
      },
    ],
    keywords: [
      'GE LM6000 spare parts',
      'LM6000 gas turbine parts',
      'LM6000 compressor parts',
      'LM6000 fuel nozzle',
      'LM6000 control system parts',
    ],
  },
  {
    slug: 'ge-lm1600',
    name: 'GE LM1600 Gas Turbine Parts',
    shortName: 'GE LM1600',
    manufacturer: 'GE (General Electric)',
    family: 'GE aeroderivative gas turbines',
    metaTitle: 'GE LM1600 Spare Parts – Aeroderivative Turbine & Accessory Components',
    metaDescription:
      'Find GE LM1600 aeroderivative gas turbine spare parts by part number. AGO Aviation sources compressor, turbine, fuel, control and monitoring components with verification and worldwide delivery.',
    summary:
      'Compressor, turbine, fuel and control spares for GE LM1600 aeroderivative packages.',
    intro: [
      'The GE LM1600 is an aeroderivative gas turbine derived from the CFM56 engine family and used in industrial power and mechanical-drive applications. Its smaller frame makes it attractive for distributed generation, but the same discipline applies: the part number and engine variant must match before a component is supplied.',
      'AGO Aviation supports LM1600 operators across the compressor, turbine, fuel system and monitoring chain. We confirm the exact reference and package configuration, and we can cross-reference superseded numbers where records allow.',
    ],
    sourcing: [
      'Compressor blades, vanes, seals and case components',
      'Turbine nozzles, blades and hot section hardware',
      'Fuel nozzles, valves, manifolds and actuators',
      'Sensors, control cards and package instrumentation',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Compressors & pumps', href: COMPRESSOR, note: 'Compressor and accessory components.' },
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Turbine and hot section hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and auxiliary flow control.' },
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Monitoring and protection devices.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['ge-lm2500', 'ge-lm5000', 'ge-lm6000'],
    faqs: [
      {
        question: 'Do you support LM1600 packages outside the original OEM network?',
        answer:
          'Yes. We source and cross-reference parts for legacy packages, using OEM drawings, samples and available records to identify a workable replacement.',
      },
      {
        question: 'Can you supply LM1600 fuel and control components?',
        answer:
          'We source fuel-system and control components for LM1600 packages, subject to verification of the exact part number and package configuration.',
      },
      {
        question: 'What is the fastest way to get an LM1600 quote?',
        answer:
          'Email the part number, quantity and destination to sale@agoaviation.com. Include photographs if the reference is unclear, and our team will respond with the next steps.',
      },
    ],
    keywords: [
      'GE LM1600 spare parts',
      'LM1600 gas turbine parts',
      'LM1600 compressor parts',
      'LM1600 fuel system',
      'aeroderivative turbine spares',
    ],
  },
  {
    slug: 'ge-ms5002d',
    name: 'GE MS5002D Gas Turbine Parts',
    shortName: 'GE MS5002D',
    manufacturer: 'GE (General Electric)',
    family: 'GE heavy-duty gas turbines',
    metaTitle: 'GE MS5002D Spare Parts – Mechanical Drive Turbine Components',
    metaDescription:
      'Source GE MS5002D gas turbine spare parts by part number. AGO Aviation supplies hot gas path, fuel, control and auxiliary components for MS5002D mechanical-drive units worldwide.',
    summary:
      'Hot gas path, fuel, control and auxiliary spares for GE MS5002D mechanical-drive units.',
    intro: [
      'The GE MS5002D is a two-shaft heavy-duty gas turbine used mainly for mechanical drive in oil and gas applications. Because these units often run in remote locations, the availability of the right spare and the documentation that proves it is critical to uptime.',
      'AGO Aviation supports MS5002D operators with part-number-led sourcing across the hot gas path, fuel system, controls and auxiliaries. We confirm the unit configuration and required condition before offering, and we can work from drawings and samples where the original reference is lost.',
    ],
    sourcing: [
      'Combustion liners, transition pieces, nozzles, blades and shrouds',
      'Fuel gas valves, actuators, positioners and filters',
      'Control cards, relays, power supplies and protection modules',
      'Lube oil, sealing and small-bore piping components',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Combustion and turbine section hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and auxiliary flow-control equipment.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Control and protection hardware.' },
      { name: 'Seals, filters & consumables', href: SEALS, note: 'Sealing, filtration and service items.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['ge-frame-5', 'ge-frame-6', 'ge-mark-iv-v'],
    faqs: [
      {
        question: 'Do you supply MS5002D mechanical-drive spares?',
        answer:
          'Yes. We support MS5002D units with hot gas path, fuel, control and auxiliary components, subject to verification of the exact unit and part number.',
      },
      {
        question: 'Can you help with remote-site logistics?',
        answer:
          'We ship worldwide and can discuss packaging, documentation and dispatch requirements for remote or offshore destinations as part of the quotation.',
      },
      {
        question: 'How do I confirm the correct MS5002D variant?',
        answer:
          'Provide the unit model, serial number and part number. Where these are unavailable, photographs and nameplate details help us narrow the configuration before quoting.',
      },
    ],
    keywords: [
      'GE MS5002D spare parts',
      'MS5002D gas turbine parts',
      'MS5002D mechanical drive',
      'GE MS5002D hot gas path',
      'MS5002D fuel system',
    ],
  },
  {
    slug: 'alstom-gt11',
    name: 'Alstom GT11 Gas Turbine Parts',
    shortName: 'Alstom GT11',
    manufacturer: 'Alstom (now GE Vernova)',
    family: 'Alstom heavy-duty gas turbines',
    metaTitle: 'Alstom GT11 Spare Parts – Turbine, Combustion & Auxiliary Components',
    metaDescription:
      'Source Alstom GT11 gas turbine spare parts by part number. AGO Aviation supplies combustion, turbine, fuel, control and auxiliary components with verification and worldwide delivery.',
    summary:
      'Combustion, turbine, fuel and auxiliary spares for Alstom GT11 gas turbines.',
    intro: [
      'The Alstom GT11 is a heavy-duty gas turbine used in industrial power generation and mechanical-drive service. As the installed base has passed through several ownership changes, documentation and part-number continuity are often the biggest obstacles for operators.',
      'AGO Aviation supports GT11 operators by working from the original part number, drawing or sample rather than assuming that a current catalogue number still applies. We source combustion, turbine, fuel and auxiliary components and confirm the configuration before quoting.',
    ],
    sourcing: [
      'Combustion liners, transition pieces, fuel nozzles, blades and nozzles',
      'Fuel gas valves, actuators, positioners and filters',
      'Control cards, relays and protection hardware',
      'Lube oil, sealing, filtration and piping components',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Combustion and turbine section hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and auxiliary flow-control equipment.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Control and protection hardware.' },
      { name: 'Piping & fittings', href: PIPING, note: 'Small-bore and instrument piping components.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['alstom-gt13e2', 'alstom-gt26', 'ge-frame-6'],
    faqs: [
      {
        question: 'Can AGO Aviation supply Alstom GT11 parts after the GE acquisition?',
        answer:
          'Yes. We source to the original Alstom reference and can cross-reference current ownership records where available. The exact part number and configuration are verified before quotation.',
      },
      {
        question: 'Do you support GT11 combustion hardware?',
        answer:
          'We source combustion liners, transition pieces, fuel nozzles and related hot gas path hardware, subject to confirmation of the unit variant and part number.',
      },
      {
        question: 'What if the original GT11 drawing is unavailable?',
        answer:
          'Send a sample, photograph and dimensions. Our team will review the component and propose a route for reverse engineering or equivalent supply where feasible.',
      },
    ],
    keywords: [
      'Alstom GT11 spare parts',
      'GT11 gas turbine parts',
      'Alstom GT11 combustion parts',
      'GT11 turbine components',
      'Alstom gas turbine spares',
    ],
  },
  {
    slug: 'alstom-gt13e2',
    name: 'Alstom GT13E2 Gas Turbine Parts',
    shortName: 'Alstom GT13E2',
    manufacturer: 'Alstom (now GE Vernova)',
    family: 'Alstom heavy-duty gas turbines',
    metaTitle: 'Alstom GT13E2 Spare Parts – Hot Gas Path, Combustion & Controls',
    metaDescription:
      'Find Alstom GT13E2 gas turbine spare parts by part number. AGO Aviation sources hot gas path, combustion, fuel, control and auxiliary components with verification and worldwide delivery.',
    summary:
      'Hot gas path, combustion, fuel and control spares for Alstom GT13E2 units.',
    intro: [
      'The Alstom GT13E2 is a heavy-duty gas turbine used in combined-cycle and industrial power plants. Its hot gas path and combustion system are the focus of most maintenance spend, and the part-number trail often crosses several document revisions.',
      'AGO Aviation supports GT13E2 operators with part-number-led sourcing and cross-referencing. We confirm the exact revision, condition and documentation requirement before issuing an offer, and we can work from drawings and samples where the original number is unclear.',
    ],
    sourcing: [
      'Combustion liners, transition pieces, fuel nozzles, blades, nozzles and shrouds',
      'Fuel gas control valves, actuators and positioners',
      'Control cards, protection modules and power supplies',
      'Lube oil, sealing and auxiliary piping components',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Combustion and hot gas path hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and auxiliary flow control.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Control and protection equipment.' },
      { name: 'Seals, filters & consumables', href: SEALS, note: 'Sealing and filtration items.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['alstom-gt11', 'alstom-gt26', 'ge-frame-9'],
    faqs: [
      {
        question: 'Do you supply GT13E2 hot gas path components?',
        answer:
          'Yes. We source combustion and turbine section components for GT13E2 units, with the exact revision and part number verified before quotation.',
      },
      {
        question: 'Can you cross-reference legacy GT13E2 part numbers?',
        answer:
          'Where OEM records or reliable cross-references exist, we can identify the current equivalent. Send the old number and any drawing or photograph to start the review.',
      },
      {
        question: 'Do you support GT13E2 control-system obsolescence?',
        answer:
          'We source legacy control cards and related hardware and can discuss replacement options where the installed module is no longer available.',
      },
    ],
    keywords: [
      'Alstom GT13E2 spare parts',
      'GT13E2 gas turbine parts',
      'GT13E2 hot gas path',
      'GT13E2 combustion parts',
      'Alstom GT13E2 components',
    ],
  },
  {
    slug: 'alstom-gt26',
    name: 'Alstom GT26 Gas Turbine Parts',
    shortName: 'Alstom GT26',
    manufacturer: 'Alstom (now GE Vernova)',
    family: 'Alstom heavy-duty gas turbines',
    metaTitle: 'Alstom GT26 Spare Parts – Sequential Combustion & Turbine Components',
    metaDescription:
      'Source Alstom GT26 gas turbine spare parts by part number. AGO Aviation supplies sequential combustion, turbine, fuel, control and auxiliary components with verification and worldwide delivery.',
    summary:
      'Sequential combustion, turbine, fuel and control spares for Alstom GT26 units.',
    intro: [
      'The Alstom GT26 is a heavy-duty gas turbine built around sequential combustion, with a reheat stage that adds specific hardware and control requirements. Operators need suppliers who understand that the combustion path is not interchangeable with a conventional single-combustor machine.',
      'AGO Aviation supports GT26 enquiries by confirming the exact stage, part number and revision before sourcing. We handle combustion, turbine, fuel and control components, and we document condition and traceability in every offer.',
    ],
    sourcing: [
      'Sequential combustion liners, transition pieces, burners and fuel nozzles',
      'Turbine blades, nozzles, shrouds and hot gas path hardware',
      'Fuel gas valves, actuators and positioners',
      'Control cards, protection modules and monitoring instrumentation',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Sequential combustion and turbine hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and auxiliary flow control.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Control and protection equipment.' },
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Monitoring and measurement devices.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['alstom-gt11', 'alstom-gt13e2', 'ge-frame-9'],
    faqs: [
      {
        question: 'Do you supply GT26 sequential combustion parts?',
        answer:
          'We source sequential combustion hardware, including liners, transition pieces, burners and fuel nozzles, subject to verification of the exact stage and part number.',
      },
      {
        question: 'Why is the GT26 combustion path different?',
        answer:
          'The GT26 uses a reheat combustion stage, so the hardware and operating conditions differ from a conventional single-combustor machine. We confirm the stage and revision before recommending a component.',
      },
      {
        question: 'How do I request a GT26 quote?',
        answer:
          'Send the part number, stage, quantity and destination to sale@agoaviation.com. Include drawings or photographs where the reference is unclear.',
      },
    ],
    keywords: [
      'Alstom GT26 spare parts',
      'GT26 gas turbine parts',
      'GT26 sequential combustion',
      'GT26 turbine components',
      'Alstom GT26 hot gas path',
    ],
  },
  {
    slug: 'siemens-sgt-400',
    name: 'Siemens SGT-400 Gas Turbine Parts',
    shortName: 'Siemens SGT-400',
    manufacturer: 'Siemens Energy',
    family: 'Siemens industrial gas turbines',
    metaTitle: 'Siemens SGT-400 Spare Parts – Turbine, Combustion & Control Components',
    metaDescription:
      'Find Siemens SGT-400 gas turbine spare parts by part number. AGO Aviation sources turbine, combustion, fuel, control and instrumentation components with verification and worldwide delivery.',
    summary:
      'Turbine, combustion, fuel and control spares for Siemens SGT-400 industrial units.',
    intro: [
      'The Siemens SGT-400 is an industrial gas turbine used in power generation, oil and gas and mechanical-drive applications. Its packaged configuration means that engine parts, auxiliaries and controls must be identified together rather than in isolation.',
      'AGO Aviation supports SGT-400 operators with part-number-led sourcing across the turbine, combustion, fuel and control systems. We confirm the package configuration and documentation requirement before quoting.',
    ],
    sourcing: [
      'Turbine blades, nozzles, seals and hot section hardware',
      'Combustion liners, burners and fuel nozzles',
      'Fuel valves, actuators and package auxiliaries',
      'Control cards, sensors and monitoring instrumentation',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Turbine and combustion hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and package flow control.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Control and protection hardware.' },
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Monitoring and measurement devices.' },
    ],
    relatedBrands: ['siemens', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['siemens-sgt-700-800', 'siemens-sgt-a05', 'ge-frame-6'],
    faqs: [
      {
        question: 'Do you supply Siemens SGT-400 package accessories?',
        answer:
          'Yes. We support both engine and package-level items, including fuel, control and monitoring components, subject to confirmation of the package configuration.',
      },
      {
        question: 'Can you cross-reference Siemens part numbers?',
        answer:
          'Where records allow, we can identify current equivalents for superseded Siemens references. Send the old number and any nameplate or drawing details.',
      },
      {
        question: 'How do I start an SGT-400 enquiry?',
        answer:
          'Email the part number, package model, quantity and destination to sale@agoaviation.com and our team will confirm the next steps.',
      },
    ],
    keywords: [
      'Siemens SGT-400 spare parts',
      'SGT-400 gas turbine parts',
      'Siemens SGT-400 combustion',
      'SGT-400 turbine components',
      'Siemens industrial turbine spares',
    ],
  },
  {
    slug: 'siemens-sgt-700-800',
    name: 'Siemens SGT-700 & SGT-800 Gas Turbine Parts',
    shortName: 'Siemens SGT-700/800',
    manufacturer: 'Siemens Energy',
    family: 'Siemens industrial gas turbines',
    metaTitle: 'Siemens SGT-700 & SGT-800 Spare Parts – Turbine, Combustion & Controls',
    metaDescription:
      'Source Siemens SGT-700 and SGT-800 gas turbine spare parts by part number. AGO Aviation supplies turbine, combustion, fuel, control and instrumentation components with worldwide delivery.',
    summary:
      'Turbine, combustion, fuel and control spares for Siemens SGT-700 and SGT-800 units.',
    intro: [
      'The Siemens SGT-700 and SGT-800 are industrial gas turbines used in combined heat and power, industrial generation and mechanical-drive service. The two models share a supplier ecosystem but differ in output and configuration, so the exact model and part number must be confirmed.',
      'AGO Aviation supports SGT-700 and SGT-800 operators with part-number-led sourcing across hot section, combustion, fuel and controls. We verify the model, revision and documentation requirement before offering.',
    ],
    sourcing: [
      'Turbine blades, nozzles, shrouds and hot section components',
      'Combustion liners, burners and fuel nozzles',
      'Fuel gas valves, actuators and package auxiliaries',
      'Control cards, sensors and condition-monitoring hardware',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Turbine and combustion hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and package flow control.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Control and protection equipment.' },
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Monitoring and measurement devices.' },
    ],
    relatedBrands: ['siemens', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['siemens-sgt-400', 'siemens-sgt-a05', 'ge-frame-7'],
    faqs: [
      {
        question: 'Do SGT-700 and SGT-800 parts interchange?',
        answer:
          'Not automatically. The models differ in configuration and output, so we confirm the exact model and part number before recommending a component.',
      },
      {
        question: 'Can you supply SGT-800 hot section parts?',
        answer:
          'We source turbine and combustion hot section components for SGT-800 units, subject to verification of the exact revision and part number.',
      },
      {
        question: 'Do you support Siemens control-system obsolescence?',
        answer:
          'We source legacy control and monitoring hardware and can discuss replacement options where the installed module is no longer available.',
      },
    ],
    keywords: [
      'Siemens SGT-700 spare parts',
      'Siemens SGT-800 spare parts',
      'SGT-800 gas turbine parts',
      'SGT-700 combustion parts',
      'Siemens turbine components',
    ],
  },
  {
    slug: 'siemens-sgt-a05',
    name: 'Siemens SGT-A05 Gas Turbine Parts',
    shortName: 'Siemens SGT-A05',
    manufacturer: 'Siemens Energy',
    family: 'Siemens aeroderivative gas turbines',
    metaTitle: 'Siemens SGT-A05 Spare Parts – Aeroderivative Turbine Components',
    metaDescription:
      'Find Siemens SGT-A05 aeroderivative gas turbine spare parts by part number. AGO Aviation sources compressor, turbine, fuel, control and monitoring components with worldwide delivery.',
    summary:
      'Aeroderivative compressor, turbine, fuel and control spares for Siemens SGT-A05 packages.',
    intro: [
      'The Siemens SGT-A05 is an aeroderivative gas turbine used in industrial power and mechanical-drive packages. Aeroderivative units place a premium on compressor condition, fuel cleanliness and accurate monitoring, and the part-number trail often spans several engine variants.',
      'AGO Aviation supports SGT-A05 operators with part-number verification across the compressor, turbine, fuel system and controls. We confirm the engine variant and package configuration before quoting.',
    ],
    sourcing: [
      'Compressor blades, vanes, seals and case hardware',
      'Turbine nozzles, blades and hot section components',
      'Fuel nozzles, manifolds, valves and actuators',
      'Sensors, control cards and package instrumentation',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Compressors & pumps', href: COMPRESSOR, note: 'Compressor and accessory components.' },
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Turbine and hot section hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and auxiliary flow control.' },
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Monitoring and protection devices.' },
    ],
    relatedBrands: ['siemens', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['siemens-sgt-400', 'siemens-sgt-700-800', 'ge-lm2500'],
    faqs: [
      {
        question: 'Do you support SGT-A05 aeroderivative packages?',
        answer:
          'Yes. We source engine and package components for SGT-A05 units, subject to verification of the exact variant and part number.',
      },
      {
        question: 'Can you help identify an unmarked SGT-A05 part?',
        answer:
          'Send photographs, dimensions and any tag or nameplate details. Our team will compare them with available records and propose a reference for verification.',
      },
      {
        question: 'How quickly can you respond to an SGT-A05 enquiry?',
        answer:
          'Most enquiries receive an initial response within one business day. Long-lead or obsolete items may need additional technical review.',
      },
    ],
    keywords: [
      'Siemens SGT-A05 spare parts',
      'SGT-A05 gas turbine parts',
      'SGT-A05 compressor parts',
      'SGT-A05 fuel system',
      'Siemens aeroderivative spares',
    ],
  },
  {
    slug: 'rolls-royce-avon',
    name: 'Rolls-Royce Avon Gas Turbine Parts',
    shortName: 'Rolls-Royce Avon',
    manufacturer: 'Rolls-Royce',
    family: 'Rolls-Royce aeroderivative gas turbines',
    metaTitle: 'Rolls-Royce Avon Spare Parts – Aeroderivative Turbine Components',
    metaDescription:
      'Source Rolls-Royce Avon gas turbine spare parts by part number. AGO Aviation supplies compressor, turbine, fuel, control and auxiliary components for legacy Avon packages worldwide.',
    summary:
      'Compressor, turbine, fuel and auxiliary spares for legacy Rolls-Royce Avon packages.',
    intro: [
      'The Rolls-Royce Avon is an aeroderivative gas turbine derived from the Avon aero engine and used in industrial power and mechanical-drive service. The fleet is now firmly in the legacy phase, so obsolescence, reverse engineering and documentation are central to keeping units running.',
      'AGO Aviation supports Avon operators by working from the original part number, drawing or sample. We source compressor, turbine, fuel and auxiliary components and confirm the configuration and condition before offering.',
    ],
    sourcing: [
      'Compressor blades, vanes, seals and case components',
      'Turbine nozzles, blades and hot section hardware',
      'Fuel nozzles, valves, manifolds and actuators',
      'Control cards, sensors and package auxiliaries',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Compressors & pumps', href: COMPRESSOR, note: 'Compressor and accessory components.' },
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Turbine and hot section hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and auxiliary flow control.' },
      { name: 'Seals, filters & consumables', href: SEALS, note: 'Sealing, filtration and service items.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['zorya-mashproekt', 'solar-turbines', 'ge-lm2500'],
    faqs: [
      {
        question: 'Can AGO Aviation supply obsolete Rolls-Royce Avon parts?',
        answer:
          'Yes. We specialise in legacy and obsolescence support, using OEM drawings, samples and cross-references to identify a workable replacement where the original part is discontinued.',
      },
      {
        question: 'Do you support Avon hot section components?',
        answer:
          'We source turbine and hot section hardware for Avon packages, subject to verification of the exact engine variant and part number.',
      },
      {
        question: 'What information should I send for an Avon enquiry?',
        answer:
          'Send the part number, engine or package model, quantity and destination. Photographs and nameplate details help when the reference is unclear.',
      },
    ],
    keywords: [
      'Rolls-Royce Avon spare parts',
      'Avon gas turbine parts',
      'Rolls-Royce Avon components',
      'Avon compressor parts',
      'legacy Avon turbine spares',
    ],
  },
  {
    slug: 'zorya-mashproekt',
    name: 'Zorya-Mashproekt Gas Turbine Parts',
    shortName: 'Zorya-Mashproekt',
    manufacturer: 'Zorya-Mashproekt',
    family: 'Zorya-Mashproekt gas turbines',
    metaTitle: 'Zorya-Mashproekt Gas Turbine Spare Parts – GTD & UGT Components',
    metaDescription:
      'Source Zorya-Mashproekt gas turbine spare parts by part number. AGO Aviation supplies GTD and UGT turbine, compressor, fuel and auxiliary components with verification and worldwide delivery.',
    summary:
      'Turbine, compressor, fuel and auxiliary spares for Zorya-Mashproekt GTD and UGT units.',
    intro: [
      'Zorya-Mashproekt gas turbines, including the GTD and UGT families, are used in power generation and mechanical-drive service across Eastern Europe, Asia and the Middle East. Documentation is often in Cyrillic and part numbers may follow a different convention from Western OEMs.',
      'AGO Aviation supports Zorya-Mashproekt operators by verifying the original reference, drawing and unit configuration before sourcing. We handle turbine, compressor, fuel and auxiliary components and can work from samples where records are incomplete.',
    ],
    sourcing: [
      'Turbine blades, nozzles, shrouds and hot section hardware',
      'Compressor blades, vanes, seals and case components',
      'Fuel nozzles, valves, manifolds and actuators',
      'Control cards, sensors and package auxiliaries',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Turbine and hot section hardware.' },
      { name: 'Compressors & pumps', href: COMPRESSOR, note: 'Compressor and accessory components.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and auxiliary flow control.' },
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Monitoring and protection devices.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['rolls-royce-avon', 'solar-turbines', 'alstom-gt11'],
    faqs: [
      {
        question: 'Do you support GTD and UGT variants?',
        answer:
          'Yes. We support Zorya-Mashproekt GTD and UGT families, subject to verification of the exact model, part number and unit configuration.',
      },
      {
        question: 'Can you work with Cyrillic drawings and part numbers?',
        answer:
          'Yes. Send the original drawing or reference and we will review it against available records and propose the next step for identification or sourcing.',
      },
      {
        question: 'Do you supply Zorya-Mashproekt hot section parts?',
        answer:
          'We source turbine and hot section components, subject to confirmation of the exact variant and available documentation.',
      },
    ],
    keywords: [
      'Zorya-Mashproekt spare parts',
      'Zorya gas turbine parts',
      'GTD-110 spare parts',
      'UGT gas turbine components',
      'Zorya Mashproekt turbine spares',
    ],
  },
  {
    slug: 'solar-turbines',
    name: 'Solar Turbines Gas Turbine Parts',
    shortName: 'Solar Turbines',
    manufacturer: 'Solar Turbines (Caterpillar)',
    family: 'Solar industrial gas turbines',
    metaTitle: 'Solar Turbines Spare Parts – Centaur, Taurus, Mars & Titan Components',
    metaDescription:
      'Source Solar Turbines gas turbine spare parts by part number. AGO Aviation supplies Centaur, Taurus, Mars and Titan compressor, turbine, fuel and control components worldwide.',
    summary:
      'Compressor, turbine, fuel and control spares for Solar Centaur, Taurus, Mars and Titan units.',
    intro: [
      'Solar Turbines packages, including the Centaur, Taurus, Mars and Titan families, are widely used in oil and gas, industrial power and mechanical-drive service. Their packaged design means that engine, fuel and control components must be identified as a system.',
      'AGO Aviation supports Solar Turbines operators with part-number-led sourcing across compressor, turbine, fuel and control hardware. We confirm the package model and configuration before quoting and can work from drawings and samples where the reference is unclear.',
    ],
    sourcing: [
      'Compressor blades, vanes, seals and case components',
      'Turbine nozzles, blades and hot section hardware',
      'Fuel nozzles, valves, manifolds and actuators',
      'Control cards, sensors and package instrumentation',
    ],
    verification: sharedVerification,
    partFamilies: [
      { name: 'Compressors & pumps', href: COMPRESSOR, note: 'Compressor and accessory components.' },
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Turbine and hot section hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Fuel and package flow control.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Control and protection hardware.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['rolls-royce-avon', 'zorya-mashproekt', 'ge-lm2500'],
    faqs: [
      {
        question: 'Which Solar Turbines families do you support?',
        answer:
          'We support Centaur, Taurus, Mars and Titan packages, subject to verification of the exact model, part number and configuration.',
      },
      {
        question: 'Can you supply Solar package accessories?',
        answer:
          'Yes. We source engine and package-level components, including fuel, control and monitoring hardware, where the configuration can be confirmed.',
      },
      {
        question: 'How do I request a Solar Turbines quote?',
        answer:
          'Send the part number, package model, quantity and destination to sale@agoaviation.com and our team will confirm availability and documentation.',
      },
    ],
    keywords: [
      'Solar Turbines spare parts',
      'Solar Centaur parts',
      'Solar Taurus parts',
      'Solar Mars parts',
      'Solar Titan turbine components',
    ],
  },
  {
    slug: 'bently-nevada-3300-3500',
    name: 'Bently Nevada 3300 & 3500 Monitoring System Parts',
    shortName: 'Bently Nevada 3300/3500',
    manufacturer: 'Bently Nevada (Baker Hughes)',
    family: 'Condition monitoring & protection systems',
    metaTitle: 'Bently Nevada 3300 & 3500 Spare Parts – Probes, Monitors & Modules',
    metaDescription:
      'Source Bently Nevada 3300 and 3500 series spare parts by part number. AGO Aviation supplies proximity probes, transmitters, monitor cards, power supplies and modules with verification and worldwide delivery.',
    summary:
      'Proximity probes, monitor cards, power supplies and modules for Bently Nevada 3300/3500 systems.',
    intro: [
      'Bently Nevada 3300 and 3500 series systems provide vibration, proximity and position monitoring for rotating machinery. The 3300 family is now largely legacy, while the 3500 platform remains common in new and upgraded plants, so both obsolescence and revision compatibility matter.',
      'AGO Aviation supports 3300 and 3500 users with part-number-led sourcing of probes, transmitters, monitor cards, power supplies and interface modules. We confirm the system architecture, slot configuration and revision before quoting.',
    ],
    sourcing: [
      '3300 XL proximity probes, extension cables and transmitters',
      '3500 monitor cards, I/O modules, power supplies and relay modules',
      '3300 and 3500 interface, communication and display hardware',
      'Proximity, vibration, speed and position sensors',
    ],
    verification: [
      'Model, series, slot and revision checked against the existing rack configuration before quotation.',
      'Probe, cable and transmitter compatibility confirmed as a set rather than as isolated items.',
      'Documentation and configuration notes reviewed before dispatch where the system requires them.',
    ],
    partFamilies: [
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Probes, transmitters and monitoring sensors.' },
      { name: 'Automation & controls', href: AUTOMATION, note: 'Monitor cards, modules and power supplies.' },
      { name: 'Electrical & motors', href: ELECTRICAL, note: 'Power and interface components.' },
      { name: 'Mechanical & bearings', href: MECHANICAL, note: 'Machine protection and bearing monitoring context.' },
    ],
    relatedBrands: ['bently-nevada', 'ge', 'siemens'],
    relatedPlatforms: ['ge-mark-iv-v', 'woodward-controls', 'ge-frame-7'],
    faqs: [
      {
        question: 'Do you supply Bently Nevada 3300 XL probes?',
        answer:
          'Yes. We source 3300 XL probes, extension cables and transmitters, subject to verification of the model, cable length and system compatibility.',
      },
      {
        question: 'Can you supply 3500 monitor cards and power supplies?',
        answer:
          'We source 3500 monitor cards, I/O modules, power supplies and relay modules. The slot configuration and revision are confirmed before quotation.',
      },
      {
        question: 'Why does the rack configuration matter?',
        answer:
          'A 3500 or 3300 system is built from compatible modules, probes and cables. Supplying an isolated part without checking the rack can create a mismatch, so we verify the full set.',
      },
    ],
    keywords: [
      'Bently Nevada 3300 spare parts',
      'Bently Nevada 3500 spare parts',
      '3300 XL proximity probe',
      '3500 monitor card',
      'Bently Nevada vibration monitoring',
    ],
  },
  {
    slug: 'ge-mark-iv-v',
    name: 'GE Mark IV & Mark V Speedtronic Control Parts',
    shortName: 'GE Mark IV/V',
    manufacturer: 'GE (General Electric)',
    family: 'Turbine control systems',
    metaTitle: 'GE Mark IV & Mark V Speedtronic Parts – DS3800 & DS3820 Control Cards',
    metaDescription:
      'Source GE Mark IV and Mark V Speedtronic spare parts by part number. AGO Aviation supplies DS3800, DS3820 and related control cards, power supplies and modules with verification and worldwide delivery.',
    summary:
      'DS3800, DS3820 and related control cards, power supplies and modules for GE Mark IV/V systems.',
    intro: [
      'GE Mark IV and Mark V Speedtronic systems still control a large installed base of Frame and LM gas turbines. The hardware is legacy, so board-level failures, power-supply ageing and revision mismatches are common reasons operators need a verified spare quickly.',
      'AGO Aviation supports Mark IV and Mark V users with part-number-led sourcing of DS3800, DS3820 and related control cards, power supplies and interface modules. We confirm the board revision, slot and system configuration before quoting.',
    ],
    sourcing: [
      'DS3800 and DS3820 control, I/O and communication cards',
      'Power supplies, relay modules and interface hardware',
      'Mark IV and Mark V processor and memory boards',
      'Related sensors, cables and termination components',
    ],
    verification: [
      'Board number, revision and slot checked against the installed Mark IV/V rack before quotation.',
      'Configuration and firmware context reviewed where the board stores site-specific logic.',
      'Photographs and connector details requested when the original label is damaged.',
    ],
    partFamilies: [
      { name: 'Automation & controls', href: AUTOMATION, note: 'Control cards, modules and power supplies.' },
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Sensors and monitoring interfaces.' },
      { name: 'Electrical & motors', href: ELECTRICAL, note: 'Power and protection components.' },
      { name: 'Turbine & hot gas path parts', href: TURBINE, note: 'Mechanical spares for the controlled machine.' },
    ],
    relatedBrands: ['ge', 'bently-nevada', 'woodward'],
    relatedPlatforms: ['ge-frame-5', 'ge-frame-6', 'bently-nevada-3300-3500'],
    faqs: [
      {
        question: 'Do you supply DS3800 and DS3820 cards?',
        answer:
          'Yes. We source DS3800, DS3820 and related Mark IV/V control cards, subject to verification of the board revision, slot and system configuration.',
      },
      {
        question: 'Can you help when the board label is unreadable?',
        answer:
          'Send clear photographs of the board, connectors and any visible markings. Our team will compare them with available records and propose the most likely reference for verification.',
      },
      {
        question: 'Why is revision matching important for Mark IV/V boards?',
        answer:
          'Different revisions and configurations may not be interchangeable in a legacy rack. We confirm the installed revision and slot before quoting so the replacement matches the system.',
      },
    ],
    keywords: [
      'GE Mark IV spare parts',
      'GE Mark V Speedtronic parts',
      'DS3800 control card',
      'DS3820 module',
      'GE Speedtronic spare parts',
    ],
  },
  {
    slug: 'woodward-controls',
    name: 'Woodward Governor & Control System Parts',
    shortName: 'Woodward',
    manufacturer: 'Woodward',
    family: 'Turbine control & fuel systems',
    metaTitle: 'Woodward Spare Parts – Governors, Actuators & Control Components',
    metaDescription:
      'Source Woodward governor and control system spare parts by part number. AGO Aviation supplies actuators, positioners, control modules and fuel-system components with verification and worldwide delivery.',
    summary:
      'Governors, actuators, positioners and control modules for Woodward-equipped turbines.',
    intro: [
      'Woodward governors, actuators and control modules are used across gas and steam turbines, compressors and industrial prime movers. Many installed systems are legacy, so the part number, revision and mechanical interface must be confirmed together.',
      'AGO Aviation supports Woodward users with part-number-led sourcing of governors, actuators, positioners and control modules. We verify the model and interface before quoting and can work from nameplates and photographs where the label is unclear.',
    ],
    sourcing: [
      'Governors, actuators and positioners',
      'Control modules, cards and interface hardware',
      'Fuel-system valves and linkage components',
      'Sensors, feedback devices and accessories',
    ],
    verification: [
      'Model, part number and mechanical interface checked before quotation.',
      'Electrical and signal compatibility confirmed against the existing control scheme.',
      'Nameplate, linkage and connector details reviewed when the label is unclear.',
    ],
    partFamilies: [
      { name: 'Automation & controls', href: AUTOMATION, note: 'Governors, control modules and interface hardware.' },
      { name: 'Valves & actuators', href: VALVES, note: 'Actuators, positioners and fuel-system valves.' },
      { name: 'Instrumentation', href: INSTRUMENTATION, note: 'Sensors and feedback devices.' },
      { name: 'Mechanical & bearings', href: MECHANICAL, note: 'Linkage and mechanical interface components.' },
    ],
    relatedBrands: ['woodward', 'ge', 'bently-nevada'],
    relatedPlatforms: ['ge-mark-iv-v', 'ge-frame-5', 'bently-nevada-3300-3500'],
    faqs: [
      {
        question: 'Do you supply legacy Woodward governors?',
        answer:
          'Yes. We support legacy Woodward governors and control hardware, subject to verification of the model, part number and mechanical interface.',
      },
      {
        question: 'Can you cross-reference a Woodward part number?',
        answer:
          'Where records allow, we can identify current or equivalent references. Send the old number, nameplate details and photographs of the unit.',
      },
      {
        question: 'Do you supply Woodward actuators and positioners?',
        answer:
          'We source actuators, positioners and related fuel-system components, with electrical and mechanical compatibility confirmed before quotation.',
      },
    ],
    keywords: [
      'Woodward spare parts',
      'Woodward governor parts',
      'Woodward actuator',
      'Woodward control module',
      'Woodward turbine controls',
    ],
  },
];

export function getPlatform(slug: string): Platform | undefined {
  return platforms.find((platform) => platform.slug === slug);
}

export function getAllPlatforms(): Platform[] {
  return platforms;
}

export function getPlatformSlugs(): string[] {
  return platforms.map((platform) => platform.slug);
}
