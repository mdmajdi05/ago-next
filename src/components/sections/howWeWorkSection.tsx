import Link from 'next/link';

interface WorkStep {
  num: string;
  icon: string;
  label: string;
  title: string;
  desc: string;
  count: string;
  dots: boolean[];
}

const workSteps: WorkStep[] = [
  {
    num: '01',
    icon: 'fa-paper-plane',
    label: 'Step 01',
    title: 'Send your requirement.',
    desc: 'Share a part number, drawing, sample or turbine frame and stage through our quote form or by email.',
    count: '01 / 04',
    dots: [true, false, false, false],
  },
  {
    num: '02',
    icon: 'fa-magnifying-glass',
    label: 'Step 02',
    title: 'We confirm the details.',
    desc: 'Our team checks the specification, material and quantity with you and raises any questions before pricing.',
    count: '02 / 04',
    dots: [false, true, false, false],
  },
  {
    num: '03',
    icon: 'fa-file-invoice-dollar',
    label: 'Step 03',
    title: 'Review your quote.',
    desc: 'You receive clear pricing and lead time, so you can plan your outage or repair with confidence.',
    count: '03 / 04',
    dots: [false, false, true, false],
  },
  {
    num: '04',
    icon: 'fa-box-open',
    label: 'Step 04',
    title: 'Production, inspection and dispatch.',
    desc: 'Once you approve, your order is processed, checked against the agreed specification and shipped to your site.',
    count: '04 / 04',
    dots: [false, false, false, true],
  },
];

export function HowWeWorkSection() {
  return (
    <section id="ordering" className="work-section hphw-sec">
      <div className="ago-container">
        <div className="hphw-head">
          <span className="hphw-eyebrow">
            <i className="fa-solid fa-route" aria-hidden="true" />
            Ordering
          </span>
          <h3>How Ordering Works</h3>
        </div>

        <div className="hphw-timeline">
          <span className="hphw-spine" aria-hidden="true" />

          {workSteps.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={step.num} className={`hphw-step ${isLeft ? 'hphw-left' : 'hphw-right'}`}>
                <span className="hphw-link" aria-hidden="true" />
                <span className="hphw-node" aria-hidden="true">
                  {step.num}
                </span>
                <span className="hphw-arrow" aria-hidden="true">
                  <i className={`fa-solid ${isLeft ? 'fa-chevron-right' : 'fa-chevron-left'}`} />
                </span>

                <article className="hphw-card">
                  <span className="hphw-ghost" aria-hidden="true">
                    {step.num}
                  </span>

                  <div className="hphw-card-top">
                    <span className="hphw-ico">
                      <i className={`fa-solid ${step.icon}`} aria-hidden="true" />
                    </span>
                    <span className="hphw-label">{step.label}</span>
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>

                  <div className="hphw-foot" aria-hidden="true">
                    <span className="hphw-dots">
                      {step.dots.map((isOn, dotIndex) => (
                        <i key={`${step.num}-${dotIndex}`} className={isOn ? 'is-on' : ''} />
                      ))}
                    </span>
                    <span className="hphw-count">{step.count}</span>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-5">
          <Link href="/contact">
            <button type="button" className="btn-primary">
              Request a Quote
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
