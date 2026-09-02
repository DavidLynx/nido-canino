// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import RequestPage from "@/app/request/page";
import { RequestForm } from "@/components/request/request-form";
import { CAT_REACTIONS, DOG_RELATIONSHIPS, NEEDS, type RequestEnvelope } from "@/lib/request/contract";
import { policy } from "./fixtures";

afterEach(() => { cleanup(); vi.useRealTimers(); });
function fill(name: string, value: string) { fireEvent.change(document.getElementById(name)!, { target: { value } }); }
function next() { fireEvent.click(screen.getByRole("button", { name: "Continuar" })); }
function completeToReview(consent = true) {
  fill("full_name", "Tutor prueba"); fill("phone", "3000000000"); fill("locality", "Fontibón"); fill("zone", "Modelia"); next();
  fill("source_self_reported", "Instagram"); next(); fill("need_type", NEEDS[4]); next();
  fill("dog_1_name", "Perro prueba"); fill("dog_1_age", "3 años"); fill("dog_1_breed_or_type", "Mestizo");
  fill("dog_1_sex", "Macho"); fill("dog_1_size", "Mediano"); fill("dog_1_neutered", "Sí"); next();
  fill("dog_relationship", DOG_RELATIONSHIPS[0]); fill("cat_reaction", CAT_REACTIONS[0]); fill("bite_history", "No"); fill("special_health_need", "No"); next();
  if (consent) fireEvent.click(screen.getByRole("checkbox"));
}

describe("request UI", () => {
  it("links the approved consent to the local policy without losing the form and requires explicit acceptance", async () => {
    vi.stubEnv("NIDO_PRIVACY_POLICY_VERSION", "NIDO-PDP-1.0-2026-09-02");
    vi.stubEnv("NIDO_PRIVACY_POLICY_URL", "https://nidocanino.org/privacidad");
    const fetcher = vi.fn(async () => Response.json({ accepted: true, request_id: "req-test" }, { status: 202 }));
    vi.stubGlobal("fetch", fetcher);
    render(<RequestPage />); completeToReview(false);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false); expect(checkbox.required).toBe(true);
    const link = screen.getByRole("link", { name: "Política de Tratamiento de Datos Personales y Privacidad" });
    expect(link.getAttribute("href")).toBe("/privacidad");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(checkbox.closest("label")!.textContent).toBe("He leído la Política de Tratamiento de Datos Personales y Privacidad de Nido Canino y autorizo el tratamiento de los datos suministrados para gestionar mi solicitud, evaluar la prestación de los servicios, comunicarse conmigo y administrar la relación de servicio.");
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" })); expect(fetcher).not.toHaveBeenCalled();
    fireEvent.click(checkbox); fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" }));
    await screen.findByRole("link", { name: "Continuar por WhatsApp ↗" });
    const calls = fetcher.mock.calls as unknown as [string, RequestInit][];
    const sent = JSON.parse(String(calls[0][1].body));
    expect(sent.policy_version).toBe("NIDO-PDP-1.0-2026-09-02");
    expect(sent.answers.privacy_consent).toBe(true);
    expect(Number.isNaN(Date.parse(sent.consent_accepted_at))).toBe(false);
  });
  it("/request renders the native React form with no policy default", () => {
    vi.stubEnv("NIDO_PRIVACY_POLICY_VERSION", "");
    render(<RequestPage />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Conozcamos a su perro.");
    expect(screen.getByText(/envío está temporalmente deshabilitado/)).toBeTruthy();
    expect(document.querySelector("#whatsappRequestForm")).toBeNull();
  });
  it("shows 1, then 3, then 1 dogs; only six required basics per visible dog", () => {
    render(<RequestForm privacyPolicy={policy} />);
    fill("full_name", "Prueba"); fill("phone", "3000000000"); fill("locality", "Fontibón"); fill("zone", "Modelia"); next();
    fill("source_self_reported", "Google"); next(); fill("need_type", NEEDS[4]); next();
    expect(screen.getAllByRole("region", { name: /Perro \d/ })).toHaveLength(1);
    fill("dog_count", "3"); expect(screen.getAllByRole("region", { name: /Perro \d/ })).toHaveLength(3);
    expect(document.querySelectorAll('[name^="dog_3_"][required]')).toHaveLength(6);
    fill("dog_count", "1"); expect(document.querySelector('[name="dog_3_name"]')).toBeNull();
  });
  it("202 accepted enables canine WhatsApp and a new request starts clean", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({ accepted: true, request_id: "req-test" }, { status: 202 })));
    render(<RequestForm privacyPolicy={policy} />); completeToReview();
    expect(screen.queryByRole("link", { name: "Continuar por WhatsApp ↗" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" }));
    const link = await screen.findByRole("link", { name: "Continuar por WhatsApp ↗" });
    expect(decodeURIComponent(link.getAttribute("href")!)).toContain("nido-request-");
    fireEvent.click(screen.getByRole("button", { name: "Crear una nueva solicitud" }));
    expect((document.getElementById("full_name") as HTMLInputElement).value).toBe("");
    expect(screen.queryByRole("link", { name: "Continuar por WhatsApp ↗" })).toBeNull();
  });
  it.each([500, 409, 429, 504])("error %s retains data and does not enable canine WhatsApp", async (status) => {
    const fetcher = vi.fn(async () => Response.json({ accepted: false, code: status === 429 ? "rate_limit" : "upstream", ...(status === 429 ? { retry_after: 1 } : {}) }, { status }));
    vi.stubGlobal("fetch", fetcher);
    render(<RequestForm privacyPolicy={policy} />); completeToReview();
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" }));
    await screen.findByRole("alert");
    expect(screen.queryByRole("link", { name: "Continuar por WhatsApp ↗" })).toBeNull();
    expect(screen.getByText(/Tutor prueba · 3000000000/)).toBeTruthy();
    expect(screen.getByRole("button", { name: "Editar solicitud" })).toBeTruthy();
    const retry = screen.getByRole("button", { name: "Intentar nuevamente" });
    if (status === 429) { expect((retry as HTMLButtonElement).disabled).toBe(true); await waitFor(() => expect((retry as HTMLButtonElement).disabled).toBe(false), { timeout: 2500 }); }
    fireEvent.click(retry);
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
    const calls = fetcher.mock.calls as unknown as [string, RequestInit][];
    expect(calls[0][1].body).toBe(calls[1][1].body);
  });
  it.each([
    [400, "validation"], [422, "validation"], [401, "authorization"], [403, "authorization"],
    [503, "configuration"], [409, "conflict"], [409, "policy_changed"],
    [504, "timeout"], [502, "network"], [500, "upstream"], [502, "invalid_response"], [503, "unavailable"],
  ])("error %s (%s) offers independent edit and retry recovery", async (status, code) => {
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({ accepted: false, code }, { status: Number(status) })));
    render(<RequestForm privacyPolicy={policy} />); completeToReview(); fill("care_concern", "Conservar este contexto");
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" }));
    await screen.findByRole("alert");
    expect(screen.getByRole("button", { name: "Intentar nuevamente" })).toBeTruthy();
    expect((document.querySelector("form > fieldset") as HTMLFieldSetElement).disabled).toBe(true);
    if (["timeout", "network", "upstream", "invalid_response", "unavailable"].includes(String(code))) {
      expect(screen.getByText("Si cambia los datos, se enviará como una nueva solicitud.")).toBeTruthy();
      expect(screen.getByRole("button", { name: "Editar solicitud" }).getAttribute("aria-describedby")).toBe("edit-request-help");
    }
    expect(screen.getByText(/^Código de solicitud: nido-request-/)).toBeTruthy();
    expect(screen.getByText("Mantenga esta página abierta mientras reintenta para conservar la solicitud.")).toBeTruthy();
    expect(document.querySelector("main")!.textContent).not.toMatch(/Reintentar registro|Referencia:|idempotencia|payload|Reintente con la misma referencia/);
    fireEvent.click(screen.getByRole("button", { name: "Editar solicitud" }));
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByRole("link", { name: "Continuar por WhatsApp ↗" })).toBeNull();
    expect((document.querySelector("form > fieldset") as HTMLFieldSetElement).disabled).toBe(false);
    expect((document.getElementById("care_concern") as HTMLTextAreaElement).value).toBe("Conservar este contexto");
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(false);
    if (["authorization", "configuration"].includes(String(code))) expect(screen.getByRole("status").textContent).toContain("no está disponible temporalmente");
    fireEvent.click(screen.getByRole("button", { name: /^Ir al paso 1:/ }));
    expect((document.getElementById("full_name") as HTMLInputElement).value).toBe("Tutor prueba");
    fill("full_name", "Tutor corregido"); next();
    expect((document.getElementById("source_self_reported") as HTMLSelectElement).value).toBe("Instagram");
    fireEvent.click(screen.getByRole("button", { name: /^Ir al paso 4:/ }));
    expect((document.getElementById("dog_1_name") as HTMLInputElement).value).toBe("Perro prueba");
  });
  it.each([false, true])("edit always creates a new envelope, even with unchanged answers (changed=%s)", async (changed) => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-09-02T10:00:00Z"));
    const bodies: RequestEnvelope[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_url: string, init: RequestInit) => {
      bodies.push(JSON.parse(String(init.body)));
      return Response.json({ accepted: false, code: "validation" }, { status: 422 });
    }));
    render(<RequestForm privacyPolicy={policy} />); completeToReview();
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" })); await screen.findByRole("alert");
    fireEvent.click(screen.getByRole("button", { name: "Editar solicitud" }));
    vi.setSystemTime(new Date("2026-09-02T10:05:00Z"));
    if (changed) {
      fireEvent.click(screen.getByRole("button", { name: /^Ir al paso 1:/ })); fill("full_name", "Tutor corregido");
      fireEvent.click(screen.getByRole("button", { name: /^Ir al paso 6:/ }));
    }
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" })); await screen.findByRole("alert");
    expect(bodies).toHaveLength(2);
    expect(bodies[1].external_request_id).not.toBe(bodies[0].external_request_id);
    expect(bodies[1].submitted_at).not.toBe(bodies[0].submitted_at);
    expect(bodies[1].consent_accepted_at).not.toBe(bodies[0].consent_accepted_at);
    expect(bodies[1].attribution).toEqual(bodies[0].attribution);
    expect(bodies[1].answers).toEqual({ ...bodies[0].answers, full_name: changed ? "Tutor corregido" : "Tutor prueba" });
    fireEvent.click(screen.getByRole("button", { name: "Intentar nuevamente" })); await screen.findByRole("alert");
    expect(bodies).toHaveLength(3); expect(bodies[2]).toEqual(bodies[1]);
  });
  it("429 blocks retry and new sending during cooldown, but not editing or navigation", async () => {
    const fetcher = vi.fn(async () => Response.json({ accepted: false, code: "rate_limit", retry_after: 30 }, { status: 429 }));
    vi.stubGlobal("fetch", fetcher);
    render(<RequestForm privacyPolicy={policy} />); completeToReview();
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" })); await screen.findByRole("alert");
    expect((screen.getByRole("button", { name: "Intentar nuevamente" }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole("button", { name: "Editar solicitud" }) as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: "Editar solicitud" }));
    expect((screen.getByRole("button", { name: "Enviar solicitud" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: /^Ir al paso 1:/ })); fill("phone", "3111111111"); next();
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("¿Cómo nos conoció?");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  it("edit can jump steps, but final validation returns to incomplete fields", async () => {
    const fetcher = vi.fn(async () => Response.json({ accepted: false, code: "validation" }, { status: 400 }));
    vi.stubGlobal("fetch", fetcher);
    render(<RequestForm privacyPolicy={policy} />); completeToReview();
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" })); await screen.findByRole("alert");
    fireEvent.click(screen.getByRole("button", { name: "Editar solicitud" }));
    fireEvent.click(screen.getByRole("button", { name: /^Ir al paso 1:/ })); fill("phone", "");
    fireEvent.click(screen.getByRole("button", { name: /^Ir al paso 6:/ })); fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" }));
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Datos del tutor");
    expect(document.getElementById("phone")!.getAttribute("aria-invalid")).toBe("true");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  it("feline outlet does not submit canine intake", () => {
    const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    render(<RequestForm privacyPolicy={policy} />);
    fireEvent.click(screen.getByText("¿Busca cuidado para un gato?"));
    const link = screen.getByRole("link", { name: /Consultar cuidado felino/ });
    fireEvent.click(link);
    expect(link.getAttribute("href")).toContain("https://wa.me/"); expect(fetcher).not.toHaveBeenCalled();
  });
});
