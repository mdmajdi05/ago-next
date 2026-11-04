import Link from 'next/link';
import { Brand } from '@/types/brand';

export interface BrandMarqueeProps {
  brands: Brand[];
  title?: string;
  subtitle?: string;
}

export function BrandMarquee({ brands, title, subtitle }: BrandMarqueeProps) {
  if (brands.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-bg-light">
      <div className="ago-container">
        {title || subtitle ? (
          <div className="section-title mb-10">
            {title && <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">{title}</h2>}
            {subtitle && <p className="text-text-muted max-w-xl mx-auto">{subtitle}</p>}
          </div>
        ) : null}
        <div className="marquee-viewport">
          <div className="marquee-track">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="brand-chip"
              >
                {brand.name}
              </Link>
            ))}
            {brands.map((brand) => (
              <Link
                key={`marquee-duplicate-${brand.slug}`}
                href={`/brands/${brand.slug}`}
                className="brand-chip"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
