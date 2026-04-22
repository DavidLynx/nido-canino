(function () {
    const serviceLabels = {
        convivencia_canina: "Convivencia canina",
        evaluacion_previa: "Evaluacion previa",
        cuidado_felino: "Cuidado felino",
        asesoria: "Asesoria",
        no_definido: "No definido",
        "Convivencia canina": "Convivencia canina",
        "Formulario PRO": "Evaluacion previa",
        "Visita para gatos": "Cuidado felino"
    };

    const serviceValueMap = {
        "Convivencia canina": "convivencia_canina",
        "Formulario PRO": "evaluacion_previa",
        "Visita para gatos": "cuidado_felino"
    };

    function valueOrFallback(value, fallback = "Sin registrar") {
        return value && String(value).trim() ? value : fallback;
    }

    function normalizeServices(services = []) {
        return services.map((service) => serviceValueMap[service] || service);
    }

    function getSelectedServices() {
        return Array.from(document.querySelectorAll("[data-service-value].is-selected"))
            .map((button) => button.dataset.serviceValue);
    }

    function setSelectedServices(services = []) {
        const normalized = normalizeServices(services);
        document.querySelectorAll("[data-service-value]").forEach((button) => {
            const isSelected = normalized.includes(button.dataset.serviceValue);
            button.classList.toggle("is-selected", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });
    }

    const ProfilePage = {
        session: null,
        profile: null,

        get client() {
            return window.NidoSupabase ? window.NidoSupabase.client : null;
        },

        async init() {
            const form = document.getElementById("profileForm");
            const name = document.getElementById("profileName");
            const email = document.getElementById("profileEmail");
            const avatar = document.getElementById("profileAvatar");

            if (!form && !name && !email && !avatar) return;
            if (!window.NidoAuth || !window.NidoAuth.isReady() || !this.client) return;

            this.session = await window.NidoAuth.getSession();
            if (!this.session) return;

            this.renderAuthIdentity();
            await this.loadProfile();

            if (form) {
                form.addEventListener("submit", (event) => this.handleSubmit(event));
            }

            this.bindServiceChips();
        },

        renderAuthIdentity() {
            const user = this.session.user;
            const displayName = window.NidoAuth.getUserName(user);
            const name = document.getElementById("profileName");
            const email = document.getElementById("profileEmail");
            const avatar = document.getElementById("profileAvatar");
            const fullNameInput = document.getElementById("fullName");

            if (name) name.textContent = displayName;
            if (email) email.textContent = user.email || "Correo no disponible";
            if (fullNameInput && !fullNameInput.value) fullNameInput.value = displayName;
            if (avatar && user.user_metadata?.avatar_url) {
                avatar.src = user.user_metadata.avatar_url;
                avatar.alt = displayName;
            }
        },

        async loadProfile() {
            UI.showMessage("profileMsg", "Cargando perfil...", "info");

            const { data, error } = await this.client
                .from("profiles")
                .select("*")
                .eq("id", this.session.user.id)
                .maybeSingle();

            if (error) {
                UI.showMessage("profileMsg", Utils.escapeHTML(error.message), "error");
                return;
            }

            this.profile = data || {};
            this.fillForm();
            this.renderSummary();
            UI.hideMessage("profileMsg");
        },

        fillForm() {
            const form = document.getElementById("profileForm");
            if (!form) return;
            const fields = form.elements;

            const user = this.session.user;
            fields.full_name.value = this.profile.full_name || window.NidoAuth.getUserName(user);
            fields.phone.value = this.profile.phone || "";
            fields.city.value = this.profile.city || "Bogota";
            fields.zone.value = this.profile.zone || "";
            fields.housing_type.value = this.profile.housing_type || "";
            fields.experience_level.value = this.profile.experience_level || "";
            fields.has_other_pets.checked = Boolean(this.profile.has_other_pets);
            fields.notes.value = this.profile.notes || "";
            setSelectedServices(this.profile.preferred_services || []);
        },

        renderSummary() {
            const user = this.session.user;
            const displayName = this.profile.full_name || window.NidoAuth.getUserName(user);
            const name = document.getElementById("profileName");
            const phone = document.getElementById("profilePhoneView");
            const zone = document.getElementById("profileZoneView");
            const services = document.getElementById("profileServicesView");

            if (name) name.textContent = displayName;
            if (phone) phone.textContent = valueOrFallback(this.profile.phone);
            if (zone) zone.textContent = valueOrFallback(this.profile.zone);
            if (services) {
                services.textContent = this.profile.preferred_services?.length
                    ? normalizeServices(this.profile.preferred_services).map((service) => serviceLabels[service] || service).join(", ")
                    : "Sin registrar";
            }
        },

        bindServiceChips() {
            document.querySelectorAll("[data-service-value]").forEach((button) => {
                button.addEventListener("click", () => {
                    const nextState = !button.classList.contains("is-selected");

                    if (button.dataset.serviceValue === "no_definido" && nextState) {
                        setSelectedServices([]);
                    }

                    if (button.dataset.serviceValue !== "no_definido" && nextState) {
                        const undefinedButton = document.querySelector('[data-service-value="no_definido"]');
                        undefinedButton?.classList.remove("is-selected");
                        undefinedButton?.setAttribute("aria-pressed", "false");
                    }

                    button.classList.toggle("is-selected", nextState);
                    button.setAttribute("aria-pressed", String(nextState));
                });
            });
        },

        buildPayload(form) {
            const fields = form.elements;

            return {
                id: this.session.user.id,
                full_name: fields.full_name.value.trim(),
                phone: fields.phone.value.trim() || null,
                city: fields.city.value.trim() || "Bogota",
                zone: fields.zone.value.trim() || null,
                housing_type: fields.housing_type.value || null,
                has_other_pets: fields.has_other_pets.checked,
                experience_level: fields.experience_level.value || null,
                preferred_services: getSelectedServices(),
                notes: fields.notes.value.trim() || null
            };
        },

        async handleSubmit(event) {
            event.preventDefault();

            const form = event.currentTarget;
            const button = document.getElementById("profileSaveButton");
            const payload = this.buildPayload(form);

            if (!payload.full_name) {
                UI.showMessage("profileMsg", "Escribe tu nombre completo para guardar el perfil.", "warning");
                return;
            }

            if (button) button.disabled = true;
            UI.showMessage("profileMsg", "Guardando perfil...", "info");

            const { data, error } = await this.client
                .from("profiles")
                .upsert(payload, { onConflict: "id" })
                .select()
                .single();

            if (button) button.disabled = false;

            if (error) {
                UI.showMessage("profileMsg", Utils.escapeHTML(error.message), "error");
                return;
            }

            this.profile = data;
            this.renderSummary();
            UI.showMessage("profileMsg", "Perfil guardado correctamente.", "success");
        }
    };

    window.NidoProfilePage = ProfilePage;
})();
