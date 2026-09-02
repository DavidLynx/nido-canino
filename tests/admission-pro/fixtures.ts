import definition from "./definition.json";
import { pendingSchema, conditionMet, type ProPending, type ProAnswers } from "@/lib/admission-pro/contract";

// Synthetic data only. Definition snapshot: Lynx c50c2f2; never imported by application code.
export const token = `lxpro_${"t".repeat(43)}`;
export const accepted = { accepted: true, request_id: "11111111-1111-4111-8111-111111111111", submission_id: "22222222-2222-4222-8222-222222222222", contact_id: "33333333-3333-4333-8333-333333333333", opportunity_id: "44444444-4444-4444-8444-444444444444", pets: [{ source_dog_key: "dog_1", pet_id: "55555555-5555-4555-8555-555555555555" }] };
export function pending(selected: string[] = ["dog_1"]): ProPending {
  const prefill: Record<string, string> = { tutor_name: "TEST Tutor Peña", tutor_phone: "3000000000", tutor_email: "prueba@example.test", tutor_zone: "Modelia · Bogotá", tutor_locality: "Fontibón" };
  for (const dog of selected) Object.assign(prefill, { [`${dog}_name`]: `TEST Perro ${dog.slice(-1)}`, [`${dog}_age`]: "4 años", [`${dog}_breed`]: "Mestizo", [`${dog}_sex`]: "Macho", [`${dog}_size`]: "Mediano", [`${dog}_neutered`]: "Sí" });
  return pendingSchema.parse({ status: "pending", expires_at: "2027-09-02T12:00:00Z", form_slug: "admission-pro", form_version: 1, selected_dog_keys: selected, structure: { ...definition, steps: definition.steps.filter(step => !step.id.startsWith("dog_") || selected.includes(step.id)) }, prefill });
}
export function completed(value = pending()): ProAnswers {
  const answers: ProAnswers = { ...value.prefill };
  for (const field of value.structure.steps.flatMap(step => step.fields)) {
    if (field.id in answers || !field.required || !conditionMet(field.condition, answers)) continue;
    answers[field.id] = field.type === "select" ? (field.id.endsWith("takes_medication") ? "No" : field.options![0]) : "Información sintética de prueba";
  }
  return answers;
}
