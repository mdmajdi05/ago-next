import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactForm } from './ContactForm';
import { getAll as getAllBrands } from '@/services/brandService';
import { siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact AGO Aviation – Spare Parts Quotes & Support',
  description:
    'Contact AGO Aviation for gas turbine and industrial spare parts. Email sale@agoaviation.com, call +91 7011123269 or send your part number for availability, lead time and pricing.',
  path: '/contact',
  keywords: [
    'contact AGO Aviation',
    'gas turbine spare parts quote',
    'industrial spare parts enquiry',
    'gas turbine parts supplier contact',
  ],
  image: '/assets/img/engine-lm2500-banner.jpg',
  imageAlt: 'Contact AGO Aviation for gas turbine spare parts',
});

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}`;

const contactCards = [
  {
    icon: 'fa-solid fa-phone',
    title: 'Helpline',
    text: '+91 7011123269 — 24/7 AOG and breakdown support',
    href: `tel:+${siteConfig.phoneRaw}`,
  },
  {
    icon: 'fa-solid fa-envelope',
    title: 'Sales & quotations',
    text: 'Quotes, availability and lead times',
    href: `mailto:${siteConfig.email.sales}`,
  },
  {
    icon: 'fa-solid fa-envelope',
    title: 'Support desk',
    text: 'Technical follow-up, shipping and documentation',
    href: `mailto:${siteConfig.email.support}`,
  },
  {
    icon: 'fa-brands fa-whatsapp',
    title: 'WhatsApp',
    text: 'Message our team directly',
    href: whatsappUrl,
  },
];

export default async function ContactPage() {
  const brands = await getAllBrands();

  return (
    <main>
      <section className="ago-page-hero">
        <div className="ago-container">
          <div className="ago-page-hero__inner">
            <span className="ago-eyebrow">Contact</span>
            <h1>Talk to an engineer, not a call centre</h1>
            <p>
              Send a part number, nameplate photo or equipment model. We reply with availability,
              condition, documentation and lead time.
            </p>
            <div className="ago-page-hero__actions">
              <Link href={`tel:+${siteConfig.phoneRaw}`} className="ago-btn ago-btn--primary">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                +91 7011123269
              </Link>
            </div>
          </div>
        </div>
      </section>

      <nav className="ago-crumbs" aria-label="Breadcrumb">
        <div className="ago-container">
          <Link href="/">Home</Link>
          <span className="ago-crumbs__sep">/</span>
          <span>Contact</span>
        </div>
      </nav>

      <section className="ago-section">
        <div className="ago-container">
          <div className="ago-grid ago-grid--2" style={{ alignItems: 'start' }}>
            <div>
              <ContactForm brands={brands} />
            </div>

            <div>
              <div className="ago-section__head" style={{ marginBottom: '18px' }}>
                <span className="ago-eyebrow ago-eyebrow--navy">Direct lines</span>
                <h2 className="ago-title">Direct lines to our team</h2>
              </div>
              <div className="ago-grid ago-grid--2">
                {contactCards.map((item) => (
                  <a key={item.title} href={item.href} className="ago-card ago-card--hover" target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>
                    <span className="ago-card__icon ago-card--accent">
                      <i className={item.icon} aria-hidden="true" />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
