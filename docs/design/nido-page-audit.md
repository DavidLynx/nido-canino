# Nido Canino - Page-by-Page Audit

Date: 2026-05-20  
Scope: preserve approved copy, routes, forms, auth logic, and content structure.

## Home / Inicio

### What Works

- The positioning is strong: structured canine coexistence, wellbeing, small groups, maximum 5 dogs, admission with criteria.
- The dual CTA strategy is clear: quick quote plus compatibility evaluation.
- The large logo reinforces protection, companionship, and emotional safety.
- KPI cards and route cards make the service model scannable.
- The spaces section introduces the home/care environment.
- Mobile stacking is already in place.

### What Feels Weak

- The hero is clear but not emotionally immersive yet. The logo is doing the work that a real calm-care photo or short ambient video should eventually do.
- The page relies on many dark cards with similar borders, making the homepage feel heavier than the brand promise of calm care.
- Service path icons vary in scale and style, especially between 3D animal icons and flatter service icons.
- The spaces section has valuable photos but lacks an editorial hierarchy.

### Preserve

- Approved hero and service positioning.
- Dual conversion paths.
- Maximum 5 dogs and evaluation/cupo logic.
- Current route structure.
- The logo and dark/camel identity.

### Safe Improvements

- Refine hero media slot without changing copy.
- Create card variants for `trust-card`, `service-path-card`, `media-card`, and `process-card`.
- Add warm light/cream section alternation after the dark hero.
- Make space photos larger, more editorial, and less equal-weight.
- Standardize icon containers and crop rules.

### Opportunities

- Hero: split into copy plus media frame for future photo/video, while keeping logo as a brand mark or overlay.
- Add an app-like process strip for quote/evaluation/admission.
- Use a richer "house of care" module: rest, feeding, guided play, observation.
- Add subtle scroll reveals only for section entry and card lift.

## Services / Servicios

### What Works

- Services are extensive and strategically specific.
- The page explains compatibility, evaluation, membership, controlled day care, feline service, and advisory routes.
- Pricing and FAQ-like details are available.
- Sticky pricing/info boxes help users make decisions.
- Service mini icon cards are clear.

### What Feels Weak

- The page is long and card-dense.
- Many service sections use similar dark containers and detail cards.
- The 3D support icon in the hero is warm but visually disconnected from real service proof.
- Pricing/info cards could feel more premium and less like generic dark panels.

### Preserve

- Existing copy and service logic.
- Service anchors: `#membresia`, `#convivencia`, `#evaluacion`, `#gatos`, `#asesorias`, `#pricing`.
- Cautionary positioning around compatibility and non-automatic admission.

### Safe Improvements

- Establish a service detail component with better hierarchy: summary, fit, process, price, CTA.
- Use warm callout surfaces for "not automatic", "for whom", and "what is included".
- Improve sticky pricing card contrast and spacing.
- Standardize service icon system.

### Opportunities

- Create a comparison module: "Cotización inicial" vs "Evaluación de compatibilidad" vs "Ingreso/adaptación".
- Add media slots for real scenes of rest, interaction, feeding, and walking.
- Use accordion styling with clearer open/closed states.

## Gallery / Galería

### What Works

- Real dog photos are authentic and emotionally valuable.
- The grid has editorial card proportions.
- Lightbox is keyboard-aware with close, previous, next, and escape behavior.
- Cards have hover zoom and overlay content.

### What Feels Weak

- The photo overlays are too dark in the first viewport, reducing the emotional impact of real dogs.
- The gallery begins as a flat grid; it could feel more curated and premium.
- No category/filter system exists yet for future scale.
- Images could benefit from better crop direction and optional featured layout.

### Preserve

- Real dog names, badges, and descriptions.
- Lightbox behavior and route.
- Existing data-driven `NIDO_GALLERY` structure.

### Safe Improvements

- Reduce default image darkness and reserve heavier overlays for text zones.
- Add a featured first card or editorial masonry rhythm.
- Add future data fields without breaking current render: category, mood, service type, date, featured.
- Improve empty state and loading states for media.

### Opportunities

- Future filters: Todos, convivencia, descanso, adaptación, gatos, espacios.
- Add "moments" language and visual grouping.
- Use subtle captions and quality-control image ratios.

## Blog

### What Works

- Blog intent is strong: education, routine, signals, coexistence, and useful reading.
- Categories for dogs and cats make sense.
- Expandable article blocks reduce initial page overload.
- Content supports trust and expertise.

### What Feels Weak

- It currently feels visually static and card-heavy.
- Missing illustration asset `assets/illustrations/dog-routine.png` weakens visual polish.
- Article cards are useful but not editorial enough.
- The hero uses a large 3D book/icon artifact that may feel less premium than photo/editorial media.

### Preserve

- Approved educational content and categories.
- Expandable article behavior.
- Blog route and structure.

### Safe Improvements

- Add an editorial article-card variant with clearer metadata and reading hierarchy.
- Use image/media slots with real dog/care photos or refined illustrations.
- Introduce topic chips and featured article treatment.
- Fix missing illustration reference.

### Opportunities

- Create a "guía destacada" band.
- Add difficulty/intent labels: preparación, convivencia, gatos, señales, rutina.
- Prepare for future CMS/data-driven articles.

## Resources / Recursos

### What Works

- The page is practically useful and aligned with preparation before advancing.
- It helps distinguish quick quote from compatibility evaluation.
- CTAs link clearly to quote and PRO evaluation.
- Sections are anchored and content is structured.

### What Feels Weak

- Similar to blog, the page feels visually static.
- Missing illustration references `dog-stress.png` and `cat-care.png` are masked by fallbacks.
- Resource cards need to feel more like tools/checklists and less like generic information cards.

### Preserve

- Resource content and conversion logic.
- Anchors like `#preparar-caso`, `#convivencia-canina`, `#visita-felina`.
- CTA relationship between cotización and PRO evaluation.

### Safe Improvements

- Create reusable checklist/resource components.
- Introduce lighter warm surfaces for practical guide sections.
- Add icons or small media plates that are consistent with service/process icons.
- Resolve missing illustration assets.

### Opportunities

- Add downloadable/checklist visual affordances later.
- Use app-like "preparation steps" cards.
- Add category filters once resource count grows.

## Request Service / Solicitar Servicio / Cotización

### What Works

- Strong low-friction WhatsApp-oriented flow.
- Clear three-step hero: complete data, review summary, send to WhatsApp.
- Live summary and message preview are a good app-like pattern.
- Form is direct and not overburdened.

### What Feels Weak

- The page is visually functional but could feel more premium and reassuring.
- The form and summary cards could use clearer hierarchy and less dark-card sameness.
- The WhatsApp preview could be styled as a more polished message surface.

### Preserve

- Existing fields and WhatsApp generation logic.
- The quick quote intent.
- The distinction from Formulario PRO.

### Safe Improvements

- Upgrade form card and summary card styles through shared form tokens.
- Add clearer step/progress visual treatment.
- Improve focus, disabled, and validation states.
- Keep all field IDs and JS behavior intact.

### Opportunities

- Add a small trust note near CTA: response expectations, availability/cupo.
- Add future "save to profile" path only after auth/data flows are ready.

## Compatibility / Evaluation / Formulario PRO

### What Works

- The form content is serious and aligned with the brand's non-automatic admission model.
- Sections are comprehensive: tutor, dog, health, behavior, routine, understanding of model.
- PDF download and WhatsApp send support operational review.
- The page communicates that compatibility is reviewed with criteria.

### What Feels Weak

- The form is long and visually heavy.
- Large dark cards can make the task feel more demanding than it needs to be.
- There is no progress indicator or section navigation.
- Page-specific CSS is substantial and should eventually become shared form/process components.

### Preserve

- All fields, IDs, required attributes, PDF logic, and WhatsApp logic.
- The serious admission tone.
- Copy explaining that the form does not guarantee admission.

### Safe Improvements

- Add a progress/section index visually, without changing logic.
- Improve field grouping, spacing, and section headers.
- Use a lighter warm form surface or alternating section backgrounds to reduce fatigue.
- Add better save/submit state styling if persistence is added later.

### Opportunities

- Future multi-step version, but only after stabilizing design tokens and data handling.
- Add "case review" visual language similar to premium onboarding forms.

## Login / Ingresar

### What Works

- Simple and low-friction.
- Google login intent is clear.
- It states that private data/admission will activate in phases.
- Logo usage is clear.

### What Feels Weak

- It looks like an early app auth screen rather than a polished premium trust moment.
- The two cards are visually correct but sparse.
- Google button could feel more native and refined.

### Preserve

- Auth logic.
- Supabase warning behavior.
- Redirect logic.
- Google login positioning.

### Safe Improvements

- Refine auth card surfaces and Google button styling.
- Add better empty/loading/error visual states through `UI.showMessage`.
- Keep copy intact unless future auth scope changes.

### Opportunities

- Eventually tie login to a fuller onboarding/dashboard visual system.
- Use tutor profile/pet/request private pages as the app-like design foundation.

## Private Pages: Profile, Pets, Requests

### What Works

- Early app shell exists.
- Sidebar navigation creates a dashboard-like mental model.
- Profile summary, pet cards, request cards, status badges, and empty states are already componentized.
- Forms are practical.

### What Feels Weak

- The private pages share the same dark card language as public marketing pages, so the app layer does not yet feel distinct.
- Choice chips and record cards are useful but need stronger system states.
- Sidebar could become more app-like.

### Preserve

- Supabase logic and protected route guard behavior.
- Existing form IDs and data mappings.
- Empty states and status labels.

### Safe Improvements

- Define an app-shell surface system separate from marketing cards.
- Improve tabs/sidebar, record cards, chips, status badges, and focus states.
- Add light/warm panels for data readability where appropriate.

