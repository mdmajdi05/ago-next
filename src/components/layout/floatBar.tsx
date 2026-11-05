import Link from 'next/link';
import { siteConfig } from '@/config/site';

const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsappNumber}`;

export function FloatBar() {
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3">
      <Link
        href="/contact"
        className="group inline-flex items-center gap-2 rounded-full border border-[rgba(14,49,86,0.18)] bg-white/90 px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-primary shadow-[0_10px_25px_rgba(10,28,48,0.12)] backdrop-blur-sm transition-all duration-250 hover:-translate-y-0.5 hover:border-[#f0a843] hover:bg-[#fdf1de]"
        aria-label="Contact us"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f0a843] text-[#10243a]">
          <i className="fa-solid fa-headset text-[12px]" />
        </span>
        Contact us
      </Link>

      <div className="flex flex-col gap-3">
        <Link
          href={WHATSAPP_URL}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(1,74,142,0.20)] bg-white shadow-[0_10px_25px_rgba(10,28,48,0.12)] text-[#25D366] transition-all duration-250 hover:-translate-y-0.5 hover:bg-[#25D366] hover:text-white"
          aria-label="WhatsApp us"
        >
          <i className="fa-brands fa-whatsapp text-[16px]" />
        </Link>

        <Link
          href="#top"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(1,74,142,0.20)] bg-white shadow-[0_10px_25px_rgba(10,28,48,0.12)] text-primary transition-all duration-250 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
          aria-label="Back to top"
        >
          <i className="fa-solid fa-arrow-up text-[15px]" />
        </Link>
      </div>
    </div>
  );
}
