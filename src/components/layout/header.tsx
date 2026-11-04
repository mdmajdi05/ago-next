import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Cpu,
  Flame,
  Gauge,
  MessageCircle,
  Pipette,
  RotateCw,
  ShieldCheck,
  Sliders,
  Zap,
  Cog,
  Package,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { TopBar } from './topBar';
import { MobileMenu } from './mobileMenu';
import { MegaMenu } from './megaMenu';

export const mainNavLinks = [
  { title: 'Home', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'Brands', href: '/brands' },
  { title: 'Categories', href: '/categories' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
];
import { getAll as getAllCategories } from '@/services/categoryService';
import { getAll as getAllBrands } from '@/services/brandService';
import { getFeatured as getFeaturedProducts } from '@/services/productService';

const CATEGORY_ICONS: Record<string, React.ComponentType> = {
  'turbine-parts': Flame,
  'compressor-parts': Cog,
  'valves-actuators': Sliders,
  'automation-controls': Cpu,
  'instrumentation': Gauge,
  'electrical-motors': Zap,
  'mechanical-transmission-bearings': RotateCw,
  'seals-filters': ShieldCheck,
  'piping-fittings': Pipette,
};

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}`;

export function Header() {
  const categories = getAllCategories();
  const brands = getAllBrands();
  const featuredProducts = getFeaturedProducts(6);

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="ago-container">
          <div className="flex items-center gap-6 py-3 md:py-4">
            <Link href="/" className="shrink-0" aria-label="AGO Aviation home">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.logoAlt}
                width={200}
                height={56}
                className="h-10 w-auto"
                priority
              />
            </Link>

            <nav className="flex-1 hidden md:flex justify-center items-center gap-6" aria-label="Main navigation">
              {mainNavLinks.map((link) => {
                if (link.title === 'Products') {
                  return (
                    <MegaMenu key={link.href} trigger={<Link href={link.href}>{link.title}</Link>}>
                      <div className="p-6 md:p-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                        <div>
                          <h3 className="font-bold text-primary text-sm uppercase tracking-wider mb-4">
                            Product Categories
                          </h3>
                          <ul className="space-y-2">
                            {categories.map((category) => {
                              const Icon = CATEGORY_ICONS[category.slug] || Package;
                              return (
                                <li key={category.slug}>
                                  <Link
                                    href={`/categories/${category.slug}`}
                                    className="flex items-center justify-between gap-2 text-text-muted hover:text-primary transition-colors"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="w-3.5 h-3.5 shrink-0 text-primary-light">
  <Icon />
</span>
                                      {category.name}
                                    </div>
                                    {category.count && <span className="text-xs text-text-muted">{category.count}</span>}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold text-primary text-sm uppercase tracking-wider mb-2">
                            Trusted Brands
                          </h3>
                          <p className="text-xs text-text-muted mb-4">
                            OEM and aftermarket brands supported worldwide.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {brands.slice(0, 12).map((brand) => (
                              <Link
                                key={brand.slug}
                                href={`/brands/${brand.slug}`}
                                className="brand-chip"
                              >
                                {brand.name}
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/brands"
                            className="mt-4 block text-sm font-medium text-primary hover:underline transition-colors"
                          >
                            View all brands &rarr;
                          </Link>
                        </div>

                        <div>
                          <h3 className="font-bold text-primary text-sm uppercase tracking-wider mb-3">
                            Featured Parts
                          </h3>
                          <ul className="space-y-2">
                            {featuredProducts.map((product) => (
                              <li key={product.slug}>
                                <Link
                                  href={`/products/${product.slug}`}
                                  className="text-text-muted hover:text-primary transition-colors"
                                >
                                  {product.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/products"
                            className="mt-4 block text-sm font-medium text-primary hover:underline transition-colors"
                          >
                            View all products &rarr;
                          </Link>
                        </div>
                      </div>
                    </MegaMenu>
                  );
                }

                if (link.title === 'Categories') {
                  return (
                    <MegaMenu key={link.href} trigger={<Link href={link.href}>{link.title}</Link>}>
                      <div className="p-6 md:p-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                        <div>
                          <h3 className="font-bold text-primary text-sm uppercase tracking-wider mb-4">
                            All Categories
                          </h3>
                          <ul className="space-y-2">
                            {categories.map((category) => {
                              const Icon = CATEGORY_ICONS[category.slug] || Package;
                              return (
                                <li key={category.slug}>
                                  <Link
                                    href={`/categories/${category.slug}`}
                                    className="flex items-center justify-between gap-2 text-text-muted hover:text-primary transition-colors"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="w-3.5 h-3.5 shrink-0 text-primary-light">
  <Icon />
</span>
                                      {category.name}
                                    </div>
                                    {category.count && <span className="text-xs text-text-muted">{category.count}</span>}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold text-primary text-sm uppercase tracking-wider mb-2">
                            Shop by Brand
                          </h3>
                          <p className="text-xs text-text-muted mb-4">
                            Browse parts by supported OEM brand.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {brands.slice(0, 12).map((brand) => (
                              <Link
                                key={brand.slug}
                                href={`/brands/${brand.slug}`}
                                className="brand-chip"
                              >
                                {brand.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-bold text-primary text-sm uppercase tracking-wider mb-3">
                            Quick Links
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <Link href="/products" className="text-text-muted hover:text-primary transition-colors">
                                Products Catalog
                              </Link>
                            </li>
                            <li>
                              <Link href="/brands" className="text-text-muted hover:text-primary transition-colors">
                                Supported Brands
                              </Link>
                            </li>
                            <li>
                              <Link href="/contact" className="text-text-muted hover:text-primary transition-colors">
                                Request a Quote
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </MegaMenu>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={whatsappUrl}
                className="hidden md:inline-flex primary-btn items-center gap-2"
              >
                <MessageCircle width={16} height={16} className="shrink-0" />
                Enquire on WhatsApp
              </Link>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
