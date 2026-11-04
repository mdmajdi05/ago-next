import type { Metadata } from 'next';
import Link from 'next/link';

import { getFeatured } from '@/services/productService';
import { getAll as getAllBrands } from '@/services/brandService';
import { getAll as getAllCategories } from '@/services/categoryService';
import { siteConfig } from '@/config/site';
import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { ProductGrid } from '@/components/sections/productGrid';
import { BrandMarquee } from '@/components/sections/brandMarquee';
import { Product } from '@/types/product';
import { Brand } from '@/types/brand';

export const metadata: Metadata = {
  title: 'AGO Aviation - Gas Turbine Parts Manufacturer & Supplier',
  description: siteConfig.description,
  keywords: siteConfig.keywords as unknown as string[],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.logoAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.socials.x.handle,
  },
};

interface Stat {
  value: string;
  label: string;
}

interface HeroProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image: string;
  imageAlt: string;
}

interface StatsProps {
  title?: string;
  subtitle?: string;
  stats: Stat[];
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  subheading?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
}

interface BrandMarqueeProps {
  brands: Brand[];
  title?: string;
  subtitle?: string;
}

const stats: Stat[] = [
  { value: '356+', label: 'Precision Parts in Stock' },
  { value: '23+', label: 'Global Brands Supported' },
  { value: '9+', label: 'Product Categories' },
  { value: '25+ Years', label: 'Industry Experience' },
];

export default async function Home() {
  const [featuredProducts, brands, categories] = await Promise.all([
    getFeatured(8),
    getAllBrands(),
    getAllCategories(),
  ]);

  const heroProps: HeroProps = {
    eyebrow: 'In Stock & Ready to Ship Worldwide',
    headline: siteConfig.tagline,
    subheadline: siteConfig.description,
    badge: 'Genuine OEM Spares',
    ctaLabel: 'Explore Products',
    ctaHref: '/products',
    secondaryLabel: 'Contact Us',
    secondaryHref: '/contact',
    image: '/images/engine-portfolio-banner.webp',
    imageAlt: 'AGO Aviation gas turbine parts portfolio banner',
  };

  const productGridProps: ProductGridProps = {
    products: featuredProducts,
    title: 'Featured Products',
    subheading:
      'Precision gas turbine parts and spares for power plants, oil & gas facilities, EPC contractors, and industrial operators worldwide.',
    viewAllLabel: 'View All Products',
    viewAllHref: '/products',
  };

  const brandMarqueeProps: BrandMarqueeProps = {
    brands,
    title: 'Supported Brands',
    subtitle: 'Genuine parts and spares for 23+ global OEM turbine brands.',
  };

  return (
    <main className="bg-white">
      <Hero {...heroProps} />

      <Stats
        title="Trusted by Power Generation and Industrial Operators Worldwide"
        subtitle=""
        stats={stats}
      />

      <ProductGrid {...productGridProps} />

      <BrandMarquee {...brandMarqueeProps} />

      <section className="section-padding bg-ago-mist">
        <div className="ago-container">
          <div className="section-title">
            <h2>Product Categories</h2>
            <p>
              Browse our complete range of gas turbine parts and industrial spares by category.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="block ago-card p-5 text-center hover:border-primary/40"
              >
                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
                  <span className="text-sm font-semibold" aria-hidden="true">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-primary mb-1">{category.name}</h3>
                <p className="text-sm text-text-muted">{category.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
