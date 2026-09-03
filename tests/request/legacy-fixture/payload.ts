// Exact historical builder body from 76884aa; only the test import path differs.
import { NEEDS, type RequestEnvelope } from "./contract";
export function buildLynxPayload(input: RequestEnvelope, policyVersion: string) {
  const a = input.answers;
  return {
    metadata: {
      schema_version: 1, external_request_id: input.external_request_id,
      submitted_at: input.submitted_at, form_slug: "website-intake", form_version: 1,
    },
    attribution: {
      ...input.attribution, source_self_reported: a.source_self_reported,
      ...(a.source_detail ? { source_detail: a.source_detail } : {}),
    },
    contact: { full_name: a.full_name, phone: a.phone, locality: a.locality, zone: a.zone },
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
