import { z } from "zod";

// Mirrors Lynx c50c2f2 Admission PRO API. This is a renderer contract, not a form definition.
const key = z.string().regex(/^[a-zA-Z][a-zA-Z0-9_-]{0,79}$/);
const dogKey = z.enum(["dog_1", "dog_2", "dog_3", "dog_4", "dog_5"]);
const condition = z.union([
  z.object({ fieldId: key, operator: z.enum(["equals", "not_equals", "contains", "not_contains", "empty", "not_empty"]), value: z.string().max(500).optional() }),
  z.object({ fieldId: key, operator: z.literal("in"), value: z.array(z.string().max(500)).min(1).max(100) }),
]);
export const fieldSchema = z.object({
  id: key,
  type: z.enum(["short_text", "long_text", "email", "phone", "number", "select", "multiselect", "radio", "checkbox", "boolean", "consent"]),
  label: z.string().min(1).max(160), required: z.boolean().optional(),
  placeholder: z.string().max(200).optional(), help: z.string().max(500).optional(),
  options: z.array(z.string().min(1).max(120)).max(100).optional(), condition: condition.optional(),
}).superRefine((field, ctx) => {
  if (["select", "multiselect", "radio", "checkbox"].includes(field.type) && !field.options?.length) ctx.addIssue({ code: "custom", message: "options_required" });
});
const structureSchema = z.object({
  title: z.string().min(1).max(200), description: z.string().max(1000).optional(),
  steps: z.array(z.object({ id: key, title: z.string().min(1).max(160), description: z.string().max(500).optional(), fields: z.array(fieldSchema).min(1).max(100) })).min(3).max(7),
});
export const pendingSchema = z.object({
  status: z.literal("pending"), expires_at: z.iso.datetime({ offset: true }), form_slug: z.literal("admission-pro"), form_version: z.number().int().positive(),
  selected_dog_keys: z.array(dogKey).min(1).max(5), structure: structureSchema,
  prefill: z.record(key, z.string().max(5000)),
}).superRefine((value, ctx) => {
  const steps = value.structure.steps;
  const ids = steps.flatMap(step => step.fields.map(field => field.id));
  const selected = new Set<string>(value.selected_dog_keys);
  const stepIds = steps.map(step => step.id);
  const prefillable = new Set(["tutor_name", "tutor_phone", "tutor_email", "tutor_zone", "tutor_locality", ...value.selected_dog_keys.flatMap(dog => ["name", "age", "breed", "sex", "size", "neutered"].map(part => `${dog}_${part}`))]);
  const invalid = selected.size !== value.selected_dog_keys.length || new Set(ids).size !== ids.length
    || new Set(stepIds).size !== stepIds.length || stepIds[0] !== "tutor" || stepIds.at(-1) !== "closing"
    || steps.length !== selected.size + 2 || stepIds.slice(1, -1).some(id => !selected.has(id))
    || steps.some(step => step.fields.some(field => {
      const dog = field.id.match(/^(dog_\d+)_/);
      return selected.has(step.id) ? !field.id.startsWith(`${step.id}_`) : !!dog;
    }))
    || Object.keys(value.prefill).some(id => !prefillable.has(id) || !ids.includes(id));
  if (invalid) ctx.addIssue({ code: "custom", message: "unsafe_projection" });
});
export const resolveResponseSchema = z.union([z.object({ status: z.literal("consumed") }), pendingSchema]);
export const resolveInputSchema = z.object({ token: z.string().min(1).max(100) }).strict();
export const answerSchema = z.union([z.string().max(5000), z.number().finite(), z.boolean(), z.array(z.string().max(500)).max(100)]);
export const submitInputSchema = resolveInputSchema.extend({
  form_version: z.number().int().positive(), answers: z.record(key, answerSchema).refine(value => Object.keys(value).length <= 300),
}).strict();
export const submitResponseSchema = z.object({
  accepted: z.literal(true), request_id: z.string().uuid(), submission_id: z.string().uuid(), contact_id: z.string().uuid(), opportunity_id: z.string().uuid(),
  pets: z.array(z.object({ source_dog_key: dogKey, pet_id: z.string().uuid() })).min(1).max(5),
});
export type ProField = z.infer<typeof fieldSchema>;
export type ProStructure = z.infer<typeof structureSchema>;
export type ProResolution = z.infer<typeof resolveResponseSchema>;
export type ProPending = z.infer<typeof pendingSchema>;
export type ProAnswers = Record<string, z.infer<typeof answerSchema>>;
export type ProSubmit = z.infer<typeof submitInputSchema>;

export function conditionMet(rule: ProField["condition"], answers: ProAnswers): boolean {
  if (!rule) return true;
  const raw = answers[rule.fieldId];
  if (rule.operator === "in") return rule.value.some(value => Object.is(raw, value));
  const items = Array.isArray(raw) ? raw.map(String) : [String(raw ?? "")];
  const expected = rule.value ?? "";
  if (rule.operator === "empty") return items.every(item => !item);
  if (rule.operator === "not_empty") return items.some(Boolean);
  if (rule.operator === "equals") return items.includes(expected);
  if (rule.operator === "not_equals") return !items.includes(expected);
  if (rule.operator === "contains") return items.some(item => item.includes(expected));
  return items.every(item => !item.includes(expected));
}

// Ordered projection matches Lynx Forms; never trim or rewrite known prefill values.
export function effectiveAnswers(structure: ProStructure, draft: ProAnswers) {
  const answers: ProAnswers = {};
  for (const field of structure.steps.flatMap(step => step.fields)) {
    const value = draft[field.id];
    if (conditionMet(field.condition, answers) && value !== undefined && value !== "" && !(Array.isArray(value) && !value.length)) answers[field.id] = value;
  }
  return answers;
}

export function validateAnswers(structure: ProStructure, draft: ProAnswers) {
  const answers = effectiveAnswers(structure, draft);
  const errors: Record<string, string> = {};
  for (const field of structure.steps.flatMap(step => step.fields)) {
    if (!conditionMet(field.condition, answers)) continue;
    const value = answers[field.id];
    const core = /^dog_[1-5]_(name|age|breed|sex|size|neutered)$/.test(field.id);
    if ((field.required || core) && (value === undefined || value === false || (typeof value === "string" && !value.trim()))) {
      errors[field.id] = "Complete este campo."; continue;
    }
    if (value === undefined) continue;
    let valid = true;
    if (["multiselect", "checkbox"].includes(field.type)) valid = Array.isArray(value) && value.every(item => field.options?.includes(item));
    else if (["select", "radio"].includes(field.type)) valid = typeof value === "string" && !!field.options?.includes(value);
    else if (field.type === "number") valid = typeof value === "number" && Number.isFinite(value);
    else if (["boolean", "consent"].includes(field.type)) valid = typeof value === "boolean";
    else valid = typeof value === "string" && value.length <= 5000;
    if (valid && field.type === "email") valid = typeof value === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
    // The actual phone contract is string, with no extra phone-format rule.
    if (core && typeof value === "string" && value.trim().length > 160) valid = false;
    if (!valid) errors[field.id] = field.type === "email" ? "Indique un correo electrónico válido." : "Revise el valor o seleccione una opción válida.";
    if (Array.isArray(value) && value.length > 1 && ((field.id.endsWith("_reactivity") && (value.includes("No presenta") || value.includes("No sabe"))) || (field.id.endsWith("_resource_guarding") && value.includes("No")))) errors[field.id] = "Seleccione la opción negativa por separado, sin combinarla con otras.";
  }
  return { answers, errors };
}
