"use client";

import React from "react";

export default function MaterialsSection() {
  
  return (
    <>
      <div className="home-page w-full">
<div className="about-sec reveal" id="materials">
<div className="container mx-auto w-full px-3">
<div className="row align-items-center g-5 flex flex-wrap items-center gap-5">
<div className="col-lg-6 order-lg-1 w-full lg:w-1/2">
<div className="about-media">
<span className="about-media-glow" aria-hidden="true"></span>
<div className="about-media-main">
<img src="/assets/img/cfm-56-turbine.webp" alt="Hot section turbine components in demanding materials" />
</div>
<div className="about-media-tag">
<i className="fa-solid fa-temperature-high"></i> Built for hot section conditions
                        </div>
<div className="about-media-card">
<span className="amc-ico"><i className="fa-solid fa-ruler-combined"></i></span>
<div>
<span className="amc-num">SPEC</span>
<span className="amc-txt">Tight tolerances, stated on the quote</span>
</div>
</div>
</div>
</div>
<div className="col-lg-6 order-lg-2 w-full lg:w-1/2">
<div className="about-title">
<span className="about-eyebrow">Materials & Tolerances</span>
<h2>Built for Demanding Materials and Tight Tolerances</h2>
<p className="mb-4">
                            Hot section components are typically made from nickel and cobalt-based superalloys and
                            heat-resistant stainless steels. These materials are chosen because they hold their
                            strength at high temperature, but they are also difficult to machine. Cutting forces, tool
                            wear and heat build-up all make precision harder to achieve.
                        </p>
<p className="mb-4">
                            That is why material grade, heat treatment and final dimensions matter as much as the part
                            drawing itself. On every quote we state the material and the key specifications, so your
                            engineers can review them before an order is placed. If something does not match your
                            requirement, you can catch it at the quote stage rather than at installation.
                        </p>
<ul className="about-points">
<li>
<span className="ap-ico"><i className="fa-solid fa-atom"></i></span>
<div>
<strong>Superalloys</strong>
<small>Nickel and cobalt-based grades</small>
</div>
</li>
<li>
<span className="ap-ico"><i className="fa-solid fa-shield-halved"></i></span>
<div>
<strong>Heat-Resistant Steels</strong>
<small>Stainless steels for hot sections</small>
</div>
</li>
<li>
<span className="ap-ico"><i className="fa-solid fa-fire-flame-curved"></i></span>
<div>
<strong>Heat Treatment</strong>
<small>Stated on every quote</small>
</div>
</li>
<li>
<span className="ap-ico"><i className="fa-solid fa-ruler-combined"></i></span>
<div>
<strong>Final Dimensions</strong>
<small>Checked against your drawing</small>
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
</div>
</div>
</div>
      </div>
      <style jsx global>{`

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
