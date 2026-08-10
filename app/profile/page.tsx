import type { Metadata } from "next";
import { LegacyRoute } from "@/components/legacy-route";

export const metadata: Metadata = {
  title: "Mi perfil",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return <LegacyRoute source="profile.html" />;
}
