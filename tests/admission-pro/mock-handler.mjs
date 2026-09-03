// Only used by the explicitly enabled local request mock; no production access.
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
const definition = JSON.parse(readFileSync(new URL("./definition.json", import.meta.url), "utf8"));
const attempts = new Map();
const received = new Map();
export async function mockAdmission(req, res) {
  if (!req.url?.startsWith("/api/v1/admission-pro/nido-website/")) return false;
  const respond = (status, data, headers = {}) => { res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", ...headers }); res.end(JSON.stringify(data)); };
  if (req.method !== "POST") { respond(405, {}); return true; }
  if (req.headers.authorization !== "Bearer TEST-ID.TEST-NOT-A-SECRET") { respond(401, {}); return true; }
  let body; let size = 0; const chunks = [];
  for await (const chunk of req) { size += chunk.length; if (size > 131072) { respond(413, {}); return true; } chunks.push(chunk); }
  try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { respond(400, {}); return true; }
  const token = body.token;
  // Test-only opaque invitation scenarios; never interpreted by the Nido application.
  const scenario = typeof token === "string" && /^lxpro_[a-z]_[A-Za-z0-9_-]{41}$/.test(token) ? token[6] : null;
  if (!scenario || ["x", "e", "v"].includes(scenario)) { respond(404, {}); return true; }
  const dogs = scenario === "t" ? ["dog_1", "dog_2", "dog_3"] : scenario === "n" || scenario === "r" ? ["dog_1", "dog_3"] : ["dog_1"];
  const structure = { ...definition, steps: definition.steps.filter(step => !step.id.startsWith("dog_") || dogs.includes(step.id)) };
  if (req.url.endsWith("/resolve")) {
    if (Object.keys(body).sort().join() !== "token") { respond(400, {}); return true; }
    if (scenario === "c" || received.has(token)) { respond(200, { status: "consumed" }); return true; }
    const prefill = { tutor_name: "TEST Tutor Peña", tutor_phone: "3000000000", tutor_email: "prueba@example.test", tutor_zone: "Modelia · Bogotá", tutor_locality: "Fontibón" };
    for (const dog of dogs) Object.assign(prefill, { [`${dog}_name`]: `TEST Perro ${dog.slice(-1)}`, [`${dog}_age`]: "4 años", [`${dog}_breed`]: "Mestizo", [`${dog}_sex`]: "Macho", [`${dog}_size`]: "Mediano", [`${dog}_neutered`]: "Sí" });
    respond(200, { status: "pending", expires_at: "2027-09-02T12:00:00Z", form_slug: "admission-pro", form_version: 1, selected_dog_keys: dogs, structure, prefill }); return true;
  }
  if (!req.url.endsWith("/submit")) { respond(404, {}); return true; }
  if (Object.keys(body).sort().join() !== "answers,form_version,token" || body.form_version !== 1 || !body.answers || typeof body.answers !== "object") { respond(400, {}); return true; }
  const a = body.answers; const visible = new Set(); let invalid = false;
  for (const field of structure.steps.flatMap(step => step.fields)) {
    if (field.condition && a[field.condition.fieldId] !== field.condition.value) continue;
    visible.add(field.id); const value = a[field.id];
    if (value === undefined) { if (field.required) invalid = true; continue; }
    if (field.type === "multiselect") {
      if (!Array.isArray(value) || value.some(item => !field.options.includes(item))) invalid = true;
      else if (value.length > 1 && ((field.id.endsWith("_reactivity") && value.some(item => ["No presenta", "No sabe"].includes(item))) || (field.id.endsWith("_resource_guarding") && value.includes("No")))) invalid = true;
    } else if (field.type === "number") {
      if (typeof value !== "number" || !Number.isFinite(value)) invalid = true;
    } else {
      if (typeof value !== "string" || (field.required && !value.trim()) || value.length > 5000) invalid = true;
      if (field.type === "select" && !field.options.includes(value)) invalid = true;
      if (field.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) invalid = true;
    }
  }
  if (invalid || Object.keys(a).some(id => !visible.has(id))) { respond(400, {}); return true; }
  const serialized = JSON.stringify(body); const previous = received.get(token);
  if (previous && previous.body !== serialized) { respond(409, {}); return true; }
  if (previous) { respond(202, previous.response); return true; }
  // First retry case fails transiently. A retry must have identical bytes.
  if (attempts.has(token) && attempts.get(token) !== serialized) { respond(409, {}); return true; }
  const first = !attempts.has(token); attempts.set(token, serialized);
  if (scenario === "r" && first) { respond(429, {}, { "Retry-After": "1" }); return true; }
  const response = { accepted: true, request_id: randomUUID(), submission_id: randomUUID(), contact_id: randomUUID(), opportunity_id: randomUUID(), pets: dogs.map(source_dog_key => ({ source_dog_key, pet_id: randomUUID() })) };
  received.set(token, { body: serialized, response });
  respond(202, response); return true;
}
