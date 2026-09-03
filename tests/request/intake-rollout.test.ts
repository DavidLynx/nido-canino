import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/request/route";
import { buildLynxPayload } from "@/lib/lynx/public-intake";
import { intakeGeneration, parseIntakeEnvelope } from "@/lib/request/intake-rollout";
import { answersSchema, envelopeSchema as historicalEnvelopeSchema } from "./legacy-fixture/contract";
import { buildLynxPayload as historicPayload } from "./legacy-fixture/payload";
import { legacyDraft, legacyEnvelope } from "./legacy-fixture/fixture";
import { dog, envelope, fakeEnv } from "./fixtures";

function request(body: unknown) {
  return new Request("http://localhost/api/request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
}
function configure() { Object.entries(fakeEnv).forEach(([key, value]) => vi.stubEnv(key, value!)); }

describe("temporary dual-generation intake", () => {
  it("keeps the production legacy validator identical to the frozen historical contract", () => {
    const deployed = readFileSync("lib/request/legacy-contract.ts", "utf8").replace(/\r\n/g, "\n").split("\n").slice(1).join("\n").trim();
    expect(deployed).toBe(readFileSync("tests/request/legacy-fixture/contract.ts", "utf8").replace(/\r\n/g, "\n").trim());
  });
  it.each([1, 2, 3, 4, 5])("legacy %s-dog payload and byte/hash identity match the deployed old builder", count => {
    const input = legacyEnvelope();
    input.answers = answersSchema.parse({ ...legacyDraft(), dog_count: count, ...dog(2), ...dog(3), ...dog(4), ...dog(5) });
    const parsed = parseIntakeEnvelope(input); expect(parsed.success).toBe(true);
    if (!parsed.success) throw new Error("legacy fixture failed");
    const current = JSON.stringify(buildLynxPayload(parsed.data, input.policy_version));
    const historical = JSON.stringify(historicPayload(historicalEnvelopeSchema.parse(input), input.policy_version));
    expect(current).toBe(historical);
    expect(createHash("sha256").update(current).digest("hex")).toBe(createHash("sha256").update(historical).digest("hex"));
    expect(JSON.parse(current).metadata.form_version).toBe(1);
    expect(JSON.parse(current).contact).toEqual({ full_name: "Tutor histórico", phone: "3000000000", locality: "Fontibón", zone: "Modelia" });
  });
  it.each(["first_name", "last_name", "email", "alternate_phone", "preferred_channel"])("rejects hybrid legacy + %s BEFORE whitelisting", async key => {
    configure(); const upstream = vi.fn(); vi.stubGlobal("fetch", upstream);
    const input = legacyEnvelope(); input.answers[key] = "";
    expect(intakeGeneration(input)).toBeNull();
    expect((await POST(request(input))).status).toBe(422);
    expect(upstream).not.toHaveBeenCalled();
  });
  it("requires both refined name keys and never falls back to a weaker legacy validator", () => {
    const input = envelope(); Reflect.deleteProperty(input.answers, "last_name");
    expect(intakeGeneration(input)).toBeNull(); expect(parseIntakeEnvelope(input).success).toBe(false);
    const missingEmail = envelope(); Reflect.deleteProperty(missingEmail.answers, "email");
    expect(parseIntakeEnvelope(missingEmail).success).toBe(false);
    expect(parseIntakeEnvelope({ ...legacyEnvelope(), answers: { full_name: "Only name" } }).success).toBe(false);
  });
  it("new API accepts old attempts with unchanged timestamps/attribution, emits an identical retry and exposes no internal IDs", async () => {
    configure(); const input = legacyEnvelope(); const bodies: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_url, init) => {
      bodies.push(String(init.body));
      return Response.json({ accepted: true, request_id: "legacy-receipt", contact_id: "private-id" }, { status: 202 });
    }));
    const before = JSON.stringify(input);
    for (let i = 0; i < 2; i++) {
      const response = await POST(request(input)); expect(response.status).toBe(202);
      expect(await response.json()).toEqual({ accepted: true, request_id: "legacy-receipt" });
    }
    const historical = JSON.stringify(historicPayload(historicalEnvelopeSchema.parse(input), input.policy_version));
    expect(bodies).toEqual([historical, historical]);
    expect(JSON.stringify(input)).toBe(before);
  });
  it("refined stays unversioned and never acquires legacy answer full_name", async () => {
    configure(); const bodies: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_url, init) => {
      bodies.push(String(init.body)); return Response.json({ accepted: true, request_id: "refined" }, { status: 202 });
    }));
    expect((await POST(request(envelope({ preferred_channel: "email" })))).status).toBe(202);
    const body = JSON.parse(bodies[0]);
    expect(body.metadata).not.toHaveProperty("form_version"); expect(body.answers).not.toHaveProperty("full_name");
    expect(body.contact).toMatchObject({ first_name: "Tutor", last_name: "de prueba", full_name: "Tutor de prueba", preferred_channel: "email" });
  });
  it("DB cutoff rejection propagates safely; Nido does not intercept accepted replays using its own clock", async () => {
    configure(); vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 422 })));
    const response = await POST(request(legacyEnvelope()));
    expect(response.status).toBe(422); expect(await response.json()).toMatchObject({ accepted: false, code: "validation" });
  });
});
