import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';

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

export default async function Home() {
  const [featuredProducts, brands, categories] = await Promise.all([
    getFeatured(8),
    getAllBrands(),
    getAllCategories(),
  ]);

  return (
    <main className="bg-white">
      {/* Page splash loader */}
      <div id="pageSplash" className="page-splash" aria-hidden="true">
        <div className="splash-inner">
          <div className="relative w-[125px] h-[80px] shrink-0">
            <Image
              src="/images/LOGO.png"
              alt="Ago Aviation Gas Turbine Parts"
              fill
              sizes="125px"
            />
          </div>
          <span className="splash-bar"><span></span></span>
          <span className="splash-tag">Gas Turbine Parts Manufacturer &amp; Supplier</span>
        </div>
      </div>

      <Script id="page-splash-init">
        {`
          (function(){
            var splash = document.getElementById("pageSplash");
            function hideSplash(){ if(!splash || splash.classList.contains("is-hidden")) return; splash.classList.add("is-hidden"); window.setTimeout(function(){ if(splash && splash.parentNode) splash.parentNode.removeChild(splash); }, 480); }
            if(splash){ var splashTimer = window.setTimeout(hideSplash, 600); window.addEventListener("load", function(){ window.clearTimeout(splashTimer); window.setTimeout(hideSplash, 150); }); window.setTimeout(hideSplash, 1200); }
          })();
        `}
      </Script>

      <Hero />

      <BrandMarquee brands={brands} />

      <AboutIntro />

      <ServiceSection cards={serviceCards} />

      <AboutFrame />

      <MaterialsSection />

      <WhyUsSection />

      {/* Certifications section - quality panel with chips */}
      <section id="quality" className="py-16 lg:py-24 bg-soft">
        <div className={container}>
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 lg:p-12 rounded-xl bg-white border border-line overflow-hidden">
              <span
                className="absolute inset-0 -z-10"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    'radial-gradient(ellipse at 80% -20%, rgba(1,74,142,0.06) 0, transparent 60%), radial-gradient(ellipse at 20% 120%, rgba(240,169,69,0.05) 0, transparent 60%)',
                }}
              />
              <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
                <div className="flex-1">
                  <span className="hpcert-eyebrow inline-flex items-center gap-2 mb-4 text-secondary font-semibold text-sm uppercase tracking-wider block">
                    <i className="fa-solid fa-shield-halved" /> Quality
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-ink mb-4">
                    Quality You Can Verify
                  </h3>
                  <p className="text-muted leading-relaxed mb-0">
                    Quality claims are only useful when you can check them. Ago Aviation supports its parts with inspection records and documentation that your team can review, and we are happy to discuss your specific quality requirements before an order is placed.
                  </p>
                </div>
                <div className="relative inline-block flex items-center justify-center">
                  <span
                    className="hpcert-seal-ring inline-block w-16 h-16 rounded-full border-2 border-primary/30"
                    aria-hidden="true"
                  />
                  <span
                    className="hpcert-seal-core absolute -inset-px flex items-center justify-center w-full h-full rounded-full bg-white border border-primary z-10"
                    aria-hidden="true"
                  >
                    <i className="fa-solid fa-clipboard-check text-secondary text-xl" />
                  </span>
                  <span className="hpcert-seal-text mt-3 text-center text-xs text-muted leading-tight">
                    Inspection<br /> Records
                  </span>
                </div>
              </div>
              <ul className="hq-chips mt-10 lg:mt-12 flex flex-wrap gap-3">
                <li className="flex items-center gap-2 text-sm text-ink bg-white/60 border border-line px-4 py-3 rounded-lg">
                  <i className="fa-solid fa-file-lines text-primary" /> Inspection records
                </li>
                <li className="flex items-center gap-2 text-sm text-ink bg-white/60 border border-line px-4 py-3 rounded-lg">
                  <i className="fa-solid fa-folder-open text-primary" /> Part documentation
                </li>
                <li className="flex items-center gap-2 text-sm text-ink bg-white/60 border border-line px-4 py-3 rounded-lg">
                  <i className="fa-solid fa-ruler-combined text-primary" /> Material and dimensions stated on the quote
                </li>
                <li className="flex items-center gap-2 text-sm text-ink bg-white/60 border border-line px-4 py-3 rounded-lg">
                  <i className="fa-solid fa-comments text-primary" /> Your quality requirements reviewed before order
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <HowWeWorkSection />

      {/* Industries section */}
      <section id="industries" className="py-16 lg:py-24">
        <div className={container}>
          <div className="text-center">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-2 block">
              Industries We Serve
            </h3>
            <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-8">
              Serving Power Generation and Industrial Operators
            </h2>
            <p className="max-w-[900px] mx-auto text-muted text-lg leading-[1.85]">
              Gas turbines drive electricity generation, oil and gas operations, petrochemical processing and heavy
              industry. Our customers include plant operators and maintenance teams who need dependable parts and
              service companies who need a supplier they can count on for their own clients. Whatever the
              application, the standard is the same: the right part, documented properly, delivered when you need
              it.
            </p>
          </div>
        </div>
      </section>

      <FaqSection />

    </main>
  );
}
