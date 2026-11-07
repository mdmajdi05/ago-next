'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { siteConfig } from '@/config/site';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface EnquiryFormProps {
  product: Product;
}

const enquiryFormSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your full name.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(1, { message: 'Please enter your phone number.' }),
  company: z.string().optional(),
  partNumber: z.string().min(1, { message: 'Part number is required.' }),
  message: z.string().min(5, { message: 'Please write a message.' }),
});

type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;

export default function EnquiryForm({ product }: EnquiryFormProps) {
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EnquiryFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      partNumber: product.part,
      message: `Enquiry for ${product.title} (${product.partNumber})`,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: EnquiryFormValues) => {
    const result = enquiryFormSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path && typeof path === 'string') {
          setError(path as keyof EnquiryFormValues, { message: issue.message });
        }
      });
      return;
    }

    const subject = `Parts Enquiry – ${data.partNumber} (${product.title})`;
    const body =
      `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company || 'N/A'}\nPart Number: ${data.partNumber}\nProduct: ${product.title}\nBrand: ${product.brand}\n\nMessage:\n${data.message}`;
    window.location.href = `mailto:${siteConfig.email.sales}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitStatus('success');
  };

  if (submitStatus === 'success') {
    return (
      <div className="rounded-xl border border-primary/20 bg-secondary/10 p-6 text-center">
        <h3 className="text-sm font-semibold text-primary">
          Enquiry ready to send
        </h3>
        <p className="mt-1 text-sm text-muted">
          Your email client will open with the enquiry pre-filled for {product.title}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-xl border border-line bg-white p-6 shadow-sm"
    >
      <h3 className="text-base font-semibold text-primary uppercase tracking-wider block">
        Request a Quote
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-semibold text-muted mb-1 uppercase"
          >
            Full name
          </label>
          <input
            id="name"
            {...register('name')}
            required
            className={cn(
              'w-full border border-line rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none',
              errors.name && 'border-red-500',
            )}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-muted mb-1 uppercase"
          >
            Email
          </label>
          <input
            id="email"
            {...register('email')}
            type="email"
            required
            className={cn(
              'w-full border border-line rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none',
              errors.email && 'border-red-500',
            )}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-semibold text-muted mb-1 uppercase"
          >
            Phone
          </label>
          <input
            id="phone"
            {...register('phone')}
            type="tel"
            className={cn(
              'w-full border border-line rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none',
              errors.phone && 'border-red-500',
            )}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-xs font-semibold text-muted mb-1 uppercase"
          >
            Company
          </label>
          <input
            id="company"
            {...register('company')}
            placeholder="Optional"
            className="w-full border border-line rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="part-number"
          className="block text-xs font-semibold text-muted mb-1 uppercase"
        >
          Part number
        </label>
        <input
          id="part-number"
          {...register('partNumber')}
          value={product.partNumber}
          readOnly
          className="w-full border border-line rounded-xl px-3 py-3 text-sm bg-slate-50 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-semibold text-muted mb-1 uppercase"
        >
          Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={4}
          className={cn(
            'w-full border border-line rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none',
            errors.message && 'border-red-500',
          )}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-secondary font-semibold uppercase text-[16px] px-[55px] py-[13px] rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  );
}
