import type { Metadata } from "next";
import { LegacyRoute } from "@/components/legacy-route";

export const metadata: Metadata = {
  title: "Recursos",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return <LegacyRoute source="resources.html" />;
}
