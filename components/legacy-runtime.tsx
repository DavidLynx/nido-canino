"use client";

import * as Supabase from "@supabase/supabase-js";
import { jsPDF } from "jspdf";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { supabaseConfig } from "@/lib/supabase-config";

const scripts = [
  "/legacy/js/supabase-client.js",
  "/legacy/js/utils.js",
  "/legacy/js/ui.js",
  "/legacy/js/auth.js",
  "/legacy/js/guards.js",
  "/legacy/js/profile.js",
  "/legacy/js/pets.js",
  "/legacy/js/requests.js",
  "/legacy/data/gallery-data.js",
  "/legacy/js/gallery.js",
] as const;

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-nido-src="${src}"]`);
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }

    const script = existing ?? document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.nidoSrc = src;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => reject(new Error(`No se pudo cargar ${src}`)), { once: true });
    if (!existing) document.body.appendChild(script);
  });
}

export function LegacyRuntime() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    const initialize = async () => {
      window.supabase = Supabase;
      window.jspdf = { jsPDF };
      window.NIDO_CONFIG = {
        supabaseUrl: supabaseConfig.url,
        supabaseAnonKey: supabaseConfig.anonKey,
        authRedirectPath: "auth.html",
        postLoginPath: "profile.html",
        protectedPaths: ["profile", "pets", "requests", "profile.html", "pets.html", "requests.html"],
      };

      for (const script of scripts) await loadScript(script);
      window.Utils?.initTheme?.();
      await window.NidoAuth?.init?.();

      if (!active) return;
      window.__NIDO_LEGACY_READY = true;
      setReady(true);
      window.dispatchEvent(new Event("nido:legacy-ready"));
    };

    initialize().catch((error) => console.error("No se pudo iniciar la compatibilidad del sitio.", error));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const initializePage = async () => {
      await window.NidoGuards?.requireSession?.();

      if (pathname === "/auth") await window.NidoAuth?.initAuthPage?.();
      if (pathname === "/profile") await window.NidoProfilePage?.init?.();
      if (pathname === "/pets") await window.NidoPetsPage?.init?.();
      if (pathname === "/requests") await window.NidoRequestsPage?.init?.();
      if (pathname === "/gallery") window.NidoGalleryPage?.init?.();
    };

    initializePage().catch((error) => console.error("No se pudo iniciar la página.", error));
  }, [pathname, ready]);

  return null;
}
