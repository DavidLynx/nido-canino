import type { ContentEntry } from "@/lib/content/markdown";
import { toContentSummary } from "@/lib/content/markdown";

import { ContentCard } from "./content-card";

export function RelatedContent({ entries }: { entries: ContentEntry[] }) {
  if (!entries.length) return null;
  return (
    <section className="related-content" aria-labelledby="related-title">
      <div className="section-heading-row">
        <div>
          <span className="editorial-kicker">Siga explorando</span>
          <h2 id="related-title">Contenido relacionado</h2>
        </div>
      </div>
      <div className="related-content__grid">
        {entries.map((entry) => (
          <ContentCard entry={toContentSummary(entry)} key={`${entry.type}-${entry.slug}`} variant="compact" />
        ))}
      </div>
    </section>
  );
}
