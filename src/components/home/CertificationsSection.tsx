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
      
    </>
  );
}
