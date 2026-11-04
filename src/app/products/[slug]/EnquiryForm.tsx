'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { siteConfig } from '@/config/site';
import { Product } from '@/types/product';

interface EnquiryFormProps {
  product: Product;
}

export default function EnquiryForm({ product }: EnquiryFormProps) {
  const { register, handleSubmit, formState } = useForm<{
    name: string;
    email: string;
    phone: string;
    company: string;
    partNumber: string;
    message: string;
  }>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      partNumber: product.part,
      message: `Enquiry for ${product.title} (${product.part})`,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const { isSubmitting } = formState;

  const onSubmit = (data: {
    name: string;
    email: string;
    phone: string;
    company: string;
    partNumber: string;
    message: string;
  }) => {
    const subject = `Parts Enquiry – ${data.partNumber} (${product.title})`;
    const body =
      `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company || 'N/A'}\nPart Number: ${data.partNumber}\nProduct: ${product.title}\nBrand: ${product.brand}\n\nMessage:\n${data.message}`;
    window.location.href = `mailto:${siteConfig.email.sales}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitStatus('success');
  };

  if (submitStatus === 'success') {
    return (
      <div className="rounded-lg border border-[#f0a843]/20 bg-[#f0a843]/10 p-4">
        <h3 className="text-sm font-semibold text-[#0b3d6b]">Enquiry ready to send</h3>
        <p className="mt-1 text-sm text-slate-600">
          Your email client will open with the enquiry pre-filled for {product.title}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold text-[#0b3d6b]">Request a Quote</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Full name</label>
          <input
            {...register('name')}
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0b3d6b] outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
          <input
            {...register('email')}
            type="email"
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0b3d6b] outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Phone</label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0b3d6b] outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Company</label>
          <input
            {...register('company')}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0b3d6b] outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">Part number</label>
        <input
          {...register('partNumber')}
          value={product.part}
          readOnly
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-slate-50 outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">Message</label>
        <textarea
          {...register('message')}
          rows={4}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0b3d6b] outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0b3d6b] text-white px-4 py-2.5 rounded-lg text-sm font-medium disabled:opacity-60 hover:bg-[#093257] transition"
      >
        {isSubmitting ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  );
}
