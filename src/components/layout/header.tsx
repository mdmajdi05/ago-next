'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { TopBar } from './topBar';
import { MegaMenu } from './megaMenu';
import { MobileMenu, mainNavLinks } from './mobileMenu';
import { getAll as getAllCategories } from '@/services/categoryService';
import { getAll as getAllBrands } from '@/services/brandService';

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}`;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = getAllCategories();
  const brands = getAllBrands();
  const headerHeight = scrolled ? 56 : 68;

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  const headerStyle: React.CSSProperties = {
    position: 'sticky',
    top: '10px',
    background: `rgba(255, 255, 255, ${scrolled ? 0.94 : 0.86})`,
    backdropFilter: 'blur(18px) saturate(180%)',
    WebkitBackdropFilter: 'blur(18px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '22px',
    width: 'min(1360px, calc(100% - 24px))',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: `${headerHeight}px`,
    boxShadow: scrolled
      ? '0 12px 40px rgba(10,28,48,0.16), 0 0 0 1px rgba(1,74,142,0.12)'
      : '0 4px 20px rgba(10,28,48,0.08), 0 0 0 1px rgba(1,74,142,0.08)',
  };

  return (
    <>
      <TopBar />

      <header id="ago-site-header" style={headerStyle} aria-label="Primary navigation">
        <div className="mx-auto max-w-[1320px] px-12 w-full">
          <div className="flex items-center justify-between gap-4 h-full">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/" className="flex items-center" aria-label="AGO Aviation home">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.logoAlt}
                  width={125}
                  height={80}
                  priority
                  className={`w-auto filter:[grayscale(0.05)_brightness(1.05)] ${scrolled ? 'h-[56px]' : 'h-[80px]'}`}
                />
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex flex-1 items-center justify-center gap-x-1">
              <ul className="flex items-center gap-0 flex-wrap">
                {mainNavLinks.map((link) => {
                  const hasDropdown =
                    link.title === 'Products' || link.title === 'Turbine Parts';
                  return (
                    <li key={link.href} className="relative">
                      {hasDropdown ? (
                        <MegaMenu trigger={<Link href={link.href}>{link.title}</Link>}>
                          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-[460px]">
                            <div>
                              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-3 block">
                                Product Categories
                              </h3>
                              <ul className="space-y-0">
                                {categories.map((category) => (
                                  <li key={category.slug}>
                                    <Link
                                      href={`/categories/${category.slug}`}
                                      className="flex items-start gap-2 px-3 py-2 rounded-lg text-[12.5px] font-semibold tracking-wider text-[#44586e] leading-[1.35] hover:bg-soft hover:text-primary transition-colors duration-200"
                                    >
                                      <span className="flex shrink-0 mt-[3px] text-[7px] font-black text-secondary">
                                        ›
                                      </span>
                                      {category.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-3 block">
                                Shop by Brand
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {brands.slice(0, 12).map((brand) => (
                                  <Link
                                    key={brand.slug}
                                    href={`/brands/${brand.slug}`}
                                    className="px-3 py-2 rounded-lg border border-transparent text-[12.5px] font-semibold tracking-wider text-[#44586e] leading-[1.35] hover:bg-soft hover:text-primary transition-colors duration-200 whitespace-nowrap"
                                  >
                                    {brand.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </MegaMenu>
                      ) : (
                        <Link
                          href={link.href}
                          className="relative inline-flex items-center gap-1.5 min-h-[60px] px-4 py-2 text-[13.5px] font-semibold tracking-wider uppercase text-ink transition-colors hover:text-primary hover:underline"
                        >
                          {link.title}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Search + WhatsApp CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <div className="relative flex items-center w-[min(420px,100%)]">
                <form
                  role="search"
                  className="flex items-center w-full bg-soft rounded-full border border-line px-3 py-2 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary transition-colors duration-200"
                >
                  <i className="fa-solid fa-magnifying-glass text-muted shrink-0" />
                  <input
                    type="search"
                    placeholder="Search spare parts"
                    className="bg-transparent w-full text-sm placeholder:text-muted outline-none"
                    aria-label="Search spare parts"
                  />
                  <button
                    type="submit"
                    className="ml-2 flex h-8 w-8 items-center justify-center rounded-full text-white transition-all duration-200 bg-gradient-to-r from-[#061a30] via-[#014a8e] to-[#0a63bd]"
                    aria-label="Search"
                  >
                    <i className="fa-solid fa-magnifying-glass" />
                  </button>
                </form>
              </div>
              <Link
                href={whatsappUrl}
                className="inline-flex items-center justify-center gap-2 bg-primary text-secondary font-semibold uppercase text-[13px] px-[55px] py-[13px] rounded-[20px_0px] hover:bg-secondary hover:text-ink whitespace-nowrap transition-all duration-250"
                aria-label="Enquire on WhatsApp"
              >
                <i className="fa-brands fa-whatsapp" />
                WhatsApp
              </Link>
            </div>

            {/* Mobile hamburger toggle */}
            <button
              type="button"
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition-all duration-200 bg-gradient-to-r from-primary via-[#0a63bd] to-[#0a63bd] shadow-[0_10px_22px_rgba(1,74,142,0.25)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? (
                <i className="fa-solid fa-xmark text-[19px]"></i>
              ) : (
                <i className="fa-solid fa-bars text-[19px]"></i>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={closeMenu} />
    </>
  );
}
