"use client";
import React, { useState } from "react";

export default function FAQSection() {
  const [openItem,setOpenItem]=useState("collapseOne");
  return (
    <>
      <div className="home-page w-full">
<div className="faq-sectoin reveal" id="faq">
<div className="container mx-auto w-full px-3">
<div className="row d-flex justify-content-center flex flex-wrap justify-center">
<div className="col-12 w-full">
<div className="product-title text-center">
<h3>information</h3>
<h2>Frequently Asked Questions</h2>
</div>
</div>
<div className="col-10 w-full lg:w-10/12">
<div className="accordion" id="accordionExample">
<div className="accordion-item">
<h2 className="accordion-header">
<button className={`accordion-button ${openItem === "collapseOne" ? "" : "collapsed"}`} type="button" onClick={() => setOpenItem((current) => current === "collapseOne" ? "" : "collapseOne")} aria-expanded={openItem === "collapseOne"} aria-controls="collapseOne">
                                    What are the main parts of a gas turbine?
                                </button>
</h2>
<div id="collapseOne" className={`accordion-collapse collapse ${openItem === "collapseOne" ? "show" : ""}`}>
<div className="accordion-body">
                                    A gas turbine has three main sections: the compressor, the combustor and the turbine.
                                    The compressor raises air pressure, the combustor burns fuel with that air, and the
                                    turbine extracts energy from the hot gas to drive a generator or machine. Shrouds,
                                    buckets, nozzles and combustion liners wear fastest.
                                </div>
</div>
</div>
<div className="accordion-item">
<h2 className="accordion-header">
<button className={`accordion-button ${openItem === "collapseTwo" ? "" : "collapsed"}`} type="button" onClick={() => setOpenItem((current) => current === "collapseTwo" ? "" : "collapseTwo")} aria-expanded={openItem === "collapseTwo"} aria-controls="collapseTwo">
                                    What are gas turbine blades made of?
                                </button>
</h2>
<div id="collapseTwo" className={`accordion-collapse collapse ${openItem === "collapseTwo" ? "show" : ""}`}>
<div className="accordion-body">
                                    Turbine blades in the hot section are usually made from nickel or cobalt based
                                    superalloys, often with protective coatings, because they must hold strength at
                                    very high temperatures. Compressor blades typically use steel or titanium alloys,
                                    which handle lower temperatures.
                                </div>
</div>
</div>
<div className="accordion-item">
<h2 className="accordion-header">
<button className={`accordion-button ${openItem === "collapseThree" ? "" : "collapsed"}`} type="button" onClick={() => setOpenItem((current) => current === "collapseThree" ? "" : "collapseThree")} aria-expanded={openItem === "collapseThree"} aria-controls="collapseThree">
                                    What is the hot gas path in a gas turbine?
                                </button>
</h2>
<div id="collapseThree" className={`accordion-collapse collapse ${openItem === "collapseThree" ? "show" : ""}`}>
<div className="accordion-body">
                                    The hot gas path is the route combustion gas takes from the combustor through the
                                    turbine nozzles, buckets and shrouds. These parts face the highest temperatures and
                                    stresses, so they are inspected closely and are usually the first to need
                                    replacement.
                                </div>
</div>
</div>
<div className="accordion-item">
<h2 className="accordion-header">
<button className={`accordion-button ${openItem === "collapsefour" ? "" : "collapsed"}`} type="button" onClick={() => setOpenItem((current) => current === "collapsefour" ? "" : "collapsefour")} aria-expanded={openItem === "collapsefour"} aria-controls="collapsefour">
                                    How often should gas turbine parts be replaced?
                                </button>
</h2>
<div id="collapsefour" className={`accordion-collapse collapse ${openItem === "collapsefour" ? "show" : ""}`}>
<div className="accordion-body">
                                    There is no single interval. It depends on your OEM's inspection schedule, running
                                    hours, number of starts, fuel type and operating conditions. Follow your OEM's
                                    maintenance guidance and inspection findings, and send us your part details early
                                    so spares are ready before an outage.
                                </div>
</div>
</div>
<div className="accordion-item">
<h2 className="accordion-header">
<button className={`accordion-button ${openItem === "collapsefive" ? "" : "collapsed"}`} type="button" onClick={() => setOpenItem((current) => current === "collapsefive" ? "" : "collapsefive")} aria-expanded={openItem === "collapsefive"} aria-controls="collapsefive">
                                    What causes gas turbine blade damage?
                                </button>
</h2>
<div id="collapsefive" className={`accordion-collapse collapse ${openItem === "collapsefive" ? "show" : ""}`}>
<div className="accordion-body">
                                    Common causes are high temperature oxidation and creep, thermal fatigue from starts
                                    and stops, erosion and corrosion from contaminants, foreign object damage and
                                    vibration. Regular borescope and outage inspections help catch damage before it
                                    forces an unplanned shutdown.
                                </div>
</div>
</div>
<div className="accordion-item">
<h2 className="accordion-header">
<button className={`accordion-button ${openItem === "collapsesix" ? "" : "collapsed"}`} type="button" onClick={() => setOpenItem((current) => current === "collapsesix" ? "" : "collapsesix")} aria-expanded={openItem === "collapsesix"} aria-controls="collapsesix">
                                    What is the difference between OEM and aftermarket gas turbine parts?
                                </button>
</h2>
<div id="collapsesix" className={`accordion-collapse collapse ${openItem === "collapsesix" ? "show" : ""}`}>
<div className="accordion-body">
                                    OEM parts come from the turbine's original manufacturer. Aftermarket parts come
                                    from independent suppliers working to a drawing or specification. Quality depends
                                    on the supplier's material control, inspection and documentation, so ask to see all
                                    three before you order.
                                </div>
</div>
</div>
<div className="accordion-item">
<h2 className="accordion-header">
<button className={`accordion-button ${openItem === "collapseseven" ? "" : "collapsed"}`} type="button" onClick={() => setOpenItem((current) => current === "collapseseven" ? "" : "collapseseven")} aria-expanded={openItem === "collapseseven"} aria-controls="collapseseven">
                                    Is Ago Aviation a gas turbine parts manufacturer and supplier?
                                </button>
</h2>
<div id="collapseseven" className={`accordion-collapse collapse ${openItem === "collapseseven" ? "show" : ""}`}>
<div className="accordion-body">
                                    Yes. Ago Aviation is a gas turbine parts manufacturer and supplier. Depending on the
                                    part, we manufacture to your drawing or specification or supply it through our
                                    sourcing network, and we confirm the specification with you before you order.
                                </div>
</div>
</div>
<div className="accordion-item">
<h2 className="accordion-header">
<button className={`accordion-button ${openItem === "collapseeight" ? "" : "collapsed"}`} type="button" onClick={() => setOpenItem((current) => current === "collapseeight" ? "" : "collapseeight")} aria-expanded={openItem === "collapseeight"} aria-controls="collapseeight">
                                    How do I order the right gas turbine part from Ago Aviation?
                                </button>
</h2>
<div id="collapseeight" className={`accordion-collapse collapse ${openItem === "collapseeight" ? "show" : ""}`}>
<div className="accordion-body">
                                    Send the OEM, turbine model, frame and stage, plus any part number or drawing and
                                    the quantity you need. We confirm the details, tell you whether we can supply the
                                    part, and send a quote. The more detail you share, the faster we can respond.
                                </div>
</div>
</div>
<div className="accordion-item">
<h2 className="accordion-header">
<button className={`accordion-button ${openItem === "collapsenine" ? "" : "collapsed"}`} type="button" onClick={() => setOpenItem((current) => current === "collapsenine" ? "" : "collapsenine")} aria-expanded={openItem === "collapsenine"} aria-controls="collapsenine">
                                    Does Ago Aviation ship gas turbine parts worldwide?
                                </button>
</h2>
<div id="collapsenine" className={`accordion-collapse collapse ${openItem === "collapsenine" ? "show" : ""}`}>
<div className="accordion-body">
                                    Yes. We supply customers worldwide and prepare shipments for international transit,
                                    including protective packaging and export documentation.
                                </div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
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

/* base styles (Bootstrap accordion, trimmed to what this section uses) */
/* neutralise Tailwind's .collapse { visibility: collapse } utility inside the accordion */
.accordion .collapse { visibility: visible; }
.collapse:not(.show) { display: none; }
.accordion-button {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem 1.25rem;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    background-color: #fff;
    border: 0;
    border-radius: 0;
    overflow-anchor: none;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, border-radius .15s ease;
}
.accordion-button:not(.collapsed) {
    color: #052c65;
    background-color: #cfe2ff;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .125);
}
.accordion-button::after {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    margin-left: auto;
    content: "";
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23212529' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M2 5L8 11L14 5'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-size: 1.25rem;
    transition: transform .2s ease-in-out;
}
.accordion-button:not(.collapsed)::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M2 5L8 11L14 5'/%3e%3c/svg%3e");
    transform: rotate(-180deg);
}
.accordion-button:hover { z-index: 2; }
.accordion-button:focus { z-index: 3; outline: 0; box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25); }
.accordion-header { margin-bottom: 0; }
.accordion-item { color: #212529; background-color: #fff; border: 1px solid rgba(0, 0, 0, .125); }
.accordion-item:first-of-type { border-top-left-radius: .375rem; border-top-right-radius: .375rem; }
.accordion-item:not(:first-of-type) { border-top: 0; }
.accordion-item:last-of-type { border-bottom-right-radius: .375rem; border-bottom-left-radius: .375rem; }
.accordion-body { padding: 1rem 1.25rem; }

.home-page .faq-sectoin {
    padding: 90px 0;
    background: #f3f7fb;
}

.home-page .faq-sectoin .accordion-item {
    border-color: rgba(11, 59, 102, .1);
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(13, 38, 64, .045);
}

.home-page .faq-sectoin .accordion-button {
    color: #193750;
    font-size: 15px;
}

.home-page .faq-sectoin .accordion-button:not(.collapsed) {
    color: #fff;
    background: #0b3b66;
}

.home-page .faq-sectoin .accordion-body {
    color: #607287;
    font-size: 14px;
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
.home-page .faq-sectoin .row > .col-10 {
        width: 100%;
    }
.home-page .faq-sectoin .accordion-button {
        padding: 17px 16px;
        font-size: 13px;
    }
.home-page .faq-sectoin .accordion-body {
        padding: 15px 16px 18px;
    }
}
      `}</style>
    </>
  );
}