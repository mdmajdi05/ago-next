import Image from 'next/image';

export function AboutIntro() {
  return (
    <div id="trust" className="about-intro-section">
      <span aria-hidden="true" className="about-intro-glow" />
      <div className="about-intro-wrap">
        <div className="about-intro-grid">
          <div className="about-intro-copy">
            <span className="about-intro-tag">
              <i className="fa-solid fa-circle-info" aria-hidden="true" /> About Ago Aviation
            </span>

            <h2 className="about-intro-title">
              Precision Gas Turbine Parts,{' '}
              <span className="about-intro-title-accent">Delivered Worldwide</span>
            </h2>

            <p className="about-intro-lead">
              <span className="about-intro-highlight">Ago Aviation is a trusted gas turbine parts manufacturer and supplier</span>{' '}
              serving customers across the world. We help power plants, oil and gas facilities, industrial operators and
              service companies source the components they need to keep their turbines running safely and efficiently.
            </p>

            <p className="about-intro-text">
              Gas turbine components work in some of the harshest conditions in engineering: extreme heat, high
              pressure, constant vibration and repeated thermal cycling. A part that is slightly off specification does not
              simply wear out faster. It can reduce efficiency, cause an unplanned shutdown or put the entire machine at
              risk. That is why we treat precision, material integrity and documentation as the foundation of every order,
              not an add-on.
            </p>

            <p className="about-intro-text">
              Ago Aviation is operated by WS Turbomar Private Limited. Whether you need a single critical spare for an
              urgent repair or a planned set of parts for a major inspection, our team works with your engineers and
              procurement staff to make sure the right part reaches the right site.
            </p>
          </div>

          <div className="about-intro-media">
            <span aria-hidden="true" className="about-intro-media-glow" />
            <div className="about-intro-image-shell">
              <Image
                src="/images/lm-2500-turbine.webp"
                alt="Gas turbine parts manufacturer and supplier"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 576px, 342px"
                className="about-intro-image"
              />
              <span aria-hidden="true" className="about-intro-image-frame" />
            </div>

            <div className="about-intro-badge">
              <i className="fa-solid fa-globe" aria-hidden="true" /> Delivered Worldwide
            </div>

            <div className="about-intro-panel">
              <span className="about-intro-panel-icon">
                <i className="fa-solid fa-microchip" aria-hidden="true" />
              </span>
              <div>
                <span className="about-intro-panel-title">Precision</span>
                <span className="about-intro-panel-text">Material integrity &amp; documentation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
