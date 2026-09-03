import { ATTRIBUTION_KEYS, RETRY_MESSAGE, type Answers, type Attribution, type RequestEnvelope } from "./contract";

/** No storage of personal data: the immutable attempt lives only in this form's memory. */
export function createAttempt(answers: Answers, attribution: Attribution, policyVersion: string, acceptedAt: string): RequestEnvelope {
  return {
    kind: "canine", external_request_id: `nido-request-${crypto.randomUUID()}`,
    submitted_at: new Date().toISOString(), consent_accepted_at: acceptedAt,
    policy_version: policyVersion, attribution: { ...attribution }, answers: structuredClone(answers),
  };
}

export function captureAttribution(href: string, referrer: string): Attribution {
  const url = new URL(href);
  const result: Attribution = {};
  const retained = new URLSearchParams();
  for (const key of [...ATTRIBUTION_KEYS, "source", "intent"]) {
    const value = url.searchParams.get(key)?.trim().slice(0, 300);
    if (!value) continue;
    retained.set(key, value);
    if (key !== "source" && key !== "intent") result[key] = value;
  }
  // source/intent survive as URL context, never as invented visible answers.
  let landing = `/request${retained.size ? `?${retained}` : ""}`;
  // Drop entire trailing parameters, never truncate an encoded URL in the middle.
  while (landing.length > 2048) {
    const last = [...retained.keys()].at(-1);
    if (!last) break;
    retained.delete(last);
    landing = `/request${retained.size ? `?${retained}` : ""}`;
  }
  result.landing_path = landing;
  try {
    const previous = new URL(referrer);
    if (["https:", "http:"].includes(previous.protocol) && !previous.username && !previous.password) {
      previous.hash = "";
      if (previous.href.length <= 2048) result.referrer = previous.href;
    }
  } catch { /* Empty/invalid referrer is absent, not fabricated. */ }
  return result;
}

export function whatsappUrl(attempt: RequestEnvelope): string {
  const a = attempt.answers;
  const dogs = Array.from({ length: a.dog_count }, (_, i) => a[`dog_${i + 1}_name`]).join(", ");
  const dates = a.trip_start ? `${a.trip_start} al ${a.trip_end}` : a.single_date;
  const message = [
    "Hola, envié una solicitud desde la página de Nido Canino.",
    `Nombre: ${a.full_name}`, `Perro(s): ${dogs}`, `Necesidad: ${a.need_type}`,
    dates ? `Fechas: ${dates}` : "", `Referencia: ${attempt.external_request_id}`,
    "Quisiera continuar por este medio.",
  ].filter(Boolean).join("\n");
  return `https://wa.me/573124611816?text=${encodeURIComponent(message)}`;
}

export type RequestResult =
  | { accepted: true; request_id: string }
  | { accepted: false; code: string; message: string; retry_after?: number; field_errors?: Record<string, string> };

export async function sendAttempt(attempt: RequestEnvelope, fetcher = fetch, timeoutMs = 18_000): Promise<RequestResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetcher("/api/request", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attempt), signal: controller.signal,
    });
    const data = await response.json();
    if (response.status === 202 && data.accepted === true && typeof data.request_id === "string") return { accepted: true, request_id: data.request_id };
    // Only trust safe public fields returned by our own handler; never reflect upstream details.
    return { accepted: false, code: typeof data.code === "string" ? data.code : "unavailable", message: RETRY_MESSAGE,
      retry_after: typeof data.retry_after === "number" ? Math.min(300, Math.max(1, data.retry_after)) : undefined,
      field_errors: data.code === "validation" ? data.field_errors : undefined };
  } catch {
    return { accepted: false, code: controller.signal.aborted ? "timeout" : "network", message: RETRY_MESSAGE };
  } finally { clearTimeout(timer); }
}
