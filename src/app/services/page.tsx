import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildPageMetadata } from '@/lib/seo';

interface Service {
  icon: string;
  title: string;
  text: string;
}

const services: Service[] = [
  {
    icon: 'fa-solid fa-box',
    title: 'Gas turbine & industrial spare parts supply',
    text:
      'Genuine OEM, OEM-equivalent and serviceable parts for GE Frame 5/6/7/9, LM2500/LM6000, Siemens SGT, Alstom GT13E2/GT8C1-2, Ansaldo, Solar and Rolls-Royce machines — plus compressors, valves and controls.',
  },
  {
    icon: 'fa-solid fa-microchip',
    title: 'Control & automation obsolescence support',
    text:
      'Legacy Speedtronic, Mark V/VI, Bently Nevada 3500, Allen-Bradley SLC and ABB control hardware sourced, cross-referenced and tested where required.',
  },
  {
    icon: 'fa-solid fa-tools',
    title: 'Component repair management',
    text:
      'We coordinate repair and refurbishment of actuators, valves, pumps, cards and instrumentation with approved workshops, including inspection reports and warranty.',
  },
  {
    icon: 'fa-solid fa-calendar-check',
    title: 'Inventory & planned maintenance support',
    text:
      'Frame-specific stock lists, min/max recommendations and consignment or buffer stock arrangements so critical consumables are always on site.',
  },
  {
    icon: 'fa-solid fa-clock',
    title: '24/7 AOG & breakdown response',
    text:
      'A dedicated desk for unplanned outages: availability checks, expedited freight, hand-carry options and real-time tracking until the part is on site.',
  },
  {
    icon: 'fa-solid fa-ship',
    title: 'Export logistics & documentation',
    text:
      'Commercial invoicing, certificates of origin, packing lists, insurance and door-to-door freight to more than 40 countries.',
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: 'Services – Spare Parts Supply, Obsolescence & AOG Support',
  description:
    'Gas turbine and industrial spare parts supply, obsolescence and legacy part sourcing, repair coordination, inventory planning and urgent AOG response from AGO Aviation.',
  path: '/services',
  keywords: [
    'gas turbine spare parts services',
    'obsolescence sourcing',
    'AOG spares support',
    'repair management gas turbine',
    'inventory planning spare parts',
  ],
  image: '/images/engine-portfolio-banner.webp',
  imageAlt: 'AGO Aviation gas turbine spare parts services',
});

export default function ServicesPage() {
  return (
    <main>
      <section className="ago-page-hero">
        <div className="ago-container">
          <div className="ago-page-hero__inner">
            <span className="ago-eyebrow">Services</span>
            <h1>More than a parts catalogue</h1>
            <p>
              Sourcing, inspection, repair coordination and export logistics — delivered by people who
              understand what a forced outage costs.
            </p>
            <div className="ago-page-hero__actions">
              <Link href="/contact" className="ago-btn ago-btn--primary">
                Discuss your requirement
              </Link>
            </div>
          </div>
        </div>
      </section>

      <nav className="ago-crumbs" aria-label="Breadcrumb">
        <div className="ago-container">
          <Link href="/">Home</Link>
          <span className="ago-crumbs__sep">/</span>
          <span>Services</span>
        </div>
      </nav>

      <section className="ago-section">
        <div className="ago-container">
          <div className="ago-grid ago-grid--3">
            {services.map((service) => (
              <article key={service.title} className="ago-card ago-card--hover">
                <span className="ago-card__icon">
                  <i className={service.icon} aria-hidden="true" />
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ago-section ago-section--surface">
        <div className="ago-container">
          <div className="ago-grid ago-grid--2" style={{ alignItems: 'center' }}>
            <div>
              <span className="ago-eyebrow ago-eyebrow--navy">How we work</span>
              <h2 className="ago-title">A documented process, every time</h2>
              <p className="ago-lead">
                Whether the requirement is a single filter or a full hot gas path set, the workflow is the
                same: confirm the reference, verify the source, document the part, ship it tracked.
              </p>
              <ul className="ago-list">
                {[
                  'Cross-reference against OEM manuals and interchangeability lists',
                  'Supplier qualification and incoming inspection',
                  'Certificate of conformance and traceability pack',
                  'Freight booking, customs and delivery confirmation',
                ].map((item) => (
                  <li key={item}>
                    <i className="fa-solid fa-check" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Image
                src="/images/service-4.jpg"
                alt="Inspection and documentation of a spare part"
                width={900}
                height={675}
                className="ago-media"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="ago-section">
        <div className="ago-container">
          <div className="ago-section__head ago-section__head--center">
            <span className="ago-eyebrow">Call us now</span>
            <h2 className="ago-title">Need an urgent turbine part or a planned maintenance package?</h2>
          </div>
          <div className="ago-page-hero__actions" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="ago-btn ago-btn--primary">
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
