# AGENTS.md

## Proyecto
Nido Canino es una **web app multipágina** orientada a captación, educación, solicitud de servicios y evolución progresiva hacia una experiencia autenticada con persistencia de datos. El proyecto **ya funciona** en producción y está desplegado en **Vercel**, con código versionado en **GitHub**.

El objetivo de este repositorio no es rehacer la app desde cero, sino **mejorar lo existente sin romper la arquitectura actual**, ampliar funcionalidades por bloques y evolucionar con criterio hacia una web app más robusta.

---

## Prioridad de trabajo
Cuando trabajes sobre este proyecto, sigue este orden de prioridad:

1. **Mejorar y ampliar lo ya existente** sin romper rutas, estilos ni la experiencia actual.
2. **Crear nuevas secciones o bloques** solo cuando tengan sentido dentro de la arquitectura actual.
3. **Implementar autenticación, persistencia y lógica de usuario** como siguiente capa importante del producto.

---

## Estado actual del proyecto
La aplicación actualmente está funcional. Existen páginas públicas, estructura CSS modular, JavaScript separado por responsabilidades y una base inicial conectada con Supabase.

### Páginas públicas actuales
- `index.html`
- `services.html`
- `blog.html`
- `resources.html`
- `request.html`

### Flujo de cuenta / usuario ya contemplado
- `auth.html`
- `profile.html`
- `pets.html`
- `requests.html`

### CSS base
- `css/reset.css`
- `css/variables.css`
- `css/themes.css`
- `css/base.css`
- `css/layout.css`
- `css/components.css`
- `css/pages.css`

### JavaScript base
- `js/config.js`
- `js/supabase-client.js`
- `js/utils.js`
- `js/ui.js`
- `js/auth.js`
- `js/guards.js`
- `js/profile.js`
- `js/pets.js`
- `js/requests.js`
- `js/resources-page.js`
- `js/main.js`

### Data y assets
- `data/resources-data.js`
- `assets/logo/*`
- `assets/icons/*`
- `assets/illustrations/*`
- `assets/photos/*`

---

## Regla central
**La app ya funciona. No romper lo que ya existe.**

Toda intervención debe partir de este principio:
- no destruir estructura válida,
- no improvisar renombres,
- no migrar de stack por gusto,
- no duplicar lógica existente,
- no introducir complejidad si una mejora incremental resuelve el objetivo.

---

## Qué es Nido Canino en términos de producto
Nido Canino no debe tratarse como una guardería canina genérica.

Es un modelo de:
- **convivencia canina estructurada**,
- **grupos pequeños**,
- **admisión con criterio**,
- **observación real**,
- **bienestar animal consciente**.

También contempla:
- cuidado felino a domicilio,
- contenidos educativos,
- captación dual,
- evolución a sistema con perfiles, mascotas, solicitudes y formulario PRO.

El lenguaje del producto debe reflejar esto.

### Evitar siempre
- hablar como guardería masiva,
- usar tono genérico de “deja tu mascota y ya”,
- prometer admisión automática,
- sonar barato, improvisado o de alto volumen,
- introducir copy que contradiga el posicionamiento premium y filtrado.

---

## Objetivos concretos con Codex
Codex debe ayudar principalmente en tres frentes:

### 1. Mejorar y ampliar lo existente
Ejemplos:
- refinar copy,
- mejorar UX,
- optimizar jerarquías visuales,
- hacer más consistente la navegación,
- mejorar componentes sin reescribir toda la app,
- reforzar responsive,
- agregar validaciones ligeras,
- ordenar scripts y dependencias.

### 2. Crear nuevas secciones cuando se necesiten
Ejemplos futuros:
- álbum o galería de fotos,
- bloque de videos o testimonios,
- previews de contenido externo de redes,
- secciones nuevas dentro del home o páginas secundarias,
- página del Formulario PRO,
- mejoras en recursos o blog.

**Importante:**
Si se crean previews de video, el video idealmente debe mostrarse como **embed o preview externo**, no necesariamente almacenado en el proyecto.

### 3. Implementar autenticación + persistencia
Este es el frente técnico más importante.

Objetivos esperados:
- login con Google,
- integración sólida con Supabase Auth,
- perfiles de usuario,
- mascotas asociadas al usuario,
- solicitudes guardadas,
- persistencia de formularios,
- protección de rutas privadas,
- experiencia clara para usuarios autenticados y no autenticados.

---

## Reglas críticas de seguridad y arquitectura

### No hacer sin validar impacto
- No renombrar archivos existentes.
- No mover carpetas existentes.
- No cambiar rutas públicas sin revisar todos los enlaces.
- No cambiar nombres de clases globales sin revisar CSS dependiente.
- No eliminar scripts actuales sin confirmar que no se usan.
- No tocar integración con Supabase a ciegas.

### Con Supabase
- Nunca exponer secretos sensibles en frontend.
- No usar `service_role` en cliente.
- Toda tabla consumida desde frontend debe pensarse con **RLS**.
- Mantener separación clara entre datos públicos y privados.
- Si se proponen tablas nuevas, sugerir también sus políticas mínimas.
- Si se usan buckets de Storage, definir acceso por políticas.

### Con autenticación Google
- La implementación debe contemplar:
  - `signInWithOAuth` o equivalente correcto para Supabase,
  - redirects controlados,
  - compatibilidad con entorno local, preview y producción,
  - manejo correcto de sesión,
  - protección de rutas según estado de autenticación.

---

## Convenciones de trabajo

### Filosofía
- Mejorar por capas.
- Hacer cambios pequeños y comprobables.
- Preferir refactors incrementales sobre reconstrucciones grandes.
- Separar cambios de copy, UI y lógica cuando sea posible.
- Escribir código claro, legible y mantenible.

### HTML
- Mantener semántica clara.
- No duplicar bloques si pueden abstraerse razonablemente.
- Respetar estructura existente mientras siga siendo útil.

### CSS
- Aprovechar la arquitectura ya existente.
- Evitar meter estilos gigantes inline salvo casos puntuales muy justificados.
- Reutilizar variables y convenciones actuales.
- No introducir otro sistema de estilos sin instrucción explícita.

### JavaScript
- Respetar la modularidad actual.
- No mezclar demasiadas responsabilidades en un solo archivo.
- Mantener funciones pequeñas, legibles y trazables.
- Usar nombres claros y consistentes.

---

## Definición de “hecho” para cualquier cambio
Un cambio no se considera terminado si no cumple esto:

1. No rompe navegación existente.
2. No rompe estilos visibles en desktop ni móvil.
3. No rompe assets ni imports.
4. No contradice el posicionamiento de Nido Canino.
5. Mantiene coherencia con el flujo actual del producto.
6. Puede probarse localmente.
7. Está listo para subir a GitHub y desplegar en Vercel sin improvisación.

---

## Flujo de desarrollo recomendado

### Antes de tocar algo importante
- Leer este archivo.
- Revisar el brief del proyecto en `docs/NIDO_CANINO_BRIEF.md`.
- Entender si el cambio afecta copy, UI, datos, auth o estructura.
- Confirmar qué archivos ya resuelven parte del problema.

### Durante el trabajo
- Hacer cambios acotados.
- Evitar ediciones masivas no solicitadas.
- Proteger compatibilidad con Vercel.
- Mantener consistencia entre páginas públicas y autenticadas.

### Antes de entregar
- Revisar rutas.
- Revisar imports.
- Revisar si el copy sigue el tono correcto.
- Revisar responsive básico.
- Revisar que no se hayan roto interacciones existentes.

---

## Roadmap técnico sugerido por fases

### Fase 1 — Refinamiento sobre lo construido
- mejorar home,
- mejorar servicios,
- CTA dual,
- copy más sólido,
- coherencia de navegación,
- mejor estructura visual.

### Fase 2 — Nuevas páginas y secciones
- `admission-pro.html`,
- galería / álbum,
- bloque de videos externos,
- mejoras a blog y recursos,
- componentes reutilizables de contenido.

### Fase 3 — Auth y persistencia
- Google login,
- sesiones con Supabase,
- perfiles,
- mascotas,
- solicitudes,
- protección de vistas privadas,
- guardado de formularios.

### Fase 4 — Sistema más completo
- panel de usuario mejorado,
- historial de solicitudes,
- estado de admisión,
- seguimiento del Formulario PRO,
- carga de archivos si aplica,
- mayor automatización comercial.

---

## Modelo de datos sugerido para evolución
Esto puede ajustarse, pero sirve como base inicial:

### `profiles`
- `id`
- `full_name`
- `email`
- `phone`
- `zone`
- `created_at`

### `pets`
- `id`
- `user_id`
- `name`
- `species`
- `breed`
- `age`
- `weight`
- `notes`
- `created_at`

### `service_requests`
- `id`
- `user_id`
- `pet_id`
- `service_type`
- `status`
- `requested_date`
- `notes`
- `created_at`

### `admission_forms`
- `id`
- `user_id`
- `pet_id`
- `payload_json`
- `status`
- `created_at`
- `updated_at`

---

## Qué debe hacer Codex cuando no tenga certeza
Si no hay claridad suficiente, Codex debe:
1. preservar lo existente,
2. hacer la propuesta más conservadora,
3. documentar el supuesto,
4. no inventar una arquitectura nueva sin necesidad.

---

## Archivo complementario obligatorio
Antes de tomar decisiones de producto, tono, copy o roadmap, revisar:
- `docs/NIDO_CANINO_BRIEF.md`

Ese archivo contiene el contexto estratégico y comercial del proyecto.
