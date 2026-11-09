import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { productService, brandService } from '@/services';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { getProductImage } from '@/lib/catalog/images';
import { buildProductContent } from '@/lib/catalog/productContent';
import { getPlatform, type Platform } from '@/data/platforms';
import {
  breadcrumbSchema as buildBreadcrumbSchema,
  buildPageMetadata,
  faqSchema as buildFaqSchema,
  productSchema as buildProductSchema,
} from '@/lib/seo';
import EnquiryForm from './EnquiryForm';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Brand-to-platform links. These are editorial guides, not fitment claims, so
 * a GE part links to the GE platform family rather than asserting one model.
 */
const BRAND_PLATFORMS: Record<string, string[]> = {
  ge: ['ge-frame-6', 'ge-lm2500', 'ge-mark-iv-v'],
  siemens: ['siemens-sgt-700-800', 'siemens-sgt-400', 'siemens-sgt-a05'],
  'bently-nevada': ['bently-nevada-3300-3500', 'ge-mark-iv-v'],
  woodward: ['woodward-controls', 'ge-mark-iv-v'],
};

export async function generateStaticParams() {
  const slugs = productService.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productService.getBySlug(slug);

  if (!product) {
    return buildPageMetadata({
      title: 'Product Not Found',
      description: 'The requested spare part could not be found.',
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  const title = `${product.partNumber} ${product.type} - ${product.brand} Spare Part`;
  const description = buildProductContent(product).metaDescription;

  return buildPageMetadata({
    title,
    description,
    path: `/products/${product.slug}`,
    keywords: [
      product.partNumber,
      `${product.brand} ${product.partNumber}`,
      `${product.brand} ${product.type}`,
      `${product.type} spare part`,
      `${product.category} parts`,
      `buy ${product.brand} ${product.partNumber}`,
      `${product.partNumber} price`,
    ],
    image: getProductImage(product),
    imageAlt: `${product.brand} ${product.partNumber} ${product.type}`,
  });
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = productService.getBySlug(slug);

  if (!product) notFound();

  const related = productService.getRelated(product, 4);
  const imageUrl = getProductImage(product);
  const typeCount = productService.getByType(
    product.categorySlug,
    product.typeSlug
  ).length;
  const categoryCount = productService.getByCategory(product.categorySlug).length;
  const brandCount = productService.getByBrand(product.brand).length;

  const pageTitle = `${product.brand} ${product.partNumber} ${product.type}`;
  const catalogueTitle = product.displayTitle;
  const showCatalogueTitle =
    catalogueTitle.trim().toLowerCase() !== pageTitle.toLowerCase();

  const specifications = product.specifications
    ? Object.entries(product.specifications)
    : [
        ['Part Number', product.partNumber],
        ['Brand', product.brand],
        ['Category', product.category],
        ['Type', product.type],
        ['Condition', 'New / Refurbished on request'],
        ['Availability', 'Quote on request'],
      ];

  const breadcrumbs = [
    { label: 'Products', href: '/products' },
    { label: product.category, href: `/categories/${product.categorySlug}` },
    ...(typeCount >= 3
      ? [
          {
            label: product.type,
            href: `/categories/${product.categorySlug}/${product.typeSlug}`,
          },
        ]
      : []),
    { label: product.partNumber, href: `/products/${product.slug}` },
  ];

  const productUrl = product.canonicalUrl;

  const content = buildProductContent(product);

  const platformLinks = (
    BRAND_PLATFORMS[brandService.slugifyBrand(product.brand)] || []
  )
    .map((platformSlug) => getPlatform(platformSlug))
    .filter((platform): platform is Platform => Boolean(platform));

  const faqs = [
    {
      question: `What is ${product.brand} ${product.partNumber}?`,
      answer: `${product.brand} ${product.partNumber} is a ${product.type.toLowerCase()} listed under ${product.category} in the AGO Aviation catalogue. It is identified in our records as "${catalogueTitle}".`,
    },
    {
      question: `Can I request a quote for ${product.partNumber}?`,
      answer: `Yes. Send your quantity, destination and any technical references through the enquiry form and our team will confirm availability, condition and pricing for ${product.brand} ${product.partNumber}.`,
    },
    {
      question: `Does AGO Aviation supply ${product.brand} spare parts worldwide?`,
      answer: `Yes. AGO Aviation supplies gas turbine and industrial spare parts to power plants, oil and gas facilities and EPC contractors worldwide. Quote part number ${product.partNumber} when you contact us.`,
    },
  ];

  const productSchema = buildProductSchema({
    name: pageTitle,
    description: content.overview.join(' '),
    url: productUrl,
    image: imageUrl,
    brand: product.brand,
    sku: product.partNumber,
    category: product.category,
    type: product.type,
    relatedUrls: related.map((item) => item.canonicalUrl),
  });

  const breadcrumbSchema = buildBreadcrumbSchema(
    breadcrumbs.map((item) => ({ name: item.label, path: item.href }))
  );

  const faqSchema = buildFaqSchema(faqs);


  return (
    <main className="min-h-screen bg-[#f5f8fb] text-[#102b43]">

      {/* Product structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productSchema, breadcrumbSchema, faqSchema]).replace(
            /</g,
            '\\u003c'
          ),
        }}
      />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-10">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Main Product Section */}
      <section className="mx-auto max-w-[1440px] px-4 pb-12 pt-5 sm:px-6 lg:px-10">

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_1fr] xl:gap-12">

          {/* Product Image */}
          <div className="space-y-4">

            <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-2xl border border-[#e1e8ee] bg-white p-5 shadow-[0_8px_30px_rgba(12,39,60,0.05)] sm:aspect-[1.12/1]">

              <div className="absolute left-5 top-5 z-10 rounded-full border border-[#dce7ef] bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#183c59]">
                Aviation Component
              </div>

              <Image
                src={imageUrl}
                alt={`${catalogueTitle} - Part Number ${product.partNumber} by ${product.brand}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8 transition-transform duration-500 hover:scale-[1.04]"
              />

              <div className="absolute bottom-4 right-4 rounded-lg border border-[#e5ebf0] bg-white/90 px-3 py-2 text-[10px] font-semibold text-[#52687a]">
                PART NO. {product.partNumber}
              </div>
            </div>

            {/* Image supporting information */}
            <div className="grid grid-cols-3 gap-3">

              <div className="rounded-xl border border-[#e1e8ee] bg-white p-3 text-center">
                <span className="mb-1 block text-lg text-[#d69a32]">✦</span>
                <p className="text-[10px] font-bold text-[#183c59] sm:text-xs">
                  Quality Focus
                </p>
              </div>

              <div className="rounded-xl border border-[#e1e8ee] bg-white p-3 text-center">
                <span className="mb-1 block text-lg text-[#d69a32]">✈</span>
                <p className="text-[10px] font-bold text-[#183c59] sm:text-xs">
                  Global Sourcing
                </p>
              </div>

              <div className="rounded-xl border border-[#e1e8ee] bg-white p-3 text-center">
                <span className="mb-1 block text-lg text-[#d69a32]">↗</span>
                <p className="text-[10px] font-bold text-[#183c59] sm:text-xs">
                  Quote Support
                </p>
              </div>

            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">

            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#e7f0f7] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#174666]">
                  {product.brand}
                </span>

                <span className="rounded-full bg-[#fff2d9] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#9b6917]">
                  Request Availability
                </span>
              </div>

              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#092b45] sm:text-4xl lg:text-[42px]">
                {pageTitle}
              </h1>

              {showCatalogueTitle && (
                <p className="mt-2 text-sm font-semibold leading-6 text-[#53697b]">
                  Catalogue listing: {catalogueTitle}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">

                <div className="rounded-lg border border-[#dce5ed] bg-white px-4 py-2.5">
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-[#718394]">
                    Part Number
                  </span>
                  <span className="mt-1 block font-mono text-sm font-bold text-[#123c5b]">
                    {product.partNumber}
                  </span>
                </div>

                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-[#718394]">
                    Manufacturer
                  </span>
                  <Link
                    href={`/brands/${brandService.slugifyBrand(product.brand)}`}
                    className="mt-1 inline-block text-sm font-bold text-[#123c5b] hover:text-[#d69a32] hover:underline"
                  >
                    {product.brand} ↗
                  </Link>
                </div>

                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-[#718394]">
                    Category
                  </span>
                  <Link
                    href={`/categories/${product.categorySlug}`}
                    className="mt-1 inline-block text-sm font-bold text-[#123c5b] hover:text-[#d69a32] hover:underline"
                  >
                    {product.category} ↗
                  </Link>
                </div>

                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-[#718394]">
                    Type
                  </span>
                  {typeCount >= 3 ? (
                    <Link
                      href={`/categories/${product.categorySlug}/${product.typeSlug}`}
                      className="mt-1 inline-block text-sm font-bold text-[#123c5b] hover:text-[#d69a32] hover:underline"
                    >
                      {product.type} ↗
                    </Link>
                  ) : (
                    <span className="mt-1 inline-block text-sm font-bold text-[#123c5b]">
                      {product.type}
                    </span>
                  )}
                </div>

              </div>
            </div>

            {/* Product Description */}
            <div className="border-t border-[#dfe7ed] pt-5">
              <h2 className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#183c59]">
                Product Overview
              </h2>

              <div className="space-y-3 text-sm leading-7 text-[#53697b]">
                {content.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Compatibility */}
            <div className="border-t border-[#dfe7ed] pt-5">
              <h2 className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#183c59]">
                Compatibility &amp; Applications
              </h2>

              <ul className="space-y-2 text-sm leading-6 text-[#53697b]">
                {content.applications.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[#d69a32]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inspection & documentation */}
            <div className="border-t border-[#dfe7ed] pt-5">
              <h2 className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#183c59]">
                Inspection &amp; Documentation
              </h2>

              <ul className="space-y-2 text-sm leading-6 text-[#53697b]">
                {content.inspection.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[#d69a32]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why source from AGO Aviation */}
            <div className="border-t border-[#dfe7ed] pt-5">
              <h2 className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#183c59]">
                Why source this part from AGO Aviation
              </h2>

              <ul className="space-y-2 text-sm leading-6 text-[#53697b]">
                <li className="flex gap-2">
                  <span className="text-[#d69a32]">•</span>
                  <span>
                    Part-number verification against the exact {product.brand}{' '}
                    {product.type.toLowerCase()} configuration
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#d69a32]">•</span>
                  <span>
                    New, refurbished and as-removed options confirmed before
                    quotation
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#d69a32]">•</span>
                  <span>
                    Worldwide delivery with export documentation available on
                    request
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#d69a32]">•</span>
                  <span>
                    Cross-referencing for superseded or obsolete{' '}
                    {product.partNumber} references
                  </span>
                </li>
              </ul>
            </div>

            {/* Part number references */}
            <div className="border-t border-[#dfe7ed] pt-5">
              <h2 className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#183c59]">
                Part Number &amp; Catalogue Reference
              </h2>

              <dl className="grid gap-x-5 gap-y-3 text-sm sm:grid-cols-2">
                {[
                  ['Manufacturer', product.brand],
                  ['Part number', product.partNumber],
                  ['Component type', product.type],
                  ['Catalogue title', catalogueTitle],
                  ['Catalogue reference', product.name],
                  ['Category', product.category],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[10px] font-bold uppercase tracking-widest text-[#718394]">
                      {label}
                    </dt>
                    <dd className="mt-0.5 break-words font-semibold text-[#24455f]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-sm leading-7 text-[#53697b]">
                {product.brand} {product.partNumber} is catalogued by AGO
                Aviation under {product.type} within the{' '}
                {product.category.toLowerCase()} range. Quote part number{' '}
                <span className="font-mono font-bold text-[#123c5b]">
                  {product.partNumber}
                </span>{' '}
                in your enquiry so our sourcing team can confirm the exact{' '}
                {product.brand} configuration. The catalogue currently lists{' '}
                {categoryCount} parts in{' '}
                <Link
                  href={`/categories/${product.categorySlug}`}
                  className="font-bold text-[#123c5b] underline decoration-[#d69a32] decoration-2 underline-offset-2 hover:text-[#b77b1c]"
                >
                  {product.category}
                </Link>{' '}
                and {brandCount} products from{' '}
                <Link
                  href={`/brands/${brandService.slugifyBrand(product.brand)}`}
                  className="font-bold text-[#123c5b] underline decoration-[#d69a32] decoration-2 underline-offset-2 hover:text-[#b77b1c]"
                >
                  {product.brand}
                </Link>
                .
              </p>
            </div>

            {/* Quote CTA */}
            <div className="rounded-2xl bg-[#092d47] p-5 text-white shadow-[0_12px_30px_rgba(9,45,71,0.15)] sm:p-6">

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffffff15] text-xl text-[#ffc45b]">
                  ✉
                </div>

                <div>
                  <h2 className="text-lg font-bold sm:text-xl">
                    Looking for this part?
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-[#d4e1e9]">
                    Send your requirement to our team and request a quotation
                    for this aviation component.
                  </p>
                </div>
              </div>

              <a
                href="#request-quote"
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-[#ffc45b] px-5 py-4 text-sm font-extrabold text-[#092b45] transition hover:bg-[#ffd17c]"
              >
                Request a Quote
                <span aria-hidden="true">→</span>
              </a>

              <p className="mt-3 text-center text-[10px] text-[#c1d3df]">
                Quote-based service · No online pricing
              </p>

            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

              {[
                ['01', 'Global Parts Sourcing'],
                ['02', 'Enquiry Assistance'],
                ['03', 'Technical Support'],
              ].map(([number, label]) => (
                <div
                  key={number}
                  className="rounded-xl border border-[#e1e8ee] bg-white p-3"
                >
                  <span className="text-[10px] font-extrabold text-[#d69a32]">
                    {number}
                  </span>
                  <p className="mt-1 text-[11px] font-bold text-[#183c59]">
                    {label}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Specifications + Enquiry */}
        <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_0.85fr] lg:gap-10">

          {/* Specifications */}
          <section className="overflow-hidden rounded-2xl border border-[#e1e8ee] bg-white shadow-[0_5px_22px_rgba(12,39,60,0.04)]">

            <div className="border-b border-[#e5ebf0] px-5 py-5 sm:px-7">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#d69a32]">
                Technical Information
              </p>

              <h2 className="mt-1 text-xl font-extrabold text-[#092b45]">
                Product Specifications
              </h2>

              <p className="mt-1 text-xs text-[#718394]">
                Product identification and technical details.
              </p>
            </div>

            <div className="p-5 sm:p-7">
              <table className="w-full border-collapse text-left text-sm">
                <tbody>
                  {specifications.map(([key, value], index) => (
                    <tr
                      key={key}
                      className={`border-b border-[#e8edf1] last:border-0 ${
                        index % 2 === 0 ? 'bg-[#f8fafc]' : 'bg-white'
                      }`}
                    >
                      <th className="w-[42%] px-4 py-4 text-xs font-bold text-[#284a64] sm:text-sm">
                        {key}
                      </th>

                      <td className="break-words px-4 py-4 font-mono text-xs leading-6 text-[#5d7182] sm:text-sm">
                        {String(value ?? '—')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Enquiry Form */}
          <section
            id="request-quote"
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#e1e8ee] bg-white shadow-[0_5px_22px_rgba(12,39,60,0.05)]"
          >

            <div className="bg-[#092d47] px-5 py-6 text-white sm:px-7">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#ffc45b]">
                Parts Enquiry
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                Request a Quote
              </h2>

              <p className="mt-2 text-xs leading-6 text-[#d4e1e9]">
                Complete the enquiry form below. Our team will review
                your requirement.
              </p>
            </div>

            <div className="p-5 sm:p-7">
              <div className="mb-5 rounded-xl border border-[#e4ebf0] bg-[#f7f9fb] p-4">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#718394]">
                  Enquiring About
                </span>

                <p className="mt-1 text-sm font-bold text-[#123c5b]">
                  {catalogueTitle}
                </p>

                <p className="mt-1 font-mono text-xs text-[#718394]">
                  Part Number: {product.partNumber}
                </p>
              </div>

              <EnquiryForm product={product} />
            </div>

          </section>
        </div>

        {/* FAQ */}
        <section className="mt-14">
          <div className="mb-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#d69a32]">
              Part Enquiry Help
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#092b45]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-[#e1e8ee] bg-white p-5 shadow-[0_5px_22px_rgba(12,39,60,0.04)]"
              >
                <h3 className="text-sm font-extrabold text-[#123c5b]">
                  {faq.question}
                </h3>
                <p className="mt-2 text-xs leading-6 text-[#5d7182]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Platform & model guides */}
        <section className="mt-14 rounded-2xl border border-[#e1e8ee] bg-white p-6 shadow-[0_5px_22px_rgba(12,39,60,0.04)] sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#d69a32]">
                Platform Support
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#092b45]">
                Gas turbine platform guides
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#718394]">
                Confirm the machine family and the part groups normally sourced
                for it. These guides are a starting point; exact fitment is
                verified against your part number and unit details.
              </p>
            </div>
            <Link
              href="/platforms"
              className="text-xs font-bold text-[#123c5b] transition hover:text-[#d69a32]"
            >
              All platform guides →
            </Link>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {platformLinks.map((platform) => (
              <Link
                key={platform.slug}
                href={`/platforms/${platform.slug}`}
                className="group rounded-xl border border-[#e5ebf0] bg-[#f8fafc] p-4 transition hover:border-[#d69a32] hover:bg-[#fffaf0]"
              >
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#9b6917]">
                  {platform.manufacturer}
                </span>
                <span className="mt-1 block text-sm font-bold text-[#123c5b]">
                  {platform.shortName} →
                </span>
                <span className="mt-1 line-clamp-2 block text-[11px] leading-5 text-[#718394]">
                  {platform.summary}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16">

            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#d69a32]">
                  You May Also Need
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#092b45]">
                  Related Products
                </h2>

                <p className="mt-2 text-sm text-[#718394]">
                  Explore other components from our product catalogue.
                </p>
              </div>

              <Link
                href="/products"
                className="text-xs font-bold text-[#123c5b] transition hover:text-[#d69a32]"
              >
                Browse All Products →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className="group rounded-xl border border-[#e1e8ee] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#d69a32] hover:shadow-[0_12px_28px_rgba(12,39,60,0.08)]"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf1f6] text-lg text-[#174666] transition group-hover:bg-[#fff2d9] group-hover:text-[#b77b1c]">
                    ◈
                  </div>

                  <h3 className="line-clamp-2 text-sm font-bold leading-6 text-[#123c5b]">
                    {item.title}
                  </h3>

                  <p className="mt-2 font-mono text-xs text-[#718394]">
                    P/N: {item.partNumber}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#e8edf1] pt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#718394]">
                      View Product
                    </span>

                    <span className="text-[#d69a32] transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}

            </div>
          </section>
        )}

      </section>
    </main>
  );
}
