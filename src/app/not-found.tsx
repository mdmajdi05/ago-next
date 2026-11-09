import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { productService, brandService, categoryService } from '@/services';
import { getProductImage } from '@/lib/catalog/images';
import type { Product } from '@/types/product';
import {
  NotFoundExplorer,
  type NotFoundProduct,
} from '@/components/not-found/not-found-explorer';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    'The page you are looking for could not be found. Search AGO Aviation gas turbine, compressor and industrial spare parts by part number, product name or brand.',
  robots: {
    index: false,
    follow: true,
  },
};

function toExplorerProduct(product: Product): NotFoundProduct {
  return {
    slug: product.slug,
    title: product.title,
    partNumber: product.partNumber,
    brand: product.brand,
    category: product.category,
    categorySlug: product.categorySlug,
    type: product.type,
    image: getProductImage(product),
    keywords: product.keywords,
  };
}

export default function NotFound() {
  const products = productService.getAll().map(toExplorerProduct);
  const featured = productService.getFeatured(8).map(toExplorerProduct);

  const brands = brandService
    .getAll()
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 18)
    .map((brand) => ({
      name: brand.name,
      slug: brand.slug,
      count: brand.count,
    }));

  const categories = categoryService.getAll().map((category) => ({
    name: category.name,
    slug: category.slug,
    short: category.short,
    description: category.description,
    count: category.count ?? 0,
  }));

  return (
    <div className="bg-white text-[#09233b]">
      <section className="relative overflow-hidden bg-[#062a43] px-4 pb-20 pt-14 text-white md:pb-24 md:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #ffc45b 0, transparent 32%), radial-gradient(circle at 85% 10%, #1f6fa8 0, transparent 36%), radial-gradient(circle at 60% 90%, #ffc45b 0, transparent 30%)',
          }}
        />

        <div className="relative mx-auto max-w-[1100px] text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#ffc45b]">
            404 · Page not found
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            This page took an unscheduled outage.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#dce8ef] md:text-base">
            The page you are looking for may have moved or the link may be out of
            date. Search our spare parts catalogue by part number, product name or
            brand — or send your requirement directly to our team.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffc45b] px-6 py-3 text-sm font-extrabold text-[#09233b] transition hover:bg-[#ffd27f]"
            >
              <i className="fa-solid fa-house" aria-hidden="true" />
              Go to Home
            </Link>

            <a
              href={`mailto:${siteConfig.email.sales}?subject=${encodeURIComponent(
                'Part enquiry from AGO Aviation'
              )}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-[#ffc45b] hover:text-[#ffc45b]"
            >
              <i className="fa-solid fa-envelope" aria-hidden="true" />
              Email our team
            </a>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-[#ffc45b] hover:text-[#ffc45b]"
            >
              Browse all products
            </Link>
          </div>
        </div>
      </section>

      <NotFoundExplorer
        products={products}
        featured={featured}
        brands={brands}
        categories={categories}
      />
    </div>
  );
}
