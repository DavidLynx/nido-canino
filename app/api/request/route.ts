import { fieldErrors, RETRY_MESSAGE } from "@/lib/request/contract";
import { parseIntakeEnvelope } from "@/lib/request/intake-rollout";
import { submitToLynx } from "@/lib/lynx/public-intake";

export const runtime = "nodejs";
export const maxDuration = 20;
const MAX_BODY_BYTES = 32_768;

function json(body: unknown, status: number, extra: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...extra } });
}
function fail(code: string, status: number) {
  return json({ accepted: false, code, message: RETRY_MESSAGE }, status);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Next may expose an internal localhost URL. Compare the browser origin with
  // the incoming Host (not arbitrary X-Forwarded-Host); preserve proxy TLS scheme.
  const publicUrl = new URL(request.url);
  const host = request.headers.get("host");
  if (host) { publicUrl.port = ""; publicUrl.host = host; }
  const protocol = request.headers.get("x-forwarded-proto");
  if (protocol === "https" || protocol === "http") publicUrl.protocol = `${protocol}:`;
  if ((origin && origin !== publicUrl.origin) || request.headers.get("sec-fetch-site") === "cross-site") return fail("origin", 403);
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return fail("content_type", 415);
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) return fail("body_size", 413);

  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail("validation", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); return fail("body_size", 413); }
      chunks.push(value);
    }
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return fail("validation", 400); }

  const parsed = parseIntakeEnvelope(raw);
  if (!parsed.success) return json({ accepted: false, code: "validation", message: RETRY_MESSAGE, field_errors: fieldErrors(parsed.error) }, 422);

  const result = await submitToLynx(parsed.data);
  if (result.accepted) return json(result, 202);
  return json({ accepted: false, code: result.code, message: RETRY_MESSAGE, ...(result.retry_after ? { retry_after: result.retry_after } : {}) }, result.status,
    result.retry_after ? { "Retry-After": String(result.retry_after) } : {});
}
