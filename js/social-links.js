(() => {
    const whatsappMessage = "Hola, conocí Nido Canino a través de su información y quisiera conocerlos un poco más.";
    const whatsappUrl = new URL("https://wa.me/573124611816");
    whatsappUrl.searchParams.set("text", whatsappMessage);

    window.NIDO_SOCIAL_LINKS = Object.freeze({
        website: Object.freeze({
            key: "website",
            label: "Página web",
            title: "Conozca Nido Canino",
            detail: "nidocanino.org",
            url: "https://nidocanino.org",
            href: "index.html",
            icon: "assets/icons/social/web.svg",
            external: false,
            available: true
        }),
        instagram: Object.freeze({
            key: "instagram",
            label: "Instagram",
            title: "Vea nuestro día a día",
            detail: "@nidocaninobogota",
            url: "https://www.instagram.com/nidocaninobogota/",
            href: "https://www.instagram.com/nidocaninobogota/",
            icon: "assets/icons/social/instagram.svg",
            external: true,
            available: true
        }),
        whatsapp: Object.freeze({
            key: "whatsapp",
            label: "WhatsApp",
            title: "Hable con nosotros",
            detail: "+57 312 461 1816",
            url: whatsappUrl.toString(),
            href: whatsappUrl.toString(),
            icon: "assets/icons/social/whatsapp.svg",
            external: true,
            available: true
        }),
        facebook: Object.freeze({
            key: "facebook",
            label: "Facebook",
            title: "Nido Canino",
            detail: "Canal pendiente",
            url: null,
            href: null,
            icon: "assets/icons/social/facebook.svg",
            external: true,
            available: false
        }),
        tiktok: Object.freeze({
            key: "tiktok",
            label: "TikTok",
            title: "TikTok",
            detail: "Canal pendiente",
            url: null,
            href: null,
            icon: "assets/icons/social/tiktok.svg",
            external: true,
            available: false
        }),
        email: Object.freeze({
            key: "email",
            label: "Correo",
            title: "Correo electrónico",
            detail: "Canal pendiente",
            url: null,
            href: null,
            icon: "assets/icons/social/email.svg",
            external: false,
            available: false
        })
    });
})();
