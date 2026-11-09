'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type BlogPostType = 'Blog' | 'Case Study';

export interface BlogPostItem {
  title: string;
  excerpt: string;
  date: string;
  href: string;
  image: string;
  imageAlt: string;
  category: string;
  type: BlogPostType;
}

const typeOptions: Array<'All' | BlogPostType> = ['All', 'Blog', 'Case Study'];

export function BlogExplorer({ posts }: { posts: BlogPostItem[] }) {
  const [activeType, setActiveType] = useState<'All' | BlogPostType>('All');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(
    () =>
      Array.from(new Set(posts.map((post) => post.category))).sort((a, b) =>
        a.localeCompare(b)
      ),
    [posts]
  );

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const matchesType = activeType === 'All' || post.type === activeType;
        const matchesCategory =
          activeCategory === 'All' || post.category === activeCategory;

        return matchesType && matchesCategory;
      }),
    [posts, activeType, activeCategory]
  );

  const resetFilters = () => {
    setActiveType('All');
    setActiveCategory('All');
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-lg border border-line bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div
          role="tablist"
          aria-label="Filter by content type"
          className="flex flex-wrap gap-2"
        >
          {typeOptions.map((option) => {
            const active = activeType === option;

            return (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveType(option)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-primary bg-primary text-white'
                    : 'border-line bg-white text-ink hover:border-primary/40 hover:text-primary'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor="blog-category-filter"
            className="text-sm font-semibold text-ink"
          >
            Category
          </label>
          <select
            id="blog-category-filter"
            value={activeCategory}
            onChange={(event) => setActiveCategory(event.target.value)}
            className="h-10 cursor-pointer rounded-full border border-line bg-white px-4 text-sm font-medium text-ink outline-none focus:border-primary"
          >
            <option value="All">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mb-6 text-sm text-muted" aria-live="polite">
        Showing {filteredPosts.length} of {posts.length} articles
      </p>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <article
              key={`${post.href}-${post.title}`}
              className="flex flex-col rounded-lg border border-line bg-white p-6 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
            >
              <div className="relative mb-4">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  width={1200}
                  height={630}
                  className="h-48 w-full rounded-lg object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  priority={index === 0}
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {post.type}
                </span>
              </div>

              <div className="mb-3 flex items-center gap-2">
                <time className="text-xs font-semibold text-primary">{post.date}</time>
                <span className="text-xs font-medium text-muted">{post.category}</span>
              </div>

              <h3 className="mb-2 text-lg font-bold text-ink transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mb-4 flex-1 leading-relaxed text-muted">{post.excerpt}</p>

              <Link
                href={post.href}
                className="mt-auto inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:text-secondary"
              >
                {post.type === 'Case Study' ? 'Request the case study' : 'Read the guide'}
                <i className="fa-solid fa-arrow-right text-[12px]" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-line bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-ink">
            No articles match these filters.
          </p>
          <p className="mt-2 text-muted">
            Try a different content type or category.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-[20px_0px] bg-primary px-6 py-3 text-sm font-semibold text-secondary transition-colors duration-200 hover:bg-secondary hover:text-primary"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
