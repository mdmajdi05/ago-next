'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TopBar } from './topBar';
import { LiveSearch } from '@/components/search/live-search';
import type { CatalogMenuData, CatalogMenuSection } from '@/lib/catalog/menu';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'Brands', href: '/brands' },
  { label: 'Platforms', href: '/platforms' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

type MegaKey = 'products' | 'brands';

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MegaSection({ section }: { section: CatalogMenuSection }) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#b77b1c]">
        {section.title}
      </p>

      <ul className="space-y-0.5">
        {section.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-start justify-between gap-3 rounded-lg px-2 py-1.5 text-[12px] font-semibold text-[#24455f] transition hover:bg-[#fdf1de] hover:text-[#0b3b66]"
            >
              <span className="leading-5">{link.label}</span>
              {link.meta && (
                <span className="shrink-0 pt-0.5 text-[10px] font-normal text-[#7b8b99]">
                  {link.meta}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Header({ catalogMenu }: { catalogMenu: CatalogMenuData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMega, setOpenMega] = useState<MegaKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setOpenMega(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenMega(null);
  }, [pathname]);

  const linksForMega = (mega: MegaKey) =>
    mega === 'brands'
      ? catalogMenu.products[2]?.links || []
      : catalogMenu.products[0]?.links || [];

  return (
    <>
      <TopBar />
      <div
        id="ago-site-header"
        className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}
      >
        <div className="site-header-inner">
          <div className="site-header-grid">
            <div className="header-logo">
              <div className="logo">
                <Link href="/" aria-label="AGO Aviation home" className="logo-link">
                  <Image
                    src="/images/LOGO.png"
                    alt="LOGO"
                    width={375}
                    height={219}
                    priority
                    className="logo-image"
                  />
                </Link>
              </div>
            </div>

            <div className="header-menu">
              <button
                className="toggle-btn"
                type="button"
                aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={menuOpen}
                aria-controls="ago-site-navigation"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true" />
              </button>

              <nav
                id="ago-site-navigation"
                aria-label="Primary"
                className={`site-nav relative max-[1024px]:max-h-[calc(100vh-110px)] max-[1024px]:overflow-y-auto ${menuOpen ? 'site-nav--open' : 'site-nav--closed'}`}
              >
                <ul className="nav-list">
                  <li className="nav-item">
                    <div className="nav-search">
                      <LiveSearch placeholder="Search part number or brand" />
                    </div>
                  </li>
                  {navLinks.map((link) => {
                    const active = isActivePath(pathname, link.href);
                    const mega: MegaKey | null =
                      link.href === '/products'
                        ? 'products'
                        : link.href === '/brands'
                          ? 'brands'
                          : null;

                    return (
                      <li
                        key={link.label}
                        className={`nav-item group ${active ? 'active' : ''}`}
                      >
                        {mega ? (
                          <>
                            {/* Mobile: accordion trigger keeps the hub link available below. */}
                            <button
                              type="button"
                              className="nav-link mega-toggle w-full justify-between"
                              aria-expanded={openMega === mega}
                              aria-controls={`mobile-${mega}-menu`}
                              onClick={() =>
                                setOpenMega((current) =>
                                  current === mega ? null : mega
                                )
                              }
                            >
                              <span>{link.label}</span>
                              <span
                                aria-hidden="true"
                                className={`text-[9px] transition-transform ${openMega === mega ? 'rotate-180' : ''}`}
                              >
                                ▾
                              </span>
                            </button>

                            {/* Desktop: the existing nav link, with a mega panel. */}
                            <Link
                              href={link.href}
                              className="nav-link mega-link"
                              aria-haspopup="true"
                            >
                              <span>{link.label}</span>
                              <span aria-hidden="true" className="ml-1 text-[9px]">
                                ▾
                              </span>
                            </Link>

                            <div
                              id={`mobile-${mega}-menu`}
                              className={`${openMega === mega ? 'block' : 'hidden'} px-2 pb-2 pt-1 min-[1025px]:hidden`}
                            >
                              <p className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#b77b1c]">
                                {mega === 'products' ? 'Catalogue' : 'Manufacturers'}
                              </p>

                              <ul className="space-y-0.5">
                                {linksForMega(mega).map((item) => (
                                  <li key={item.href}>
                                    <Link
                                      href={item.href}
                                      onClick={() => setMenuOpen(false)}
                                      className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-[12px] font-semibold text-[#29445c] transition hover:bg-[#fdf1de] hover:text-[#0b3b66]"
                                    >
                                      <span>{item.label}</span>
                                      {item.meta && (
                                        <span className="shrink-0 text-[10px] font-normal text-[#7b8b99]">
                                          {item.meta}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>

                              <Link
                                href={mega === 'products' ? '/products' : '/brands'}
                                onClick={() => setMenuOpen(false)}
                                className="mt-1 block rounded-lg px-3 py-2 text-[12px] font-extrabold text-[#0b3b66] transition hover:bg-[#fdf1de]"
                              >
                                {mega === 'products'
                                  ? 'View all products →'
                                  : 'View all brands →'}
                              </Link>
                            </div>

                            {/* Desktop mega panel */}
                            <div className="absolute left-1/2 top-full z-[1100] hidden w-[min(920px,calc(100vw-48px))] -translate-x-1/2 pt-4 min-[1025px]:group-hover:block min-[1025px]:group-focus-within:block">
                              <div className="rounded-2xl border border-[#e2e9f0] bg-white p-6 shadow-[0_24px_60px_rgba(9,35,59,0.18)]">
                                {mega === 'products' ? (
                                  <>
                                    <div className="grid grid-cols-3 gap-6">
                                      {catalogMenu.products.map((section) => (
                                        <MegaSection key={section.title} section={section} />
                                      ))}
                                    </div>

                                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#e8edf1] pt-4">
                                      <p className="text-[11px] text-[#718394]">
                                        {catalogMenu.productCount} products across{' '}
                                        {catalogMenu.products[0]?.links.length || 0}{' '}
                                        categories and {catalogMenu.brandCount} brands.
                                      </p>
                                      <div className="flex items-center gap-4">
                                        <Link
                                          href="/part-numbers"
                                          className="text-[11px] font-bold text-[#24455f] transition hover:text-[#b77b1c]"
                                        >
                                          A–Z part index →
                                        </Link>
                                        <Link
                                          href="/products"
                                          className="rounded-[8px] bg-[#062a43] px-4 py-2 text-[11px] font-extrabold text-white transition hover:bg-[#0b3b66]"
                                        >
                                          View all products
                                        </Link>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="grid grid-cols-3 gap-6">
                                      {catalogMenu.brandGroups.map((group) => (
                                        <MegaSection key={group.title} section={group} />
                                      ))}
                                    </div>

                                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#e8edf1] pt-4">
                                      <p className="text-[11px] text-[#718394]">
                                        {catalogMenu.brandCount} manufacturers across gas
                                        turbine, rotating equipment, automation and
                                        electrical systems.
                                      </p>
                                      <Link
                                        href="/brands"
                                        className="rounded-[8px] bg-[#062a43] px-4 py-2 text-[11px] font-extrabold text-white transition hover:bg-[#0b3b66]"
                                      >
                                        View all brands
                                      </Link>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <Link href={link.href} className="nav-link">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="header-search">
              <div className="search-bar">
                <LiveSearch placeholder="Search here" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
