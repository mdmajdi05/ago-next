import Link from 'next/link';

export function Hero() {
  return (
    <div className="banner-section" id="heroSlider">
      <div className="hero-shell">
        <div aria-hidden="true" className="hero-media" />
        <span aria-hidden="true" className="hero-overlay" />

        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-eyebrow">
              <i className="fa-solid fa-industry text-[11px]" aria-hidden="true" /> Gas Turbine Parts Manufacturer
              &amp; Supplier
            </span>

            <h1 className="hero-title">
              Gas Turbine Parts Manufacturer and Supplier for Power Plants and Industrial Operators Worldwide
            </h1>

            <p className="hero-description">
              When a turbine is down, every day of delay costs money. Ago Aviation manufactures and supplies precision
              gas turbine parts and spares for plant operators, EPC contractors and turbine service companies around
              the world, with clear communication from the first enquiry to final delivery.
            </p>

            <div className="hero-actions">
              <Link href="/contact" className="hero-primary-btn group relative overflow-hidden">
                <span className="relative z-[1]">Request a Quote</span>
                <i
                  className="fa-solid fa-arrow-right relative z-[1] text-[11px] transition-transform duration-300 group-hover:translate-x-[5px]"
                  aria-hidden="true"
                />
              </Link>

              <Link href="/products" className="hero-ghost-btn">
                Browse Gas Turbine Parts <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </Link>
            </div>

            <ul className="hero-meta-list">
              <li><i className="fa-solid fa-industry text-[#f0a945]" aria-hidden="true" /> Manufacturer and supplier</li>
              <li><i className="fa-solid fa-box-open text-[#f0a945]" aria-hidden="true" /> Export-ready supply</li>
              <li><i className="fa-solid fa-earth-americas text-[#f0a945]" aria-hidden="true" /> Ships worldwide</li>
            </ul>
          </div>

          <aside className="hero-quote" aria-label="Ago Aviation quote desk">
            <div className="hero-quote-header">
              <span><i className="status-dot" aria-hidden="true" /> QUOTE DESK</span>
              <span>WORLDWIDE SUPPLY</span>
            </div>

            <div className="hero-quote-body">
              <span className="hero-quote-icon"><i className="fa-solid fa-paper-plane" aria-hidden="true" /></span>
              <div>
                <small>SEND YOUR REQUIREMENT</small>
                <strong>Tell us what your turbine needs.</strong>
              </div>
            </div>

            <div className="mb-2 h-px bg-[linear-gradient(90deg,rgba(240,168,67,0.55),rgba(255,255,255,0.08))]" />

            <ul className="hero-quote-list">
              <li>
                <span><i className="fa-solid fa-barcode" aria-hidden="true" /> Part number or drawing</span>
                <i className="fa-solid fa-check text-[#56d7a0]" aria-hidden="true" />
              </li>
              <li>
                <span><i className="fa-solid fa-cube" aria-hidden="true" /> OEM, frame and stage</span>
                <i className="fa-solid fa-check text-[#56d7a0]" aria-hidden="true" />
              </li>
              <li>
                <span><i className="fa-solid fa-clipboard-list" aria-hidden="true" /> Request a Quote</span>
                <i className="fa-solid fa-check text-[#56d7a0]" aria-hidden="true" />
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
