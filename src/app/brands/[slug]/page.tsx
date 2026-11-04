import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import brandService from '@/services/brandService';
import productService from '@/services/productService';
import categoryService from '@/services/categoryService';
import { siteConfig } from '@/config/site';
import { Brand } from '@/types/brand';

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = brandService.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = brandService.getBySlug(slug);
  if (!brand) {
    return {
      title: 'Brand Not Found - AGO Aviation',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${brand.name} - Authorized Distributor - AGO Aviation`,
    description:
      brand.description || `Genuine ${brand.name} gas turbine parts and spares supplied by AGO Aviation worldwide.`,
    openGraph: {
      title: brand.name,
      description: brand.description,
      type: 'website',
      url: `https://www.agoaviation.com/brands/${brand.slug}`,
      images: [{ url: siteConfig.ogImage }],
    },
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = brandService.getBySlug(slug);
  if (!brand) notFound();

  const products = productService.getByBrand(slug);
  const categories = categoryService.getAll().filter((category) => brand.categories.includes(category.name));

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/brands" className="text-[#0b3d6b] hover:underline">
          Brands
        </Link>{' / '}
        <span className="text-slate-900">{brand.name}</span>
      </nav>

      <div className="lg:flex lg:gap-12">
        <div className="lg:w-1/3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h1 className="text-3xl font-bold text-[#0b3d6b] mb-2">{brand.name}</h1>
            <p className="text-sm text-slate-500">{brand.group}</p>
            <p className="mt-3 text-sm font-semibold text-slate-900">
              {brand.count} product{brand.count !== 1 ? 's' : ''}
            </p>
            {brand.description && <p className="mt-4 text-sm text-slate-600">{brand.description}</p>}
          </div>

          {categories.length > 0 && (
            <section className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0b3d6b] mb-3">
                Categories
              </h2>
              <ul className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link href={`/categories/${category.slug}`} className="text-sm border border-slate-300 rounded-full px-3 py-1 hover:bg-[#0b3d6b] hover:text-white transition">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <section className="flex-1">
          <h2 className="text-2xl font-bold text-[#0b3d6b] mb-6">Products by {brand.name}</h2>
          {products.length === 0 ? (
            <p className="text-slate-600">No products listed for this brand.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 group-hover:border-[#0b3d6b] transition">
                      <p className="text-sm font-medium text-[#0b3d6b] line-clamp-2">{product.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{product.part}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
