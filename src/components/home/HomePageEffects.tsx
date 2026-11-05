"use client";

import { useEffect } from "react";

export default function HomePageEffects() {
  useEffect(() => {
    const bodyAlreadyHadHomeClass = document.body.classList.contains("home-page");
    document.body.classList.add("home-page");
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // Dismiss the non-blocking page splash.
    const splash = document.getElementById("pageSplash");
    let splashTimer: number | undefined;
    const hideSplash = () => {
      if (!splash || splash.classList.contains("is-hidden")) return;
      splash.classList.add("is-hidden");
      window.setTimeout(() => splash.remove(), 480);
    };
    if (splash) {
      splashTimer = window.setTimeout(hideSplash, 600);
      window.addEventListener("load", hideSplash, { once: true });
    }

    // Scroll reveal.
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let revealObserver: IntersectionObserver | undefined;
    if (revealElements.length && "IntersectionObserver" in window && !reduceMotion) {
      document.body.classList.add("has-js");
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
      revealElements.forEach((element) => revealObserver?.observe(element));
    } else {
      revealElements.forEach((element) => element.classList.add("in"));
    }

    // Animated statistic counters.
    const counters = Array.from(document.querySelectorAll<HTMLElement>(".stat-num[data-count]"));
    const runCounter = (element: HTMLElement) => {
      if (element.dataset.done) return;
      element.dataset.done = "1";
      const target = Number.parseFloat(element.dataset.count ?? "0") || 0;
      const suffix = element.dataset.suffix ?? "";
      if (reduceMotion) {
        element.textContent = target.toLocaleString() + suffix;
        return;
      }
      const duration = 1400;
      let start: number | null = null;
      const step = (timestamp: number) => {
        if (start === null) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(target * eased).toLocaleString() + suffix;
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };
    let counterObserver: IntersectionObserver | undefined;
    if (counters.length && "IntersectionObserver" in window) {
      counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target as HTMLElement);
            counterObserver?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach((counter) => counterObserver?.observe(counter));
    } else {
      counters.forEach(runCounter);
    }

    // Hero slider logic (the supplied homepage currently contains one slide).
    const hero = document.getElementById("heroSlider");
    const slides = hero ? Array.from(hero.querySelectorAll<HTMLElement>(".hero-slide-copy")) : [];
    const layers = hero ? Array.from(hero.querySelectorAll<HTMLElement>(".hero-bg-layer")) : [];
    const dots = hero ? Array.from(hero.querySelectorAll<HTMLElement>(".hero-dot")) : [];
    let heroIndex = 0;
    let heroTimer: number | undefined;
    const stopHero = () => {
      if (heroTimer) window.clearInterval(heroTimer);
      heroTimer = undefined;
    };
    const goHero = (index: number) => {
      if (!slides.length) return;
      heroIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === heroIndex));
      layers.forEach((layer, i) => layer.classList.toggle("is-active", i === heroIndex));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === heroIndex));
    };
    const startHero = () => {
      if (reduceMotion || slides.length < 2) return;
      stopHero();
      heroTimer = window.setInterval(() => goHero(heroIndex + 1), 6500);
    };
    const onVisibility = () => document.hidden ? stopHero() : startHero();
    hero?.addEventListener("mouseenter", stopHero);
    hero?.addEventListener("mouseleave", startHero);
    hero?.addEventListener("focusin", stopHero);
    hero?.addEventListener("focusout", startHero);
    dots.forEach((dot, index) => dot.addEventListener("click", () => {
      stopHero();
      goHero(index);
      startHero();
    }));
    document.addEventListener("visibilitychange", onVisibility);
    startHero();

    return () => {
      if (splashTimer) window.clearTimeout(splashTimer);
      revealObserver?.disconnect();
      counterObserver?.disconnect();
      stopHero();
      hero?.removeEventListener("mouseenter", stopHero);
      hero?.removeEventListener("mouseleave", startHero);
      hero?.removeEventListener("focusin", stopHero);
      hero?.removeEventListener("focusout", startHero);
      document.removeEventListener("visibilitychange", onVisibility);
      document.body.classList.remove("has-js");
      if (!bodyAlreadyHadHomeClass) document.body.classList.remove("home-page");
    };
  }, []);

  return null;
}
