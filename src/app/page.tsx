import type { Metadata } from 'next';

import type { Brand } from '@/types/brand';
import { getFeatured } from '@/services/productService';
import { getAll as getAllBrands } from '@/services/brandService';
import { getAll as getAllCategories } from '@/services/categoryService';
import { siteConfig } from '@/config/site';

import { Hero } from '@/components/sections/hero';
import { BrandMarquee } from '@/components/sections/brandMarquee';
import { AboutIntro } from '@/components/sections/aboutIntro';
import { ServiceSection } from '@/components/sections/serviceSection';
import { AboutFrame } from '@/components/sections/aboutFrame';
import { MaterialsSection } from '@/components/sections/materialsSection';
import { WhyUsSection } from '@/components/sections/whyUsSection';
import { HowWeWorkSection } from '@/components/sections/howWeWorkSection';
import { FaqSection } from '@/components/sections/faqSection';
import { ContactForm } from '@/app/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Gas Turbine Parts Manufacturer and Supplier | Ago Aviation',
  description: siteConfig.description,
  keywords: siteConfig.keywords as unknown as string[],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: 'Gas Turbine Parts Manufacturer and Supplier | Ago Aviation',
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.logoAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gas Turbine Parts Manufacturer and Supplier | Ago Aviation',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.socials.x.handle,
  },
};

const container = 'mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]';

const serviceCards = [
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

function QualityPanelSection() {
  return (
    <section id="quality" className="quality-panel-section">
      <div className={container}>
        <div className="quality-panel-shell">
          <span className="quality-panel-glow" aria-hidden="true" />
          <div className="quality-panel-grid">
            <div className="quality-panel-copy">
              <span className="hpcert-eyebrow">
                <i className="fa-solid fa-shield-halved" /> Quality
              </span>
              <h3>Quality You Can Verify</h3>
              <p>
                Quality claims are only useful when you can check them. Ago Aviation supports its parts with inspection records and documentation that your team can review, and we are happy to discuss your specific quality requirements before an order is placed.
              </p>
            </div>

            <div className="quality-panel-badge">
              <span className="hpcert-seal-ring" aria-hidden="true" />
              <span className="hpcert-seal-core" aria-hidden="true">
                <i className="fa-solid fa-clipboard-check" />
              </span>
              <span className="hpcert-seal-text">Inspection<br /> Records</span>
            </div>
          </div>

          <ul className="hq-chips">
            <li><i className="fa-solid fa-file-lines" /> Inspection records</li>
            <li><i className="fa-solid fa-folder-open" /> Part documentation</li>
            <li><i className="fa-solid fa-ruler-combined" /> Material and dimensions stated on the quote</li>
            <li><i className="fa-solid fa-comments" /> Your quality requirements reviewed before order</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section id="industries" className="industry-section">
      <div className={container}>
        <div className="industry-shell">
          <h3 className="industry-kicker">Industries We Serve</h3>
          <h2 className="industry-title">Serving Power Generation and Industrial Operators</h2>
          <p className="industry-copy">
            Gas turbines drive electricity generation, oil and gas operations, petrochemical processing and heavy
            industry. Our customers include plant operators and maintenance teams who need dependable parts and
            service companies who need a supplier they can count on for their own clients. Whatever the
            application, the standard is the same: the right part, documented properly, delivered when you need
            it.
          </p>
        </div>
      </div>
    </section>
  );
}

function CtaBannerSection() {
  return (
    <section className="cta-banner">
      <div className="cta-banner-overlay" aria-hidden="true" />
      <div className={container + ' cta-banner-inner'}>
        <div className="cta-banner-shell">
          <div className="cta-banner-copy">
            <span className="cta-banner-kicker">
              <i className="fa-solid fa-industry" /> Send us your requirement
            </span>
            <h2>Need a Gas Turbine Part? Send Us Your Requirement.</h2>
            <p>
              Tell us what your turbine needs. Share a part number, drawing or frame and stage, and our team will respond with a clear, detailed quote.
            </p>
          </div>

          <div className="cta-banner-actions">
            <a href="/contact" className="cta-banner-button">Request a Quote</a>
            <div className="cta-banner-links">
              <a href="mailto:sale@agoaviation.com"><i className="fa-solid fa-envelope" /> sale@agoaviation.com</a>
              <a href="tel:+917011123269"><i className="fa-solid fa-phone" /> +91 7011123269</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBandSection({ brands }: { brands: Brand[] }) {
  return (
    <section className="contact-band-section">
      <div className="contact-band-glow" aria-hidden="true" />
      <div className={container + ' contact-band-inner'}>
        <div className="contact-band-grid">
          <div className="contact-band-form-wrap">
            <div className="contact-band-kicker">
              <i className="fa-solid fa-paper-plane" /> Get In Touch
            </div>
            <h2>Contact Us</h2>
            <p>
              Share your part number or requirement — our team will come back with availability, lead time and pricing.
            </p>
            <ContactForm brands={brands} />
          </div>

          <aside className="contact-info-panel">
            <span className="contact-info-orb contact-info-orb-one" aria-hidden="true" />
            <span className="contact-info-orb contact-info-orb-two" aria-hidden="true" />
            <div className="contact-info-panel-inner">
              <div className="contact-info-tag">
                <i className="fa-solid fa-headset" /> Contact Information
              </div>
              <h3>Direct lines to our team.</h3>
              <p>
                Call the quote desk, visit our New Delhi office, or write to the team that looks after your account.
              </p>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <span className="contact-info-icon"><i className="fa-solid fa-phone-volume" /></span>
                  <div>
                    <h4>Help Line</h4>
                    <a href="tel:7011123269">+91 7011123269</a>
                    <span>Quote desk · answered by a specialist</span>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-icon"><i className="fa-solid fa-envelope" /></span>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:sale@agoaviation.com">sale@agoaviation.com</a>
                    <span>Quotes, lead times and availability</span>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-icon"><i className="fa-solid fa-location-dot" /></span>
                  <div>
                    <h4>Visit Us</h4>
                    <p>A-24/5, 3rd Floor, NH-19, Mohan Cooperative Industrial Estate, New Delhi, 110044</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const [featuredProducts, brands, categories] = await Promise.all([
    getFeatured(8),
    getAllBrands(),
    getAllCategories(),
  ]);

  return (
    <main className="bg-white">
      <Hero />

      <BrandMarquee brands={brands} />

      <AboutIntro />

      <ServiceSection cards={serviceCards} />

      <AboutFrame />

      <MaterialsSection />

      <WhyUsSection />

      <QualityPanelSection />

      <HowWeWorkSection />

      <IndustriesSection />

      <FaqSection />

      <CtaBannerSection />

      <ContactBandSection brands={brands} />

    </main>
  );
}
