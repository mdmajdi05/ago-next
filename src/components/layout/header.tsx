'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TopBar } from './topBar';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'Brands', href: '/brands' },
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

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
                className={`site-nav ${menuOpen ? 'site-nav--open' : 'site-nav--closed'}`}
              >
                <ul className="nav-list">
                  {navLinks.map((link) => (
                    <li
                      key={link.label}
                      className={`nav-item ${isActivePath(pathname, link.href) ? 'active' : ''}`}
                    >
                      <Link href={link.href} className="nav-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="header-search">
              <div className="search-bar">
                <form className="search-form" action="/products" method="get" role="search">
                  <input
                    type="search"
                    placeholder="Search here"
                    name="search"
                    className="search-input"
                    aria-label="Search spare parts"
                  />
                  <button type="submit" className="search-btn" aria-label="Search">
                    <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
