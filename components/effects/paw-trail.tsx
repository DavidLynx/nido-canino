"use client";

import { useEffect, useRef } from "react";

const PAW_COUNT = 8;
const MIN_DISTANCE = 34;
const MIN_INTERVAL = 92;

export function PawTrail() {
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    const prints = Array.from(
      trailRef.current?.querySelectorAll<HTMLElement>(".paw-trail__print") ?? [],
    );
    if (!prints.length) return;

    let frame = 0;
    let latestEvent: PointerEvent | null = null;
    let lastX = -100;
    let lastY = -100;
    let lastTime = 0;
    let printIndex = 0;
    let side = 1;

    const paint = () => {
      frame = 0;
      if (!latestEvent) return;

      const { clientX, clientY } = latestEvent;
      const now = performance.now();
      const deltaX = clientX - lastX;
      const deltaY = clientY - lastY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < MIN_DISTANCE || now - lastTime < MIN_INTERVAL) return;

      const angle = Math.atan2(deltaY, deltaX);
      const perpendicularX = Math.cos(angle + Math.PI / 2) * 7 * side;
      const perpendicularY = Math.sin(angle + Math.PI / 2) * 7 * side;
      const print = prints[printIndex];

      print.style.setProperty("--paw-x", `${clientX + perpendicularX}px`);
      print.style.setProperty("--paw-y", `${clientY + perpendicularY}px`);
      print.style.setProperty("--paw-rotation", `${(angle * 180) / Math.PI + 90}deg`);
      print.classList.remove("is-active");
      void print.offsetWidth;
      print.classList.add("is-active");

      printIndex = (printIndex + 1) % prints.length;
      side *= -1;
      lastX = clientX;
      lastY = clientY;
      lastTime = now;
    };

    const onPointerMove = (event: PointerEvent) => {
      latestEvent = event;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="paw-trail" ref={trailRef} aria-hidden="true">
      {Array.from({ length: PAW_COUNT }, (_, index) => (
        <span className="nido-paw paw-trail__print" key={index}>
          <span className="nido-paw__toe is-one" />
          <span className="nido-paw__toe is-two" />
          <span className="nido-paw__toe is-three" />
          <span className="nido-paw__toe is-four" />
          <span className="nido-paw__pad" />
        </span>
      ))}
    </div>
  );
}
