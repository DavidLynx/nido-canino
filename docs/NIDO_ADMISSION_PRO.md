# Admission PRO: frontend por invitación

Fecha del corte: 2 de septiembre de 2026. Sólo Nido; sin deploy, cambios a Lynx, Supabase, migraciones, Public Intake ni H2/uploads.

## Fuente del contrato

Se revisó **en lectura** `D:/Proyectos Web/LynxBussinesOS`, commit `c50c2f2`:

- `src/modules/admission-pro/api.ts`: solicitudes estrictas, respuestas, estados HTTP y límites.
- `src/modules/admission-pro/definition.ts`: proyección por selección persistida.
- `src/modules/admission-pro/token.ts`: validación/hash del token, exclusivamente en Lynx.
- `src/config/tenant-forms/nido-canino/admission-pro.json`: estructura canónica.
- `src/modules/forms/schemas.ts`: tipos y condiciones.
- `supabase/migrations/202609020001_admission_pro_foundation.sql`: identidad derivada de invitación, validación, persistencia e idempotencia.
- `supabase/migrations/202609010003_forms_condition_in.sql`: condiciones de Forms.

No se consultó ni modificó producción. El fixture de pruebas es una copia de la definición de ese commit, no un segundo formulario de producción. No está importado por el frontend.

## Antes / ahora

Antes, `app/admission-pro/page.tsx` servía `LegacyRoute source="admission-pro.html"`. El HTML ignoraba la invitación, mostraba un solo perro, generaba PDF en el navegador y abría WhatsApp para remitirlo manualmente. No usaba Admission PRO de Lynx.

Ahora:

```text
/admission-pro#token=… (preferido; ?token=… se acepta como compatibilidad)
  Browser: extrae token a memoria, prioriza hash sobre query y limpia ambos de la URL
  POST /api/admission-pro/resolve {token}
    Adaptador server-only + Authorization existente
    POST Lynx /api/v1/admission-pro/nido-website/resolve
  Renderer por pasos con estructura proyectada + prefill
  POST /api/admission-pro/submit {token, form_version, answers}
    Adaptador server-only + Authorization existente
    POST Lynx /api/v1/admission-pro/nido-website/submit
  Sólo respuesta 202 válida → confirmación → WhatsApp opcional
```

`/admission-pro.html` conserva su redirect hacia `/admission-pro`, incluyendo la query. La ruta moderna tiene `noindex`, `no-store`, `no-referrer` y no está en el sitemap. No se requiere cuenta Supabase de Nido: la autorización del caso es la invitación opaca validada por Lynx.

## Contrato de resolve

Body exacto: `{token: string}`. Token máximo 100 caracteres, sin trim, decodificación del contenido ni interpretación en Nido. La captura es exclusivamente cliente: se usa `#token=` y sólo si no existe esa clave en el fragmento se busca `?token=`. Se rechaza localmente token vacío/duplicado en la fuente elegida, sin caer a query cuando hay un hash token inválido. Ausencia total no hace ninguna llamada.

Respuesta 200:

- `{status: "consumed"}`: ya recibido; sin formulario ni identidad adicional.
- `{status: "pending", expires_at, form_slug: "admission-pro", form_version, selected_dog_keys, structure, prefill}`.

Se verifican versión positiva, 1–5 claves únicas `dog_1`…`dog_5`, pasos tutor/perros seleccionados/cierre, IDs únicos, pertenencia de cada campo a su perro y prefill permitido. Una proyección insegura o tipo no soportado falla de forma cerrada. El renderer no ofrece agregar perros ni envía `dog_count`.

El prefill sólo puede contener `tutor_name`, `tutor_phone`, `tutor_email`, `tutor_zone`, `tutor_locality` y `{dog_key}_{name,age,breed,sex,size,neutered}` para los perros seleccionados. La conversión de `breed_or_type` del intake a `breed` PRO la hace Lynx, no Nido.

## Renderer y experiencia

La definición actual tiene 169 campos: tutor 6, cada perro 32, cierre 3. La invitación proyecta 41 campos para un perro, 73 para dos, 105 para tres y hasta 169 para cinco, distribuidos en 3–7 pasos; nunca se muestran todos simultáneamente.

Tipos reales: `short_text`, `long_text`, `email`, `phone`, `select`, `multiselect`. También se renderizan de forma acotada los tipos escalares/opciones `number`, `radio`, `checkbox`, `boolean`, `consent` del contrato; no existe soporte para uploads ni un Forms Builder nuevo.

- Sin token: información del proceso y CTA **Realizar solicitud inicial** a `/request`; sin campos ni resolve.
- Invitación no disponible (inválida, expirada o revocada): mismo mensaje genérico y contacto por WhatsApp para revisar acceso. No redirige automáticamente a `/request` ni revela contacto/lead/perro.
- Pendiente: progreso tutor → perros seleccionados → cierre. `dog_1 + dog_3` mantiene sus claves originales y no crea `dog_2`.
- Datos conocidos: **Información que ya tenemos**, con **Editar datos** opcional. Permanecen en estado y payload, aunque no haya inputs visibles. No se recortan ni transforman si no se editan.
- Datos faltantes: inputs normales, con validación antes de avanzar. Volver conserva el borrador en memoria. Los títulos usan el nombre del perro, con ajuste de línea para nombres largos.
- Cierre: sólo las tres confirmaciones select Sí/No que devuelve Lynx. No se inventa consentimiento clínico ni se modifica la política.

Validación: required visible, email, select estricto, multiselect válido, campos básicos del perro no vacíos y máximo 160 caracteres. El teléfono sigue siendo string: Lynx no exige otra expresión regular. Las opciones negativas de reactividad y protección de recursos deben elegirse solas, según validación adicional real de Lynx.

La condición publicada es `dog_N_takes_medication equals "Sí"`. Sólo en ese caso se muestra y exige `dog_N_medications`. Al cambiar a No, el borrador puede retener el detalle en memoria para volver atrás, pero `effectiveAnswers` lo omite totalmente del envío. También omite vacíos, arrays vacíos y claves no presentes en la proyección. Lynx vuelve a validar todo al recibirlo; el navegador no es la autoridad final.

## Submit, errores y reintentos

Body exacto: `{token, form_version: positive integer, answers: Record<string, string | number | boolean | string[]>}`. Límite 300 respuestas; strings 5000 caracteres; arrays 100 elementos de hasta 500 caracteres; cuerpo hasta 131072 bytes. Sin contact_id, opportunity_id, pet_id, external_request_id ni selección controlada por el browser.

El adaptador sólo añade Authorization hacia Lynx. No hace otro resolve antes del submit, para no bloquear el retry de un envío ya aceptado cuya confirmación se perdió.

Respuesta Lynx 202: `accepted`, UUIDs `request_id`, `submission_id`, `contact_id`, `opportunity_id` y `pets[{source_dog_key, pet_id}]`. El adaptador valida esa respuesta y devuelve al navegador únicamente `{accepted: true}`.

Se congela una copia de `{token, form_version, answers}` antes del primer submit; el retry usa esa misma copia y produce el mismo JSON. Un guard síncrono evita doble envío; durante el envío/retry se bloquean los campos. Ante fallo se conserva el borrador y se ofrecen reintentar o editar. Editar abandona la copia congelada, conserva valores y muestra una advertencia sobre envíos previos ya recibidos.

La idempotencia pertenece a Lynx: una respuesta por invitación y hash de versión/respuestas. Un retry idéntico devuelve el resultado guardado; respuestas diferentes después de consumirse la invitación generan 409. Editar el tutor dentro de PRO no cambia el Contact/Lead objetivo. No se inventa un nuevo ID o una nueva admisión para eludir un conflicto.

| Estado upstream | Respuesta/UX Nido |
| --- | --- |
| 404 | Enlace no disponible, revisar acceso |
| 400 / 413 | Validación / tamaño, conservar borrador |
| 409 | Conflicto, revisar acceso; no afirmar recepción |
| 429 | Espera basada en Retry-After acotada a 1–300 segundos |
| 401 / 403 | Configuración temporalmente no disponible, sin detalle de credenciales |
| 422 | Formulario no disponible/configurado; sin exponer diagnóstico |
| 5xx, red, JSON inválido | Error genérico recuperable |
| Timeout | 12 s servidor / 18 s browser, mantener intento |

Éxito: **Formulario PRO recibido**, sin prometer cupo ni admisión. El usuario decide abrir WhatsApp; el mensaje es genérico y no contiene token, datos clínicos, nombres ni respuestas. Enlace visible a `/privacidad` durante todo el flujo.

## Privacidad y límites operativos

Token y borrador viven sólo en memoria del componente. No localStorage/sessionStorage, cookies de borrador, autosave, analytics, logs del adaptador ni PII en WhatsApp. Respuestas API sin caché, redirects upstream bloqueados, validación same-origin y límite del stream antes de parsear JSON. Los errores upstream no se reflejan en el browser.

El formato preferido es `/admission-pro#token=…`: el fragmento no viaja en el GET inicial ni necesita lógica Server Component. Al capturarlo en el cliente se eliminan inmediatamente toda la query y el fragmento con `history.replaceState`, sin reload y antes del POST de resolve. La URL queda `/admission-pro`; el token permanece sólo en memoria y los contratos resolve/submit no cambian. Next development también omite el logging de estas rutas. Recargar/cerrar pierde el borrador y token: hay que volver a abrir la invitación original. Esto se indica en la página; no se agrega persistencia oculta.

**Compatibilidad y límite de infraestructura:** las invitaciones antiguas con `?token=` siguen funcionando, pero esa query sí llega en el GET inicial; también si se mezclan ambos formatos. Sólo el secreto colocado exclusivamente en `#token=` queda fuera de ese GET. No se modifica el emisor de invitaciones en Lynx en este corte. Mantener redacción de `token` en access logs y observabilidad externa para el fallback legacy, y no capturar URLs completas en futura analítica/session replay. No se verificó ni cambió configuración remota. No incluir enlaces reales en tickets, screenshots, trazas ni logs de diagnóstico.

El runtime legacy global de cuenta/perfiles sigue existiendo para otras rutas; no conecta este PRO a las tablas Supabase de Nido ni se usa para enviar sus respuestas. La identidad y persistencia PRO quedan en Lynx; no se modifica su modelo.

## Navegación y legacy pendiente de limpieza

- Header/footer ya no promocionaban PRO; permanecen intactos.
- Home activo `legacy-content/index.html`: tres href pasan a solicitud inicial y el copy describe invitación posterior.
- CTA editorial activo de `content/blog/02_senales_estres.md`, `05_adaptacion.md` y `content/resources/02_checklist_convivencia.md` pasa a `/request`; `05_ruta.md` explica la secuencia invitada.
- `legacy-content/admission-pro.html` y `admission-pro.html` raíz quedan como artefactos históricos, sin servirlos en la ruta Next. Su CSS/script inline PDF/WhatsApp queda huérfano del flujo moderno. No se borran en este corte.
- `legacy-content/resources.html` y copias HTML raíz todavía contienen enlaces/copy históricos; no son la fuente de `/resources` moderno. No se reactivan ni se sirven como formularios alternativos.
- La tabla de remapeo en `lib/legacy-page.ts` y el redirect conservan compatibilidad de enlaces históricos.
- La etiqueta histórica “Formulario PRO” en solicitudes/perfiles de cuentas Nido no es un CTA inicial; se conserva. `jspdf` y el runtime compartido tampoco se eliminan, evitando un refactor fuera del corte.

## Configuración / Vercel

- Reutilizar `LYNX_NIDO_AUTHORIZATION` existente **server-only**, sin crear credencial ni integración. Debe conservar capacidades `admission.resolve` y `admission.submit` ya indicadas en Lynx.
- `LYNX_BASE_URL` opcional y server-only, default `https://lynx-business-os.vercel.app`. No es secret nuevo ni variable obligatoria para producción. HTTPS y origin puro, sin usuario, query ni path. HTTP sólo para localhost fuera de producción.
- `/request` conserva `LYNX_PUBLIC_INTAKE_URL`, consentimiento, variables y contrato existentes. No se modifica Public Intake.
- `.env.example` documenta la URL opcional; no se modifica `.env.local` ni configuración remota. No habilitar valores de mock o `NODE_ENV=test` en Vercel.
- Validar redacción de tokens en infraestructura y realizar revisión humana antes de un deploy autorizado. No se necesita migración ni selector de timezone.

## Validación local reproducible

```powershell
pnpm lint
pnpm typecheck
pnpm test:request
pnpm build
# Si los puertos normales están ocupados, usar puertos independientes sin detener otros procesos:
$env:NIDO_E2E_PORT='4328'
$env:NIDO_E2E_MOCK_PORT='4329'
$env:NIDO_E2E_USE_BUILD='1'
pnpm test:request:e2e
git diff --check
```

El runner reutiliza/extiende el mock existente de `/request`; no cambia su comportamiento intake. `NIDO_E2E_USE_BUILD=1` usa `next start` con configuración test en ese proceso aislado, permitiendo HTTP loopback y políticas sintéticas. Sin ese flag usa dev. Browser bloquea destinos externos; servidor apunta sólo al mock local, con credencial falsa explícita. Las pruebas PRO cubren contrato, prefill/resumen/edición, selección 1/3/5 y no contigua, condiciones, required, validación, transporte, errores, retry idéntico, doble submit, privacidad, UTF-8, headers, navegación y layouts. Los E2E anteriores de request se ejecutan también.
