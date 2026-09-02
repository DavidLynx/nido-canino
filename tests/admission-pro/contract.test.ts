import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import definition from "./definition.json";
import nextConfig from "@/next.config";
import { conditionMet, effectiveAnswers, pendingSchema, submitInputSchema, validateAnswers } from "@/lib/admission-pro/contract";
import { completed, pending, token } from "./fixtures";

describe("Lynx Admission PRO c50c2f2 projected contract", () => {
  it("suppresses invitation URL logging in Next development without changing other routes", () => {
    const incoming = nextConfig.logging && nextConfig.logging.incomingRequests;
    if (!incoming || typeof incoming === "boolean") throw new Error("Scoped logging exclusions expected");
    for (const url of ["/admission-pro?token=secret", "/admission-pro.html?token=secret", "/api/admission-pro/resolve"]) expect(incoming.ignore?.some(pattern => pattern.test(url))).toBe(true);
    expect(incoming.ignore?.some(pattern => pattern.test("/request"))).toBe(false);
  });
  it.each([["dog_1"], ["dog_1", "dog_2", "dog_3"], ["dog_1", "dog_3"], ["dog_1", "dog_2", "dog_3", "dog_4", "dog_5"]])("validates selected projection starting with %s", (...selected) => {
    const value = pending(selected);
    const { answers, errors } = validateAnswers(value.structure, completed(value));
    expect(errors).toEqual({});
    expect(value.structure.steps.map(step => step.id)).toEqual(["tutor", ...selected, "closing"]);
    expect(submitInputSchema.safeParse({ token, form_version: value.form_version, answers }).success).toBe(true);
    for (const [id, known] of Object.entries(value.prefill)) expect(answers[id]).toBe(known);
    for (const id of Object.keys(answers).filter(id => id.startsWith("dog_"))) expect(selected).toContain(id.slice(0, 5));
  });
  it("covers the 169 real fields and exactly the types published in the fixture", () => {
    const fields = definition.steps.flatMap(step => step.fields);
    expect(fields).toHaveLength(169);
    expect([...new Set(fields.map(field => field.type))].sort()).toEqual(["email", "long_text", "multiselect", "phone", "select", "short_text"]);
  });
  it("fails closed for unselected steps, fields, prefill, duplicates and unsupported types", () => {
    const unsafe = [
      (v: ReturnType<typeof pending>) => v.structure.steps.splice(2, 0, pending(["dog_2"]).structure.steps[1]),
      (v: ReturnType<typeof pending>) => v.structure.steps[1].fields[0].id = "dog_2_name",
      (v: ReturnType<typeof pending>) => v.prefill.dog_2_name = "Not authorized",
      (v: ReturnType<typeof pending>) => v.selected_dog_keys.push("dog_1"),
      (v: ReturnType<typeof pending>) => v.structure.steps[1].fields.push(v.structure.steps[1].fields[0]),
    ];
    for (const change of unsafe) { const v = pending(); change(v); expect(pendingSchema.safeParse(v).success).toBe(false); }
    expect(pendingSchema.safeParse({ ...pending(), prefill: { contact_id: "forbidden" } }).success).toBe(false);
    const raw = JSON.parse(JSON.stringify(pending())); raw.structure.steps[0].fields[0].type = "file";
    expect(pendingSchema.safeParse(raw).success).toBe(false);
  });
  it("requires visible medication detail and omits hidden values plus unauthorized dogs", () => {
    const v = pending(["dog_1", "dog_3"]); const a = completed(v);
    a.dog_1_takes_medication = "Sí";
    expect(validateAnswers(v.structure, a).errors).toHaveProperty("dog_1_medications");
    a.dog_1_medications = "TEST Medicación";
    expect(validateAnswers(v.structure, a).errors).toEqual({});
    a.dog_1_takes_medication = "No"; a.dog_2_name = "Unauthorized"; a.dog_count = 5;
    const result = effectiveAnswers(v.structure, a);
    expect(result).not.toHaveProperty("dog_1_medications"); expect(result).not.toHaveProperty("dog_2_name"); expect(result).not.toHaveProperty("dog_count");
    expect(a.dog_1_medications).toBe("TEST Medicación");
  });
  it("validates required, email, strict select and exclusive negative multiselect; phone stays contractual string", () => {
    const v = pending(); const a = completed(v);
    Object.assign(a, { tutor_name: "  ", tutor_email: "bad", tutor_phone: "+57 300 000 00 00", dog_1_size: 2, dog_1_reactivity: ["No sabe", "Con perros"], dog_1_resource_guarding: ["No", "Comida"] });
    expect(Object.keys(validateAnswers(v.structure, a).errors).sort()).toEqual(["dog_1_reactivity", "dog_1_resource_guarding", "dog_1_size", "tutor_email", "tutor_name"]);
    a.dog_1_reactivity = ["Con perros", "Con personas"]; a.dog_1_resource_guarding = ["Comida", "Tutor"];
    expect(validateAnswers(v.structure, a).errors).not.toHaveProperty("dog_1_reactivity");
    a.dog_1_reactivity = ["invented"]; expect(validateAnswers(v.structure, a).errors).toHaveProperty("dog_1_reactivity");
  });
  it("does not trim or coerce prefill; conditions operate on effective earlier answers", () => {
    const v = pending(); const a = completed(v); a.tutor_name = " TEST Tutor ";
    expect(effectiveAnswers(v.structure, a).tutor_name).toBe(a.tutor_name);
    expect(conditionMet({ fieldId: "x", operator: "in", value: ["1"] }, { x: 1 })).toBe(false);
    expect(conditionMet({ fieldId: "x", operator: "equals", value: "Sí" }, { x: "No" })).toBe(false);
  });
  it("keeps UI/fixture UTF-8 and does not promote PRO in active public navigation", () => {
    const read = (file: string) => readFileSync(file, "utf8");
    const ui = [read("components/admission-pro/admission-form.tsx"), read("lib/admission-pro/client.ts"), JSON.stringify(pending())].join("\n");
    expect(ui).not.toMatch(/Ã|Â|\uFFFD/);
    for (const word of ["electrónico", "Bogotá", "información", "evaluación", "admisión", "Sí", "¿", "ñ"]) expect(ui).toContain(word);
    for (const file of ["components/header.tsx", "components/footer.tsx", "legacy-content/index.html", "content/resources/02_checklist_convivencia.md", "content/blog/02_senales_estres.md", "content/blog/05_adaptacion.md"]) expect(read(file)).not.toMatch(/(?:href|ctaHref)[^\n]*admission-pro/i);
    const page = read("app/admission-pro/page.tsx");
    expect(page).toContain("index: false"); expect(page).toContain('referrer: "no-referrer"'); expect(page).not.toContain("LegacyRoute");
    for (const file of ["components/admission-pro/admission-form.tsx", "lib/admission-pro/client.ts"]) expect(read(file)).not.toMatch(/localStorage|sessionStorage|LYNX_NIDO_AUTHORIZATION|console\./);
  });
});
