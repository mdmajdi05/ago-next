import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

const stats = [
  { value: '356+', label: 'Precision Parts in Stock' },
  { value: '23+', label: 'Global Brands Supported' },
  { value: '9+', label: 'Product Categories' },
  { value: '25+ Years', label: 'Industry Experience' },
];

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'WS Turbomar Private Limited (AGO Aviation) is a New Delhi-based supplier of gas turbine, compressor, automation and industrial spare parts worldwide. Request a quote from AGO Aviation.',
  keywords: siteConfig.keywords as unknown as string[],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: 'About AGO Aviation | WS Turbomar Private Limited',
    description:
      'WS Turbomar Private Limited (AGO Aviation) is a New Delhi-based supplier of gas turbine, compressor, automation and industrial spare parts worldwide.',
    url: `${siteConfig.url}/about`,
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
    title: 'About AGO Aviation | WS Turbomar Private Limited',
    description:
      'WS Turbomar Private Limited (AGO Aviation) is a New Delhi-based supplier of gas turbine, compressor, automation and industrial spare parts worldwide.',
    images: [siteConfig.ogImage],
    creator: siteConfig.socials.x.handle,
  },
};

export default function AboutPage() {
  return (
    <main>
      <section className="ago-page-hero">
        <div className="ago-container">
          <div className="ago-page-hero__inner">
            <span className="ago-eyebrow">About us</span>
            <h1>A spare parts partner built around the outage clock</h1>
            <p>
              WS Turbomar Private Limited (AGO Aviation) supplies gas turbine, compressor,
              automation and industrial spare parts to power plants, oil &amp; gas operators,
              MROs and manufacturers worldwide.
            </p>
            <div className="ago-page-hero__actions">
              <Link href="/contact" className="ago-btn ago-btn--primary">
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <nav className="ago-crumbs" aria-label="Breadcrumb">
        <div className="ago-container">
          <Link href="/">Home</Link>
          <span className="ago-crumbs__sep">/</span>
          <span>About us</span>
        </div>
      </nav>

      <section className="ago-section">
        <div className="ago-container">
          <div className="ago-grid ago-grid--2" style={{ alignItems: 'center' }}>
            <div>
              <Image
                src="/images/about-img.webp"
                alt="AGO Aviation team coordinating a spare parts shipment"
                width={900}
                height={675}
                className="ago-media"
                priority
              />
            </div>

            <div>
              <span className="ago-eyebrow ago-eyebrow--navy">Who we are</span>
              <h2 className="ago-title">One desk for the parts nobody wants to wait for</h2>
              <p className="ago-lead">
                Founded in 2015 and headquartered in New Delhi, WS Turbomar Private Limited began by
                supporting aviation operators and grew into a broader industrial spare parts supplier as
                customers asked us to solve the same problem across their turbine and compressor fleets.
              </p>
              <p className="ago-lead">
                Today we combine an approved global supplier network with in-house inspection and export
                coordination. That means a single purchase order can cover hot gas path components,
                control cards, instrumentation, valves, filters and motors — consolidated and shipped together.
              </p>
              <ul className="ago-list">
                {[
                  'Genuine OEM, OEM-equivalent and serviceable options',
                  'Certificate of conformance and traceability records',
                  '24/7 AOG and breakdown response',
                  'Worldwide freight, customs and insurance handled',
                ].map((item) => (
                  <li key={item}>
                    <i className="fa-solid fa-check" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="ago-section ago-section--surface">
        <div className="ago-container">
          <div className="ago-section__head ago-section__head--center">
            <span className="ago-eyebrow">What we stand for</span>
            <h2 className="ago-title">Four commitments we do not trade away</h2>
          </div>
          <div className="ago-grid ago-grid--4">
            {[
              {
                icon: 'fa-solid fa-check-circle',
                title: 'Verifiable quality',
                text: 'Every part is inspected against OEM documentation before dispatch. Condition, origin and paperwork are confirmed in writing, not assumed.',
              },
              {
                icon: 'fa-solid fa-bolt',
                title: 'Speed without shortcuts',
                text: 'Our 24/7 desk responds to breakdowns around the clock, with expedited freight and hands-on support through customs and delivery.',
              },
              {
                icon: 'fa-solid fa-user-tie',
                title: 'Engineer-led service',
                text: 'The people answering your RFQ understand turbine frames, part numbers and interchangeability — so the first reply is usually the right one.',
              },
              {
                icon: 'fa-solid fa-plane',
                title: 'Export-ready by default',
                text: 'Documentation, packing and logistics are built for international shipments to plants, workshops and warehouses in more than 40 countries.',
              },
            ].map((value) => (
              <article key={value.title} className="ago-card ago-card--hover">
                <span className="ago-card__icon">
                  <i className={value.icon} aria-hidden="true" />
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ago-section">
        <div className="ago-container">
          <div className="ago-grid ago-grid--2" style={{ alignItems: 'center' }}>
            <div>
              <span className="ago-eyebrow ago-eyebrow--navy">Why operators choose us</span>
              <h2 className="ago-title">Direct communication, proper documentation, and real availability</h2>
              <p className="ago-lead">
                We do not hide behind a generic sales desk. We act as a technical point of contact for
                clearance, interchangeability and documentation, which helps you move from enquiry to
                release without second guessing the details.
              </p>
              <ul className="ago-list">
                {[
                  'Cross-referenced to OEM, drawing or interchange list',
                  'Inspection and traceability aligned to your requirement',
                  'Export &amp; customs support for international delivery',
                  'Regular updates until the part arrives at your site',
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
                src="/images/about-team.jpg"
                alt="AGO Aviation parts and inspection team"
                width={900}
                height={675}
                className="ago-media"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="ago-section ago-section--surface">
        <div className="ago-container">
          <div className="ago-section__head ago-section__head--center">
            <span className="ago-eyebrow">Results</span>
            <h2 className="ago-title">Fast response, clear answers, fewer surprises</h2>
          </div>
          <div className="ago-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="ago-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
