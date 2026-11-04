import Image from 'next/image';

export function AboutIntro() {
  return (
    <section id="trust" className="about-sec py-16 lg:py-24 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="about-title about-intro-copy">
            <span className="about-eyebrow inline-flex items-center gap-2 text-secondary font-semibold text-sm uppercase tracking-wider mb-4 block">
              <i className="fa-solid fa-circle-info" /> About Ago Aviation
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-ink leading-tight mb-6">
              Precision Gas Turbine Parts, <span className="text-secondary">Delivered Worldwide</span>
            </h2>
            <p className="about-intro-lead text-lg text-muted leading-relaxed mb-6 max-w-lg">
              <span className="text-ink font-semibold">Ago Aviation is a trusted gas turbine parts manufacturer and supplier</span>
              serving customers across the world. We help power plants, oil and gas facilities, industrial operators
              and service companies source the components they need to keep their turbines running safely and
              efficiently.
            </p>
            <p className="text-muted leading-relaxed mb-6 max-w-lg">
              Gas turbine components work in some of the harshest conditions in engineering: extreme heat, high
              pressure, constant vibration and repeated thermal cycling. A part that is slightly off specification
              does not simply wear out faster. It can reduce efficiency, cause an unplanned shutdown or put the
              entire machine at risk. That is why we treat precision, material integrity and documentation as the
              foundation of every order, not an add-on.
            </p>
            <p className="text-muted leading-relaxed max-w-lg">
              Ago Aviation is operated by WS Turbomar Private Limited. Whether you need a single critical spare for
              an urgent repair or a planned set of parts for a major inspection, our team works with your engineers
              and procurement staff to make sure the right part reaches the right site.
            </p>
          </div>
          <div className="about-media about-intro-media relative">
            <span
              className="about-media-glow absolute inset-0 -z-10 rounded-2xl bg-primary/10 blur-[120px]"
              aria-hidden="true"
            />
            <div className="about-media-main relative z-10 aspect-[4/3] lg:aspect-none lg:h-[520px]">
              <Image
                src="/images/lm-2500-turbine.webp"
                alt="Gas turbine parts manufacturer and supplier"
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="about-media-tag absolute bottom-6 left-6 z-20 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-line px-4 py-2 rounded-lg text-sm font-medium text-ink shadow-sm">
              <i className="fa-solid fa-globe text-secondary" /> Delivered Worldwide
            </div>
            <div className="about-media-card absolute top-6 right-6 z-20 bg-white border border-line p-4 rounded-lg shadow-lg">
              <span className="amc-ico inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white mb-3">
                <i className="fa-solid fa-microchip" />
              </span>
              <div>
                <span className="amc-num block text-sm font-bold text-primary">Precision</span>
                <span className="amc-txt block text-xs text-muted leading-tight">Material integrity &amp; documentation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
