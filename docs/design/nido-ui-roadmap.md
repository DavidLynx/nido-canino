# Nido Canino - UI Roadmap

Scope: low-risk implementation sequence for the next phases. Preserve routes, approved copy, forms, auth, data flows, and responsive behavior.

## Phase 0 - Stabilize Before Visual Work

Goal: reduce design-system risk without visible redesign.

Tasks:

- Remove stray `nid` text at the top of `css/components.css`.
- Audit duplicate `.btn`, `.card`, `.badge`, `.notice`, form, and `.section` definitions across `themes.css`, `base.css`, and `components.css`.
- Decide which file owns each primitive:
  - `variables.css`: tokens only.
  - `base.css`: HTML defaults, containers, type, generic layout utilities.
  - `layout.css`: header, footer, global layout shells.
  - `components.css`: buttons, cards, badges, forms, notices, status, media primitives.
  - `pages.css`: reusable page patterns and app/private page patterns.
  - inline `<style>`: only temporary or truly page-specific exceptions.
- Confirm missing illustration references and either add assets or change to intended fallback assets.
- Keep all route links, form IDs, JS hooks, and Supabase logic unchanged.

Acceptance:

- No visual regression beyond tiny cleanup.
- All public pages load.
- Request and admission forms still work.
- Auth warnings/session UI still work.

## Phase 1 - Design Tokens and Component Foundations

Goal: make the site easier to polish without editing every page individually.

Tasks:

- Extend tokens with semantic surface roles:
  - dark canvas,
  - dark elevated,
  - warm cream canvas,
  - warm card,
  - media overlay,
  - app panel,
  - form surface.
- Add card variants:
  - default,
  - media,
  - service,
  - process,
  - trust,
  - form,
  - app record,
  - editorial.
- Add button state tokens:
  - hover,
  - active,
  - focus,
  - disabled.
- Add image/media primitives:
  - aspect ratios,
  - rounded media,
  - overlay gradient,
  - object-fit/object-position helpers.
- Add `prefers-reduced-motion` handling for existing animations and transitions.

Acceptance:

- Existing pages look mostly the same but primitives are cleaner and more consistent.
- Component variants can be adopted gradually.

## Phase 2 - Homepage Foundation Refresh

Goal: improve first impression while preserving approved copy and route logic.

Tasks:

- Refine the homepage hero layout.
- Keep the logo, but prepare a future hero media slot for photo/video.
- Improve CTA grouping for quick quote and compatibility evaluation.
- Improve KPI/trust cards with clearer hierarchy.
- Convert route/service cards to a consistent component.
- Improve "spaces of care" section:
  - larger media,
  - clearer rest/feeding/guided play story,
  - stronger crop/aspect ratio rules.
- Add a warm light/cream section band to reduce dark heaviness.

Acceptance:

- Home still routes to `request.html` and `admission-pro.html`.
- Copy remains intact.
- Mobile stacks correctly.
- Images have stable dimensions.

## Phase 3 - Services and Request Flow Polish

Goal: make decision and conversion paths feel more premium and app-like.

Tasks:

- Apply service card variants to top service choices.
- Refine service detail/pricing cards and accordions.
- Improve the quick request form and summary panel using shared form tokens.
- Style WhatsApp preview as a polished message surface.
- Improve focus and validation states without changing field behavior.

Acceptance:

- Service anchors still work.
- WhatsApp quote flow still generates the expected message.
- No field names/IDs are changed.

## Phase 4 - Gallery and Media System

Goal: make authentic photos feel curated and premium.

Tasks:

- Reduce heavy default photo darkness.
- Add an editorial gallery layout option.
- Prepare optional category/filter data fields.
- Improve lightbox panel styling and mobile image sizing.
- Add asset guidelines to `data/gallery-data.js` comments or a separate content note.

Acceptance:

- Existing gallery data still renders.
- Lightbox still opens/closes via click, escape, and controls.
- Keyboard focus remains visible.

## Phase 5 - Blog and Resources Editorial Upgrade

Goal: make educational content feel useful, scannable, and premium.

Tasks:

- Create editorial card and checklist components.
- Resolve missing illustration/photo assets.
- Add featured article/resource treatment.
- Add consistent topic chips.
- Improve expandable article/resource styling.

Acceptance:

- Approved content remains.
- Existing anchors and CTAs remain.
- Missing images no longer silently degrade page polish.

## Phase 6 - Private App Shell Polish

Goal: distinguish the logged-in app from marketing pages while staying on-brand.

Tasks:

- Refine dashboard sidebar and app panels.
- Improve profile summary, pet record, request record, chips, and status badges.
- Improve empty/loading/error states.
- Add more app-like spacing and form grouping.

Acceptance:

- Protected routes remain protected.
- Supabase reads/writes remain intact.
- Form field mappings remain unchanged.

## Safest Next Implementation Step

Start with Phase 0 and Phase 1:

1. clean obvious CSS issue,
2. consolidate ownership of shared primitives,
3. add semantic tokens and component variants without aggressively applying them yet.

This is the safest because the visual refresh will otherwise fight duplicate cascade rules and inline page styles.

## Implementation Guardrails

- Do not rewrite approved copy.
- Do not remove pages.
- Do not rename form IDs, input names, JS object names, or data attributes.
- Do not alter Supabase auth or protected route logic.
- Do not convert to a different framework during visual polish.
- Do not replace the logo.
- Do not add heavy animation libraries for simple microinteractions.
- Do not add large videos before poster/performance rules exist.

## Verification Checklist Per Phase

- Load all public pages.
- Test desktop and mobile widths.
- Check header/nav active states.
- Check request form summary and WhatsApp link.
- Check admission PDF button and WhatsApp button.
- Check gallery lightbox.
- Check auth page with missing/available Supabase config.
- Check protected route redirects.
- Check keyboard focus on links/buttons/forms/gallery cards.

