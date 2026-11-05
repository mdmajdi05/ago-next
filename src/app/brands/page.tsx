import type { Metadata } from 'next';
import Link from 'next/link';
import { brandService } from '@/services';
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

  return (
    <main>
      <section className="ago-page-hero">
        <div className="ago-container">
          <div className="ago-page-hero__inner">
            <span className="ago-eyebrow">Brands</span>
            <h1>Authorized Brands</h1>
            <p>
              Genuine gas turbine parts and spares from {totalBrands} authorized brands worldwide.
            </p>
            <div className="ago-page-hero__actions">
              <Link href="/contact" className="ago-btn ago-btn--primary">
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <nav className="ago-crumbs" aria-label="Breadcrumb">
        <div className="ago-container">
          <Link href="/">Home</Link>
          <span className="ago-crumbs__sep">/</span>
          <span>Brands</span>
        </div>
      </nav>

      <section className="ago-section">
        <div className="ago-container">
          {groups.map((group) => (
            <div key={group.name} className="mb-14">
              <div className="ago-section__head" style={{ marginBottom: '18px' }}>
                <span className="ago-eyebrow ago-eyebrow--navy">{group.name}</span>
              </div>
              {group.description && <p className="ago-lead" style={{ marginTop: 0, marginBottom: '24px' }}>{group.description}</p>}
              <div className="ago-grid ago-grid--4">
                {group.brands.map((brand) => (
                  <Link key={brand.slug} href={`/brands/${brand.slug}`} className="ago-card ago-card--hover">
                    <h3>{brand.name}</h3>
                    <p>{brand.count} part{brand.count !== 1 ? 's' : ''}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
