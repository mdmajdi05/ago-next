import Image from 'next/image';
import Link from 'next/link';

interface ServiceCard {
  image: string;
  alt: string;
  title: string;
  desc: string;
}

export interface ServiceSectionProps {
  cards: ServiceCard[];
}

export function ServiceSection({ cards }: ServiceSectionProps) {
  return (
    <section id="parts" className="services py-16 lg:py-24 bg-white">
      <div className="product-title text-center mb-12 lg:mb-16">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-2 block">
          What We Supply
        </h3>
        <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-4">
          Gas Turbine Parts and Components We Supply
        </h2>
        <p className="text-muted leading-relaxed max-w-3xl mx-auto text-lg">
          Our range covers the components that wear fastest and matter most to turbine performance. Each part is
          quoted against your drawing, part number or OEM reference, so you know exactly what you are buying before
          you commit.
        </p>
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
        <div className="service-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card) => (
            <div
              key={card.title}
              className="service_card bg-white border border-line rounded-xl p-6 hover:border-primary/40 transition-colors flex flex-col h-full"
            >
              <div className="service-card-image h-[160px] relative overflow-hidden rounded-lg bg-soft mb-4">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <div className="service-card-content flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-ink mb-2">{card.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-6 flex-1">
                  {card.desc}
                </p>
                <Link href="/contact">
                  <button
                    className="bg-primary text-secondary font-semibold uppercase text-[16px] px-[55px] py-[13px] rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-all duration-500 w-full"
                    type="button"
                  >
                    Request a Quote
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 lg:mt-16">
          <p className="max-w-[780px] mx-auto text-sm text-muted leading-[1.75]">
            Looking for something not listed here? Send us the details. If it is a gas turbine part, we will tell
            you plainly whether we can supply it.
          </p>
          <Link href="/contact" className="mt-6 inline-block">
            <button
              className="bg-primary text-secondary font-semibold uppercase text-[16px] px-[55px] py-[13px] rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-all duration-500"
              type="button"
            >
              Request a Quote
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
