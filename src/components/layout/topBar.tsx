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
      className="text-white"
      style={{
        background: 'linear-gradient(90deg, #061a30 0%, #014a8e 58%, #0a63bd 100%)',
      }}
    >
      <div className="mx-auto max-w-[1320px] px-12 w-full">
        <div className="flex min-h-[44px] gap-6 flex-col md:flex-row justify-between">
          {/* Left: contact (email + phone) */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <Link
              href={`mailto:${siteConfig.email.sales}`}
              className="flex items-center gap-1.5 text-[12px] font-medium text-white/90 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-envelope text-[12px]"></i>
              {siteConfig.email.sales}
            </Link>
            <Link
              href={`tel:${siteConfig.phoneRaw}`}
              className="flex items-center gap-1.5 text-[12px] font-medium text-white/90 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-phone text-[12px]"></i>
              {siteConfig.phone}
            </Link>
          </div>

          {/* Right: follow us + social icons */}
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="text-[13px] font-medium text-white/70 whitespace-nowrap">
              Follow Us:
            </span>
            {SOCIALS.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 bg-white/10 text-white text-[12px] flex items-center justify-center hover:bg-secondary hover:text-ink hover:-translate-y-1 transition-all duration-200"
                aria-label={social.name}
              >
                <i className={social.icon} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
