import type { Metadata } from 'next';
import Link from 'next/link';

import { getAllPlatforms } from '@/data/platforms';
import {
  breadcrumbSchema,
  buildPageMetadata,
  collectionPageSchema,
  faqSchema,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Gas Turbine Platform & Model Parts Guides',
  description:
    'Browse gas turbine platform and model parts guides for GE Frame, LM and MS packages, Alstom GT11, GT13E2 and GT26, Siemens SGT, Rolls-Royce Avon, Zorya-Mashproekt, Solar Turbines, Bently Nevada 3300/3500 and GE Mark IV/V.',
  path: '/platforms',
  keywords: [
    'gas turbine platform parts',
    'gas turbine model spare parts',
    'GE Frame parts',
    'GE LM2500 parts',
    'Alstom GT26 parts',
    'Siemens SGT parts',
    'Bently Nevada 3300 3500',
  ],
  image: '/images/engine-portfolio-banner.webp',
  imageAlt: 'Gas turbine platform and model parts guides by AGO Aviation',
});

const faqs = [
  {
    question: 'What is a gas turbine platform parts guide?',
    answer:
      'A platform guide explains a specific gas turbine family or control system, the part families commonly sourced for it, and how AGO Aviation verifies a part number before quoting. It is a starting point for operators who know the machine but not the exact catalogue reference.',
  },
  {
    question: 'Can AGO Aviation supply parts for platforms not listed here?',
    answer:
      'Yes. The guides cover the families we see most often in enquiries, but we source gas turbine and industrial spare parts across many other OEMs and package integrators. Send the part number and unit details and we will review the request.',
  },
  {
    question: 'Do the platform pages confirm exact fitment?',
    answer:
      'No. They describe the platform and the part families we source. Exact fitment is confirmed against the part number, unit model, serial number and any drawing or photograph before an offer is issued.',
  },
];

export default function PlatformsPage() {
  const platforms = getAllPlatforms();
  const families = Array.from(
    new Set(platforms.map((platform) => platform.family))
  );

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Platforms', path: '/platforms' },
    ]),
    collectionPageSchema({
      name: 'Gas Turbine Platform & Model Parts Guides',
      description:
        'Platform and model guides for gas turbine and control-system spare parts supplied by AGO Aviation.',
      path: '/platforms',
      items: platforms.map((platform) => ({
        name: platform.name,
        url: `/platforms/${platform.slug}`,
      })),
    }),
    faqSchema(faqs),
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
        <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <p className="mb-3 flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#ffc34f]">
            <i className="h-[2px] w-8 bg-[#f5b83f]" /> Platforms &amp; Models
          </p>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Gas turbine platform and model parts guides
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#d7e4ee] sm:text-base">
            Identify the machine family, the part groups normally required and
            the verification steps that keep a spare-parts order accurate. Each
            guide links back into the part-number catalogue and the brands we
            support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-lg bg-[#ffc354] px-5 py-3 text-sm font-extrabold text-[#09233b]"
            >
              Search the catalogue →
            </Link>
            <a
              href="mailto:sale@agoaviation.com?subject=Platform%20parts%20enquiry"
              className="rounded-lg border border-white/40 px-5 py-3 text-sm font-bold text-white"
            >
              Send a part number
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#092b45] sm:text-3xl">
            Browse by platform family
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#53697b]">
            The guides are grouped by OEM and system type. If you already have a
            part number, search the catalogue first; if you know the machine but
            not the reference, start with the relevant guide below.
          </p>
        </div>

        <div className="space-y-12">
          {families.map((family) => {
            const group = platforms.filter(
              (platform) => platform.family === family
            );
            return (
              <div key={family}>
                <h3 className="mb-4 border-b border-[#dbe5ed] pb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#174666]">
                  {family}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.map((platform) => (
                    <Link
                      key={platform.slug}
                      href={`/platforms/${platform.slug}`}
                      className="group rounded-2xl border border-[#e1e8ee] bg-white p-6 shadow-[0_3px_12px_#102b4508] transition hover:-translate-y-0.5 hover:border-[#e8a928] hover:shadow-lg"
                    >
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9b6917]">
                        {platform.manufacturer}
                      </p>
                      <h4 className="mt-2 text-lg font-bold leading-snug text-[#092b45] group-hover:text-[#174666]">
                        {platform.shortName}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-[#53697b]">
                        {platform.summary}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-[#b77b1c]">
                        View platform guide <b>→</b>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[#dbe5ed] bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-2xl font-bold text-[#092b45] sm:text-3xl">
                Not sure which platform you have?
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#53697b]">
                Send a photograph of the nameplate, the unit model and any part
                number you can read. Our team will confirm the likely platform
                and the next step, without obliging you to a purchase.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:sale@agoaviation.com?subject=Platform%20identification"
                  className="rounded-lg bg-[#062a43] px-5 py-3 text-sm font-extrabold text-white"
                >
                  ✉ Email our team
                </a>
                <a
                  href="https://wa.me/917011123269"
                  className="rounded-lg border border-[#28445a] px-5 py-3 text-sm font-bold text-[#092b45]"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-xl border border-[#e1e8ee] bg-[#f8fafc] p-5"
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
        </div>
      </section>
    </main>
  );
}
