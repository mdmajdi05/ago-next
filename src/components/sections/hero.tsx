import Link from 'next/link';

export function Hero() {
  return (
    <section id="ago-hero" aria-label="AGO Aviation gas turbine parts">
      <div className="banner-section">
        <div className="main-banner">
          <div className="banner-image hero-slider" id="heroSlider">
            <div className="hero-bgs" aria-hidden="true">
              <span className="hero-bg-layer is-active" />
            </div>
            <span className="hero-veil" aria-hidden="true" />

            <div className="hero-wrap">
              <div className="container">
                <div className="hero-copy">
                  <div className="hero-slides-copy">
                    <div className="hero-slide-copy is-active">
                      <span className="hero-eyebrow">
                        <i className="fa-solid fa-industry" aria-hidden="true" />
                        Gas Turbine Parts Manufacturer &amp; Supplier
                      </span>
                      <h1 className="hero-title">
                        Gas Turbine Parts Manufacturer and Supplier for Power Plants and Industrial
                        Operators Worldwide
                      </h1>
                      <p className="hero-sub">
                        When a turbine is down, every day of delay costs money. Ago Aviation
                        manufactures and supplies precision gas turbine parts and spares for plant
                        operators, EPC contractors and turbine service companies around the world,
                        with clear communication from the first enquiry to final delivery.
                      </p>
                    </div>
                  </div>

                  <div className="hero-actions">
                    <Link href="/contact" className="primary-btn">
                      Request a Quote
                    </Link>
                    <Link href="/products" className="hero-btn-ghost">
                      Browse Gas Turbine Parts <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    </Link>
                  </div>

                  <ul className="hero-trust">
                    <li>
                      <i className="fa-solid fa-industry" aria-hidden="true" /> Manufacturer and supplier
                    </li>
                    <li>
                      <i className="fa-solid fa-box-open" aria-hidden="true" /> Export-ready supply
                    </li>
                    <li>
                      <i className="fa-solid fa-earth-americas" aria-hidden="true" /> Ships worldwide
                    </li>
                  </ul>
                </div>

                <aside className="hero-ops-panel" aria-label="AGO Aviation quote desk">
                  <div className="hero-ops-top">
                    <span className="hero-ops-live">
                      <i aria-hidden="true" /> QUOTE DESK
                    </span>
                    <span className="hero-ops-status">WORLDWIDE SUPPLY</span>
                  </div>

                  <div className="hero-ops-heading">
                    <span className="hero-ops-icon">
                      <i className="fa-solid fa-paper-plane" aria-hidden="true" />
                    </span>
                    <div>
                      <span>SEND YOUR REQUIREMENT</span>
                      <strong>Tell us what your turbine needs.</strong>
                    </div>
                  </div>

                  <div className="hero-ops-divider" />

                  <div className="hero-ops-row">
                    <span>
                      <i className="fa-solid fa-barcode" aria-hidden="true" /> Part number or drawing
                    </span>
                    <i className="fa-solid fa-check" aria-hidden="true" />
                  </div>
                  <div className="hero-ops-row">
                    <span>
                      <i className="fa-solid fa-gears" aria-hidden="true" /> OEM, frame and stage
                    </span>
                    <i className="fa-solid fa-check" aria-hidden="true" />
                  </div>

                  <Link href="/contact" className="hero-ops-link">
                    Request a Quote <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                  </Link>
                </aside>
              </div>
            </div>

            <Link href="#trust" className="hero-scroll" aria-label="Scroll to content">
              <i className="fa-solid fa-chevron-down" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
