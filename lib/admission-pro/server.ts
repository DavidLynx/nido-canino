import "server-only";
import { resolveInputSchema, resolveResponseSchema, submitInputSchema, submitResponseSchema } from "./contract";

const HEADERS = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff" };
const MAX_BYTES = 131_072;
export type ProErrorCode = "unavailable" | "validation" | "conflict" | "rate_limit" | "configuration" | "not_ready" | "timeout" | "network";
function json(body: unknown, status: number, retryAfter?: number) {
  return Response.json(body, { status, headers: { ...HEADERS, ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}) } });
}
function fail(code: ProErrorCode, status: number, retryAfter?: number) {
  return json({ ok: false, code, ...(retryAfter ? { retry_after: retryAfter } : {}) }, status, retryAfter);
}

export function getProConfig(env: NodeJS.ProcessEnv = process.env) {
  const authorization = env.LYNX_NIDO_AUTHORIZATION?.trim();
  if (!authorization || !/^Bearer [^\s.]+\.[^\s]+$/.test(authorization)) return null;
  try {
    const url = new URL(env.LYNX_BASE_URL || "https://lynx-business-os.vercel.app");
    const local = env.NODE_ENV !== "production" && url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if ((url.protocol !== "https:" && !local) || url.username || url.password || url.hash || url.search || url.pathname !== "/") return null;
    return { baseUrl: url.origin, authorization };
  } catch { return null; }
}

async function readBounded(body: ReadableStream<Uint8Array> | null, max = MAX_BYTES) {
  if (!body) throw new Error("invalid_body");
  const reader = body.getReader();
  const chunks: Uint8Array[] = []; let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > max) { await reader.cancel(); throw new Error("body_limit"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
}

function retrySeconds(value: string | null) {
  const seconds = value && /^\d+$/.test(value) ? Number(value) : value ? Math.ceil((Date.parse(value) - Date.now()) / 1000) : 60;
  return Number.isFinite(seconds) ? Math.max(1, Math.min(300, seconds)) : 60;
}

// Lynx revalidates the persisted invitation, selected dogs, version and all answers on submit.
// Never accept identity/selection/structure from the browser or expose upstream diagnostics/IDs.
export async function handlePro(request: Request, operation: "resolve" | "submit", options: { env?: NodeJS.ProcessEnv; fetcher?: typeof fetch; timeoutMs?: number } = {}) {
  const publicUrl = new URL(request.url);
  const host = request.headers.get("host");
  if (host) { publicUrl.port = ""; publicUrl.host = host; }
  const protocol = request.headers.get("x-forwarded-proto");
  if (protocol === "https" || protocol === "http") publicUrl.protocol = `${protocol}:`;
  const origin = request.headers.get("origin");
  if ((origin && origin !== publicUrl.origin) || request.headers.get("sec-fetch-site") === "cross-site") return fail("validation", 403);
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return fail("validation", 415);
  if (Number(request.headers.get("content-length")) > MAX_BYTES) return fail("validation", 413);
  let raw: unknown;
  try { raw = await readBounded(request.body); }
  catch (error) { return fail("validation", error instanceof Error && error.message === "body_limit" ? 413 : 400); }
  const input = (operation === "resolve" ? resolveInputSchema : submitInputSchema).safeParse(raw);
  if (!input.success) return fail("validation", 400);
  const config = getProConfig(options.env);
  if (!config) return fail("configuration", 503);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? 12_000);
  try {
    const response = await (options.fetcher ?? fetch)(`${config.baseUrl}/api/v1/admission-pro/nido-website/${operation}`, {
      method: "POST", cache: "no-store", redirect: "error", signal: controller.signal,
      headers: { Authorization: config.authorization, "Content-Type": "application/json" }, body: JSON.stringify(input.data),
    });
    if (response.status !== (operation === "resolve" ? 200 : 202)) {
      await response.body?.cancel();
      if (response.status === 404) return fail("unavailable", 404);
      if (response.status === 400 || response.status === 413) return fail("validation", response.status);
      if (response.status === 409) return fail("conflict", 409);
      if (response.status === 429) return fail("rate_limit", 429, retrySeconds(response.headers.get("Retry-After")));
      if ([401, 403].includes(response.status)) return fail("configuration", 503);
      if (response.status === 422) return fail("not_ready", 503);
      return fail("network", 502);
    }
    const data = await readBounded(response.body, 262_144);
    if (operation === "resolve") {
      const parsed = resolveResponseSchema.safeParse(data);
      return parsed.success ? json(parsed.data, 200) : fail("not_ready", 502);
    }
    const parsed = submitResponseSchema.safeParse(data);
    return parsed.success ? json({ accepted: true }, 202) : fail("network", 502);
  } catch { return fail(controller.signal.aborted ? "timeout" : "network", controller.signal.aborted ? 504 : 502); }
  finally { clearTimeout(timer); }
}
