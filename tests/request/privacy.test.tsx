// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PrivacyPage, { metadata } from "@/app/privacidad/page";
import RequestPage from "@/app/request/page";
import { Footer } from "@/components/footer";
import { getPrivacyPolicy } from "@/lib/lynx/config";

afterEach(cleanup);

describe("published privacy policy", () => {
  it("renders the policy, 16 sections and usable contents links", () => {
    render(<PrivacyPage />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Política de Tratamiento de Datos Personales y Privacidad");
    const sections = document.querySelectorAll("article > section");
    expect(sections).toHaveLength(16);
    const links = within(screen.getByRole("navigation", { name: "Contenido de la política" })).getAllByRole("link");
    expect(links).toHaveLength(16);
    for (const link of links) expect(document.querySelector(link.getAttribute("href")!)).not.toBeNull();
    expect(metadata.alternates).toEqual({ canonical: "/privacidad" });
  });
  it("identifies the natural-person responsible and approved contacts without invented identifiers", () => {
    render(<PrivacyPage />);
    const responsible = screen.getByRole("region", { name: "1. Identificación del responsable" });
    expect(responsible.textContent).toContain("Alba Lilian Deaza Alfonso");
    expect(responsible.textContent).toContain("persona natural");
    expect(responsible.textContent).toContain("Calle 23D No. 72B-20, Bogotá D.C., Colombia");
    expect(within(responsible).getByRole("link", { name: "+57 312 461 1816" }).getAttribute("href")).toBe("tel:+573124611816");
    expect(within(responsible).getByRole("link", { name: "bienestar@nidocanino.org" }).getAttribute("href")).toBe("mailto:bienestar@nidocanino.org");
    const channels = screen.getByRole("region", { name: "10. Canal de atención" });
    expect(within(channels).getByRole("link", { name: "bienestar@nidocanino.org" }).getAttribute("href")).toBe("mailto:bienestar@nidocanino.org");
    expect(screen.getByRole("article").innerHTML).not.toContain("privacidad@nidocanino.org");
    expect(screen.getByRole("article").textContent).not.toMatch(/\bNIT\b|cédula|S\.A\.S\.?|registro mercantil|\d{8,}/i);
    expect(screen.getByRole("region", { name: "10. Canal de atención" }).textContent).toContain("Puede presentar sus solicitudes relacionadas con protección de datos personales mediante cualquiera de los canales indicados.");
    expect(screen.getByRole("article").textContent).not.toMatch(/pendiente|no existe|no está (?:configurado|operativo)|configuración operativa|mientras se habilita|será el canal formal/i);
  });
  it("explicitly describes manual and automated processing operations", () => {
    render(<PrivacyPage />);
    expect(screen.getByRole("region", { name: "3. Datos que puede tratar Nido" }).textContent).toContain("El tratamiento podrá realizarse por medios manuales y automatizados e incluir, según corresponda, la recolección, almacenamiento, organización, actualización, consulta, uso, circulación, transmisión y supresión de la información.");
  });
  it("documents the approved operational privacy contact without the old mailbox blocker", () => {
    const documentation = readFileSync("docs/NIDO_REQUEST_LYNX.md", "utf8").replace(/\s+/g, " ");
    expect(documentation).toContain("`bienestar@nidocanino.org` is the approved operational privacy contact for go-live.");
    expect(documentation).toContain("This mailbox must remain operational and monitored.");
    expect(documentation).not.toContain("privacidad@nidocanino.org");
  });
  it("shows the exact version, effective date and Colombian procedures", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("1.0")).toBeTruthy();
    expect(screen.getByText("NIDO-PDP")).toBeTruthy();
    expect(screen.getByText("Identificador de esta versión: NIDO-PDP-1.0-2026-09-02")).toBeTruthy();
    const dates = screen.getAllByText("2 de septiembre de 2026");
    expect(dates).toHaveLength(2);
    for (const date of dates) expect(date.getAttribute("datetime")).toBe("2026-09-02");
    const consultation = screen.getByRole("region", { name: "11. Procedimiento para consultas" }).textContent;
    expect(consultation).toContain("10 días hábiles desde su recepción");
    expect(consultation).toContain("5 días hábiles adicionales");
    const complaint = screen.getByRole("region", { name: "12. Procedimiento para reclamos" }).textContent;
    for (const text of ["15 días hábiles desde el día siguiente a la recepción completa", "8 días hábiles adicionales", "5 días siguientes", "2 meses", "2 días hábiles", "reclamo en trámite"]) expect(complaint).toContain(text);
    expect(screen.getByRole("article").textContent).not.toMatch(/GDPR|CCPA|DPO|cualquier otra finalidad|seguridad absoluta garantizada/);
  });
  it.each([
    ["NIDO-PDP-1.0-2026-09-02", "https://nidocanino.org/privacidad"],
    ["TEST-ANOTHER-POLICY", "https://example.test/configured-policy"],
  ])("request receives version %s and URL from configuration, not server constants", (version, url) => {
    vi.stubEnv("NIDO_PRIVACY_POLICY_VERSION", version);
    vi.stubEnv("NIDO_PRIVACY_POLICY_URL", url);
    expect(getPrivacyPolicy()).toEqual({ version, url });
    expect(RequestPage().props.privacyPolicy).toEqual({ version, url });
  });
  it("footer adds privacy without replacing existing links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Privacidad y tratamiento de datos" }).getAttribute("href")).toBe("/privacidad");
    expect(screen.getByRole("link", { name: "Términos y condiciones" }).getAttribute("href")).toBe("#");
    for (const name of ["Instagram de Nido Canino", "TikTok de Nido Canino", "WhatsApp de Nido Canino"]) expect(screen.getByRole("link", { name })).toBeTruthy();
  });
});
