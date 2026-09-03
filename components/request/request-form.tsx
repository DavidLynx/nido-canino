"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  answersSchema, fieldErrors, SOURCES, DETAIL_SOURCES, NEEDS, DAYS,
  SEXES, SIZES, NEUTERED, DOG_RELATIONSHIPS, CAT_REACTIONS,
  contactName, CHANNEL_LABELS, ALTERNATE_PHONE_HELP,
  type Draft, type RequestEnvelope,
} from "@/lib/request/contract";
import { captureAttribution, createAttempt, sendAttempt, whatsappUrl, type RequestResult } from "@/lib/request/client";
import styles from "./request-form.module.css";

const STEPS = ["Datos del tutor", "¿Cómo nos conoció?", "¿Qué necesita?", "Sus perros", "Convivencia y salud", "Contexto y autorización"];
const INITIAL: Draft = { dog_count: 1, privacy_consent: false };
const ERRORS: Record<string, string> = {
  validation: "Revise los datos de su solicitud antes de reintentar.",
  authorization: "El servicio de registro no está disponible temporalmente.",
  configuration: "El servicio de registro no está disponible temporalmente.",
  policy_changed: "La información de privacidad cambió. Recargue la página y revise la autorización antes de enviar.",
  conflict: "No pudimos confirmar el estado de esta solicitud. Puede intentarlo nuevamente o editarla para enviar una nueva solicitud.",
  rate_limit: "Recibimos varios intentos seguidos. Espere el tiempo indicado antes de reintentar.",
  timeout: "La confirmación está tardando más de lo esperado. Puede intentarlo nuevamente sin volver a diligenciar sus datos.",
  network: "Revise su conexión. Puede intentarlo nuevamente sin volver a diligenciar sus datos.",
};

function fieldStep(name: string) {
  if (["first_name", "last_name", "email", "phone", "alternate_phone", "preferred_channel", "locality", "zone"].includes(name)) return 0;
  if (name.startsWith("source_")) return 1;
  if (["need_type", "trip_start", "trip_end", "single_date", "weekly_days_count", "weekly_days"].includes(name)) return 2;
  if (name === "dog_count" || /^dog_\d+_/.test(name)) return 3;
  if (["dog_relationship", "cat_reaction", "bite_history", "bite_context", "special_health_need"].includes(name)) return 4;
  return 5;
}

type FieldProps = {
  name: string; label: string; draft: Draft; change: (name: string, value: string) => void;
  options?: readonly string[]; type?: string; optional?: boolean; help?: string; error?: string;
  maxLength?: number; min?: string; autoComplete?: string;
  optionLabels?: Record<string, string>;
};
function Field({ name, label, draft, change, options, optionLabels, type = "text", optional, help, error, maxLength = 120, min, autoComplete }: FieldProps) {
  const props = {
    id: name, name, value: String(draft[name] ?? ""), required: !optional,
    "aria-invalid": !!error, "aria-describedby": help || error ? `${name}-help` : undefined,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => change(name, event.target.value),
  };
  return <div className={styles.field}>
    <label htmlFor={name}>{label}{optional ? <span> · Opcional</span> : null}</label>
    {options ? <select {...props}><option value="">Seleccione</option>{options.map((value) => <option key={value} value={value}>{optionLabels?.[value] ?? value}</option>)}</select>
      : type === "textarea" ? <textarea {...props} maxLength={maxLength} rows={3} />
        : <input {...props} type={type} maxLength={maxLength} min={min} autoComplete={autoComplete} />}
    {help || error ? <p id={`${name}-help`} className={error ? styles.fieldError : styles.help}>{error || help}</p> : null}
  </div>;
}

export function RequestForm({ privacyPolicy }: { privacyPolicy: { version: string; url: string } | null }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [locked, setLocked] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingNotice, setEditingNotice] = useState("");
  const [result, setResult] = useState<RequestResult | null>(null);
  const [attempt, setAttempt] = useState<RequestEnvelope | null>(null);
  const [retryIn, setRetryIn] = useState(0);
  const busyRef = useRef(false);
  const attemptRef = useRef<RequestEnvelope | null>(null);
  const acceptedAt = useRef<string | null>(null);
  const attribution = useRef<Record<string, string> | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const ambiguousError = result && !result.accepted && !["validation", "authorization", "configuration", "policy_changed", "conflict", "rate_limit"].includes(result.code);

  useEffect(() => {
    attribution.current = captureAttribution(window.location.href, document.referrer);
  }, []);
  useEffect(() => {
    if (!retryIn) return;
    const timer = setTimeout(() => setRetryIn((value) => Math.max(0, value - 1)), 1000);
    return () => clearTimeout(timer);
  }, [retryIn]);
  useEffect(() => { if (result) resultRef.current?.focus(); }, [result]);

  function move(next: number) {
    setStep(next);
    setErrors({});
    requestAnimationFrame(() => titleRef.current?.focus());
  }
  function change(name: string, value: string) {
    setDraft((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }
  const field = (name: string, label: string, extra: Partial<FieldProps> = {}) => <Field key={name} name={name} label={label} draft={draft} change={change} error={errors[name]} {...extra} />;

  function validateCurrent() {
    if (!formRef.current?.reportValidity()) return false;
    const parsed = answersSchema.safeParse(draft);
    if (!parsed.success) {
      const all = fieldErrors(parsed.error);
      const visible = Object.fromEntries(Object.entries(all).filter(([key]) => formRef.current?.elements.namedItem(key)));
      if (Object.keys(visible).length) { setErrors(visible); document.getElementById(Object.keys(visible)[0])?.focus(); return false; }
    }
    if (step === 2 && draft.need_type === NEEDS[0]) {
      const days = draft.weekly_days as string[] | undefined;
      if (!days?.length || days.length !== Number(draft.weekly_days_count)) {
        setErrors({ weekly_days: "Seleccione tantos días como indicó en la cantidad." });
        document.getElementById("weekly_days")?.focus();
        return false;
      }
    }
    return true;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busyRef.current || ((locked || step === 5) && retryIn > 0)) return;
    if (!locked && !validateCurrent()) return;
    if (step < 5 && !locked) { move(step + 1); return; }
    if (!privacyPolicy) return;

    let outgoing = attemptRef.current;
    if (!locked) {
      const parsed = answersSchema.safeParse(draft);
      if (!parsed.success) {
        const invalid = fieldErrors(parsed.error);
        move(fieldStep(Object.keys(invalid)[0]));
        setErrors(invalid);
        return;
      }
      if (!acceptedAt.current) return;
      outgoing = createAttempt(parsed.data, attribution.current ?? captureAttribution(window.location.href, document.referrer), privacyPolicy.version, acceptedAt.current);
    }
    if (!outgoing) return;
    // Capture once before the first network call; rapid clicks and retries reuse this exact envelope.
    attemptRef.current = outgoing;
    setAttempt(outgoing);
    setLocked(true);
    busyRef.current = true;
    setBusy(true);
    setResult(null);
    try {
      const response = await sendAttempt(outgoing);
      setResult(response);
      if (!response.accepted && response.retry_after) setRetryIn(response.retry_after);
    } finally { busyRef.current = false; setBusy(false); }
  }

  function editRequest() {
    if (busyRef.current) return;
    const unavailable = result && !result.accepted && ["authorization", "configuration", "policy_changed"].includes(result.code);
    setEditingNotice(unavailable ? ERRORS[result.code] : "");
    // Abandon only the client attempt. The original may already exist at the receiver.
    attemptRef.current = null; acceptedAt.current = null;
    setAttempt(null); setResult(null); setLocked(false); setEditing(true);
    setDraft((current) => ({ ...current, privacy_consent: false }));
    move(5);
  }

  function newRequest() {
    attemptRef.current = null; acceptedAt.current = null;
    setAttempt(null); setDraft({ ...INITIAL }); setResult(null); setLocked(false); setRetryIn(0);
    setEditing(false); setEditingNotice("");
    move(0);
  }

  return <main className={styles.page}>
    <div className={styles.shell}>
      <header className={styles.intro}>
        <span className="badge">Solicitud inicial · Formulario 01</span>
        <h1>Conozcamos a su perro.</h1>
        <p>Cuéntenos qué necesita y cómo es su compañero. Revisaremos su solicitud para orientar el siguiente paso, con calma y criterio.</p>
        <p className={styles.meta}>Aproximadamente 3 minutos · Sin reserva automática</p>
      </header>

      <details className={styles.feline}>
        <summary>¿Busca cuidado para un gato?</summary>
        <p>El cuidado felino a domicilio tiene una ruta diferente. Puede consultar por WhatsApp sin completar preguntas caninas. Esta consulta no se registra mediante este formulario.</p>
        <a href={`https://wa.me/573124611816?text=${encodeURIComponent("Hola, quisiera consultar por cuidado felino a domicilio con Nido Canino.")}`} target="_blank" rel="noopener noreferrer">Consultar cuidado felino por WhatsApp ↗</a>
      </details>

      {result?.accepted && attempt ? <div className={styles.panel} ref={resultRef} tabIndex={-1} role="status">
        <span className="badge">Solicitud recibida</span>
        <h2>Gracias, {contactName(attempt.answers)}.</h2>
        <p>Recibimos su solicitud correctamente. Ahora puede continuar por WhatsApp para conversar con nosotros.</p>
        <p>No es una confirmación de reserva ni de admisión.</p>
        <p className={styles.reference}>Código de solicitud: {attempt.external_request_id}</p>
        <div className={styles.actions}>
          <a className="btn btn-primary" href={whatsappUrl(attempt)} target="_blank" rel="noopener noreferrer">Continuar por WhatsApp ↗</a>
          <button className="btn btn-secondary" type="button" onClick={newRequest}>Crear una nueva solicitud</button>
        </div>
      </div> : <>
        <nav className={styles.progress} aria-label="Progreso del formulario">
          <ol>{STEPS.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} className={index <= step ? styles.active : undefined}>
            {editing ? <button type="button" disabled={busy || locked} onClick={() => move(index)} aria-label={`Ir al paso ${index + 1}: ${label}`}><span>{index + 1}</span><small>{label}</small></button> : <><span>{index + 1}</span><small>{label}</small></>}
          </li>)}</ol>
          <progress max={6} value={step + 1} aria-label={`Paso ${step + 1} de 6`} />
        </nav>
        {!privacyPolicy ? <p className={styles.notice} role="status">El envío está temporalmente deshabilitado mientras completamos la configuración del consentimiento. Puede consultar la política y explorar el formulario, pero no se enviarán datos.</p> : null}
        <form className={styles.panel} ref={formRef} onSubmit={submit} noValidate aria-busy={busy}>
          {editing && !locked ? <div className={styles.notice} role="status">
            <p>Conservamos sus datos. Puede volver a cualquier paso. Al enviar, se creará una nueva solicitud; confirme nuevamente la autorización.</p>
            {editingNotice ? <p>{editingNotice}</p> : null}
            {retryIn > 0 ? <p>Puede editar ahora y enviar en {retryIn} s.</p> : null}
          </div> : null}
          <header className={styles.sectionHeading}>
            <span>Paso {step + 1} de 6</span>
            <h2 ref={titleRef} tabIndex={-1}>{STEPS[step]}</h2>
            <p>Complete todos los campos salvo los marcados como opcionales.</p>
          </header>
          <fieldset className={styles.fields} disabled={busy || locked}>
            <legend className="sr-only">{STEPS[step]}</legend>
            {step === 0 ? <div className={styles.grid}>
              {field("first_name", "Nombre(s)", { autoComplete: "given-name", maxLength: 80 })}
              {field("last_name", "Apellido(s)", { autoComplete: "family-name", maxLength: 80 })}
              {field("email", "Correo electrónico", { type: "email", autoComplete: "email", maxLength: 254 })}
              {field("phone", "Celular / WhatsApp", { type: "tel", autoComplete: "tel", maxLength: 40 })}
              {field("alternate_phone", "Teléfono alterno / de emergencia", { type: "tel", autoComplete: "off", maxLength: 40, help: ALTERNATE_PHONE_HELP })}
              {field("preferred_channel", "Canal preferido de comunicación", { optional: true, options: Object.keys(CHANNEL_LABELS), optionLabels: CHANNEL_LABELS })}
              {field("locality", "Localidad", { help: "Por ejemplo: Fontibón o Engativá.", maxLength: 100 })}
              {field("zone", "Barrio / zona", { help: "No necesitamos su dirección exacta." })}
            </div> : null}
            {step === 1 ? <>
              {field("source_self_reported", "¿Cómo conoció Nido Canino?", { options: SOURCES })}
              {DETAIL_SOURCES.includes(String(draft.source_self_reported)) ? field("source_detail", "¿Puede contarnos un poco más?", { optional: true, maxLength: 300, help: "Nombre de quien nos recomendó, conjunto, aliado o evento." }) : null}
            </> : null}
            {step === 2 ? <>
              {field("need_type", "¿Qué necesita resolver?", { options: NEEDS })}
              {draft.need_type === NEEDS[1] ? <div className={styles.grid}>
                {field("trip_start", "Inicio del viaje", { type: "date" })}
                {field("trip_end", "Fin del viaje", { type: "date", min: String(draft.trip_start || "") })}
              </div> : null}
              {draft.need_type === NEEDS[2] ? field("single_date", "¿Qué día necesita cuidado?", { type: "date" }) : null}
              {draft.need_type === NEEDS[0] ? <>
                {field("weekly_days_count", "¿Cuántos días por semana?", { options: ["1", "2", "3", "4", "5"] })}
                <fieldset id="weekly_days" tabIndex={-1} className={styles.days} aria-describedby={errors.weekly_days ? "days-error" : undefined}>
                  <legend>Seleccione los días</legend>
                  {DAYS.map((day) => <label key={day}><input type="checkbox" name="weekly_days" value={day} checked={(draft.weekly_days as string[] | undefined)?.includes(day) ?? false}
                    onChange={(e) => setDraft((current) => ({ ...current, weekly_days: DAYS.filter((item) => item === day ? e.target.checked : (current.weekly_days as string[] | undefined)?.includes(item)) }))} />{day}</label>)}
                  {errors.weekly_days ? <p id="days-error" className={styles.fieldError}>{errors.weekly_days}</p> : null}
                </fieldset>
              </> : null}
            </> : null}
            {step === 3 ? <>
              {field("dog_count", "¿Cuántos perros necesitan cuidado?", { options: ["1", "2", "3", "4", "5"] })}
              {Array.from({ length: Number(draft.dog_count) || 1 }, (_, i) => <section className={styles.dog} key={i} aria-label={`Perro ${i + 1}`}>
                <h3>Perro {i + 1}</h3>
                <div className={styles.grid}>
                  {field(`dog_${i + 1}_name`, "Nombre", { maxLength: 100 })}
                  {field(`dog_${i + 1}_age`, "Edad aproximada", { maxLength: 80, help: "Por ejemplo: 3 años o 8 meses." })}
                  {field(`dog_${i + 1}_breed_or_type`, "Raza o tipo")}
                  {field(`dog_${i + 1}_sex`, "Sexo", { options: SEXES })}
                  {field(`dog_${i + 1}_size`, "Tamaño", { options: SIZES })}
                  {field(`dog_${i + 1}_neutered`, "¿Está esterilizado?", { options: NEUTERED })}
                </div>
              </section>)}
            </> : null}
            {step === 4 ? <>
              <p className={styles.help}>Si tiene varios perros, responda pensando en lo que debamos tener presente del grupo. Puede aclarar diferencias en el contexto final.</p>
              {field("dog_relationship", "¿Cómo se relaciona con otros perros?", { options: DOG_RELATIONSHIPS })}
              {field("cat_reaction", "¿Cómo reacciona ante los gatos?", { options: CAT_REACTIONS })}
              {field("bite_history", "¿Ha mordido a una persona o a otro animal?", { options: ["Sí", "No"] })}
              {draft.bite_history === "Sí" ? field("bite_context", "Cuéntenos brevemente en qué contexto ocurrió", { type: "textarea", maxLength: 1000 }) : null}
              {field("special_health_need", "¿Tiene alguna necesidad de salud o cuidado especial?", { type: "textarea", maxLength: 1500, help: "Si no aplica, puede escribir “No”. Sólo necesitamos lo esencial, no una historia clínica." })}
            </> : null}
            {step === 5 ? <>
              {field("care_concern", "¿Hay algo que le preocupe especialmente al dejarlo al cuidado de otra persona?", { type: "textarea", optional: true, maxLength: 1000 })}
              <div className={styles.review}>
                <h3>Antes de enviar</h3>
                <p>{String(draft.first_name || "")} {String(draft.last_name || "")} · {String(draft.phone || "")}</p>
                <p>{String(draft.need_type || "")}</p>
                <p>Perro(s): {Array.from({ length: Number(draft.dog_count) }, (_, i) => String(draft[`dog_${i + 1}_name`] || "")).join(", ")}</p>
                <p>Primero registraremos su solicitud. Después podrá continuar por WhatsApp.</p>
              </div>
              <label className={styles.consent}>
                <input name="privacy_consent" type="checkbox" required disabled={!privacyPolicy} checked={draft.privacy_consent === true}
                  onChange={(event) => { acceptedAt.current = event.target.checked ? new Date().toISOString() : null; setDraft((current) => ({ ...current, privacy_consent: event.target.checked })); }} />
                <span>He leído la <a href="/privacidad" target="_blank" rel="noopener noreferrer">Política de Tratamiento de Datos Personales y Privacidad</a> de Nido Canino y autorizo el tratamiento de los datos suministrados para gestionar mi solicitud, evaluar la prestación de los servicios, comunicarse conmigo y administrar la relación de servicio.</span>
              </label>
              {errors.privacy_consent ? <p className={styles.fieldError}>{errors.privacy_consent}</p> : null}
            </> : null}
          </fieldset>

          {Object.values(errors).some(Boolean) ? <p role="alert" className={styles.fieldError}>Revise los campos indicados. Puede volver a los pasos anteriores para corregirlos.</p> : null}
          {result && !result.accepted ? <div ref={resultRef} tabIndex={-1} role="alert" className={styles.notice}>
            <p>{result.message}</p><p>{ERRORS[result.code] || "Puede intentarlo nuevamente sin volver a diligenciar sus datos."}</p>
            {attempt ? <p className={styles.reference}>Código de solicitud: {attempt.external_request_id}</p> : null}
            {retryIn > 0 ? <p role="status">Puede reintentar en {retryIn} s.</p> : null}
          </div> : null}
          <div className={styles.actions}>
            {result && !result.accepted ? <div className={styles.editAction}>
              <button type="button" className="btn btn-secondary" disabled={busy} onClick={editRequest} aria-describedby={ambiguousError ? "edit-request-help" : undefined}>Editar solicitud</button>
              {ambiguousError ? <p id="edit-request-help" className={styles.help}>Si cambia los datos, se enviará como una nueva solicitud.</p> : null}
            </div> : null}
            {step > 0 && !locked ? <button type="button" className="btn btn-secondary" disabled={busy} onClick={() => move(step - 1)}>Anterior</button> : null}
            <button type="submit" className="btn btn-primary" disabled={busy || ((locked || step === 5) && retryIn > 0) || (step === 5 && !privacyPolicy)}>
              {busy ? "Registrando solicitud…" : locked ? "Intentar nuevamente" : step < 5 ? "Continuar" : "Enviar solicitud"}
            </button>
          </div>
          <p className={styles.help}>Mantenga esta página abierta mientras reintenta para conservar la solicitud.</p>
        </form>
      </>}
    </div>
  </main>;
}
