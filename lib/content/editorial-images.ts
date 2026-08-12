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
  "/assets/photos/recursos/Antes de avanzar con Nido Canino.png": { fit: "cover", position: "50% 60%" },
  "/assets/photos/recursos/Convivencia canina estructurada.png": { fit: "cover", position: "52% 56%" },
  "/assets/photos/recursos/Información que ayuda desde el primer contacto.png": { fit: "cover", position: "52% 58%" },
  "/assets/photos/recursos/Visita felina a domicilio.png": { fit: "cover", position: "48% 50%" },
  "/assets/photos/recursos/Elegir la ruta correcta.png": { fit: "cover", position: "50% 58%" },
  "/assets/photos/recursos/Cómo organizar una ausencia cuando el gato se queda en casa.png": { fit: "cover", position: "48% 52%" },
  "/assets/photos/recursos/Qué preparar para una estancia corta o pernocta.png": { fit: "cover", position: "52% 52%" },
  "/assets/photos/recursos/Plantilla para organizar la rutina de su perro.png": { fit: "cover", position: "50% 58%" },
  "/assets/photos/recursos/Qué informar sobre medicación y salud.png": { fit: "cover", position: "50% 52%" },
  "/assets/photos/recursos/Kit de emergencia para mascotas.png": { fit: "cover", position: "50% 52%" },
};

export function getEditorialImageLayout(image: string): EditorialImageLayout {
  return IMAGE_LAYOUTS[image] ?? DEFAULT_LAYOUT;
}
