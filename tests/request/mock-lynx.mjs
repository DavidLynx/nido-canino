// Local-only mock. Never proxies requests and never logs personal payloads.
import { createServer } from "node:http";
import { createHash } from "node:crypto";
import { mockAdmission } from "../admission-pro/mock-handler.mjs";

if (process.env.NIDO_TEST_MOCK !== "1" || process.env.NODE_ENV === "production") throw new Error("This mock requires explicit NIDO_TEST_MOCK=1 outside production.");
const records = new Map();
let publishedVersion = 2;
let legacyClosed = false;
const server = createServer(async (req, res) => {
  if (req.url === "/health") { res.writeHead(200); res.end("local test mock"); return; }
  // Test-only rollout controls on this explicitly guarded loopback server, never in Next.
  if (req.url === "/__rollout" && req.method === "POST") {
    const chunks = []; for await (const chunk of req) chunks.push(chunk);
    const state = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (![1, 2].includes(state.publishedVersion) || typeof state.legacyClosed !== "boolean") { res.writeHead(400); res.end(); return; }
    publishedVersion = state.publishedVersion; legacyClosed = state.legacyClosed;
    res.writeHead(204); res.end(); return;
  }
  if (req.url === "/__receipts" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    // No personal values in inspection output: only synthetic test keys, versions and hashes.
    res.end(JSON.stringify([...records].map(([id, record]) => ({ id, version: record.version, accepted: record.accepted, hash: createHash("sha256").update(record.payload).digest("hex") })))); return;
  }
  if (await mockAdmission(req, res)) return;
  if (req.url !== "/intake" || req.method !== "POST") { res.writeHead(404); res.end(); return; }
  let size = 0; const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 32768) { res.writeHead(413); res.end(); return; }
    chunks.push(chunk);
  }
  let body;
  try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { res.writeHead(400); res.end(); return; }
  if (req.headers.authorization !== "Bearer TEST-ID.TEST-NOT-A-SECRET") { res.writeHead(401); res.end(); return; }
  if (body.metadata?.form_slug !== "website-intake" || body.consent?.policy_version !== "TEST-POLICY") { res.writeHead(422); res.end(); return; }
  if (typeof body.answers?.dog_count !== "string" || !["1", "2", "3", "4", "5"].includes(body.answers.dog_count)) { res.writeHead(422); res.end(); return; }
  const contact = body.contact;
  const legacy = Object.hasOwn(body.answers, "full_name");
  if (legacy ? (!contact || !contact.full_name || body.metadata.form_version !== 1
    || ["first_name", "last_name", "email", "alternate_phone", "preferred_channel"].some(key => Object.hasOwn(body.answers, key) || Object.hasOwn(contact, key)))
    : (!contact || !contact.first_name || !contact.last_name || !contact.email || !contact.alternate_phone
    || contact.full_name !== `${contact.first_name} ${contact.last_name}` || "full_name" in body.answers || "form_version" in body.metadata
    || ["first_name", "last_name", "email", "phone", "alternate_phone", "preferred_channel"].some(key => body.answers[key] !== contact[key])
    || contact.phone.replace(/\D/g, "") === contact.alternate_phone.replace(/\D/g, ""))) { res.writeHead(422); res.end(); return; }
  const id = body.metadata.external_request_id;
  const previous = records.get(id);
  const serialized = JSON.stringify(body);
  if (previous && previous.payload !== serialized) { res.writeHead(409); res.end(); return; }
  if (!previous?.accepted && ((legacy && legacyClosed) || (!legacy && publishedVersion === 1))) { res.writeHead(422); res.end(); return; }
  const record = previous ?? { payload: serialized, version: legacy ? 1 : publishedVersion, accepted: false };
  records.set(id, record);
  if (body.contact.full_name === "TEST ERROR") { res.writeHead(503); res.end(); return; }
  if (body.contact.full_name === "TEST RATE LIMIT" && !previous) { res.writeHead(429, { "Retry-After": "1" }); res.end(); return; }
  if (body.contact.full_name === "TEST TIMEOUT" && !previous) await new Promise((resolve) => setTimeout(resolve, 14000));
  record.accepted = true;
  res.writeHead(202, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ accepted: true, request_id: `req-${id}`, submission_id: "test-submission", contact_id: "test-contact", opportunity_id: "test-opportunity" }));
});
server.listen(Number(process.env.NIDO_TEST_MOCK_PORT || 4319), "127.0.0.1");
