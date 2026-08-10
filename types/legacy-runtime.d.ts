import type * as Supabase from "@supabase/supabase-js";

declare global {
  interface Window {
    supabase?: typeof Supabase;
    jspdf?: { jsPDF: typeof import("jspdf").jsPDF };
    NIDO_CONFIG?: {
      supabaseUrl: string;
      supabaseAnonKey: string;
      authRedirectPath: string;
      postLoginPath: string;
      protectedPaths: string[];
    };
    NidoAuth?: Record<string, (...args: never[]) => unknown>;
    NidoGuards?: Record<string, (...args: never[]) => unknown>;
    NidoProfilePage?: Record<string, (...args: never[]) => unknown>;
    NidoPetsPage?: Record<string, (...args: never[]) => unknown>;
    NidoRequestsPage?: Record<string, (...args: never[]) => unknown>;
    NidoGalleryPage?: Record<string, (...args: never[]) => unknown>;
    Utils?: Record<string, (...args: never[]) => unknown>;
    __NIDO_LEGACY_READY?: boolean;
  }
}

export {};
