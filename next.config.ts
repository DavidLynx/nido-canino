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
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
