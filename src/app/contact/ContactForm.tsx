'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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

type ContactFormField = keyof ContactFormValues;

interface ContactFormProps {
  brands: Brand[];
}

export function ContactForm({ brands }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
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
    const result = contactFormSchema.safeParse(values);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path && typeof path === 'string') {
          setError(path as ContactFormField, {
            type: 'manual',
            message: issue.message,
          });
        }
      });
      return;
    }

    setSubmitStatus('submitting');
    setTimeout(() => {
      setSubmitStatus('success');
      reset();
    }, 1000);
  };

  if (submitStatus === 'success') {
    return (
      <div className="rounded-lg border border-border bg-ago-mist p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-3">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-text mb-2">Thank you!</h3>
        <p className="text-text-muted mb-4">
          Your enquiry has been received. Our team will get back to you shortly.
        </p>
        <Button
          type="button"
          onClick={() => setSubmitStatus('idle')}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            {...register('name')}
            type="text"
            placeholder="John Doe"
            className={cn(
              'w-full rounded-lg border border-border px-3 py-2 text-text focused:border-primary focused:outline-none',
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
            className="block text-sm font-medium text-text mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            {...register('email')}
            type="email"
            placeholder="name@example.com"
            className={cn(
              'w-full rounded-lg border border-border px-3 py-2 text-text focused:border-primary focused:outline-none',
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
            className="block text-sm font-medium text-text mb-1"
          >
            Phone
          </label>
          <input
            id="phone"
            {...register('phone')}
            type="tel"
            placeholder="+91 70111 23269"
            className={cn(
              'w-full rounded-lg border border-border px-3 py-2 text-text focused:border-primary focused:outline-none',
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
            className="block text-sm font-medium text-text mb-1"
          >
            Company (optional)
          </label>
          <input
            id="company"
            {...register('company')}
            type="text"
            placeholder="Your company"
            className="w-full rounded-lg border border-border px-3 py-2 text-text focused:border-primary focused:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="product-interest"
          className="block text-sm font-medium text-text mb-1"
        >
          Product Interest
        </label>
        <select
          id="product-interest"
          {...register('productInterest')}
          className="w-full rounded-lg border border-border px-3 py-2 text-text focused:border-primary focused:outline-none"
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

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-text mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={5}
          placeholder="Tell us about your requirement..."
          className={cn(
            'w-full rounded-lg border border-border px-3 py-2 text-text focused:border-primary focused:outline-none',
            errors.message && 'border-red-500',
          )}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitStatus === 'submitting'}
        className="w-full"
      >
        {submitStatus === 'submitting' ? 'Sending...' : 'Send Enquiry'}
      </Button>
    </form>
  );
}
