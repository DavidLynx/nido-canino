import Image from "next/image";

import { instagramHighlights } from "@/lib/content/instagram";

export function InstagramHighlights() {
  return (
    <section className="instagram-editorial" aria-labelledby="instagram-editorial-title">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <span className="editorial-kicker">Instagram · selección manual</span>
            <h2 id="instagram-editorial-title">Del día a día de Nido</h2>
          </div>
          <a href="https://www.instagram.com/nidocaninobogota/" target="_blank" rel="noopener noreferrer">
            Ver perfil oficial <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="instagram-editorial__grid">
          {instagramHighlights.map((item) => (
            <a href={item.href} target="_blank" rel="noopener noreferrer" key={item.label}>
              <div className={item.image ? "instagram-editorial__media" : "instagram-editorial__media instagram-editorial__media--fallback"}>
                {item.image ? (
                  <Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
                ) : (
                  <span aria-hidden="true">⌁</span>
                )}
              </div>
              <span>{item.label}</span>
              <strong>{item.title}</strong>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
