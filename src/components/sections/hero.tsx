import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="banner-section relative overflow-hidden">
      <div className="main-banner">
        <div className="banner-image hero-slider" id="heroSlider">
          {/* Background image */}
          <div className="hero-bgs" aria-hidden="true">
            <div className="hero-bg-layer is-active absolute inset-0 -z-10">
              <Image
                src="/images/lm-6000-turbine.webp"
                alt="Gas turbine background"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </div>
          <span className="hero-veil absolute inset-0 bg-black/20 -z-10" aria-hidden="true" />

          <div className="hero-wrap relative z-10">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
              <div className="grid lg:grid-cols-2 lg:gap-12 items-center">
                <div className="hero-copy">
                  <span className="hero-eyebrow inline-flex items-center gap-2 text-secondary font-semibold text-sm uppercase tracking-wider mb-4 block">
                    <i className="fa-solid fa-industry" /> Gas Turbine Parts Manufacturer &amp; Supplier
                  </span>
                  <h1 className="hero-title text-4xl lg:text-5xl font-bold text-ink leading-tight mb-6">
                    Gas Turbine Parts Manufacturer and Supplier for Power Plants and Industrial Operators Worldwide
                  </h1>
                  <p className="hero-sub text-lg text-muted leading-relaxed mb-8 max-w-[600px]">
                    When a turbine is down, every day of delay costs money. Ago Aviation manufactures and supplies
                    precision gas turbine parts and spares for plant operators, EPC contractors and turbine service
                    companies around the world, with clear communication from the first enquiry to final delivery.
                  </p>
                  <div className="hero-actions flex flex-col sm:flex-row gap-4">
                    <Link href="/contact">
                      <button
                        className="bg-primary text-secondary font-semibold uppercase text-[16px] px-[55px] py-[13px] rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-all duration-500"
                        type="button"
                      >
                        Request a Quote
                      </button>
                    </Link>
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 border border-primary/20 text-primary font-semibold uppercase text-[16px] px-[55px] py-[13px] rounded-[20px_0px] hover:bg-primary/5 hover:text-primary transition-all duration-500"
                    >
                      Browse Gas Turbine Parts <i className="fa-solid fa-arrow-right" />
                    </Link>
                  </div>
                  <ul className="hero-trust flex flex-col gap-3 mt-10">
                    <li className="flex items-center gap-3 text-sm text-ink">
                      <i className="fa-solid fa-industry text-primary shrink-0" />
                      Manufacturer and supplier
                    </li>
                    <li className="flex items-center gap-3 text-sm text-ink">
                      <i className="fa-solid fa-box-open text-primary shrink-0" />
                      Export-ready supply
                    </li>
                    <li className="flex items-center gap-3 text-sm text-ink">
                      <i className="fa-solid fa-earth-americas text-primary shrink-0" />
                      Ships worldwide
                    </li>
                  </ul>
                </div>

                <aside
                  className="hero-ops-panel mt-10 lg:mt-0 lg:ml-auto lg:w-[380px]"
                  aria-label="Ago Aviation quote desk"
                >
                  <div className="hero-ops-top flex items-center justify-between mb-6">
                    <span className="hero-ops-live text-[10px] font-semibold uppercase tracking-wider text-secondary">
                      <i className="fa-solid fa-circle text-[7px] mr-1.5" /> QUOTE DESK
                    </span>
                    <span className="hero-ops-status text-[10px] font-semibold uppercase tracking-wider text-primary">
                      WORLDWIDE SUPPLY
                    </span>
                  </div>
                  <div className="hero-ops-heading flex items-center gap-3 mb-6">
                    <span className="hero-ops-icon flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
                      <i className="fa-solid fa-paper-plane" />
                    </span>
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-secondary">
                        SEND YOUR REQUIREMENT
                      </span>
                      <strong className="block text-sm text-ink leading-tight">
                        Tell us what your turbine needs.
                      </strong>
                    </div>
                  </div>
                  <div className="hero-ops-divider border-t border-line mb-6" />
                  <div className="hero-ops-row flex items-center justify-between mb-4">
                    <span className="flex items-center gap-2 text-sm text-ink">
                      <i className="fa-solid fa-barcode text-primary shrink-0" />
                      Part number or drawing
                    </span>
                    <i className="fa-solid fa-check text-xs text-primary shrink-0" />
                  </div>
                  <div className="hero-ops-row flex items-center justify-between mb-6">
                    <span className="flex items-center gap-2 text-sm text-ink">
                      <i className="fa-solid fa-gears text-primary shrink-0" />
                      OEM, frame and stage
                    </span>
                    <i className="fa-solid fa-check text-xs text-primary shrink-0" />
                  </div>
                  <Link
                    href="/contact"
                    className="hero-ops-link inline-flex items-center gap-2 w-full justify-center border border-primary text-primary px-5 py-3 rounded-lg font-medium text-sm hover:bg-primary hover:text-white transition-colors"
                  >
                    Request a Quote <i className="fa-solid fa-arrow-up-right-from-square" />
                  </Link>
                </aside>
              </div>
            </div>
          </div>

          <a
            className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-line text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
            href="#trust"
            aria-label="Scroll to content"
          >
            <i className="fa-solid fa-chevron-down text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
}
