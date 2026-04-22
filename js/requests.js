(function () {
    function clean(value) {
        return value && String(value).trim() ? String(value).trim() : null;
    }

    function findPetName(pets, petId) {
        const pet = pets.find((item) => item.id === petId);
        return pet ? pet.name : "Mascota no asociada";
    }

    function formatRange(request) {
        const start = request.date_start ? Utils.formatDate(request.date_start) : "";
        const end = request.date_end ? Utils.formatDate(request.date_end) : "";
        if (start && end) return `${start} - ${end}`;
        return start || end || "Fechas por definir";
    }

    const RequestsPage = {
        session: null,
        pets: [],
        requests: [],

        get client() {
            return window.NidoSupabase ? window.NidoSupabase.client : null;
        },

        async init() {
            const form = document.getElementById("serviceRequestForm");
            if (!form) return;
            if (!window.NidoAuth || !window.NidoAuth.isReady() || !this.client) return;

            this.session = await window.NidoAuth.getSession();
            if (!this.session) return;

            form.addEventListener("submit", (event) => this.handleSubmit(event));
            await this.loadPets();
            await this.loadRequests();
        },

        async loadPets() {
            const { data, error } = await this.client
                .from("pets")
                .select("id, name, species")
                .eq("user_id", this.session.user.id)
                .order("name", { ascending: true });

            if (error) {
                UI.showMessage("requestMsg", Utils.escapeHTML(error.message), "error");
                return;
            }

            this.pets = data || [];
            this.renderPetOptions();
        },

        renderPetOptions() {
            const select = document.getElementById("requestPetId");
            if (!select) return;

            if (!this.pets.length) {
                select.innerHTML = '<option value="">Primero registra una mascota</option>';
                return;
            }

            select.innerHTML =
                '<option value="">Seleccione una mascota</option>' +
                this.pets
                    .map((pet) => `<option value="${pet.id}">${Utils.escapeHTML(pet.name)}</option>`)
                    .join("");
        },

        async loadRequests() {
            const list = document.getElementById("requestsList");
            if (list) list.innerHTML = UI.loadingMarkup("Cargando solicitudes...");

            const { data, error } = await this.client
                .from("service_requests")
                .select("*")
                .eq("user_id", this.session.user.id)
                .order("created_at", { ascending: false });

            if (error) {
                UI.showMessage("requestMsg", Utils.escapeHTML(error.message), "error");
                return;
            }

            this.requests = data || [];
            this.renderRequests();
        },

        renderRequests() {
            const list = document.getElementById("requestsList");
            if (!list) return;

            if (!this.requests.length) {
                list.innerHTML = UI.renderEmptyState({
                    title: "Aun no hay solicitudes guardadas",
                    text: "Cuando crees una solicitud aparecera aqui con su estado inicial.",
                    buttonText: this.pets.length ? "" : "Agregar mascota",
                    buttonHref: "pets.html"
                });
                return;
            }

            list.innerHTML = this.requests.map((request) => this.requestMarkup(request)).join("");
        },

        requestMarkup(request) {
            const petName = findPetName(this.pets, request.pet_id);
            const description = request.need_description || "Sin descripcion adicional.";

            return `
                <article class="app-record-card">
                    <div class="app-record-head">
                        <div>
                            <h3>${Utils.escapeHTML(request.service_type)}</h3>
                            <div class="app-record-meta">
                                <span>${Utils.escapeHTML(petName)}</span>
                                <span>${Utils.escapeHTML(formatRange(request))}</span>
                                ${request.duration_label ? `<span>${Utils.escapeHTML(request.duration_label)}</span>` : ""}
                            </div>
                        </div>
                        ${UI.renderStatusBadge(request.status)}
                    </div>
                    <p class="section-text">${Utils.escapeHTML(description)}</p>
                    ${request.admin_notes ? `<p class="notice"><strong>Nota Nido Canino:</strong> ${Utils.escapeHTML(request.admin_notes)}</p>` : ""}
                </article>
            `;
        },

        buildPayload(form) {
            const fields = form.elements;
            return {
                user_id: this.session.user.id,
                pet_id: fields.pet_id.value || null,
                service_type: fields.service_type.value,
                date_start: fields.date_start.value || null,
                date_end: fields.date_end.value || null,
                duration_label: clean(fields.duration_label.value),
                need_description: clean(fields.need_description.value),
                status: "pending"
            };
        },

        async handleSubmit(event) {
            event.preventDefault();

            const form = event.currentTarget;
            const payload = this.buildPayload(form);
            const button = document.getElementById("saveRequestButton");

            if (!payload.service_type) {
                UI.showMessage("requestMsg", "Selecciona el servicio de interes.", "warning");
                return;
            }

            if (!payload.pet_id) {
                UI.showMessage("requestMsg", "Selecciona una mascota para asociar la solicitud.", "warning");
                return;
            }

            if (button) button.disabled = true;
            UI.showMessage("requestMsg", "Creando solicitud...", "info");

            const { error } = await this.client
                .from("service_requests")
                .insert(payload);

            if (button) button.disabled = false;

            if (error) {
                UI.showMessage("requestMsg", Utils.escapeHTML(error.message), "error");
                return;
            }

            form.reset();
            this.renderPetOptions();
            UI.showMessage("requestMsg", "Solicitud creada correctamente.", "success");
            await this.loadRequests();
        }
    };

    window.NidoRequestsPage = RequestsPage;
})();
