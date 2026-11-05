import Link from 'next/link';

const defaultBrands = [
  'General Electric',
  'Rolls-Royce',
  'Siemens',
  'Solar Turbines',
  'Alstom',
  'Ansaldo',
  'Bently Nevada',
  'GE LM6000',
  'Pratt & Whitney',
  'Zorya-Mashproekt',
];

function BrandGroup({ brands, hidden = false }: { brands: string[]; hidden?: boolean }) {
  return (
    <div className="brand-marquee-track" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <Link key={brand} href="/brands" className="brand-pill">
          <i className="fa-solid fa-plane" aria-hidden="true" />
          {brand}
        </Link>
      ))}
    </div>
  );
}

export function BrandMarquee({ brands = defaultBrands }: { brands?: string[] | { name: string }[] }) {
  const displayBrands = (brands ?? defaultBrands).map((brand) =>
    typeof brand === 'string' ? brand : brand.name,
  );

  return (
    <section className="brand-marquee-section">
      <div className="brand-marquee-inner">
        <p className="brand-marquee-label">Trusted OEM &amp; Platform Expertise</p>
      </div>
      <div className="brand-marquee-viewport">
        <div className="brand-marquee-scroll">
          <BrandGroup brands={displayBrands} />
          <BrandGroup brands={displayBrands} hidden />
        </div>
      </div>
    </section>
  );
}
