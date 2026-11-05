"use client";

import React from "react";

export default function CTABanner() {
  
  return (
    <>
      <div className="home-page w-full">
<section className="cta-banner reveal">
<div className="container mx-auto w-full px-3">
<div className="cta-inner">
<div className="cta-copy">
<span className="cta-eyebrow"><i className="fa-solid fa-industry"></i> Send us your requirement</span>
<h2>Need a Gas Turbine Part? Send Us Your Requirement.</h2>
<p>Tell us what your turbine needs. Share a part number, drawing or frame and stage, and our team
                        will respond with a clear, detailed quote.</p>
</div>
<div className="cta-actions">
<a href="contact.html">
<button className="primary-btn" type="button">Request a Quote</button>
</a>
<a className="cta-call" href="mailto:sale@agoaviation.com"><i className="fa-solid fa-envelope"></i> sale@agoaviation.com</a>
<a className="cta-call" href="tel:+917011123269"><i className="fa-solid fa-phone"></i> +91 7011123269</a>
</div>
</div>
</div>
</section>
      </div>
      
    </>
  );
}
