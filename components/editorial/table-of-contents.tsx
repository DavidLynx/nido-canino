import type { ContentHeading } from "@/lib/content/markdown";

function TocLinks({ headings }: { headings: ContentHeading[] }) {
  return (
    <ol>
      {headings.map((heading) => (
        <li className={heading.level === 3 ? "is-nested" : undefined} key={heading.id}>
          <a href={`#${heading.id}`}>{heading.text}</a>
        </li>
      ))}
    </ol>
  );
}

export function TableOfContents({ headings }: { headings: ContentHeading[] }) {
  if (!headings.length) return null;
  return (
    <>
      <nav className="article-toc" aria-label="En esta lectura">
        <span>En esta lectura</span>
        <TocLinks headings={headings} />
      </nav>
      <details className="article-toc-mobile">
        <summary>En esta lectura</summary>
        <nav aria-label="Índice del artículo">
          <TocLinks headings={headings} />
        </nav>
      </details>
    </>
  );
}
