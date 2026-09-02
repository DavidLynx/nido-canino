import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/request/route";
import { buildLynxPayload, submitToLynx } from "@/lib/lynx/public-intake";
import { getPrivacyPolicy } from "@/lib/lynx/config";
import { NEEDS } from "@/lib/request/contract";
import { sendAttempt } from "@/lib/request/client";
import { envelope, fakeEnv } from "./fixtures";

function configure() { Object.entries(fakeEnv).forEach(([key, value]) => vi.stubEnv(key, value!)); }
function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/request", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) });
}
function accepted() { return Response.json({ accepted: true, request_id: "req-test", submission_id: "internal-submission", contact_id: "internal-contact", opportunity_id: "internal-lead" }, { status: 202 }); }

describe("server-to-server intake", () => {
  it("route validates and builds exact Lynx payload; never leaks internal IDs/auth", async () => {
    configure();
    const upstream = vi.fn(async () => accepted()); vi.stubGlobal("fetch", upstream);
    const input = envelope({ need_type: NEEDS[1], trip_start: "2026-12-01", trip_end: "2026-12-03" });
    const response = await POST(request(input));
    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({ accepted: true, request_id: "req-test" });
    const [url, init] = upstream.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(fakeEnv.LYNX_PUBLIC_INTAKE_URL);
    expect((init.headers as Record<string, string>).Authorization).toBe(fakeEnv.LYNX_NIDO_AUTHORIZATION);
    expect(init.redirect).toBe("error");
    expect(JSON.parse(init.body as string)).toEqual({
      metadata: { schema_version: 1, external_request_id: input.external_request_id, submitted_at: input.submitted_at, form_slug: "website-intake", form_version: 1 },
      attribution: { ...input.attribution, source_self_reported: "Instagram" },
      contact: { full_name: "Tutor de prueba", phone: "3000000000", locality: "Fontibón", zone: "Modelia" },
      request: { intent: NEEDS[1], requested_dates: ["2026-12-01", "2026-12-03"], concern: "Solicitud inicial enviada desde nidocanino.org/request" },
      context: {}, answers: input.answers,
      consent: { accepted: true, policy_version: "TEST-POLICY", accepted_at: input.consent_accepted_at },
    });
  });
  it("weekly, concern, reported source and single date mappings", () => {
    const weekly = buildLynxPayload(envelope({ need_type: NEEDS[0], weekly_days_count: 2, weekly_days: ["Lunes", "Viernes"], care_concern: "Pausas", source_self_reported: "Recomendación", source_detail: "TEST" }), "TEST-POLICY");
    expect(weekly.request).toEqual({ intent: NEEDS[0], frequency: "2 días/semana: Lunes, Viernes", concern: "Pausas" });
    expect(weekly.attribution.source_detail).toBe("TEST");
    expect(buildLynxPayload(envelope({ need_type: NEEDS[2], single_date: "2026-12-01" }), "TEST-POLICY").request.requested_dates).toEqual(["2026-12-01"]);
  });
  it.each(["LYNX_NIDO_AUTHORIZATION", "NIDO_PRIVACY_POLICY_VERSION", "NIDO_PRIVACY_POLICY_URL"])("missing %s fails closed before fetch with safe public error", async (key) => {
    configure(); vi.stubEnv(key, ""); const upstream = vi.fn(); vi.stubGlobal("fetch", upstream);
    const response = await POST(request(envelope()));
    const output = await response.text();
    expect(response.status).toBe(503); expect(upstream).not.toHaveBeenCalled();
    expect(output).toContain('"code":"configuration"'); expect(output).not.toContain(key); expect(output).not.toContain("Bearer");
  });
  it("TEST-POLICY never acts as a production default", () => {
    expect(getPrivacyPolicy({ ...fakeEnv, NODE_ENV: "production" })).toBeNull();
    expect(getPrivacyPolicy({ NODE_ENV: "production" })).toBeNull();
  });
  it("policy change rejects old consent without sending", async () => {
    const fetcher = vi.fn();
    const result = await submitToLynx({ ...envelope(), policy_version: "old" }, { env: fakeEnv, fetcher });
    expect(result).toMatchObject({ accepted: false, code: "policy_changed" }); expect(fetcher).not.toHaveBeenCalled();
  });
  it.each([
    [400, "validation", 422], [422, "validation", 422], [401, "authorization", 503], [403, "authorization", 503],
    [409, "conflict", 409], [429, "rate_limit", 429], [500, "upstream", 502], [503, "upstream", 502], [200, "upstream", 502],
  ])("upstream %s => safe %s, never accepted", async (status, code, expectedStatus) => {
    configure();
    vi.stubGlobal("fetch", vi.fn(async () => new Response("SQL INTERNAL TEST DETAIL", { status: Number(status), headers: { "Retry-After": "2" } })));
    const response = await POST(request(envelope())); const body = await response.json();
    expect(response.status).toBe(expectedStatus); expect(body.accepted).toBe(false); expect(body.code).toBe(code);
    expect(JSON.stringify(body)).not.toContain("SQL");
    if (status === 429) { expect(body.retry_after).toBe(2); expect(response.headers.get("Retry-After")).toBe("2"); }
  });
  it("timeout and network are differentiated; no success", async () => {
    const fetcher = vi.fn((_url: string | URL | Request, init?: RequestInit) => new Promise<Response>((_resolve, reject) => init?.signal?.addEventListener("abort", () => reject(new Error("test abort")))));
    expect(await submitToLynx(envelope(), { env: fakeEnv, fetcher, timeoutMs: 5 })).toMatchObject({ accepted: false, code: "timeout", status: 504 });
    expect(await submitToLynx(envelope(), { env: fakeEnv, fetcher: vi.fn(async () => { throw new Error("network detail"); }) })).toMatchObject({ accepted: false, code: "network", status: 502 });
  });
  it("202 without accepted true or valid request_id is not success", async () => {
    expect(await submitToLynx(envelope(), { env: fakeEnv, fetcher: vi.fn(async () => Response.json({ accepted: false }, { status: 202 })) })).toMatchObject({ accepted: false, code: "invalid_response" });
  });
  it("browser timeouts/retries reuse exactly the same envelope", async () => {
    const input = envelope(); const bodies: string[] = [];
    const fetcher = vi.fn((_url: string | URL | Request, init?: RequestInit) => {
      bodies.push(init?.body as string);
      if (bodies.length === 2) return Promise.resolve(accepted());
      return new Promise<Response>((_resolve, reject) => init?.signal?.addEventListener("abort", () => reject(new Error("abort"))));
    });
    expect(await sendAttempt(input, fetcher, 5)).toMatchObject({ accepted: false, code: "timeout" });
    expect(await sendAttempt(input, fetcher, 5)).toMatchObject({ accepted: true });
    expect(bodies[0]).toBe(bodies[1]); expect(input.external_request_id).toBe(envelope().external_request_id);
  });
  it("invalid answers/body/size/origin never call upstream", async () => {
    configure(); const upstream = vi.fn(); vi.stubGlobal("fetch", upstream);
    expect((await POST(request({ ...envelope(), answers: {} }))).status).toBe(422);
    expect((await POST(request(envelope(), { Origin: "https://elsewhere.test" }))).status).toBe(403);
    expect((await POST(request(envelope(), { "Content-Type": "text/plain" }))).status).toBe(415);
    expect((await POST(request({ data: "x".repeat(33_000) }))).status).toBe(413);
    expect((await POST(request(envelope(), { "Content-Length": "40000" }))).status).toBe(413);
    expect((await POST(new Request("http://localhost/api/request", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" }))).status).toBe(400);
    expect(upstream).not.toHaveBeenCalled();
  });
  it("supports a public host/TLS differing from Next's internal request URL", async () => {
    configure(); vi.stubGlobal("fetch", vi.fn(async () => accepted()));
    expect((await POST(request(envelope(), { Host: "nidocanino.org", Origin: "https://nidocanino.org", "x-forwarded-proto": "https" }))).status).toBe(202);
    const proxied = new Request("http://localhost:3000/api/request", { method: "POST", headers: { "Content-Type": "application/json", Host: "nidocanino.org", Origin: "https://nidocanino.org", "x-forwarded-proto": "https" }, body: JSON.stringify(envelope()) });
    expect((await POST(proxied)).status).toBe(202);
    expect((await POST(request(envelope(), { Host: "nidocanino.org", Origin: "https://evil.test", "x-forwarded-host": "evil.test" }))).status).toBe(403);
  });
  it("client modules cannot access Lynx credentials or call its endpoint", () => {
    for (const file of ["components/request/request-form.tsx", "lib/request/client.ts", "lib/request/contract.ts"]) {
      const source = readFileSync(file, "utf8");
      expect(source).not.toContain("LYNX_NIDO_AUTHORIZATION"); expect(source).not.toContain("lynx-business-os.vercel.app");
      expect(source).not.toContain(fakeEnv.LYNX_NIDO_AUTHORIZATION);
    }
    expect(readFileSync("lib/lynx/public-intake.ts", "utf8")).toContain('import "server-only"');
    expect(readFileSync("lib/lynx/config.ts", "utf8")).toContain('import "server-only"');
  });
});
