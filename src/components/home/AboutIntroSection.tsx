"use client";

import React from "react";

export default function AboutIntroSection() {
  
  return (
    <>
      <div className="home-page w-full">
<div className="about-sec about-intro reveal" id="trust">
<div className="container mx-auto w-full px-3">
<div className="row align-items-center g-5 flex flex-wrap items-center gap-5">
<div className="col-lg-6 w-full lg:w-1/2">
<div className="about-title about-intro-copy">
<span className="about-eyebrow"><i className="fa-solid fa-circle-info"></i> About Ago Aviation</span>
<h2>Precision Gas Turbine Parts, <span className="ai-hl">Delivered Worldwide</span></h2>
<p className="mb-4 about-intro-lead"><span className="ai-em">Ago Aviation is a trusted gas turbine
                            parts manufacturer and supplier</span> serving customers across the world. We help power
                            plants, oil and gas facilities, industrial operators and service companies source the
                            components they need to keep their turbines running safely and efficiently.</p>
<p className="mb-4">Gas turbine components work in some of the harshest conditions in engineering:
                            extreme heat, high pressure, constant vibration and repeated thermal cycling. A part that
                            is slightly off specification does not simply wear out faster. It can reduce efficiency,
                            cause an unplanned shutdown or put the entire machine at risk. That is why we treat
                            precision, material integrity and documentation as the foundation of every order, not an
                            add-on.</p>
<p>Ago Aviation is operated by WS Turbomar Private Limited. Whether you need a single critical
                            spare for an urgent repair or a planned set of parts for a major inspection, our team works
                            with your engineers and procurement staff to make sure the right part reaches the right
                            site.</p>
</div>
</div>
<div className="col-lg-6 w-full lg:w-1/2">
<div className="about-media about-intro-media">
<span className="about-media-glow" aria-hidden="true"></span>
<div className="about-media-main">
<img src="/assets/img/lm-2500-turbine.webp" alt="Gas turbine parts manufacturer and supplier" />
</div>
<div className="about-media-tag">
<i className="fa-solid fa-globe"></i> Delivered Worldwide
                        </div>
<div className="about-media-card">
<span className="amc-ico"><i className="fa-solid fa-microchip"></i></span>
<div>
<span className="amc-num">Precision</span>
<span className="amc-txt">Material integrity & documentation</span>
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
.home-page .about-sec { position: relative; padding: 100px 0; background: #fff; overflow: hidden; }
.home-page .about-sec:before { content: ""; position: absolute; right: -160px; top: -140px; width: 460px; height: 460px; border-radius: 50%; background: radial-gradient(circle, rgba(1,74,142,.08), transparent 68%); pointer-events: none; }
.home-page .about-title { position: relative; z-index: 1; }
.home-page .about-eyebrow {
    display: inline-block; font-size: 12px; letter-spacing: 3.4px; font-weight: 800; text-transform: uppercase;
    color: var(--secondary-color); background: rgba(240,169,69,.12); border: 1px solid rgba(240,169,69,.30);
    padding: 7px 17px; border-radius: 99px; margin-bottom: 16px;
}
.home-page .about-title h2 { font-size: clamp(26px,2.9vw,46px); line-height: 1.14; font-weight: 800; letter-spacing: -.6px; text-transform: none; color: var(--ink); margin-bottom: 18px; }
.home-page .about-title p { color: var(--muted); font-size: 16px; line-height: 1.82; max-width: 620px; }
.home-page .about-sec .row { gap: 0; }
.home-page .about-sec .row > div { padding-left: 12px; padding-right: 12px; }
.home-page .about-media { position: relative; padding: 26px 26px 34px; }
.home-page .about-media-glow {
    position: absolute; right: -6%; bottom: -4%; width: 62%; height: 62%; z-index: 0;
    background: radial-gradient(circle, rgba(240,169,69,.38), transparent 66%); filter: blur(6px);
}
.home-page .about-media-main { position: relative; z-index: 1; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-3); }
.home-page .about-media-main img { width: 100%; display: block; border-radius: var(--radius-xl); transition: transform .9s var(--ease); }
.home-page .about-media:hover .about-media-main img { transform: scale(1.035); }
.home-page .about-media-tag {
    position: absolute; z-index: 3; right: 2px; top: 8px;
    display: inline-flex; align-items: center; gap: 8px; padding: 10px 17px; border-radius: 99px;
    font-size: 12px; font-weight: 800; letter-spacing: .5px; color: var(--ink);
    background: linear-gradient(135deg, var(--secondary-color), #ffc46b);
    box-shadow: 0 14px 30px rgba(240,169,69,.4);
}
.home-page .about-media-card {
    position: absolute; z-index: 3; left: 2px; bottom: 4px;
    display: flex; align-items: center; gap: 13px; padding: 15px 20px;
    background: #fff; border: 1px solid var(--line); border-radius: 18px; box-shadow: var(--shadow-3);
}
.home-page .amc-ico {
    flex: 0 0 auto; width: 46px; height: 46px; border-radius: 14px;
    display: inline-flex; align-items: center; justify-content: center; font-size: 17px; color: #fff;
    background: linear-gradient(135deg, var(--primary-color), #0a63bd);
}
.home-page .amc-num { display: block; font-size: 19px; font-weight: 800; color: var(--ink); line-height: 1.05; }
.home-page .amc-txt { display: block; font-size: 12px; color: var(--muted); }

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

.home-page .about-intro {
    position: relative;
    background:
        radial-gradient(ellipse at 88% 12%, rgba(240, 168, 67, .10), transparent 42%),
        linear-gradient(180deg, #ffffff 0%, #f3f7fb 100%);
}

.home-page .about-intro::after {
    right: -160px;
    left: auto;
    bottom: -200px;
    background: radial-gradient(circle, rgba(11, 59, 102, .08), transparent 68%);
}

.home-page .about-intro .about-intro-copy .about-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 2.2px;
    text-transform: uppercase;
}

.home-page .about-intro .about-intro-copy .about-eyebrow i {
    font-size: 11px;
}

.home-page .about-intro .about-intro-copy h2 {
    margin-bottom: 22px;
}

.home-page .about-intro .about-intro-copy p {
    max-width: 640px;
}

.home-page .about-intro .about-intro-lead {
    color: #33475e;
    font-size: 17px;
    line-height: 1.8;
    font-weight: 500;
}

.home-page .about-intro .about-intro-copy p:last-child {
    margin-bottom: 0;
}

.home-page .about-intro .about-media-main img {
    min-height: 440px;
    max-height: 520px;
}

.home-page .about-intro .about-media-tag {
    top: 18px;
    right: 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 999px;
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
}

.home-page .about-intro .about-media-card {
    left: 10px;
    bottom: 10px;
}

.home-page .about-intro .about-media-card .amc-txt {
    max-width: 190px;
}

@media (max-width: 991px) {
.home-page .about-intro .about-media-main img {
        min-height: 320px;
    }
}

@media (max-width: 575px) {
.home-page .about-intro .about-media-main img {
        min-height: 240px;
    }
}

.home-page .about-intro .ai-hl {
    position: relative;
    display: inline;
    padding: 0 .06em;
    color: #0b3b66;
    border-radius: 4px;
    background-image: linear-gradient(180deg,
        transparent 52%,
        rgba(240, 168, 67, .58) 52%,
        rgba(255, 198, 111, .46) 96%,
        transparent 96%);
    background-repeat: no-repeat;
    background-position: 0 100%;
    background-size: 0% 100%;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    animation: aiMarkerFill 1.1s .35s cubic-bezier(.22, .7, .2, 1) forwards;
}

.home-page .about-intro .about-intro-lead {
    position: relative;
    padding-left: 18px;
}

.home-page .about-intro .about-intro-lead::before {
    position: absolute;
    top: .22em;
    bottom: .22em;
    left: 0;
    width: 3px;
    border-radius: 3px;
    background: linear-gradient(180deg, var(--secondary-color), rgba(240, 168, 67, .12));
    content: "";
}

.home-page .about-intro .ai-em {
    color: #12263b;
    font-weight: 700;
    background-image: linear-gradient(180deg, transparent 72%, rgba(11, 59, 102, .14) 72%);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.home-page .about-intro .about-media-main {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    border: 8px solid #fff;
    border-radius: 28px;
    box-shadow: 0 28px 66px rgba(13, 38, 64, .2);
    transition: transform .55s cubic-bezier(.22, .7, .2, 1),
                box-shadow .55s cubic-bezier(.22, .7, .2, 1);
}

.home-page .about-intro .about-media-main::before {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: linear-gradient(105deg,
        transparent 30%,
        rgba(255, 255, 255, .38) 48%,
        transparent 66%);
    transform: translateX(-120%);
    transition: transform .9s cubic-bezier(.22, .7, .2, 1);
    content: "";
    pointer-events: none;
}

.home-page .about-intro .about-media-main::after {
    position: absolute;
    inset: 10px;
    z-index: 2;
    border: 1px solid rgba(240, 168, 67, .42);
    border-radius: 20px;
    content: "";
    pointer-events: none;
}

.home-page .about-intro .about-media-main img {
    transition: transform .9s cubic-bezier(.22, .7, .2, 1);
}

.home-page .about-intro .about-media:hover .about-media-main {
    transform: translateY(-6px);
    box-shadow: 0 38px 80px rgba(13, 38, 64, .26);
}

.home-page .about-intro .about-media:hover .about-media-main img {
    transform: scale(1.045);
}

.home-page .about-intro .about-media:hover .about-media-main::before {
    transform: translateX(120%);
}

.home-page .about-intro .about-media-tag {
    color: #071a2d;
    background: linear-gradient(135deg, #ffd18a, #f0a843);
    box-shadow: 0 14px 30px rgba(240, 168, 67, .38);
}

@media (prefers-reduced-motion: reduce) {
.home-page .about-intro .ai-hl {
        background-size: 100% 100%;
        animation: none;
    }
.home-page .about-intro .about-media-main,
    .home-page .about-intro .about-media-main img,
    .home-page .about-intro .about-media-main::before {
        transition: none;
    }
.home-page .about-intro .about-media:hover .about-media-main,
    .home-page .about-intro .about-media:hover .about-media-main img {
        transform: none;
    }
}

@keyframes aiMarkerFill {
    to { background-size: 100% 100%; }
}
      `}</style>
    </>
  );
}
