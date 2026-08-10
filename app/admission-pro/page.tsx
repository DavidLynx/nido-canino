import type { Metadata } from "next";
import { LegacyRoute } from "@/components/legacy-route";

export const metadata: Metadata = {
  title: "Formulario PRO de Admisión",
  robots: { index: false, follow: true },
  alternates: { canonical: "/admission-pro" },
};

export default function AdmissionPage() {
  return <LegacyRoute source="admission-pro.html" />;
}
