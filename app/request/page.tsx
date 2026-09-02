import type { Metadata } from "next";
import { RequestForm } from "@/components/request/request-form";
import { getPrivacyPolicy } from "@/lib/lynx/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Solicitar servicio",
  robots: { index: false, follow: true },
  alternates: { canonical: "/request" },
};

export default function RequestPage() {
  return <RequestForm privacyPolicy={getPrivacyPolicy()} />;
}
