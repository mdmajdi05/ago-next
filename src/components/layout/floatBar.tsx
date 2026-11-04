import Link from 'next/link';
import { siteConfig } from '@/config/site';

const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsappNumber}`;

export function FloatBar() {
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-3">
      <Link
        href="#top"
        className="w-12 h-12 rounded-full border border-[rgba(1,74,142,0.20)] bg-white shadow-[0_10px_25px_rgba(10,28,48,0.12)] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-250"
        aria-label="Back to top"
      >
        <i className="fa-solid fa-arrow-up text-[15px]" />
      </Link>
      <Link
        href={WHATSAPP_URL}
        className="w-12 h-12 rounded-full border border-[rgba(1,74,142,0.20)] bg-white shadow-[0_10px_25px_rgba(10,28,48,0.12)] flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all duration-250"
        aria-label="WhatsApp us"
      >
        <i className="fa-brands fa-whatsapp text-[15px]" />
      </Link>
    </div>
  );
}
