import Image from "next/image";

import type { EditorialImageFit } from "@/lib/content/editorial-images";
import type { ContentKind } from "@/lib/content/markdown";

type EditorialMediaProps = {
  alt: string;
  className?: string;
  fit?: EditorialImageFit;
  image: string | null;
  kind: ContentKind;
  position?: string;
  priority?: boolean;
  sizes?: string;
};

export function EditorialMedia({
  alt,
  className = "",
  fit = "cover",
  image,
  kind,
  position = "50% 50%",
  priority = false,
  sizes = "(max-width: 760px) 100vw, 50vw",
}: EditorialMediaProps) {
  if (image) {
    return (
      <div className={`editorial-media editorial-media--image editorial-media--${fit} ${className}`.trim()}>
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectFit: fit, objectPosition: position }}
        />
      </div>
    );
  }

  return (
    <div
      className={`editorial-media editorial-media--fallback editorial-media--${kind} ${className}`.trim()}
      role="img"
      aria-label={`${alt}. Imagen editorial pendiente.`}
    >
      <span className="editorial-media__mark" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <b />
      </span>
      <span className="editorial-media__label">
        {kind === "blog" ? "Lectura editorial" : "Herramienta práctica"}
      </span>
    </div>
  );
}
