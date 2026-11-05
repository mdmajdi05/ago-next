"use client";

import React from "react";

export default function CTABanner() {
  
  return (
    <>
      <div className="home-page w-full">
<section className="cta-banner reveal">
<div className="container mx-auto w-full px-3">
<div className="cta-inner">
<div className="cta-copy">
<span className="cta-eyebrow"><i className="fa-solid fa-industry"></i> Send us your requirement</span>
<h2>Need a Gas Turbine Part? Send Us Your Requirement.</h2>
<p>Tell us what your turbine needs. Share a part number, drawing or frame and stage, and our team
                        will respond with a clear, detailed quote.</p>
</div>
<div className="cta-actions">
<a href="contact.html">
<button className="primary-btn" type="button">Request a Quote</button>
</a>
<a className="cta-call" href="mailto:sale@agoaviation.com"><i className="fa-solid fa-envelope"></i> sale@agoaviation.com</a>
<a className="cta-call" href="tel:+917011123269"><i className="fa-solid fa-phone"></i> +91 7011123269</a>
</div>
</div>
</div>
</section>
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

/* base styles (from original site CSS) */
.cta-inner {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1.5fr auto;
    gap: 30px;
    align-items: center;
}
.cta-inner:before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(120% 140% at 100% 0%, rgba(240,169,69,.30), transparent 55%);
    pointer-events: none;
}
.cta-inner:after {
    position: absolute;
    right: 28%;
    bottom: -112px;
    width: 260px;
    height: 260px;
    border: 1px solid rgba(255, 255, 255, .1);
    border-radius: 50%;
    box-shadow: 0 0 0 22px rgba(255, 255, 255, .025), 0 0 0 48px rgba(255, 255, 255, .02);
    content: "";
    pointer-events: none;
}
.cta-copy {
    position: relative;
    z-index: 1;
}
.cta-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: var(--secondary-color);
    margin-bottom: 14px;
}
.cta-copy h2 {
    font-weight: 800;
    margin-bottom: 12px;
    max-width: 680px;
}
.cta-copy p {
    font-size: 15.5px;
    line-height: 1.7;
    max-width: 560px;
}
.cta-actions {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: flex-start;
}
.cta-call {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: .4px;
}
.cta-call i {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, .12);
    border: 1px solid rgba(255, 255, 255, .22);
}
.cta-call:hover {
    color: var(--secondary-color);
}

.home-page .cta-banner {
    padding: 0 0 90px;
    background: #f3f7fb;
}

.home-page .cta-inner {
    padding: clamp(32px, 5vw, 58px);
    border: 1px solid rgba(255, 255, 255, .12);
    border-radius: 26px;
    background:
        radial-gradient(ellipse at 90% 0%, rgba(49, 127, 178, .3), transparent 38%),
        linear-gradient(125deg, #081c31, #0b3b66);
    box-shadow: 0 22px 55px rgba(8, 31, 54, .2);
}

.home-page .cta-copy h2 {
    color: #fff;
    font-size: clamp(28px, 3.6vw, 43px);
    line-height: 1.12;
    letter-spacing: -.9px;
}

.home-page .cta-copy p {
    color: rgba(236, 243, 249, .76);
}

.home-page .cta-eyebrow {
    color: #ffd18a;
}

.home-page .cta-call {
    color: #fff;
}

.home-page .cta-actions .primary-btn,
.home-page .hpc-actions .primary-btn {
    min-height: 48px;
    padding: 0 22px;
    border: 0;
    border-radius: 11px;
    color: #12263b;
    background: #f0a843;
    font-weight: 800;
    transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
}

.home-page .cta-actions .primary-btn:hover,
.home-page .hpc-actions .primary-btn:hover {
    transform: translateY(-2px);
    background: #ffc66f;
    box-shadow: 0 12px 24px rgba(240, 168, 67, .24);
}

@media (max-width: 991px) {
    .cta-inner {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 767px) {
.home-page .cta-banner {
        padding: 0 0 66px;
    }
.home-page .cta-inner {
        padding: 30px 23px;
        border-radius: 20px;
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
      `}</style>
    </>
  );
}
