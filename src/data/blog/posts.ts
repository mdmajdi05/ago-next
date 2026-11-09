export type BlogPostType = 'Blog' | 'Case Study';

export interface BlogSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  date: string;
  datePublished: string;
  dateModified: string;
  category: string;
  type: BlogPostType;
  image: string;
  imageAlt: string;
  keywords: string[];
  readingTime: string;
  intro: string;
  sections: BlogSection[];
  faqs: BlogFaq[];
  relatedCategories: string[];
  relatedBrands: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'case-study-pre-staging-hot-gas-path-parts-frame-6',
    title:
      'Case study: pre-staging hot gas path parts for a Frame 6 outage',
    seoTitle:
      'Frame 6 Hot Gas Path Parts Case Study – Outage Pre-Staging',
    description:
      'How AGO Aviation turned a Frame 6 inspection scope into a verified, pre-staged hot gas path spares list before the outage window opened. Read the case study and request a similar plan.',
    excerpt:
      'How a planned inspection scope was translated into a staged spares list, with part numbers and documentation verified before the outage window opened.',
    date: '02 Oct 2026',
    datePublished: '2026-10-02',
    dateModified: '2026-10-02',
    category: 'Outage support',
    type: 'Case Study',
    image: '/images/engine-6000.jpeg',
    imageAlt:
      'Gas turbine hot gas path components prepared for a planned Frame 6 outage',
    keywords: [
      'Frame 6 hot gas path parts',
      'gas turbine outage spares',
      'combustion liner',
      'transition piece',
      'turbine nozzle',
      'pre-staged spare parts',
    ],
    readingTime: '4 min read',
    intro:
      'A power producer planning a Frame 6 combustion inspection needed confidence that every hot gas path part would be on site before the unit came offline. The risk was not availability alone: it was matching the exact configuration, revision and documentation to the scope.',
    sections: [
      {
        heading: 'The requirement',
        paragraphs: [
          'The operator had a draft inspection scope covering combustion liners, transition pieces, crossfire tubes, seals and selected turbine nozzles. Several part numbers had been superseded, and the site held a mix of original and previously repaired components. The team needed a single verified list before releasing the outage window.',
        ],
      },
      {
        heading: 'What AGO Aviation did',
        bullets: [
          'Mapped every line item against the site nameplate, drawings and existing repair records.',
          'Flagged superseded and cross-referenced part numbers before quotation.',
          'Separated parts that could be supplied immediately from those requiring lead-time confirmation.',
          'Grouped the list by outage sequence so the crew could stage parts by work package.',
          'Provided documentation and inspection status for each supplied item.',
        ],
      },
      {
        heading: 'The outcome',
        paragraphs: [
          'The customer received a staged spares plan that matched the inspection scope, not just a price list. Critical items were reserved early, the remaining lines were scheduled around the outage sequence, and the site avoided the common delay caused by discovering a wrong revision after the unit was already open.',
        ],
      },
      {
        heading: 'Replicate this for your next outage',
        paragraphs: [
          'Send AGO Aviation your inspection scope, unit frame or model, and the part numbers you already hold. Our team will check availability, flag supersessions and help you build a staged list before the outage window opens.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can AGO Aviation help plan a Frame 6 hot gas path outage?',
        answer:
          'Yes. Share the inspection scope, frame model and existing part numbers, and our team will build a verified spares list with availability and lead-time guidance.',
      },
      {
        question: 'Do you check superseded part numbers?',
        answer:
          'Yes. We cross-reference superseded and legacy part numbers against drawings, nameplates and catalogue records before quoting.',
      },
    ],
    relatedCategories: ['turbine-parts'],
    relatedBrands: ['ge'],
  },
  {
    slug: 'case-study-cross-referencing-obsolete-compressor-control-part',
    title:
      'Case study: cross-referencing an obsolete compressor control part',
    seoTitle:
      'Obsolete Compressor Control Part Cross-Reference Case Study',
    description:
      'A legacy compressor control part with no current OEM listing was matched using drawings, nameplate data and dimensional checks. See how AGO Aviation verified the replacement before supply.',
    excerpt:
      'A legacy part number with no current OEM listing was matched using drawings, nameplate data and dimensional checks before supply.',
    date: '18 Sep 2026',
    datePublished: '2026-09-18',
    dateModified: '2026-09-18',
    category: 'Obsolescence',
    type: 'Case Study',
    image: '/images/engine-lm2500-banner.jpg',
    imageAlt:
      'Industrial compressor and turbine package used for an obsolescence case study',
    keywords: [
      'obsolete compressor part',
      'legacy part cross reference',
      'compressor control valve',
      'obsolescence sourcing',
      'part number verification',
    ],
    readingTime: '4 min read',
    intro:
      'Obsolete parts rarely fail politely. A compressor control component had been out of production for years, the OEM listing was no longer current, and the plant could not afford to guess at a replacement. The only safe route was evidence-based cross-referencing.',
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'The site supplied an old part number, a photograph and a partial drawing. The nameplate was worn, and no current catalogue entry matched the number exactly. Installing the wrong component risked poor control response, leakage or repeat downtime.',
        ],
      },
      {
        heading: 'Verification steps',
        bullets: [
          'Compared mounting dimensions, port sizes, travel and actuation type against the drawing.',
          'Checked the nameplate data and the surrounding assembly for configuration clues.',
          'Searched legacy catalogues and cross-reference tables for equivalent model families.',
          'Confirmed materials and pressure ratings with the customer before offering an alternative.',
          'Documented the evidence trail so the site could approve the replacement internally.',
        ],
      },
      {
        heading: 'Result',
        paragraphs: [
          'A compatible replacement was identified and supplied with a clear cross-reference record. The customer retained the documentation for their maintenance file, and the plant avoided both a prolonged shutdown and an unverified substitution.',
        ],
      },
      {
        heading: 'Have an obsolete part?',
        paragraphs: [
          'Send us the old part number, photos, nameplate details and any drawings you hold. AGO Aviation specialises in tracing legacy and obsolete gas turbine and industrial components through documented cross-referencing.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What information helps identify an obsolete part?',
        answer:
          'Photos, nameplate details, drawings, dimensions, the parent assembly and any repair history all help. Even a partial part number can be useful.',
      },
      {
        question: 'Can you supply without an OEM part number?',
        answer:
          'In many cases yes, provided the form, fit and function can be verified from drawings, nameplate data or dimensional checks.',
      },
    ],
    relatedCategories: ['compressor-parts', 'valves-actuators'],
    relatedBrands: ['atlas-copco', 'siemens'],
  },
  {
    slug: 'gas-turbine-spare-parts-procurement-checklist',
    title: 'Gas turbine spare parts procurement: a practical checklist',
    seoTitle:
      'Gas Turbine Spare Parts Procurement Checklist – 8 Steps',
    description:
      'Use this eight-step gas turbine spare parts procurement checklist to verify part numbers, documentation, supplier evidence and delivery before you place an order.',
    excerpt:
      'A step-by-step process for identifying a requirement, checking documentation, comparing offers and planning delivery.',
    date: '15 Oct 2026',
    datePublished: '2026-10-15',
    dateModified: '2026-10-15',
    category: 'Procurement guide',
    type: 'Blog',
    image: '/images/engine-portfolio-banner.webp',
    imageAlt:
      'Gas turbine engine and component portfolio for spare parts sourcing',
    keywords: [
      'gas turbine spare parts procurement',
      'spare parts checklist',
      'part number verification',
      'supplier evaluation',
      'gas turbine spares',
    ],
    readingTime: '6 min read',
    intro:
      'Procuring a gas turbine spare part is not the same as buying a catalogue item. The part must match the installed configuration, arrive within the maintenance window and come with enough documentation to satisfy engineering and quality teams. This checklist keeps the process disciplined.',
    sections: [
      {
        heading: '1. Define the requirement precisely',
        bullets: [
          'Record the part number exactly as it appears on the nameplate or drawing.',
          'Add the unit model, frame or package, serial number and location.',
          'Note the quantity required and whether it is a planned replacement or a breakdown.',
        ],
      },
      {
        heading: '2. Verify the part number and revision',
        paragraphs: [
          'Check for superseded numbers, dash-number variants and configuration-specific suffixes. A part number that looks correct can still be wrong for the installed revision. When the number is unclear, request a cross-reference rather than guessing.',
        ],
      },
      {
        heading: '3. Confirm condition and documentation',
        bullets: [
          'Decide whether new, refurbished or as-removed condition is acceptable.',
          'Ask for inspection reports, certificates and traceability where required.',
          'Confirm that the documentation will be supplied with the part, not after delivery.',
        ],
      },
      {
        heading: '4. Compare supplier evidence, not just price',
        paragraphs: [
          'A low price is meaningless if the supplier cannot explain how the part was identified, inspected or packed. Ask for the evidence trail: part-number cross-reference, inspection scope, packing method and delivery commitment.',
        ],
      },
      {
        heading: '5. Plan delivery around the outage',
        paragraphs: [
          'Confirm lead time in writing, including any inspection or documentation steps. For critical items, agree a staged delivery or pre-staging plan so the crew is not waiting on the last part when the unit is already open.',
        ],
      },
      {
        heading: '6. Keep a decision record',
        paragraphs: [
          'File the verified part number, supplier evidence, inspection result and delivery dates. The record shortens the next procurement cycle and gives quality teams a defensible audit trail.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What should a gas turbine spare parts enquiry include?',
        answer:
          'Include the part number, unit model or frame, serial number, quantity, required condition and delivery deadline. Photos and drawings help when the part number is unclear.',
      },
      {
        question: 'How do I avoid buying the wrong revision?',
        answer:
          'Cross-check the nameplate, drawing and installed configuration, and ask the supplier to confirm supersessions and suffix differences in writing.',
      },
      {
        question: 'Can AGO Aviation pre-stage parts for an outage?',
        answer:
          'Yes. We can group parts by work package and schedule delivery around your outage sequence.',
      },
    ],
    relatedCategories: ['turbine-parts', 'compressor-parts'],
    relatedBrands: ['ge', 'siemens'],
  },
  {
    slug: 'gas-turbine-outage-spares-planning',
    title: 'Gas turbine outage spares planning: build a reliable list',
    seoTitle:
      'Gas Turbine Outage Spares Planning – Build a Reliable List',
    description:
      'Turn inspection scope, failure history and lead-time risk into a practical gas turbine outage spares plan. Includes a prioritisation model and enquiry checklist.',
    excerpt:
      'Turn inspection scope, failure history and lead-time risk into a practical outage inventory plan.',
    date: '08 Oct 2026',
    datePublished: '2026-10-08',
    dateModified: '2026-10-08',
    category: 'Maintenance planning',
    type: 'Blog',
    image: '/images/engine-lm2500-banner.jpg',
    imageAlt:
      'Industrial gas turbine used to illustrate maintenance outage spares planning',
    keywords: [
      'gas turbine outage planning',
      'outage spares list',
      'maintenance inventory',
      'lead time risk',
      'gas turbine spare parts',
    ],
    readingTime: '5 min read',
    intro:
      'The most expensive outage part is the one that arrives after the unit is already open. A reliable spares plan connects the inspection scope to real lead times, condition risk and the order in which work will actually happen.',
    sections: [
      {
        heading: 'Start with the inspection scope',
        paragraphs: [
          'List the work packages and the parts each one may require. Separate confirmed replacements from contingency items. The goal is not to order everything; it is to know what must be on site before a specific work package starts.',
        ],
      },
      {
        heading: 'Rank every line by risk',
        bullets: [
          'Critical: stops the outage if missing, long lead time, no on-site spare.',
          'High: likely to be replaced, moderate lead time, limited alternative.',
          'Medium: contingency item with a workaround or repair option.',
          'Low: consumable or long-life item that can be replenished later.',
        ],
      },
      {
        heading: 'Check the real lead time',
        paragraphs: [
          'Lead time includes identification, inspection, documentation and packing, not only transit. For legacy parts, add time for cross-referencing. For repaired parts, add the repair cycle. Confirm the dates in writing and build a buffer for the critical lines.',
        ],
      },
      {
        heading: 'Stage by work package, not by supplier',
        paragraphs: [
          'Parts are often delivered in supplier batches but needed in outage sequence. Ask for a staging plan that groups deliveries by the work package and date they are required. Label each package with the part number and work package reference.',
        ],
      },
      {
        heading: 'Keep a live contingency list',
        paragraphs: [
          'Inspection findings change the scope. Keep a short list of approved contingency parts and suppliers so the team can react without starting a new procurement cycle from zero.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How early should outage spares be ordered?',
        answer:
          'Order critical and long-lead items as soon as the scope is credible. Legacy or repaired parts often need the most lead time.',
      },
      {
        question: 'What is outage pre-staging?',
        answer:
          'Pre-staging means reserving, inspecting and delivering parts in the sequence the outage crew will need them, rather than in one delivery batch.',
      },
      {
        question: 'Can AGO Aviation help prioritise an outage list?',
        answer:
          'Yes. Send the scope and required dates, and we will flag availability, lead time and supersession risk line by line.',
      },
    ],
    relatedCategories: ['turbine-parts', 'mechanical-transmission-bearings'],
    relatedBrands: ['ge', 'siemens', 'bently-nevada'],
  },
  {
    slug: 'gas-turbine-hot-gas-path-parts-guide',
    title: 'Gas turbine hot gas path parts: functions, wear and sourcing',
    seoTitle:
      'Gas Turbine Hot Gas Path Parts Guide – Liners, Nozzles, Blades',
    description:
      'Understand combustion liners, transition pieces, turbine nozzles, blades and shrouds, how they wear and what to verify before sourcing replacements.',
    excerpt:
      'Understand the roles of combustion liners, transition pieces, nozzles, blades and shrouds without guessing interchangeability.',
    date: '24 Sep 2026',
    datePublished: '2026-09-24',
    dateModified: '2026-09-24',
    category: 'Component guide',
    type: 'Blog',
    image: '/images/engine-6000.jpeg',
    imageAlt:
      'Gas turbine system representing hot gas path components and inspection planning',
    keywords: [
      'hot gas path parts',
      'combustion liner',
      'transition piece',
      'turbine nozzle',
      'turbine blade',
      'turbine shroud',
    ],
    readingTime: '7 min read',
    intro:
      'Hot gas path components see the highest temperatures and the most aggressive operating conditions in a gas turbine. They are also the parts most often replaced during inspections. Understanding what each component does makes sourcing and inspection decisions safer.',
    sections: [
      {
        heading: 'Combustion liners',
        paragraphs: [
          'The liner contains the flame and shapes the combustion process. It is exposed to high temperature, thermal cycling and pressure pulsation. Cracks, oxidation, distortion and hot spots are common. When sourcing a liner, verify the cooling configuration, fuel nozzle interface and any repair history.',
        ],
      },
      {
        heading: 'Transition pieces',
        paragraphs: [
          'The transition piece carries hot gas from the combustor to the turbine inlet. It must seal against the liner and the first-stage nozzle while accommodating thermal growth. Wear at seals, cracks and distortion are key inspection points.',
        ],
      },
      {
        heading: 'Turbine nozzles and blades',
        bullets: [
          'Nozzles accelerate and direct hot gas into the first rotating stage.',
          'Blades extract work from the gas stream and are sensitive to cooling-path condition.',
          'Buckets and blades should be checked for creep, coating loss, tip clearance and root damage.',
          'Nozzle and blade part numbers often carry configuration suffixes that must match the unit.',
        ],
      },
      {
        heading: 'Shrouds and seals',
        paragraphs: [
          'Shrouds control tip clearance and protect the casing. Seal segments limit leakage between stages. Clearance loss and seal wear directly affect efficiency, so these parts should be assessed together with blades and nozzles.',
        ],
      },
      {
        heading: 'What to verify before sourcing',
        bullets: [
          'Exact part number and dash-number suffix.',
          'Unit frame or model and serial number.',
          'Whether the part is new, refurbished or serviceable as-removed.',
          'Required documentation and inspection scope.',
          'Interchangeability across revisions — never assume.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the hot gas path?',
        answer:
          'The hot gas path is the route combustion gas takes from the combustor through the turbine nozzles, blades and shrouds. These parts face the highest temperatures and stresses.',
      },
      {
        question: 'Which hot gas path parts wear fastest?',
        answer:
          'Combustion liners, transition pieces, first-stage nozzles, blades and shrouds typically experience the highest thermal load and wear.',
      },
      {
        question: 'Can AGO Aviation supply hot gas path parts by part number?',
        answer:
          'Yes. Send the part number, unit model and required condition, and we will verify availability and compatibility before quoting.',
      },
    ],
    relatedCategories: ['turbine-parts'],
    relatedBrands: ['ge', 'siemens'],
  },
  {
    slug: 'verify-gas-turbine-spare-part-number',
    title: 'How to verify a gas turbine spare part number before ordering',
    seoTitle:
      'How to Verify a Gas Turbine Spare Part Number Before Ordering',
    description:
      'Use nameplates, drawings, revisions, configuration records and supplier evidence to confirm a gas turbine spare part number before you order.',
    excerpt:
      'Use nameplates, drawings, revisions, configuration records and supplier evidence to reduce mismatch risk.',
    date: '12 Sep 2026',
    datePublished: '2026-09-12',
    dateModified: '2026-09-12',
    category: 'Part identification',
    type: 'Blog',
    image: '/images/cfm-56-turbine.webp',
    imageAlt:
      'Turbine engine image accompanying a guide to checking spare part numbers',
    keywords: [
      'verify gas turbine part number',
      'spare part identification',
      'nameplate data',
      'part number cross reference',
      'superseded part number',
    ],
    readingTime: '5 min read',
    intro:
      'A part number is only useful if it identifies the exact component installed on your unit. Small differences in suffix, revision or configuration can change fit, cooling, material or performance. Verification is a short, structured check that prevents expensive mismatches.',
    sections: [
      {
        heading: 'Use the nameplate first',
        paragraphs: [
          'The nameplate is the primary evidence for the unit and often for the component. Record the full model, serial number and part number exactly, including dashes and suffix characters. Photograph the plate rather than retyping it from memory.',
        ],
      },
      {
        heading: 'Check drawings and configuration records',
        bullets: [
          'Compare the drawing number and revision with the installed part.',
          'Look for configuration-specific suffixes that change interfaces or materials.',
          'Check maintenance records for previous repairs, replacements or upgrades.',
        ],
      },
      {
        heading: 'Ask for a documented cross-reference',
        paragraphs: [
          'If the number is superseded or obsolete, ask the supplier to show how the alternative was identified. A useful cross-reference includes the old number, the new number, the basis for equivalence and any differences the site must accept.',
        ],
      },
      {
        heading: 'Confirm before you commit',
        bullets: [
          'Quantity and required condition.',
          'Documentation and inspection requirements.',
          'Lead time and delivery point.',
          'Return or exchange terms if the part does not match.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What if I only have a partial part number?',
        answer:
          'Send the partial number, photos, nameplate data and the parent assembly details. We can often narrow the options through cross-referencing.',
      },
      {
        question: 'Are dash numbers important?',
        answer:
          'Yes. Dash numbers and suffixes can indicate different interfaces, materials or configurations. Always verify them against the installed part.',
      },
      {
        question: 'Can AGO Aviation verify a part number for me?',
        answer:
          'Yes. Share the details and our team will check the catalogue, cross-references and supersession history before quoting.',
      },
    ],
    relatedCategories: ['turbine-parts', 'instrumentation'],
    relatedBrands: ['ge', 'bently-nevada', 'siemens'],
  },
  {
    slug: 'evaluate-industrial-spare-parts-supplier',
    title: 'How to evaluate an industrial spare parts supplier',
    seoTitle:
      'How to Evaluate an Industrial Spare Parts Supplier – 7 Checks',
    description:
      'Compare traceability, inspection scope, commercial terms, export documentation and delivery commitments before choosing an industrial spare parts supplier.',
    excerpt:
      'Compare traceability, inspection scope, commercial terms, export documentation and delivery commitments.',
    date: '28 Aug 2026',
    datePublished: '2026-08-28',
    dateModified: '2026-08-28',
    category: 'Supplier evaluation',
    type: 'Blog',
    image: '/images/about-img.webp',
    imageAlt:
      'AGO Aviation team image accompanying industrial spare parts supplier evaluation guidance',
    keywords: [
      'industrial spare parts supplier',
      'supplier evaluation',
      'part traceability',
      'inspection documentation',
      'gas turbine spares supplier',
    ],
    readingTime: '5 min read',
    intro:
      'Industrial spare parts supply is a trust-heavy purchase. The part may look identical in a photograph, but the difference between a reliable supplier and a risky one usually sits in documentation, inspection and how clearly they communicate uncertainty.',
    sections: [
      {
        heading: '1. Can they identify the part?',
        paragraphs: [
          'A strong supplier asks for the unit model, part number, photos and drawings, and explains any supersession or cross-reference. A weak supplier quotes immediately without checking configuration.',
        ],
      },
      {
        heading: '2. What is the inspection scope?',
        bullets: [
          'Dimensional checks against the drawing or sample.',
          'Material and hardness verification where relevant.',
          'Visual and functional checks for refurbished parts.',
          'Clear statement of what was not inspected.',
        ],
      },
      {
        heading: '3. Is the documentation complete?',
        paragraphs: [
          'Ask for certificates, inspection reports, traceability and packing lists before shipment. Documentation should travel with the part, not arrive later after repeated follow-up.',
        ],
      },
      {
        heading: '4. Are commercial terms clear?',
        bullets: [
          'Incoterms and delivery point.',
          'Lead time and any inspection hold points.',
          'Payment terms and currency.',
          'Warranty, return and exchange conditions.',
        ],
      },
      {
        heading: '5. Can they support export and logistics?',
        paragraphs: [
          'For cross-border supply, confirm export documentation, packing standards and the ability to handle urgent shipments. A supplier who understands plant shutdown pressure plans logistics around the outage, not the other way round.',
        ],
      },
      {
        heading: '6. Do they communicate uncertainty honestly?',
        paragraphs: [
          'The best suppliers say when a part is not confirmed, when a lead time is provisional and when a cross-reference needs engineering approval. That honesty is a quality signal, not a weakness.',
        ],
      },
      {
        heading: '7. Can they show a track record?',
        paragraphs: [
          'Ask for examples of similar parts supplied, the verification steps used and how delivery was planned. Case evidence is more useful than a generic brochure.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the most important supplier check?',
        answer:
          'Part identification and traceability. If the supplier cannot explain how the part matches your unit, price and lead time are secondary.',
      },
      {
        question: 'Should I accept a part without documentation?',
        answer:
          'Only if the risk is understood and accepted internally. For critical or safety-related parts, documentation should be a condition of supply.',
      },
      {
        question: 'How does AGO Aviation support evaluation?',
        answer:
          'We provide part-number verification, inspection and documentation details, commercial terms and delivery planning before you commit.',
      },
    ],
    relatedCategories: ['turbine-parts', 'automation-controls'],
    relatedBrands: ['ge', 'siemens', 'abb'],
  },
  {
    slug: 'ge-frame-5-6-7-9',
    title: 'GE Frame 5, 6, 7 and 9: what differs across the fleet',
    seoTitle:
      'GE Frame 5, 6, 7 and 9 Gas Turbine Differences – Parts Guide',
    description:
      'Compare GE Frame 5, 6, 7 and 9 gas turbines by firing temperature, bucket metallurgy, cooling architecture and the spare parts that matter most for each frame.',
    excerpt:
      'Firing temperature, bucket metallurgy, cooling architecture and the spares that matter most for each frame.',
    date: '14 Aug 2026',
    datePublished: '2026-08-14',
    dateModified: '2026-08-14',
    category: 'GE platform guide',
    type: 'Blog',
    image: '/images/ge-general.jpeg',
    imageAlt:
      'GE gas turbine frame representing the Frame 5, 6, 7 and 9 platform guide',
    keywords: [
      'GE Frame 5',
      'GE Frame 6',
      'GE Frame 7',
      'GE Frame 9',
      'GE gas turbine parts',
      'frame differences',
    ],
    readingTime: '6 min read',
    intro:
      'GE Frame 5, 6, 7 and 9 machines share a family lineage but differ significantly in output, firing temperature, cooling and component design. For spare parts planning, the frame is only the starting point; the exact model, configuration and part number determine what fits.',
    sections: [
      {
        heading: 'Frame 5',
        paragraphs: [
          'Frame 5 machines are widely used in industrial and oil and gas applications. Many units have long service histories and a mix of original and upgraded components. Legacy part numbers, supersessions and repaired parts are common, so documentation matters as much as availability.',
        ],
      },
      {
        heading: 'Frame 6',
        paragraphs: [
          'Frame 6 units sit in a broad middle range and are common in combined-cycle and industrial duty. Hot gas path inspections often drive spares demand. Combustion liners, transition pieces, nozzles and shrouds should be verified against the exact model and revision.',
        ],
      },
      {
        heading: 'Frame 7',
        paragraphs: [
          'Frame 7 machines are larger and typically operate at higher firing temperatures. Cooling architecture and bucket metallurgy are more advanced, and part-number suffixes can reflect configuration-specific designs. Do not assume a part from another Frame 7 unit will fit.',
        ],
      },
      {
        heading: 'Frame 9',
        paragraphs: [
          'Frame 9 units are among the largest in the family and are often central to power generation capacity. Critical spares planning should account for long lead times, inspection requirements and the cost of any unplanned outage.',
        ],
      },
      {
        heading: 'What to verify across every frame',
        bullets: [
          'Exact model and serial number, not only the frame number.',
          'Part number with all suffixes and revision details.',
          'New, refurbished or as-removed condition.',
          'Documentation and inspection scope.',
          'Interchangeability across upgrades or fleet variants.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are Frame 5, 6, 7 and 9 parts interchangeable?',
        answer:
          'Generally no. Even within the same frame, model, configuration and revision differences can change fit and performance. Always verify the exact part number.',
      },
      {
        question: 'Which frame has the longest lead times?',
        answer:
          'Lead time depends on the part, condition and supplier, not only the frame. Critical hot gas path and large Frame 9 components often need the most planning.',
      },
      {
        question: 'Can AGO Aviation source parts for all four frames?',
        answer:
          'Yes. Send the frame, model, serial number and part number, and our team will check availability and compatibility.',
      },
    ],
    relatedCategories: ['turbine-parts'],
    relatedBrands: ['ge'],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
