(() => {
    const primaryOrder = ["website", "instagram", "whatsapp"];
    const socialOrder = ["instagram", "tiktok", "facebook", "whatsapp", "website", "email"];
    const footerOrder = ["instagram", "whatsapp"];

    const iconMarkup = (link) => `
        <span class="hola-link-icon" aria-hidden="true">
            <img src="${link.icon}" alt="" />
        </span>`;

    const externalAttributes = (link) => link.external
        ? ' target="_blank" rel="noopener noreferrer"'
        : "";

    const renderPrimaryLinks = (links) => {
        const container = document.getElementById("holaPrimaryLinks");
        if (!container) return;

        container.innerHTML = primaryOrder.map((key, index) => {
            const link = links[key];
            const emphasisClass = key === "website" ? " is-primary" : "";

            return `
                <a class="hola-destination${emphasisClass}" href="${link.href}"${externalAttributes(link)} data-hola-channel="${link.key}" style="--hola-order: ${index}">
                    ${iconMarkup(link)}
                    <span class="hola-destination-copy">
                        <strong>${link.title}</strong>
                        <span>${link.detail}</span>
                    </span>
                    <svg class="hola-arrow" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                </a>`;
        }).join("");
    };

    const renderSocialLinks = (links) => {
        const container = document.getElementById("holaSocialLinks");
        if (!container) return;

        container.innerHTML = socialOrder.map((key) => {
            const link = links[key];
            const content = `
                ${iconMarkup(link)}
                <span class="hola-social-copy">
                    <strong>${link.label}</strong>
                    <small>${link.available ? link.detail : "Próximamente"}</small>
                </span>`;

            if (!link.available) {
                return `<div class="hola-social-item is-pending" aria-label="${link.label}: próximamente">${content}</div>`;
            }

            return `<a class="hola-social-item" href="${link.href}"${externalAttributes(link)} data-hola-channel="${link.key}" aria-label="Abrir ${link.label} de Nido Canino">${content}</a>`;
        }).join("");
    };

    const renderFooterLinks = (links) => {
        const container = document.getElementById("holaFooterSocial");
        if (!container) return;

        container.innerHTML = footerOrder.map((key) => {
            const link = links[key];
            return `
                <a class="footer-social-link" href="${link.href}"${externalAttributes(link)} data-hola-channel="${link.key}" aria-label="${link.label} de Nido Canino">
                    <img class="footer-social-icon" src="${link.icon}" alt="" aria-hidden="true" />
                </a>`;
        }).join("");
    };

    const emitTrackingEvent = (name, detail) => {
        window.dispatchEvent(new CustomEvent(name, { detail }));
    };

    const initializeTrackingHooks = () => {
        const origin = new URLSearchParams(window.location.search).get("origen");
        const visitDetail = { page: "/hola", origin: origin || null };

        document.documentElement.dataset.holaOrigin = origin || "directo";
        emitTrackingEvent("nido:hola-view", visitDetail);

        document.addEventListener("click", (event) => {
            const target = event.target.closest("[data-hola-channel]");
            if (!target) return;

            emitTrackingEvent("nido:hola-link-click", {
                ...visitDetail,
                channel: target.dataset.holaChannel,
                destination: target.href || null
            });
        });
    };

    document.addEventListener("DOMContentLoaded", () => {
        const links = window.NIDO_SOCIAL_LINKS;
        if (!links) return;

        document.querySelectorAll("[data-nav].active").forEach((link) => link.classList.remove("active"));
        renderPrimaryLinks(links);
        renderSocialLinks(links);
        renderFooterLinks(links);
        initializeTrackingHooks();
    });
})();
