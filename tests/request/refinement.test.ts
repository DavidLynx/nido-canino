import { describe, expect, it } from "vitest";
import { answersSchema, CHANNEL_LABELS } from "@/lib/request/contract";
import { buildLynxPayload } from "@/lib/lynx/public-intake";
import { validDraft, envelope } from "./fixtures";

describe("refined Nido contact contract", () => {
  it.each(["first_name", "last_name", "email", "phone", "alternate_phone", "locality", "zone"])("requires %s", key => {
    const value = validDraft(); delete value[key];
    expect(answersSchema.safeParse(value).success).toBe(false);
    expect(answersSchema.safeParse(validDraft({ [key]: "" })).success).toBe(false);
  });
  it.each(["invalid", "a@", "a@ b.test"])("rejects invalid email %s", email => {
    expect(answersSchema.safeParse(validDraft({ email })).success).toBe(false);
  });
  it.each(["invalid", "123", "1234567890123456"])("applies the same validation to both phones: %s", phone => {
    for (const key of ["phone", "alternate_phone"]) expect(answersSchema.safeParse(validDraft({ [key]: phone })).success).toBe(false);
  });
  it.each(["+300 000 0000", "(300) 000-0000", "300.000.0000"])("rejects normalized duplicate alternate %s", alternate_phone => {
    expect(answersSchema.safeParse(validDraft({ alternate_phone })).success).toBe(false);
  });
  it("allows another person's number and an optional real CRM channel", () => {
    const value = answersSchema.parse(validDraft({ preferred_channel: "" }));
    expect(value).not.toHaveProperty("preferred_channel");
    expect(CHANNEL_LABELS).toEqual({ whatsapp: "WhatsApp", phone: "Llamada telefónica", email: "Correo electrónico" });
    for (const channel of Object.keys(CHANNEL_LABELS)) expect(answersSchema.parse(validDraft({ preferred_channel: channel })).preferred_channel).toBe(channel);
    expect(answersSchema.safeParse(validDraft({ preferred_channel: "sms" })).success).toBe(false);
  });
  it("composes full_name server-side; keeps distinct names, email and channel in the snapshot", () => {
    const value = envelope({ first_name: " María José ", last_name: " Peña Díaz ", email: "TUTOR@EXAMPLE.TEST", preferred_channel: "phone" });
    const payload = buildLynxPayload(value, "TEST-POLICY");
    expect(payload.contact).toMatchObject({ full_name: "María José Peña Díaz", first_name: "María José", last_name: "Peña Díaz", email: "tutor@example.test", alternate_phone: "3110000000", preferred_channel: "phone" });
    expect(payload.answers).toMatchObject({ first_name: "María José", last_name: "Peña Díaz", preferred_channel: "phone" });
    expect(payload.answers).not.toHaveProperty("full_name");
    expect(payload.metadata).not.toHaveProperty("form_version");
    expect(buildLynxPayload(value, "TEST-POLICY")).toEqual(payload);
  });
  it("bounds each name and the combined CRM display name", () => {
    expect(answersSchema.safeParse(validDraft({ first_name: "a".repeat(80), last_name: "b".repeat(80) })).success).toBe(false);
    expect(answersSchema.safeParse(validDraft({ first_name: "a".repeat(80), last_name: "b".repeat(79) })).success).toBe(true);
  });
});

