import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

const publicRoutes = ["", "/services", "/blog", "/gallery", "/resources", "/hola"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/hola" ? 0.7 : 0.8,
  }));
}
