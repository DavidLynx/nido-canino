import type { Metadata } from "next";
import { LegacyRoute } from "@/components/legacy-route";

export const metadata: Metadata = {
  title: "Mascotas",
  robots: { index: false, follow: false },
};

export default function PetsPage() {
  return <LegacyRoute source="pets.html" />;
}
