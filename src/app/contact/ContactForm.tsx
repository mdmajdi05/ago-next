'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { siteConfig } from '@/config/site';
import { Brand } from '@/types/brand';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your full name.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  company: z.string().optional(),
  productInterest: z.string().min(1, {
    message: 'Please select a product interest.',
  }),
  message: z.string().min(10, {
    message: 'Please write a message of at least 10 characters.',
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  brands: Brand[];
}

export function ContactForm({ brands }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>(
    'idle',
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      productInterest: '',
      message: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = (values: ContactFormValues) => {
    const subject = `New spare parts requirement from ${values.name}${
      values.company ? ` (${values.company})` : ''
    }`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || 'Not provided'}`,
      `Company: ${values.company || 'Not provided'}`,
      `Product interest: ${values.productInterest}`,
      '',
      'Requirement:',
      values.message,
    ].join('\n');

    const mailtoUrl = `mailto:${siteConfig.email.sales}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus('submitting');
    window.open(mailtoUrl, '_blank');
    setStatus('success');
  };

  const resetForm = () => {
    reset();
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-line bg-white p-6 shadow-sm text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981] mx-auto mb-3">
            <i className="fa-solid fa-check"></i>
          </div>
          <h3 className="text-base font-bold text-ink mb-2">Thank you!</h3>
          <p className="text-muted text-sm leading-relaxed max-w-[320px] mx-auto mb-6">
            Your requirement is on its way to{' '}
            <a
              href={`mailto:${siteConfig.email.sales}`}
              className="text-primary underline-offset-4 hover:underline font-medium"
            >
              {siteConfig.email.sales}
            </a>
            . Your email app should have opened with a pre-filled message —
            press Send to complete it.
          </p>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center justify-center gap-2 bg-primary text-secondary font-semibold uppercase text-[16px] px-[55px] py-[13px] rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-all duration-500"
          >
            <i className="fa-solid fa-paper-plane"></i> Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-ink"
            >
              Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              {...register('name')}
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              className="block w-full border border-slate-300 rounded-lg px-3 py-2 text-ink focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-ink"
            >
              Work email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              {...register('email')}
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              className="block w-full border border-slate-300 rounded-lg px-3 py-2 text-ink focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-semibold text-ink">
              Phone
            </label>
            <input
              id="phone"
              {...register('phone')}
              type="tel"
              placeholder="+91 70111 23269"
              autoComplete="tel"
              className="block w-full border border-slate-300 rounded-lg px-3 py-2 text-ink focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold text-ink"
            >
              Company <span className="text-muted font-normal">(optional)</span>
            </label>
            <input
              id="company"
              {...register('company')}
              type="text"
              placeholder="Your company"
              autoComplete="organization"
              className="block w-full border border-slate-300 rounded-lg px-3 py-2 text-ink focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="product-interest"
            className="block text-sm font-semibold text-ink"
          >
            Product interest <span className="text-red-600">*</span>
          </label>
          <select
            id="product-interest"
            {...register('productInterest')}
            className="block w-full border border-slate-300 rounded-lg px-3 py-2 text-ink focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
          >
            <option value="">Select a brand or product</option>
            {brands.map((brand) => (
              <option key={brand.slug} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
          {errors.productInterest && (
            <p className="mt-1 text-xs text-red-600">
              {errors.productInterest.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-ink"
          >
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={5}
            placeholder="Quantity, condition, delivery deadline, site location…"
            className="block w-full border border-slate-300 rounded-lg px-3 py-2 text-ink focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full inline-flex items-center justify-center gap-2 bg-primary text-secondary font-semibold uppercase text-[16px] px-[55px] py-[13px] rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i> Sending…
            </>
          ) : (
            <>
              Send requirement <i className="fa-solid fa-paper-plane"></i>
            </>
          )}
        </button>

        <p className="mt-3 text-xs text-muted leading-relaxed">
          Submitting opens your email app addressed to{' '}
          <a
            href={`mailto:${siteConfig.email.sales}`}
            className="text-primary hover:underline font-medium"
          >
            {siteConfig.email.sales}
          </a>
          . You still need to press Send in that app.
        </p>
      </form>
    </div>
  );
}
