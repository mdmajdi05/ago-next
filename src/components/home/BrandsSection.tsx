"use client";

import React from "react";

export default function BrandsSection() {
  
  return (
    <>
      <div className="home-page w-full">
<section className="brands-sec">
<div className="container mx-auto w-full px-3">
<p className="brands-title">Trusted OEM & Platform Expertise</p>
</div>
<div className="brands-marquee">
<div className="brands-track">
<div className="brand-group">
<a className="brand-chip" href="general-Electric-(GE).html">General Electric</a>
<a className="brand-chip" href="rolls-royce.html">Rolls-Royce</a>
<a className="brand-chip" href="siemens.html">Siemens</a>
<a className="brand-chip" href="solar-turbines.html">Solar Turbines</a>
<a className="brand-chip" href="alstom.html">Alstom</a>
<a className="brand-chip" href="ansaldo.html">Ansaldo</a>
<a className="brand-chip" href="Bently-nevada.html">Bently Nevada</a>
<a className="brand-chip" href="ge-lm6000-turbine-steam-turbine-parts-specialist.html">GE LM6000</a>
<a className="brand-chip" href="pw-mpa-ft8-turbine-steam-turbine-parts-specialist.html">Pratt &
                        Whitney</a>
<a className="brand-chip" href="zorya-mashproekt.html">Zorya-Mashproekt</a>
</div>
<div className="brand-group" aria-hidden="true">
<a className="brand-chip" href="general-Electric-(GE).html">General Electric</a>
<a className="brand-chip" href="rolls-royce.html">Rolls-Royce</a>
<a className="brand-chip" href="siemens.html">Siemens</a>
<a className="brand-chip" href="solar-turbines.html">Solar Turbines</a>
<a className="brand-chip" href="alstom.html">Alstom</a>
<a className="brand-chip" href="ansaldo.html">Ansaldo</a>
<a className="brand-chip" href="Bently-nevada.html">Bently Nevada</a>
<a className="brand-chip" href="ge-lm6000-turbine-steam-turbine-parts-specialist.html">GE LM6000</a>
<a className="brand-chip" href="pw-mpa-ft8-turbine-steam-turbine-parts-specialist.html">Pratt &
                        Whitney</a>
<a className="brand-chip" href="zorya-mashproekt.html">Zorya-Mashproekt</a>
</div>
</div>
</div>
</section>
      </div>
      <style jsx global>{`

/* base styles (from original site CSS) */
.brands-sec { padding: 58px 0 66px; background: #fff; }
.brands-title { text-align: center; font-size: 12.5px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); font-weight: 700; margin-bottom: 26px; }
.brands-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.brands-track { display: flex; width: max-content; animation: brandScroll 34s linear infinite; }
.brands-marquee:hover .brands-track { animation-play-state: paused; }
@keyframes brandScroll { to { transform: translateX(-50%); } }
.brand-group { display: flex; gap: 14px; padding-right: 14px; }
.brand-chip {
    flex: 0 0 auto; display: inline-flex; align-items: center; gap: 10px;
    padding: 13px 24px; border: 1px solid var(--line); border-radius: 999px; background: #fff;
    box-shadow: var(--shadow-1); font-size: 13px; font-weight: 800; letter-spacing: .5px;
    color: var(--ink); text-transform: uppercase; white-space: nowrap; transition: .3s ease;
}
.brand-chip:before { content: "✈"; color: var(--secondary-color); font-size: 12px; line-height: 1; }
.brand-chip:hover { color: var(--primary-color); border-color: var(--line-2); transform: translateY(-2px); box-shadow: var(--shadow-2); }
@media (max-width: 767px) {
    .brands-title { font-size: 11px; letter-spacing: 2px; }
    .brands-sec { padding-top: 60px; padding-bottom: 60px; }
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

.home-page .brands-sec {
    padding: 66px 0 72px;
    background: #fff;
}

.home-page .brands-title {
    margin-bottom: 22px;
    color: #718398;
    font-size: 10px;
    letter-spacing: 2.2px;
}

.home-page .brand-group {
    gap: 10px;
}

.home-page .brand-chip {
    padding: 11px 18px;
    border-radius: 12px;
    background: #fbfcfd;
    box-shadow: none;
    color: #3a526a;
    font-size: 11px;
    letter-spacing: .45px;
}

.home-page .brand-chip::before {
    color: var(--primary-color);
}

.home-page .brand-chip:hover {
    border-color: rgba(240, 168, 67, .55);
    background: #fffaf2;
    box-shadow: 0 8px 22px rgba(13, 38, 64, .08);
}

@media (max-width: 767px) {
.home-page .brands-sec {
        padding: 50px 0;
    }
}
      `}</style>
    </>
  );
}
