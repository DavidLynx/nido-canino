import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContentCta } from "@/components/editorial/content-cta";
import { EditorialMedia } from "@/components/editorial/editorial-media";
import { MarkdownContent } from "@/components/editorial/markdown-content";
import { ReadingProgress } from "@/components/editorial/reading-progress";
import { RelatedContent } from "@/components/editorial/related-content";
import { TableOfContents } from "@/components/editorial/table-of-contents";
import {
  formatEditorialDate,
  getAllBlogEntries,
  getEntryBySlug,
  getRelatedEntries,
  hasSourcesSection,
} from "@/lib/content/markdown";
import { siteConfig } from "@/lib/site";

type BlogArticleProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: BlogArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug("blog", slug);
  if (!entry) return {};
  const image = entry.resolvedImage ?? "/assets/logo/logo-full.png";
  return {
    title: entry.title,
    description: entry.excerpt,
    alternates: { canonical: `/blog/${entry.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${entry.slug}`,
      title: entry.title,
      description: entry.excerpt,
      publishedTime: entry.published,
      modifiedTime: entry.updated,
      authors: [siteConfig.name],
      tags: entry.tags,
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

export default async function BlogArticlePage({ params }: BlogArticleProps) {
  const { slug } = await params;
  const entry = getEntryBySlug("blog", slug);
  if (!entry) notFound();
  const related = getRelatedEntries(entry);
  const articleUrl = `${siteConfig.url}/blog/${entry.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.title,
    description: entry.excerpt,
    image: new URL(entry.resolvedImage ?? "/assets/logo/logo-full.png", siteConfig.url).toString(),
    datePublished: entry.published,
    dateModified: entry.updated,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  return (
    <main className="editorial-shell article-page">
      <ReadingProgress targetId="article-reading" />
      <article id="article-reading">
        <header className="article-hero">
          <div className="container article-hero__grid">
            <div className="article-hero__copy">
              <nav className="editorial-breadcrumb" aria-label="Migas de pan">
                <Link href="/">Inicio</Link><span aria-hidden="true">/</span><Link href="/blog">Blog</Link>
              </nav>
              <span className="editorial-kicker">{entry.category}</span>
              <h1>{entry.title}</h1>
              <p className="article-lead">{entry.excerpt}</p>
              <div className="article-byline">
                <span>Por Nido Canino</span>
                <span>Publicado {formatEditorialDate(entry.published)}</span>
                <span>{entry.readingMinutes} min de lectura</span>
              </div>
            </div>
            <EditorialMedia
              image={entry.resolvedImage}
              alt={entry.imageAlt}
              fit={entry.imageFit}
              kind="blog"
              position={entry.imagePosition}
              priority
              sizes="(max-width: 900px) calc(100vw - 2rem), 44vw"
            />
          </div>
        </header>

        <div className="container article-layout">
          <TableOfContents headings={entry.headings} />
          <div className="article-content-column">
            <MarkdownContent body={entry.body} kind="blog" />
            {entry.sources.length && !hasSourcesSection(entry.body) ? (
              <section className="frontmatter-sources" aria-labelledby="sources-title">
                <h2 id="sources-title">Fuentes consultadas</h2>
                <ul>{entry.sources.map((source) => <li key={source}>{source}</li>)}</ul>
              </section>
            ) : null}
            <ContentCta href={entry.ctaHref} label={entry.cta} />
          </div>
        </div>

        <div className="container article-related-wrap">
          <RelatedContent entries={related} />
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</gu, "\\u003c") }}
      />
    </main>
  );
}
