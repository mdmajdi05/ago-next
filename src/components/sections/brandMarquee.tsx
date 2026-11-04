import Link from 'next/link';
import { Brand } from '@/types/brand';

export interface BrandMarqueeProps {
  brands: Brand[];
  title?: string;
  subtitle?: string;
}

export function BrandMarquee({ brands, title }: BrandMarqueeProps) {
  if (brands.length === 0) {
    return null;
  }

  return (
    <section className="py-10 lg:py-16 border-y border-line bg-white">
      <style>
        {`
          @keyframes marquee-move {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
        {title && (
          <p className="brands-title text-center text-sm font-semibold text-primary tracking-wider uppercase mb-8">
            {title}
          </p>
        )}
        <div className="brands-marquee overflow-hidden">
          <div
            className="brands-track inline-flex animate-[marquee-move_40s_linear_infinite]"
            aria-hidden="false"
          >
            <div className="brand-group shrink-0 flex items-center gap-6">
              {brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="whitespace-nowrap px-3 py-1.5 text-sm font-medium text-ink hover:text-primary transition-colors"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
            <div className="brand-group shrink-0 flex items-center gap-6" aria-hidden="true">
              {brands.map((brand) => (
                <Link
                  key={`dup-${brand.slug}`}
                  href={`/brands/${brand.slug}`}
                  className="whitespace-nowrap px-3 py-1.5 text-sm font-medium text-ink hover:text-primary transition-colors"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
