import Image from 'next/image';
import Link from 'next/link';

export function MaterialsSection() {
  return (
    <section id="materials" className="about-sec py-16 lg:py-24 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="about-media order-lg-1 relative">
            <span
              className="about-media-glow absolute inset-0 -z-10 rounded-2xl bg-primary/10 blur-[120px]"
              aria-hidden="true"
            />
            <div className="about-media-main relative z-10 aspect-[4/3] lg:aspect-none lg:h-[520px]">
              <Image
                src="/images/cfm-56-turbine.webp"
                alt="Hot section turbine components in demanding materials"
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="about-media-tag absolute bottom-6 left-6 z-20 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-line px-4 py-2 rounded-lg text-sm font-medium text-ink shadow-sm">
              <i className="fa-solid fa-temperature-high text-secondary" /> Built for hot section conditions
            </div>
            <div className="about-media-card absolute top-6 right-6 z-20 bg-white border border-line p-4 rounded-lg shadow-lg">
              <span className="amc-ico inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white mb-3">
                <i className="fa-solid fa-ruler-combined" />
              </span>
              <div>
                <span className="amc-num block text-sm font-bold text-primary">SPEC</span>
                <span className="amc-txt block text-xs text-muted leading-tight">Tight tolerances, stated on the quote</span>
              </div>
            </div>
          </div>
          <div className="about-title order-lg-2">
            <span className="about-eyebrow inline-flex items-center gap-2 text-secondary font-semibold text-sm uppercase tracking-wider mb-4 block">
              Materials &amp; Tolerances
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-ink leading-tight mb-6">
              Built for Demanding Materials and Tight Tolerances
            </h2>
            <p className="text-muted leading-relaxed mb-6 max-w-lg">
              Hot section components are typically made from nickel and cobalt-based superalloys and heat-resistant
              stainless steels. These materials are chosen because they hold their strength at high temperature, but
              they are also difficult to machine. Cutting forces, tool wear and heat build-up all make precision
              harder to achieve.
            </p>
            <p className="text-muted leading-relaxed mb-8 max-w-lg">
              That is why material grade, heat treatment and final dimensions matter as much as the part drawing
              itself. On every quote we state the material and the key specifications, so your engineers can review
              them before an order is placed. If something does not match your requirement, you can catch it at the
              quote stage rather than at installation.
            </p>
            <ul className="about-points space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="ap-ico shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <i className="fa-solid fa-atom" />
                </span>
                <div>
                  <strong className="block text-ink">Superalloys</strong>
                  <small className="block text-muted text-sm">Nickel and cobalt-based grades</small>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="ap-ico shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <i className="fa-solid fa-shield-halved" />
                </span>
                <div>
                  <strong className="block text-ink">Heat-Resistant Steels</strong>
                  <small className="block text-muted text-sm">Stainless steels for hot sections</small>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="ap-ico shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <i className="fa-solid fa-fire-flame-curved" />
                </span>
                <div>
                  <strong className="block text-ink">Heat Treatment</strong>
                  <small className="block text-muted text-sm">Stated on every quote</small>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="ap-ico shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <i className="fa-solid fa-ruler-combined" />
                </span>
                <div>
                  <strong className="block text-ink">Final Dimensions</strong>
                  <small className="block text-muted text-sm">Checked against your drawing</small>
                </div>
              </li>
            </ul>
            <div className="about-btn">
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
        </div>
      </div>
    </section>
  );
}
