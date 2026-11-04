import type { Metadata } from 'next';
import Link from 'next/link';
import { brandService } from '@/services';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Authorized Brands',
  description:
    'AGO Aviation is an authorized distributor for GE, Siemens, ABB, Atlas Copco and 23+ turbine parts brands worldwide. Genuine gas turbine spares with warranty.',
  openGraph: {
    title: 'Authorized Brands | AGO Aviation',
    description:
      'AGO Aviation is an authorized distributor for GE, Siemens, ABB, Atlas Copco and 23+ turbine parts brands worldwide.',
    type: 'website',
    url: 'https://www.agoaviation.com/brands',
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authorized Brands | AGO Aviation',
    description:
      'AGO Aviation is an authorized distributor for turbine parts brands worldwide.',
  },
};

export default function BrandsPage() {
  const groups = brandService.getGroups();
  const totalBrands = brandService.getAll().length;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Brands', href: '/brands' },
  ];

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbs} />

      <section className="mb-12">
        <h1 className="text-3xl font-bold text-primary tracking-tight mb-3">
          Authorized Brands
        </h1>
        <p className="text-muted">
          Genuine gas turbine parts and spares from {totalBrands} authorized brands worldwide.
        </p>
      </section>

      {groups.map((group) => (
        <section key={group.name} className="mb-14">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-wider mb-6 block">
            {group.name}
          </h2>
          {group.description && (
            <p className="text-muted mb-6">{group.description}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {group.brands.map((brand) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className="block">
                <div className="rounded-xl border border-line bg-slate-50 p-6 hover:border-primary transition-colors">
                  <h3 className="text-base font-semibold text-primary">{brand.name}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {brand.count} part{brand.count !== 1 ? 's' : ''}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
