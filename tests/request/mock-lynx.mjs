// Local-only mock. Never proxies requests and never logs personal payloads.
import { createServer } from "node:http";

if (process.env.NIDO_TEST_MOCK !== "1" || process.env.NODE_ENV === "production") throw new Error("This mock requires explicit NIDO_TEST_MOCK=1 outside production.");
const records = new Map();
const server = createServer(async (req, res) => {
  if (req.url === "/health") { res.writeHead(200); res.end("local test mock"); return; }
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
  const id = body.metadata.external_request_id;
  const previous = records.get(id);
  const serialized = JSON.stringify(body);
  if (previous && previous.payload !== serialized) { res.writeHead(409); res.end(); return; }
  records.set(id, { payload: serialized });
  if (body.contact.full_name === "TEST ERROR") { res.writeHead(503); res.end(); return; }
  if (body.contact.full_name === "TEST RATE LIMIT" && !previous) { res.writeHead(429, { "Retry-After": "1" }); res.end(); return; }
  if (body.contact.full_name === "TEST TIMEOUT" && !previous) await new Promise((resolve) => setTimeout(resolve, 14000));
  res.writeHead(202, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ accepted: true, request_id: `req-${id}`, submission_id: "test-submission", contact_id: "test-contact", opportunity_id: "test-opportunity" }));
});
server.listen(4319, "127.0.0.1");
