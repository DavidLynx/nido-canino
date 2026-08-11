import type { MetadataRoute } from "next";

import { getAllBlogEntries, getAllResourceEntries } from "@/lib/content/markdown";
import { siteConfig } from "@/lib/site";

const publicRoutes = ["", "/services", "/blog", "/gallery", "/resources", "/hola"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/hola" ? 0.7 : 0.8,
  }));
  const editorialEntries: MetadataRoute.Sitemap = [
    ...getAllBlogEntries().map((entry) => ({
      url: `${siteConfig.url}/blog/${entry.slug}`,
      lastModified: new Date(`${entry.updated}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllResourceEntries().map((entry) => ({
      url: `${siteConfig.url}/resources/${entry.slug}`,
      lastModified: new Date(`${entry.updated}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
  return [...staticEntries, ...editorialEntries];
}
