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

        getAuthEmailRedirectUrl() {
            return `${window.location.origin}/auth.html`;
        },

        async getSession() {
            if (!this.isReady()) return null;
            const { data, error } = await this.client.auth.getSession();
            if (error) throw error;
            return data.session;
        },

        async signUpWithEmail(email, password) {
            if (!this.isReady()) {
                throw new Error("Supabase no esta configurado todavia.");
            }

            const { data, error } = await this.client.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: this.getAuthEmailRedirectUrl()
                }
            });

            if (error) throw error;
            return data;
        },

        async signInWithEmail(email, password) {
            if (!this.isReady()) {
                throw new Error("Supabase no esta configurado todavia.");
            }

            const { data, error } = await this.client.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            return data;
        },

        async sendMagicLink(email) {
            if (!this.isReady()) {
                throw new Error("Supabase no esta configurado todavia.");
            }

            // Supabase dashboard: Email provider enabled, Site URL set to production,
            // /auth.html included in Redirect URLs, and the Magic Link or OTP email
            // template includes {{ .ConfirmationURL }} for clickable magic links.
            const { data, error } = await this.client.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: this.getAuthEmailRedirectUrl(),
                    shouldCreateUser: true
                }
            });

            if (error) throw error;
            return data;
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

        getFriendlyError(error) {
            const message = String(error?.message || "").toLowerCase();
            const status = error?.status;

            if (message.includes("invalid login credentials")) {
                return "El correo o la contraseña no son correctos.";
            }

            if (message.includes("email not confirmed") || message.includes("not confirmed")) {
                return "Revise su correo y confirme su cuenta antes de ingresar.";
            }

            if (message.includes("password") && (message.includes("weak") || message.includes("short") || message.includes("characters"))) {
                return "La contraseña debe cumplir los requisitos mínimos.";
            }

            if (status === 429 || message.includes("rate limit") || message.includes("too many requests") || message.includes("over_email_send_rate_limit")) {
                return "Espere un momento antes de solicitar otro enlace.";
            }

            if (message.includes("signup disabled")) {
                return "El registro de cuentas no esta disponible en este momento.";
            }

            if (message.includes("network") || message.includes("failed to fetch")) {
                return "No pudimos conectar con el servicio de autenticacion. Intente de nuevo.";
            }

            return "No pudimos completar la solicitud. Revise los datos e intente nuevamente.";
        },

        getAuthEmailValue() {
            const emailInput = document.getElementById("authEmail");
            return emailInput ? emailInput.value.trim() : "";
        },

        getAuthPasswordValue() {
            const passwordInput = document.getElementById("authPassword");
            return passwordInput ? passwordInput.value : "";
        },

        isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },

        validateEmail() {
            const email = this.getAuthEmailValue();
            if (!this.isValidEmail(email)) {
                return { ok: false, message: "Ingrese un correo válido." };
            }

            return { ok: true, email };
        },

        validatePassword() {
            const password = this.getAuthPasswordValue();
            if (!password) {
                return { ok: false, message: "Ingrese una contraseña." };
            }

            if (password.length < 6) {
                return { ok: false, message: "La contraseña debe cumplir los requisitos mínimos." };
            }

            return { ok: true, password };
        },

        setAuthButtonsLoading(isLoading) {
            [
                "emailLoginButton",
                "emailSignupButton",
                "magicLinkButton",
                "googleLoginButton"
            ].forEach((id) => {
                const button = document.getElementById(id);
                if (button) button.disabled = isLoading;
            });
        },

        redirectAfterLogin() {
            window.location.replace(this.getPostLoginPath());
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

        getNavProfileLabel(user) {
            const profileName = user?.user_metadata?.full_name || user?.user_metadata?.name;
            if (!profileName) return "Perfil";
            return profileName.split(" ")[0] || "Perfil";
        },

        renderSignedOut(slot) {
            slot.innerHTML = '<a class="btn btn-secondary btn-nav-auth" href="auth.html">Ingresar</a>';
        },

        renderSignedIn(slot, session) {
            const name = Utils.escapeHTML(this.getNavProfileLabel(session.user));
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
            const emailForm = document.getElementById("emailAuthForm");
            const emailSignupButton = document.getElementById("emailSignupButton");
            const magicLinkButton = document.getElementById("magicLinkButton");
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
                this.setAuthButtonsLoading(true);
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
                if (status) UI.showMessage("authStatus", Utils.escapeHTML(this.getFriendlyError(error)), "error");
            }

            const handleEmailLogin = async () => {
                const emailCheck = this.validateEmail();
                if (!emailCheck.ok) {
                    UI.showMessage("authStatus", Utils.escapeHTML(emailCheck.message), "error");
                    return;
                }

                const passwordCheck = this.validatePassword();
                if (!passwordCheck.ok) {
                    UI.showMessage("authStatus", Utils.escapeHTML(passwordCheck.message), "error");
                    return;
                }

                this.setAuthButtonsLoading(true);
                UI.showMessage("authStatus", "Validando acceso seguro...", "info");

                try {
                    const data = await this.signInWithEmail(emailCheck.email, passwordCheck.password);
                    if (data.session) {
                        this.redirectAfterLogin();
                        return;
                    }

                    UI.showMessage("authStatus", "Revise su correo y confirme su cuenta antes de ingresar.", "warning");
                } catch (error) {
                    UI.showMessage("authStatus", Utils.escapeHTML(this.getFriendlyError(error)), "error");
                } finally {
                    this.setAuthButtonsLoading(false);
                }
            };

            if (emailForm) {
                emailForm.addEventListener("submit", async (event) => {
                    event.preventDefault();
                    await handleEmailLogin();
                });
            }

            if (emailSignupButton) {
                emailSignupButton.addEventListener("click", async () => {
                    const emailCheck = this.validateEmail();
                    if (!emailCheck.ok) {
                        UI.showMessage("authStatus", Utils.escapeHTML(emailCheck.message), "error");
                        return;
                    }

                    const passwordCheck = this.validatePassword();
                    if (!passwordCheck.ok) {
                        UI.showMessage("authStatus", Utils.escapeHTML(passwordCheck.message), "error");
                        return;
                    }

                    this.setAuthButtonsLoading(true);
                    UI.showMessage("authStatus", "Creando cuenta segura...", "info");

                    try {
                        const data = await this.signUpWithEmail(emailCheck.email, passwordCheck.password);
                        if (data.session) {
                            this.redirectAfterLogin();
                            return;
                        }

                        UI.showMessage("authStatus", "Revise su correo para confirmar la cuenta antes de ingresar.", "success");
                    } catch (error) {
                        UI.showMessage("authStatus", Utils.escapeHTML(this.getFriendlyError(error)), "error");
                    } finally {
                        this.setAuthButtonsLoading(false);
                    }
                });
            }

            if (magicLinkButton) {
                magicLinkButton.addEventListener("click", async () => {
                    const emailCheck = this.validateEmail();
                    if (!emailCheck.ok) {
                        UI.showMessage("authStatus", Utils.escapeHTML(emailCheck.message), "error");
                        return;
                    }

                    this.setAuthButtonsLoading(true);
                    UI.showMessage("authStatus", "Enviando enlace seguro...", "info");

                    try {
                        await this.sendMagicLink(emailCheck.email);
                        UI.showMessage("authStatus", "Le enviamos un enlace de acceso a su correo. Revise también spam o promociones.", "success");
                    } catch (error) {
                        UI.showMessage("authStatus", Utils.escapeHTML(this.getFriendlyError(error)), "error");
                    } finally {
                        this.setAuthButtonsLoading(false);
                    }
                });
            }

            if (googleButton) {
                googleButton.addEventListener("click", async () => {
                    this.setAuthButtonsLoading(true);
                    if (status) UI.showMessage("authStatus", "Abriendo Google para iniciar sesión...", "info");

                    try {
                        await this.signInWithGoogle();
                    } catch (error) {
                        this.setAuthButtonsLoading(false);
                        if (status) UI.showMessage("authStatus", Utils.escapeHTML(this.getFriendlyError(error)), "error");
                    }
                });
            }
        },

        listenForChanges() {
            if (!this.isReady()) return;

            this.client.auth.onAuthStateChange((event, session) => {
                const slot = document.getElementById("authSlot");

                if (slot && session) {
                    this.renderSignedIn(slot, session);
                } else if (slot) {
                    this.renderSignedOut(slot);
                }

                if (session && event === "SIGNED_IN" && this.getCurrentPage() === "auth.html") {
                    this.redirectAfterLogin();
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
