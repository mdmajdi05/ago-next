'use client';

import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, MessageCircle, X } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const mainNavLinks = [
  { title: 'Home', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'Brands', href: '/brands' },
  { title: 'Categories', href: '/categories' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
];

const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsappNumber}`;

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <React.Fragment>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-border bg-white text-primary hover:bg-primary hover:text-secondary transition-colors"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <React.Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-black/[0.45] backdrop-blur-sm transition-opacity"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-full max-w-[340px] bg-white border-r border-border shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <span className="font-bold text-lg text-primary tracking-tight">
                  AGO Aviation
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="p-2 text-text-muted hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-6 py-4 space-y-1" aria-label="Mobile navigation">
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-accent hover:text-primary rounded-lg transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>

              <div className="p-6 border-t border-border">
                <a
                  href={WHATSAPP_URL}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <MessageCircle size={16} />
                  Enquire on WhatsApp
                </a>
                <p className="mt-3 text-xs text-text-muted text-center">
                  {siteConfig.businessHours.days} • {siteConfig.businessHours.hours}
                </p>
              </div>
            </motion.aside>
          </React.Fragment>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
