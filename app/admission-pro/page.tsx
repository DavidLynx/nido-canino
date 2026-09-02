import type { Metadata } from "next";
import { AdmissionForm } from "@/components/admission-pro/admission-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Formulario de ingreso PRO",
  referrer: "no-referrer",
  robots: { index: false, follow: true },
  alternates: { canonical: "/admission-pro" },
};

export default function AdmissionPage() {
  return <AdmissionForm />;
}
