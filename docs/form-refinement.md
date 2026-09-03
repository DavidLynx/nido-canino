# Nido — refinamiento coordinado con Lynx
Fecha: 2026-09-02. Base Nido 76884aa. Cambios locales, sin commit/push/deploy.

## A. Formulario rápido
El paso Datos del tutor pide:
- Nombre(s), first_name, requerido (80 caracteres).
- Apellido(s), last_name, requerido (80; combinado con nombre ≤160).
- Correo electrónico, email, requerido y válido.
- Celular / WhatsApp, phone, requerido.
- Teléfono alterno / de emergencia, alternate_phone, requerido.
- Canal preferido de comunicación, preferred_channel, opcional.
- Localidad y Barrio / zona, requeridos.

Ambos teléfonos tienen la misma validación de formato y 7–15 dígitos. Se comparan quitando separadores/signo +, sin inventar prefijos de país; no pueden ser iguales. El alterno puede pertenecer a otra persona. Copy completo aprobado en pantalla; autocomplete off para no rellenarlo con el teléfono del tutor. No se agregó nombre de emergencia.

Opciones públicas de canal: WhatsApp → whatsapp; Llamada telefónica → phone; Correo electrónico → email. Sin selección se omite del payload.

La política ya contemplaba contacto autorizado/emergencias; se añadió sólo una viñeta que explicita el teléfono de un tercero aportado con autorización y su uso si no se logra contactar al tutor. No se cambiaron credenciales, variables de entorno ni la versión configurada de la política. Antes del release el responsable debe revisar esa precisión y decidir, según su gestión documental, si corresponde actualizar el identificador de política; el código mantiene el rechazo seguro de consentimientos con una versión distinta.

## B–E. Payload, CRM e idempotencia
buildLynxPayload compone contact.full_name en el servidor y envía también first_name, last_name, email, phone, alternate_phone y el canal si está elegido. answers guarda nombres separados, nunca un full_name nuevo.
El adaptador mantiene dog_count como string para Lynx, fechas/días y la estructura de solicitud anterior.
Se eliminó metadata.form_version=1. Lynx valida la publicación vigente en la primera aceptación y el reintento idéntico devuelve su resultado original.
No se tocaron la clave externa, tiempos/consentimiento, retry, memory-only ni success/WhatsApp.

La migración y el mapeo de CRM pertenecen a Lynx: nuevo Contact mapea siete columnas; existente conserva todo dato no vacío y sólo completa vacíos; alterno nunca participa en matching. Ver docs/nido-form-refinement.md en Lynx para detalles, 41 templates, SQL, permisos y plan de publicación.

## F–H. PRO
El renderer sigue leyendo la estructura proyectada por Lynx. Reutiliza select/number; se añadió step=any a number para admitir peso decimal.
No se añadieron preguntas hardcoded. El único JSON copiado aquí es tests/admission-pro/definition.json, fixture local idéntico al canónico Lynx, nunca importado por la aplicación.
Se verifican las nuevas franjas/intervalos, conteo de paseos, peso decimal opcional, narrativas, medicamentos condicionales, cinco perros simétricos y snapshots antiguos con texto libre.
Token fragment/query legacy, limpieza de URL, prefill, selección autorizada, resolve/submit, retry y success permanecen intactos.
La corrección de labels desde la versión exacta de una submission se implementó sólo en Lynx.

## I–J. Home y navegación
Se eliminó el CTA inicial cuyo texto real era “Evaluar compatibilidad de mi perro”, tanto en index.html como en legacy-content/index.html. Se conserva “Solicitar cotización rápida” y el resto de secciones; no se eliminó el CTA posterior fuera del bloque inicial.
Inicio usa /#top y el body tiene un id=top real. El header usa un ancla nativa para Inicio: E2E demostró que Link de Next no vuelve a desplazar al repetir clic en la misma URL /#top. Otros enlaces conservan Next Link.
Se actualizaron Inicio en headers legacy compartidos y breadcrumbs de blog/recursos; los JS legacy conservan el estado activo de home con el nuevo href. No se cambió el micrositio hola ni otros anchors.

## K–N. Validación
Nido no tiene migraciones nuevas. La única migración forward está en Lynx.
Lint, typecheck y build locales aprobados. Unitarios/componentes: 157/157 PASS.
E2E final: 20/20 PASS, incluyendo la regresión de Inicio repetido; 0 fallos pendientes. git diff --check PASS.
Cobertura request: campos nuevos, correo/teléfonos, canal opcional, full_name servidor, snapshot, normalización, retry idéntico, editar con nueva clave, móvil y desktop.
Cobertura PRO: tipos proyectados, prefill, medicación, permisos de perros, fragment/query, estados terminales, retry y success.
Pruebas de Inicio desde Servicios y repetido en home a 390/1280; request sin overflow a 390/768/1024/1280.
Revisión visual de captura local móvil: campos y ayuda legibles, sin overflow.

E2E no toca producción: navegador restringido al origen local, servidor configurado contra mock local explícito. Puertos 4318/4319 y servidor dev preexistentes se preservaron. Se usa:
```powershell
$env:NIDO_E2E_PORT='4418'
$env:NIDO_E2E_MOCK_PORT='4419'
$env:NIDO_E2E_USE_BUILD='1'
pnpm test:request:e2e
```
Primero ejecutar pnpm build. Las variables anteriores se usan sólo en la sesión de prueba.

## O–Q. Git y archivos
Ver docs/form-refinement-files.txt para el inventario exacto de cambios y git status al cierre.
Sin stage, commits, pushes, deploys ni cambios de dependencias. Los cambios numerosos en HTML legacy son únicamente el href de Inicio (y el CTA inicial en home).

## R–T. No activar sin decisión de coordinación
Última referencia histórica del contexto: website-intake publicado v1 y PRO v2, NO verificados nuevamente en producción por prohibición explícita.
Si UI confirma sus borradores v2 y v3: publicar website-intake v2 y PRO v3 mediante Constructor → editor JSON avanzado → Guardar borrador → Publicar para uso interno, siempre sobre los forms existentes.

El refinamiento no incorpora un puente legacy de transición. Publicar primero rompe el frontend Nido anterior (v1 explícita y campos antiguos); desplegar Nido primero envía nuevos campos desconocidos por el snapshot antiguo. Omitir form_version no soluciona ese cambio incompatible.
Para cero downtime hace falta autorización del puente histórico, incluido el manejo de pestañas antiguas que envíen full_name al servidor Nido actualizado, y sus tests. No afirmar que basta con ordenar dos acciones.
Alternativa: ventana operativa acordada; no es cero downtime.
Secuencia humana preparatoria: confirmar versiones/drafts → aprobar transición → revisar/commit/push Lynx → migración/deploy Lynx → guardar borradores sin publicar → revisar/commit/push Nido reteniendo deploy productivo. Completar activación según decisión y runbook Lynx.
Las invitaciones PRO ya emitidas conservan su versión anterior; nuevas invitaciones se fijan a la publicada al crearlas. Nuevos Leads posteriores a la activación guardarán nombres separados y prefill nuevo.

No se hicieron llamadas a Lynx/Nido/Supabase productivos, ni se emitieron invitaciones reales, ni se tocaron credenciales/capabilities/H2/uploads.
# Actualización del rollout

El puente temporal fue aprobado e implementado después de este informe. Consultar [zero-downtime-rollout.md](./zero-downtime-rollout.md) para el estado y orden vigentes; sustituye el bloqueo de transición histórico descrito aquí.
