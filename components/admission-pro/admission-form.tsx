"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { conditionMet, effectiveAnswers, validateAnswers, type ProAnswers, type ProField, type ProPending, type ProSubmit } from "@/lib/admission-pro/contract";
import { proAccessWhatsapp, proWhatsappUrl, sendPro, type ProFailure } from "@/lib/admission-pro/client";
import styles from "./admission-form.module.css";

const MESSAGES: Record<string, string> = {
  validation: "No pudimos registrar la información. Revise los datos antes de enviar nuevamente.",
  conflict: "Este enlace no admite estos cambios o la versión del formulario cambió. Escríbanos para revisar su acceso.",
  configuration: "El servicio está temporalmente no disponible. Sus datos permanecen en esta pantalla.",
  not_ready: "No podemos habilitar el formulario en este momento. Escríbanos para revisar su acceso.",
  rate_limit: "Recibimos varios intentos seguidos. Espere el tiempo indicado antes de enviar nuevamente.",
  timeout: "La confirmación está tardando más de lo esperado. Puede intentar nuevamente sin volver a diligenciar sus datos.",
  network: "No pudimos confirmar el envío. Revise su conexión e intente nuevamente.",
};

function Field({ field, value, onChange, error }: { field: ProField; value: ProAnswers[string] | undefined; onChange: (value: ProAnswers[string]) => void; error?: string }) {
  const common = { id: field.id, name: field.id, "aria-invalid": !!error, "aria-describedby": field.help || error ? `${field.id}-help` : undefined };
  const multiple = ["multiselect", "checkbox"].includes(field.type);
  const choices = multiple || field.type === "radio";
  const boolean = ["boolean", "consent"].includes(field.type);
  const label = <>{field.label}{field.required ? "" : <span className={styles.help}> · Opcional</span>}</>;
  const help = field.help || error ? <p id={`${field.id}-help`} className={error ? styles.error : styles.help}>{error || field.help}</p> : null;
  if (choices) return <fieldset className={styles.choices} aria-describedby={common["aria-describedby"]}>
    <legend>{label}</legend>
    {field.options?.map((option, i) => <label key={option}>
      <input {...common} id={i === 0 ? field.id : `${field.id}-${i}`} type={multiple ? "checkbox" : "radio"} value={option}
        checked={multiple ? Array.isArray(value) && value.includes(option) : value === option}
        onChange={event => onChange(multiple ? (field.options ?? []).filter(item => item === option ? event.target.checked : Array.isArray(value) && value.includes(item)) : option)} />
      {option}
    </label>)}{help}
  </fieldset>;
  if (boolean) return <div className={styles.field}><label className={styles.check}>
    <input {...common} type="checkbox" required={field.required} checked={value === true} onChange={event => onChange(event.target.checked)} />{label}
  </label>{help}</div>;
  return <div className={`${styles.field} ${field.type === "long_text" ? styles.wide : ""}`}>
    <label htmlFor={field.id}>{label}</label>
    {field.type === "select" ? <select {...common} required={field.required} value={String(value ?? "")} onChange={event => onChange(event.target.value)}>
      <option value="">Seleccione</option>{field.options?.map(option => <option key={option}>{option}</option>)}
    </select> : field.type === "long_text" ? <textarea {...common} required={field.required} placeholder={field.placeholder} maxLength={5000} rows={3} value={String(value ?? "")} onChange={event => onChange(event.target.value)} />
      : <input {...common} required={field.required} placeholder={field.placeholder} maxLength={/^dog_[1-5]_(name|age|breed|sex|size|neutered)$/.test(field.id) ? 160 : 5000}
        type={field.type === "email" ? "email" : field.type === "phone" ? "tel" : field.type === "number" ? "number" : "text"}
        step={field.type === "number" ? "any" : undefined}
        value={String(value ?? "")} onChange={event => onChange(field.type === "number" && event.target.value !== "" ? Number(event.target.value) : event.target.value)} />}
    {help}
  </div>;
}

export function AdmissionForm() {
  const [phase, setPhase] = useState<"initial" | "info" | "loading" | "resolve_error" | "form" | "unavailable" | "consumed" | "success">("initial");
  const [resolution, setResolution] = useState<ProPending | null>(null);
  const [draft, setDraft] = useState<ProAnswers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [editable, setEditable] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failure, setFailure] = useState<ProFailure | null>(null);
  const [busy, setBusy] = useState(false);
  const [locked, setLocked] = useState(false);
  const [editingAttempt, setEditingAttempt] = useState(false);
  const [retryIn, setRetryIn] = useState(0);
  const token = useRef<string | null>(null);
  const initialized = useRef(false);
  const inFlight = useRef(false);
  const attempt = useRef<ProSubmit | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const alert = useRef<HTMLDivElement>(null);

  async function resolve() {
    if (!token.current || inFlight.current) return;
    inFlight.current = true; setBusy(true); setPhase("loading"); setFailure(null);
    try {
      const result = await sendPro("resolve", { token: token.current });
      if ("status" in result && result.status === "pending") {
        setResolution(result); setDraft({ ...result.prefill }); setPhase("form");
      } else if ("status" in result && result.status === "consumed") {
        token.current = null; setPhase("consumed");
      } else if ("ok" in result) {
        setFailure(result); setRetryIn(result.retry_after ?? 0);
        if (result.code === "unavailable") { token.current = null; setPhase("unavailable"); }
        else setPhase("resolve_error");
      }
    } finally { inFlight.current = false; setBusy(false); }
  }

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const url = new URL(window.location.href);
    // Prefer a fragment so the invitation secret is absent from the initial HTTP GET.
    const hashTokens = new URLSearchParams(url.hash.slice(1)).getAll("token");
    const tokens = hashTokens.length ? hashTokens : url.searchParams.getAll("token");
    // Read the invitation only after hydration; never serialize it in server-rendered props.
    if (!tokens.length) { queueMicrotask(() => setPhase("info")); return; }
    window.history.replaceState(window.history.state, "", url.pathname);
    if (tokens.length !== 1 || !tokens[0] || tokens[0].length > 100) { queueMicrotask(() => setPhase("unavailable")); return; }
    token.current = tokens[0];
    queueMicrotask(() => void resolve());
  }, []);
  useEffect(() => {
    if (!retryIn) return;
    const timer = setTimeout(() => setRetryIn(value => Math.max(0, value - 1)), 1000);
    return () => clearTimeout(timer);
  }, [retryIn]);
  useEffect(() => { if (failure) alert.current?.focus(); }, [failure]);

  function move(index: number) {
    setStepIndex(index); setErrors({});
    requestAnimationFrame(() => heading.current?.focus());
  }
  function change(id: string, value: ProAnswers[string]) {
    setDraft(current => ({ ...current, [id]: value }));
    setErrors(current => ({ ...current, [id]: "" }));
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (inFlight.current || !resolution || !token.current) return;
    const last = resolution.structure.steps.length - 1;
    if ((locked || stepIndex === last) && retryIn > 0) return;
    let outgoing = attempt.current;
    if (!locked) {
      const validated = validateAnswers(resolution.structure, draft);
      const stepIds = resolution.structure.steps[stepIndex].fields.map(field => field.id);
      const relevant = Object.fromEntries(Object.entries(validated.errors).filter(([id]) => stepIndex === last || stepIds.includes(id)));
      if (Object.keys(relevant).length) {
        const first = Object.keys(relevant)[0];
        const targetIndex = resolution.structure.steps.findIndex(step => step.fields.some(field => field.id === first));
        const target = resolution.structure.steps[targetIndex];
        // Only expand known data if the invalid field itself is inside that summary.
        if (resolution.prefill[first]) setEditable(current => ({ ...current, [target.id]: true }));
        setStepIndex(targetIndex); setErrors(relevant);
        requestAnimationFrame(() => document.getElementById(first)?.focus());
        return;
      }
      if (stepIndex < last) { setFurthest(value => Math.max(value, stepIndex + 1)); move(stepIndex + 1); return; }
      outgoing = { token: token.current, form_version: resolution.form_version, answers: structuredClone(validated.answers) };
      attempt.current = outgoing;
    }
    if (!outgoing) return;
    inFlight.current = true; setBusy(true); setLocked(true); setFailure(null);
    try {
      const result = await sendPro("submit", outgoing);
      if ("accepted" in result && result.accepted) {
        token.current = null; attempt.current = null; setDraft({}); setResolution(null); setPhase("success");
      } else if ("ok" in result) {
        setFailure(result); setRetryIn(result.retry_after ?? 0);
        if (result.code === "unavailable") { token.current = null; setPhase("unavailable"); }
      }
    } finally { inFlight.current = false; setBusy(false); }
  }
  function editAttempt() {
    if (inFlight.current) return;
    attempt.current = null; setLocked(false); setFailure(null); setErrors({}); setEditingAttempt(true);
  }
  const title = (step: ProPending["structure"]["steps"][number]) => step.id.startsWith("dog_") && draft[`${step.id}_name`] ? `Sobre ${draft[`${step.id}_name`]}` : step.title;
  const step = resolution?.structure.steps[stepIndex];
  const effective = resolution ? effectiveAnswers(resolution.structure, draft) : {};
  const known = step?.fields.filter(field => !!resolution?.prefill[field.id] && conditionMet(field.condition, effective)) ?? [];
  const showSummary = !!known.length && step && !editable[step.id];

  return <main className={styles.page}>
    <div className={styles.shell}>
      <header className={styles.intro}><span className="badge">Nido Canino · Proceso de ingreso</span><h1>Formulario de ingreso PRO</h1></header>
      <noscript>Para completar una invitación necesita activar JavaScript. Si aún no ha iniciado el proceso, puede <a href="/request">realizar la solicitud inicial</a>.</noscript>
      {phase === "initial" || phase === "loading" ? <p role="status">Estamos revisando su acceso…</p> : null}
      {phase === "info" ? <section className={styles.panel}>
        <p>Este formulario hace parte del proceso de ingreso de Nido Canino y se habilita después de revisar su solicitud inicial.</p>
        <p>Si todavía no ha iniciado el proceso, puede comenzar por la solicitud inicial de servicio.</p>
        <div className={styles.actions}><Link className="btn btn-primary" href="/request">Realizar solicitud inicial</Link></div>
      </section> : null}
      {phase === "unavailable" ? <section className={styles.panel}>
        <h2>Este enlace ya no está disponible.</h2>
        <p>Si Nido Canino le indicó completar el Formulario PRO, escríbanos para que podamos revisar su acceso.</p>
        <div className={styles.actions}><a className="btn btn-primary" href={proAccessWhatsapp} target="_blank" rel="noopener noreferrer">Continuar por WhatsApp</a></div>
      </section> : null}
      {phase === "resolve_error" ? <section className={styles.panel}>
        <div role="alert" ref={alert} tabIndex={-1}><h2>No pudimos abrir el formulario.</h2><p>{MESSAGES[failure?.code ?? ""] || MESSAGES.network}</p></div>
        {retryIn > 0 ? <p role="status">Puede intentar nuevamente en {retryIn} s.</p> : null}
        <div className={styles.actions}><button type="button" className="btn btn-primary" disabled={busy || retryIn > 0} onClick={() => void resolve()}>Intentar nuevamente</button>
          <a className="btn btn-secondary" href={proAccessWhatsapp} target="_blank" rel="noopener noreferrer">Revisar acceso por WhatsApp</a></div>
      </section> : null}
      {phase === "success" || phase === "consumed" ? <section className={styles.panel} role="status">
        <h2>{phase === "success" ? "Formulario PRO recibido" : "Este formulario PRO ya fue recibido"}</h2>
        <p>Gracias. Recibimos la información para continuar revisando el ingreso de su perro o sus perros.</p>
        <p>No representa por sí solo confirmación de cupo ni admisión.</p>
        <div className={styles.actions}><a className="btn btn-primary" href={proWhatsappUrl()} target="_blank" rel="noopener noreferrer">Continuar por WhatsApp</a></div>
      </section> : null}
      {phase === "form" && resolution && step ? <>
        <p className={styles.help}>Información para continuar la evaluación de ingreso. Complete sólo lo que falta y revise lo que ya conocemos.</p>
        <nav className={styles.progress} aria-label="Progreso del formulario PRO">
          <ol>{resolution.structure.steps.map((item, index) => <li key={item.id} aria-current={stepIndex === index ? "step" : undefined}>
            <button type="button" disabled={busy || locked || index > furthest} onClick={() => move(index)}>{index + 1}. {title(item)}</button>
          </li>)}</ol>
          <progress value={stepIndex + 1} max={resolution.structure.steps.length} aria-label={`Paso ${stepIndex + 1} de ${resolution.structure.steps.length}`} />
        </nav>
        <form className={styles.panel} onSubmit={submit} noValidate aria-busy={busy}>
          <h2 ref={heading} tabIndex={-1}>{title(step)}</h2>
          {step.description ? <p>{step.description}</p> : null}
          <p className={styles.help}>Paso {stepIndex + 1} de {resolution.structure.steps.length}. Complete los campos salvo los marcados como opcionales.</p>
          {editingAttempt && !locked ? <p className={styles.notice}>Puede corregir los datos. Si el envío anterior ya fue recibido, este enlace no admitirá cambios; escríbanos si necesita corregirlo.</p> : null}
          <fieldset className={styles.fields} disabled={busy || locked}>
            <legend className="sr-only">{title(step)}</legend>
            {showSummary ? <section className={styles.summary} aria-label="Información que ya tenemos">
              <h3>Información que ya tenemos</h3><dl>{known.map(field => <div key={field.id}><dt>{field.label}</dt><dd>{String(draft[field.id] ?? "")}</dd></div>)}</dl>
              <button type="button" className="btn btn-secondary" onClick={() => setEditable(current => ({ ...current, [step.id]: true }))}>Editar datos</button>
            </section> : null}
            <div className={styles.grid}>{step.fields.filter(field => conditionMet(field.condition, effective) && !(showSummary && known.includes(field))).map(field => <Field key={field.id} field={field} value={draft[field.id]} onChange={value => change(field.id, value)} error={errors[field.id]} />)}</div>
          </fieldset>
          {Object.values(errors).some(Boolean) ? <div className={styles.notice} role="alert">Revise los campos indicados antes de continuar.</div> : null}
          {failure ? <div className={styles.notice} role="alert" ref={alert} tabIndex={-1}>
            <p>{MESSAGES[failure.code] || MESSAGES.network}</p>
            {failure.code === "conflict" ? <a href={proAccessWhatsapp} target="_blank" rel="noopener noreferrer">Revisar acceso por WhatsApp</a> : null}
          </div> : null}
          {retryIn > 0 ? <p role="status">Puede enviar nuevamente en {retryIn} s. Puede revisar sus datos mientras espera.</p> : null}
          <div className={styles.actions}>
            {stepIndex > 0 && !locked ? <button type="button" className="btn btn-secondary" disabled={busy} onClick={() => move(stepIndex - 1)}>Anterior</button> : null}
            {failure ? <button type="button" className="btn btn-secondary" disabled={busy} onClick={editAttempt}>Editar datos</button> : null}
            <button type="submit" className="btn btn-primary" disabled={busy || ((locked || stepIndex === resolution.structure.steps.length - 1) && retryIn > 0)}>
              {busy ? "Enviando formulario…" : locked ? "Intentar nuevamente" : stepIndex === resolution.structure.steps.length - 1 ? "Enviar formulario PRO" : "Continuar"}
            </button>
          </div>
          <p className={styles.help}>Mantenga esta página abierta para conservar sus datos. No se guardan borradores al cerrar o recargar.</p>
        </form>
      </> : null}
      <p className={styles.privacy}><a href="/privacidad" target="_blank" rel="noopener noreferrer">Privacidad y tratamiento de datos</a></p>
    </div>
  </main>;
}
