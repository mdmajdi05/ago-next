"use client";

import React from "react";

export default function ContactSection() {
  
  return (
    <>
      <div className="home-page w-full">
<section className="contact-section reveal hpc-section" aria-labelledby="hpc-title">
<span className="hpc-orbit hpc-orbit--blue" aria-hidden="true"></span>
<span className="hpc-orbit hpc-orbit--amber" aria-hidden="true"></span>
<div className="container mx-auto w-full px-3">
<div className="hpc-shell">

<div className="hpc-form-card">
<header className="hpc-head">
<div className="hpc-head-top">
<span className="hpc-eyebrow">
<i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                                Get In Touch
                            </span>
<span className="hpc-head-badge">
<span className="hpc-head-dot" aria-hidden="true"></span>
                                Quote desk online
                            </span>
</div>
<h2 id="hpc-title">Contact Us</h2>
<p>Share your part number or requirement — our team will come back with availability,
                            lead time and pricing.</p>
</header>
<form name="cform" method="post" id="couform" data-parsley-validate="">
<div className="hpc-grid">
<div className="hpc-field">
<label className="hpc-label" htmlFor="hpc-name">Full Name</label>
<div className="hpc-control">
<i className="fa-solid fa-user" aria-hidden="true"></i>
<input type="text" className="form-control" id="hpc-name" name="name" required autoComplete="name" placeholder="Enter Your Full Name" />
</div>
</div>
<div className="hpc-field">
<label className="hpc-label" htmlFor="hpc-email">Email Address</label>
<div className="hpc-control">
<i className="fa-solid fa-envelope" aria-hidden="true"></i>
<input type="email" className="form-control" id="hpc-email" name="email" required autoComplete="email" placeholder="Enter Your Email" />
</div>
</div>
<div className="hpc-field">
<label className="hpc-label" htmlFor="hpc-mobile">Phone Number</label>
<div className="hpc-control">
<i className="fa-solid fa-phone" aria-hidden="true"></i>
<input type="text" className="form-control" id="hpc-mobile" name="mobile" required autoComplete="tel" placeholder="Enter Your Phone Number" />
</div>
</div>
<div className="hpc-field">
<label className="hpc-label" htmlFor="hpc-subject">Subject</label>
<div className="hpc-control">
<i className="fa-solid fa-tag" aria-hidden="true"></i>
<input type="text" className="form-control" id="hpc-subject" name="subject" required placeholder="Your Subject" />
</div>
</div>
<div className="hpc-field hpc-field--full hpc-field--area">
<label className="hpc-label" htmlFor="hpc-message">Message</label>
<div className="hpc-control">
<i className="fa-solid fa-message" aria-hidden="true"></i>
<textarea className="form-control" id="hpc-message" rows={4} name="message" required placeholder="Typer Your Message"></textarea>
</div>
</div>
<div className="hpc-actions">
<button type="submit" className="primary-btn" name="Submit">Submit</button>
<p className="hpc-assurance">
<i className="fa-solid fa-lock" aria-hidden="true"></i>
                                    Your details stay private and are used only to answer this enquiry.
                                </p>
</div>
</div>
</form>
</div>

<aside className="hpci-panel" aria-labelledby="hpci-title">
<span className="hpci-radar" aria-hidden="true"></span>
<div className="hpci-head">
<span className="hpci-eyebrow">
<i className="fa-solid fa-headset" aria-hidden="true"></i>
                            Contact Information
                        </span>
<h3 id="hpci-title">Direct lines to our team.</h3>
<p>Call the quote desk, visit our New Delhi office, or write to the team that looks after your
                            account.</p>
</div>
<div className="hpci-list">
<div className="hpci-card">
<span className="hpci-ico">
<i className="fa-solid fa-phone-volume" aria-hidden="true"></i>
</span>
<div className="hpci-body">
<h4>Help Line</h4>
<a className="hpci-phone" href="tel:7011123269">+91 7011123269</a>
<span className="hpci-meta">Quote desk · answered by a specialist</span>
</div>
<i className="fa-solid fa-arrow-right hpci-card-go" aria-hidden="true"></i>
</div>
<div className="hpci-card">
<span className="hpci-ico">
<i className="fa-solid fa-location-dot" aria-hidden="true"></i>
</span>
<div className="hpci-body">
<h4>Location</h4>
<address className="hpci-address">A- 24/5 3rd floor, NH - 19, Mohan Cooperative
                                    Industrial Estate, New Delhi, Delhi 110044</address>
</div>
</div>
<div className="hpci-card">
<span className="hpci-ico">
<i className="fa-solid fa-envelope-open-text" aria-hidden="true"></i>
</span>
<div className="hpci-body">
<h4>Email Address</h4>
<div className="hpci-mails">
<a className="hpci-mail" href="mailto:support@agoaviation.com">
<span>support@agoaviation.com</span>
<i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
</a>
<a className="hpci-mail" href="mailto:sale@agoaviation.com">
<span>sale@agoaviation.com</span>
<i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
</a>
<a className="hpci-mail" href="mailto:sale@agoaviation.com">
<span>sale@agoaviation.com</span>
<i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
</a>
</div>
</div>
</div>
</div>
<div className="hpci-foot">
<span className="hpci-live" aria-hidden="true"></span>
<p>Average first response <strong>under 30 minutes</strong>.</p>
</div>
</aside>
</div>
</div>
</section>
      </div>
      
    </>
  );
}
