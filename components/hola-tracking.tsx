"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function HolaTracking() {
  const searchParams = useSearchParams();
  const origin = searchParams.get("origen");

  useEffect(() => {
    const pageDetail = { page: "/hola", origin: origin || null };
    document.documentElement.dataset.holaOrigin = origin || "directo";
    window.dispatchEvent(new CustomEvent("nido:hola-view", { detail: pageDetail }));

    const trackClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-hola-channel]");
      if (!target) return;

      window.dispatchEvent(new CustomEvent("nido:hola-link-click", {
        detail: {
          ...pageDetail,
          channel: target.dataset.holaChannel,
          destination: target instanceof HTMLAnchorElement ? target.href : null,
        },
      }));
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, [origin]);

  return null;
}
