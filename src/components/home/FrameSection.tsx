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
<a href="contact.html">
<button className="primary-btn">Request a Quote</button>
</a>
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
