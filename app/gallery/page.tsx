import type { Metadata } from "next";
import { LegacyRoute } from "@/components/legacy-route";

export const metadata: Metadata = {
  title: "Recuerdos",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return <LegacyRoute source="gallery.html" />;
}
