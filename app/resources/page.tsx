import type { Metadata } from "next";
import Link from "next/link";

import { ResourceExplorer } from "@/components/editorial/resource-explorer";
import {
  getAllResourceEntries,
  getCategories,
  toContentSummary,
} from "@/lib/content/markdown";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Checklists, plantillas, comparadores y guías prácticas de Nido Canino para preparar el siguiente paso.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const entries = getAllResourceEntries();
  const paths = [
    {
      eyebrow: "Preparar",
      title: "Llegue con la información que sí ayuda",
      href: "/resources/que-conviene-tener-claro-antes-de-avanzar",
      number: "01",
    },
    {
      eyebrow: "Decidir",
      title: "Encuentre la ruta correcta para su caso",
      href: "/resources/que-ruta-corresponde",
      number: "02",
    },
    {
      eyebrow: "Organizar",
      title: "Deje rutina, alimentación y descanso por escrito",
      href: "/resources/plantilla-rutina-descanso-alimentacion",
      number: "03",
    },
  ];

  return (
    <main className="editorial-shell resources-library">
      <section className="resources-tool-hero">
        <div className="container">
          <div className="resources-tool-hero__intro">
            <span className="editorial-kicker">Recursos · Pasar a la acción</span>
            <h1>Herramientas para preparar lo importante.</h1>
            <p>
              Checklists, plantillas y rutas breves para organizar información antes de contactar, viajar o solicitar un servicio.
            </p>
          </div>
          <div className="resource-paths" aria-label="Rutas recomendadas">
            {paths.map((item) => (
              <Link href={item.href} key={item.eyebrow}>
                <span className="resource-paths__number">{item.number}</span>
                <span className="resource-paths__eyebrow">{item.eyebrow}</span>
                <strong>{item.title}</strong>
                <i aria-hidden="true">→</i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section resource-library-section" aria-labelledby="resource-library-title">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="editorial-kicker">Biblioteca práctica</span>
              <h2 id="resource-library-title">Encuentre la herramienta que necesita</h2>
              <p>Busque por necesidad o filtre entre preparación, rutas, checklists, plantillas y emergencias.</p>
            </div>
            <span className="resource-count"><strong>{entries.length}</strong> recursos listos</span>
          </div>
          <ResourceExplorer
            categories={getCategories(entries)}
            entries={entries.map(toContentSummary)}
          />
        </div>
      </section>

      <section className="editorial-bridge editorial-bridge--blog">
        <div className="container editorial-bridge__inner">
          <div>
            <span className="editorial-kicker">Antes de completar</span>
            <h2>¿Quiere entender mejor lo que está observando?</h2>
            <p>El Blog explica señales, contexto, descanso, adaptación, cuidado felino y preparación.</p>
          </div>
          <Link className="editorial-bridge__link" href="/blog">Ir al Blog <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
