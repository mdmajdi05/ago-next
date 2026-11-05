"use client";

import React from "react";

export default function PartsSection() {
  
  return (
    <>
      <div className="home-page w-full">
<section className="services reveal" id="parts">
<div className="product-title text-center">
<h3>What We Supply</h3>
<h2>Gas Turbine Parts and Components We Supply</h2>
<p>Our range covers the components that wear fastest and matter most to turbine performance. Each part is
                quoted against your drawing, part number or OEM reference, so you know exactly what you are buying
                before you commit.</p>
</div>
<div className="container mx-auto w-full px-3">
<div className="service-container">

<div className="service_card">
<img src="/assets/img/lm-100-turbine.webp" alt="Turbine shrouds" />
<div className="content">
<h3>Turbine Shrouds</h3>
<p>Shrouds control the clearance between rotating blades and the casing. Accurate dimensions and
                            the right material help limit tip leakage and protect efficiency over long running hours.
                        </p>
<a href="contact.html">
<button className="primary-btn serve_btn">Request a Quote<span className="dots"><i></i><i></i><i></i></span></button>
</a>
</div>
</div>

<div className="service_card">
<img src="/assets/img/lm-6000-turbine.webp" alt="Buckets and blades" />
<div className="content">
<h3>Buckets and Blades</h3>
<p>Rotating blades take the highest thermal and mechanical loads in the machine. We supply
                            replacements matched to frame and stage, with material and dimensional details confirmed
                            before production.</p>
<a href="contact.html">
<button className="primary-btn serve_btn">Request a Quote<span className="dots"><i></i><i></i><i></i></span></button>
</a>
</div>
</div>

<div className="service_card">
<img src="/assets/img/lm-5000-turbine.webp" alt="Nozzles and vanes" />
<div className="content">
<h3>Nozzles and Vanes</h3>
<p>Stationary nozzles and vanes direct hot gas onto the rotating stages. Their profile and
                            finish directly affect flow, output and component life.</p>
<a href="contact.html">
<button className="primary-btn serve_btn">Request a Quote<span className="dots"><i></i><i></i><i></i></span></button>
</a>
</div>
</div>

<div className="service_card">
<img src="/assets/img/cfm-56-turbine.webp" alt="Combustion components" />
<div className="content">
<h3>Combustion Components</h3>
<p>Liners, transition pieces and fuel nozzles operate where temperatures are highest. We help
                            you source replacements ahead of combustion inspections.</p>
<a href="contact.html">
<button className="primary-btn serve_btn">Request a Quote<span className="dots"><i></i><i></i><i></i></span></button>
</a>
</div>
</div>

<div className="service_card">
<img src="/assets/img/lm-2500-turbine.webp" alt="Hot gas path parts" />
<div className="content">
<h3>Hot Gas Path Parts</h3>
<p>Complete sets of hot section components for planned outages, so your maintenance window is
                            not delayed by missing parts.</p>
<a href="contact.html">
<button className="primary-btn serve_btn">Request a Quote<span className="dots"><i></i><i></i><i></i></span></button>
</a>
</div>
</div>

<div className="service_card">
<img src="/assets/img/solar-turbines.jpg" alt="Spares and consumables" />
<div className="content">
<h3>Spares and Consumables</h3>
<p>Seals, fasteners and other routine items that keep a turbine in service between major
                            overhauls.</p>
<a href="contact.html">
<button className="primary-btn serve_btn">Request a Quote<span className="dots"><i></i><i></i><i></i></span></button>
</a>
</div>
</div>
</div>
<div className="text-center mt-5">
<p style={{ "maxWidth": "780px", "margin": "0 auto 22px", "color": "#67798c", "fontSize": "15.5px", "lineHeight": "1.75" }}>
                    Looking for something not listed here? Send us the details. If it is a gas turbine part, we will
                    tell you plainly whether we can supply it.
                </p>
<a href="contact.html">
<button className="primary-btn" type="button">Request a Quote</button>
</a>
</div>
</div>
</section>
      </div>
      <style jsx global>{`

/* base styles (from original site CSS) */
button.primary-btn {
    position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    min-height: 52px; padding: 14px 30px; border: none; border-radius: 999px;
    background: linear-gradient(135deg, var(--primary-color) 0%, #0a63bd 100%);
    color: #fff; font-size: 13.5px; font-weight: 700; letter-spacing: .9px; text-transform: uppercase;
    cursor: pointer; overflow: hidden; margin-top: 0;
    box-shadow: 0 14px 30px rgba(1,74,142,.28);
    transition: transform .3s var(--ease), box-shadow .3s ease, background .3s ease, color .3s ease;
}
button.primary-btn:after { content: "→"; font-size: 14px; line-height: 1; transition: transform .3s var(--ease); }
button.primary-btn:before {
    content: ""; position: absolute; top: 0; left: -130%; width: 55%; height: 100%;
    background: linear-gradient(100deg, transparent, rgba(255,255,255,.5), transparent);
    transform: skewX(-18deg); transition: left .55s var(--ease);
}
button.primary-btn:hover {
    background: linear-gradient(135deg, var(--secondary-color) 0%, #ffc46b 100%);
    color: var(--ink); transform: translateY(-3px); box-shadow: 0 20px 42px rgba(240,169,69,.42);
}
button.primary-btn:hover:after { transform: translateX(5px); }
button.primary-btn:hover:before { left: 135%; }
button.primary-btn:active { transform: translateY(-1px); }
button.primary-btn.serve_btn {
    background: transparent !important; color: var(--primary-color) !important;
    border: 1.6px solid var(--line-2) !important; box-shadow: none !important;
    min-height: 46px; padding: 11px 22px; font-size: 12px;
}
button.primary-btn.serve_btn:after { content: none; }
button.primary-btn.serve_btn:hover {
    background: var(--primary-color) !important; color: #fff !important;
    border-color: var(--primary-color) !important; transform: translateY(-3px);
    box-shadow: 0 16px 30px rgba(1,74,142,.30) !important;
}
.home-page .services { padding: 96px 0; background: linear-gradient(180deg, #f7fafd 0%, #eef3f9 100%); text-align: center; }
.home-page .service-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; align-items: stretch; }
.home-page .service_card {
    display: flex; flex-direction: column; height: 100%; text-align: left;
    background: #fff; border: 1px solid var(--line); border-radius: var(--radius-lg); overflow: hidden;
    box-shadow: var(--shadow-1);
    transition: transform .4s var(--ease), box-shadow .4s ease, border-color .4s ease;
}
.home-page .service_card:hover { transform: translateY(-8px); box-shadow: var(--shadow-2); border-color: var(--line-2); }
.home-page .service_card img { width: 100%; height: 210px; object-fit: cover; display: block; }
.home-page .service_card .content { flex: 1; display: flex; flex-direction: column; padding: 24px 24px 26px; }
.home-page .service_card .content h3 { font-size: 19px; line-height: 1.32; font-weight: 800; color: var(--ink); margin-bottom: 12px; }
.home-page .service_card .content p {
    color: var(--muted); font-size: 14.5px; line-height: 1.68; margin-bottom: 18px;
    display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden;
}
.home-page .service_card .content a { margin-top: auto; }
.serve_btn .dots { display: inline-flex; align-items: center; gap: 4px; margin-left: 2px; }
.serve_btn .dots i { width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: .35; animation: dotPulse 1.2s infinite ease-in-out; }
.serve_btn .dots i:nth-child(2) { animation-delay: .15s; }
.serve_btn .dots i:nth-child(3) { animation-delay: .3s; }
@keyframes dotPulse { 0%, 100% { opacity: .35; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2px); } }
@media (max-width: 767px) {
    .home-page .service-container { grid-template-columns: 1fr; }
}

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

.home-page .product-title {
    margin-bottom: 36px;
}

.home-page .product-title h3 {
    margin-bottom: 10px;
    color: #bb7a1f;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
}

.home-page .product-title h2 {
    color: var(--ink);
    font-size: clamp(28px, 3.4vw, 44px);
    font-weight: 800;
    letter-spacing: -1.1px;
    line-height: 1.12;
    text-transform: none;
    text-wrap: balance;
}

.home-page .product-title p {
    color: #64778b;
}

.home-page .services {
    padding: 96px 0;
    background: #f4f7fa;
}

.home-page .services .product-title {
    max-width: 800px;
    margin: 0 auto 38px;
}

.home-page .service-container {
    gap: 18px;
}

.home-page .service_card {
    border-color: rgba(11, 59, 102, .09);
    border-radius: 19px;
    background: #fff;
    box-shadow: 0 10px 30px rgba(13, 38, 64, .07);
}

.home-page .service_card:hover {
    transform: translateY(-5px);
    border-color: rgba(240, 168, 67, .42);
    box-shadow: 0 20px 44px rgba(13, 38, 64, .13);
}

.home-page .service_card img {
    height: 200px;
    filter: saturate(.9);
    transition: transform .6s ease, filter .4s ease;
}

.home-page .service_card:hover img {
    filter: saturate(1.08);
}

.home-page .service_card .content {
    padding: 22px 22px 24px;
}

.home-page .service_card .content h3 {
    color: #17344f;
    font-size: 17px;
}

.home-page .service_card .content p {
    color: #67798c;
    font-size: 13px;
}

.home-page .service_card .serve_btn {
    border-radius: 10px;
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
.home-page .why-grid,
    .home-page .testi-grid,
    .home-page .service-container {
        grid-template-columns: 1fr;
    }
.home-page .service_card img {
        height: 215px;
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
