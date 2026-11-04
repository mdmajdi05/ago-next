import type { Metadata } from 'next';
import Link from 'next/link';
import brandService from '@/services/brandService';

export const metadata: Metadata = {
  title: 'Brands - Authorized Distributors',
  description:
    'AGO Aviation is an authorized distributor for GE, Siemens, ABB, Atlas Copco and 23+ turbine parts brands worldwide. Genuine gas turbine spares with warranty.',
};

export default function BrandsPage() {
  const groups = brandService.getGroups();
  const totalBrands = brandService.getAll().length;

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-[#0b3d6b] tracking-tight">Authorized Brands</h1>
        <p className="mt-2 text-slate-600">
          Genuine gas turbine parts and spares from {totalBrands} authorized brands worldwide.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.name} className="mb-14">
          <h2 className="text-2xl font-bold text-[#0b3d6b] mb-6">{group.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {group.brands.map((brand) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className="block">
                <div className="rounded-xl border border-slate-200 p-6 hover:border-[#0b3d6b] hover:shadow-md transition">
                  <h3 className="text-base font-semibold text-[#0b3d6b]">{brand.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">
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
