import { describe, expect, it, vi } from "vitest";
import { getProConfig, handlePro } from "@/lib/admission-pro/server";
import { sendPro, proWhatsappUrl } from "@/lib/admission-pro/client";
import { accepted, completed, pending, token } from "./fixtures";

const env = { NODE_ENV: "test", LYNX_NIDO_AUTHORIZATION: "Bearer TEST-ID.TEST-NOT-A-SECRET", LYNX_BASE_URL: "http://127.0.0.1:4329" } as NodeJS.ProcessEnv;
const req = (body: unknown, headers: Record<string, string> = {}) => new Request("https://nido.example/api/admission-pro/resolve", { method: "POST", headers: { "content-type": "application/json", origin: "https://nido.example", ...headers }, body: JSON.stringify(body) });
describe("PRO server-only boundary", () => {
  it("resolves with the exact token and existing server authorization, sanitized response and security headers", async () => {
    const fetcher = vi.fn(async () => Response.json({ ...pending(), secret: "DO NOT EXPOSE" }));
    const r = await handlePro(req({ token }), "resolve", { env, fetcher });
    expect(r.status).toBe(200); expect(await r.json()).toEqual(pending());
    expect(fetcher).toHaveBeenCalledWith("http://127.0.0.1:4329/api/v1/admission-pro/nido-website/resolve", expect.objectContaining({ method: "POST", cache: "no-store", redirect: "error", headers: { Authorization: env.LYNX_NIDO_AUTHORIZATION, "Content-Type": "application/json" }, body: JSON.stringify({ token }) }));
    expect(r.headers.get("Cache-Control")).toBe("no-store"); expect(r.headers.get("Referrer-Policy")).toBe("no-referrer");
  });
  it("forwards exact frozen submit on retries and exposes only acceptance, never internal IDs", async () => {
    const fetcher = vi.fn<typeof fetch>(async () => Response.json(accepted, { status: 202 }));
    const input = { token, form_version: 1, answers: completed() };
    for (let i = 0; i < 2; i++) {
      const r = await handlePro(req(input), "submit", { env, fetcher });
      expect(r.status).toBe(202); expect(await r.json()).toEqual({ accepted: true });
    }
    expect(fetcher.mock.calls[0][1]?.body).toBe(fetcher.mock.calls[1][1]?.body);
  });
  it.each([{ }, { token, contact_id: "x" }, { token: "x".repeat(101) }])("rejects invalid resolve without upstream call", async body => {
    const fetcher = vi.fn(); expect((await handlePro(req(body), "resolve", { env, fetcher })).status).toBe(400); expect(fetcher).not.toHaveBeenCalled();
  });
  it("rejects identity overrides, oversized bodies, cross-site requests and unsupported content types", async () => {
    const fetcher = vi.fn();
    expect((await handlePro(req({ token, form_version: 1, answers: {}, selected_dog_keys: ["dog_2"] }), "submit", { env, fetcher })).status).toBe(400);
    expect((await handlePro(req({ token }, { origin: "https://other.example" }), "resolve", { env, fetcher })).status).toBe(403);
    expect((await handlePro(req({ token }, { "content-type": "text/plain" }), "resolve", { env, fetcher })).status).toBe(415);
    expect((await handlePro(req({ token: "x".repeat(131073) }), "resolve", { env, fetcher })).status).toBe(413);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it.each([[404,"unavailable",404],[409,"conflict",409],[429,"rate_limit",429],[400,"validation",400],[401,"configuration",503],[403,"configuration",503],[422,"not_ready",503],[500,"network",502],[302,"network",502]] as const)("maps upstream %s without diagnostics or token leakage", async (status, code, expected) => {
    const fetcher = vi.fn(async () => Response.json({ token, error: "private SQL detail" }, { status, headers: { "Retry-After": "1" } }));
    const r = await handlePro(req({ token }), "resolve", { env, fetcher });
    expect(r.status).toBe(expected); const body = await r.json(); expect(body.code).toBe(code); expect(JSON.stringify(body)).not.toMatch(/lxpro_|SQL|private/);
    if (status === 429) expect(body.retry_after).toBe(1);
  });
  it("handles consumed and refuses unsafe projection or malformed success", async () => {
    const consumed = await handlePro(req({ token }), "resolve", { env, fetcher: vi.fn(async () => Response.json({ status: "consumed" })) });
    expect(await consumed.json()).toEqual({ status: "consumed" });
    const unsafe = pending(); unsafe.prefill.dog_2_name = "Not allowed";
    expect((await handlePro(req({ token }), "resolve", { env, fetcher: vi.fn(async () => Response.json(unsafe)) })).status).toBe(502);
    expect((await handlePro(req({ token, form_version: 1, answers: completed() }), "submit", { env, fetcher: vi.fn(async () => Response.json({ accepted: true }, { status: 202 })) })).status).toBe(502);
  });
  it("handles network failures and bounded timeout without logging", async () => {
    const logger = vi.spyOn(console, "error");
    const network = await handlePro(req({ token }), "resolve", { env, fetcher: vi.fn(async () => { throw new Error(token); }) });
    expect(await network.json()).toEqual({ ok: false, code: "network" });
    const fetcher: typeof fetch = (_url, init) => new Promise((_resolve, reject) => init?.signal?.addEventListener("abort", () => reject(new Error("abort"))));
    const timed = await handlePro(req({ token }), "resolve", { env, fetcher, timeoutMs: 5 });
    expect(timed.status).toBe(504); expect(await timed.json()).toEqual({ ok: false, code: "timeout" }); expect(logger).not.toHaveBeenCalled();
  });
  it("uses a secure default without another secret and forbids insecure production overrides", async () => {
    expect(getProConfig({ ...env, LYNX_BASE_URL: undefined })?.baseUrl).toBe("https://lynx-business-os.vercel.app");
    expect(getProConfig({ ...env, NODE_ENV: "production" })).toBeNull();
    for (const url of ["http://example.com", "https://example.com/path", "https://name:pass@example.com", "https://example.com?token=secret"]) expect(getProConfig({ ...env, LYNX_BASE_URL: url })).toBeNull();
    const fetcher = vi.fn();
    expect((await handlePro(req({ token }), "resolve", { env: { NODE_ENV: "test" }, fetcher })).status).toBe(503); expect(fetcher).not.toHaveBeenCalled();
  });
});
describe("browser transport", () => {
  it("sends only JSON to same-origin boundary, never authorization; accepts only 202", async () => {
    const fetcher = vi.fn(async () => Response.json({ accepted: true }, { status: 202 }));
    expect(await sendPro("submit", { token, form_version: 1, answers: completed() }, fetcher)).toEqual({ accepted: true });
    expect(fetcher).toHaveBeenCalledWith("/api/admission-pro/submit", expect.objectContaining({ headers: { "Content-Type": "application/json" }, referrerPolicy: "no-referrer", cache: "no-store" }));
    expect(await sendPro("submit", { token }, vi.fn(async () => Response.json({ accepted: true })))).toEqual({ ok: false, code: "network" });
    expect(decodeURIComponent(proWhatsappUrl())).not.toMatch(/lxpro_|TEST|medicamento|salud|answers/);
  });
});
