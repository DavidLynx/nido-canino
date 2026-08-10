import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

const routeMap: Record<string, string> = {
  "index.html": "/",
  "services.html": "/services",
  "admission-pro.html": "/admission-pro",
  "blog.html": "/blog",
  "gallery.html": "/gallery",
  "resources.html": "/resources",
  "auth.html": "/auth",
  "pets.html": "/pets",
  "profile.html": "/profile",
  "request.html": "/request",
  "requests.html": "/requests",
};

export type LegacyPageContent = {
  mainHtml: string;
  supplementalHtml: string;
  styles: string[];
  inlineScripts: string[];
};

function normalizeLegacyUrls(value: string) {
  let result = value.replaceAll('assets/', '/assets/').replaceAll('//assets/', '/assets/');

  for (const [legacyPath, cleanPath] of Object.entries(routeMap)) {
    result = result.replaceAll(`href="${legacyPath}`, `href="${cleanPath}`);
  }

  return result;
}

export function readLegacyPage(fileName: string): LegacyPageContent {
  const source = readFileSync(join(process.cwd(), "legacy-content", fileName), "utf8");
  const mainHtml = source.match(/<main\b[\s\S]*?<\/main>/i)?.[0];

  if (!mainHtml) {
    throw new Error(`No se encontró el contenido principal de ${fileName}.`);
  }

  const styles = [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(
    (match) => normalizeLegacyUrls(match[1]),
  );
  const inlineScripts = [
    ...source.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi),
  ]
    .map((match) => match[1].trim())
    .filter(Boolean)
    .map(normalizeLegacyUrls);
  const bodyHtml = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  const supplementalHtml = bodyHtml
    .replace(mainHtml, "")
    .replace(/<header\b[\s\S]*?<\/header>/i, "")
    .replace(/<footer\b[\s\S]*?<\/footer>/i, "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<!--[^]*?-->/g, "")
    .trim();

  return {
    mainHtml: normalizeLegacyUrls(mainHtml),
    supplementalHtml: normalizeLegacyUrls(supplementalHtml),
    styles,
    inlineScripts,
  };
}
