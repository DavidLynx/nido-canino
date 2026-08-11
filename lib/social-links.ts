export type SocialLinkKey =
  | "website"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "whatsapp"
  | "email";

export type SocialLink = {
  key: SocialLinkKey;
  label: string;
  title: string;
  detail: string;
  href: string;
  holaHref?: string;
  holaPrimaryHref?: string;
  holaPrimaryTitle?: string;
  holaPrimaryDetail?: string;
  icon: string;
  external: boolean;
};

export const whatsappMessage =
  "Hola, llegué a Nido Canino desde su código QR y quisiera conocer sus servicios, disponibilidad e inversión.";

const whatsappUrl = new URL("https://wa.me/573124611816");
whatsappUrl.searchParams.set("text", whatsappMessage);

export const socialLinks = {
  website: {
    key: "website",
    label: "Página web",
    title: "Página web",
    detail: "Servicios y planes",
    href: "/",
    holaPrimaryHref: "/services",
    holaPrimaryTitle: "Conozca nuestros servicios y planes",
    holaPrimaryDetail: "Opciones, frecuencia e inversión",
    icon: "/assets/icons/social/web.svg",
    external: false,
  },
  instagram: {
    key: "instagram",
    label: "Instagram",
    title: "Instagram",
    detail: "Casos y experiencias",
    href: "https://www.instagram.com/nidocaninobogota/",
    holaPrimaryTitle: "Vea cómo trabajamos",
    holaPrimaryDetail: "Casos reales, adaptación y día a día",
    icon: "/assets/icons/social/instagram.svg",
    external: true,
  },
  tiktok: {
    key: "tiktok",
    label: "TikTok",
    title: "TikTok",
    detail: "Contenido cercano",
    href: "https://www.tiktok.com/@nidocanino",
    icon: "/assets/icons/social/tiktok.svg",
    external: true,
  },
  facebook: {
    key: "facebook",
    label: "Facebook",
    title: "Facebook",
    detail: "Novedades y comunidad",
    href: "https://www.facebook.com/profile.php?id=61584945403894",
    icon: "/assets/icons/social/facebook.svg",
    external: true,
  },
  whatsapp: {
    key: "whatsapp",
    label: "WhatsApp",
    title: "WhatsApp",
    detail: "Atención personalizada",
    href: "https://wa.me/573124611816",
    holaHref: whatsappUrl.toString(),
    holaPrimaryTitle: "Hable con nosotros",
    holaPrimaryDetail: "Atención personalizada, disponibilidad e inversión",
    icon: "/assets/icons/social/whatsapp.svg",
    external: true,
  },
  email: {
    key: "email",
    label: "Correo",
    title: "Correo",
    detail: "Consultas y alianzas",
    href: "mailto:bienestar@nidocanino.org",
    icon: "/assets/icons/social/email.svg",
    external: false,
  },
} satisfies Record<SocialLinkKey, SocialLink>;

export const socialLinkList = Object.values(socialLinks);
