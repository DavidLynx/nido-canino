import { describe, expect, it } from "vitest";
import { answersSchema, effectiveAnswers, envelopeSchema, NEEDS } from "@/lib/request/contract";
import { captureAttribution, createAttempt, whatsappUrl } from "@/lib/request/client";
import { dog, envelope, validDraft } from "./fixtures";

describe("Formulario 01 contract", () => {
  it("dog_count=1 sends only dog 1; no arbitrary fields", () => {
    const value = answersSchema.parse(validDraft({ ...dog(2), arbitrary: "ignored" }));
    expect(value.dog_1_name).toBe("Perro prueba 1");
    expect(value).not.toHaveProperty("dog_2_name"); expect(value).not.toHaveProperty("arbitrary");
  });
  it("dog_count=3 requires all six fields for each dog", () => {
    const draft = validDraft({ dog_count: 3, ...dog(2), ...dog(3) });
    expect(answersSchema.parse(draft).dog_3_name).toBe("Perro prueba 3");
    delete draft.dog_3_age;
    expect(answersSchema.safeParse(draft).success).toBe(false);
  });
  it("reducing 3 to 1 omits ALL hidden dog keys, not empty strings", () => {
    const draft = validDraft({ dog_count: 3, ...dog(2), ...dog(3) });
    draft.dog_count = 1;
    const value = answersSchema.parse(draft);
    expect(Object.keys(value).filter((k) => /^dog_[23]_/.test(k))).toEqual([]);
  });
  it.each([0, 6, 2.5, "cat"])("rejects invalid dog_count %s", (dog_count) => {
    expect(answersSchema.safeParse(validDraft({ dog_count })).success).toBe(false);
  });
  it("travel requires real dates in order", () => {
    expect(answersSchema.safeParse(validDraft({ need_type: NEEDS[1] })).success).toBe(false);
    expect(answersSchema.safeParse(validDraft({ need_type: NEEDS[1], trip_start: "2026-12-05", trip_end: "2026-12-01" })).success).toBe(false);
    expect(answersSchema.safeParse(validDraft({ need_type: NEEDS[1], trip_start: "2026-02-30", trip_end: "2026-03-01" })).success).toBe(false);
    expect(answersSchema.safeParse(validDraft({ need_type: NEEDS[1], trip_start: "2026-12-01", trip_end: "2026-12-01" })).success).toBe(true);
  });
  it("weekly requires count, days, no duplicates and coherent count", () => {
    expect(answersSchema.safeParse(validDraft({ need_type: NEEDS[0] })).success).toBe(false);
    expect(answersSchema.safeParse(validDraft({ need_type: NEEDS[0], weekly_days_count: 2, weekly_days: ["Lunes"] })).success).toBe(false);
    expect(answersSchema.safeParse(validDraft({ need_type: NEEDS[0], weekly_days_count: 2, weekly_days: ["Lunes", "Lunes"] })).success).toBe(false);
    expect(answersSchema.safeParse(validDraft({ need_type: NEEDS[0], weekly_days_count: 2, weekly_days: ["Lunes", "Viernes"] })).success).toBe(true);
  });
  it("single day and bite context are conditionally required", () => {
    expect(answersSchema.safeParse(validDraft({ need_type: NEEDS[2] })).success).toBe(false);
    expect(answersSchema.safeParse(validDraft({ bite_history: "Sí", bite_context: "  " })).success).toBe(false);
    expect(answersSchema.safeParse(validDraft({ bite_history: "Sí", bite_context: "Al asustarse" })).success).toBe(true);
  });
  it("hidden dates, days, bite context, source detail are omitted even if malformed", () => {
    const value = answersSchema.parse(validDraft({ trip_start: "invalid", trip_end: "invalid", single_date: "invalid", weekly_days_count: 100, weekly_days: ["Domingo"], bite_context: "stale", source_detail: "stale" }));
    for (const key of ["trip_start", "trip_end", "single_date", "weekly_days_count", "weekly_days", "bite_context", "source_detail"]) expect(value).not.toHaveProperty(key);
  });
  it("consent must be literal true and text is bounded", () => {
    expect(answersSchema.safeParse(validDraft({ privacy_consent: "true" })).success).toBe(false);
    expect(answersSchema.safeParse(validDraft({ first_name: "x".repeat(81) })).success).toBe(false);
    expect(answersSchema.safeParse(validDraft({ phone: "invalid" })).success).toBe(false);
  });
  it("rejects feline envelope and untrusted user identity/payload", () => {
    expect(envelopeSchema.safeParse({ ...envelope(), kind: "feline" }).success).toBe(false);
    expect(envelopeSchema.safeParse({ ...envelope(), context: { external_user_id: "fake" } }).success).toBe(false);
    expect(effectiveAnswers(null)).toBeNull();
  });
  it("captured attribution preserves UTM/referrer and legacy params without mapping answers", () => {
    const value = captureAttribution("https://nidocanino.org/request?source=services&intent=felino&utm_source=qr&utm_medium=print&utm_campaign=sept&utm_content=front&utm_term=dogs&campaign_or_qr_code=QR-1&email=private", "https://example.test/post?ref=1#section");
    expect(value).toMatchObject({ utm_source: "qr", utm_medium: "print", utm_campaign: "sept", utm_content: "front", utm_term: "dogs", campaign_or_qr_code: "QR-1", referrer: "https://example.test/post?ref=1" });
    expect(value.landing_path).toContain("source=services&intent=felino");
    expect(value.landing_path).not.toContain("email"); expect(value).not.toHaveProperty("source_self_reported");
    expect(captureAttribution("https://nidocanino.org/request", "javascript:alert(1)")).not.toHaveProperty("referrer");
  });
  it("new logical requests have new IDs; WhatsApp uses the external reference", () => {
    const a = createAttempt(envelope().answers, {}, "TEST-POLICY", new Date().toISOString());
    const b = createAttempt(envelope().answers, {}, "TEST-POLICY", new Date().toISOString());
    expect(a.external_request_id).not.toBe(b.external_request_id);
    expect(decodeURIComponent(whatsappUrl(a))).toContain(a.external_request_id);
    expect(decodeURIComponent(whatsappUrl(a))).not.toContain("Adjunto");
  });
});
