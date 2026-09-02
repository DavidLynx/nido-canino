import Image from "next/image";
import Link from "next/link";

import { socialLinks } from "@/lib/social-links";

const footerChannels = [socialLinks.instagram, socialLinks.tiktok, socialLinks.whatsapp];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p>Nido Canino · Cuidado estructurado y bienestar animal en Bogotá</p>
        <Link href="#">Términos y condiciones</Link>
        <Link href="/privacidad">Privacidad y tratamiento de datos</Link>
        <div className="footer-social" aria-label="Redes sociales de Nido Canino">
          <span className="footer-social-title">Síganos en redes sociales</span>
          <div className="footer-social-list">
            {footerChannels.map((channel) => (
              <a
                className="footer-social-link"
                href={channel.href}
                key={channel.key}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${channel.label} de Nido Canino`}
              >
                <Image
                  className="footer-social-icon"
                  src={channel.icon}
                  alt=""
                  width={512}
                  height={512}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
        <p className="footer-credit">Creado por Lynx Visual Division</p>
      </div>
    </footer>
  );
}
