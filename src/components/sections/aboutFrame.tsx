import Image from 'next/image';
import Link from 'next/link';

export function AboutFrame() {
  return (
    <section id="frame" className="about-sec py-16 lg:py-24 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="about-title lg:order-2">
            <span className="about-eyebrow inline-flex items-center gap-2 text-secondary font-semibold text-sm uppercase tracking-wider mb-4 block">
              Frame &amp; Stage
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-ink leading-tight mb-6">
              Parts Matched to Your Turbine Frame
            </h2>
            <p className="text-muted leading-relaxed mb-6 max-w-lg">
              No two turbine fleets are identical. A part that fits one frame or stage will not necessarily fit
              another, even within the same OEM family. To avoid costly mistakes, we ask for the OEM, turbine
              model, frame and stage, along with any part number or drawing you have.
            </p>
            <p className="text-muted leading-relaxed mb-8 max-w-lg">
              From there, we confirm the specification with you, flag any questions about material or tolerance, and
              only then issue a quote. If a part is not something we can supply, you will hear that early, so you
              can look elsewhere without losing time.
            </p>
            <ul className="about-points space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="ap-ico shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <i className="fa-solid fa-industry" />
                </span>
                <div>
                  <strong className="block text-ink">OEM &amp; Turbine Model</strong>
                  <small className="block text-muted text-sm">We confirm the machine first</small>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="ap-ico shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <i className="fa-solid fa-layer-group" />
                </span>
                <div>
                  <strong className="block text-ink">Frame &amp; Stage</strong>
                  <small className="block text-muted text-sm">Fit confirmed for your unit</small>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="ap-ico shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <i className="fa-solid fa-barcode" />
                </span>
                <div>
                  <strong className="block text-ink">Part Number or Drawing</strong>
                  <small className="block text-muted text-sm">Share whatever detail you have</small>
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
          <div className="about-media lg:order-1 relative">
            <span
              className="about-media-glow absolute inset-0 -z-10 rounded-2xl bg-primary/10 blur-[120px]"
              aria-hidden="true"
            />
            <div className="about-media-main relative z-10 aspect-[4/3] lg:aspect-none lg:h-[520px]">
              <Image
                src="/images/lm-5000-turbine.webp"
                alt="Gas turbine matched to frame and stage"
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="about-media-tag absolute bottom-6 left-6 z-20 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-line px-4 py-2 rounded-lg text-sm font-medium text-ink shadow-sm">
              <i className="fa-solid fa-circle-check text-secondary" /> Specification confirmed before quote
            </div>
            <div className="about-media-card absolute top-6 right-6 z-20 bg-white border border-line p-4 rounded-lg shadow-lg">
              <span className="amc-ico inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white mb-3">
                <i className="fa-solid fa-gears" />
              </span>
              <div>
                <span className="amc-num block text-sm font-bold text-primary">OEM</span>
                <span className="amc-txt block text-xs text-muted leading-tight">Frame &amp; stage confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
