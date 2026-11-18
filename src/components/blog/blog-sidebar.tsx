import Image from 'next/image';
import Link from 'next/link';

import type { BlogPost } from '@/data/blog/posts';
import { getProductImage } from '@/lib/catalog/images';
import type { Product } from '@/types/product';

import { BlogContactForm } from './blog-contact-form';

export interface TocItem {
  id: string;
  label: string;
}

interface BlogSidebarProps {
  post: BlogPost;
  toc: TocItem[];
  products: Product[];
}

function SidebarCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ink">
        <i className={`${icon} text-primary`} aria-hidden="true" />
        {title}
      </h2>
      {children}
    </section>
  );
}

export function BlogSidebar({ post, toc, products }: BlogSidebarProps) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-24" aria-label="Article sidebar">
      <SidebarCard title="On this page" icon="fa-solid fa-list-ul">
        <nav>
          <ol className="space-y-1">
            {toc.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="group flex gap-2 rounded-lg px-2 py-1.5 text-sm leading-5 text-muted transition-colors hover:bg-soft hover:text-primary"
                >
                  <span className="text-[11px] font-bold text-primary/60 group-hover:text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </SidebarCard>

      <SidebarCard title="Related products" icon="fa-solid fa-gears">
        {products.length > 0 ? (
          <ul className="space-y-3">
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-line/80 p-2 transition-colors hover:border-primary/40 hover:bg-soft"
                >
                  <Image
                    src={getProductImage(product)}
                    alt={product.displayTitle}
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 rounded-lg border border-line bg-soft object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-primary">
                      {product.brand}
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-bold text-ink group-hover:text-primary">
                      {product.partNumber}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-muted">
                      {product.type}
                    </span>
                  </span>
                  <i
                    className="fa-solid fa-arrow-right text-[11px] text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-6 text-muted">
            Browse the catalogue to find turbine, compressor and valve spares.
          </p>
        )}

        <Link
          href="/products"
          className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
        >
          View the full catalogue
          <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
        </Link>
      </SidebarCard>

      <SidebarCard title="Quick enquiry" icon="fa-solid fa-headset">
        <p className="mb-4 text-sm leading-6 text-muted">
          Send a part number or requirement and our team will reply with
          availability, lead time and pricing.
        </p>
        <BlogContactForm articleTitle={post.title} />
      </SidebarCard>
    </aside>
  );
}
