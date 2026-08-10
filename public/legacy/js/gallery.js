(function () {
    const GalleryPage = {
        items: [],
        activeItemIndex: 0,
        activePhotoIndex: 0,

        init() {
            const grid = document.getElementById("galleryGrid");
            if (!grid) return;

            this.items = window.NIDO_GALLERY || [];
            this.renderGrid(grid);
            this.bindLightbox();
        },

        renderGrid(grid) {
            if (!this.items.length) {
                grid.innerHTML = UI.renderEmptyState({
                    title: "Aun no hay recuerdos publicados",
                    text: "Pronto compartiremos momentos reales de la familia Nido."
                });
                return;
            }

            grid.innerHTML = this.items
                .map((item, index) => this.cardMarkup(item, index))
                .join("");

            grid.querySelectorAll("[data-gallery-card]").forEach((card) => {
                card.addEventListener("click", () => this.openLightbox(Number(card.dataset.galleryCard), 0));
                card.addEventListener("keydown", (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        this.openLightbox(Number(card.dataset.galleryCard), 0);
                    }
                });
            });
        },

        cardMarkup(item, index) {
            return `
                <article class="gallery-card" data-gallery-card="${index}" tabindex="0" role="button" aria-label="Ver fotos de ${Utils.escapeHTML(item.name)}">
                    <img src="${Utils.escapeHTML(item.cover)}" alt="${Utils.escapeHTML(item.name)} en Nido Canino" loading="lazy" />
                    <div class="gallery-card-overlay">
                        <span>${Utils.escapeHTML(item.badge)}</span>
                        <h3>${Utils.escapeHTML(item.name)}</h3>
                        <p>${Utils.escapeHTML(item.description)}</p>
                    </div>
                </article>
            `;
        },

        bindLightbox() {
            const closeButton = document.getElementById("galleryClose");
            const prevButton = document.getElementById("galleryPrev");
            const nextButton = document.getElementById("galleryNext");
            const backdrop = document.getElementById("galleryLightbox");

            closeButton?.addEventListener("click", () => this.closeLightbox());
            prevButton?.addEventListener("click", () => this.showPhoto(this.activePhotoIndex - 1));
            nextButton?.addEventListener("click", () => this.showPhoto(this.activePhotoIndex + 1));

            backdrop?.addEventListener("click", (event) => {
                if (event.target === backdrop) this.closeLightbox();
            });

            document.addEventListener("keydown", (event) => {
                if (!backdrop || backdrop.classList.contains("hidden")) return;
                if (event.key === "Escape") this.closeLightbox();
                if (event.key === "ArrowLeft") this.showPhoto(this.activePhotoIndex - 1);
                if (event.key === "ArrowRight") this.showPhoto(this.activePhotoIndex + 1);
            });
        },

        openLightbox(itemIndex, photoIndex) {
            this.activeItemIndex = itemIndex;
            this.activePhotoIndex = photoIndex;
            const backdrop = document.getElementById("galleryLightbox");
            backdrop?.classList.remove("hidden");
            if (backdrop) backdrop.scrollTop = 0;
            document.body.classList.add("gallery-lock");
            this.showPhoto(photoIndex);
        },

        closeLightbox() {
            document.getElementById("galleryLightbox")?.classList.add("hidden");
            document.body.classList.remove("gallery-lock");
        },

        showPhoto(index) {
            const item = this.items[this.activeItemIndex];
            if (!item) return;

            const total = item.photos.length;
            this.activePhotoIndex = (index + total) % total;

            const image = document.getElementById("galleryImage");
            const title = document.getElementById("galleryTitle");
            const text = document.getElementById("galleryText");
            const count = document.getElementById("galleryCount");

            if (image) {
                image.decoding = "async";
                image.src = item.photos[this.activePhotoIndex];
                image.alt = `${item.name} en Nido Canino`;
            }
            if (title) title.textContent = item.name;
            if (text) text.textContent = item.description;
            if (count) count.textContent = `${this.activePhotoIndex + 1} / ${total}`;

            this.preloadPhoto((this.activePhotoIndex + 1) % total);
        },

        preloadPhoto(index) {
            const item = this.items[this.activeItemIndex];
            if (!item || !item.photos[index]) return;

            const image = new Image();
            image.decoding = "async";
            image.src = item.photos[index];
        }
    };

    window.NidoGalleryPage = GalleryPage;
})();
