"use client";
import React, { useState } from "react";

export default function SiteHeader() {
  const [menuOpen,setMenuOpen]=useState(false);
  return (
    <>
      <div className="home-page w-full">
<div id="ago-site-header" className="main-header ago-chrome-header">
<div className="container mx-auto w-full px-3">
<div className="row flex flex-wrap">
<div className="col-lg-3 col-md-3 col-sm-6 col-6 w-full lg:w-1/4 md:w-1/4 sm:w-1/2 w-1/2">
<div className="header-logo">
<div className="logo">
<a href="/">
<img src="/assets/img/LOGO.png" alt="LOGO" />
</a>
</div>
</div>
</div>
<div className="col-lg-6 col-md-9 col-sm-6 col-6 w-full lg:w-1/2 md:w-9/12 sm:w-1/2 w-1/2">
<div className="header-menu">
<button className="toogle-btn" type="button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} aria-controls="ago-site-navigation">
<i className="fa-solid fa-bars" aria-hidden="true"></i>
<i className="fa-solid fa-xmark" aria-hidden="true"></i>
</button>
<nav className={`menu ${menuOpen ? "is-open" : ""}`} id="ago-site-navigation" aria-label="Primary">
<ul>
<li><a href="/">Home</a></li>
<li><a href="/products">Products</a></li>
<li><a href="/brands">Brands</a></li>
<li><a href="/products">Stock</a></li>
<li><a href="/categories/turbine-parts">Turbine Parts</a></li>
<li><a href="/about">About Us</a></li>
<li><a href="/blog">Blog</a></li>
<li><a href="/contact">Contact</a></li>
</ul>
</nav>
</div>
</div>
<div className="col-lg-3 col-md d-none d-lg-block w-full lg:w-1/4 hidden lg:block">
<div className="header-search">
<div className="search-bar">
<form className="search-form" action="/products" method="get" role="search">
<input type="search" placeholder="Search here" name="search" className="search-input" aria-label="Search spare parts" />
<button type="submit" className="search-btn" aria-label="Search">
<i className="fa-solid fa-magnifying-glass"></i>
</button>
</form>
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

#ago-site-topbar .container,
#ago-site-header .container {
    max-width: 1380px;
}

#ago-site-header {
    position: sticky;
    top: 10px;
    z-index: 1000;
    width: min(1440px, calc(100% - 40px));
    margin: 12px auto;
    overflow: visible !important;
    border: 1px solid rgba(11, 59, 102, .09);
    border-radius: 22px;
    background: rgba(255, 255, 255, .94);
    box-shadow: 0 10px 34px rgba(13, 38, 64, .11);
    -webkit-backdrop-filter: blur(18px) saturate(160%);
    backdrop-filter: blur(18px) saturate(160%);
    transition: box-shadow .25s ease, background .25s ease, border-color .25s ease;
}

#ago-site-header.scrolled {
    background: rgba(255, 255, 255, .98);
    border-color: rgba(11, 59, 102, .14);
    box-shadow: 0 15px 42px rgba(13, 38, 64, .16);
}

#ago-site-header .row {
    min-height: 76px;
    align-items: center;
}

#ago-site-header .header-logo .logo a img {
    display: block;
    width: auto;
    height: 54px;
    object-fit: contain;
    filter: none;
}

#ago-site-header .menu > ul {
    align-items: center;
    gap: 2px;
}

#ago-site-header .menu > ul > li {
    margin: 0 1px;
}

#ago-site-header .menu > ul > li > a {
    min-height: 48px;
    height: auto;
    padding: 0 13px;
    border-radius: 12px;
    color: #334a62;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: .55px;
    transition: color .2s ease, background .2s ease;
}

#ago-site-header .menu > ul > li > a::after {
    display: none;
}

#ago-site-header .menu > ul > li:hover > a,
#ago-site-header .menu > ul > li.active > a {
    color: var(--primary-color);
    background: #eef4f9;
}

#ago-site-header .search-form {
    min-width: 0;
    width: min(100%, 280px);
    border: 1px solid rgba(11, 59, 102, .12);
    background: #f5f8fb;
}

.home-page input.search-input {
    height: 42px;
    border: 0;
    background: transparent;
    font-size: 12px;
}

.home-page input.search-input:focus {
    box-shadow: none;
    outline: 0;
}

#ago-site-header .search-btn {
    width: 34px;
    height: 34px;
    right: 6px;
    color: #fff;
    background: var(--primary-color);
}

#ago-site-header .search-btn:hover {
    background: #174f7e;
    box-shadow: 0 6px 16px rgba(11, 59, 102, .22);
}

#ago-site-header .toogle-btn {
    border: 0;
    box-shadow: 0 6px 15px rgba(11, 59, 102, .2);
}

@media (max-width: 1199px) {
#ago-site-header {
        width: calc(100% - 28px);
    }
#ago-site-header .row {
        min-height: 70px;
    }
#ago-site-header .header-logo .logo a img {
        height: 48px;
    }
#ago-site-header .menu > ul > li > a {
        min-height: 44px;
        padding: 0 9px;
        font-size: 10px;
        letter-spacing: .25px;
    }
}

@media (max-width: 1024px) {
#ago-site-header {
        top: 8px;
        width: calc(100% - 24px);
        margin: 8px auto;
    }
#ago-site-header .row {
        min-height: 64px;
    }
#ago-site-header .header-menu {
        position: static;
    }
#ago-site-header .toogle-btn {
        position: absolute;
        top: 50%;
        right: 12px;
        z-index: 10001;
        display: flex !important;
        width: 42px;
        height: 42px;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0;
        transform: translateY(-50%);
        border: 1px solid rgba(11, 59, 102, .12);
        border-radius: 12px;
        color: #fff;
        background: var(--primary-color);
        font-size: 17px;
    }
#ago-site-header .menu {
        position: absolute;
        top: calc(100% + 9px);
        right: 0;
        left: 0;
        width: auto;
        max-height: min(75vh, 620px);
        overflow-y: auto;
        padding: 12px;
        border: 1px solid rgba(11, 59, 102, .1);
        border-radius: 18px;
        background: rgba(255, 255, 255, .98);
        box-shadow: 0 24px 54px rgba(8, 31, 54, .2);
        text-align: left;
    }
#ago-site-header .menu > ul > li > a {
        min-height: 44px;
        padding: 10px 12px;
        border-radius: 10px;
        font-size: 12px;
    }
#ago-site-header .header-search {
        display: none;
    }
}

@media (max-width: 767px) {
#ago-site-header {
        border-radius: 16px;
    }
#ago-site-header .row {
        min-height: 60px;
    }
#ago-site-header .header-logo .logo a img {
        height: 43px;
    }
}

@media (max-width: 480px) {
#ago-site-header {
        width: calc(100% - 18px);
    }
#ago-site-header .header-logo .logo a img {
        height: 39px;
    }
#ago-site-header .row {
        min-height: 56px;
    }
}

#ago-site-header {
    border: 1px solid rgba(11, 59, 102, .09);
    background: rgba(255, 255, 255, .94);
    box-shadow: 0 10px 34px rgba(13, 38, 64, .11);
}

#ago-site-header.scrolled {
    border-color: rgba(11, 59, 102, .14);
    background: rgba(255, 255, 255, .98);
    box-shadow: 0 15px 42px rgba(13, 38, 64, .16);
}

#ago-site-header .container {
    max-width: 1440px;
    width: 100%;
    padding-right: 18px;
    padding-left: 18px;
}

#ago-site-header .row {
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr) 250px;
    gap: 18px;
    min-height: 68px;
    margin: 0;
}

#ago-site-header .row > div {
    width: auto;
    max-width: none;
    flex: initial;
    padding: 0;
}

#ago-site-header .header-logo .logo {
    width: fit-content;
    padding: 0;
    border-radius: 10px;
    background: transparent;
}

#ago-site-header .header-logo .logo a img {
    height: 44px;
}

#ago-site-header .menu > ul {
    flex-wrap: nowrap;
    justify-content: space-between;
    gap: 0;
}

#ago-site-header .menu > ul > li {
    flex: 0 0 auto;
    margin: 0;
}

#ago-site-header .menu > ul > li > a {
    min-height: 44px;
    padding: 0 8px;
    color: #29445c;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .25px;
    white-space: nowrap;
}

#ago-site-header .menu > ul > li:hover > a,
#ago-site-header .menu > ul > li.active > a {
    color: #0b3b66;
    background: rgba(240, 168, 67, .10);
}

#ago-site-header .menu > ul > li.active > a::after {
    display: block;
    right: 14px;
    bottom: 5px;
    left: 14px;
    height: 2px;
    background: var(--secondary-color);
    transform: scaleX(1);
}

#ago-site-header .search-form {
    border-color: rgba(11, 59, 102, .13);
    background: #f4f7fb;
}

.home-page input.search-input {
    color: #10243a;
}

#ago-site-header .search-btn,
#ago-site-header .search-btn:hover {
    color: #17191c;
    background: var(--secondary-color);
}

#ago-site-header .search-btn i {
    color: #17191c;
}

@media (max-width: 1199px) and (min-width: 1025px) {
#ago-site-header .row {
        grid-template-columns: 150px minmax(0, 1fr) 220px;
        gap: 12px;
    }
#ago-site-header .menu > ul > li > a {
        padding: 0 2px;
        font-size: 9.5px;
        letter-spacing: .1px;
    }
}

@media (max-width: 1024px) {
#ago-site-header .row {
        grid-template-columns: minmax(0, 1fr) 54px;
        min-height: 68px;
    }
#ago-site-header .header-logo .logo a img {
        height: 42px;
    }
#ago-site-header .toogle-btn {
        border: 1px solid rgba(240, 168, 67, .35);
        color: #fff;
        background: #0b3b66;
        box-shadow: none;
    }
#ago-site-header .menu {
        border: 1px solid rgba(11, 59, 102, .12);
        background: #fff;
        box-shadow: 0 24px 54px rgba(13, 38, 64, .18);
    }
#ago-site-header .menu > ul > li > a {
        color: #16324d;
    }
#ago-site-header .menu > ul > li:hover > a,
    #ago-site-header .menu > ul > li.active > a {
        color: #0b3b66;
        background: rgba(240, 168, 67, .10);
    }
}
      `}</style>
    </>
  );
}
