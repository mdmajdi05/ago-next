import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  href: string;
  image: string;
  imageAlt: string;
  category: string;
}

const agoContainer = 'max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8';
const sectionTitle = (eyebrow: string, title: string, description: string) => (
  <div className="text-center mb-12">
    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
      {eyebrow}
    </p>
    <h1 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight mb-4">{title}</h1>
    <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">{description}</p>
  </div>
);

const posts: BlogPost[] = [
  {
    title: 'Gas turbine spare parts procurement: a practical checklist',
    excerpt:
      'A step-by-step process for identifying a requirement, checking documentation, comparing offers and planning delivery.',
    date: '15 Oct 2026',
    href: '/blog/gas-turbine-spare-parts-procurement-checklist',
    image: '/images/engine-portfolio-banner.webp',
    imageAlt: 'Gas turbine engine and component portfolio for spare parts sourcing',
    category: 'Procurement guide',
  },
  {
    title: 'Gas turbine outage spares planning: build a reliable list',
    excerpt:
      'Turn inspection scope, failure history and lead-time risk into a practical outage inventory plan.',
    date: '08 Oct 2026',
    href: '/blog/gas-turbine-outage-spares-planning',
    image: '/images/engine-lm2500-banner.jpg',
    imageAlt: 'Industrial gas turbine used to illustrate maintenance outage spares planning',
    category: 'Maintenance planning',
  },
  {
    title: 'Gas turbine hot gas path parts: functions, wear and sourcing',
    excerpt:
      'Understand the roles of combustion liners, transition pieces, nozzles, blades and shrouds without guessing interchangeability.',
    date: '24 Sep 2026',
    href: '/blog/gas-turbine-hot-gas-path-parts-guide',
    image: '/images/engine-6000.jpeg',
    imageAlt: 'Gas turbine system representing hot gas path components and inspection planning',
    category: 'Component guide',
  },
  {
    title: 'How to verify a gas turbine spare part number before ordering',
    excerpt:
      'Use nameplates, drawings, revisions, configuration records and supplier evidence to reduce mismatch risk.',
    date: '12 Sep 2026',
    href: '/blog/verify-gas-turbine-spare-part-number',
    image: '/images/cfm-56-turbine.webp',
    imageAlt: 'Turbine engine image accompanying a guide to checking spare part numbers',
    category: 'Part identification',
  },
  {
    title: 'How to evaluate an industrial spare parts supplier',
    excerpt:
      'Compare traceability, inspection scope, commercial terms, export documentation and delivery commitments.',
    date: '28 Aug 2026',
    href: '/blog/evaluate-industrial-spare-parts-supplier',
    image: '/images/about-img.webp',
    imageAlt: 'AGO Aviation team image accompanying industrial spare parts supplier evaluation guidance',
    category: 'Supplier evaluation',
  },
  {
    title: 'GE Frame 5, 6, 7 and 9: what differs across the fleet',
    excerpt:
      'Firing temperature, bucket metallurgy, cooling architecture and the spares that matter most for each frame.',
    date: '14 Aug 2026',
    href: '/blog/ge-frame-5-6-7-9',
    image: '/images/ge-general.jpeg',
    imageAlt: 'GE gas turbine frame representing the Frame 5, 6, 7 and 9 platform guide',
    category: 'GE platform guide',
  },
];

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical guides and sourcing notes on GE, Siemens and Alstom gas turbine platforms, obsolescence, inventory planning and spare parts. Request a quote from AGO Aviation.',
  keywords: siteConfig.keywords as unknown as string[],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: 'Insights | Gas Turbine Parts Guides & Sourcing Notes | AGO Aviation',
    description:
      'Technical guides and sourcing notes on GE, Siemens and Alstom gas turbine platforms, obsolescence, inventory planning and spare parts.',
    url: `${siteConfig.url}/blog`,
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
    title: 'Insights | Gas Turbine Parts Guides & Sourcing Notes | AGO Aviation',
    description:
      'Technical guides and sourcing notes on GE, Siemens and Alstom gas turbine platforms, obsolescence, inventory planning and spare parts.',
    images: [siteConfig.ogImage],
    creator: siteConfig.socials.x.handle,
  },
};

export default function BlogPage() {
  const primaryBtn =
    'inline-flex items-center justify-center gap-2 bg-primary text-secondary font-semibold px-6 py-3 rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-colors duration-200 whitespace-nowrap';

  return (
    <main className="bg-white">
      <section className="py-15 bg-soft">
        <div className={agoContainer}>
          {sectionTitle(
            'Insights',
            'Blog',
            'Practical notes on turbine platforms, obsolescence, sourcing strategy and inventory planning — written by the team that handles these parts every day.'
          )}
          <div className="flex items-center gap-3 justify-center">
            <a
              href="/products"
              className={`${primaryBtn} text-sm`}
              aria-label="Browse the catalogue"
            >
              Browse the catalogue
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
          <span className="text-ink text-sm font-medium">Blog</span>
        </div>
      </nav>

      <section className="py-15">
        <div className={agoContainer}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <article
                key={post.href}
                className="border border-line rounded-lg bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 flex flex-col"
              >
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  width={1200}
                  height={630}
                  className="rounded-lg mb-4 object-cover h-48 w-full"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  priority={index === 0}
                />
                <div className="flex items-center gap-2 mb-3">
                  <time className="text-xs font-semibold text-primary">{post.date}</time>
                  <span className="text-xs font-medium text-muted">{post.category}</span>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-primary font-semibold hover:text-secondary transition-colors">
                  Read the guide
                  <i className="fa-solid fa-arrow-right text-[12px]"></i>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-15 bg-soft">
        <div className={agoContainer}>
          <div className="rounded-lg bg-white p-8 md:p-12 border border-line shadow-sm text-center">
            <h2 className="text-2xl font-bold text-ink mb-3">Looking for something specific?</h2>
            <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Browse by brand and category, or send us the part number and let our engineers do the
              cross-referencing.
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
