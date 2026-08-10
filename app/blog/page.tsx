import type { Metadata } from "next";
import { LegacyRoute } from "@/components/legacy-route";

export const metadata: Metadata = {
  title: "Blog",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <LegacyRoute source="blog.html" />;
}
