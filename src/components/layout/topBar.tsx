import Link from 'next/link';
import { siteConfig } from '@/config/site';

const socials = [
  { label: 'Facebook', icon: 'fa-brands fa-facebook-f', url: siteConfig.socials.facebook.url },
  { label: 'X', icon: 'fa-brands fa-x-twitter', url: siteConfig.socials.x.url },
  { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: siteConfig.socials.linkedin.url },
  { label: 'Instagram', icon: 'fa-brands fa-instagram', url: siteConfig.socials.instagram.url },
  { label: 'Pinterest', icon: 'fa-brands fa-pinterest-p', url: siteConfig.socials.pinterest.url },
];

export function TopBar() {
  return (
    <div id="ago-site-topbar" className="site-topbar">
      <span aria-hidden="true" className="site-topbar-glow" />
      <span aria-hidden="true" className="site-topbar-shine" />
      <div className="site-topbar-inner">
        <div className="site-topbar-row">
          <div className="site-topbar-contact">
            <div className="top-contact-link">
              <ul className="top-contact-list">
                <li>
                  <a href={`mailto:${siteConfig.email.sales}`}>
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                    Mail - {siteConfig.email.sales}
                  </a>
                </li>
                <li>
                  <a href={`tel:${siteConfig.phoneRaw}`}>
                    <i className="fa-solid fa-phone" aria-hidden="true" />
                    {siteConfig.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="site-topbar-social">
            <div className="top-social-icon">
              <ul className="top-social-list">
                <li className="social-label">Follow Us:</li>
                {socials.map((social) => (
                  <li key={social.label}>
                    <Link href={social.url} aria-label={social.label} className="social-link">
                      <i className={social.icon} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
