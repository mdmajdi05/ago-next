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

const headerStyle: React.CSSProperties = {
  position: 'sticky',
  top: '10px',
  zIndex: 1000,
  width: 'min(100% - 36px, 1440px)',
  margin: '10px auto',
  overflow: 'visible',
  border: '1px solid rgba(255, 255, 255, 0.09)',
  borderRadius: '22px',
  background: 'rgba(255, 255, 255, 0.97)',
  boxShadow: '0 12px 34px rgba(4, 12, 22, 0.24)',
  WebkitBackdropFilter: 'blur(14px)',
  backdropFilter: 'blur(14px)',
  height: 'auto',
  minHeight: '68px',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(170px, 170px) minmax(0, 1fr) minmax(170px, 230px)',
  alignItems: 'center',
  gap: '16px',
  margin: 0,
  minHeight: '68px',
};

const megaMenuStyle: React.CSSProperties = {
  width: 'min(540px, calc(100vw - 40px))',
  padding: '14px',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '4px 14px',
};

const searchFormStyle: React.CSSProperties = {
  borderColor: 'rgba(55, 123, 146, 0.2)',
  backgroundColor: 'rgba(255, 255, 255, 0.86)',
};

const mobileMenuStyle: React.CSSProperties = {
  top: 'calc(100% + 10px)',
  right: 0,
  left: 0,
  width: 'auto',
  maxHeight: 'min(75vh, 620px)',
  overflowY: 'auto',
  padding: '12px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '18px',
  background: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(14px) saturate(160%)',
  boxShadow: '0 24px 54px rgba(13, 38, 64, 0.18)',
  textAlign: 'left',
  opacity: 1,
  visibility: 'visible',
  transform: 'translateY(0)',
};

const mobileListStyle: React.CSSProperties = {
  marginTop: 0,
  paddingLeft: '12px',
  paddingTop: '4px',
  paddingRight: 0,
  paddingBottom: '8px',
  border: 0,
  background: 'transparent',
  display: 'block',
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = getAllCategories();
  const brands = getAllBrands();
  const closeMenu = useCallback(() => setMobileOpen(false), []);

  if (scrolled) {
    headerStyle.background = 'rgba(237, 247, 249, 0.98)';
    headerStyle.boxShadow = '0 15px 42px rgba(13, 38, 64, 0.16)';
  } else {
    headerStyle.background = 'rgba(255, 255, 255, 0.97)';
    headerStyle.boxShadow = '0 12px 34px rgba(4, 12, 22, 0.24)';
  }

  return (
    <>
      <TopBar />

      <header id="ago-site-header" style={headerStyle} aria-label="Primary navigation">
        <div className="mx-auto max-w-[1440px] w-full p-0">
          <div style={gridStyle} className="relative">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center" aria-label="AGO Aviation home">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.logoAlt}
                  width={150}
                  height={66}
                  priority
                  className="block w-auto h-[44px] object-contain"
                  style={{ height: '44px', width: 'auto', objectFit: 'contain', filter: 'none' }}
                />
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex text-center" aria-label="Primary navigation">
              <ul
                className="flex flex-wrap items-center justify-center gap-0 m-0 p-0 list-none"
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0,
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                }}
              >
                {mainNavLinks.map((link) => {
                  const hasDropdown = link.title === 'Products' || link.title === 'Turbine Parts';
                  return (
                    <li key={link.href} className="relative m-0" style={{ flex: '0 0 auto', margin: 0 }}>
                      {hasDropdown ? (
                        <MegaMenu trigger={<Link href={link.href}>{link.title}</Link>}>
                          <div style={megaMenuStyle} className="p-[14px] grid grid-cols-[repeat(2,minmax(0,1fr))] gap-[4px_14px]">
                            <div>
                              {categories.map((category) => (
                                <Link
                                  key={category.slug}
                                  href={`/categories/${category.slug}`}
                                  className="flex items-center gap-[12px] px-[12px] py-[9px] rounded-[9px] text-[12px] font-semibold leading-[1.35] text-[#44586e] block whitespace-normal transition-all duration-220 hover:bg-soft hover:text-primary"
                                >
                                  {category.name}
                                </Link>
                              ))}
                            </div>
                            <div>
                              {brands.slice(0, 12).map((brand) => (
                                <Link
                                  key={brand.slug}
                                  href={`/brands/${brand.slug}`}
                                  className="px-[12px] py-[9px] rounded-[9px] text-[12px] font-semibold leading-[1.35] text-[#44586e] block whitespace-normal transition-all duration-220 hover:bg-soft hover:text-primary"
                                >
                                  {brand.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </MegaMenu>
                      ) : (
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-[5px] min-h-[44px] h-auto px-[7px] py-0 rounded-[999px] bg-transparent text-[#29445c] font-[600] text-[12.5px] leading-none whitespace-nowrap transition-colors duration-200 hover:text-[#0b3b66] hover:bg-[#f9f1de]"
                        >
                          {link.title}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Search + WhatsApp */}
            <div className="hidden lg:flex items-center gap-[22px] shrink-0 min-w-0">
              <div className="relative flex items-center w-full min-w-[280px]">
                <form role="search" style={searchFormStyle} className="flex items-center w-full gap-[4px] p-[4px] rounded-[999px] border border-[rgba(55,123,146,0.2)] bg-white/86">
                  <input
                    type="search"
                    placeholder="Search here"
                    className="w-full h-[42px] pl-[14px] pr-[45px] border-0 rounded-[999px] bg-transparent text-[#17394c] text-[12px] outline-none font-inherit"
                    aria-label="Search spare parts"
                  />
                  <button
                    type="submit"
                    className="absolute right-[5px] top-[50%] -translate-y-[50%] w-[34px] h-[34px] rounded-full border-0 bg-[#267d98] flex items-center justify-center cursor-pointer transition-colors duration-250"
                    aria-label="Search"
                  >
                    <i className="fa-solid fa-magnifying-glass text-[13px] text-white" />
                  </button>
                </form>
              </div>
              <Link
                href={whatsappUrl}
                className="inline-flex items-center gap-[12px] min-h-[43px] px-[17px] rounded-[10px] bg-linear-gradient-to-r from-[#ffd18a] to-[#f0a843] text-[#10243a] font-[800] text-[12px] uppercase shadow-[0_8px_20px_rgba(240,168,67,0.22)] hover:filter-[brightness(1.04)] transition-transform duration-200 whitespace-nowrap"
              >
                Enquire
                <i className="fa-solid fa-paper-plane" />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-[40px] h-[40px] rounded-[12px] border border-white/14 text-[#17191c] bg-[#f0a843] font-[17px] shadow-none"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.14)',
                background: '#f0a843',
                color: '#17191c',
                fontSize: '17px',
                width: '40px',
                height: '40px',
                borderRadius: '12px',
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? (
                <i className="fa-solid fa-xmark text-[19px]" />
              ) : (
                <i className="fa-solid fa-bars text-[19px]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {isMounted && mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-[9997] bg-black/45 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div style={mobileMenuStyle} className="fixed right-0 left-0 z-[9998] w-auto max-h-[min(75vh,620px)] overflow-y-auto p-[12px] border border-white/1 border-radius-[18px] bg-white/98 backdrop-blur-[14px] saturate-[160%] shadow-[0_24px_54px_rgba(13,38,64,0.18)] text-left opacity-100 visibility-visible">
            <nav className="space-y-0" aria-label="Mobile navigation">
              {mainNavLinks.map((link) => {
                const hasDropdown = link.title === 'Products' || link.title === 'Turbine Parts';
                return (
                  <li key={link.href} className="mb-[4px] border-0 w-full block" style={{ marginBottom: '4px', border: 0, width: '100%', display: 'block' }}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex justify-between items-center min-h-[42px] px-0 py-[9px] rounded-[10px] bg-transparent text-[#16324d] font-[600] text-[12px] leading-none whitespace-normal w-full text-left transition-colors duration-200 hover:text-[#0b3b66] hover:bg-[#f9f1de]"
                    >
                      {link.title}
                      <i className="fa-solid fa-chevron-right text-xs opacity-60 ml-[6px]" />
                    </Link>
                    {hasDropdown && (
                      <ul style={mobileListStyle} className="mt-0 pl-[12px] space-y-0 border-0 bg-transparent block">
                        {categories.map((category) => (
                          <li key={category.slug}>
                            <Link
                              href={`/categories/${category.slug}`}
                              onClick={closeMenu}
                              className="flex items-center gap-[12px] px-[12px] py-[9px] rounded-[9px] text-[12px] font-semibold leading-[1.35] text-[#44586e] block whitespace-normal transition-all duration-220 hover:bg-soft hover:text-primary"
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
          </div>
        </>
      )}
    </>
  );
}
