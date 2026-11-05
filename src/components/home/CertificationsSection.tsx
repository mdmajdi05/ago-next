"use client";

import React from "react";

export default function CertificationsSection() {
  
  return (
    <>
      <div className="home-page w-full">
<section className="certs-sec hpcert-sec reveal" id="quality">
<div className="container mx-auto w-full px-3">
<div className="hpcert-panel">
<span className="hpcert-mesh" aria-hidden="true"></span>
<span className="hpcert-glow" aria-hidden="true"></span>
<div className="hpcert-head" style={{ "marginBottom": "0" }}>
<div className="hpcert-head-copy">
<span className="hpcert-eyebrow">
<i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
                            Quality
                        </span>
<h3>Quality You Can Verify</h3>
<p>Quality claims are only useful when you can check them. Ago Aviation supports its parts with
                            inspection records and documentation that your team can review, and we are happy to discuss
                            your specific quality requirements before an order is placed.</p>
</div>
<div className="hpcert-seal" aria-hidden="true">
<span className="hpcert-seal-ring"></span>
<span className="hpcert-seal-core"><i className="fa-solid fa-clipboard-check"></i></span>
<span className="hpcert-seal-text">Inspection<br />Records</span>
</div>
</div>
<ul className="hq-chips">
<li><i className="fa-solid fa-file-lines"></i> Inspection records</li>
<li><i className="fa-solid fa-folder-open"></i> Part documentation</li>
<li><i className="fa-solid fa-ruler-combined"></i> Material and dimensions stated on the quote</li>
<li><i className="fa-solid fa-comments"></i> Your quality requirements reviewed before order</li>
</ul>
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

.home-page .about-eyebrow,
.home-page .hpcert-eyebrow,
.home-page .hphw-eyebrow,
.home-page .hpci-eyebrow {
    color: #a9650c;
    background: rgba(240, 168, 67, .13);
    border: 1px solid rgba(240, 168, 67, .28);
}

.home-page .certs-sec {
    padding: 78px 0;
    background: #fff;
}

.home-page .hpcert-panel {
    position: relative;
    overflow: hidden;
    padding: clamp(26px, 4vw, 52px);
    border: 1px solid rgba(255, 255, 255, .12);
    border-radius: 28px;
    color: #fff;
    background:
        radial-gradient(ellipse at 95% 0%, rgba(29, 111, 165, .34), transparent 42%),
        linear-gradient(135deg, #081c31, #0c3457);
    box-shadow: 0 24px 60px rgba(8, 31, 54, .18);
}

.home-page .hpcert-head {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    margin-bottom: 34px;
}

.home-page .hpcert-head-copy h3 {
    margin: 13px 0 9px;
    color: #fff;
    font-size: clamp(27px, 3vw, 38px);
    font-weight: 800;
    letter-spacing: -.8px;
}

.home-page .hpcert-head-copy p {
    max-width: 590px;
    color: rgba(236, 243, 249, .72);
    line-height: 1.7;
}

.home-page .hpcert-seal {
    flex: 0 0 auto;
}

.home-page .hpcert-seal-core,
.home-page .hpcert-seal-text {
    color: #ffd18a;
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
.home-page .hpcert-head {
        align-items: flex-start;
    }
.home-page .hpcert-seal {
        transform: scale(.8);
        transform-origin: top right;
    }
}

@media (max-width: 480px) {
.home-page .hpcert-head {
        display: block;
    }
.home-page .hpcert-seal {
        display: none;
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

.home-page .hpcert-eyebrow {
    color: #ffd18a;
    background: rgba(240, 168, 67, .12);
    border: 1px solid rgba(240, 168, 67, .32);
}

.home-page .hq-chips {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0;
    padding: 0;
    list-style: none;
}

.home-page .hq-chips li {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 10px 16px;
    border: 1px solid rgba(255, 255, 255, .14);
    border-radius: 999px;
    color: rgba(240, 246, 252, .86);
    background: rgba(255, 255, 255, .07);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .2px;
}

.home-page .hq-chips li i {
    color: #ffd18a;
    font-size: 12px;
}

@media (max-width: 575px) {
.home-page .hq-chips li {
        font-size: 12px;
        padding: 9px 13px;
    }
}
      `}</style>
    </>
  );
}
