'use client';

import { useState } from 'react';

interface BlogShareProps {
  title: string;
  url: string;
}

export function BlogShare({ title, url }: BlogShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: 'WhatsApp',
      icon: 'fa-brands fa-whatsapp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: 'LinkedIn',
      icon: 'fa-brands fa-linkedin-in',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: 'X',
      icon: 'fa-brands fa-x-twitter',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: 'Facebook',
      icon: 'fa-brands fa-facebook-f',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'Email',
      icon: 'fa-solid fa-envelope',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this article link', url);
    }
  };

  return (
    <section
      className="mt-8 flex flex-wrap items-center gap-3 border-y border-line py-4"
      aria-label="Share this article"
    >
      <span className="text-xs font-bold uppercase tracking-wider text-muted">
        Share
      </span>

      <div className="flex flex-wrap items-center gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={`Share on ${link.label}`}
            title={`Share on ${link.label}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-muted transition-colors hover:border-primary hover:bg-primary hover:text-white"
          >
            <i className={link.icon} aria-hidden="true" />
          </a>
        ))}

        <button
          type="button"
          onClick={copyLink}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-line bg-white px-3 text-xs font-semibold text-muted transition-colors hover:border-primary hover:text-primary"
        >
          <i
            className={copied ? 'fa-solid fa-check' : 'fa-solid fa-link'}
            aria-hidden="true"
          />
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>

      <span className="sr-only" aria-live="polite">
        {copied ? 'Article link copied to clipboard.' : ''}
      </span>
    </section>
  );
}
