"use client";

import { useEffect } from "react";

export function LegacyInlineScript({ code }: { code: string }) {
  useEffect(() => {
    let script: HTMLScriptElement | null = null;

    const execute = () => {
      script = document.createElement("script");
      script.dataset.nidoLegacyInline = "true";
      script.textContent = code;
      document.body.appendChild(script);
      document.dispatchEvent(new Event("DOMContentLoaded"));
    };

    if (window.__NIDO_LEGACY_READY) {
      execute();
    } else {
      window.addEventListener("nido:legacy-ready", execute, { once: true });
    }

    return () => {
      window.removeEventListener("nido:legacy-ready", execute);
      script?.remove();
    };
  }, [code]);

  return null;
}
