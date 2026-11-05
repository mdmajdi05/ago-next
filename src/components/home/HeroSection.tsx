"use client";

import React from "react";

export default function HeroSection() {
  
  return (
    <>
      <div id="ago-hero" className="home-page w-full">
<div className="banner-section">
<div className="main-banner">
<div className="banner-image hero-slider" id="heroSlider">
<div className="hero-bgs" aria-hidden="true">
<span className="hero-bg-layer is-active" style={{ "backgroundImage": "url(\"/assets/img/lm-6000-turbine.webp\")" }}></span>
</div>
<span className="hero-veil"></span>
<div className="hero-wrap">
<div className="container mx-auto w-full px-3">
<div className="hero-copy">
<div className="hero-slides-copy">
<div className="hero-slide-copy is-active">
<span className="hero-eyebrow"><i className="fa-solid fa-industry"></i> Gas Turbine Parts
                                        Manufacturer & Supplier</span>
<h1 className="hero-title">Gas Turbine Parts Manufacturer and Supplier for Power Plants
                                        and Industrial Operators Worldwide</h1>
<p className="hero-sub">When a turbine is down, every day of delay costs money. Ago
                                        Aviation manufactures and supplies precision gas turbine parts and spares for
                                        plant operators, EPC contractors and turbine service companies around the world,
                                        with clear communication from the first enquiry to final delivery.</p>
</div>
</div>
<div className="hero-actions">
<a href="contact.html">
<button className="primary-btn" type="button">Request a Quote</button>
</a>
<a href="gas-turbines-parts.html" className="hero-btn-ghost">Browse Gas Turbine Parts <i className="fa-solid fa-arrow-right"></i></a>
</div>
<ul className="hero-trust">
<li><i className="fa-solid fa-industry"></i> Manufacturer and supplier</li>
<li><i className="fa-solid fa-box-open"></i> Export-ready supply</li>
<li><i className="fa-solid fa-earth-americas"></i> Ships worldwide</li>
</ul>
</div>
<aside className="hero-ops-panel" aria-label="Ago Aviation quote desk">
<div className="hero-ops-top">
<span className="hero-ops-live"><i></i> QUOTE DESK</span>
<span className="hero-ops-status">WORLDWIDE SUPPLY</span>
</div>
<div className="hero-ops-heading">
<span className="hero-ops-icon"><i className="fa-solid fa-paper-plane"></i></span>
<div>
<span>SEND YOUR REQUIREMENT</span>
<strong>Tell us what your turbine needs.</strong>
</div>
</div>
<div className="hero-ops-divider"></div>
<div className="hero-ops-row">
<span><i className="fa-solid fa-barcode"></i> Part number or drawing</span>
<i className="fa-solid fa-check"></i>
</div>
<div className="hero-ops-row">
<span><i className="fa-solid fa-gears"></i> OEM, frame and stage</span>
<i className="fa-solid fa-check"></i>
</div>
<a className="hero-ops-link" href="contact.html">
                                Request a Quote <i className="fa-solid fa-arrow-up-right-from-square"></i>
</a>
</aside>
</div>
</div>
<a className="hero-scroll" href="#trust" aria-label="Scroll to content"><i className="fa-solid fa-chevron-down"></i></a>
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

.home-page .banner-section {
    margin-top: 0;
}

.home-page .hero-slider {
    height: clamp(600px, 78vh, 790px);
    min-height: 600px;
    border-radius: 0 0 34px 34px;
    background: #06172a;
}

.home-page .hero-bg-layer {
    background-position: center 46%;
}

.home-page .hero-veil {
    background:
        radial-gradient(ellipse at 77% 46%, rgba(13, 76, 120, .08), transparent 43%),
        linear-gradient(90deg, rgba(4, 18, 32, .94) 0%, rgba(5, 29, 50, .82) 43%, rgba(6, 30, 51, .34) 75%, rgba(4, 17, 30, .26) 100%),
        linear-gradient(0deg, rgba(4, 17, 30, .42), transparent 45%);
}

.home-page .hero-wrap .container {
    max-width: 1380px;
}

.home-page .hero-copy {
    max-width: 760px;
    padding: 24px 0 20px;
}

.home-page .hero-eyebrow {
    color: #ffd18a;
    border-color: rgba(240, 168, 67, .34);
    background: rgba(7, 26, 45, .45);
    letter-spacing: 1.6px;
}

.home-page .hero-title {
    max-width: 780px;
    font-size: clamp(32px, 3.9vw, 54px);
    line-height: 1.07;
    letter-spacing: -1.2px;
    text-wrap: balance;
}

.home-page .hero-sub {
    max-width: 640px;
    color: rgba(245, 249, 253, .82);
    font-size: clamp(15px, 1.25vw, 17px);
    line-height: 1.68;
}

.home-page .hero-actions {
    gap: 12px;
}

.home-page .hero-actions .primary-btn {
    min-height: 54px;
    padding: 0 26px;
    border: 1px solid var(--secondary-color);
    border-radius: 12px;
    color: #14273a;
    background: var(--secondary-color);
    box-shadow: 0 12px 26px rgba(240, 168, 67, .23);
    font-weight: 800;
}

.home-page .hero-actions .primary-btn:hover {
    transform: translateY(-2px);
    background: #ffc66f;
    box-shadow: 0 16px 32px rgba(240, 168, 67, .3);
}

.home-page .hero-btn-ghost {
    min-height: 54px;
    padding: 0 22px;
    border-color: rgba(255, 255, 255, .3);
    border-radius: 12px;
    background: rgba(255, 255, 255, .06);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

.home-page .hero-btn-ghost:hover {
    color: #fff;
    border-color: rgba(255, 255, 255, .65);
    background: rgba(255, 255, 255, .14);
}

.home-page .hero-trust {
    gap: 20px;
    margin-top: 20px;
}

.home-page .hero-trust li {
    font-size: 12px;
    color: rgba(255, 255, 255, .78);
}

.home-page .hero-scroll {
    border-radius: 14px;
    background: rgba(255, 255, 255, .1);
}

@media (max-width: 767px) {
.home-page .hero-slider {
        height: auto;
        min-height: 650px;
        border-radius: 0 0 24px 24px;
    }
.home-page .hero-veil {
        background:
            linear-gradient(90deg, rgba(4, 18, 32, .91), rgba(5, 29, 50, .67)),
            linear-gradient(0deg, rgba(4, 17, 30, .45), transparent 60%);
    }
.home-page .hero-wrap .container {
        align-items: center;
        padding-top: 50px;
        padding-bottom: 112px;
    }
.home-page .hero-copy {
        padding: 20px 0;
    }
.home-page .hero-eyebrow {
        gap: 7px;
        padding: 8px 12px;
        font-size: 9px;
        letter-spacing: 1px;
    }
.home-page .hero-title {
        margin-top: 17px;
        font-size: clamp(34px, 9vw, 48px);
        letter-spacing: -1.1px;
    }
.home-page .hero-sub {
        margin-top: 14px;
        font-size: 14px;
        line-height: 1.65;
    }
.home-page .hero-actions {
        gap: 9px;
        margin-top: 22px;
    }
.home-page .hero-actions .primary-btn,
    .home-page .hero-btn-ghost {
        min-height: 48px;
        padding: 0 15px;
        font-size: 10px;
    }
.home-page .hero-trust {
        display: flex;
        gap: 10px 14px;
        margin-top: 22px;
    }
.home-page .hero-trust li {
        font-size: 10px;
    }
.home-page .hero-scroll {
        right: 18px;
        bottom: 48px;
        width: 38px;
        height: 38px;
    }
}

@media (max-width: 480px) {
.home-page .hero-slider {
        min-height: 620px;
    }
.home-page .hero-title {
        font-size: 34px;
    }
.home-page .hero-trust {
        display: none;
    }
.home-page .hero-scroll {
        bottom: 35px;
    }
}
      `}</style>
    </>
  );
}
