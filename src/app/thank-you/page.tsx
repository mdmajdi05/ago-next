import type { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Thank You – Your Enquiry Is With Our Team',
  description:
    'Thank you for contacting AGO Aviation. Our gas turbine spare parts team is reviewing your requirement and will respond with availability, condition, documentation and lead time.',
  path: '/thank-you',
  noIndex: true,
});

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}`;

const nextSteps = [
  {
    icon: 'fa-solid fa-clipboard-check',
    title: 'Requirement review',
    text:
      'We check the part number, equipment model and quantity against our catalogue and supplier network — including obsolete and hard-to-find references.',
  },
  {
    icon: 'fa-solid fa-file-invoice-dollar',
    title: 'Quote and lead time',
    text:
      'You receive a written quote covering condition, documentation, freight and delivery estimate, usually within one business day.',
  },
  {
    icon: 'fa-solid fa-truck-fast',
    title: 'Dispatch and tracking',
    text:
      'On approval we reserve the stock, pack for export and share tracking until the part reaches your site.',
  },
];

export default function ThankYouPage() {
  return (
    <main>
      <section className="ago-page-hero">
        <div className="ago-container">
          <div
            className="ago-page-hero__inner mx-auto text-center"
            style={{ textAlign: 'center', marginInline: 'auto' }}
          >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#10b981]/10 text-4xl text-[#10b981]">
              <i className="fa-solid fa-circle-check" aria-hidden="true" />
            </div>
            <span className="ago-eyebrow">Enquiry received</span>
            <h1>Thank you — our team is on it</h1>
            <p>
              We have your requirement. A gas turbine spares specialist will review the details and
              come back with availability, condition, documentation and lead time.
            </p>
            <div
              className="ago-page-hero__actions"
              style={{ justifyContent: 'center' }}
            >
              <Link href="/products" className="ago-btn ago-btn--primary">
                Browse the catalogue
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="ago-btn ago-btn--serve"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <nav className="ago-crumbs" aria-label="Breadcrumb">
        <div className="ago-container">
          <Link href="/">Home</Link>
          <span className="ago-crumbs__sep">/</span>
          <span>Thank you</span>
        </div>
      </nav>

      <section className="ago-section">
        <div className="ago-container">
          <div className="ago-section__head ago-section__head--center">
            <span className="ago-eyebrow ago-eyebrow--navy">What happens next</span>
            <h2 className="ago-title">From requirement to part on site</h2>
            <p className="ago-lead">
              No call centres and no automated replies — your enquiry goes straight to the engineers
              who source and verify the part.
            </p>
          </div>

          <div className="ago-grid ago-grid--3">
            {nextSteps.map((step) => (
              <article key={step.title} className="ago-card ago-card--hover">
                <span className="ago-card__icon">
                  <i className={step.icon} aria-hidden="true" />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ago-section ago-section--surface">
        <div className="ago-container">
          <div className="ago-grid ago-grid--2" style={{ alignItems: 'center' }}>
            <div>
              <span className="ago-eyebrow">Need it urgently?</span>
              <h2 className="ago-title">AOG and breakdown support, 24/7</h2>
              <p className="ago-lead">
                If the equipment is down, call or message us directly. Our AOG desk checks
                availability, arranges expedited freight and keeps you updated until the part is on
                site.
              </p>

              <ul className="ago-list">
                <li>
                  <i className="fa-solid fa-check" aria-hidden="true" />
                  <span>Availability confirmed against live stock and partner inventory</span>
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden="true" />
                  <span>Hand-carry and next-flight-out options for critical outages</span>
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden="true" />
                  <span>Documentation and traceability pack with every shipment</span>
                </li>
              </ul>
            </div>

            <div className="ago-grid ago-grid--2">
              <a href={`tel:+${siteConfig.phoneRaw}`} className="ago-card ago-card--hover">
                <span className="ago-card__icon ago-card--accent">
                  <i className="fa-solid fa-phone" aria-hidden="true" />
                </span>
                <h3>Call the helpline</h3>
                <p>{siteConfig.phone} — 24/7 AOG and breakdown support</p>
              </a>

              <a href={`mailto:${siteConfig.email.sales}`} className="ago-card ago-card--hover">
                <span className="ago-card__icon ago-card--accent">
                  <i className="fa-solid fa-envelope" aria-hidden="true" />
                </span>
                <h3>Email sales</h3>
                <p>{siteConfig.email.sales}</p>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="ago-card ago-card--hover"
              >
                <span className="ago-card__icon ago-card--accent">
                  <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                </span>
                <h3>WhatsApp</h3>
                <p>Share a nameplate photo or part number directly</p>
              </a>

              <Link href="/contact" className="ago-card ago-card--hover">
                <span className="ago-card__icon ago-card--accent">
                  <i className="fa-solid fa-paper-plane" aria-hidden="true" />
                </span>
                <h3>Send another enquiry</h3>
                <p>Have a second part or a full spares list? Send it here</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ago-section ago-section--tight">
        <div className="ago-container">
          <div className="ago-section__head ago-section__head--center" style={{ marginBottom: 0 }}>
            <h2 className="ago-title">While you wait, explore our spares catalogue</h2>
            <p className="ago-lead">
              Over 52,000 gas turbine, compressor and industrial spare parts, searchable by part
              number, brand and platform.
            </p>
            <div className="ago-page-hero__actions" style={{ justifyContent: 'center' }}>
              <Link href="/products" className="ago-btn ago-btn--primary">
                Search by part number
              </Link>
              <Link href="/" className="ago-btn ago-btn--serve">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
