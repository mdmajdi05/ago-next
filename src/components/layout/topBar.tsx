import Link from 'next/link';
import { siteConfig } from '@/config/site';

const SOCIALS = [
  { name: 'Facebook', url: siteConfig.socials.facebook.url, icon: 'fa-brands fa-facebook-f' },
  { name: 'X', url: siteConfig.socials.x.url, icon: 'fa-brands fa-x-twitter' },
  { name: 'LinkedIn', url: siteConfig.socials.linkedin.url, icon: 'fa-brands fa-linkedin-in' },
  { name: 'Instagram', url: siteConfig.socials.instagram.url, icon: 'fa-brands fa-instagram' },
  { name: 'Pinterest', url: siteConfig.socials.pinterest.url, icon: 'fa-brands fa-pinterest-p' },
] as const;

export function TopBar() {
  return (
    <div
      id="ago-site-topbar"
      className="relative z-1001"
      style={{
        background: '#071a2d',
        padding: '5px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.09)',
        color: 'rgba(239, 246, 252, 0.78)',
      }}
    >
      <div className="ago-container">
        <div
          className="flex flex-wrap items-center gap-0"
          style={{
            minHeight: '34px',
            display: 'flex',
            flexWrap: 'nowrap',
          }}
        >
          {/* Left: contact (50%) */}
          <div className="flex-0 w-1/2 max-w-1/2">
            <ul className="flex flex-wrap align-center gap-8px-22px list-none m-0 p-0"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px 22px',
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}
            >
              <li>
                <Link
                  href={`mailto:${siteConfig.email.sales}`}
                  className="text-[12px] transition-colors duration-200"
                  style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '12px' }}
                >
                  <i className="fa-solid fa-envelope text-secondary" style={{ marginRight: '7px', color: '#f0a843' }} />
                  {siteConfig.email.sales}
                </Link>
              </li>
              <li>
                <Link
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="text-[12px] transition-colors duration-200"
                  style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '12px' }}
                >
                  <i className="fa-solid fa-phone text-secondary" style={{ marginRight: '7px', color: '#f0a843' }} />
                  {siteConfig.phone}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: social (50%) */}
          <div className="flex-0 w-1/2 max-w-1/2 text-right">
            <ul className="flex flex-wrap items-center justify-end gap-10px-22px list-none m-0 p-0"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '10px 22px',
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}
            >
              {SOCIALS.map((social) => (
                <li key={social.name} style={{ margin: 0, color: 'rgba(239, 246, 252, 0.7)', fontSize: '11px' }}>
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[27px] h-[27px] rounded-full border border-white/13 bg-white/7 flex items-center justify-center text-white/86 text-[12px] hover:bg-secondary hover:text-[#071a2d] hover:border-secondary transition-all duration-200"
                    aria-label={social.name}
                  >
                    <i className={social.icon} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
