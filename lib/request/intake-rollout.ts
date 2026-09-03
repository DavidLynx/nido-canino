import { envelopeSchema, type RequestEnvelope } from "./contract";
import { envelopeSchema as legacyEnvelopeSchema, type RequestEnvelope as LegacyRequestEnvelope } from "./legacy-contract";

// Verified read-only in Lynx on 2026-09-02. Only the legacy branch pins this version.
export const NIDO_LEGACY_INTAKE_VERSION = 1;
export type IntakeEnvelope = RequestEnvelope | LegacyRequestEnvelope;
const refinedKeys = ["first_name", "last_name", "email", "alternate_phone", "preferred_channel"] as const;

export function intakeGeneration(raw: unknown): "legacy" | "refined" | null {
  if (!raw || typeof raw !== "object" || !("answers" in raw)) return null;
  const answers = raw.answers;
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) return null;
  const has = (key: string) => Object.hasOwn(answers, key);
  if (has("full_name")) return refinedKeys.some(has) ? null : "legacy";
  return has("first_name") && has("last_name") ? "refined" : null;
}

/** Discriminate BEFORE historical whitelisting can remove hybrid/ambiguous keys. */
export function parseIntakeEnvelope(raw: unknown) {
  const generation = intakeGeneration(raw);
  if (generation === "legacy") return legacyEnvelopeSchema.safeParse(raw);
  return envelopeSchema.safeParse(generation === "refined" ? raw : null);
}

export function isLegacyEnvelope(input: IntakeEnvelope): input is LegacyRequestEnvelope {
  return intakeGeneration(input) === "legacy";
}
