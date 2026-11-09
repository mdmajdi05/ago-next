import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { buildPageMetadata, faqSchema, serviceSchema } from '@/lib/seo';

import PageSplash from "@/components/home/PageSplash";
import HeroSection from "@/components/home/HeroSection";
import BrandsSection from "@/components/home/BrandsSection";
import AboutIntroSection from "@/components/home/AboutIntroSection";
import PartsSection from "@/components/home/PartsSection";
import FrameSection from "@/components/home/FrameSection";
import MaterialsSection from "@/components/home/MaterialsSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import CertificationsSection from "@/components/home/CertificationsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import FAQSection from "@/components/home/FAQSection";
import CTABanner from "@/components/home/CTABanner";
import ContactSection from "@/components/home/ContactSection";
import HomePageEffects from "@/components/home/HomePageEffects";

export const metadata: Metadata = buildPageMetadata({
  title: 'Gas Turbine Parts Manufacturer & Supplier Worldwide',
  description:
    'AGO Aviation manufactures and supplies precision gas turbine parts and spares for power plants, oil & gas and EPC projects. 350+ part numbers across GE, Siemens, ABB and 20 more brands — request a verified quote.',
  path: '/',
  keywords: siteConfig.keywords as unknown as string[],
  image: siteConfig.ogImage,
  imageAlt: siteConfig.logoAlt,
});

const homeFaqs = [
  {
    question: 'What are the main parts of a gas turbine?',
    answer:
      'A gas turbine has three main sections: the compressor, the combustor and the turbine. The compressor raises air pressure, the combustor burns fuel with that air, and the turbine extracts energy from the hot gas to drive a generator or machine. Shrouds, buckets, nozzles and combustion liners wear fastest.',
  },
  {
    question: 'What are gas turbine blades made of?',
    answer:
      'Turbine blades in the hot section are usually made from nickel or cobalt based superalloys, often with protective coatings, because they must hold strength at very high temperatures. Compressor blades typically use steel or titanium alloys, which handle lower temperatures.',
  },
  {
    question: 'What is the hot gas path in a gas turbine?',
    answer:
      'The hot gas path is the route combustion gas takes from the combustor through the turbine nozzles, buckets and shrouds. These parts face the highest temperatures and stresses, so they are inspected closely and are usually the first to need replacement.',
  },
  {
    question: 'How often should gas turbine parts be replaced?',
    answer:
      "There is no single interval. It depends on your OEM's inspection schedule, running hours, number of starts, fuel type and operating conditions. Follow your OEM's maintenance guidance and inspection findings, and send us your part details early so spares are ready before an outage.",
  },
  {
    question: 'What causes gas turbine blade damage?',
    answer:
      'Common causes are high temperature oxidation and creep, thermal fatigue from starts and stops, erosion and corrosion from contaminants, foreign object damage and vibration. Regular borescope and outage inspections help catch damage before it forces an unplanned shutdown.',
  },
  {
    question: 'What is the difference between OEM and aftermarket gas turbine parts?',
    answer:
      "OEM parts come from the turbine's original manufacturer. Aftermarket parts come from independent suppliers working to a drawing or specification. Quality depends on the supplier's material control, inspection and documentation, so ask to see all three before you order.",
  },
  {
    question: 'Is Ago Aviation a gas turbine parts manufacturer and supplier?',
    answer:
      'Yes. Ago Aviation is a gas turbine parts manufacturer and supplier. Depending on the part, we manufacture to your drawing or specification or supply it through our sourcing network, and we confirm the specification with you before you order.',
  },
  {
    question: 'How do I order the right gas turbine part from Ago Aviation?',
    answer:
      'Send the OEM, turbine model, frame and stage, plus any part number or drawing and the quantity you need. We confirm the details, tell you whether we can supply the part, and send a quote. The more detail you share, the faster we can respond.',
  },
  {
    question: 'Does Ago Aviation ship gas turbine parts worldwide?',
    answer:
      'Yes. We supply customers worldwide and prepare shipments for international transit, including protective packaging and export documentation.',
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqSchema(homeFaqs),
            serviceSchema,
            {
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              '@id': `${siteConfig.url}/#webpage`,
              url: siteConfig.url,
              name: 'Gas Turbine Parts Manufacturer & Supplier | AGO Aviation',
              description: siteConfig.description,
              isPartOf: { '@id': `${siteConfig.url}/#website` },
              about: { '@id': `${siteConfig.url}/#organization` },
              primaryImageOfPage: siteConfig.ogImage,
              inLanguage: 'en',
            },
          ]).replace(/</g, '\\u003c'),
        }}
      />
      <main>
        <PageSplash />
        <HeroSection />
        <BrandsSection />
        <AboutIntroSection />
        <PartsSection />
        <FrameSection />
        <MaterialsSection />
        <WhyChooseSection />
        <CertificationsSection />
        <HowItWorksSection />
        <IndustriesSection />
        <FAQSection />
        <CTABanner />
        <ContactSection />
        <HomePageEffects />
      </main>
    </>
  );
}

// ============================================================
// OLD HOMEPAGE (commented out)
// Neeche ka saara purana code reference ke liye rakha gaya hai.
// ============================================================

// /*
//   ============================================================
//   OLD HOMEPAGE (commented out)
//   Neeche ka saara purana code reference ke liye rakha gaya hai.
//   ============================================================
//
// import type { Metadata } from 'next';
//
// import type { Brand } from '@/types/brand';
// import { getFeatured } from '@/services/productService';
// import { getAll as getAllBrands } from '@/services/brandService';
// import { getAll as getAllCategories } from '@/services/categoryService';
// import { siteConfig } from '@/config/site';
//
// import { Hero } from '@/components/sections/hero';
// import { BrandMarquee } from '@/components/sections/brandMarquee';
// import { AboutIntro } from '@/components/sections/aboutIntro';
// import { ServiceSection } from '@/components/sections/serviceSection';
// import { AboutFrame } from '@/components/sections/aboutFrame';
// import { MaterialsSection } from '@/components/sections/materialsSection';
// import { WhyUsSection } from '@/components/sections/whyUsSection';
// import { HowWeWorkSection } from '@/components/sections/howWeWorkSection';
// import { FaqSection } from '@/components/sections/faqSection';
// import { ContactForm } from '@/app/contact/ContactForm';
// import ContactSection from '@/components/sections/ContactSection';
//
// export const metadata: Metadata = {
//   title: 'Gas Turbine Parts Manufacturer and Supplier | Ago Aviation',
//   description: siteConfig.description,
//   keywords: siteConfig.keywords as unknown as string[],
//   authors: [{ name: siteConfig.name, url: siteConfig.url }],
//   alternates: {
//     canonical: siteConfig.url,
//   },
//   openGraph: {
//     title: 'Gas Turbine Parts Manufacturer and Supplier | Ago Aviation',
//     description: siteConfig.description,
//     url: siteConfig.url,
//     siteName: siteConfig.name,
//     type: 'website',
//     images: [
//       {
//         url: siteConfig.ogImage,
//         width: 1200,
//         height: 630,
//         alt: siteConfig.logoAlt,
//       },
//     ],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Gas Turbine Parts Manufacturer and Supplier | Ago Aviation',
//     description: siteConfig.description,
//     images: [siteConfig.ogImage],
//     creator: siteConfig.socials.x.handle,
//   },
// };
//
// const container = 'mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]';
//
// const serviceCards = [
//   {
//     image: '/images/lm-100-turbine.webp',
//     alt: 'Turbine shrouds',
//     title: 'Turbine Shrouds',
//     desc: 'Shrouds control the clearance between rotating blades and the casing. Accurate dimensions and the right material help limit tip leakage and protect efficiency over long running hours.',
//   },
//   {
//     image: '/images/lm-6000-turbine.webp',
//     alt: 'Buckets and blades',
//     title: 'Buckets and Blades',
//     desc: 'Rotating blades take the highest thermal and mechanical loads in the machine. We supply replacements matched to frame and stage, with material and dimensional details confirmed before production.',
//   },
//   {
//     image: '/images/lm-5000-turbine.webp',
//     alt: 'Nozzles and vanes',
//     title: 'Nozzles and Vanes',
//     desc: 'Stationary nozzles and vanes direct hot gas onto the rotating stages. Their profile and finish directly affect flow, output and component life.',
//   },
//   {
//     image: '/images/cfm-56-turbine.webp',
//     alt: 'Combustion components',
//     title: 'Combustion Components',
//     desc: 'Liners, transition pieces and fuel nozzles operate where temperatures are highest. We help you source replacements ahead of combustion inspections.',
//   },
//   {
//     image: '/images/lm-2500-turbine.webp',
//     alt: 'Hot gas path parts',
//     title: 'Hot Gas Path Parts',
//     desc: 'Complete sets of hot section components for planned outages, so your maintenance window is not delayed by missing parts.',
//   },
//   {
//     image: '/images/solar-turbines.jpg',
//     alt: 'Spares and consumables',
//     title: 'Spares and Consumables',
//     desc: 'Seals, fasteners and other routine items that keep a turbine in service between major overhauls.',
//   },
// ];
//
// function QualityPanelSection() {
//   return (
//     <section id="quality" className="quality-panel-section">
//       <div className={container}>
//         <div className="quality-panel-shell">
//           <span className="quality-panel-glow" aria-hidden="true" />
//           <div className="quality-panel-grid">
//             <div className="quality-panel-copy">
//               <span className="hpcert-eyebrow">
//                 <i className="fa-solid fa-shield-halved" /> Quality
//               </span>
//               <h3>Quality You Can Verify</h3>
//               <p>
//                 Quality claims are only useful when you can check them. Ago Aviation supports its parts with inspection records and documentation that your team can review, and we are happy to discuss your specific quality requirements before an order is placed.
//               </p>
//             </div>
//
//             <div className="quality-panel-badge">
//               <span className="hpcert-seal-ring" aria-hidden="true" />
//               <span className="hpcert-seal-core" aria-hidden="true">
//                 <i className="fa-solid fa-clipboard-check" />
//               </span>
//               <span className="hpcert-seal-text">Inspection<br /> Records</span>
//             </div>
//           </div>
//
//           <ul className="hq-chips">
//             <li><i className="fa-solid fa-file-lines" /> Inspection records</li>
//             <li><i className="fa-solid fa-folder-open" /> Part documentation</li>
//             <li><i className="fa-solid fa-ruler-combined" /> Material and dimensions stated on the quote</li>
//             <li><i className="fa-solid fa-comments" /> Your quality requirements reviewed before order</li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }
//
// function IndustriesSection() {
//   return (
//     <section id="industries" className="industry-section">
//       <div className={container}>
//         <div className="industry-shell">
//           <h3 className="industry-kicker">Industries We Serve</h3>
//           <h2 className="industry-title">Serving Power Generation and Industrial Operators</h2>
//           <p className="industry-copy">
//             Gas turbines drive electricity generation, oil and gas operations, petrochemical processing and heavy
//             industry. Our customers include plant operators and maintenance teams who need dependable parts and
//             service companies who need a supplier they can count on for their own clients. Whatever the
//             application, the standard is the same: the right part, documented properly, delivered when you need
//             it.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
//
// function CtaBannerSection() {
//   return (
//     <section className="cta-banner">
//       <div className="cta-banner-overlay" aria-hidden="true" />
//       <div className={container + ' cta-banner-inner'}>
//         <div className="cta-banner-shell">
//           <div className="cta-banner-copy">
//             <span className="cta-banner-kicker">
//               <i className="fa-solid fa-industry" /> Send us your requirement
//             </span>
//             <h2>Need a Gas Turbine Part? Send Us Your Requirement.</h2>
//             <p>
//               Tell us what your turbine needs. Share a part number, drawing or frame and stage, and our team will respond with a clear, detailed quote.
//             </p>
//           </div>
//
//           <div className="cta-banner-actions">
//             <a href="/contact" className="cta-banner-button">Request a Quote</a>
//             <div className="cta-banner-links">
//               <a href="mailto:sale@agoaviation.com"><i className="fa-solid fa-envelope" /> sale@agoaviation.com</a>
//               <a href="tel:+917011123269"><i className="fa-solid fa-phone" /> +91 7011123269</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
//
// function ContactBandSection({ brands }: { brands: Brand[] }) {
//   return (
//     <section className="contact-band-section">
//       <div className="contact-band-glow" aria-hidden="true" />
//       <div className={container + ' contact-band-inner'}>
//         <div className="contact-band-grid">
//           <div className="contact-band-form-wrap">
//             <div className="contact-band-kicker">
//               <i className="fa-solid fa-paper-plane" /> Get In Touch
//             </div>
//             <h2>Contact Us</h2>
//             <p>
//               Share your part number or requirement — our team will come back with availability, lead time and pricing.
//             </p>
//             <ContactForm brands={brands} />
//           </div>
//
//           <aside className="contact-info-panel">
//             <span className="contact-info-orb contact-info-orb-one" aria-hidden="true" />
//             <span className="contact-info-orb contact-info-orb-two" aria-hidden="true" />
//             <div className="contact-info-panel-inner">
//               <div className="contact-info-tag">
//                 <i className="fa-solid fa-headset" /> Contact Information
//               </div>
//               <h3>Direct lines to our team.</h3>
//               <p>
//                 Call the quote desk, visit our New Delhi office, or write to the team that looks after your account.
//               </p>
//               <div className="contact-info-list">
//                 <div className="contact-info-item">
//                   <span className="contact-info-icon"><i className="fa-solid fa-phone-volume" /></span>
//                   <div>
//                     <h4>Help Line</h4>
//                     <a href="tel:7011123269">+91 7011123269</a>
//                     <span>Quote desk · answered by a specialist</span>
//                   </div>
//                 </div>
//                 <div className="contact-info-item">
//                   <span className="contact-info-icon"><i className="fa-solid fa-envelope" /></span>
//                   <div>
//                     <h4>Email</h4>
//                     <a href="mailto:sale@agoaviation.com">sale@agoaviation.com</a>
//                     <span>Quotes, lead times and availability</span>
//                   </div>
//                 </div>
//                 <div className="contact-info-item">
//                   <span className="contact-info-icon"><i className="fa-solid fa-location-dot" /></span>
//                   <div>
//                     <h4>Visit Us</h4>
//                     <p>A-24/5, 3rd Floor, NH-19, Mohan Cooperative Industrial Estate, New Delhi, 110044</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </section>
//   );
// }
//
// export default async function Home() {
//   const [featuredProducts, brands, categories] = await Promise.all([
//     getFeatured(8),
//     getAllBrands(),
//     getAllCategories(),
//   ]);
//
//   return (
//     <main className="bg-white">
//       <Hero />
//
//       <BrandMarquee brands={brands} />
//
//       <AboutIntro />
//
//       <ServiceSection cards={serviceCards} />
//
//       <AboutFrame />
//
//       <MaterialsSection />
//
//       <WhyUsSection />
//
//       <QualityPanelSection />
//
//       <HowWeWorkSection />
//
//       <IndustriesSection />
//
//       <FaqSection />
//
//       <CtaBannerSection />
//
//       <ContactSection /> 
//
//       {/* <ContactBandSection brands={brands} /> */}
//
//     </main>
//   );
// }
//
// */
//
