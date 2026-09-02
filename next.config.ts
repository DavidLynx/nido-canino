import type { NextConfig } from "next";

const legacyRedirects = [
  ["/index.html", "/"],
  ["/services.html", "/services"],
  ["/admission-pro.html", "/admission-pro"],
  ["/blog.html", "/blog"],
  ["/gallery.html", "/gallery"],
  ["/resources.html", "/resources"],
  ["/auth.html", "/auth"],
  ["/pets.html", "/pets"],
  ["/profile.html", "/profile"],
  ["/request.html", "/request"],
  ["/requests.html", "/requests"],
  ["/hola/index.html", "/hola"],
] as const;

const nextConfig: NextConfig = {
  // Invitation URLs must not appear in Next's development request logs either.
  logging: { incomingRequests: { ignore: [/^\/(?:api\/)?admission-pro(?:\.html)?(?:[/?]|$)/] } },
  async headers() {
    return ["/admission-pro", "/admission-pro.html", "/api/admission-pro/:path*"].map(source => ({ source, headers: [
      { key: "Cache-Control", value: "no-store" },
      { key: "Referrer-Policy", value: "no-referrer" },
      { key: "X-Robots-Tag", value: "noindex" },
    ] }));
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
