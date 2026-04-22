(function () {
    const ProfilePage = {
        async init() {
            const name = document.getElementById("profileName");
            const email = document.getElementById("profileEmail");
            const avatar = document.getElementById("profileAvatar");

            if (!name && !email && !avatar) return;
            if (!window.NidoAuth || !window.NidoAuth.isReady()) return;

            const session = await window.NidoAuth.getSession();
            if (!session) return;

            const user = session.user;
            const displayName = window.NidoAuth.getUserName(user);

            if (name) name.textContent = displayName;
            if (email) email.textContent = user.email || "Correo no disponible";
            if (avatar && user.user_metadata?.avatar_url) {
                avatar.src = user.user_metadata.avatar_url;
                avatar.alt = displayName;
            }
        }
    };

    window.NidoProfilePage = ProfilePage;
})();
