import { z } from "zod";

export const RETRY_MESSAGE = "No pudimos registrar su solicitud en este momento. Sus datos siguen en pantalla. Puede intentar nuevamente.";

export const SOURCES = ["Instagram", "Facebook", "TikTok", "Google", "Página web", "Recomendación", "Flyer / conjunto", "Veterinaria / pet shop / aliado", "Evento / feria", "Otro"] as const;
export const DETAIL_SOURCES: readonly string[] = SOURCES.slice(5);
export const NEEDS = ["Apoyo algunos días durante la semana", "Cuidado durante un viaje / pernocta", "Cuidado por un día puntual", "Perro senior o con necesidades particulares", "Aún no estoy seguro", "Otro"] as const;
export const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"] as const;
export const SEXES = ["Macho", "Hembra", "No sabe"] as const;
export const SIZES = ["Pequeño", "Mediano", "Grande", "No sabe"] as const;
export const NEUTERED = ["Sí", "No", "No sabe"] as const;
export const DOG_RELATIONSHIPS = ["Convive y juega con tranquilidad", "Suele relacionarse bien con una presentación gradual", "Prefiere mantener distancia o evita a otros perros", "Puede reaccionar con tensión, ladridos o intentos de pelea", "No sabe / ha tenido poco contacto"] as const;
export const CAT_REACTIONS = ["Convive con gatos o los ignora con tranquilidad", "Muestra interés o curiosidad manejable", "Persigue o presenta fijación intensa", "Ha intentado atacar o ha causado una lesión", "No sabe / no ha tenido contacto"] as const;
export const DOG_PARTS = ["name", "age", "breed_or_type", "sex", "size", "neutered"] as const;
export type AnswerValue = string | number | boolean | string[];
export type Draft = Record<string, AnswerValue>;

const text = (max: number) => z.string().trim().min(1, "Complete este campo.").max(max, `Use máximo ${max} caracteres.`);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Indique una fecha válida.").refine((v) => {
  const parsed = new Date(`${v}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === v;
}, "Indique una fecha válida.");
const optionalText = (max: number) => z.string().trim().max(max).optional();
const integerChoice = (max: number) => z.union([z.number(), z.string().regex(/^[1-5]$/)])
  .transform(Number).pipe(z.number().int().min(1).max(max));

/** Whitelist + conditional projection happens BEFORE validation, on both sides. */
export function effectiveAnswers(input: unknown): unknown {
  if (!input || typeof input !== "object" || Array.isArray(input)) return input;
  const raw = input as Record<string, unknown>;
  const keys = ["full_name", "phone", "locality", "zone", "source_self_reported", "need_type", "dog_count", "dog_relationship", "cat_reaction", "bite_history", "special_health_need", "care_concern", "privacy_consent"];
  if (DETAIL_SOURCES.includes(String(raw.source_self_reported))) keys.push("source_detail");
  if (raw.need_type === NEEDS[0]) keys.push("weekly_days_count", "weekly_days");
  if (raw.need_type === NEEDS[1]) keys.push("trip_start", "trip_end");
  if (raw.need_type === NEEDS[2]) keys.push("single_date");
  if (raw.bite_history === "Sí") keys.push("bite_context");
  const count = Number(raw.dog_count);
  if (Number.isInteger(count) && count >= 1 && count <= 5) {
    for (let n = 1; n <= count; n++) DOG_PARTS.forEach((part) => keys.push(`dog_${n}_${part}`));
  }
  return Object.fromEntries(keys.filter((key) => raw[key] !== undefined).map((key) => [key, raw[key]]));
}

const dogShape: Record<string, z.ZodType> = {};
for (let n = 1; n <= 5; n++) {
  dogShape[`dog_${n}_name`] = text(100).optional();
  dogShape[`dog_${n}_age`] = text(80).optional();
  dogShape[`dog_${n}_breed_or_type`] = text(120).optional();
  dogShape[`dog_${n}_sex`] = z.enum(SEXES).optional();
  dogShape[`dog_${n}_size`] = z.enum(SIZES).optional();
  dogShape[`dog_${n}_neutered`] = z.enum(NEUTERED).optional();
}

export const answersSchema = z.preprocess(effectiveAnswers, z.object({
  ...dogShape,
  full_name: text(120),
  phone: text(40).refine((v) => /^[+\d\s().-]+$/.test(v) && v.replace(/\D/g, "").length >= 7 && v.replace(/\D/g, "").length <= 15, "Indique un celular válido (7–15 dígitos)."),
  locality: text(100), zone: text(120),
  source_self_reported: z.enum(SOURCES), source_detail: optionalText(300),
  need_type: z.enum(NEEDS),
  trip_start: date.optional(), trip_end: date.optional(), single_date: date.optional(),
  weekly_days_count: integerChoice(5).optional(),
  weekly_days: z.array(z.enum(DAYS)).min(1).max(5).optional(),
  dog_count: integerChoice(5),
  dog_relationship: z.enum(DOG_RELATIONSHIPS), cat_reaction: z.enum(CAT_REACTIONS),
  bite_history: z.enum(["Sí", "No"]), bite_context: optionalText(1000),
  special_health_need: text(1500), care_concern: optionalText(1000),
  privacy_consent: z.literal(true, { error: "Debe autorizar el tratamiento de sus datos para enviar." }),
}).superRefine((data, ctx) => {
  const requireField = (key: string) => {
    if (!(data as Record<string, unknown>)[key]) ctx.addIssue({ code: "custom", path: [key], message: "Complete este campo." });
  };
  for (let n = 1; n <= data.dog_count; n++) DOG_PARTS.forEach((part) => requireField(`dog_${n}_${part}`));
  if (data.need_type === NEEDS[1]) {
    requireField("trip_start"); requireField("trip_end");
    if (data.trip_start && data.trip_end && data.trip_end < data.trip_start) ctx.addIssue({ code: "custom", path: ["trip_end"], message: "La fecha final no puede ser anterior a la inicial." });
  }
  if (data.need_type === NEEDS[2]) requireField("single_date");
  if (data.need_type === NEEDS[0]) {
    requireField("weekly_days_count"); requireField("weekly_days");
    if (data.weekly_days && (new Set(data.weekly_days).size !== data.weekly_days.length || data.weekly_days.length !== data.weekly_days_count)) ctx.addIssue({ code: "custom", path: ["weekly_days"], message: "Seleccione tantos días como indicó en la cantidad." });
  }
  if (data.bite_history === "Sí" && !data.bite_context?.trim()) requireField("bite_context");
}).transform((data) => Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined && value !== "")) as Answers));

export type Answers = Draft & {
  full_name: string; phone: string; locality: string; zone: string;
  source_self_reported: string; source_detail?: string; need_type: string;
  dog_count: number; weekly_days_count?: number; weekly_days?: string[];
  trip_start?: string; trip_end?: string; single_date?: string;
  care_concern?: string; privacy_consent: true;
};
export const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "campaign_or_qr_code"] as const;
const webUrl = z.string().max(2048).url().refine((v) => {
  const url = new URL(v);
  return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password && !url.hash;
});
export const attributionSchema = z.object({
  utm_source: optionalText(300), utm_medium: optionalText(300), utm_campaign: optionalText(300),
  utm_content: optionalText(300), utm_term: optionalText(300), campaign_or_qr_code: optionalText(300),
  referrer: webUrl.optional(),
  landing_path: z.string().max(2048).regex(/^\/request(?:\?[^#\r\n]*)?$/).optional(),
});
export type Attribution = Record<string, string>;
export const externalIdSchema = z.string().regex(/^nido-request-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
const timestamp = z.iso.datetime();
export const envelopeSchema = z.object({
  kind: z.literal("canine"), external_request_id: externalIdSchema,
  submitted_at: timestamp, consent_accepted_at: timestamp,
  policy_version: text(160), attribution: attributionSchema,
  answers: answersSchema,
}).strict().superRefine((data, ctx) => {
  const submitted = Date.parse(data.submitted_at);
  if (submitted > Date.now() + 300_000 || Date.parse(data.consent_accepted_at) > submitted) {
    ctx.addIssue({ code: "custom", path: ["consent_accepted_at"], message: "Revise la fecha del dispositivo y vuelva a autorizar." });
  }
});
export type RequestEnvelope = z.output<typeof envelopeSchema>;

export function fieldErrors(error: z.ZodError): Record<string, string> {
  return Object.fromEntries(error.issues.map((issue) => [String(issue.path.at(-1)), issue.code === "custom" || issue.code === "too_big" ? issue.message : "Complete este campo con una opción válida."]));
}
