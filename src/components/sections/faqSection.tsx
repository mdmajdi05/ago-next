'use client';

import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'collapseOne',
    question: 'What are the main parts of a gas turbine?',
    answer: 'A gas turbine has three main sections: the compressor, the combustor and the turbine. The compressor raises air pressure, the combustor burns fuel with that air, and the turbine extracts energy from the hot gas to drive a generator or machine. Shrouds, buckets, nozzles and combustion liners wear fastest.',
  },
  {
    id: 'collapseTwo',
    question: 'What are gas turbine blades made of?',
    answer: 'Turbine blades in the hot section are usually made from nickel or cobalt based superalloys, often with protective coatings, because they must hold strength at very high temperatures. Compressor blades typically use steel or titanium alloys, which handle lower temperatures.',
  },
  {
    id: 'collapseThree',
    question: 'What is the hot gas path in a gas turbine?',
    answer: 'The hot gas path is the route combustion gas takes from the combustor through the turbine nozzles, buckets and shrouds. These parts face the highest temperatures and stresses, so they are inspected closely and are usually the first to need replacement.',
  },
  {
    id: 'collapsefour',
    question: 'How often should gas turbine parts be replaced?',
    answer: 'There is no single interval. It depends on your OEM\'s inspection schedule, running hours, number of starts, fuel type and operating conditions. Follow your OEM\'s maintenance guidance and inspection findings, and send us your part details early so spares are ready before an outage.',
  },
  {
    id: 'collapsefive',
    question: 'What causes gas turbine blade damage?',
    answer: 'Common causes are high temperature oxidation and creep, thermal fatigue from starts and stops, erosion and corrosion from contaminants, foreign object damage and vibration. Regular borescope and outage inspections help catch damage before it forces an unplanned shutdown.',
  },
  {
    id: 'collapsesix',
    question: 'What is the difference between OEM and aftermarket gas turbine parts?',
    answer: 'OEM parts come from the turbine\'s original manufacturer. Aftermarket parts come from independent suppliers working to a drawing or specification. Quality depends on the supplier\'s material control, inspection and documentation, so ask to see all three before you order.',
  },
  {
    id: 'collapseseven',
    question: 'Is Ago Aviation a gas turbine parts manufacturer and supplier?',
    answer: 'Yes. Ago Aviation is a gas turbine parts manufacturer and supplier. Depending on the part, we manufacture to your drawing or specification or supply it through our sourcing network, and we confirm the specification with you before you order.',
  },
  {
    id: 'collapseeight',
    question: 'How do I order the right gas turbine part from Ago Aviation?',
    answer: 'Send the OEM, turbine model, frame and stage, plus any part number or drawing and the quantity you need. We confirm the details, tell you whether we can supply the part, and send a quote. The more detail you share, the faster we can respond.',
  },
  {
    id: 'collapsenine',
    question: 'Does Ago Aviation ship gas turbine parts worldwide?',
    answer: 'Yes. We supply customers worldwide and prepare shipments for international transit, including protective packaging and export documentation.',
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string>('collapseOne');

  return (
    <div id="faq" className="faq-sectoin py-16 lg:py-24 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
        <div className="product-title text-center mb-12 lg:mb-16">
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-2 block">
            information
          </h3>
          <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-0">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="col-10 mx-auto">
          <div className="accordion" id="accordionExample">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="accordion-item border border-line rounded-lg mb-3 overflow-hidden">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button w-full flex items-center justify-between py-4 text-left text-lg font-medium text-ink bg-white hover:bg-primary/5 transition-colors"
                      onClick={() => setOpenId(openId === faq.id ? '' : faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={faq.id}
                    >
                      {faq.question}
                      <i
                        className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'} text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  </h2>
                  {isOpen && (
                    <div
                      id={faq.id}
                      className="accordion-body p-4 text-muted text-sm leading-relaxed border-t border-line"
                      data-bs-parent="#accordionExample"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
