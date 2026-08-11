"use client";

import { useMemo, useState } from "react";

import type { ContentSummary } from "@/lib/content/markdown";

import { ContentCard } from "./content-card";

type BlogFiltersProps = {
  categories: string[];
  entries: ContentSummary[];
};

export function BlogFilters({ categories, entries }: BlogFiltersProps) {
  const [category, setCategory] = useState("Todos");
  const filteredEntries = useMemo(
    () => (category === "Todos" ? entries : entries.filter((entry) => entry.category === category)),
    [category, entries],
  );

  return (
    <div className="editorial-explorer">
      <div className="editorial-filters" aria-label="Filtrar artículos por categoría">
        {["Todos", ...categories].map((item) => (
          <button
            type="button"
            className="editorial-filter"
            aria-pressed={category === item}
            key={item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="editorial-results" aria-live="polite">
        {filteredEntries.length} {filteredEntries.length === 1 ? "lectura" : "lecturas"}
      </p>
      <div className="editorial-card-grid">
        {filteredEntries.map((entry, index) => (
          <ContentCard
            entry={entry}
            key={entry.slug}
            variant={index === 0 && filteredEntries.length > 2 ? "wide" : index % 4 === 3 ? "compact" : "standard"}
          />
        ))}
      </div>
      {!filteredEntries.length ? (
        <p className="editorial-empty">No hay artículos en esta categoría todavía.</p>
      ) : null}
    </div>
  );
}
