import { answersSchema, type RequestEnvelope } from "./contract";
import { validDraft } from "../fixtures";

export function legacyDraft() {
  const answers = validDraft();
  for (const key of ["first_name", "last_name", "email", "alternate_phone", "preferred_channel"]) delete answers[key];
  return { full_name: "Tutor histórico", ...answers };
}

export function legacyEnvelope(): RequestEnvelope {
  const now = new Date().toISOString();
  return { kind: "canine", external_request_id: `nido-request-${crypto.randomUUID()}`,
    submitted_at: now, consent_accepted_at: now, policy_version: "TEST-POLICY",
    attribution: { landing_path: "/request?utm_source=legacy", utm_source: "legacy" },
    answers: answersSchema.parse(legacyDraft()) };
}
