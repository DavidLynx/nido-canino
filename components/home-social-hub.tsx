import Image from "next/image";
import Link from "next/link";

import { PawMark } from "@/components/effects/paw-mark";
import { socialLinks } from "@/lib/social-links";

const featuredChannels = [socialLinks.instagram, socialLinks.tiktok, socialLinks.whatsapp];

export function HomeSocialHub() {
  return (
    <section className="home-social-hub" aria-labelledby="homeSocialTitle">
      <div className="container home-social-hub__inner">
        <div className="home-social-hub__copy">
          <p className="home-social-hub__kicker">Nido, todos los días</p>
          <h2 id="homeSocialTitle">Conozca nuestras redes</h2>
          <p>Historias, novedades y canales oficiales de Nido Canino en un solo lugar.</p>
        </div>
        <div className="home-social-hub__actions">
          <div className="home-social-hub__icons" aria-label="Canales destacados">
            {featuredChannels.map((channel) => (
              <span className="home-social-hub__icon" key={channel.key} title={channel.label}>
                <Image src={channel.icon} alt="" width={512} height={512} aria-hidden="true" />
              </span>
            ))}
          </div>
          <Link className="home-social-hub__cta" href="/hola?origen=landing">
            Encontrarnos <span aria-hidden="true">→</span>
            <PawMark className="home-social-hub__paw" />
          </Link>
        </div>
      </div>
    </section>
  );
}
