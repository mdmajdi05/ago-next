import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import categoryService from '@/services/categoryService';
import productService from '@/services/productService';
import brandService from '@/services/brandService';
import { siteConfig } from '@/config/site';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = categoryService.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryService.getBySlug(slug);
  if (!category) {
    return {
      title: 'Category Not Found - AGO Aviation',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${category.name} - AGO Aviation`,
    description: category.description || `Genuine ${category.name} gas turbine parts from AGO Aviation.`,
    openGraph: {
      title: category.name,
      description: category.description,
      type: 'website',
      url: `https://www.agoaviation.com/categories/${category.slug}`,
      images: [{ url: siteConfig.ogImage }],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryService.getBySlug(slug);
  if (!category) notFound();

  const products = productService.getByCategory(slug);
  const brands = brandService.getAll().filter((brand) => brand.categories.includes(category.name));

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/products" className="text-[#0b3d6b] hover:underline">
          Products
        </Link>{' / '}
        <span className="text-slate-900">{category.name}</span>
      </nav>

      <div className="lg:flex lg:gap-12">
        <div className="lg:w-1/3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h1 className="text-3xl font-bold text-[#0b3d6b] mb-2">{category.name}</h1>
            <p className="mt-1 text-sm text-slate-600">{category.description}</p>
            <p className="mt-3 text-sm font-semibold text-slate-900">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
          </div>

          {brands.length > 0 && (
            <section className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0b3d6b] mb-3">
                Brands in this category
              </h2>
              <ul className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <li key={brand.slug}>
                    <Link href={`/brands/${brand.slug}`} className="text-sm border border-slate-300 rounded-full px-3 py-1 hover:bg-[#0b3d6b] hover:text-white transition">
                      {brand.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <section className="flex-1">
          <h2 className="text-2xl font-bold text-[#0b3d6b] mb-6">{category.name} Products</h2>
          {products.length === 0 ? (
            <p className="text-slate-600">No products listed in this category.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 group-hover:border-[#0b3d6b] transition">
                      <p className="text-sm font-medium text-[#0b3d6b] line-clamp-2">{product.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{product.part}</p>
                      <p className="text-xs text-slate-400 mt-1">{product.brand}</p>
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
