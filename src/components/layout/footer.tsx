import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { navigationConfig } from '@/config/navigation';
import { getAll as getAllCategories } from '@/services/categoryService';

const SOCIAL_LINKS = [
  { name: 'Facebook', url: siteConfig.socials.facebook.url, icon: 'fa-brands fa-facebook-f' },
  { name: 'Instagram', url: siteConfig.socials.instagram.url, icon: 'fa-brands fa-instagram' },
  { name: 'LinkedIn', url: siteConfig.socials.linkedin.url, icon: 'fa-brands fa-linkedin-in' },
  { name: 'X', url: siteConfig.socials.x.url, icon: 'fa-brands fa-x-twitter' },
] as const;

export function Footer() {
  const categories = getAllCategories();
  const year = new Date().getFullYear();

  return (
    <footer
      id="ago-site-footer"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fafd,#e9eef6)] pt-[80px] pb-[44px] border-t border-line"
    >
      {/* Decorative radial gradients */}
      <span
        className="absolute top-0 left-0 w-[700px] h-[500px] -translate-x-1/3 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_20%_20%,rgba(1,74,142,0.08)_0,transparent_50%)] pointer-events-none"
        aria-hidden="true"
      />
      <span
        className="absolute top-0 right-0 w-[700px] h-[500px] -translate-x-2/3 -translate-y-1/3 rounded-full bg-[radial-gradient(ellipse_at_80%_80%,rgba(240,169,69,0.07)_0,transparent_50%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1320px] px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Company */}
          <div className="flex flex-col items-center text-center gap-4 order-first lg:order-first">
            <div className="relative inline-block">
              <Link href="/" className="footer-logo-link" aria-label="AGO Aviation home">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.logoAlt}
                  width={176}
                  height={50}
                  priority
                  className="w-[176px] h-auto block"
                />
              </Link>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-[260px] mx-auto">
              {siteConfig.tagline}
            </p>
            <div className="flex gap-3 justify-center mt-4">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-line-2 bg-white/80 text-primary flex items-center justify-center hover:bg-secondary hover:text-secondary hover:-translate-y-1 transition-all duration-200"
                  aria-label={social.name}
                >
                  <i className={social.icon} />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-4 block">
              Quick Links
            </h3>
            <ul className="space-y-0">
              {navigationConfig.footerNav.quickLinks.items.map((item) => (
                <li key={item.href} className="pb-2">
                  <Link
                    href={item.href}
                    className="text-sm text-muted hover:text-primary transition-colors duration-200 block px-3 py-1.5 rounded-lg hover:bg-soft"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-4 block">
              Product Categories
            </h3>
            <ul className="space-y-0">
              {categories.map((category) => (
                <li key={category.slug} className="pb-2">
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-sm text-muted hover:text-primary transition-colors duration-200 block px-3 py-1.5 rounded-lg hover:bg-soft"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-4 block">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-muted mb-6">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-map-marker-alt shrink-0 mt-[3px] text-primary" />
                <p className="leading-tight">
                  {siteConfig.address.city}, {siteConfig.address.state}, India
                </p>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-phone shrink-0 text-primary" />
                <Link
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="text-ink hover:text-primary transition-colors"
                >
                  {siteConfig.phone}
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-envelope shrink-0 text-primary" />
                <Link
                  href={`mailto:${siteConfig.email.sales}`}
                  className="text-ink hover:text-primary transition-colors"
                >
                  {siteConfig.email.sales}
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-brands fa-whatsapp shrink-0 text-primary" />
                <Link
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  className="text-ink hover:text-primary transition-colors"
                >
                  WhatsApp Enquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-line pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-circle-info text-muted" />
            <span className="text-[11px] text-muted">
              © {year} AGO Aviation. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <strong className="text-[11px] text-ink">Operational</strong>
            </div>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.filter(
                (social) =>
                  social.name === 'Facebook' || social.name === 'X' || social.name === 'LinkedIn'
              ).map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-muted hover:text-primary transition-colors"
                >
                  {social.name}
                </Link>
              ))}
              <Link
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                className="text-[11px] text-primary font-medium hover:underline transition-colors"
              >
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
