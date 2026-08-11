import Link from "next/link";

import type { ContentSummary } from "@/lib/content/markdown";

import { EditorialMedia } from "./editorial-media";

type ContentCardProps = {
  entry: ContentSummary;
  variant?: "standard" | "wide" | "compact";
};

export function ContentCard({ entry, variant = "standard" }: ContentCardProps) {
  return (
    <article
      className={`editorial-card editorial-card--${entry.type} editorial-card--${variant}`}
      data-category={entry.category}
    >
      <Link className="editorial-card__media-link" href={entry.href} tabIndex={-1} aria-hidden="true">
        <EditorialMedia
          image={entry.resolvedImage}
          alt={entry.imageAlt}
          fit={entry.imageFit}
          kind={entry.type}
          position={entry.imagePosition}
          sizes={
            variant === "wide"
              ? "(max-width: 760px) calc(100vw - 2rem), (max-width: 1100px) 50vw, 38vw"
              : entry.type === "resource"
                ? "(max-width: 760px) calc(100vw - 2rem), (max-width: 1100px) 50vw, 22vw"
                : "(max-width: 760px) calc(100vw - 2rem), (max-width: 1100px) 50vw, 30vw"
          }
        />
      </Link>
      <div className="editorial-card__body">
        <div className="editorial-card__meta">
          <span>{entry.type === "blog" ? entry.category : entry.format}</span>
          {entry.type === "blog" ? <span>{entry.readingMinutes} min de lectura</span> : <span>{entry.category}</span>}
        </div>
        <h3>
          <Link href={entry.href}>{entry.title}</Link>
        </h3>
        <p>{entry.excerpt}</p>
        <Link className="editorial-card__link" href={entry.href}>
          {entry.type === "blog" ? "Leer artículo" : "Abrir recurso"}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
