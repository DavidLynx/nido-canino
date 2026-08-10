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
  icon: string;
  external: boolean;
};

export const whatsappMessage =
  "Hola, conocí Nido Canino a través de su información y quisiera conocerlos un poco más.";

const whatsappUrl = new URL("https://wa.me/573124611816");
whatsappUrl.searchParams.set("text", whatsappMessage);

export const socialLinks = {
  website: {
    key: "website",
    label: "Página web",
    title: "Conozca Nido Canino",
    detail: "nidocanino.org",
    href: "/",
    icon: "/assets/icons/social/web.svg",
    external: false,
  },
  instagram: {
    key: "instagram",
    label: "Instagram",
    title: "Vea nuestro día a día",
    detail: "@nidocaninobogota",
    href: "https://www.instagram.com/nidocaninobogota/",
    icon: "/assets/icons/social/instagram.svg",
    external: true,
  },
  tiktok: {
    key: "tiktok",
    label: "TikTok",
    title: "TikTok",
    detail: "@nidocanino",
    href: "https://www.tiktok.com/@nidocanino",
    icon: "/assets/icons/social/tiktok.svg",
    external: true,
  },
  facebook: {
    key: "facebook",
    label: "Facebook",
    title: "Nido Canino",
    detail: "Nido Canino",
    href: "https://www.facebook.com/profile.php?id=61584945403894",
    icon: "/assets/icons/social/facebook.svg",
    external: true,
  },
  whatsapp: {
    key: "whatsapp",
    label: "WhatsApp",
    title: "Hable con nosotros",
    detail: "+57 312 461 1816",
    href: "https://wa.me/573124611816",
    holaHref: whatsappUrl.toString(),
    icon: "/assets/icons/social/whatsapp.svg",
    external: true,
  },
  email: {
    key: "email",
    label: "Correo",
    title: "Escríbanos",
    detail: "bienestar@nidocanino.org",
    href: "mailto:bienestar@nidocanino.org",
    icon: "/assets/icons/social/email.svg",
    external: false,
  },
} satisfies Record<SocialLinkKey, SocialLink>;

export const socialLinkList = Object.values(socialLinks);
