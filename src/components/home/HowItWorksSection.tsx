"use client";

import React from "react";

export default function HowItWorksSection() {
  
  return (
    <>
      <div className="home-page w-full">
<section className="work-section hphw-sec reveal" id="ordering">
<div className="container mx-auto w-full px-3">
<div className="hphw-head">
<span className="hphw-eyebrow">
<i className="fa-solid fa-route" aria-hidden="true"></i>
                    Ordering
                </span>
<h3>How Ordering Works</h3>
</div>
<div className="hphw-timeline">
<span className="hphw-spine" aria-hidden="true"></span>

<div className="hphw-step hphw-left">
<span className="hphw-link" aria-hidden="true"></span>
<span className="hphw-node" aria-hidden="true">01</span>
<span className="hphw-arrow" aria-hidden="true"><i className="fa-solid fa-chevron-right"></i></span>
<article className="hphw-card">
<span className="hphw-ghost" aria-hidden="true">01</span>
<div className="hphw-card-top">
<span className="hphw-ico"><i className="fa-solid fa-paper-plane" aria-hidden="true"></i></span>
<span className="hphw-label">Step 01</span>
</div>
<h3>Send your requirement.</h3>
<p className="mb-4">
                            Share a part number, drawing, sample or turbine frame and stage through our quote form or by
                            email.
                        </p>
<div className="hphw-foot" aria-hidden="true">
<span className="hphw-dots"><i className="is-on"></i><i></i><i></i><i></i></span>
<span className="hphw-count">01 / 04</span>
</div>
</article>
</div>

<div className="hphw-step hphw-right">
<span className="hphw-link" aria-hidden="true"></span>
<span className="hphw-node" aria-hidden="true">02</span>
<span className="hphw-arrow" aria-hidden="true"><i className="fa-solid fa-chevron-left"></i></span>
<article className="hphw-card">
<span className="hphw-ghost" aria-hidden="true">02</span>
<div className="hphw-card-top">
<span className="hphw-ico"><i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i></span>
<span className="hphw-label">Step 02</span>
</div>
<h3>We confirm the details.</h3>
<p className="mb-4">
                            Our team checks the specification, material and quantity with you and raises any questions
                            before pricing.
                        </p>
<div className="hphw-foot" aria-hidden="true">
<span className="hphw-dots"><i></i><i className="is-on"></i><i></i><i></i></span>
<span className="hphw-count">02 / 04</span>
</div>
</article>
</div>

<div className="hphw-step hphw-left">
<span className="hphw-link" aria-hidden="true"></span>
<span className="hphw-node" aria-hidden="true">03</span>
<span className="hphw-arrow" aria-hidden="true"><i className="fa-solid fa-chevron-right"></i></span>
<article className="hphw-card">
<span className="hphw-ghost" aria-hidden="true">03</span>
<div className="hphw-card-top">
<span className="hphw-ico"><i className="fa-solid fa-file-invoice-dollar" aria-hidden="true"></i></span>
<span className="hphw-label">Step 03</span>
</div>
<h3>Review your quote.</h3>
<p className="mb-4">
                            You receive clear pricing and lead time, so you can plan your outage or repair with
                            confidence.
                        </p>
<div className="hphw-foot" aria-hidden="true">
<span className="hphw-dots"><i></i><i></i><i className="is-on"></i><i></i></span>
<span className="hphw-count">03 / 04</span>
</div>
</article>
</div>

<div className="hphw-step hphw-right">
<span className="hphw-link" aria-hidden="true"></span>
<span className="hphw-node" aria-hidden="true">04</span>
<span className="hphw-arrow" aria-hidden="true"><i className="fa-solid fa-chevron-left"></i></span>
<article className="hphw-card">
<span className="hphw-ghost" aria-hidden="true">04</span>
<div className="hphw-card-top">
<span className="hphw-ico"><i className="fa-solid fa-box-open" aria-hidden="true"></i></span>
<span className="hphw-label">Step 04</span>
</div>
<h3>Production, inspection and dispatch.</h3>
<p className="mb-4">
                            Once you approve, your order is processed, checked against the agreed specification and
                            shipped to your site.
                        </p>
<div className="hphw-foot" aria-hidden="true">
<span className="hphw-dots"><i></i><i></i><i></i><i className="is-on"></i></span>
<span className="hphw-count">04 / 04</span>
</div>
</article>
</div>
</div>
<div className="text-center mt-5">
<a href="contact.html">
<button className="primary-btn" type="button">Request a Quote</button>
</a>
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

.home-page .work-section {
    padding: 96px 0;
    background:
        radial-gradient(circle at 50% 10%, rgba(11, 59, 102, .055), transparent 35%),
        #f3f7fb;
}

.home-page .hphw-head {
    max-width: 760px;
    margin: 0 auto 42px;
    text-align: center;
}

.home-page .hphw-head h2,
.home-page .hphw-head h3 {
    color: var(--ink);
}

.home-page .hphw-card {
    border: 1px solid rgba(11, 59, 102, .1);
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 14px 36px rgba(13, 38, 64, .08);
}

.home-page .hphw-card h3 {
    color: #17344f;
}

.home-page .hphw-card p {
    color: #65788b;
    font-size: 14px;
    line-height: 1.75;
}

.home-page .hphw-node,
.home-page .hphw-ico {
    color: #fff;
    background: var(--primary-color);
    box-shadow: 0 9px 22px rgba(11, 59, 102, .2);
}

.home-page .work-section {
    padding: clamp(64px, 8vw, 104px) 0;
}

.home-page .hphw-timeline {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px 72px;
    max-width: 1080px;
    margin: 0 auto;
}

.home-page .hphw-spine {
    position: absolute;
    top: 20px;
    bottom: 20px;
    left: 50%;
    width: 2px;
    transform: translateX(-50%);
}

.home-page .hphw-step {
    position: relative;
    min-width: 0;
    align-self: start;
}

.home-page .hphw-left {
    grid-column: 1;
    text-align: right;
}

.home-page .hphw-right {
    grid-column: 2;
    text-align: left;
}

.home-page .hphw-card {
    position: relative;
    overflow: hidden;
    min-height: 100%;
    padding: 26px 28px 20px;
}

.home-page .hphw-card > :not(.hphw-ghost) {
    position: relative;
    z-index: 1;
}

.home-page .hphw-ghost {
    position: absolute;
    top: 12px;
    right: 20px;
    color: rgba(11, 59, 102, .055);
    font-size: 76px;
    font-weight: 900;
    line-height: 1;
    pointer-events: none;
}

.home-page .hphw-card-top {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.home-page .hphw-left .hphw-card-top {
    justify-content: flex-end;
}

.home-page .hphw-ico {
    display: grid;
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    place-items: center;
    border-radius: 14px;
}

.home-page .hphw-label {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
}

.home-page .hphw-card h3 {
    margin: 0 0 12px;
    font-size: clamp(17px, 1.6vw, 20px);
    line-height: 1.35;
}

.home-page .hphw-card p {
    margin-bottom: 12px;
    font-size: 13px;
}

.home-page .hphw-card p:last-of-type {
    margin-bottom: 0;
}

.home-page .hphw-node {
    position: absolute;
    top: 34px;
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border-radius: 50%;
}

.home-page .hphw-left .hphw-node {
    left: calc(100% + 36px);
    transform: translateX(-50%);
}

.home-page .hphw-right .hphw-node {
    left: -36px;
    transform: translateX(-50%);
}

.home-page .hphw-link {
    position: absolute;
    top: 55px;
    width: 36px;
    height: 1px;
}

.home-page .hphw-left .hphw-link {
    left: 100%;
}

.home-page .hphw-right .hphw-link {
    right: 100%;
}

.home-page .hphw-arrow {
    position: absolute;
    top: 44px;
    z-index: 1;
    display: grid;
    width: 22px;
    height: 22px;
    place-items: center;
    border: 1px solid rgba(11, 59, 102, .12);
    border-radius: 50%;
    color: #0b3b66;
    background: #fff;
    font-size: 9px;
}

.home-page .hphw-left .hphw-arrow {
    left: calc(100% + 8px);
}

.home-page .hphw-right .hphw-arrow {
    right: calc(100% + 8px);
}

.home-page .hphw-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 20px;
    padding-top: 14px;
}

.home-page .hphw-dots {
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.home-page .hphw-dots i {
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(11, 59, 102, .2);
}

.home-page .hphw-dots i.is-on {
    width: 18px;
    border-radius: 5px;
    background: #f0a843;
}

.home-page .hphw-count {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .8px;
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
.home-page .hphw-head {
        margin-bottom: 26px;
    }
}

@media (max-width: 700px) {
.home-page .work-section {
        padding: 64px 0;
    }
.home-page .hphw-head {
        margin-bottom: 30px;
    }
.home-page .hphw-head h3 {
        font-size: clamp(27px, 7vw, 36px);
        letter-spacing: -.7px;
    }
.home-page .hphw-timeline {
        grid-template-columns: 42px minmax(0, 1fr);
        gap: 18px 12px;
        margin-left: 0;
    }
.home-page .hphw-spine {
        left: 21px;
    }
.home-page .hphw-step,
    .home-page .hphw-left,
    .home-page .hphw-right {
        grid-column: 1 / -1;
        width: 100%;
        padding-left: 56px;
        text-align: left;
    }
.home-page .hphw-left .hphw-node,
    .home-page .hphw-right .hphw-node {
        top: 22px;
        left: 21px;
        right: auto;
        width: 42px;
        height: 42px;
        transform: translateX(-50%);
    }
.home-page .hphw-link {
        top: 43px;
        width: 14px;
    }
.home-page .hphw-left .hphw-link,
    .home-page .hphw-right .hphw-link {
        left: 42px;
        right: auto;
    }
.home-page .hphw-arrow {
        display: none;
    }
.home-page .hphw-card {
        min-height: 0;
        padding: 21px 18px 17px;
    }
.home-page .hphw-left .hphw-card-top {
        justify-content: flex-start;
    }
.home-page .hphw-card h3 {
        font-size: 17px;
    }
.home-page .hphw-card p {
        font-size: 13px;
    }
.home-page .hphw-ghost {
        top: 14px;
        right: 14px;
        font-size: 60px;
    }
}

.home-page .hphw-left {
    text-align: left;
}

.home-page .hphw-left .hphw-card-top {
    justify-content: flex-start;
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

.home-page .hphw-eyebrow {
    color: #a9650c;
    background: rgba(240, 168, 67, .12);
    border: 1px solid rgba(240, 168, 67, .32);
}
      `}</style>
    </>
  );
}
