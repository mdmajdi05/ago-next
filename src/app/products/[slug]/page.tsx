import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { productService, brandService } from '@/services';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { slugify } from '@/lib/utils';
import EnquiryForm from './EnquiryForm';
import { Product } from '@/types/product';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = productService.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productService.getBySlug(slug);
  if (!product) {
    return {
      title: 'Product Not Found - AGO Aviation',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: product.title,
    description:
      product.keywords ||
      product.description ||
      `Genuine ${product.part} gas turbine part from ${product.brand}.`,
    openGraph: {
      title: product.title,
      description: product.description || product.keywords,
      type: 'website',
      url: `https://www.agoaviation.com/products/${product.slug}`,
      images: product.image ? [{ url: product.image }] : [{ url: siteConfig.ogImage }],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = productService.getBySlug(slug);
  if (!product) notFound();

  const related = productService.getRelated(product, 4);
  const imageUrl = product.image || '/images/engine-100.jpeg';
  const specifications = product.specifications
    ? Object.entries(product.specifications)
    : [
        ['Part Number', product.part],
        ['Brand', product.brand],
        ['Category', product.category],
      ];

  const breadcrumbs = [
    { label: 'Products', href: '/products' },
    { label: product.title, href: `/products/${product.slug}` },
  ];

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* JSON-LD Product schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.title,
            image: imageUrl,
            description: product.description || product.keywords || undefined,
            brand: { '@type': 'Brand', name: product.brand },
            sku: product.part,
            mpn: product.part,
            url: `https://www.agoaviation.com/products/${product.slug}`,
            offers: {
              '@type': 'Offer',
              url: `https://www.agoaviation.com/products/${product.slug}`,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
              seller: { '@type': 'Organization', name: siteConfig.name },
            },
          }),
        }}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="lg:flex lg:gap-10">
        <aside className="lg:w-1/3 shrink-0">
          <div className="relative rounded-xl border border-line bg-slate-50 aspect-video overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover w-full h-full"
            />
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-primary tracking-tight">
              {product.title}
            </h1>
            <p className="mt-3 flex items-center gap-3 text-sm">
              <span className="font-mono text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded">
                {product.part}
              </span>
              <span className="text-muted text-xs">by</span>{' '}
              <Link
                href={`/brands/${brandService.slugifyBrand(product.brand)}`}
                className="font-semibold text-primary hover:underline"
              >
                {product.brand}
              </Link>{' &middot; '}
              <Link
                href={`/categories/${slugify(product.category)}`}
                className="font-semibold text-primary hover:underline"
              >
                {product.category}
              </Link>
            </p>
          </div>

          {(product.description || product.keywords) && (
            <div className="text-ink leading-relaxed">
              {product.description || product.keywords}
            </div>
          )}

          <section className="border-t border-line pt-8">
            <h2 className="text-lg font-semibold text-primary uppercase tracking-wider mb-6 block">
              Specifications
            </h2>
            <table className="w-full text-left text-sm border-collapse">
              <tbody className="[&_tr]:border-b [&_tr]:border-line last:[&_tr]:border-b-0">
                {specifications.map(([key, value]) => (
                  <tr key={key} className="[&_td]:py-3 [&_th]:w-1/4 [&_th]:font-semibold [&_th]:text-primary [&_td]:text-muted">
                    <th>{key}</th>
                    <td className="font-mono">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary uppercase tracking-wider mb-6 block">
              Request a Quote
            </h2>
            <EnquiryForm product={product} />
          </section>
        </section>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-lg font-semibold text-primary uppercase tracking-wider mb-6 block">
            Related Products
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="block">
                  <div className="rounded-xl border border-line bg-slate-50 p-4 hover:border-primary transition-colors">
                    <p className="text-sm font-semibold text-primary line-clamp-1">
                      {p.title}
                    </p>
                    <p className="text-xs text-muted mt-1">{p.part}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
