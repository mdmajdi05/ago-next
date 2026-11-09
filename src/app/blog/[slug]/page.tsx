import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import {
  blogPosts,
  getBlogPost,
  getBlogSlugs,
  type BlogPost,
} from '@/data/blog/posts';
import {
  articleSchema,
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
} from '@/lib/seo';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const container = 'mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8';

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return buildPageMetadata({
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    image: post.image,
    imageAlt: post.imageAlt,
    type: 'article',
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
  });
}

function postSchema(post: BlogPost) {
  return [
    articleSchema({
      headline: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      image: post.image,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      keywords: post.keywords,
    }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    faqSchema(post.faqs),
  ];
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const related = blogPosts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => {
      const aMatch = a.category === post.category ? 1 : 0;
      const bMatch = b.category === post.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  const quoteHref = `mailto:${siteConfig.email.sales}?subject=${encodeURIComponent(
    `Enquiry from article: ${post.title}`
  )}&body=${encodeURIComponent(
    `Hello AGO Aviation,\n\nI read your article "${post.title}" and would like help with a spare part requirement.\n\nPart number / description:\n\nPlease share availability, lead time and pricing.\n`
  )}`;

  return (
    <main className="bg-white text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(postSchema(post)).replace(/</g, '\\u003c'),
        }}
      />

      <nav className="ago-crumbs border-b border-line bg-soft" aria-label="Breadcrumb">
        <div className="mx-auto flex max-w-[1320px] items-center px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm text-muted transition-colors hover:text-primary">
            Home
          </Link>
          <span className="mx-1 text-sm text-muted">/</span>
          <Link href="/blog" className="text-sm text-muted transition-colors hover:text-primary">
            Blog
          </Link>
          <span className="mx-1 text-sm text-muted">/</span>
          <span className="line-clamp-1 text-sm font-medium text-ink">{post.title}</span>
        </div>
      </nav>

      <article>
        <header className="border-b border-line bg-soft py-12">
          <div className={container}>
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
              <span className="rounded-full bg-white px-3 py-1 text-primary">
                {post.type}
              </span>
              <span>{post.category}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={post.datePublished}>{post.date}</time>
              <span aria-hidden="true">•</span>
              <span>{post.readingTime}</span>
            </div>

            <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
              {post.title}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              {post.excerpt}
            </p>
          </div>
        </header>

        <div className={`${container} py-10`}>
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-soft">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover"
            />
          </div>

          <p className="text-lg font-medium leading-8 text-ink">{post.intro}</p>

          <div className="mt-10 space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold tracking-tight text-ink">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-base leading-8 text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-base leading-7 text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-2xl border border-line bg-soft p-6 md:p-8">
            <h2 className="text-2xl font-bold text-ink">Frequently asked questions</h2>
            <div className="mt-6 space-y-5">
              {post.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-base font-bold text-ink">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-2xl bg-[#05283f] p-7 text-white md:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ffc45b]">
              Need help with a part?
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">
              Send your part number and we will verify availability.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#dce8ef]">
              AGO Aviation supplies gas turbine, compressor, valve, automation,
              instrumentation and mechanical spare parts worldwide. Share a part
              number, drawing or nameplate photo and our team will respond with
              availability, lead time and pricing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={quoteHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffc45b] px-6 py-3 text-sm font-extrabold text-[#09233b] transition hover:bg-[#ffd27f]"
              >
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                Email {siteConfig.email.sales}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-[#ffc45b] hover:text-[#ffc45b]"
              >
                Request a quote
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-[#ffc45b] hover:text-[#ffc45b]"
              >
                Browse the catalogue
              </Link>
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-2xl font-bold text-ink">Related reading</h2>
              <Link href="/blog" className="text-sm font-semibold text-primary hover:underline">
                View all articles →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group rounded-xl border border-line bg-white p-5 transition hover:border-primary/40 hover:shadow-md"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {item.category}
                  </p>
                  <h3 className="mt-2 line-clamp-3 text-sm font-bold leading-6 text-ink group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted">{item.date}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
