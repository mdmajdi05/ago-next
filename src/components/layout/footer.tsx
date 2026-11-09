import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Platforms & Models', href: '/platforms' },
  { label: 'Bently Nevada', href: '/brands/bently-nevada' },
  { label: 'Gas Turbines parts', href: '/products' },
  { label: 'Blog', href: '/blog' },
];

const usefulLinks = [
  { label: 'Disclaimer Policy', href: '/disclaimer' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap.xml' },
];

const socials = [
  { label: 'Facebook', icon: 'fa-brands fa-facebook-f', url: siteConfig.socials.facebook.url },
  { label: 'Instagram', icon: 'fa-brands fa-instagram', url: siteConfig.socials.instagram.url },
  { label: 'X', icon: 'fa-brands fa-twitter', url: siteConfig.socials.x.url },
  { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: siteConfig.socials.linkedin.url },
];

const contactRows = [
  {
    icon: 'fa-solid fa-location-dot',
    href: undefined,
    text: 'A- 24/5 3rd floor, NH - 19, Mohan Cooperative Industrial Estate, New Delhi, Delhi 110044',
    isAddress: true,
  },
  { icon: 'fa-solid fa-phone', href: 'tel:7011123269', text: '+91 7011123269' },
  { icon: 'fa-solid fa-envelope', href: 'mailto:sale@agoaviation.com', text: 'Mail - sale@agoaviation.com' },
  { icon: 'fa-solid fa-envelope', href: 'mailto:sale@agoaviation.com', text: 'Mail - sale@agoaviation.com' },
  { icon: 'fa-solid fa-envelope', href: 'mailto:support@agoaviation.com', text: 'Mail - support@agoaviation.com' },
];

export function Footer() {
  return (
    <footer id="ago-site-footer" className="site-footer">
      <div className="site-footer-line" aria-hidden="true" />
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-company">
            <div className="footer-logo">
              <Image
                src="/images/footer-logo.png"
                alt="footer-logo"
                width={375}
                height={219}
              />
            </div>

            <p>
              Ago Aviation is a gas turbine parts manufacturer and supplier shipping worldwide. Send your part
              number or drawing for a quote. Every order is quoted against your drawing, part number or OEM
              reference, so you know exactly what you are buying.
            </p>

            <div className="footer-icon">
              <ul>
                {socials.map((social) => (
                  <li key={social.label}>
                    <Link href={social.url} aria-label={social.label}>
                      <i className={social.icon} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Useful Links</h4>
            <ul>
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <div className="footer-links">
              <h4>Get In Touch</h4>
              <ul>
                {contactRows.map((row, index) => (
                  <li key={`${row.text}-${index}`}>
                    <span>
                      <i className={row.icon} aria-hidden="true" />
                    </span>
                    {row.href ? <Link href={row.href}>{row.text}</Link> : <p>{row.text}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="site-footer-bottom">
            <span className="site-footer-brand">
              <i className="fa-solid fa-plane" aria-hidden="true" />
              AGO Aviation <span>·</span> Gas turbine parts &amp; spares
            </span>

            <span className="site-footer-links">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/sitemap.xml">Sitemap</Link>
            </span>

            <Link href="/contact" className="site-footer-status">
              <i aria-hidden="true" />
              Gas turbine parts <strong>Worldwide</strong>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
