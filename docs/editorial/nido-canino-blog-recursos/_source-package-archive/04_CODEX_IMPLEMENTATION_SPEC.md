# Nido Canino — Especificación maestra para Codex
## Implementación Blog + Recursos

Este archivo debe entregarse a Codex junto con:
- `00_MASTER_ESTRATEGIA_EDITORIAL.md`
- `01_MASTER_BLOG.md`
- `02_MASTER_RECURSOS.md`
- `03_IMAGE_PRODUCTION_PLAN.md`
- `content-index.json`
- carpetas `blog/` y `resources/`
- imágenes editoriales cuando estén listas.

---

## 1. Objetivo

Transformar `/blog` y `/resources` en una biblioteca útil, escalable y visualmente integrada con el lenguaje actual de Nido Canino.

NO cambiar Supabase.
NO cambiar Auth.
NO cambiar rutas operativas.
NO rehacer Home, Servicios o `/hola`.
NO modificar el sistema visual global salvo reutilización estrictamente necesaria.

---

## 2. Diferencia funcional obligatoria

### Blog
**Entender.**

Debe contener artículos editoriales, educativos, casos y explicaciones.

### Recursos
**Actuar.**

Debe contener checklists, plantillas, comparadores y herramientas de preparación.

La interfaz debe reflejar esta diferencia.

---

## 3. Auditar antes de implementar

Revisar:
- implementación actual de `/blog`;
- implementación actual de `/resources`;
- legacy content;
- cards existentes;
- hero;
- filtros;
- CTA;
- assets;
- rutas;
- metadata;
- componentes de motion;
- PawTrail;
- sistema de reveal;
- variables CSS;
- layout global.

Documentar brevemente:
1. qué se reutiliza;
2. qué se reemplaza;
3. qué legacy content puede retirarse después de asegurar paridad;
4. archivos que se crearán/modificarán.

---

## 4. Pipeline Markdown

Los archivos entregados son la fuente editorial.

Preferir una solución de Markdown robusta y mantenible.

Si el proyecto aún no tiene parser Markdown:
- NO escribir un parser casero;
- se permite añadir dependencias pequeñas y establecidas si son necesarias;
- justificar en la entrega las dependencias nuevas.

La solución debe:
- leer frontmatter;
- renderizar markdown seguro;
- generar rutas estáticas;
- permitir obtener índices y relacionados;
- funcionar con `pnpm build`.

---

## 5. Rutas

Crear/mantener:

```text
/blog
/blog/[slug]

/resources
/resources/[slug]
```

Todas las piezas incluidas en el paquete deben ser generadas estáticamente cuando sea posible.

No romper `/blog` ni `/resources` existentes.

---

## 6. Blog index

El index de Blog debe contener:

### Hero
Conservar la identidad visual actual, pero reemplazar sensación de placeholder por una biblioteca viva.

### Categorías
Usar categorías derivadas de contenido, no hardcode duplicado.

Categorías iniciales sugeridas:
- Señales y comportamiento
- Rutina y bienestar
- Preparación y seguridad
- Cuidado felino
- Casos Nido

### Destacado
Destacar 1 artículo principal con imagen amplia.

Recomendación inicial:
`Por qué algunos perros necesitan grupos pequeños`

### Grid
Cards con:
- imagen;
- categoría;
- title;
- excerpt;
- tiempo de lectura opcional;
- enlace claro;
- hover y focus del sistema actual.

No mostrar grandes huecos “Visual editorial”.

### Relación con Instagram
Crear bloque:
**Del día a día de Nido**

Fuente local/manual por ahora.

No implementar feed automático de Instagram en esta fase.

---

## 7. Página individual de Blog

Cada artículo debe tener:

- breadcrumb simple;
- categoría;
- H1;
- excerpt/lead;
- imagen principal;
- fecha de publicación/revisión;
- cuerpo con tipografía de lectura;
- callouts cuando el Markdown lo requiera;
- fuentes al final si existen;
- aviso editorial/veterinario cuando corresponda;
- 2–3 artículos relacionados;
- recurso relacionado si existe;
- CTA contextual.

No llenar el artículo de CTA repetidos.

---

## 8. Recursos index

El index debe sentirse más “herramienta” que Blog.

Agrupar por:
- Preparación;
- Ruta correcta;
- Checklists;
- Plantillas;
- Emergencias.

Cards pueden diferenciar el formato con labels:
- Checklist
- Plantilla
- Comparador
- Guía rápida

Permitir filtrar sin convertir la página completa en Client Component si no es necesario.

---

## 9. Página individual de Recurso

Debe facilitar acción.

Según el contenido:
- checklist con items visuales;
- bloques imprimibles;
- tabla/comparador;
- campos vacíos visuales si es plantilla;
- botón “Imprimir / Guardar como PDF” puede considerarse si se implementa solo con `window.print()` y CSS de impresión;
- no generar PDF complejo en esta fase salvo que ya exista infraestructura reusable.

Agregar CSS `@media print` para recursos imprimibles.

Ocultar en impresión:
- Header;
- Footer;
- PawTrail;
- controles irrelevantes.

---

## 10. Structured data y SEO

Blog:
- `BlogPosting` o `Article` JSON-LD;
- headline;
- image;
- datePublished;
- dateModified;
- author Organization `Nido Canino`;
- canonical;
- description.

Recursos:
- metadata normal;
- no inventar schema no apropiado.

Actualizar sitemap para rutas nuevas individuales.

No cambiar robots globales salvo necesidad real.

---

## 11. Fuentes y seguridad editorial

Si `sources` existe en frontmatter:
- mostrar sección discreta “Fuentes consultadas” al final;
- abrir enlaces externos de forma segura;
- no llenar las cards del índice con citas.

Los disclaimers se conservan cuando el archivo los incluya.

No convertir Nido en fuente veterinaria clínica.

---

## 12. Imágenes

Usar `image` e `imageAlt` del frontmatter.

Mientras falten imágenes:
- usar un placeholder visual deliberado, compacto y elegante;
- NO usar el texto grande “Visual editorial” como bloque vacío dominante;
- no descargar stock automáticamente.

Cuando se entreguen las imágenes finales:
- ubicarlas según el plan de imágenes;
- usar Next/Image;
- dimensionar correctamente;
- evitar CLS;
- optimizar loading.

---

## 13. Diseño y movimiento

Heredar:
- motion tokens;
- PawTrail global en páginas públicas;
- reveal;
- focus;
- hover;
- superficies cálidas;
- glows sutiles.

Blog debe ser más editorial y fotográfico.

Recursos debe ser más funcional y estructurado.

No repetir exactamente el mismo layout para ambos.

---

## 14. Mobile

Prioridad:
360 / 375 / 390 / 430.

Blog:
- cards de una columna;
- imágenes proporcionadas;
- lectura cómoda;
- no bloques de texto excesivamente anchos.

Recursos:
- checklists cómodos;
- tablas convertidas a cards/stack si es necesario;
- impresión independiente de mobile.

---

## 15. Navegación interna

Usar `related` del frontmatter.

También implementar enlaces editoriales donde estén escritos en Markdown.

No inferir relacionados aleatoriamente si ya existe metadata explícita.

El campo `related` puede contener slugs de Blog o Recursos. Resolverlo contra un índice combinado de ambos tipos y mostrar la etiqueta correcta (`Artículo` o `Recurso`) en la interfaz.

---

## 16. CTA mapping

Usar CTA del frontmatter.

Tipos típicos:
- `/services`
- `/admission-pro`
- `/request`
- `/hola`
- WhatsApp/visita felina cuando esté indicado.

No reemplazar el CTA editorial por un CTA comercial genérico.

---

## 17. Instagram editorial

Crear una estructura local, por ejemplo:

```ts
const instagramHighlights = [
  {
    image: "...",
    label: "...",
    title: "...",
    href: "..."
  }
]
```

Dejarla preparada para actualización manual.

No usar scraping.
No usar APIs no configuradas.
No introducir tokens.

---

## 18. Pruebas

Verificar:

```text
/blog
/blog/por-que-algunos-perros-necesitan-grupos-pequenos
/blog/senales-tempranas-de-estres-en-perros
/blog/que-hacer-con-su-perro-durante-un-temblor

/resources
/resources/que-conviene-tener-claro-antes-de-avanzar
/resources/checklist-convivencia-canina
/resources/kit-emergencia-mascotas
```

Probar todos los slugs del `content-index.json`.

---

## 19. Validaciones

Ejecutar:
- `pnpm lint`
- `pnpm build`

Ambos deben pasar.

Comprobar:
- no errores de consola;
- no overflow;
- metadata;
- sitemap;
- keyboard;
- focus;
- reduced motion;
- impresión de recursos;
- links internos;
- links externos;
- imágenes.

---

## 20. Entrega

Informar:
1. auditoría;
2. arquitectura de contenido implementada;
3. dependencias nuevas;
4. archivos creados;
5. archivos modificados;
6. rutas generadas;
7. imágenes usadas/faltantes;
8. structured data;
9. print styles;
10. integración Instagram manual;
11. `pnpm lint`;
12. `pnpm build`;
13. riesgos/pendientes.

NO hacer commit.
NO hacer push.

Dejar listo para revisión local.
