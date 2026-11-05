import Image from 'next/image';
import { AgoButton } from '@/components/ui/button';

const defaultCards = [
  {
    image: '/images/lm-100-turbine.webp',
    alt: 'Turbine shrouds',
    title: 'Turbine Shrouds',
    desc: 'Shrouds control the clearance between rotating blades and the casing. Accurate dimensions and the right material help limit tip leakage and protect efficiency over long running hours.',
  },
  {
    image: '/images/lm-6000-turbine.webp',
    alt: 'Buckets and blades',
    title: 'Buckets and Blades',
    desc: 'Rotating blades take the highest thermal and mechanical loads in the machine. We supply replacements matched to frame and stage, with material and dimensional details confirmed before production.',
  },
  {
    image: '/images/lm-5000-turbine.webp',
    alt: 'Nozzles and vanes',
    title: 'Nozzles and Vanes',
    desc: 'Stationary nozzles and vanes direct hot gas onto the rotating stages. Their profile and finish directly affect flow, output and component life.',
  },
  {
    image: '/images/cfm-56-turbine.webp',
    alt: 'Combustion components',
    title: 'Combustion Components',
    desc: 'Liners, transition pieces and fuel nozzles operate where temperatures are highest. We help you source replacements ahead of combustion inspections.',
  },
  {
    image: '/images/lm-2500-turbine.webp',
    alt: 'Hot gas path parts',
    title: 'Hot Gas Path Parts',
    desc: 'Complete sets of hot section components for planned outages, so your maintenance window is not delayed by missing parts.',
  },
  {
    image: '/images/solar-turbines.jpg',
    alt: 'Spares and consumables',
    title: 'Spares and Consumables',
    desc: 'Seals, fasteners and other routine items that keep a turbine in service between major overhauls.',
  },
];

export function ServiceSection({ cards = defaultCards }: { cards?: typeof defaultCards }) {
  return (
    <section id="parts" className="service-section">
      <div className="service-header">
        <h3 className="service-kicker">What We Supply</h3>
        <h2 className="service-title">Gas Turbine Parts and Components We Supply</h2>
        <p className="service-copy">
          Our range covers the components that wear fastest and matter most to turbine performance. Each part is quoted
          against your drawing, part number or OEM reference, so you know exactly what you are buying before you commit.
        </p>
      </div>

      <div className="service-grid-wrap">
        <div className="service-grid">
          {cards.map((card) => (
            <div key={card.title} className="service-card">
              <div className="service-card-media">
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={840}
                  height={400}
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 366px"
                  className="service-card-image"
                />
              </div>
              <div className="service-card-content">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <AgoButton href="/contact" variant="serve" arrow={false}>
                  Request a Quote
                  <span className="service-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </AgoButton>
              </div>
            </div>
          ))}
        </div>

        <div className="service-footer">
          <p>
            Looking for something not listed here? Send us the details. If it is a gas turbine part, we will tell you
            plainly whether we can supply it.
          </p>
          <AgoButton href="/contact" variant="primary">
            Request a Quote
          </AgoButton>
        </div>
      </div>
    </section>
  );
}
