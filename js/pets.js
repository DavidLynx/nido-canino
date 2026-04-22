(function () {
    const dogBreeds = [
        "Criollo / Mestizo",
        "Labrador Retriever",
        "Golden Retriever",
        "French Bulldog",
        "Bulldog Ingles",
        "Pug",
        "Beagle",
        "Schnauzer",
        "Poodle / Caniche",
        "Pastor Aleman",
        "Border Collie",
        "Yorkshire Terrier",
        "Shih Tzu",
        "Chihuahua",
        "Cocker Spaniel",
        "Jack Russell Terrier",
        "Boston Terrier",
        "Pinscher Miniatura",
        "Rottweiler",
        "Doberman",
        "Husky Siberiano",
        "Samoyedo",
        "Akita",
        "American Bully",
        "Pitbull",
        "Boxer",
        "Dalmata",
        "Bernes de la Montana",
        "Cane Corso",
        "Bichon Frise",
        "Maltes",
        "Dachshund / Salchicha",
        "Weimaraner",
        "Pointer",
        "Setter",
        "Otra"
    ];

    const catBreeds = [
        "Criollo / Mestizo",
        "Siames",
        "Persa",
        "Angora",
        "Bengali",
        "Maine Coon",
        "Ragdoll",
        "Azul Ruso",
        "British Shorthair",
        "Sphynx",
        "Scottish Fold",
        "Otra"
    ];

    const speciesLabels = {
        dog: "Perro",
        cat: "Gato"
    };

    const sexLabels = {
        female: "Hembra",
        male: "Macho"
    };

    const defaultIcons = {
        dog: "assets/icons/dog-calm.png",
        cat: "assets/icons/cat-calm.png"
    };

    function clean(value) {
        return value && String(value).trim() ? String(value).trim() : null;
    }

    function field(form, name) {
        return form.elements.namedItem(name);
    }

    function meta(value) {
        return value ? `<span>${Utils.escapeHTML(value)}</span>` : "";
    }

    function getBreedCatalog(species) {
        return species === "cat" ? catBreeds : dogBreeds;
    }

    function displayBreed(pet) {
        if (pet.breed === "Otra" && pet.breed_custom) return pet.breed_custom;
        return pet.breed_custom || pet.breed || "Raza no indicada";
    }

    function petIcon(pet) {
        return pet.photo_url || defaultIcons[pet.species] || defaultIcons.dog;
    }

    function fallbackIcon(species) {
        return defaultIcons[species] || defaultIcons.dog;
    }

    const PetsPage = {
        session: null,
        pets: [],

        get client() {
            return window.NidoSupabase ? window.NidoSupabase.client : null;
        },

        async init() {
            const form = document.getElementById("petForm");
            if (!form) return;
            if (!window.NidoAuth || !window.NidoAuth.isReady() || !this.client) return;

            this.session = await window.NidoAuth.getSession();
            if (!this.session) return;

            document.getElementById("newPetButton")?.addEventListener("click", () => this.openForm());
            document.getElementById("cancelPetButton")?.addEventListener("click", () => this.closeForm());
            field(form, "species")?.addEventListener("change", () => {
                field(form, "breed_custom").value = "";
                this.populateBreedOptions("Criollo / Mestizo");
            });
            field(form, "breed")?.addEventListener("change", () => this.toggleBreedCustom());
            form.addEventListener("submit", (event) => this.handleSubmit(event));

            this.populateBreedOptions();
            await this.loadPets();
        },

        populateBreedOptions(selectedBreed = "") {
            const form = document.getElementById("petForm");
            if (!form) return;

            const species = field(form, "species").value || "dog";
            const breedSelect = field(form, "breed");
            const catalog = getBreedCatalog(species);
            const current = selectedBreed || breedSelect.value || catalog[0];
            const normalized = catalog.includes(current) ? current : "Otra";

            breedSelect.innerHTML = catalog
                .map((breed) => `<option value="${Utils.escapeHTML(breed)}">${Utils.escapeHTML(breed)}</option>`)
                .join("");
            breedSelect.value = normalized;
            this.toggleBreedCustom();
        },

        toggleBreedCustom() {
            const form = document.getElementById("petForm");
            const wrapper = document.getElementById("breedCustomField");
            if (!form || !wrapper) return;
            wrapper.classList.toggle("hidden", field(form, "breed").value !== "Otra");
        },

        async loadPets() {
            UI.showMessage("petMsg", "Cargando mascotas...", "info");

            const { data, error } = await this.client
                .from("pets")
                .select("*")
                .eq("user_id", this.session.user.id)
                .order("created_at", { ascending: false });

            if (error) {
                UI.showMessage("petMsg", Utils.escapeHTML(error.message), "error");
                return;
            }

            this.pets = data || [];
            this.renderPets();
            UI.hideMessage("petMsg");
        },

        renderPets() {
            const list = document.getElementById("petsList");
            if (!list) return;

            if (!this.pets.length) {
                list.innerHTML = UI.renderEmptyState({
                    title: "Aun no hay mascotas guardadas",
                    text: "Crea la primera ficha para ordenar cuidados, solicitudes y compatibilidad.",
                    buttonText: "Crear primera mascota",
                    buttonHref: "#"
                });
                list.querySelector("a")?.addEventListener("click", (event) => {
                    event.preventDefault();
                    this.openForm();
                });
                return;
            }

            list.innerHTML = this.pets.map((pet) => this.petMarkup(pet)).join("");
            list.querySelectorAll("[data-edit-pet]").forEach((button) => {
                button.addEventListener("click", () => this.openForm(button.dataset.editPet));
            });
            list.querySelectorAll("[data-delete-pet]").forEach((button) => {
                button.addEventListener("click", () => this.deletePet(button.dataset.deletePet));
            });
        },

        petMarkup(pet) {
            const title = Utils.escapeHTML(pet.name);
            const species = speciesLabels[pet.species] || pet.species;
            const breed = displayBreed(pet);
            const age = pet.age_text || (pet.birth_date ? Utils.formatDate(pet.birth_date) : "");
            const weight = pet.weight_kg ? `${pet.weight_kg} kg` : "";
            const notes = pet.temperament || pet.behavior_notes || pet.special_care_notes || pet.care_notes || "Sin notas detalladas todavia.";
            const icon = petIcon(pet);
            const fallback = fallbackIcon(pet.species);

            return `
                <article class="app-record-card pet-record">
                    <img class="pet-record-icon" src="${Utils.escapeHTML(icon)}" alt="${title}" onerror="this.src='${fallback}';" />
                    <div class="pet-record-body">
                        <div class="pet-record-title">
                            <div>
                                <h3>${title}</h3>
                                <div class="app-record-meta">
                                    ${meta(species)}
                                    ${meta(breed)}
                                    ${meta(sexLabels[pet.sex] || "")}
                                    ${meta(age)}
                                    ${meta(weight)}
                                    ${meta(pet.size_category)}
                                    ${meta(pet.energy_level ? `Energia ${pet.energy_level}` : "")}
                                </div>
                            </div>
                            <div class="app-record-actions">
                                <button class="btn btn-secondary" type="button" data-edit-pet="${pet.id}">Editar</button>
                                <button class="btn btn-ghost" type="button" data-delete-pet="${pet.id}">Eliminar</button>
                            </div>
                        </div>
                        <p class="section-text">${Utils.escapeHTML(notes)}</p>
                    </div>
                </article>
            `;
        },

        openForm(id = "") {
            const form = document.getElementById("petForm");
            if (!form) return;

            form.reset();
            field(form, "id").value = "";
            field(form, "species").value = "dog";
            this.populateBreedOptions("Criollo / Mestizo");
            document.getElementById("petFormMode").textContent = "Nueva ficha";
            document.getElementById("petFormTitle").textContent = "Agregar mascota";

            if (id) {
                const pet = this.pets.find((item) => item.id === id);
                if (pet) this.fillForm(pet);
            }

            form.classList.remove("hidden");
            form.scrollIntoView({ behavior: "smooth", block: "start" });
        },

        closeForm() {
            const form = document.getElementById("petForm");
            if (!form) return;
            form.reset();
            form.classList.add("hidden");
        },

        fillForm(pet) {
            const form = document.getElementById("petForm");
            field(form, "id").value = pet.id;
            field(form, "name").value = pet.name || "";
            field(form, "species").value = pet.species || "dog";
            this.populateBreedOptions(pet.breed || "Criollo / Mestizo");
            field(form, "breed_custom").value = pet.breed_custom || (!getBreedCatalog(pet.species).includes(pet.breed) ? pet.breed || "" : "");
            this.toggleBreedCustom();
            field(form, "sex").value = pet.sex || "";
            field(form, "age_text").value = pet.age_text || "";
            field(form, "birth_date").value = pet.birth_date || "";
            field(form, "weight_kg").value = pet.weight_kg || "";
            field(form, "is_neutered").checked = Boolean(pet.is_neutered);
            field(form, "energy_level").value = pet.energy_level || "";
            field(form, "size_category").value = pet.size_category || "";
            field(form, "vaccines_up_to_date").checked = Boolean(pet.vaccines_up_to_date);
            field(form, "deworming_up_to_date").checked = Boolean(pet.deworming_up_to_date);
            field(form, "temperament").value = pet.temperament || "";
            field(form, "medical_notes").value = pet.medical_notes || "";
            field(form, "medications").value = pet.medications || "";
            field(form, "behavior_notes").value = pet.behavior_notes || "";
            field(form, "feeding_notes").value = pet.feeding_notes || "";
            field(form, "special_care_notes").value = pet.special_care_notes || pet.care_notes || "";
            field(form, "photo_url").value = pet.photo_url || "";
            document.getElementById("petFormMode").textContent = "Editar ficha";
            document.getElementById("petFormTitle").textContent = `Editar ${pet.name}`;
        },

        buildPayload(form) {
            const weightValue = field(form, "weight_kg").value;
            const weight = weightValue ? Number(weightValue) : null;
            const breed = field(form, "breed").value || null;
            const breedCustom = breed === "Otra" ? clean(field(form, "breed_custom").value) : null;

            return {
                user_id: this.session.user.id,
                name: field(form, "name").value.trim(),
                species: field(form, "species").value,
                breed,
                breed_custom: breedCustom,
                sex: field(form, "sex").value || null,
                age_text: clean(field(form, "age_text").value),
                birth_date: field(form, "birth_date").value || null,
                weight_kg: Number.isFinite(weight) ? weight : null,
                is_neutered: field(form, "is_neutered").checked,
                energy_level: field(form, "energy_level").value || null,
                size_category: field(form, "size_category").value || null,
                vaccines_up_to_date: field(form, "vaccines_up_to_date").checked,
                deworming_up_to_date: field(form, "deworming_up_to_date").checked,
                temperament: clean(field(form, "temperament").value),
                medical_notes: clean(field(form, "medical_notes").value),
                medications: clean(field(form, "medications").value),
                behavior_notes: clean(field(form, "behavior_notes").value),
                feeding_notes: clean(field(form, "feeding_notes").value),
                special_care_notes: clean(field(form, "special_care_notes").value),
                photo_url: clean(field(form, "photo_url").value)
            };
        },

        async handleSubmit(event) {
            event.preventDefault();

            const form = event.currentTarget;
            const id = field(form, "id").value;
            const payload = this.buildPayload(form);
            const button = document.getElementById("savePetButton");

            if (!payload.name) {
                UI.showMessage("petMsg", "Escribe el nombre de la mascota.", "warning");
                return;
            }

            if (payload.breed === "Otra" && !payload.breed_custom) {
                UI.showMessage("petMsg", "Escribe la raza o mezcla cuando selecciones Otra.", "warning");
                return;
            }

            if (button) button.disabled = true;
            UI.showMessage("petMsg", "Guardando mascota...", "info");

            const query = id
                ? this.client.from("pets").update(payload).eq("id", id).select().single()
                : this.client.from("pets").insert(payload).select().single();

            const { error } = await query;
            if (button) button.disabled = false;

            if (error) {
                UI.showMessage("petMsg", Utils.escapeHTML(error.message), "error");
                return;
            }

            this.closeForm();
            UI.showMessage("petMsg", "Mascota guardada correctamente.", "success");
            await this.loadPets();
        },

        async deletePet(id) {
            const pet = this.pets.find((item) => item.id === id);
            if (!pet) return;

            const confirmed = window.confirm(`Eliminar la ficha de ${pet.name}?`);
            if (!confirmed) return;

            UI.showMessage("petMsg", "Eliminando mascota...", "info");
            const { error } = await this.client.from("pets").delete().eq("id", id);

            if (error) {
                UI.showMessage("petMsg", Utils.escapeHTML(error.message), "error");
                return;
            }

            UI.showMessage("petMsg", "Mascota eliminada.", "success");
            await this.loadPets();
        }
    };

    window.NidoPetsPage = PetsPage;
})();
