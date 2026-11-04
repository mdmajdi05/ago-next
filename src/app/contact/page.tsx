import type { Metadata } from 'next';
import Link from 'next/link';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TopBar } from '@/components/layout/topBar';
import { ContactForm } from './ContactForm';
import { getAll as getAllBrands } from '@/services/brandService';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact AGO Aviation | 24/7 Spare Parts Desk',
  description:
    'Contact AGO Aviation for gas turbine and industrial spare parts. Call +91 7011123269, email sale@agoaviation.com or send a part. Request a quote from AGO Aviation.',
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: 'Contact AGO Aviation | 24/7 Spare Parts Desk',
    description:
      'Contact AGO Aviation for gas turbine and industrial spare parts. Call +91 7011123269, email sale@agoaviation.com or send a part. Request a quote from AGO Aviation.',
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.agoaviation.com/assets/img/engine-lm2500-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'AGO Aviation — gas turbine and industrial spare parts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AGO Aviation | 24/7 Spare Parts Desk',
    description:
      'Contact AGO Aviation for gas turbine and industrial spare parts. Call +91 7011123269, email sale@agoaviation.com or send a part. Request a quote from AGO Aviation.',
    images: ['https://www.agoaviation.com/assets/img/engine-lm2500-banner.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}`;
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address.formatted)}&output=embed`;

const socialLinks = [
  {
    url: siteConfig.socials.facebook.url,
    icon: 'fa-brands fa-facebook-f',
    label: 'Facebook',
  },
  {
    url: siteConfig.socials.x.url,
    icon: 'fa-brands fa-x-twitter',
    label: 'X',
  },
  {
    url: siteConfig.socials.linkedin.url,
    icon: 'fa-brands fa-linkedin-in',
    label: 'LinkedIn',
  },
  {
    url: siteConfig.socials.instagram.url,
    icon: 'fa-brands fa-instagram',
    label: 'Instagram',
  },
  {
    url: siteConfig.socials.pinterest.url,
    icon: 'fa-brands fa-pinterest-p',
    label: 'Pinterest',
  },
];

export default async function ContactPage() {
  const brands = await getAllBrands();

  return (
    <>
      <TopBar />
      <Header />

      <div className="bg-white">
        {/* Page hero */}
        <section className="py-14 lg:py-22 bg-soft border-b border-line">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                Contact
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight mb-4">
                Talk to an engineer, not a call centre
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-6">
                Send a part number, nameplate photo or equipment model. We
                reply with availability, condition, documentation and lead
                time.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`tel:+${siteConfig.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-white font-semibold hover:bg-primary-dark transition-colors"
                >
                  <i className="fa-solid fa-phone"></i>
                  <span>+91 7011123269</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted pb-4">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1" aria-hidden="true">
              <i className="fa-solid fa-chevron-right text-[10px] opacity-50"></i>
            </li>
            <li>
              <span className="text-ink font-semibold" aria-current="page">
                Contact
              </span>
            </li>
          </ol>
        </nav>

        {/* Contact section: form (left, 8 cols) + contact info (right, 4 cols) */}
        <section className="py-12 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-8">
                <ContactForm brands={brands} />
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-ink mb-2">
                    Direct lines to our team
                  </h2>
                  <p className="text-muted text-sm leading-relaxed">
                    The 24/7 desk is staffed for breakdowns. For planned
                    maintenance and quotations, email is usually fastest.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-line bg-white p-6 shadow">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <i className="fa-solid fa-phone"></i>
                      </div>
                      <div>
                        <Link
                          href={`tel:+${siteConfig.phoneRaw}`}
                          className="text-ink font-semibold text-sm hover:text-primary transition-colors"
                        >
                          Helpline
                        </Link>
                        <p className="text-muted text-sm leading-relaxed mt-1">
                          +91 7011123269 — 24/7 AOG and breakdown support
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-line bg-white p-6 shadow">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <i className="fa-solid fa-envelope"></i>
                      </div>
                      <div>
                        <Link
                          href={`mailto:${siteConfig.email.sales}`}
                          className="text-ink font-semibold text-sm hover:text-primary transition-colors"
                        >
                          Sales &amp; quotations
                        </Link>
                        <p className="text-muted text-sm leading-relaxed mt-1">
                          Quotes, availability and lead times
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-line bg-white p-6 shadow">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <i className="fa-solid fa-envelope"></i>
                      </div>
                      <div>
                        <Link
                          href={`mailto:${siteConfig.email.support}`}
                          className="text-ink font-semibold text-sm hover:text-primary transition-colors"
                        >
                          Customer support
                        </Link>
                        <p className="text-muted text-sm leading-relaxed mt-1">
                          Orders, documentation and after-sales
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-line bg-white p-6 shadow">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <i className="fa-solid fa-location-dot"></i>
                      </div>
                      <div>
                        <h3 className="text-ink font-semibold text-sm">
                          Head office
                        </h3>
                        <p className="text-muted text-sm leading-relaxed mt-1">
                          {siteConfig.address.formatted}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-line bg-white p-6 shadow">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <i className="fa-solid fa-clock"></i>
                      </div>
                      <div>
                        <h3 className="text-ink font-semibold text-sm">
                          Business hours
                        </h3>
                        <p className="text-muted text-sm leading-relaxed mt-1">
                          {siteConfig.businessHours.days},{' '}
                          {siteConfig.businessHours.hours} IST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 text-ink font-semibold hover:bg-[#ffc46b]/10 transition-colors"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                  <span>Enquire on WhatsApp</span>
                </Link>

                <div className="rounded-lg border border-line bg-white p-6 shadow">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                    Find us on the map
                  </h3>
                  <div className="aspect-[4/3] rounded-lg border border-line bg-[#eef2f7] flex flex-col items-center justify-center p-4">
                    <i className="fa-solid fa-map-marker-alt text-muted mb-2"></i>
                    <p className="text-xs text-muted text-center">
                      Map placeholder
                    </p>
                  </div>
                  <p className="mt-3 text-xs text-muted leading-relaxed">
                    {siteConfig.address.formatted}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                    Follow us
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <Link
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-9 h-9 rounded-lg border border-line bg-white flex items-center justify-center text-primary hover:bg-[#ffc46b]/10 transition-colors"
                        aria-label={social.label}
                      >
                        <i className={social.icon}></i>
                        <i
                          className="fa-solid fa-arrow-up-right-from-square absolute right-1 top-1 w-3 h-3 text-[10px] opacity-50"
                        ></i>
                      </Link>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted leading-relaxed">
                    Links open in a new tab{' '}
                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-50 inline"></i>
                  </p>
                </div>
              </div>
            </div>

            {/* Map (full width, below the contact grid) */}
            <div className="mt-12 lg:mt-16">
              <iframe
                src={mapEmbedUrl}
                title="AGO Aviation head office location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="w-full h-[400px] rounded-lg border border-line shadow-sm"
              />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
