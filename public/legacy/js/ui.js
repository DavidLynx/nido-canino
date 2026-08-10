window.UI = {
    showMessage(targetId, message, kind = "info") {
        const el = document.getElementById(targetId);
        if (!el) return;

        const allowedKinds = ["info", "success", "error", "warning"];
        const safeKind = allowedKinds.includes(kind) ? kind : "info";

        el.className = `notice ${safeKind}`;
        el.innerHTML = message;
        el.classList.remove("hidden");
    },

    hideMessage(targetId) {
        const el = document.getElementById(targetId);
        if (!el) return;

        el.className = "hidden";
        el.innerHTML = "";
    },

    renderEmptyState({
        title = "No hay información disponible",
        text = "Todavía no hay contenido para mostrar en esta sección.",
        buttonText = "",
        buttonHref = "#"
    } = {}) {
        const buttonHTML = buttonText
            ? `<a class="btn btn-primary" href="${buttonHref}">${Utils.escapeHTML(buttonText)}</a>`
            : "";

        return `
      <div class="empty-state">
        <h3>${Utils.escapeHTML(title)}</h3>
        <p>${Utils.escapeHTML(text)}</p>
        ${buttonHTML}
      </div>
    `;
    },

    renderStatusBadge(status = "pending") {
        const safeStatus = Utils.createStatusClass(status);

        const labels = {
            pending: "Pendiente",
            contacted: "Contactado",
            confirmed: "Confirmado",
            cancelled: "Cancelado"
        };

        return `
      <span class="status ${safeStatus}">
        ${labels[safeStatus] || "Pendiente"}
      </span>
    `;
    },

    loadingMarkup(text = "Cargando...") {
        return `
      <div class="card center" style="min-height: 140px;">
        <p class="muted">${Utils.escapeHTML(text)}</p>
      </div>
    `;
    },

    imageFallbackMarkup(label = "Imagen") {
        return `
      <div class="image-placeholder">
        <span>${Utils.escapeHTML(label)}</span>
      </div>
    `;
    }
};