import type { Metadata } from 'next';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  X,
  Linkedin,
  Instagram,
  ArrowUpRight,
} from 'lucide-react';

import { siteConfig } from '@/config/site';
import { getAll as getAllBrands } from '@/services/brandService';
import { ContactForm } from './ContactForm';
import { Brand } from '@/types/brand';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Reach AGO Aviation for gas turbine parts and spares. Email ${siteConfig.email.contact} or call ${siteConfig.phone}.`,
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: 'Contact Us | AGO Aviation',
    description: `Send your enquiry to AGO Aviation — gas turbine parts manufacturer & supplier worldwide.`,
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | AGO Aviation',
    description: `Send your enquiry to AGO Aviation — gas turbine parts manufacturer & supplier worldwide.`,
  },
};

const socialLinks = [
  { url: siteConfig.socials.facebook.url, Icon: Facebook, label: 'Facebook' },
  { url: siteConfig.socials.x.url, Icon: X, label: 'X' },
  { url: siteConfig.socials.linkedin.url, Icon: Linkedin, label: 'LinkedIn' },
  { url: siteConfig.socials.instagram.url, Icon: Instagram, label: 'Instagram' },
];

export default async function Contact() {
  const brands = await getAllBrands();

  return (
    <main className="bg-white">
      <section className="section-padding">
        <div className="ago-container">
          <div className="section-title">
            <h2>Contact Us</h2>
            <p>
              Have a requirement for gas turbine parts? Send us your enquiry and our
              technical team will respond promptly.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <ContactForm brands={brands} />
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="ago-card p-6">
                <h3 className="font-semibold text-primary mb-4">Get in Touch</h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-[3px]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-text">Office Address</p>
                      <p className="text-text-muted leading-relaxed">
                        {siteConfig.address.formatted}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-[3px]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-text">Phone</p>
                      <a
                        href={`tel:${siteConfig.phoneRaw}`}
                        className="text-text-muted hover:text-primary transition-colors"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-[3px]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-text">Email</p>
                      <a
                        href={`mailto:${siteConfig.email.contact}`}
                        className="text-text-muted hover:text-primary transition-colors"
                      >
                        {siteConfig.email.contact}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-[3px]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-text">Business Hours</p>
                      <p className="text-text-muted">
                        {siteConfig.businessHours.days}, {siteConfig.businessHours.hours}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="ago-card p-6">
                <h3 className="font-semibold text-primary mb-4">Find Us on the Map</h3>
                <div className="aspect-video bg-ago-mist border rounded-lg flex flex-col items-center justify-center gap-2 mb-3">
                  <MapPin className="w-8 h-8 text-text-muted" />
                  <p className="text-sm text-text-muted">Map placeholder</p>
                </div>
                <p className="text-sm text-text-muted">
                  {siteConfig.address.street}, {siteConfig.address.city},{' '}
                  {siteConfig.address.state} {siteConfig.address.postalCode}
                </p>
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-ago-gold text-ago-navy font-semibold rounded-lg uppercase tracking-wide text-sm hover:opacity-90 transition"
              >
                <span className="flex items-center gap-1">
                  <span aria-hidden="true">&#9742;</span>
                  WhatsApp Us
                </span>
              </a>

              <div className="ago-card p-6">
                <h3 className="font-semibold text-primary mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map(({ url, Icon: IconComponent, label }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener"
                      className="w-10 h-10 rounded-lg border border-border relative flex items-center justify-center text-primary hover:bg-accent hover:text-primary-dark transition"
                      aria-label={label}
                    >
                      <IconComponent className="w-5 h-5" />
                      <ArrowUpRight className="absolute right-1 top-1 w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
