import type { CSSProperties } from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PawMark } from "@/components/effects/paw-mark";
import { HolaTracking } from "@/components/hola-tracking";
import { socialLinks, type SocialLink } from "@/lib/social-links";

export const metadata: Metadata = {
  title: "Hola",
  description:
    "Conozca Nido Canino, visite nuestras redes sociales y encuentre nuestros canales oficiales de contacto.",
  alternates: { canonical: "/hola" },
  openGraph: {
    title: "Hola | Nido Canino",
    description:
      "Conozca Nido Canino, visite nuestras redes sociales y encuentre nuestros canales oficiales de contacto.",
    url: "/hola",
    images: [{ url: "/assets/logo/NIDO-FULL.svg", alt: "Logo de Nido Canino" }],
  },
  twitter: {
    card: "summary",
    title: "Hola | Nido Canino",
    description: "Redes sociales y canales oficiales de contacto de Nido Canino.",
    images: ["/assets/logo/NIDO-FULL.svg"],
  },
};

const primaryChannels = [socialLinks.website, socialLinks.instagram, socialLinks.whatsapp];
const ecosystemChannels = [
  socialLinks.instagram,
  socialLinks.tiktok,
  socialLinks.facebook,
  socialLinks.whatsapp,
  socialLinks.website,
  socialLinks.email,
];

const holaHref = (channel: SocialLink) => channel.holaHref ?? channel.href;
const holaPrimaryHref = (channel: SocialLink) =>
  channel.holaPrimaryHref ?? channel.holaHref ?? channel.href;

const primaryEventNames: Partial<Record<SocialLink["key"], string>> = {
  website: "hola_services_click",
  instagram: "hola_instagram_work_click",
  whatsapp: "hola_whatsapp_primary_click",
};

const secondaryEventNames: Record<SocialLink["key"], string> = {
  instagram: "hola_instagram_secondary_click",
  tiktok: "hola_tiktok_click",
  facebook: "hola_facebook_click",
  whatsapp: "hola_whatsapp_secondary_click",
  website: "hola_web_click",
  email: "hola_email_click",
};

const instagramPreviewPhotos = [
  { src: "/assets/photos/gallery/bruno-1.jpg", className: "is-bruno" },
  { src: "/assets/photos/gallery/simba-1.jpg", className: "is-simba" },
  { src: "/assets/photos/gallery/oso-1.jpg", className: "is-oso" },
] as const;

function LinkIcon({ channel }: { channel: SocialLink }) {
  return (
    <span className="hola-link-icon" aria-hidden="true">
      <Image src={channel.icon} alt="" width={512} height={512} />
    </span>
  );
}

function Arrow() {
  return (
    <svg className="hola-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Destination({ channel, index }: { channel: SocialLink; index: number }) {
  const className = `hola-destination is-${channel.key}${channel.key === "website" ? " is-primary" : ""}`;
  const content = (
    <>
      <LinkIcon channel={channel} />
      <span className="hola-destination-copy">
        <strong>{channel.holaPrimaryTitle ?? channel.title}</strong>
        <span>{channel.holaPrimaryDetail ?? channel.detail}</span>
      </span>
      <span className="hola-destination-end" aria-hidden="true">
        {channel.key === "website" ? <PawMark className="hola-cta-paw" /> : null}
        <Arrow />
      </span>
    </>
  );
  const style = { "--hola-order": index } as CSSProperties;

  const preview = channel.key === "instagram" ? (
    <span className="hola-instagram-preview" aria-hidden="true">
      {instagramPreviewPhotos.map((photo) => (
        <span className={`hola-instagram-polaroid ${photo.className}`} key={photo.src}>
          <Image src={photo.src} alt="" width={112} height={132} />
        </span>
      ))}
    </span>
  ) : null;

  if (!channel.external) {
    return (
      <div className={`hola-destination-wrap is-${channel.key}`} style={style}>
        {preview}
        <Link
          className={className}
          href={holaPrimaryHref(channel)}
          data-hola-channel={channel.key}
          data-hola-event={primaryEventNames[channel.key]}
        >
          {content}
        </Link>
      </div>
    );
  }

  return (
    <div className={`hola-destination-wrap is-${channel.key}`} style={style}>
      {preview}
      <a
        className={className}
        href={holaPrimaryHref(channel)}
        target="_blank"
        rel="noopener noreferrer"
        data-hola-channel={channel.key}
        data-hola-event={primaryEventNames[channel.key]}
      >
        {content}
      </a>
    </div>
  );
}

function SocialItem({ channel }: { channel: SocialLink }) {
  const content = (
    <>
      <LinkIcon channel={channel} />
      <span className="hola-social-copy">
        <strong>{channel.label}</strong>
        <small>{channel.detail}</small>
      </span>
      <span className="hola-social-arrow" aria-hidden="true">→</span>
    </>
  );

  const className = `hola-social-item is-${channel.key}`;

  if (!channel.external) {
    return channel.key === "website" ? (
      <Link
        className={className}
        href={holaHref(channel)}
        data-hola-channel={channel.key}
        data-hola-event={secondaryEventNames[channel.key]}
        aria-label={`Abrir ${channel.label} de Nido Canino`}
      >
        {content}
      </Link>
    ) : (
      <a
        className={className}
        href={holaHref(channel)}
        data-hola-channel={channel.key}
        data-hola-event={secondaryEventNames[channel.key]}
        aria-label={`Abrir ${channel.label} de Nido Canino`}
      >
        {content}
      </a>
    );
  }

  return (
    <a
      className={className}
      href={holaHref(channel)}
      target="_blank"
      rel="noopener noreferrer"
      data-hola-channel={channel.key}
      data-hola-event={secondaryEventNames[channel.key]}
      aria-label={`Abrir ${channel.label} de Nido Canino`}
    >
      {content}
    </a>
  );
}

export default function HolaPage() {
  return (
    <main className="hola-main">
      <Suspense fallback={null}>
        <HolaTracking />
      </Suspense>
      <section className="hola-shell" aria-labelledby="holaTitle">
        <div className="hola-card">
          <header className="hola-intro">
            <Link
              className="hola-logo-link"
              href="/"
              aria-label="Ir al inicio de Nido Canino"
              data-hola-channel="website-logo"
            >
              <Image
                className="hola-logo"
                src="/assets/logo/NIDO-FULL.svg"
                alt="Nido Canino"
                width={1006}
                height={512}
                priority
              />
              <PawMark className="hola-logo-paw" />
            </Link>
            <p className="hola-kicker">Nuestra tarjeta digital</p>
            <h1 id="holaTitle">Hola, somos Nido Canino.</h1>
            <p className="hola-lead">
              Conózcanos, explore nuestros servicios y encuentre la mejor forma de estar en contacto con Nido.
            </p>
            <p className="hola-location"><span aria-hidden="true" />Modelia · Bogotá</p>
          </header>

          <section className="hola-primary" aria-labelledby="holaPrimaryTitle">
            <h2 className="sr-only" id="holaPrimaryTitle">Canales principales</h2>
            <div className="hola-primary-list">
              {primaryChannels.map((channel, index) => (
                <Destination channel={channel} index={index} key={channel.key} />
              ))}
            </div>
          </section>

          <section className="hola-ecosystem" aria-labelledby="holaSocialTitle">
            <div className="hola-section-heading">
              <h2 id="holaSocialTitle">Encuéntrenos también aquí</h2>
              <p>Elija el canal que prefiera.</p>
            </div>
            <div className="hola-social-grid">
              {ecosystemChannels.map((channel) => <SocialItem channel={channel} key={channel.key} />)}
            </div>
          </section>

          <p className="hola-signoff">Nos encantará saber de usted.</p>
        </div>
      </section>
    </main>
  );
}
