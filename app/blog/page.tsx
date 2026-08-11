import type { Metadata } from "next";
import Link from "next/link";

import { BlogFilters } from "@/components/editorial/blog-filters";
import { EditorialMedia } from "@/components/editorial/editorial-media";
import { InstagramHighlights } from "@/components/editorial/instagram-highlights";
import {
  formatEditorialDate,
  getAllBlogEntries,
  getCategories,
  toContentSummary,
} from "@/lib/content/markdown";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Lecturas de Nido Canino sobre comportamiento, rutina, bienestar, seguridad, cuidado felino y casos reales.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const entries = getAllBlogEntries();
  const featured = entries.find(
    (entry) => entry.slug === "por-que-algunos-perros-necesitan-grupos-pequenos",
  ) ?? entries[0];
  const remaining = entries.filter((entry) => entry.slug !== featured.slug);

  return (
    <main className="editorial-shell blog-library">
      <section className="blog-library-hero">
        <div className="container blog-library-hero__grid">
          <div className="blog-library-hero__intro">
            <span className="editorial-kicker">Blog · Entender antes de decidir</span>
            <h1>Una biblioteca para observar con más criterio.</h1>
            <p>
              Señales, contexto, rutina y casos reales para comprender mejor a perros y gatos sin convertir cada lectura en una venta.
            </p>
            <div className="blog-library-hero__counts" aria-label="Resumen de la biblioteca">
              <div><strong>{entries.length}</strong><span>lecturas completas</span></div>
              <div><strong>{getCategories(entries).length}</strong><span>líneas editoriales</span></div>
            </div>
          </div>
          <article className="featured-story">
            <EditorialMedia
              image={featured.resolvedImage}
              alt={featured.imageAlt}
              fit={featured.imageFit}
              kind="blog"
              position={featured.imagePosition}
              priority
              sizes="(max-width: 900px) calc(100vw - 2rem), 54vw"
            />
            <div className="featured-story__overlay">
              <div className="featured-story__meta">
                <span>Lectura destacada</span>
                <span>{featured.readingMinutes} min</span>
              </div>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <Link href={`/blog/${featured.slug}`}>Leer artículo <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section editorial-library-section" aria-labelledby="blog-library-title">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="editorial-kicker">Biblioteca editorial</span>
              <h2 id="blog-library-title">Lecturas para entender mejor</h2>
              <p>Explore por tema. Todos los artículos están disponibles desde el HTML inicial.</p>
            </div>
            <span className="editorial-date">Actualizado {formatEditorialDate(featured.updated)}</span>
          </div>
          <BlogFilters
            categories={getCategories(entries)}
            entries={remaining.map(toContentSummary)}
          />
        </div>
      </section>

      <InstagramHighlights />

      <section className="editorial-bridge editorial-bridge--resources">
        <div className="container editorial-bridge__inner">
          <div>
            <span className="editorial-kicker">De entender a actuar</span>
            <h2>¿Necesita convertir la lectura en una lista o una plantilla?</h2>
            <p>Recursos reúne herramientas concretas para preparar un caso, una ausencia, una estancia o una emergencia.</p>
          </div>
          <Link className="editorial-bridge__link" href="/resources">Explorar Recursos <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
