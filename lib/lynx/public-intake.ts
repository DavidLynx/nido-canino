import "server-only";

import { contactName, NEEDS, type RequestEnvelope } from "../request/contract";
import { isLegacyEnvelope, NIDO_LEGACY_INTAKE_VERSION, type IntakeEnvelope } from "../request/intake-rollout";
import { getIntakeConfig } from "./config";

export const LYNX_TIMEOUT_MS = 12_000;
export type IntakeFailure = "configuration" | "policy_changed" | "validation" | "authorization" | "conflict" | "rate_limit" | "upstream" | "timeout" | "network" | "invalid_response";
export type IntakeResult = { accepted: true; request_id: string } | { accepted: false; code: IntakeFailure; status: number; retry_after?: number };

export function buildLynxPayload(input: IntakeEnvelope, policyVersion: string) {
  const a = input.answers;
  return {
    metadata: {
      schema_version: 1, external_request_id: input.external_request_id,
      submitted_at: input.submitted_at, form_slug: "website-intake",
      ...(isLegacyEnvelope(input) ? { form_version: NIDO_LEGACY_INTAKE_VERSION } : {}),
    },
    attribution: {
      ...input.attribution, source_self_reported: a.source_self_reported,
      ...(a.source_detail ? { source_detail: a.source_detail } : {}),
    },
    contact: isLegacyEnvelope(input)
      ? { full_name: input.answers.full_name, phone: a.phone, locality: a.locality, zone: a.zone }
      : { full_name: contactName(input.answers as RequestEnvelope["answers"]), first_name: a.first_name, last_name: a.last_name,
      email: a.email, phone: a.phone, alternate_phone: a.alternate_phone,
      ...(a.preferred_channel ? { preferred_channel: a.preferred_channel } : {}),
      locality: a.locality, zone: a.zone },
    request: {
      // The supplied contract does not specify an intent enum: retain the exact need label.
      intent: a.need_type,
      ...(a.need_type === NEEDS[1] ? { requested_dates: [a.trip_start, a.trip_end] } : {}),
      ...(a.need_type === NEEDS[2] ? { requested_dates: [a.single_date] } : {}),
      ...(a.need_type === NEEDS[0] ? { frequency: `${a.weekly_days_count} días/semana: ${a.weekly_days?.join(", ")}` } : {}),
      concern: a.care_concern || "Solicitud inicial enviada desde nidocanino.org/request",
    },
    context: {}, // No browser-provided identity, and no unsafe name matching.
    // Lynx website-intake defines dog_count as a string select; Nido keeps its numeric model.
    answers: { ...a, dog_count: String(a.dog_count) },
    consent: { accepted: true, policy_version: policyVersion, accepted_at: input.consent_accepted_at },
  };
}

function retryAfter(value: string | null) {
  const numeric = Number(value);
  const seconds = value && /^\d+$/.test(value) ? numeric : value ? Math.ceil((Date.parse(value) - Date.now()) / 1000) : 30;
  return Number.isFinite(seconds) ? Math.min(300, Math.max(1, seconds)) : 30;
}

/** No automatic retries, no logging, no persistence, and no upstream response passthrough. */
export async function submitToLynx(input: IntakeEnvelope, options: {
  env?: NodeJS.ProcessEnv; fetcher?: typeof fetch; timeoutMs?: number;
} = {}): Promise<IntakeResult> {
  const config = getIntakeConfig(options.env);
  if (!config) return { accepted: false, code: "configuration", status: 503 };
  if (input.policy_version !== config.policy.version) return { accepted: false, code: "policy_changed", status: 409 };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? LYNX_TIMEOUT_MS);
  try {
    const response = await (options.fetcher ?? fetch)(config.url, {
      method: "POST", redirect: "error", cache: "no-store", signal: controller.signal,
      headers: { Authorization: config.authorization, "Content-Type": "application/json" },
      body: JSON.stringify(buildLynxPayload(input, config.policy.version)),
    });
    if (response.status !== 202) {
      await response.body?.cancel();
      if ([400, 422].includes(response.status)) return { accepted: false, code: "validation", status: 422 };
      if ([401, 403].includes(response.status)) return { accepted: false, code: "authorization", status: 503 };
      if (response.status === 409) return { accepted: false, code: "conflict", status: 409 };
      if (response.status === 429) return { accepted: false, code: "rate_limit", status: 429, retry_after: retryAfter(response.headers.get("Retry-After")) };
      return { accepted: false, code: "upstream", status: 502 };
    }
    // Bound the response too; only request_id is exposed, never CRM/internal IDs.
    const reader = response.body?.getReader();
    if (!reader) return { accepted: false, code: "invalid_response", status: 502 };
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16_384) { await reader.cancel(); return { accepted: false, code: "invalid_response", status: 502 }; }
      chunks.push(value);
    }
    const data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (data?.accepted !== true || typeof data.request_id !== "string" || !/^[a-zA-Z0-9_-]{1,120}$/.test(data.request_id)) return { accepted: false, code: "invalid_response", status: 502 };
    return { accepted: true, request_id: data.request_id };
  } catch {
    return { accepted: false, code: controller.signal.aborted ? "timeout" : "network", status: controller.signal.aborted ? 504 : 502 };
  } finally { clearTimeout(timer); }
}
