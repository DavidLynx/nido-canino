// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { AdmissionForm } from "@/components/admission-pro/admission-form";
import { completed, pending, token } from "./fixtures";
import legacyDefinition from "./legacy-definition.json";
import { pendingSchema } from "@/lib/admission-pro/contract";

afterEach(() => { cleanup(); window.history.replaceState({}, "", "/"); });
function open(suffix = `#token=${token}`) { window.history.replaceState({}, "", `/admission-pro${suffix}`); return render(<AdmissionForm />); }
async function ready(selected?: string[]) {
  const value = pending(selected);
  const fetcher = vi.fn(async () => Response.json(value)); vi.stubGlobal("fetch", fetcher);
  open(); await screen.findByText("Información que ya tenemos"); return { value, fetcher };
}
function fillVisible(values: Record<string, unknown>) {
  for (const input of document.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("form input, form textarea, form select")) {
    if (input.id in values && input.type !== "checkbox" && input.type !== "radio") fireEvent.change(input, { target: { value: String(values[input.id]) } });
  }
}
async function completeSteps(value = pending()) {
  for (let i = 0; i < value.structure.steps.length; i++) {
    fillVisible(completed(value));
    if (i < value.structure.steps.length - 1) fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
  }
}

describe("invitation-only frontend", () => {
  it.each([2, 3])("renders and submits an invitation pinned to production generation v%s after publication", async version => {
    const original = pending();
    const value = pendingSchema.parse({ ...original, form_version: version,
      structure: version === 2 ? { ...legacyDefinition, steps: legacyDefinition.steps.filter(s => !s.id.startsWith("dog_") || s.id === "dog_1") } : original.structure });
    const fetcher = vi.fn<typeof fetch>(async () => Response.json(value)); vi.stubGlobal("fetch", fetcher);
    open(); await screen.findByText("Información que ya tenemos");
    expect(document.querySelector("#required_schedule")?.tagName).toBe(version === 2 ? "INPUT" : "SELECT");
    fillVisible(completed(value)); fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    for (const suffix of ["time_alone", "time_with_family", "walks_per_day"]) expect(document.querySelector(`#dog_1_${suffix}`)?.tagName).toBe(version === 2 ? "INPUT" : "SELECT");
    expect(document.querySelector<HTMLInputElement>("#dog_1_weight")?.type).toBe(version === 2 ? "text" : "number");
    fillVisible(completed(value)); fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    fillVisible(completed(value));
    fetcher.mockImplementationOnce(async () => Response.json({ accepted: true }, { status: 202 }));
    fireEvent.click(screen.getByRole("button", { name: "Enviar formulario PRO" }));
    await screen.findByText("Formulario PRO recibido");
    const input = JSON.parse(String(fetcher.mock.calls[1]?.[1]?.body));
    expect(input.form_version).toBe(version); expect(input.token).toBe(token);
  });
  it("renders structured controls from the projected snapshot, retaining narrative textareas", async () => {
    const { value } = await ready();
    expect(document.querySelector("#required_schedule")?.tagName).toBe("SELECT");
    fillVisible(completed(value)); fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    for (const suffix of ["time_alone", "time_with_family", "walks_per_day"]) expect(document.querySelector(`#dog_1_${suffix}`)?.tagName).toBe("SELECT");
    const weight = document.querySelector<HTMLInputElement>("#dog_1_weight")!;
    expect(weight.type).toBe("number"); expect(weight.required).toBe(false); expect(weight.step).toBe("any");
    expect(weight.value).toBe(""); fireEvent.change(weight, { target: { value: "12.5" } }); expect(weight.value).toBe("12.5");
    for (const suffix of ["health_condition", "home_behavior", "outdoor_behavior", "important_episodes", "known_triggers"]) expect(document.querySelector(`#dog_1_${suffix}`)?.tagName).toBe("TEXTAREA");
  });
  it.each(["", "#review", "?source=test#review"])("without token makes no API call, offers /request and no PRO fields (%s)", async suffix => {
    open(suffix); const link = await screen.findByRole("link", { name: "Realizar solicitud inicial" });
    expect(link.getAttribute("href")).toBe("/request"); expect(document.querySelector("form")).toBeNull(); expect(fetch).not.toHaveBeenCalled();
  });
  it.each(["?token=", "?token=a&token=b", "#token=", "#token=a&token=b", "?token=query#token=", "?token=query#token=a&token=b"])("unusable token source %s does not resolve or redirect into a new request", async suffix => {
    open(suffix); await screen.findByText("Este enlace ya no está disponible.");
    expect(fetch).not.toHaveBeenCalled(); expect(screen.queryByRole("link", { name: "Realizar solicitud inicial" })).toBeNull();
    expect(window.location.search).toBe("");
    expect(window.location.hash).toBe("");
  });
  it.each([
    { name: "preferred hash", suffix: `#token=${token}` },
    { name: "legacy query", suffix: `?token=${token}` },
    { name: "hash over query", suffix: `?token=legacy-token&source=test#token=${token}&other=test` },
    { name: "query with unrelated fragment", suffix: `?token=${token}&source=test#review` },
    { name: "hash over duplicate query", suffix: `?token=first&token=second#token=${token}` },
  ])("captures $name in memory, cleans the entire URL before resolve and never stores/logs it", async ({ suffix }) => {
    const storage = vi.spyOn(Storage.prototype, "setItem");
    const logs = ["log", "info", "warn", "error", "debug"] as const;
    const spies = logs.map(method => vi.spyOn(console, method).mockImplementation(() => {}));
    const replace = vi.spyOn(window.history, "replaceState");
    const length = window.history.length;
    const fetcher = vi.fn<typeof fetch>(async () => {
      expect(window.location.pathname + window.location.search + window.location.hash).toBe("/admission-pro");
      return Response.json(pending());
    });
    vi.stubGlobal("fetch", fetcher);
    open(suffix); await screen.findByText("Información que ya tenemos");
    expect(replace).toHaveBeenLastCalledWith(window.history.state, "", "/admission-pro");
    expect(window.history.length).toBe(length);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledWith("/api/admission-pro/resolve", expect.objectContaining({ method: "POST", body: JSON.stringify({ token }) }));
    expect(storage).not.toHaveBeenCalled();
    expect(JSON.stringify({ ...localStorage, ...sessionStorage })).not.toContain(token);
    for (const spy of spies) expect(spy).not.toHaveBeenCalled();
  });
  it.each(["invalid", "expired", "revoked"])("%s invitation gets the same generic unavailable screen", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({ ok: false, code: "unavailable" }, { status: 404 })));
    open(); await screen.findByText("Este enlace ya no está disponible.");
    expect(document.querySelector("form")).toBeNull(); expect(screen.getByRole("link", { name: "Continuar por WhatsApp" }).getAttribute("href")).not.toContain(token);
  });
  it("keeps token and PII out of storage and address bar, prefills without retyping, permits optional editing", async () => {
    const storage = vi.spyOn(Storage.prototype, "setItem");
    const { value } = await ready();
    expect(window.location.search).toBe(""); expect(document.querySelector("#tutor_name")).toBeNull();
    expect(screen.getByText(value.prefill.tutor_name)).toBeTruthy();
    fireEvent.change(document.querySelector("#required_schedule")!, { target: { value: "Mañana · 8:00 a. m. a 12:00 m." } });
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    expect(screen.getByRole("heading", { name: `Sobre ${value.prefill.dog_1_name}` })).toBeTruthy();
    expect(document.querySelector("#dog_1_name")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Editar datos" }));
    expect((document.querySelector("#dog_1_name") as HTMLInputElement).value).toBe(value.prefill.dog_1_name);
    fireEvent.change(document.querySelector("#dog_1_name")!, { target: { value: "TEST Corregido" } });
    fireEvent.click(screen.getByRole("button", { name: "Anterior" }));
    expect((document.querySelector("#required_schedule") as HTMLInputElement).value).toBe("Mañana · 8:00 a. m. a 12:00 m.");
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    expect((document.querySelector("#dog_1_name") as HTMLInputElement).value).toBe("TEST Corregido"); expect(storage).not.toHaveBeenCalled();
  });
  it.each([["dog_1"], ["dog_1", "dog_2", "dog_3"], ["dog_1", "dog_3"]])("renders only authorized dogs beginning with %s", async (...selected) => {
    const { value } = await ready(selected);
    const progress = screen.getByRole("navigation", { name: "Progreso del formulario PRO" });
    expect(within(progress).getAllByRole("button")).toHaveLength(selected.length + 2);
    for (let i = 1; i <= 5; i++) expect(progress.textContent?.includes(`TEST Perro ${i}`)).toBe(selected.includes(`dog_${i}`));
    await completeSteps(value);
    expect(screen.getByRole("button", { name: "Enviar formulario PRO" })).toBeTruthy();
  });
  it("shows medication detail only for Sí and requires it before advancing", async () => {
    const { value } = await ready(); fillVisible(completed(value));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    fillVisible(completed(value)); expect(document.querySelector("#dog_1_medications")).toBeNull();
    fireEvent.change(document.querySelector("#dog_1_takes_medication")!, { target: { value: "Sí" } });
    expect(document.querySelector("#dog_1_medications")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    expect(screen.getByText("Complete este campo.")).toBeTruthy();
    expect(document.querySelector("#dog_1_name")).toBeNull(); // unrelated prefill stays in review mode
    fireEvent.change(document.querySelector("#dog_1_medications")!, { target: { value: "TEST Medicación" } });
    fireEvent.change(document.querySelector("#dog_1_takes_medication")!, { target: { value: "No" } });
    expect(document.querySelector("#dog_1_medications")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    expect(screen.getByRole("button", { name: "Enviar formulario PRO" })).toBeTruthy();
  });
  it("freezes retry, prevents double submit and shows success/WhatsApp only on 202", async () => {
    const { value, fetcher } = await ready(["dog_1", "dog_3"]); await completeSteps(value);
    let finish!: (response: Response) => void;
    fetcher.mockImplementationOnce(() => new Promise<Response>(resolve => { finish = resolve; }));
    const form = document.querySelector("form")!;
    fireEvent.submit(form); fireEvent.submit(form);
    expect(fetcher).toHaveBeenCalledTimes(2); // one resolve + one submit
    finish(Response.json({ ok: false, code: "network" }, { status: 502 }));
    await screen.findByRole("button", { name: "Intentar nuevamente" });
    expect(screen.queryByRole("link", { name: "Continuar por WhatsApp" })).toBeNull();
    expect(screen.getByRole("button", { name: "Editar datos" })).toBeTruthy();
    fetcher.mockImplementationOnce(async () => Response.json({ accepted: true }, { status: 202 }));
    fireEvent.click(screen.getByRole("button", { name: "Intentar nuevamente" }));
    await screen.findByText("Formulario PRO recibido");
    const calls = vi.mocked(fetch).mock.calls;
    expect(calls[1][1]?.body).toBe(calls[2][1]?.body);
    const sent = JSON.parse(String(calls[1][1]?.body)); expect(sent.token).toBe(token); expect(sent.form_version).toBe(value.form_version);
    for (const [key, known] of Object.entries(value.prefill)) expect(sent.answers[key]).toBe(known);
    expect(sent.answers).not.toHaveProperty("dog_2_name"); expect(sent.answers).toHaveProperty("dog_3_name");
    expect(decodeURIComponent(screen.getByRole("link", { name: "Continuar por WhatsApp" }).getAttribute("href")!)).not.toMatch(/lxpro_|TEST Perro|Medicación/);
    expect(document.querySelector("form")).toBeNull();
  });
  it("editing after an error preserves the draft and creates a changed attempt with the same invitation", async () => {
    const { value, fetcher } = await ready(); await completeSteps(value);
    fetcher.mockImplementationOnce(async () => Response.json({ ok: false, code: "validation" }, { status: 400 }));
    fireEvent.click(screen.getByRole("button", { name: "Enviar formulario PRO" }));
    await screen.findByRole("button", { name: "Intentar nuevamente" });
    fireEvent.click(screen.getByRole("button", { name: "Editar datos" }));
    fireEvent.click(screen.getByRole("button", { name: /1\. Datos del tutor/ }));
    expect((document.querySelector("#required_schedule") as HTMLInputElement).value).toBe(completed(value).required_schedule);
    fireEvent.change(document.querySelector("#required_schedule")!, { target: { value: "Tarde · 2:00 p. m. a 6:00 p. m." } });
    fireEvent.click(screen.getByRole("button", { name: /3\./ }));
    fetcher.mockImplementationOnce(async () => Response.json({ ok: false, code: "conflict" }, { status: 409 }));
    fireEvent.click(screen.getByRole("button", { name: "Enviar formulario PRO" }));
    await waitFor(() => expect(screen.getByRole("alert").textContent).toContain("no admite estos cambios"));
    const calls = vi.mocked(fetch).mock.calls; const original = JSON.parse(String(calls[1][1]?.body)); const edited = JSON.parse(String(calls[2][1]?.body));
    expect(edited.token).toBe(original.token); expect(edited.answers.required_schedule).toBe("Tarde · 2:00 p. m. a 6:00 p. m.");
    expect(edited.answers.dog_1_name).toBe(original.answers.dog_1_name);
  });
});
