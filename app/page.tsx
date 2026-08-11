import type { Metadata } from "next";

import { HeroCarousel } from "@/components/home/hero-carousel";
import { HomeSocialHub } from "@/components/home-social-hub";
import { LegacyRoute } from "@/components/legacy-route";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Guardería canina en Bogotá | Cuidado canino premium y cuidado felino a domicilio | Nido Canino",
  },
  description:
    "Guardería canina en Bogotá con grupos pequeños, convivencia estructurada y bienestar real. Nido Canino también ofrece cuidado felino a domicilio en Bogotá. Cupos limitados.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Guardería canina en Bogotá | Nido Canino",
    description:
      "Cuidado canino premium con grupos pequeños, convivencia estructurada y cuidado felino a domicilio en Bogotá.",
    url: siteConfig.url,
  },
  other: {
    "geo.region": "CO-DC",
    "geo.placename": "Bogotá",
    "geo.position": "4.7110;-74.0721",
    ICBM: "4.7110, -74.0721",
  },
};

export default function HomePage() {
  return (
    <>
      <LegacyRoute source="index.html" />
      <HeroCarousel />
      <HomeSocialHub />
    </>
  );
}
