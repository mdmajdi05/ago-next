import type { Metadata } from 'next';
import Link from 'next/link';
import { brandService } from '@/services';
import { breadcrumbSchema, buildPageMetadata, collectionPageSchema } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Gas Turbine Parts Brands We Supply – 23 Manufacturers',
  description:
    'Browse 23 gas turbine and industrial brands supported by AGO Aviation, including GE, Siemens, ABB, Atlas Copco, Metso, Bently Nevada, Woodward and Honeywell.',
  path: '/brands',
  keywords: [
    'gas turbine parts brands',
    'GE gas turbine parts',
    'Siemens gas turbine parts',
    'ABB spare parts',
    'industrial parts manufacturers',
  ],
  image: '/images/ge-general.jpeg',
  imageAlt: 'Gas turbine brands supported by AGO Aviation',
});

export default function BrandsPage() {
  const groups = brandService.getGroups();
  const totalBrands = brandService.getAll().length;

  const schema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Brands', path: '/brands' },
    ]),
    collectionPageSchema({
      name: 'Gas Turbine Parts Brands We Supply',
      description:
        'Gas turbine and industrial manufacturers supported by AGO Aviation.',
      path: '/brands',
      items: groups.flatMap((group) =>
        group.brands.map((brand) => ({
          name: brand.name,
          url: `/brands/${brand.slug}`,
        }))
      ),
    }),
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <section className="ago-page-hero">
        <div className="ago-container">
          <div className="ago-page-hero__inner">
            <span className="ago-eyebrow">Brands</span>
            <h1>Brands We Supply</h1>
            <p>
              Gas turbine parts and spares from {totalBrands} manufacturers worldwide.
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
