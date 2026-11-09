import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import {
  BlogExplorer,
  type BlogPostItem,
} from '@/components/blog/blog-explorer';
import { blogPosts } from '@/data/blog/posts';
import {
  breadcrumbSchema,
  buildPageMetadata,
  collectionPageSchema,
} from '@/lib/seo';

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

const posts: BlogPostItem[] = blogPosts.map((post) => ({
  title: post.title,
  excerpt: post.excerpt,
  date: post.date,
  href: `/blog/${post.slug}`,
  image: post.image,
  imageAlt: post.imageAlt,
  category: post.category,
  type: post.type,
}));

export const metadata: Metadata = buildPageMetadata({
  title: 'Gas Turbine Parts Blog, Guides & Case Studies',
  description:
    'Practical guides on gas turbine spare parts, hot gas path components, obsolescence, outage planning and supplier evaluation, plus real sourcing case studies from AGO Aviation.',
  path: '/blog',
  keywords: [
    'gas turbine parts blog',
    'gas turbine spare parts guide',
    'hot gas path parts',
    'gas turbine outage planning',
    'obsolescence sourcing',
  ],
  image: '/images/engine-portfolio-banner.webp',
  imageAlt: 'AGO Aviation gas turbine parts guides and case studies',
});

export default function BlogPage() {
  const primaryBtn =
    'inline-flex items-center justify-center gap-2 bg-primary text-secondary font-semibold px-6 py-3 rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-colors duration-200 whitespace-nowrap';

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
    collectionPageSchema({
      name: 'AGO Aviation Blog, Guides and Case Studies',
      description:
        'Technical guides and case studies on gas turbine spare parts, obsolescence, outage planning and supplier evaluation.',
      path: '/blog',
      items: posts.map((post) => ({ name: post.title, url: post.href })),
    }),
  ];

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <section className="py-15 bg-soft">
        <div className={agoContainer}>
          {sectionTitle(
            'Blog & Case Studies',
            'Blog',
            'Practical notes on turbine platforms, obsolescence, sourcing strategy and inventory planning — plus case studies from the team that handles these parts every day.'
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
          <BlogExplorer posts={posts} />
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
