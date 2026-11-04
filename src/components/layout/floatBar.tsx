import React from 'react';
import Link from 'next/link';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';

const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsappNumber}`;

export function FloatBar() {
  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-3">
      <a
        href="#top"
        className="w-11 h-11 rounded-full border border-border bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
        aria-label="Back to top"
      >
        <ArrowUp className="w-[18px] h-[18px]" />
      </a>
      <a
        href={WHATSAPP_URL}
        className="w-11 h-11 rounded-full border border-border bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
        aria-label="WhatsApp us"
      >
        <MessageCircle className="w-[18px] h-[18px]" />
      </a>
    </div>
  );
}
