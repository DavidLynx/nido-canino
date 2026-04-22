(function () {
    const Auth = {
        get client() {
            return window.NidoSupabase ? window.NidoSupabase.client : null;
        },

        getConfig() {
            return window.NIDO_CONFIG || {};
        },

        isReady() {
            return Boolean(this.client);
        },

        getCurrentPage() {
            return location.pathname.split("/").pop() || "index.html";
        },

        normalizeRedirectPath(path) {
            if (!path || typeof path !== "string") return "";
            if (path.includes("://") || path.startsWith("//") || path.startsWith("/")) return "";
            return path;
        },

        getPostLoginPath() {
            const params = new URLSearchParams(location.search);
            const redirect = this.normalizeRedirectPath(params.get("redirect"));
            return redirect || this.getConfig().postLoginPath || "profile.html";
        },

        getRedirectUrl() {
            const config = this.getConfig();
            const authPath = config.authRedirectPath || "auth.html";
            const base = window.location.origin + window.location.pathname.replace(/[^/]*$/, "");
            const redirectUrl = new URL(authPath, base);
            const redirect = this.normalizeRedirectPath(new URLSearchParams(location.search).get("redirect"));

            if (redirect) {
                redirectUrl.searchParams.set("redirect", redirect);
            }

            return redirectUrl.toString();
        },

        async getSession() {
            if (!this.isReady()) return null;
            const { data, error } = await this.client.auth.getSession();
            if (error) throw error;
            return data.session;
        },

        async signInWithGoogle() {
            if (!this.isReady()) {
                throw new Error("Supabase no esta configurado todavia.");
            }

            const { error } = await this.client.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: this.getRedirectUrl(),
                    queryParams: {
                        prompt: "select_account"
                    }
                }
            });

            if (error) throw error;
        },

        async signOut() {
            if (!this.isReady()) return;
            const { error } = await this.client.auth.signOut();
            if (error) throw error;
            window.location.href = "index.html";
        },

        getUserName(user) {
            if (!user) return "Cuenta";
            return (
                user.user_metadata?.full_name ||
                user.user_metadata?.name ||
                user.email ||
                "Cuenta"
            );
        },

        renderSignedOut(slot) {
            slot.innerHTML = '<a class="btn btn-secondary btn-nav-auth" href="auth.html">Ingresar</a>';
        },

        renderSignedIn(slot, session) {
            const name = Utils.escapeHTML(this.getUserName(session.user).split(" ")[0]);
            slot.innerHTML = `
                <a class="btn btn-secondary btn-nav-auth" href="profile.html">${name}</a>
                <button class="btn btn-ghost btn-nav-auth" type="button" data-auth-signout>Salir</button>
            `;
            const signOutButton = slot.querySelector("[data-auth-signout]");
            if (signOutButton) {
                signOutButton.addEventListener("click", () => this.signOut());
            }
        },

        async renderAuthSlot() {
            const slot = document.getElementById("authSlot");
            if (!slot) return;

            if (!this.isReady()) {
                this.renderSignedOut(slot);
                return;
            }

            try {
                const session = await this.getSession();
                if (session) {
                    this.renderSignedIn(slot, session);
                } else {
                    this.renderSignedOut(slot);
                }
            } catch (error) {
                console.error("No se pudo leer la sesion:", error);
                this.renderSignedOut(slot);
            }
        },

        bindSignOutButtons() {
            document.querySelectorAll("[data-auth-signout]").forEach((button) => {
                button.addEventListener("click", () => this.signOut());
            });
        },

        async initAuthPage() {
            const googleButton = document.getElementById("googleLoginButton");
            const status = document.getElementById("authStatus");
            const sessionPanel = document.getElementById("authSessionPanel");
            const accountName = document.getElementById("authAccountName");
            const postLoginLink = document.getElementById("postLoginLink");

            if (!this.isReady()) {
                if (status) {
                    UI.showMessage(
                        "authStatus",
                        "<strong>Falta conectar Supabase.</strong> Completa <code>js/config.js</code> con la URL del proyecto y la anon/publishable key antes de probar el login.",
                        "warning"
                    );
                }
                if (googleButton) googleButton.disabled = true;
                return;
            }

            try {
                const session = await this.getSession();
                if (session && sessionPanel && accountName && postLoginLink) {
                    const redirect = this.normalizeRedirectPath(new URLSearchParams(location.search).get("redirect"));
                    const postLoginPath = this.getPostLoginPath();

                    if (redirect) {
                        window.location.replace(postLoginPath);
                        return;
                    }

                    accountName.textContent = this.getUserName(session.user);
                    postLoginLink.href = postLoginPath;
                    sessionPanel.classList.remove("hidden");
                    if (status) UI.hideMessage("authStatus");
                }
            } catch (error) {
                if (status) UI.showMessage("authStatus", Utils.escapeHTML(error.message), "error");
            }

            if (googleButton) {
                googleButton.addEventListener("click", async () => {
                    googleButton.disabled = true;
                    if (status) UI.showMessage("authStatus", "Abriendo Google para iniciar sesion...", "info");

                    try {
                        await this.signInWithGoogle();
                    } catch (error) {
                        googleButton.disabled = false;
                        if (status) UI.showMessage("authStatus", Utils.escapeHTML(error.message), "error");
                    }
                });
            }
        },

        listenForChanges() {
            if (!this.isReady()) return;

            this.client.auth.onAuthStateChange((_event, session) => {
                const slot = document.getElementById("authSlot");
                if (!slot) return;

                if (session) {
                    this.renderSignedIn(slot, session);
                } else {
                    this.renderSignedOut(slot);
                }
            });
        },

        async init() {
            await this.renderAuthSlot();
            this.bindSignOutButtons();
            this.listenForChanges();

            if (this.getCurrentPage() === "auth.html") {
                await this.initAuthPage();
            }
        }
    };

    window.NidoAuth = Auth;
})();
