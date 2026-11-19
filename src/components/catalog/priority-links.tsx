import Link from 'next/link';

import type { Product } from '@/types/product';

interface PriorityLinksProps {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  variant?: 'cards' | 'pills';
}

/**
 * Contextual internal links to priority catalogue pages. Rendered on pages
 * that are already indexed so every linked URL is one crawl hop away from a
 * page Google has indexed.
 */
export function PriorityLinks({
  eyebrow,
  title,
  description,
  products,
  variant = 'pills',
}: PriorityLinksProps) {
  if (products.length === 0) return null;

  if (variant === 'pills') {
    return (
      <div>
        <h2 className="text-xl font-extrabold text-[#102d50]">{title}</h2>
        {description && (
          <p className="mt-2 text-sm leading-6 text-[#5d7183]">{description}</p>
        )}
        <ul className="mt-4 flex flex-wrap gap-2">
          {products.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/products/${item.slug}`}
                className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#24455f] transition hover:border-blue-300 hover:bg-blue-50"
              >
                {item.partNumber} — {item.type}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section className="mt-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#d69a32]">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-2 text-2xl font-extrabold text-[#092b45]">{title}</h2>
          {description && <p className="mt-2 text-sm text-[#718394]">{description}</p>}
        </div>

        <Link
          href="/products"
          className="text-xs font-bold text-[#123c5b] transition hover:text-[#d69a32]"
        >
          Browse All Products →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((item) => (
          <Link
            key={item.slug}
            href={`/products/${item.slug}`}
            className="group rounded-xl border border-[#e1e8ee] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#d69a32] hover:shadow-[0_12px_28px_rgba(12,39,60,0.08)]"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#d69a32]">
              {item.brand}
            </p>
            <h3 className="mt-2 line-clamp-2 font-mono text-sm font-bold leading-6 text-[#123c5b]">
              {item.partNumber}
            </h3>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#718394]">
              {item.type}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-[#e8edf1] pt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                View Product
              </span>
              <span className="text-[#d69a32] transition group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PriorityLinks;
