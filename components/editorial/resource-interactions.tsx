"use client";

import { useState, useSyncExternalStore } from "react";

const CHANGE_EVENT = "nido-resource-change";
const RESET_EVENT = "nido-resource-reset";

function readStoredValues(storageKey: string) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(saved) ? saved.map((value) => value === true) : [];
  } catch {
    return [] as boolean[];
  }
}

function readProgress(storageKey: string, total: number) {
  const saved = readStoredValues(storageKey);
  const values = Array.from({ length: total }, (_, index) => saved[index] === true);
  return { completed: values.filter(Boolean).length, values };
}

export function PersistentCheckbox({
  defaultChecked,
  index,
  storageKey,
}: {
  defaultChecked: boolean;
  index: number;
  storageKey: string;
}) {
  const subscribe = (onStoreChange: () => void) => {
    const update = (event: Event) => {
      if ((event as CustomEvent<string>).detail === storageKey) onStoreChange();
    };
    window.addEventListener(CHANGE_EVENT, update);
    window.addEventListener(RESET_EVENT, update);
    return () => {
      window.removeEventListener(CHANGE_EVENT, update);
      window.removeEventListener(RESET_EVENT, update);
    };
  };
  const getSnapshot = () => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "null");
      return Array.isArray(saved) && typeof saved[index] === "boolean" ? saved[index] : defaultChecked;
    } catch {
      return defaultChecked;
    }
  };
  const checked = useSyncExternalStore(subscribe, getSnapshot, () => defaultChecked);

  const onChange = (nextChecked: boolean) => {
    try {
      const current = readStoredValues(storageKey);
      while (current.length <= index) current.push(false);
      current[index] = nextChecked;
      window.localStorage.setItem(storageKey, JSON.stringify(current.map(Boolean)));
      window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: storageKey }));
    } catch {
      // La checklist sigue funcionando durante la sesión aunque el navegador bloquee storage.
    }
  };

  return (
    <input
      className="resource-checkbox"
      type="checkbox"
      checked={checked}
      aria-label="Marcar este punto como completado"
      onChange={(event) => onChange(event.target.checked)}
    />
  );
}

export function ResourceActions({ slug, taskCount }: { slug: string; taskCount: number }) {
  const storageKey = `nido-resource-${slug}`;
  const [copyLabel, setCopyLabel] = useState("Copiar enlace");
  const subscribe = (onStoreChange: () => void) => {
    const update = (event: Event) => {
      if ((event as CustomEvent<string>).detail === storageKey) onStoreChange();
    };
    window.addEventListener(CHANGE_EVENT, update);
    window.addEventListener(RESET_EVENT, update);
    return () => {
      window.removeEventListener(CHANGE_EVENT, update);
      window.removeEventListener(RESET_EVENT, update);
    };
  };
  const completed = useSyncExternalStore(
    subscribe,
    () => readProgress(storageKey, taskCount).completed,
    () => 0,
  );

  const reset = () => {
    window.localStorage.removeItem(storageKey);
    window.dispatchEvent(new CustomEvent(RESET_EVENT, { detail: storageKey }));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyLabel("Enlace copiado");
      window.setTimeout(() => setCopyLabel("Copiar enlace"), 1800);
    } catch {
      setCopyLabel("No se pudo copiar");
    }
  };

  const percentage = taskCount ? Math.round((completed / taskCount) * 100) : 0;

  return (
    <div className="resource-actions" data-print-hidden="true">
      {taskCount ? (
        <div className="resource-progress">
          <div>
            <strong>{completed} de {taskCount}</strong>
            <span>puntos completados</span>
          </div>
          <progress value={completed} max={taskCount} aria-label={`${percentage}% completado`} />
        </div>
      ) : (
        <p className="resource-actions__hint">Lista para completar, imprimir o compartir.</p>
      )}
      <div className="resource-actions__buttons">
        <button type="button" onClick={() => window.print()}>Imprimir / Guardar PDF</button>
        <button type="button" onClick={copy}>{copyLabel}</button>
        {taskCount ? <button type="button" onClick={reset}>Reiniciar progreso</button> : null}
      </div>
    </div>
  );
}
