import type { Metadata } from "next";
import { LegacyRoute } from "@/components/legacy-route";

export const metadata: Metadata = {
  title: "Servicios",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <LegacyRoute source="services.html" />;
}
