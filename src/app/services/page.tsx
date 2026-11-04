import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

const agoContainer = 'max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8';

const sectionHead = (eyebrow: string, title: string, description?: string) => (
  <div className="text-center mb-14">
    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
      {eyebrow}
    </p>
    <h2 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight mb-4">{title}</h2>
    {description && (
      <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">{description}</p>
    )}
  </div>
);

const primaryBtn =
  'inline-flex items-center justify-center gap-2 bg-primary text-secondary font-semibold px-6 py-3 rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-colors duration-200 whitespace-nowrap';

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

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Gas turbine and industrial spare parts supply, obsolescence support, repair management, inventory planning and 24/7 AOG response from AGO Aviation. Request a quote.',
  keywords: siteConfig.keywords as unknown as string[],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: 'Services | Spare Parts Supply, Repair & AOG Support | AGO Aviation',
    description:
      'Gas turbine and industrial spare parts supply, obsolescence support, repair management, inventory planning and 24/7 AOG response from AGO Aviation.',
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.logoAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Spare Parts Supply, Repair & AOG Support | AGO Aviation',
    description:
      'Gas turbine and industrial spare parts supply, obsolescence support, repair management, inventory planning and 24/7 AOG response from AGO Aviation.',
    images: [siteConfig.ogImage],
    creator: siteConfig.socials.x.handle,
  },
};

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <section className="py-15 bg-soft">
        <div className={agoContainer}>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              Services
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight mb-4">
              More than a parts catalogue
            </h1>
            <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">
              Sourcing, inspection, repair coordination and export logistics — delivered by people
              who understand what a forced outage costs.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact" className={`${primaryBtn} text-sm`}>
              Discuss your requirement
              <i className="fa-solid fa-arrow-right text-[12px]"></i>
            </a>
          </div>
        </div>
      </section>

      <nav className="ago-crumbs" aria-label="Breadcrumb">
        <div className={agoContainer}>
          <Link href="/" className="text-muted text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-muted text-sm mx-1">/</span>
          <span className="text-ink text-sm font-medium">Services</span>
        </div>
      </nav>

      <section className="py-15">
        <div className={agoContainer}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="border border-line rounded-lg bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200"
              >
                <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <i className={service.icon}></i>
                </span>
                <h3 className="text-lg font-bold text-ink mb-3">{service.title}</h3>
                <p className="text-muted leading-relaxed">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-15 bg-soft">
        <div className={agoContainer}>
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                How we work
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-ink mb-4 tracking-tight">
                A documented process, every time
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Whether the requirement is a single filter or a full hot gas path set, the workflow
                is the same: confirm the reference, verify the source, document the part, ship it
                tracked.
              </p>
              <ul className="space-y-3">
                {[
                  'Cross-reference against OEM manuals and interchangeability lists',
                  'Supplier qualification and incoming inspection',
                  'Certificate of conformance and traceability pack',
                  'Freight booking, customs and delivery confirmation',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted leading-relaxed">
                    <i className="fa-solid fa-check mt-0.5 text-secondary shrink-0"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-first lg:order-last">
              <Image
                src="/images/service-4.jpg"
                alt="Inspection and documentation of a spare part"
                width={900}
                height={675}
                className="rounded-xl shadow-sm object-cover h-[460px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-15">
        <div className={agoContainer}>
          <div className="rounded-lg bg-white p-8 md:p-12 border border-line shadow-sm text-center">
            <h2 className="text-2xl font-bold text-ink mb-3">
              Have an outage window to plan for?
            </h2>
            <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Share your scope and target dates. We will map availability, lead times and
              alternatives before the window opens.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contact" className={`${primaryBtn} text-sm`}>
                Request a quote
                <i className="fa-solid fa-arrow-right text-[12px]"></i>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-ink border border-line font-semibold px-6 py-3 rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-colors duration-200 whitespace-nowrap text-sm"
              >
                <i className="fa-brands fa-whatsapp text-secondary"></i>
                WhatsApp the desk
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
