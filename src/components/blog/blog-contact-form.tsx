'use client';

import { useState } from 'react';

import { siteConfig } from '@/config/site';

interface BlogContactFormProps {
  articleTitle: string;
}

export function BlogContactForm({ articleTitle }: BlogContactFormProps) {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const requirement = String(data.get('requirement') || '').trim();

    const subject = `Spare parts enquiry from article: ${articleTitle}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      '',
      `Article: ${articleTitle}`,
      '',
      'Requirement:',
      requirement,
      '',
      'Please share availability, lead time and pricing.',
    ].join('\n');

    window.location.href = `mailto:${siteConfig.email.sales}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981]">
          <i className="fa-solid fa-check" aria-hidden="true" />
        </div>
        <p className="text-sm font-bold text-ink">Your email draft is ready</p>
        <p className="mt-1 text-xs leading-5 text-muted">
          Press send in your email app to complete the enquiry, or write to{' '}
          <a
            className="font-semibold text-primary underline-offset-4 hover:underline"
            href={`mailto:${siteConfig.email.sales}`}
          >
            {siteConfig.email.sales}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-3 text-xs font-semibold text-primary hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label htmlFor="blog-inline-name" className="sr-only">
          Full name
        </label>
        <input
          id="blog-inline-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Full name *"
          className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label htmlFor="blog-inline-email" className="sr-only">
          Work email
        </label>
        <input
          id="blog-inline-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Work email *"
          className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label htmlFor="blog-inline-phone" className="sr-only">
          Phone number
        </label>
        <input
          id="blog-inline-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Phone (optional)"
          className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label htmlFor="blog-inline-requirement" className="sr-only">
          Part number or requirement
        </label>
        <textarea
          id="blog-inline-requirement"
          name="requirement"
          required
          rows={3}
          placeholder="Part number or requirement *"
          className="w-full resize-none rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-[16px_0px] bg-primary px-4 py-2.5 text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-primary"
      >
        <i className="fa-solid fa-paper-plane" aria-hidden="true" />
        Send enquiry
      </button>

      <p className="text-[11px] leading-4 text-muted">
        Your details stay private and are used only to answer this enquiry.
      </p>
    </form>
  );
}
