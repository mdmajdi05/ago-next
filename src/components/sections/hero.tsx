import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface HeroProps {
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

export function Hero({
  eyebrow,
  headline,
  subheadline,
  badge,
  ctaLabel = 'Explore Products',
  ctaHref = '/products',
  secondaryLabel = 'Explore Services',
  secondaryHref = '#services',
  image,
  imageAlt,
}: HeroProps) {
  return (
    <section className="section-padding relative overflow-hidden bg-accent">
      <div className="ago-container relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="lg:pr-8">
            {eyebrow && (
              <span className="eyebrow-badge block mb-4">
                {eyebrow}
              </span>
            )}
            {badge && (
              <Badge variant="default" className="mb-4 inline-block">
                {badge}
              </Badge>
            )}
            <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              {headline}
            </h1>
            {subheadline && (
              <p className="text-lg lg:text-xl text-text-muted mb-8 max-w-lg">
                {subheadline}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              {ctaLabel && ctaHref && (
                <Button variant="primary" href={ctaHref}>
                  {ctaLabel}
                </Button>
              )}
              {secondaryLabel && secondaryHref && (
                <Button variant="ghost" href={secondaryHref}>
                  {secondaryLabel}
                </Button>
              )}
            </div>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-none lg:h-[520px]">
            <Image
              src={image}
              alt={imageAlt || headline}
              fill
              className="object-cover rounded-[20px] shadow-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
