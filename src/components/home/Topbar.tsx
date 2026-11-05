"use client";

import React from "react";

export default function Topbar() {
  
  return (
    <>
      <div className="home-page w-full">
<div id="ago-site-topbar" className="top-band ago-chrome-topbar">
<div className="container mx-auto w-full px-3">
<div className="row flex flex-wrap">
<div className="col-md-6 w-full md:w-1/2">
<div className="top-contact-link">
<ul>
<li>
<a href="mailto:sale@agoaviation.com">
<i className="fa-solid fa-envelope"></i>
                                    Mail - sale@agoaviation.com</a>
</li>
<li>
<a href="tel:+91 7011123269">
<i className="fa-solid fa-phone"></i>
                                    +91 7011123269</a>
</li>
</ul>
</div>
</div>
<div className="col-md-6 align-self-center w-full md:w-1/2 self-center">
<div className="top-social-icon">
<ul>
<li>
                                Follow Us:
                            </li>
<li>
<a href="https://www.facebook.com/profile.php?id=61575802176032">
<i className="fa-brands fa-facebook-f"></i>
</a>
</li>
<li>
<a href="https://x.com/agoaviation">
<i className="fa-brands fa-x-twitter"></i>
</a>
</li>
<li>
<a href="https://www.linkedin.com/in/agoaviation-pvtltd-15b997363/">
<i className="fa-brands fa-linkedin-in"></i>
</a>
</li>
<li>
<a href="https://www.instagram.com/agoaviation1/">
<i className="fa-brands fa-instagram"></i>
</a>
</li>
<li>
<a href="https://www.pinterest.com/agoaviation/">
<i className="fa-brands fa-pinterest-p"></i>
</a>
</li>
</ul>
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

#ago-site-topbar {
    position: relative;
    z-index: 21;
    overflow: hidden;
    padding: 5px 0;
    background: #071a2d;
    border-bottom: 1px solid rgba(255, 255, 255, .09);
}

#ago-site-topbar::after {
    background: linear-gradient(90deg, transparent, rgba(240, 168, 67, .12), transparent);
}

#ago-site-topbar .container,
#ago-site-header .container {
    max-width: 1380px;
}

#ago-site-topbar .row {
    min-height: 34px;
    align-items: center;
    gap: 0;
}

#ago-site-topbar .top-contact-link ul {
    gap: 24px;
}

#ago-site-topbar .top-contact-link ul li a {
    color: rgba(255, 255, 255, .82);
    font-size: 12px;
    letter-spacing: .15px;
}

#ago-site-topbar .top-contact-link ul li a i {
    color: var(--secondary-color);
}

#ago-site-topbar .top-social-icon ul {
    gap: 7px;
}

#ago-site-topbar .top-social-icon ul li:first-child {
    margin-right: 5px;
    font-size: 11px;
    letter-spacing: .7px;
    text-transform: uppercase;
}

#ago-site-topbar .top-social-icon ul li a {
    width: 27px;
    height: 27px;
    border: 1px solid rgba(255, 255, 255, .13);
    background: rgba(255, 255, 255, .07);
    color: rgba(255, 255, 255, .86);
}

#ago-site-topbar .top-social-icon ul li a:hover {
    color: #071a2d;
    background: var(--secondary-color);
    border-color: var(--secondary-color);
}

@media (max-width: 767px) {
#ago-site-topbar {
        padding: 7px 0;
    }
#ago-site-topbar .row {
        gap: 5px;
        padding: 0;
    }
#ago-site-topbar .row > div {
        width: 100%;
        text-align: center;
    }
#ago-site-topbar .top-contact-link ul {
        justify-content: center;
        flex-wrap: wrap;
        gap: 5px 14px;
    }
#ago-site-topbar .top-contact-link ul li {
        margin: 0;
    }
#ago-site-topbar .top-contact-link ul li a {
        font-size: 10px;
    }
#ago-site-topbar .top-social-icon {
        display: none;
    }
}
      `}</style>
    </>
  );
}
