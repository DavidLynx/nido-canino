import type { Metadata } from "next";
import { LegacyRoute } from "@/components/legacy-route";

export const metadata: Metadata = {
  title: "Solicitar servicio",
  robots: { index: false, follow: true },
  alternates: { canonical: "/request" },
};

export default function RequestPage() {
  return <LegacyRoute source="request.html" />;
}
