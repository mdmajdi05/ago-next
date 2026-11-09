"use client";

import React from "react";

export default function MaterialsSection() {
  
  return (
    <>
      <div className="home-page w-full">
<div className="about-sec reveal" id="materials">
<div className="container mx-auto w-full px-3">
<div className="row align-items-center g-5 flex flex-wrap items-center gap-5">
<div className="col-lg-6 order-lg-1 w-full lg:w-1/2">
<div className="about-media">
<span className="about-media-glow" aria-hidden="true"></span>
<div className="about-media-main">
<img src="/assets/img/cfm-56-turbine.webp" alt="Hot section turbine components in demanding materials" />
</div>
<div className="about-media-tag">
<i className="fa-solid fa-temperature-high"></i> Built for hot section conditions
                        </div>
<div className="about-media-card">
<span className="amc-ico"><i className="fa-solid fa-ruler-combined"></i></span>
<div>
<span className="amc-num">SPEC</span>
<span className="amc-txt">Tight tolerances, stated on the quote</span>
</div>
</div>
</div>
</div>
<div className="col-lg-6 order-lg-2 w-full lg:w-1/2">
<div className="about-title">
<span className="about-eyebrow">Materials & Tolerances</span>
<h2>Built for Demanding Materials and Tight Tolerances</h2>
<p className="mb-4">
                            Hot section components are typically made from nickel and cobalt-based superalloys and
                            heat-resistant stainless steels. These materials are chosen because they hold their
                            strength at high temperature, but they are also difficult to machine. Cutting forces, tool
                            wear and heat build-up all make precision harder to achieve.
                        </p>
<p className="mb-4">
                            That is why material grade, heat treatment and final dimensions matter as much as the part
                            drawing itself. On every quote we state the material and the key specifications, so your
                            engineers can review them before an order is placed. If something does not match your
                            requirement, you can catch it at the quote stage rather than at installation.
                        </p>
<ul className="about-points">
<li>
<span className="ap-ico"><i className="fa-solid fa-atom"></i></span>
<div>
<strong>Superalloys</strong>
<small>Nickel and cobalt-based grades</small>
</div>
</li>
<li>
<span className="ap-ico"><i className="fa-solid fa-shield-halved"></i></span>
<div>
<strong>Heat-Resistant Steels</strong>
<small>Stainless steels for hot sections</small>
</div>
</li>
<li>
<span className="ap-ico"><i className="fa-solid fa-fire-flame-curved"></i></span>
<div>
<strong>Heat Treatment</strong>
<small>Stated on every quote</small>
</div>
</li>
<li>
<span className="ap-ico"><i className="fa-solid fa-ruler-combined"></i></span>
<div>
<strong>Final Dimensions</strong>
<small>Checked against your drawing</small>
</div>
</li>
</ul>
<div className="about-btn">
<a href="/contact">
<button className="primary-btn">Request a Quote</button>
</a>
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
