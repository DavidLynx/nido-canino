import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContentCta } from "@/components/editorial/content-cta";
import { EditorialMedia } from "@/components/editorial/editorial-media";
import { MarkdownContent } from "@/components/editorial/markdown-content";
import { RelatedContent } from "@/components/editorial/related-content";
import { ResourceActions } from "@/components/editorial/resource-interactions";
import {
  formatEditorialDate,
  getAllResourceEntries,
  getEntryBySlug,
  getRelatedEntries,
  hasSourcesSection,
} from "@/lib/content/markdown";

type ResourcePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllResourceEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug("resource", slug);
  if (!entry) return {};
  const image = entry.resolvedImage ?? "/assets/logo/logo-full.png";
  return {
    title: entry.title,
    description: entry.excerpt,
    alternates: { canonical: `/resources/${entry.slug}` },
    openGraph: {
      type: "website",
      url: `/resources/${entry.slug}`,
      title: entry.title,
      description: entry.excerpt,
      images: [{ url: image, alt: entry.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.excerpt,
      images: [image],
    },
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const entry = getEntryBySlug("resource", slug);
  if (!entry) notFound();
  const related = getRelatedEntries(entry);

  return (
    <main className="editorial-shell resource-page">
      <article>
        <header className="resource-page-hero">
          <div className="container resource-page-hero__grid">
            <div className="resource-page-hero__copy">
              <nav className="editorial-breadcrumb" aria-label="Migas de pan">
                <Link href="/">Inicio</Link><span aria-hidden="true">/</span><Link href="/resources">Recursos</Link>
              </nav>
              <div className="resource-page-hero__meta">
                <span>{entry.format}</span><span>{entry.category}</span>
              </div>
              <h1>{entry.title}</h1>
              <p className="article-lead">{entry.excerpt}</p>
              <p className="resource-updated">Actualizado {formatEditorialDate(entry.updated)}</p>
            </div>
            <EditorialMedia
              image={entry.resolvedImage}
              alt={entry.imageAlt}
              fit={entry.imageFit}
              kind="resource"
              position={entry.imagePosition}
              priority
              sizes="(max-width: 900px) calc(100vw - 2rem), 40vw"
            />
          </div>
        </header>

        <div className="container resource-document-layout">
          <ResourceActions slug={entry.slug} taskCount={entry.taskCount} />
          <div className="resource-document">
            <MarkdownContent body={entry.body} kind="resource" resourceSlug={entry.slug} />
            {entry.sources.length && !hasSourcesSection(entry.body) ? (
              <section className="frontmatter-sources" aria-labelledby="resource-sources-title">
                <h2 id="resource-sources-title">Fuentes consultadas</h2>
                <ul>{entry.sources.map((source) => <li key={source}>{source}</li>)}</ul>
              </section>
            ) : null}
          </div>
          <ContentCta href={entry.ctaHref} label={entry.cta} />
        </div>

        <div className="container article-related-wrap">
          <RelatedContent entries={related} />
        </div>
      </article>
    </main>
  );
}
