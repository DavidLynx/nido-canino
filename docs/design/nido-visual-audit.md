# Nido Canino - Visual, UX and Structure Audit

Date: 2026-05-20  
Scope: audit and documentation only. No redesign, copy rewrite, routing change, auth change, or form/data-flow change.

## Executive Summary

Nido Canino already has a strong strategic base: warm camel on dark, a recognizable protective logo, clear Spanish copy, a dual conversion flow, and a useful public plus private-app structure. The site communicates that it is not a massive daycare and that compatibility, observation, admission, and small groups matter.

The main visual gap is not content strategy. The gap is system maturity. The current interface feels like a solid polished MVP because many sections use the same dark card, same border, same rounded shape, same gradient line, same icon scale, and same text hierarchy. The experience is trustworthy, but it is visually heavy and repetitive. The next phase should refine the design system before attempting a page redesign.

Important implementation note: the repository currently appears to be a static multi-page HTML/CSS/JS site deployed on Vercel, not a visible Next.js `app/` or `pages/` project. Audit recommendations are therefore grounded in the current static structure.

## Project Structure Observed

### Framework and Routing

- Current visible stack: static HTML pages, modular CSS, modular vanilla JS, Supabase client integration.
- No `package.json`, `next.config.*`, `app/`, `pages/`, or React component tree was present in this checkout.
- Public routes are implemented as standalone HTML files:
  - `index.html`
  - `services.html`
  - `gallery.html`
  - `blog.html`
  - `resources.html`
  - `request.html`
  - `admission-pro.html`
  - `auth.html`
- Private/app-like routes:
  - `profile.html`
  - `pets.html`
  - `requests.html`

### CSS Architecture

- Global styles:
  - `css/reset.css`
  - `css/variables.css`
  - `css/themes.css`
  - `css/base.css`
  - `css/layout.css`
  - `css/components.css`
  - `css/pages.css`
- Strength: tokens already exist for color, type, spacing, radius, shadows, containers, transitions, and z-index.
- Risk: button, card, badge, section, and form definitions are repeated across `themes.css`, `base.css`, and `components.css`. This creates cascade ambiguity.
- Risk: `css/components.css` starts with a stray `nid` before a CSS comment. Browsers tolerate it as an invalid selector fragment, but it should be cleaned in a safe maintenance pass.
- Several major pages also contain large inline `<style>` blocks. This has allowed fast page-specific design, but it fragments the component system.

### JavaScript and App Logic

- `js/main.js` initializes theme, active nav, auth, guards, profile, pets, requests, and gallery.
- `js/auth.js` manages Supabase session, Google OAuth, auth slot rendering, and sign-out.
- `js/guards.js` redirects protected routes according to `NIDO_CONFIG.protectedPaths`.
- `js/profile.js`, `js/pets.js`, and `js/requests.js` handle private user flows.
- `js/gallery.js` renders gallery cards and a keyboard-aware lightbox.
- `js/ui.js` centralizes notices, empty states, status badges, loading markup, and image fallback markup.
- `request.html` has its own WhatsApp quote flow inline script.
- `admission-pro.html` has its own long admission form and PDF generation logic using jsPDF.

### Assets

- Logo:
  - `assets/logo/logo-icon.png`
  - `assets/logo/logo-full.png`
  - `assets/logo/logo-full2.png`
  - `assets/logo/nidoico.ico`
- Icons:
  - Dog/cat/service/resource/blog/evaluation/advisory PNG icons under `assets/icons`.
- Photos:
  - Space photos under `assets/photos`.
  - Real dog gallery images under `assets/photos/gallery`.
- Missing referenced illustration folder:
  - `blog.html` and `resources.html` reference `assets/illustrations/dog-routine.png`, `dog-stress.png`, and `cat-care.png`, but no `assets/illustrations` folder was present. The pages have fallbacks, but this weakens visual polish.

### Navigation and Footer

- Header is repeated in every HTML file with consistent `site-header`, `brand`, `nav-wrap`, `nav-links`, and `authSlot`.
- Active state is set by `Utils.setActiveNav()`.
- Header is sticky and becomes a horizontally scrolling nav at narrower widths, preserving mobile access.
- Footer is minimal and centered. It works, but it is not yet a strong trust or navigation surface.

### Forms and Conversion Flows

- `request.html`: quick WhatsApp-oriented quote flow with live summary/message preview.
- `admission-pro.html`: detailed compatibility/admission form with PDF download and WhatsApp support.
- `auth.html`: Google login intent, connected to Supabase but not the main design focus.
- `profile.html`, `pets.html`, `requests.html`: early private app shell for tutor profile, pet records, and saved requests.

## Existing Design Guidance Summary

### Nido Canino Brief

Most relevant points from `docs/NIDO_CANINO_BRIEF.md`:

- Nido Canino is a structured animal wellbeing model, not a generic daycare.
- Key proof points: small groups, maximum 5 dogs, prior evaluation, admission not automatic, observation, stable routines, compatibility.
- Target user is a tutor in Bogota who values clarity, process, trust, quality, and professional criteria.
- The product needs dual entry:
  - fast quote path,
  - deeper PRO compatibility/admission path.
- Future vision is a web app with profiles, pets, requests, persistence, statuses, and a clearer operating process.
- Product decisions should protect group stability, service quality, process clarity, trust, and premium structured positioning.

### Lynx Visual Division

Most relevant principles from `assets/agents lynx/design-systems/lynx-visual-division/DESIGN.md` and workflows:

- Design should align business goal, user need, brand personality, content clarity, hierarchy, accessibility, performance, and emotional response.
- Nido fits a hybrid of:
  - Warm Human Brand,
  - Local Business Trust,
  - Editorial Premium,
  - Modern SaaS/app.
- Avoid forcing a generic SaaS look or a generic pet-care look.
- Visual decisions should improve clarity, trust, conversion, usability, scanability, accessibility, and memorability.
- Motion should clarify state and hierarchy, not decorate.
- Every serious client should have a project-specific visual direction before major implementation.

### Design-MD Library

Relevant reference patterns to translate, not copy:

- Airbnb: photo-first warmth, generous white/light surfaces, friendly marketplace cards, authentic imagery as trust.
- Linear: dark premium surface ladder, scarce accent usage, disciplined component hierarchy.
- Intercom: warm cream canvas, white-on-cream card lift, product/app-like trust, restrained editorial rhythm.
- Cal.com: app-like cards, product UI fragments, strong but simple CTAs, clean form/task flows.
- Apple: media-first hero thinking, alternating light/dark section rhythm, UI chrome receding behind the artifact.
- Clay: warm cream base, distinctive illustration/3D language, richer color variation without losing system control.

For Nido, the strongest extraction is: keep the dark premium base, introduce warmer light/cream sections, make photography the emotional artifact, and create a more disciplined component hierarchy.

## Visual System Audit

### Color

Current palette:

- Base: `#111111`, `#171717`, `#1d1d1d`, `#202020`, `#252525`
- Text: `#f5efe7`, `#cdbfae`, `#9d8f81`
- Accent: `#c8a47b`, `#d6b38a`, `#a98357`
- Light mode exists but is not central.

What works:

- The dark/camel combination is recognizable and premium.
- The accent color matches the logo and animal-care warmth.
- Semantic colors exist and are restrained.

Weaknesses:

- Too many sections sit on dark surfaces with similar cards, causing heaviness.
- Accent is used mostly as button fill, badges, borders, and thin lines; it needs richer tonal roles.
- The light mode tokens are present, but the public pages do not use warm light sections as part of the brand rhythm.

### Typography

What works:

- Inter is readable, fast, and appropriate for a functional web app base.
- Headings are bold and clear.
- Spanish copy reads comfortably at body size.

Weaknesses:

- The site relies heavily on large bold Inter headings, which can feel generic.
- Hero headings often use narrow max-widths, creating dramatic line breaks but sometimes reducing editorial polish.
- There is no distinct editorial/content scale for blog/resources versus service/app flows.

### Spacing and Layout

What works:

- Spacing tokens are defined.
- Containers and grids are reusable.
- Mobile stacking is already handled for the main grid patterns.

Weaknesses:

- Section rhythm is consistent but repetitive: hero, grid, cards, CTA.
- Dark cards repeat in almost every context.
- Several pages have visual weight concentrated at the top but little page-level variation below.

### Radius, Shadows, and Surfaces

What works:

- Rounded shapes make the dark system softer.
- Cards have enough separation on dark backgrounds.
- Hover lift exists and makes the UI feel interactive.

Weaknesses:

- The radius scale is too rounded for nearly every component, which makes premium/app-like hierarchy less precise.
- Shadows are often similar and dark-on-dark, making depth subtle but not always meaningful.
- Too many cards use the same surface, same border, and same top accent line.

### Buttons and CTAs

What works:

- Primary and secondary actions are clear.
- Buttons have good tap height.
- CTA copy is strategically aligned with quote and compatibility paths.

Weaknesses:

- Button styles are duplicated in multiple CSS files.
- Primary buttons are warm and visible but could feel more polished with refined press/focus states.
- Secondary CTAs sometimes compete visually with text links because the system relies on subtle borders.

### Cards, Badges, Chips

What works:

- Card/chip/badge primitives exist and are reused.
- Pills communicate filtering/process states well.

Weaknesses:

- Cards lack type variants. A service card, note card, article card, path card, stat card, and form card often feel related but not purposefully distinct.
- Badges are useful but over-familiar across pages.
- Cards need a better hierarchy: editorial media card, app panel, service tile, process step, trust note, form panel.

### Navigation

What works:

- Header is stable, sticky, and clear.
- Logo mark works well in small size.
- Active nav state is visible.
- Horizontal scrolling nav on mobile preserves content without a hamburger refactor.

Weaknesses:

- Repeated header markup creates maintenance risk.
- Nav text varies slightly across pages (`Solicitar cotización` vs `Solicitar servicio`), which may be intentional but should be standardized by route intent.
- Header could feel more app-like with a subtler frosted surface and clearer auth/CTA treatment.

### Image and Media Treatment

What works:

- Real dog gallery photos create authenticity.
- Space photos are valuable because they reveal the care environment.
- The logo carries a strong emotional/protective idea.

Weaknesses:

- The homepage hero uses the large logo where a strong emotional photo or short video could create trust faster.
- Gallery images are darkened strongly; in the first viewport, several photos feel almost hidden.
- Space photos are useful but presented as equal cards, not as an editorial story of rest, feeding, observation, and calm integration.
- Missing illustration assets reduce polish on blog/resources.

### Responsiveness

What works:

- Main grids collapse to one column.
- Header nav stays accessible.
- Form layouts collapse from two columns to one column.
- Gallery lightbox has mobile rules.

Weaknesses:

- Large hero visuals/icons may dominate mobile too much.
- Some text-heavy cards may create long, visually similar scrolls.
- Future media/video additions need explicit aspect-ratio and crop rules before assets arrive.

## Key Risks

- Static HTML repetition increases maintenance cost across nav, scripts, styles, metadata, and page-specific CSS.
- Inline CSS makes it easy to drift visually from page to page.
- Missing `assets/illustrations` references are currently masked by fallbacks but should be resolved.
- CSS cascade duplication may make future component polish unpredictable.
- Heavy dark theme can undercut the home-like, calm, caring feeling if not balanced with warm light surfaces and real media.

