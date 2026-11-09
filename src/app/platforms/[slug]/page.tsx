import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { productService } from '@/services';
import {
  getAllPlatforms,
  getPlatform,
  getPlatformSlugs,
  type Platform,
} from '@/data/platforms';
import {
  breadcrumbSchema,
  buildPageMetadata,
  collectionPageSchema,
  faqSchema,
} from '@/lib/seo';
import type { Product } from '@/types/product';

interface PlatformPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPlatformSlugs().map((slug) => ({ slug }));
}

function platformProducts(platform: Platform): Product[] {
  switch (platform.slug) {
    case 'bently-nevada-3300-3500':
      return productService.getByBrand('Bently Nevada');
    case 'woodward-controls':
      return productService.getByBrand('Woodward');
    case 'ge-mark-iv-v':
      return productService
        .getAll()
        .filter((product) => /^(DS38|DS20|IS20|IC69)/i.test(product.partNumber));
    default:
      if (platform.slug.startsWith('siemens-')) {
        return productService.getByBrand('Siemens').slice(0, 12);
      }
      return [];
  }
}

export async function generateMetadata({
  params,
}: PlatformPageProps): Promise<Metadata> {
  const { slug } = await params;
  const platform = getPlatform(slug);

  if (!platform) {
    return buildPageMetadata({
      title: 'Platform Not Found',
      description: 'The requested gas turbine platform guide could not be found.',
      path: `/platforms/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: platform.metaTitle,
    description: platform.metaDescription,
    path: `/platforms/${platform.slug}`,
    keywords: platform.keywords,
    image: platform.image || '/images/engine-portfolio-banner.webp',
    imageAlt: `${platform.name} spare parts supplied by AGO Aviation`,
  });
}

export default async function PlatformPage({ params }: PlatformPageProps) {
  const { slug } = await params;
  const platform = getPlatform(slug);

  if (!platform) notFound();

  const products = platformProducts(platform);
  const relatedPlatforms = platform.relatedPlatforms
    .map((related) => getPlatform(related))
    .filter((related): related is Platform => Boolean(related));

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Platforms', path: '/platforms' },
      { name: platform.name, path: `/platforms/${platform.slug}` },
    ]),
    collectionPageSchema({
      name: platform.name,
      description: platform.metaDescription,
      path: `/platforms/${platform.slug}`,
      items:
        products.length > 0
          ? products.slice(0, 50).map((product) => ({
              name: `${product.brand} ${product.partNumber}`,
              url: `/products/${product.slug}`,
            }))
          : platform.partFamilies.map((family) => ({
              name: family.name,
              url: family.href,
            })),
    }),
    faqSchema(platform.faqs),
  ];

  return (
    <main className="min-h-screen bg-[#f5f8fb] text-[#102b43]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />

      <section className="bg-[#06263b] text-white">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-[#a9c2d4]"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/platforms" className="hover:text-white">
              Platforms
            </Link>
            <span>/</span>
            <span className="text-[#ffc34f]">{platform.shortName}</span>
          </nav>

          <p className="mb-3 flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#ffc34f]">
            <i className="h-[2px] w-8 bg-[#f5b83f]" /> {platform.manufacturer}
          </p>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {platform.name}
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#d7e4ee] sm:text-base">
            {platform.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:sale@agoaviation.com?subject=${encodeURIComponent(
                `${platform.shortName} spare parts enquiry`
              )}`}
              className="rounded-lg bg-[#ffc354] px-5 py-3 text-sm font-extrabold text-[#09233b]"
            >
              ✉ Request a quote
            </a>
            <Link
              href="/products"
              className="rounded-lg border border-white/40 px-5 py-3 text-sm font-bold text-white"
            >
              Search part numbers
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold text-[#092b45] sm:text-3xl">
              About the {platform.shortName}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-[#53697b] sm:text-base">
              {platform.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-10 text-2xl font-bold text-[#092b45] sm:text-3xl">
              Part families we source
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#53697b] sm:text-base">
              {platform.sourcing.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 text-[#d69a32]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-[#092b45] sm:text-3xl">
              How we verify before quoting
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#53697b] sm:text-base">
              {platform.verification.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 text-[#d69a32]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-[#e1e8ee] bg-white p-6 shadow-[0_3px_12px_#102b4508]">
              <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#174666]">
                Browse by part family
              </h2>
              <ul className="mt-4 space-y-3">
                {platform.partFamilies.map((family) => (
                  <li key={family.href + family.name}>
                    <Link
                      href={family.href}
                      className="group block rounded-lg border border-[#e5ebf0] px-4 py-3 transition hover:border-[#e8a928] hover:bg-[#fffaf0]"
                    >
                      <span className="block text-sm font-bold text-[#092b45] group-hover:text-[#174666]">
                        {family.name} →
                      </span>
                      <span className="mt-1 block text-[11px] leading-5 text-[#718394]">
                        {family.note}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#e1e8ee] bg-white p-6 shadow-[0_3px_12px_#102b4508]">
              <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#174666]">
                Related brands
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {platform.relatedBrands.map((brand) => (
                  <Link
                    key={brand}
                    href={`/brands/${brand}`}
                    className="rounded-full border border-[#d5dfe8] px-3 py-1.5 text-xs font-bold text-[#40576b] transition hover:border-[#e8a928] hover:text-[#09233b]"
                  >
                    {brand.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#05283f] p-6 text-white">
              <h2 className="text-lg font-bold leading-snug">
                Need a {platform.shortName} part today?
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#dce8ef]">
                Send the part number, quantity and destination. If the number is
                unreadable, send a photograph and nameplate details.
              </p>
              <a
                href={`mailto:sale@agoaviation.com?subject=${encodeURIComponent(
                  `${platform.shortName} part number`
                )}`}
                className="mt-4 block rounded-lg bg-[#ffc354] px-4 py-3 text-center text-sm font-extrabold text-[#09233b]"
              >
                sale@agoaviation.com
              </a>
              <a
                href="https://wa.me/917011123269"
                className="mt-3 block text-center text-xs font-bold text-white hover:text-[#ffc354]"
              >
                Chat on WhatsApp →
              </a>
            </div>
          </aside>
        </div>

        {products.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-[#092b45] sm:text-3xl">
              Related catalogue references
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#53697b]">
              These part numbers are listed in our catalogue for this platform
              area. Confirm the exact unit and configuration before ordering.
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="block rounded-xl border border-[#e1e8ee] bg-white p-4 transition hover:border-[#e8a928]"
                  >
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#9b6917]">
                      {product.brand}
                    </span>
                    <span className="mt-1 block font-mono text-sm font-bold text-[#092b45]">
                      {product.partNumber}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-xs leading-5 text-[#718394]">
                      {product.type}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-14">
          <h2 className="text-2xl font-bold text-[#092b45] sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-5 space-y-3">
            {platform.faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-xl border border-[#e1e8ee] bg-white p-5"
              >
                <summary className="cursor-pointer text-sm font-bold text-[#092b45]">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-[#53697b]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        {relatedPlatforms.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-[#092b45] sm:text-3xl">
              Related platform guides
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {relatedPlatforms.map((related) => (
                <Link
                  key={related.slug}
                  href={`/platforms/${related.slug}`}
                  className="rounded-xl border border-[#e1e8ee] bg-white p-5 transition hover:border-[#e8a928]"
                >
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#9b6917]">
                    {related.manufacturer}
                  </span>
                  <span className="mt-1 block text-sm font-bold text-[#092b45]">
                    {related.shortName} →
                  </span>
                  <span className="mt-2 block text-xs leading-5 text-[#718394]">
                    {related.summary}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e1e8ee] bg-white p-6">
          <div>
            <p className="text-sm font-bold text-[#092b45]">
              Explore the full catalogue or all platform guides
            </p>
            <p className="mt-1 text-xs text-[#718394]">
              {getAllPlatforms().length} platform guides and 350+ part numbers.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/platforms"
              className="rounded-lg border border-[#28445a] px-4 py-2.5 text-xs font-bold text-[#092b45]"
            >
              All platforms
            </Link>
            <Link
              href="/products"
              className="rounded-lg bg-[#062a43] px-4 py-2.5 text-xs font-extrabold text-white"
            >
              Browse products →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
