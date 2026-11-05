"use client";

import React from "react";

export default function WhyChooseSection() {
  
  return (
    <>
      <div className="home-page w-full">
<section className="why-us reveal" id="why">
<div className="container mx-auto w-full px-3">
<div className="product-title text-center">
<h3>Why Ago Aviation</h3>
<h2>Why Operators Choose Ago Aviation</h2>
</div>
<div className="why-grid is-four">
<article className="why-card">
<span className="why-ico"><i className="fa-solid fa-file-invoice"></i></span>
<h3>Clarity before you buy</h3>
<p>Our quotes spell out the part, the material, the quantity and the lead time. There are no vague
                        descriptions to decode, and your team can compare our offer against OEM or other supplier
                        quotes on equal terms.</p>
</article>
<article className="why-card">
<span className="why-ico"><i className="fa-solid fa-folder-open"></i></span>
<h3>Documentation you can use</h3>
<p>Turbine parts need paperwork as much as they need precision. We provide the documentation your
                        quality and audit teams expect so that parts can be accepted at your site without delay.</p>
</article>
<article className="why-card">
<span className="why-ico"><i className="fa-solid fa-comments"></i></span>
<h3>Responsive, engineer-friendly communication</h3>
<p>Plant managers and maintenance engineers do not have time for slow replies. We keep
                        communication direct and technical, and we answer your questions about fit, material and
                        delivery in plain language.</p>
</article>
<article className="why-card">
<span className="why-ico"><i className="fa-solid fa-ship"></i></span>
<h3>Export-ready supply</h3>
<p>We ship worldwide and prepare consignments for international transit, including protective
                        packaging and the shipping documents your customs team will ask for. You deal with one team
                        from enquiry to delivery.</p>
</article>
</div>
</div>
</section>
      </div>
      <style jsx global>{`

/* base styles (from original site CSS) */
.why-us { padding: 96px 0; background: #fff; }
.why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.why-card {
    position: relative; overflow: hidden; background: #fff; border: 1px solid var(--line);
    border-radius: var(--radius-lg); padding: 30px 28px; box-shadow: var(--shadow-1);
    transition: transform .4s var(--ease), box-shadow .4s ease, border-color .4s ease;
}
.why-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-2); border-color: var(--line-2); }
.why-card:after { content: ""; position: absolute; left: 0; top: 0; height: 3px; width: 100%; background: linear-gradient(90deg, var(--primary-color), var(--secondary-color)); transform: scaleX(0); transform-origin: left; transition: transform .4s var(--ease); }
.why-card:hover:after { transform: scaleX(1); }
.why-ico { width: 54px; height: 54px; border-radius: 16px; margin-bottom: 18px; display: inline-flex; align-items: center; justify-content: center; font-size: 22px; color: #fff; background: linear-gradient(135deg, var(--primary-color), #0a63bd); box-shadow: 0 12px 26px rgba(1,74,142,.25); }
.why-card h3 { font-size: 18px; font-weight: 800; color: var(--ink); margin-bottom: 10px; }
.why-card p { color: var(--muted); font-size: 14.5px; line-height: 1.7; }

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

.home-page .why-us.reveal {
    position: relative;
    padding: 96px 0;
    overflow: hidden;
    color: #fff;
    background:
        radial-gradient(ellipse at 95% 5%, rgba(37, 112, 163, .28), transparent 34%),
        linear-gradient(145deg, #081d32, #0d3558);
}

.home-page .why-us::before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(240, 168, 67, .8), transparent);
    content: "";
}

.home-page .why-us > .container {
    position: relative;
    z-index: 1;
}

.home-page .why-us .product-title h3 {
    color: #ffd18a;
}

.home-page .why-us .product-title h2 {
    color: #fff;
}

.home-page .why-us .product-title::before {
    color: #ffd18a;
    border-color: rgba(240, 168, 67, .3);
    background: rgba(240, 168, 67, .1);
}

.home-page .why-us .why-grid {
    gap: 16px;
}

.home-page .why-us .why-card {
    min-height: 220px;
    padding: 26px;
    border: 1px solid rgba(255, 255, 255, .11);
    border-radius: 18px;
    background: rgba(255, 255, 255, .055);
    box-shadow: none;
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
}

.home-page .why-us .why-card:hover {
    transform: translateY(-5px);
    border-color: rgba(240, 168, 67, .42);
    background: rgba(255, 255, 255, .09);
    box-shadow: 0 18px 40px rgba(0, 0, 0, .16);
}

.home-page .why-us .why-card::after {
    background: linear-gradient(90deg, #f0a843, #ffda9f);
}

.home-page .why-us .why-ico {
    width: 46px;
    height: 46px;
    margin-bottom: 20px;
    border: 1px solid rgba(240, 168, 67, .24);
    border-radius: 14px;
    color: #ffd18a;
    background: rgba(240, 168, 67, .1);
    box-shadow: none;
}

.home-page .why-us .why-card h3 {
    color: #fff;
    font-size: 16px;
}

.home-page .why-us .why-card p {
    color: rgba(231, 240, 248, .68);
    font-size: 13px;
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
.home-page .why-us .why-card:first-child {
        grid-column: auto;
    }
.home-page .why-card {
        min-height: 0;
        padding: 23px;
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

.home-page .why-us .product-title::before {
    content: none !important;
    display: none !important;
}

.home-page .why-us .product-title h3 {
    display: inline-block;
    margin: 0 0 12px;
    padding: 0;
    border: 0;
    background: none;
    color: #ffd18a;
    font-size: 13px;
    font-weight: 800;
    line-height: 1.4;
    letter-spacing: 2.6px;
    text-transform: uppercase;
}

.home-page .why-us .product-title h2 {
    margin-top: 0;
}

.home-page .why-us .why-card:first-child {
    grid-column: auto;
}

.home-page .why-us .why-grid.is-four {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 767px) {
.home-page .why-us .why-grid.is-four {
        grid-template-columns: minmax(0, 1fr);
    }
}
      `}</style>
    </>
  );
}
