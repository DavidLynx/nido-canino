# Nido Canino - Refined Visual Direction

Working direction: Premium Warm Care Web App  
Blend: boutique hospitality, animal wellbeing, structured care, editorial pet care, and modern service app.

## Direction Principles

1. Evolve, do not replace.
2. Keep the dark premium/camel identity, but reduce dark monotony.
3. Let real photography and calm media carry emotional trust.
4. Make structure feel reassuring, not clinical.
5. Use app-like components for quote, evaluation, profile, pets, and requests.
6. Build visual richness through surface rhythm, media hierarchy, and component variants, not noise.

## Brand Feeling

Nido should feel like:

- a calm home with professional criteria,
- a boutique service with limited capacity,
- a structured admission process that protects wellbeing,
- a warm app that helps tutors move through quote, evaluation, profile, pets, and requests,
- an editorial pet-care resource with real authority.

Nido should not feel like:

- a generic dog daycare,
- a loud pet store,
- a cold veterinary/clinical system,
- a luxury brand with no warmth,
- a childish mascot site,
- a generic SaaS template.

## Refined Color Tokens

Current tokens can remain, but future implementation should add more semantic surface roles.

### Core Dark

- `--nido-night-950: #0f0e0d`
- `--nido-night-900: #141312`
- `--nido-night-850: #191816`
- `--nido-night-800: #1f1d1a`
- `--nido-night-750: #26231f`

Purpose: dark premium base, header, hero, app shell, media overlays.

### Warm Light

- `--nido-cream-50: #fbf6ee`
- `--nido-cream-100: #f4eadc`
- `--nido-sand-150: #eadbc8`
- `--nido-sand-200: #dcc5a9`

Purpose: light/warm section bands, editorial resources, form relief, content cards on long pages.

### Camel Accent

- `--nido-camel-300: #d9b88f`
- `--nido-camel-400: #c8a47b`
- `--nido-camel-500: #a98357`
- `--nido-camel-600: #80613f`

Purpose: primary CTA, badges, key stats, selected states, thin dividers, logo harmony.

### Optional Secondary Accents

Use sparingly.

- Soft sage: `#9fb79c` for calm/wellbeing notes, senior/sensitive care, success-adjacent states.
- Muted clay: `#b8785f` for warmth, home, feeding/rest moments.
- Dusty blue-gray: `#8ca7b8` for info/help states and app status details.

Do not introduce all secondary accents at once. Start with sage as the first secondary accent because it supports calm/wellbeing without fighting camel.

### Text

- Dark mode main: `#fbf6ee`
- Dark mode soft: `#d8c8b6`
- Dark mode muted: `#a99583`
- Light mode main: `#211c17`
- Light mode soft: `#5f5043`
- Light mode muted: `#887565`

## Dark and Light Section Balance

Recommended rhythm:

- Dark hero for premium recognition.
- Warm light/cream section for trust, spaces, process, and resources.
- Dark app-like cards for quote/evaluation/private flows.
- Photo-led full-width or split sections to break repeated cards.
- Dark footer or warm footer depending on final global rhythm.

Initial target:

- Home: 45% dark, 35% warm light, 20% media-rich.
- Services: 55% dark/app-like, 25% warm light guidance, 20% media/callouts.
- Blog/resources: 35% dark, 50% warm editorial light, 15% media/callouts.
- Forms/private app: dark shell with warmer form surfaces for readability.

## Typography Treatment

Keep Inter for now to reduce implementation risk.

Refine usage:

- Hero headings: Inter 800, tighter but not extreme, slightly less line compression on mobile.
- Section headings: Inter 700/800, smaller than hero, more editorial line-height.
- Card titles: Inter 700, no oversized card headings.
- Body: Inter 400/500, 16-18px depending context.
- Labels/metadata: Inter 600/700, small caps only when useful for structured metadata.

Optional later font exploration:

- Keep Inter as body/UI.
- Add a warmer display font only if performance and brand value justify it. Candidates should support Spanish well and avoid childish personality.

## Card System Direction

Define purpose-based card variants:

- `nido-card`: default content card, restrained.
- `nido-card-media`: photo/video-led card with crop tokens.
- `nido-card-service`: service route tile with icon/media, clear CTA.
- `nido-card-process`: numbered process/step card.
- `nido-card-trust`: short proof/criterion card.
- `nido-card-form`: form container with stronger readability.
- `nido-card-app-record`: profile/pet/request record card.
- `nido-card-editorial`: blog/resource card.

Recommended shape:

- Buttons/forms: 10-14px radius, not always pill.
- Cards: 16-22px radius depending importance.
- Media: 18-28px radius for warm editorial softness.
- Pills only for badges, nav filters, and compact selected states.

## Button States

Primary:

- Camel fill, dark text.
- Hover: slightly brighter camel plus subtle lift.
- Active: no jumpy motion; press down 1px or reduce shadow.
- Focus: visible warm ring with enough contrast.
- Disabled: desaturated camel/sand with muted text.

Secondary:

- Dark surface with camel border on dark backgrounds.
- Warm cream/ink variant on light backgrounds.
- Hover should increase clarity, not only change border color.

Text CTA:

- Use for editorial links and low-priority actions.
- Keep underline or arrow affordance consistent.

## Image Treatment

Principles:

- Real photos should be brighter, calmer, and easier to inspect than current gallery overlays.
- Avoid stock-like darkness and heavy blur.
- Use consistent aspect ratios:
  - Hero media: 4:3 or 16:10.
  - Space cards: 4:3 or 3:2.
  - Gallery: masonry/editorial mix, no random crop without review.
  - App/avatar/pet records: square or circle depending context.
- Use warm overlays only where text sits on image.
- Define `object-position` per important photo when needed.

## Iconography Style

Current icons are warm but inconsistent.

Direction:

- Use one icon family style for service/process icons.
- Prefer softly dimensional but simpler icons, not overly glossy.
- Keep icon containers consistent: size, padding, background, radius.
- Service icons should not compete with real care photos.
- Use icons for scanning, not as the main emotional artifact.

## Gallery Style

Direction:

- Editorial memories, not a generic image grid.
- Highlight real dogs and care moments.
- First view should show photos clearly.
- Use overlays only at the bottom or on hover.
- Prepare data model for future categories and featured items.

Suggested future card types:

- Featured memory: large landscape/portrait card.
- Standard memory: image-first with compact caption.
- Care moment: photo plus small tag like descanso, integración, paseo, rutina.
- Space memory: environment shot with practical label.

## Motion and Microinteraction Principles

Use motion for:

- button press feedback,
- card lift on real clickable cards,
- gentle section reveal,
- lightbox transitions,
- accordion open/close,
- form validation/status changes.

Avoid:

- constant floating icons,
- heavy parallax,
- decorative animations that slow reading,
- motion that hides content,
- ignoring `prefers-reduced-motion`.

Motion language:

- Soft, calm, short.
- Easing should feel organic and stable.
- No bouncy/cartoon motion.

## Section Rhythm

Recommended page rhythm:

1. Dark premium hero with clear CTA and media.
2. Warm proof band: small groups, 5 dogs, prior evaluation, observation.
3. Media-led care spaces or real moments.
4. Structured process/app-like section.
5. Service/resource cards with varied surfaces.
6. CTA band that distinguishes quote vs PRO compatibility.

Do not make every section a card grid. Alternate:

- editorial split,
- media strip,
- process row,
- checklist block,
- app panel,
- quote/evaluation CTA band.

## Accessibility and Performance Notes

- Preserve readable contrast, especially camel text on dark backgrounds.
- Add visible focus states for all buttons, links, gallery cards, and form controls.
- Respect reduced motion.
- Optimize future photos/videos before adding them.
- Define aspect ratios to prevent layout shift.
- Do not use large videos as blocking hero assets.

