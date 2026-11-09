"use client";

import React from "react";

export default function FrameSection() {
  
  return (
    <>
      <div className="home-page w-full">
<div className="about-sec reveal" id="frame">
<div className="container mx-auto w-full px-3">
<div className="row align-items-center g-5 flex flex-wrap items-center gap-5">
<div className="col-lg-6 w-full lg:w-1/2">
<div className="about-title">
<span className="about-eyebrow">Frame & Stage</span>
<h2>Parts Matched to Your Turbine Frame</h2>
<p className="mb-4">
                            No two turbine fleets are identical. A part that fits one frame or stage will not
                            necessarily fit another, even within the same OEM family. To avoid costly mistakes, we ask
                            for the OEM, turbine model, frame and stage, along with any part number or drawing you
                            have.
                        </p>
<p className="mb-4">
                            From there, we confirm the specification with you, flag any questions about material or
                            tolerance, and only then issue a quote. If a part is not something we can supply, you will
                            hear that early, so you can look elsewhere without losing time.
                        </p>
<ul className="about-points">
<li>
<span className="ap-ico"><i className="fa-solid fa-industry"></i></span>
<div>
<strong>OEM & Turbine Model</strong>
<small>We confirm the machine first</small>
</div>
</li>
<li>
<span className="ap-ico"><i className="fa-solid fa-layer-group"></i></span>
<div>
<strong>Frame & Stage</strong>
<small>Fit confirmed for your unit</small>
</div>
</li>
<li>
<span className="ap-ico"><i className="fa-solid fa-barcode"></i></span>
<div>
<strong>Part Number or Drawing</strong>
<small>Share whatever detail you have</small>
</div>
</li>
</ul>
<div className="about-btn">
<a href="/contact">
<button className="primary-btn">Request a Quote</button>
</a>
</div>
<div className="mt-5">
<p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#b77b1c]">Popular platform guides</p>
<div className="flex flex-wrap gap-2">
{[
  ["GE Frame 5", "/platforms/ge-frame-5"],
  ["GE Frame 6 / 6FA", "/platforms/ge-frame-6"],
  ["GE Frame 7 / 9", "/platforms/ge-frame-7"],
  ["GE LM2500", "/platforms/ge-lm2500"],
  ["GE LM6000", "/platforms/ge-lm6000"],
  ["Alstom GT26", "/platforms/alstom-gt26"],
  ["Siemens SGT-700/800", "/platforms/siemens-sgt-700-800"],
  ["Bently Nevada 3300/3500", "/platforms/bently-nevada-3300-3500"],
].map(([label, href]) => (
  <a key={href} href={href} className="rounded-full border border-[#d5dfe8] px-3 py-1 text-xs font-semibold text-[#40576b] transition hover:border-[#e8a928] hover:text-[#09233b]">
    {label}
  </a>
))}
<a href="/platforms" className="rounded-full bg-[#062a43] px-3 py-1 text-xs font-bold text-white">
  All platforms →
</a>
</div>
</div>
</div>
</div>
<div className="col-lg-6 w-full lg:w-1/2">
<div className="about-media">
<span className="about-media-glow" aria-hidden="true"></span>
<div className="about-media-main">
<img src="/assets/img/lm-5000-turbine.webp" alt="Gas turbine matched to frame and stage" />
</div>
<div className="about-media-tag">
<i className="fa-solid fa-circle-check"></i> Specification confirmed before quote
                        </div>
<div className="about-media-card">
<span className="amc-ico"><i className="fa-solid fa-gears"></i></span>
<div>
<span className="amc-num">OEM</span>
<span className="amc-txt">Frame & stage confirmed</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
      </div>
      
    </>
  );
}
