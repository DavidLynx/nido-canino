(function () {
    const Guards = {
        getCurrentPage() {
            return location.pathname.split("/").pop() || "index.html";
        },

        isProtectedPage() {
            const config = window.NIDO_CONFIG || {};
            const protectedPaths = config.protectedPaths || [];
            return protectedPaths.includes(this.getCurrentPage());
        },

        async requireSession() {
            if (!this.isProtectedPage()) return;

            if (!window.NidoAuth || !window.NidoAuth.isReady()) {
                window.location.href = "auth.html?redirect=" + encodeURIComponent(this.getCurrentPage());
                return;
            }

            try {
                const session = await window.NidoAuth.getSession();
                if (!session) {
                    window.location.href = "auth.html?redirect=" + encodeURIComponent(this.getCurrentPage());
                }
            } catch (error) {
                console.error("No se pudo validar la sesion:", error);
                window.location.href = "auth.html?redirect=" + encodeURIComponent(this.getCurrentPage());
            }
        }
    };

    window.NidoGuards = Guards;
})();
