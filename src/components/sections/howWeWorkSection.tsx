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
    <section id="ordering" className="work-section hphw-sec py-16 lg:py-24 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
        <div className="hphw-head text-center mb-12 lg:mb-16">
          <span className="hphw-eyebrow inline-flex items-center gap-2 text-secondary font-semibold text-sm uppercase tracking-wider mb-4 block">
            <i className="fa-solid fa-route" /> Ordering
          </span>
          <h3 className="text-3xl lg:text-4xl font-bold text-ink">How Ordering Works</h3>
        </div>

        <div className="hphw-timeline relative">
          <span
            className="hphw-spine absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-line-2 -z-10"
            aria-hidden="true"
          />

          <div className="space-y-20 lg:space-y-24">
            {workSteps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={step.num}
                  className={`hphw-step relative group ${isLeft ? 'flex flex-row' : 'flex flex-row-reverse'} items-start gap-6`}
                >
                  {isLeft ? (
                    <>
                      <article
                        className="hphw-card shrink-0 w-[380px] max-w-[calc(50%_-_80px)] bg-white border border-line rounded-xl p-6 shadow-sm"
                      >
                        <span className="hphw-ghost absolute -top-[8px] right-[-10px] hidden lg:block w-10 h-10 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center" aria-hidden="true">
                          {step.num}
                        </span>
                        <div className="hphw-card-top flex items-center gap-2 mb-3">
                          <span className="hphw-ico inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
                            <i className={`fa-solid ${step.icon}`} />
                          </span>
                          <span className="hphw-label text-[10px] font-semibold uppercase tracking-wider text-muted">
                            {step.label}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-ink mb-3">{step.title}</h3>
                        <p className="mb-6 text-muted text-sm leading-relaxed">{step.desc}</p>
                        <div className="hphw-foot flex items-center gap-2 mt-auto">
                          <span className="hphw-dots flex gap-1">
                            {step.dots.map((on, i) => (
                              <i
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${on ? 'bg-primary is-on' : 'bg-line-2'}`}
                                aria-hidden="true"
                              />
                            ))}
                          </span>
                          <span className="hphw-count text-xs font-bold text-primary">{step.count}</span>
                        </div>
                      </article>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="hphw-link h-[1px] flex-1 bg-line-2" />
                        <span className="hphw-node flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-bold border-4 border-white shadow-sm z-10">
                          {step.num}
                        </span>
                        <span className="hphw-arrow text-primary" aria-hidden="true">
                          <i className="fa-solid fa-chevron-right" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="hphw-arrow text-primary" aria-hidden="true">
                          <i className="fa-solid fa-chevron-left" />
                        </span>
                        <span className="hphw-node flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-bold border-4 border-white shadow-sm z-10">
                          {step.num}
                        </span>
                        <span className="hphw-link h-[1px] flex-1 bg-line-2" />
                      </div>
                      <article
                        className="hphw-card shrink-0 w-[380px] max-w-[calc(50%_-_80px)] bg-white border border-line rounded-xl p-6 shadow-sm"
                      >
                        <span className="hphw-ghost absolute -top-[8px] left-[-10px] hidden lg:block w-10 h-10 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center" aria-hidden="true">
                          {step.num}
                        </span>
                        <div className="hphw-card-top flex items-center gap-2 mb-3">
                          <span className="hphw-ico inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
                            <i className={`fa-solid ${step.icon}`} />
                          </span>
                          <span className="hphw-label text-[10px] font-semibold uppercase tracking-wider text-muted">
                            {step.label}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-ink mb-3">{step.title}</h3>
                        <p className="mb-6 text-muted text-sm leading-relaxed">{step.desc}</p>
                        <div className="hphw-foot flex items-center gap-2 mt-auto">
                          <span className="hphw-dots flex gap-1">
                            {step.dots.map((on, i) => (
                              <i
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${on ? 'bg-primary is-on' : 'bg-line-2'}`}
                                aria-hidden="true"
                              />
                            ))}
                          </span>
                          <span className="hphw-count text-xs font-bold text-primary">{step.count}</span>
                        </div>
                      </article>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12 lg:mt-16">
          <Link href="/contact">
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
