import React from 'react';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  X,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import type { ComponentType } from 'react';

type SocialLink = {
  name: string;
  url: string;
  Icon: ComponentType;
};

const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Facebook', url: siteConfig.socials.facebook.url, Icon: Facebook },
  { name: 'Instagram', url: siteConfig.socials.instagram.url, Icon: Instagram },
  { name: 'LinkedIn', url: siteConfig.socials.linkedin.url, Icon: Linkedin },
  { name: 'X', url: siteConfig.socials.x.url, Icon: X },
];

export function TopBar() {
  return (
    <div className="border-y border-border bg-ago-mist">
      <div className="ago-container px-3 md:px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 py-2">
          <div className="flex items-center gap-4 text-xs md:text-sm text-text-muted">
            <a
              href={`mailto:${siteConfig.email.sales}`}
              className="flex items-center gap-1.5 hover:text-primary hover:underline transition-colors"
            >
              <Mail className="w-3 h-3 shrink-0" />
              {siteConfig.email.sales}
            </a>
            <a
              href={`tel:+${siteConfig.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-primary hover:underline transition-colors"
            >
              <Phone className="w-3 h-3 shrink-0" />
              {siteConfig.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-1.5 rounded-md text-text-muted hover:bg-primary hover:text-white transition-colors"
              >
                <span className="w-3 h-3 shrink-0">
  <social.Icon />
</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
