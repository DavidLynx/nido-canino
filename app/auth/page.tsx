import type { Metadata } from "next";
import { LegacyRoute } from "@/components/legacy-route";

export const metadata: Metadata = {
  title: "Ingresar",
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return <LegacyRoute source="auth.html" />;
}
