export type EditorialImageFit = "cover" | "contain";

export type EditorialImageLayout = {
  fit: EditorialImageFit;
  position: string;
};

const DEFAULT_LAYOUT: EditorialImageLayout = {
  fit: "cover",
  position: "50% 50%",
};

const IMAGE_LAYOUTS: Record<string, EditorialImageLayout> = {
  "/assets/photos/blog/blog-grupos-pequenos.png": { fit: "cover", position: "50% 52%" },
  "/assets/photos/blog/blog-estres-perro.png": { fit: "cover", position: "52% 48%" },
  "/assets/photos/blog/blog-sismo-mascotas.png": { fit: "cover", position: "56% 58%" },
  "/assets/photos/blog/blog-perro-senior.png": { fit: "cover", position: "60% 50%" },
  "/assets/photos/blog/blog-adaptacion.png": { fit: "cover", position: "55% 58%" },
  "/assets/photos/gallery/simba-1.jpg": { fit: "contain", position: "50% 50%" },
  "/assets/photos/blog/blog-gato-casa.png": { fit: "cover", position: "58% 52%" },
  "/assets/photos/blog/blog-ausencia-gato.png": { fit: "cover", position: "52% 58%" },
  "/assets/photos/blog/blog-descanso-perro.png": { fit: "cover", position: "50% 58%" },
  "/assets/photos/blog/blog-olfato.png": { fit: "cover", position: "48% 62%" },
  "/assets/photos/blog/resources-checklist.png": { fit: "cover", position: "50% 58%" },
  "/assets/photos/blog/resources-emergency-kit.png": { fit: "cover", position: "52% 58%" },
};

export function getEditorialImageLayout(image: string): EditorialImageLayout {
  return IMAGE_LAYOUTS[image] ?? DEFAULT_LAYOUT;
}
