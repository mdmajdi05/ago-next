import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface ProductGridProps {
  products: Product[];
  title?: string;
  subheading?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
}

export function ProductGrid({
  products,
  title,
  subheading,
  viewAllLabel,
  viewAllHref,
}: ProductGridProps) {
  return (
    <section className="section-padding bg-bg-light">
      <div className="ago-container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          {title || subheading ? (
            <div className="section-title text-left lg:mb-0">
              {title && (
                <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
                  {title}
                </h2>
              )}
              {subheading && (
                <p className="text-text-muted max-w-lg">{subheading}</p>
              )}
            </div>
          ) : null}
          {viewAllLabel && viewAllHref && (
            <Link
              href={viewAllHref}
              className="ghost-btn whitespace-nowrap"
            >
              {viewAllLabel}
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.slug} className="flex flex-col h-full">
              <div className="relative aspect-[4/3] overflow-hidden bg-bg-light">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 420px, 260px"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-text-muted text-sm">
                    No image available
                  </div>
                )}
                <Badge
                  variant="default"
                  className="absolute left-3 top-3 z-10"
                >
                  {product.category}
                </Badge>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-primary mb-1">
                  {product.title}
                </h3>
                <p className="text-sm text-text-muted mb-1">
                  Part No: {product.part}
                </p>
                <div className="mt-auto pt-4 flex items-center gap-2">
                  <span className="brand-chip">{product.brand}</span>
                </div>
                <Button
                  variant="secondary"
                  href={product.url}
                  className="mt-4 w-full text-center"
                >
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
