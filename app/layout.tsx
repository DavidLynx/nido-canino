import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LegacyRuntime } from "@/components/legacy-runtime";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  icons: {
    icon: "/assets/logo/favicon.ico",
    shortcut: "/assets/logo/favicon.ico",
    apple: "/assets/logo/apple-touch-icon.png",
  },
  manifest: "/assets/logo/site.webmanifest",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: "/assets/logo/NIDO-FULL.svg", alt: "Nido Canino" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/assets/logo/NIDO-FULL.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <Header />
        {children}
        <Footer />
        <LegacyRuntime />
      </body>
    </html>
  );
}
