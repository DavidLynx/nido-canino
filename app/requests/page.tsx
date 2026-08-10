import type { Metadata } from "next";
import { LegacyRoute } from "@/components/legacy-route";

export const metadata: Metadata = {
  title: "Solicitudes",
  robots: { index: false, follow: false },
};

export default function RequestsPage() {
  return <LegacyRoute source="requests.html" />;
}
