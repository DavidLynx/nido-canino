"use client";

import { useMemo, useState } from "react";

import type { ContentSummary } from "@/lib/content/markdown";

import { ContentCard } from "./content-card";

type ResourceExplorerProps = {
  categories: string[];
  entries: ContentSummary[];
};

export function ResourceExplorer({ categories, entries }: ResourceExplorerProps) {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("es");
  const filteredEntries = useMemo(
    () =>
      entries.filter((entry) => {
        const matchesCategory = category === "Todos" || entry.category === category;
        const searchable = [entry.title, entry.excerpt, entry.category, entry.format, ...entry.tags]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase("es");
        return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
      }),
    [category, entries, normalizedQuery],
  );

  return (
    <div className="resource-explorer">
      <label className="resource-search">
        <span className="sr-only">Buscar en Recursos</span>
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={query}
          placeholder="¿Qué necesita preparar?"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="editorial-filters" aria-label="Filtrar recursos por categoría">
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
        {filteredEntries.length} {filteredEntries.length === 1 ? "herramienta" : "herramientas"}
      </p>
      <div className="resource-card-grid">
        {filteredEntries.map((entry) => (
          <ContentCard entry={entry} key={entry.slug} />
        ))}
      </div>
      {!filteredEntries.length ? (
        <div className="editorial-empty">
          <strong>No encontramos una coincidencia.</strong>
          <span>Pruebe otra palabra o cambie el filtro.</span>
        </div>
      ) : null}
    </div>
  );
}
