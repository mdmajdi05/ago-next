"use client";

import React from "react";

export default function IndustriesSection() {
  
  return (
    <>
      <div className="home-page w-full">
<section className="testi-sec reveal" id="industries">
<div className="container mx-auto w-full px-3">
<div className="product-title text-center">
<h3>Industries We Serve</h3>
<h2>Serving Power Generation and Industrial Operators</h2>
</div>
<p style={{ "maxWidth": "900px", "margin": "0 auto", "textAlign": "center", "color": "#42566c", "fontSize": "16px", "lineHeight": "1.85" }}>
                Gas turbines drive electricity generation, oil and gas operations, petrochemical processing and heavy
                industry. Our customers include plant operators and maintenance teams who need dependable parts and
                service companies who need a supplier they can count on for their own clients. Whatever the
                application, the standard is the same: the right part, documented properly, delivered when you need
                it.
            </p>
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

.home-page .testi-sec {
    padding: 96px 0;
    background: #fff;
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
}
      `}</style>
    </>
  );
}
