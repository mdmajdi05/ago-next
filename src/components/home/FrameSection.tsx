"use client";

import React from "react";

export default function FrameSection() {
  
  return (
    <>
      <div className="home-page w-full">
<div className="about-sec reveal" id="frame">
<div className="container mx-auto w-full px-3">
<div className="row align-items-center g-5 flex flex-wrap items-center gap-5">
<div className="col-lg-6 w-full lg:w-1/2">
<div className="about-title">
<span className="about-eyebrow">Frame & Stage</span>
<h2>Parts Matched to Your Turbine Frame</h2>
<p className="mb-4">
                            No two turbine fleets are identical. A part that fits one frame or stage will not
                            necessarily fit another, even within the same OEM family. To avoid costly mistakes, we ask
                            for the OEM, turbine model, frame and stage, along with any part number or drawing you
                            have.
                        </p>
<p className="mb-4">
                            From there, we confirm the specification with you, flag any questions about material or
                            tolerance, and only then issue a quote. If a part is not something we can supply, you will
                            hear that early, so you can look elsewhere without losing time.
                        </p>
<ul className="about-points">
<li>
<span className="ap-ico"><i className="fa-solid fa-industry"></i></span>
<div>
<strong>OEM & Turbine Model</strong>
<small>We confirm the machine first</small>
</div>
</li>
<li>
<span className="ap-ico"><i className="fa-solid fa-layer-group"></i></span>
<div>
<strong>Frame & Stage</strong>
<small>Fit confirmed for your unit</small>
</div>
</li>
<li>
<span className="ap-ico"><i className="fa-solid fa-barcode"></i></span>
<div>
<strong>Part Number or Drawing</strong>
<small>Share whatever detail you have</small>
</div>
</li>
</ul>
<div className="about-btn">
<a href="contact.html">
<button className="primary-btn">Request a Quote</button>
</a>
</div>
</div>
</div>
<div className="col-lg-6 w-full lg:w-1/2">
<div className="about-media">
<span className="about-media-glow" aria-hidden="true"></span>
<div className="about-media-main">
<img src="/assets/img/lm-5000-turbine.webp" alt="Gas turbine matched to frame and stage" />
</div>
<div className="about-media-tag">
<i className="fa-solid fa-circle-check"></i> Specification confirmed before quote
                        </div>
<div className="about-media-card">
<span className="amc-ico"><i className="fa-solid fa-gears"></i></span>
<div>
<span className="amc-num">OEM</span>
<span className="amc-txt">Frame & stage confirmed</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
      </div>
      <style jsx global>{`

/* base styles (from original site CSS) */
.home-page .about-points { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 30px; }
.home-page .about-points li {
    display: flex; align-items: center; gap: 13px; padding: 14px 16px;
    background: var(--soft); border: 1px solid var(--line); border-radius: 16px;
    transition: .35s var(--ease);
}
.home-page .about-points li:hover { background: #fff; border-color: var(--line-2); transform: translateY(-3px); box-shadow: var(--shadow-1); }
.home-page .ap-ico {
    flex: 0 0 auto; width: 42px; height: 42px; border-radius: 13px;
    display: inline-flex; align-items: center; justify-content: center; font-size: 15px;
    color: #fff; background: linear-gradient(135deg, var(--primary-color), #0a63bd);
    box-shadow: 0 10px 22px rgba(1,74,142,.22);
}
.home-page .about-points strong { display: block; color: var(--ink); font-size: 14.5px; font-weight: 700; line-height: 1.25; }
.home-page .about-points small { display: block; color: var(--muted); font-size: 12.5px; margin-top: 2px; }
.home-page .about-btn { margin-top: 32px; }

.home-page {
  --primary-color:#0b3b66; --secondary-color:#f0a843; --ink:#10243a; --ink-2:#1a3552;
  --muted:#607287; --line:rgba(11,59,102,.11); --line-2:rgba(11,59,102,.2);
  --soft:#f3f7fb; --soft-2:#eaf1f8; --radius-xl:30px; --radius-lg:24px; --radius:18px;
  --shadow-1:0 12px 32px rgba(13,38,64,.07); --shadow-2:0 22px 52px rgba(13,38,64,.13);
  --shadow-3:0 28px 70px rgba(13,38,64,.17); color:var(--ink); background:#fff;
}

.home-page {
    --primary-color: #0b3b66;
    --secondary-color: #f0a843;
    --ink: #10243a;
    --ink-2: #1a3552;
    --muted: #607287;
    --line: rgba(11, 59, 102, .11);
    --line-2: rgba(11, 59, 102, .2);
    --soft: #f3f7fb;
    --soft-2: #eaf1f8;
    --radius-xl: 30px;
    --radius-lg: 24px;
    --radius: 18px;
    --shadow-1: 0 12px 32px rgba(13, 38, 64, .07);
    --shadow-2: 0 22px 52px rgba(13, 38, 64, .13);
    --shadow-3: 0 28px 70px rgba(13, 38, 64, .17);
    color: var(--ink);
    background: #fff;
}

body.home-page {
    margin: 0;
    padding: 0;
}

.home-page .spares-sec::before,
.home-page .about-sec::after {
    position: absolute;
    content: "";
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(11, 59, 102, .07), transparent 68%);
    pointer-events: none;
}

.home-page .apares-content h2,
.home-page .about-title h2 {
    color: var(--ink);
    font-size: clamp(28px, 3.2vw, 43px);
    line-height: 1.12;
    letter-spacing: -1.1px;
    text-wrap: balance;
}

.home-page .apares-content p,
.home-page .about-title p {
    color: #607287;
    font-size: 15.5px;
    line-height: 1.78;
}

.home-page .about-sec {
    padding: 96px 0;
    overflow: hidden;
    background: #f3f7fb;
}

.home-page .about-sec::after {
    right: auto;
    bottom: -210px;
    left: -180px;
}

.home-page .about-sec .container {
    position: relative;
    z-index: 1;
}

.home-page .about-eyebrow,
.home-page .hpcert-eyebrow,
.home-page .hphw-eyebrow,
.home-page .hpci-eyebrow {
    color: #a9650c;
    background: rgba(240, 168, 67, .13);
    border: 1px solid rgba(240, 168, 67, .28);
}

.home-page .about-points li {
    border-color: rgba(11, 59, 102, .08);
    border-radius: 14px;
    background: rgba(255, 255, 255, .8);
}

.home-page .about-points li:hover {
    border-color: rgba(240, 168, 67, .45);
    box-shadow: 0 12px 28px rgba(13, 38, 64, .09);
}

.home-page .ap-ico,
.home-page .amc-ico {
    color: #fff;
    background: linear-gradient(145deg, #0b3b66, #176092);
    box-shadow: 0 9px 20px rgba(11, 59, 102, .2);
}

.home-page .about-media {
    padding: 24px 24px 32px;
}

.home-page .about-media-main {
    border: 8px solid #fff;
    border-radius: 26px;
    box-shadow: 0 24px 56px rgba(13, 38, 64, .17);
}

.home-page .about-media-main img {
    min-height: 360px;
    object-fit: cover;
}

.home-page .about-media-tag {
    top: 8px;
    right: 2px;
    color: #12263b;
    background: #ffc66f;
}

.home-page .about-media-card {
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(13, 38, 64, .17);
}

@media (max-width: 767px) {
.home-page .spares-sec,
    .home-page .product-sec,
    .home-page .about-sec,
    .home-page .why-us,
    .home-page .services,
    .home-page .certs-sec,
    .home-page .work-section,
    .home-page .testi-sec,
    .home-page .faq-sectoin {
        padding-top: 66px;
        padding-bottom: 66px;
    }
.home-page .apares-content h2,
    .home-page .about-title h2 {
        font-size: clamp(27px, 7vw, 36px);
    }
.home-page .apares-content p,
    .home-page .about-title p {
        font-size: 14px;
    }
.home-page .about-media {
        margin-top: 12px;
        padding: 14px 12px 22px;
    }
.home-page .about-media-main {
        border-width: 5px;
        border-radius: 20px;
    }
.home-page .about-media-main img {
        min-height: 270px;
    }
.home-page .about-media-tag {
        top: 1px;
        right: -1px;
        padding: 8px 11px;
        font-size: 9px;
    }
.home-page .about-media-card {
        left: 0;
        bottom: -1px;
        padding: 10px 12px;
    }
.home-page .about-points {
        gap: 9px;
    }
}

@media (prefers-reduced-motion: reduce) {
.home-page .spares-box,
    .home-page .spares-box-images img,
    .home-page .product-images a,
    .home-page .about-points li,
    .home-page .why-card,
    .home-page .service_card,
    .home-page .hpcert-card,
    .home-page .testi-card,
    .home-page .hpci-card,
    .home-page .cta-actions .primary-btn,
    .home-page .hpc-actions .primary-btn {
        transition: none !important;
    }
}

.home-page .about-eyebrow,
.home-page .hpcert-eyebrow,
.home-page .hphw-eyebrow,
.home-page .hpci-eyebrow,
.home-page .hpc-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 16px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: 2.2px;
    text-transform: uppercase;
}
      `}</style>
    </>
  );
}
