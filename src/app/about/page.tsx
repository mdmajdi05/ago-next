import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

const agoContainer = 'max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8';

const sectionHead = (eyebrow: string, title: string, description?: string) => (
  <div className="text-center mb-14">
    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
      {eyebrow}
    </p>
    <h2 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight mb-4">{title}</h2>
    {description && (
      <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">{description}</p>
    )}
  </div>
);

const primaryBtn =
  'inline-flex items-center justify-center gap-2 bg-primary text-secondary font-semibold px-6 py-3 rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-colors duration-200 whitespace-nowrap';

const stats = [
  { value: '356+', label: 'Precision Parts in Stock' },
  { value: '23+', label: 'Global Brands Supported' },
  { value: '9+', label: 'Product Categories' },
  { value: '25+ Years', label: 'Industry Experience' },
];

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'WS Turbomar Private Limited (AGO Aviation) is a New Delhi-based supplier of gas turbine, compressor, automation and industrial spare parts worldwide. Request a quote from AGO Aviation.',
  keywords: siteConfig.keywords as unknown as string[],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: 'About AGO Aviation | WS Turbomar Private Limited',
    description:
      'WS Turbomar Private Limited (AGO Aviation) is a New Delhi-based supplier of gas turbine, compressor, automation and industrial spare parts worldwide.',
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.logoAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About AGO Aviation | WS Turbomar Private Limited',
    description:
      'WS Turbomar Private Limited (AGO Aviation) is a New Delhi-based supplier of gas turbine, compressor, automation and industrial spare parts worldwide.',
    images: [siteConfig.ogImage],
    creator: siteConfig.socials.x.handle,
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="py-15 bg-soft">
        <div className={agoContainer}>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              About us
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight mb-4">
              A spare parts partner built around the outage clock
            </h1>
            <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">
              WS Turbomar Private Limited (AGO Aviation) supplies gas turbine, compressor, automation
              and industrial spare parts to power plants, oil & gas operators, MROs and manufacturers
              worldwide.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact" className={`${primaryBtn} text-sm`}>
              Talk to our team
              <i className="fa-solid fa-arrow-right text-[12px]"></i>
            </a>
          </div>
        </div>
      </section>

      <nav className="ago-crumbs" aria-label="Breadcrumb">
        <div className={agoContainer}>
          <Link href="/" className="text-muted text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-muted text-sm mx-1">/</span>
          <span className="text-ink text-sm font-medium">About us</span>
        </div>
      </nav>

      <section className="py-15">
        <div className={agoContainer}>
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="order-first lg:order-last">
              <Image
                src="/images/about-img.webp"
                alt="AGO Aviation team coordinating a spare parts shipment"
                width={900}
                height={675}
                className="rounded-xl shadow-sm object-cover h-[460px] w-full"
                priority
              />
            </div>
            <div className="order-last lg:order-first">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                Who we are
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-ink mb-4 tracking-tight">
                One desk for the parts nobody wants to wait for
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Founded in 2015 and headquartered in New Delhi, WS Turbomar Private Limited began by
                supporting aviation operators and grew into a broader industrial spare parts supplier
                as customers asked us to solve the same problem across their turbine and compressor
                fleets.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                Today we combine an approved global supplier network with in-house inspection and
                export coordination. That means a single purchase order can cover hot gas path
                components, control cards, instrumentation, valves, filters and motors — consolidated
                and shipped together.
              </p>
              <ul className="space-y-3">
                {[
                  'Genuine OEM, OEM-equivalent and serviceable options',
                  'Certificate of conformance and traceability records',
                  '24/7 AOG and breakdown response',
                  'Worldwide freight, customs and insurance handled',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted leading-relaxed">
                    <i className="fa-solid fa-check mt-0.5 text-secondary shrink-0"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-15 bg-soft">
        <div className={agoContainer}>
          {sectionHead(
            'What we stand for',
            'Four commitments we do not trade away'
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: 'fa-solid fa-check-circle',
                title: 'Verifiable quality',
                text: 'Every part is inspected against OEM documentation before dispatch. Condition, origin and paperwork are confirmed in writing, not assumed.',
              },
              {
                icon: 'fa-solid fa-bolt',
                title: 'Speed without shortcuts',
                text: 'Our 24/7 desk responds to breakdowns around the clock, with expedited freight and hands-on support through customs and delivery.',
              },
              {
                icon: 'fa-solid fa-user-tie',
                title: 'Engineer-led service',
                text: 'The people answering your RFQ understand turbine frames, part numbers and interchangeability — so the first reply is usually the right one.',
              },
              {
                icon: 'fa-solid fa-plane',
                title: 'Export-ready by default',
                text: 'Documentation, packing and logistics are built for international shipments to plants, workshops and warehouses in more than 40 countries.',
              },
            ].map((value) => (
              <div
                key={value.title}
                className="border border-line rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary ${value.icon === 'fa-solid fa-bolt' ? 'text-secondary' : ''}`}>
                  <i className={value.icon}></i>
                </span>
                <h3 className="font-bold text-ink mb-2">{value.title}</h3>
                <p className="text-muted leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-15">
        <div className={agoContainer}>
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                Where we work
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-ink mb-4 tracking-tight">
                New Delhi headquarters, global supply network
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Our team works across time zones with suppliers and freight partners in North America,
                Europe, the Middle East and Asia. That reach is what lets us commit to a lead time
                instead of promising to check.
              </p>
              <div className="border border-line rounded-lg bg-white p-6 shadow-sm">
                <table className="w-full text-left text-sm border-collapse">
                  <tbody>
                    {[
                      ['Legal entity', 'WS Turbomar Private Limited'],
                      [
                        'Head office',
                        'A-24/5, 3rd Floor, NH-19, Mohan Cooperative Industrial Estate, New Delhi, Delhi 110044, India',
                      ],
                      ['Coverage', 'Worldwide — 40+ countries'],
                      ['Hours', '24/7 AOG and breakdown desk'],
                    ].map(([key, val]) => (
                      <tr key={key} className="border-b border-line last:border-0">
                        <td className="py-3 text-muted font-medium w-[140px]">{key}</td>
                        <td className="py-3 text-ink">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <Image
                src="/images/team-1.jpg"
                alt="AGO Aviation engineering and sales team"
                width={900}
                height={675}
                className="rounded-xl shadow-sm object-cover h-[460px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-15 bg-primary">
        <div className={agoContainer}>
          {sectionHead('Trust in numbers', 'Why operators rely on AGO Aviation')}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="text-3xl lg:text-5xl font-bold text-secondary block mb-2">
                  {stat.value}
                </span>
                <p className="text-primary/90 text-sm font-medium leading-none">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-15">
        <div className={agoContainer}>
          <div className="rounded-lg bg-white p-8 md:p-12 border border-line shadow-sm text-center">
            <h2 className="text-2xl font-bold text-ink mb-3">
              Want to discuss a long-term supply agreement?
            </h2>
            <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              We support planned maintenance programmes, frame-specific stock lists and consignment
              arrangements. Tell us your fleet and we will propose a coverage plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contact" className={`${primaryBtn} text-sm`}>
                Request a quote
                <i className="fa-solid fa-arrow-right text-[12px]"></i>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-ink border border-line font-semibold px-6 py-3 rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-colors duration-200 whitespace-nowrap text-sm"
              >
                <i className="fa-brands fa-whatsapp text-secondary"></i>
                WhatsApp the desk
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
