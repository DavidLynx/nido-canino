# Puente temporal del rollout Nido ↔ Lynx

Fecha: 2026-09-02. Este puente aprobado sustituye el bloqueo de transición del informe form-refinement.md. Sin commit/push/deploy ni publicación productiva.

Runbook coordinador A–T: D:/Proyectos Web/LynxBussinesOS/docs/nido-zero-downtime-rollout.md. Revisar ese archivo antes de publicar o desplegar.

Producción se consultó exclusivamente READ ONLY: website-intake v1 published/internal, borrador v2; admission-pro v2 published/internal, borrador v3, v1 superseded. Objetivos de publicación: intake v2 y PRO v3; no ejecutados todavía.

Nido clasifica ANTES del whitelist: full_name sin ninguna clave de contacto refinada → legacy; ambas claves first_name/last_name sin full_name → refined; mezcla/incompleto → rechazo. Legacy valida con el contrato congelado de 76884aa y el constructor conserva exactamente payload/metadata/hash, enviando form_version=1. Refined usa el contrato nuevo, compone contact.full_name y omite form_version. No inventa campos ni convierte intentos viejos.

El corte autoritativo está en la migración Lynx 004, helper privado nido_legacy_intake_bridge: 2026-09-10T05:00:00Z (fin del 9 de septiembre Bogotá). SQL verifica el cutoff DESPUÉS de idempotencia; Nido no pone un segundo reloj delante de los replays. Legacy nuevo recibe 422 después del corte, los refinados siguen, y replays aceptados siguen sujetos al límite existente de siete días de submitted_at.

Una pestaña vieja cargada antes del deploy puede usar el endpoint nuevo sin recargar. El test E2E empaqueta el client+contract real de 76884aa en memoria, mantiene el documento/attempts, cambia de handler histórico a Next real y verifica no-crossover/replays/cutoff contra mock Lynx local. La validación SQL real complementaria se ejecuta con pgTAP/rollback en Lynx. No es una prueba contra producción.

Conservar NIDO_PRIVACY_POLICY_VERSION durante este rollout. Su guard existente sigue activo: rotarla invalidaría el consentimiento de pestañas viejas con policy_changed. No se cambia configuración ni se relaja consentimiento como parte del puente.

PRO conserva version pinning: las invitaciones anteriores siguen en su versión; las nuevas toman v3 tras publicar. Tests de renderer y PostgreSQL prueban ambos contratos, sin cambios a token/hash/resolve/submit.

Orden humano: commit/push Lynx → revisar dry-run y aplicar migraciones 003+004 por flujo autorizado → verificar deploy/bridge Lynx → actualizar borradores existentes desde JSON canónicos y publicar Forms internal v2/v3 → sólo entonces commit/push/deploy Nido refinado dual → cutoff automático. No hacer push Nido anticipado si dispara auto-deploy productivo. El runbook coordinador incluye comandos y condiciones de detención.

Fixtures de tests/request/legacy-fixture/client.ts y contract.ts son copias exactas de 76884aa; payload.ts conserva el cuerpo histórico del builder cambiando sólo import/ruta para tests. legacy-definition.json de PRO es el snapshot pre-refinamiento de Lynx 86d3645. Nunca se importan por la aplicación.

Validación: 174/174 tests unitarios/componentes (9 archivos); 21/21 Playwright, incluido rollout.spec.ts; lint, typecheck, build y git diff --check PASS. El build inicial terminó después de reintentos internos de generación estática; se repitió al cierre. Hubo un intento E2E inicial sin arranque de Chromium bajo presión de memoria; la corrida final completa pasó sin aumentar timeouts ni omitir aserciones. E2E usa 4418/4419 y no toca los servidores previos en 4318/4319. PostgreSQL complementario: 256/256 pgTAP PASS, fixtures rollback-only.

Ver bridge-rollout-files.txt para el git status completo, incluyendo cambios previos conservados. Después de la ventana de reintentos, retirar legacy de Nido y la excepción SQL mediante una futura migración forward; nunca borrar versiones/respuestas/invitaciones históricas ni datos como parte del cleanup.
