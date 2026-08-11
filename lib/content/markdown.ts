import "server-only";

import fs from "node:fs";
import path from "node:path";

import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { toString } from "mdast-util-to-string";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import { getEditorialImageLayout, type EditorialImageFit } from "./editorial-images";

export type ContentKind = "blog" | "resource";

export type ContentFrontmatter = {
  type: ContentKind;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  published: string;
  updated: string;
  cta: string;
  ctaHref: string;
  related: string[];
  sources: string[];
  format?: string;
};

export type ContentHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type EditorialImageStatus = "frontmatter" | "fallback";

export type ContentEntry = ContentFrontmatter & {
  body: string;
  fileName: string;
  headings: ContentHeading[];
  readingMinutes: number;
  taskCount: number;
  resolvedImage: string | null;
  imageStatus: EditorialImageStatus;
  imageFit: EditorialImageFit;
  imagePosition: string;
};

export type ContentSummary = Omit<
  ContentEntry,
  "body" | "fileName" | "headings" | "taskCount" | "sources" | "related" | "image"
> & {
  href: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function contentDirectory(kind: ContentKind) {
  return path.join(CONTENT_ROOT, kind === "resource" ? "resources" : "blog");
}

function requiredString(data: Record<string, unknown>, field: string, fileName: string) {
  const value = data[field];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${fileName}: el campo frontmatter \"${field}\" es obligatorio.`);
  }
  return value.trim();
}

function stringList(data: Record<string, unknown>, field: string, fileName: string, optional = false) {
  const value = data[field];
  if (optional && value === undefined) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${fileName}: el campo frontmatter \"${field}\" debe ser una lista de texto.`);
  }
  return value as string[];
}

function resolveEditorialImage(image: string) {
  const requestedFile = path.join(process.cwd(), "public", image.replace(/^\/+/, ""));
  if (fs.existsSync(requestedFile)) {
    return { resolvedImage: image, imageStatus: "frontmatter" as const };
  }

  return { resolvedImage: null, imageStatus: "fallback" as const };
}

function parseStructure(markdown: string) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);
  const slugger = new GithubSlugger();
  const headings: ContentHeading[] = [];
  let taskCount = 0;

  visit(tree, "heading", (node) => {
    const text = toString(node).trim();
    const id = slugger.slug(text);
    if ((node.depth === 2 || node.depth === 3) && text) {
      headings.push({ id, text, level: node.depth });
    }
  });

  visit(tree, "listItem", (node) => {
    if (typeof node.checked === "boolean") taskCount += 1;
  });

  const words = toString(tree).trim().split(/\s+/u).filter(Boolean).length;
  return {
    headings,
    taskCount,
    readingMinutes: Math.max(1, Math.ceil(words / 210)),
  };
}

function parseFile(kind: ContentKind, fileName: string): ContentEntry {
  const filePath = path.join(contentDirectory(kind), fileName);
  const source = fs.readFileSync(filePath, "utf8");
  const parsed = matter(source);
  const data = parsed.data as Record<string, unknown>;
  const declaredType = requiredString(data, "type", fileName);

  if (declaredType !== kind) {
    throw new Error(`${fileName}: type \"${declaredType}\" no coincide con la carpeta \"${kind}\".`);
  }

  const slug = requiredString(data, "slug", fileName);
  const image = requiredString(data, "image", fileName);
  const imageLayout = getEditorialImageLayout(image);
  const structure = parseStructure(parsed.content);

  return {
    type: kind,
    slug,
    title: requiredString(data, "title", fileName),
    excerpt: requiredString(data, "excerpt", fileName),
    category: requiredString(data, "category", fileName),
    tags: stringList(data, "tags", fileName, kind === "resource"),
    image,
    imageAlt: requiredString(data, "imageAlt", fileName),
    published: requiredString(data, "published", fileName),
    updated: requiredString(data, "updated", fileName),
    cta: requiredString(data, "cta", fileName),
    ctaHref: requiredString(data, "ctaHref", fileName),
    related: stringList(data, "related", fileName),
    sources: stringList(data, "sources", fileName),
    format: kind === "resource" ? requiredString(data, "format", fileName) : undefined,
    body: parsed.content,
    fileName,
    imageFit: imageLayout.fit,
    imagePosition: imageLayout.position,
    ...structure,
    ...resolveEditorialImage(image),
  };
}

function loadCollection(kind: ContentKind) {
  const directory = contentDirectory(kind);
  const entries = fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort((left, right) => left.localeCompare(right, "es"))
    .map((fileName) => parseFile(kind, fileName));

  const slugs = new Set<string>();
  for (const entry of entries) {
    if (slugs.has(entry.slug)) throw new Error(`Slug editorial duplicado: ${entry.slug}`);
    slugs.add(entry.slug);
  }
  return entries;
}

export function getAllBlogEntries() {
  return loadCollection("blog");
}

export function getAllResourceEntries() {
  return loadCollection("resource");
}

export function getAllContentEntries() {
  return [...getAllBlogEntries(), ...getAllResourceEntries()];
}

export function getEntryBySlug(kind: ContentKind, slug: string) {
  const collection = kind === "blog" ? getAllBlogEntries() : getAllResourceEntries();
  return collection.find((entry) => entry.slug === slug);
}

export function getRelatedEntries(entry: ContentEntry, limit = 3) {
  const index = new Map(getAllContentEntries().map((candidate) => [candidate.slug, candidate]));
  return entry.related
    .map((slug) => index.get(slug))
    .filter((candidate): candidate is ContentEntry => Boolean(candidate))
    .slice(0, limit);
}

export function getCategories(entries: ContentEntry[]) {
  return Array.from(new Set(entries.map((entry) => entry.category)));
}

export function toContentSummary(entry: ContentEntry): ContentSummary {
  const { body, fileName, headings, taskCount, sources, related, image, ...summary } = entry;
  void body;
  void fileName;
  void headings;
  void taskCount;
  void sources;
  void related;
  void image;
  return {
    ...summary,
    href: `/${entry.type === "blog" ? "blog" : "resources"}/${entry.slug}`,
  };
}

export function formatEditorialDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function hasSourcesSection(markdown: string) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);
  let found = false;
  visit(tree, "heading", (node) => {
    if (/^fuentes consultadas$/iu.test(toString(node).trim())) found = true;
  });
  return found;
}
