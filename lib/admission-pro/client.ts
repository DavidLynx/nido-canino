import { resolveResponseSchema, type ProResolution, type ProSubmit } from "./contract";

export type ProFailure = { ok: false; code: string; retry_after?: number };
export type ProResult = ProResolution | { accepted: true } | ProFailure;
export async function sendPro(operation: "resolve" | "submit", payload: { token: string } | ProSubmit, fetcher = fetch, timeoutMs = 18_000): Promise<ProResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetcher(`/api/admission-pro/${operation}`, {
      method: "POST", cache: "no-store", referrerPolicy: "no-referrer", signal: controller.signal,
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (operation === "submit" && response.status === 202 && data.accepted === true) return { accepted: true };
    if (operation === "resolve" && response.status === 200) {
      const parsed = resolveResponseSchema.safeParse(data);
      if (parsed.success) return parsed.data;
    }
    return { ok: false, code: typeof data.code === "string" ? data.code : "network", ...(typeof data.retry_after === "number" ? { retry_after: Math.max(1, Math.min(300, data.retry_after)) } : {}) };
  } catch { return { ok: false, code: controller.signal.aborted ? "timeout" : "network" }; }
  finally { clearTimeout(timer); }
}
export function proWhatsappUrl() {
  return `https://wa.me/573124611816?text=${encodeURIComponent("Hola, ya completé el Formulario de ingreso PRO de Nido Canino.")}`;
}
export const proAccessWhatsapp = `https://wa.me/573124611816?text=${encodeURIComponent("Hola, Nido Canino me indicó completar el Formulario PRO. Quisiera revisar mi acceso.")}`;
