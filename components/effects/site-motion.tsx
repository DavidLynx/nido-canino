"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const operationalRoutes = ["/auth", "/profile", "/pets", "/request", "/requests"];

const groupSelector = [
  ".section-grid-3",
  ".section-grid-4",
  ".hero-kpis",
  ".hero-service-grid",
  ".hero-bottom-notes",
  ".process-grid",
  ".featured-read-grid",
  ".service-mini-icons",
  ".service-pillars",
  ".pricing-highlight-grid",
  ".timeline",
].join(",");

const glowSelector = [
  ".services-hero .mini-icon-card",
  ".services-hero .hero-card",
  ".service-overview-card",
  ".service-pricing-box",
  ".pricing-highlight-card",
].join(",");

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const isOperational = operationalRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );
    if (isOperational) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main > section:not(.home-hero):not(.services-hero):not(.hola-shell), .home-social-hub",
      ),
    );

    revealElements.forEach((element) => {
      element.classList.add("nido-scroll-reveal");
      element.querySelectorAll<HTMLElement>(groupSelector).forEach((group) => {
        group.classList.add("nido-reveal-group");
      });
    });

    document.body.classList.add("nido-motion-ready");

    let observer: IntersectionObserver | null = null;
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-revealed"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            observer?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8%", threshold: 0.08 },
      );
      revealElements.forEach((element) => observer?.observe(element));
    }

    const glowCards = pathname === "/services"
      ? Array.from(document.querySelectorAll<HTMLElement>(glowSelector))
      : [];

    glowCards.forEach((card) => card.classList.add("nido-pointer-glow"));

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      const target = (event.target as Element | null)?.closest<HTMLElement>(".nido-pointer-glow");
      if (!target) return;

      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      target.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    };

    if (glowCards.length) {
      document.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    return () => {
      observer?.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      document.body.classList.remove("nido-motion-ready");
      revealElements.forEach((element) => {
        element.classList.remove("nido-scroll-reveal", "is-revealed");
        element.querySelectorAll<HTMLElement>(groupSelector).forEach((group) => {
          group.classList.remove("nido-reveal-group");
        });
      });
      glowCards.forEach((card) => {
        card.classList.remove("nido-pointer-glow");
        card.style.removeProperty("--mouse-x");
        card.style.removeProperty("--mouse-y");
      });
    };
  }, [pathname]);

  return null;
}
