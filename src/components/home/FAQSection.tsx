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
      
    </>
  );
}