window.Utils = {
    zoneOptions: [
        "Fontibón",
        "Engativá",
        "Modelia",
        "Occidente",
        "Otra zona de Bogotá"
    ],

    serviceOptions: [
        "Convivencia canina",
        "Adaptación previa",
        "Visita para gatos"
    ],

    readTheme() {
        return localStorage.getItem("nc_theme") || "dark";
    },

    setTheme(theme) {
        const isLight = theme === "light";
        document.body.classList.toggle("light-mode", isLight);
        localStorage.setItem("nc_theme", theme);
    },

    toggleTheme() {
        const current = this.readTheme();
        const next = current === "dark" ? "light" : "dark";
        this.setTheme(next);
        return next;
    },

    updateThemeButtonLabel() {
        const btn = document.getElementById("themeToggle");
        if (!btn) return;

        const current = this.readTheme();
        btn.textContent = current === "dark" ? "Modo claro" : "Modo oscuro";
    },

    initTheme() {
        const savedTheme = this.readTheme();
        this.setTheme(savedTheme);
        this.updateThemeButtonLabel();

        const btn = document.getElementById("themeToggle");
        if (!btn) return;

        btn.addEventListener("click", () => {
            this.toggleTheme();
            this.updateThemeButtonLabel();
        });
    },

    setActiveNav() {
        const currentPage = location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll("[data-nav]");

        navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === currentPage) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    },

    fillZones(selectElement) {
        if (!selectElement) return;

        selectElement.innerHTML =
            `<option value="">Seleccione una zona</option>` +
            this.zoneOptions
                .map((zone) => `<option value="${zone}">${zone}</option>`)
                .join("");
    },

    fillServices(selectElement) {
        if (!selectElement) return;

        selectElement.innerHTML =
            `<option value="">Seleccione un servicio</option>` +
            this.serviceOptions
                .map((service) => `<option value="${service}">${service}</option>`)
                .join("");
    },

    formatDate(dateString) {
        if (!dateString) return "Sin fecha";

        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return "Fecha no válida";

        return date.toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    },

    createStatusClass(status) {
        if (!status) return "pending";

        const normalized = status.toLowerCase().trim();

        if (normalized === "pending") return "pending";
        if (normalized === "contacted") return "contacted";
        if (normalized === "confirmed") return "confirmed";
        if (normalized === "cancelled") return "cancelled";

        return "pending";
    },

    escapeHTML(value) {
        if (typeof value !== "string") return value;

        return value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    },

    truncateText(text, maxLength = 120) {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + "…";
    }
};