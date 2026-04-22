document.addEventListener("DOMContentLoaded", async () => {
    if (window.Utils) {
        Utils.initTheme();
        Utils.setActiveNav();
    }

    if (window.NidoAuth) {
        await NidoAuth.init();
    }

    if (window.NidoGuards) {
        await NidoGuards.requireSession();
    }

    if (window.NidoProfilePage) {
        await NidoProfilePage.init();
    }
});
