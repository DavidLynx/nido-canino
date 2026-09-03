import { answersSchema, CAT_REACTIONS, DOG_RELATIONSHIPS, NEEDS, type Draft, type RequestEnvelope } from "@/lib/request/contract";

export const fakeEnv: NodeJS.ProcessEnv = {
  NODE_ENV: "test", LYNX_NIDO_AUTHORIZATION: "Bearer TEST-ID.TEST-NOT-A-SECRET",
  LYNX_PUBLIC_INTAKE_URL: "https://example.test/intake",
  NIDO_PRIVACY_POLICY_VERSION: "TEST-POLICY", NIDO_PRIVACY_POLICY_URL: "https://example.test/privacy",
};
export const policy = { version: "TEST-POLICY", url: "https://example.test/privacy" };
export function dog(n: number): Draft {
  return Object.fromEntries(Object.entries({ name: `Perro prueba ${n}`, age: "3 años", breed_or_type: "Mestizo", sex: "Macho", size: "Mediano", neutered: "Sí" }).map(([key, value]) => [`dog_${n}_${key}`, value]));
}
export function validDraft(extra: Draft = {}): Draft {
  return {
    first_name: "Tutor", last_name: "de prueba", email: "tutor@example.test", alternate_phone: "3110000000", phone: "3000000000", locality: "Fontibón", zone: "Modelia",
    source_self_reported: "Instagram", need_type: NEEDS[4], dog_count: 1, ...dog(1),
    dog_relationship: DOG_RELATIONSHIPS[0], cat_reaction: CAT_REACTIONS[0], bite_history: "No",
    special_health_need: "No", privacy_consent: true, ...extra,
  };
}
export function envelope(extra: Draft = {}): RequestEnvelope {
  return {
    kind: "canine", external_request_id: "nido-request-12345678-1234-4234-8234-123456789012",
    submitted_at: "2026-01-01T12:00:00.000Z", consent_accepted_at: "2026-01-01T11:59:00.000Z",
    policy_version: "TEST-POLICY", attribution: { landing_path: "/request?source=services&intent=evaluacion", utm_source: "test-campaign" },
    answers: answersSchema.parse(validDraft(extra)),
  };
}
