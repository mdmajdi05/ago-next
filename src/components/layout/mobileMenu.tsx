'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { getAll as getAllCategories } from '@/services/categoryService';

export interface NavLink {
  title: string;
  href: string;
}

export const mainNavLinks: NavLink[] = [
  { title: 'Home', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'Brands', href: '/brands' },
  { title: 'Stock', href: '/stock-and-inventory' },
  { title: 'Turbine Parts', href: '/categories/turbine-parts' },
  { title: 'Services', href: '/services' },
  { title: 'Insights', href: '/blog' },
  { title: 'Contact', href: '/contact' },
];

const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsappNumber}`;

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = useCallback(() => onClose(), [onClose]);
  const categories = getAllCategories();

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[9997] bg-black/45 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-1/2 -translate-x-1/2 top-[10px] mt-[70px] z-[9998] w-full max-w-[380px] bg-white/94 backdrop-blur-[14px] saturate-[160%] border border-[rgba(1,74,142,0.08)] border-r rounded-2xl shadow-[0_20px_50px_rgba(10,28,48,0.18)] p-6 sm:p-8 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(1,74,142,0.10)] mb-6">
              <span className="font-bold text-lg text-primary tracking-tight">
                AGO Aviation
              </span>
              <button
                type="button"
                onClick={close}
                className="p-2 text-muted hover:text-primary transition-colors"
                aria-label="Close menu"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <nav className="flex-1 space-y-0" aria-label="Mobile navigation">
              {mainNavLinks.map((link) => {
                const hasDropdown =
                  link.title === 'Products' || link.title === 'Turbine Parts';
                return (
                  <li key={link.href} className="mb-4 border-b border-[rgba(1,74,142,0.10)] pb-3 last:mb-0 last:border-0 last:pb-0">
                    <Link
                      href={link.href}
                      onClick={close}
                      className="flex items-center justify-between w-full px-0 py-3 text-[14px] text-ink rounded-lg transition-colors"
                    >
                      {link.title}
                      <i className="fa-solid fa-chevron-right text-xs opacity-60 transition-transform duration-300" />
                    </Link>
                    {hasDropdown && (
                      <ul className="mt-2 pl-3 space-y-1 border-l-2 border-primary/20">
                        {categories.map((category) => (
                          <li key={category.slug}>
                            <Link
                              href={`/categories/${category.slug}`}
                              onClick={close}
                              className="px-3 py-2 rounded-lg text-[12.5px] font-semibold text-[#44586e] leading-[1.35] hover:bg-soft hover:text-primary transition-colors duration-200 block"
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </nav>

            <div className="mt-6 p-4 border-t border-[rgba(1,74,142,0.10)]">
              <Link
                href={WHATSAPP_URL}
                className="w-full flex items-center justify-center gap-2 bg-primary text-secondary font-semibold uppercase text-[13px] px-[55px] py-[13px] rounded-[20px_0px] hover:bg-secondary hover:text-ink whitespace-nowrap transition-all duration-250"
              >
                <i className="fa-brands fa-whatsapp" />
                WhatsApp Enquiry
              </Link>
              <p className="mt-3 text-[12px] text-muted text-center">
                {siteConfig.businessHours.days} • {siteConfig.businessHours.hours}
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
