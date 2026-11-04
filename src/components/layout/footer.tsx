import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import { navigationConfig } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { getAll as getAllCategories } from '@/services/categoryService';
const SOCIAL_LINKS = [
  { name: 'Facebook', url: siteConfig.socials.facebook.url, Icon: Facebook },
  { name: 'Instagram', url: siteConfig.socials.instagram.url, Icon: Instagram },
  { name: 'LinkedIn', url: siteConfig.socials.linkedin.url, Icon: Linkedin },
  { name: 'X', url: siteConfig.socials.x.url, Icon: X },
];

const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsappNumber}`;

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="ago-container section-padding">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-10">
          {/* Company */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3" aria-label="AGO Aviation home">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.logoAlt}
                width={170}
                height={48}
                className="h-9 w-auto"
                priority
              />
              <span className="sr-only">AGO Aviation</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed mb-5">
              {siteConfig.tagline}
            </p>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-[3px] text-primary-light" />
                <p className="leading-tight">
                  {siteConfig.address.street}, {siteConfig.address.city},{' '}
                  {siteConfig.address.state} {siteConfig.address.postalCode}
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-primary-light" />
                <a href={`tel:+${siteConfig.phoneRaw}`} className="hover:text-primary transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-primary-light" />
                <a href={`mailto:${siteConfig.email.contact}`} className="hover:text-primary transition-colors">
                  {siteConfig.email.contact}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 shrink-0 text-primary-light" />
                <span>
                  {siteConfig.businessHours.days}, {siteConfig.businessHours.hours}
                </span>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="p-2 rounded-md text-text-muted hover:bg-primary hover:text-white transition-colors"
                >
                  <social.Icon width={16} height={16} className="shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-primary text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {navigationConfig.footerNav.quickLinks.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-bold text-primary text-sm uppercase tracking-wider mb-5">
              Product Categories
            </h3>
            <ul className="space-y-2.5">
              {getAllCategories().map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div>
            <h3 className="font-bold text-primary text-sm uppercase tracking-wider mb-5">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-text-muted mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-[3px] text-primary-light" />
                <p className="leading-tight">
                  {siteConfig.address.city}, {siteConfig.address.state}, India
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-primary-light" />
                <a href={`tel:+${siteConfig.phoneRaw}`} className="hover:text-primary transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-primary-light" />
                <a href={`mailto:${siteConfig.email.sales}`} className="hover:text-primary transition-colors">
                  {siteConfig.email.sales}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 shrink-0 text-primary-light" />
                <a href={WHATSAPP_URL} className="hover:text-primary transition-colors">
                  WhatsApp Enquiry
                </a>
              </li>
            </ul>
            <form action="#" method="POST" className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              />
              <button
                type="submit"
                className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-ago-mist">
        <div className="ago-container py-4 md:py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-text-muted">
              &copy; {new Date().getFullYear()} AGO Aviation. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="p-1.5 rounded-md text-text-muted hover:bg-primary hover:text-white transition-colors"
                >
                  <social.Icon className="w-3.5 h-3.5 shrink-0" />
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                className="text-xs font-medium text-primary hover:underline transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
