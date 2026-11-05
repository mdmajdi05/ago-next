import Link from 'next/link';
import { siteConfig } from '@/config/site';

const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsappNumber}`;

export function FloatBar() {
  return (
    <div className="ago-float" aria-label="Quick actions">
      <Link href="/contact" className="ago-float__contact" aria-label="Contact us">
        <span className="ago-float__contact-icon">
          <i className="fa-solid fa-headset" aria-hidden="true" />
        </span>
        <span>Contact us</span>
      </Link>

      <div className="ago-float__stack">
        <Link href={WHATSAPP_URL} className="ago-float__btn ago-float__btn--wa" aria-label="WhatsApp us">
          <i className="fa-brands fa-whatsapp" aria-hidden="true" />
        </Link>

        <Link href="#top" className="ago-float__btn ago-float__btn--top" aria-label="Back to top">
          <i className="fa-solid fa-arrow-up" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
