# Formulario 01: Nido `/request` → Lynx Public Intake

## Scope and current-state audit

Previously `app/request/page.tsx` rendered `legacy-content/request.html` via `LegacyRoute`.
That HTML composed a WhatsApp message, validated only name/pet/service on click, and had
no backend, persistence, idempotency, or acquisition capture. `source=services` and `intent`
were emitted by service links but ignored by the receiving form.

Only `/request` is replaced. Both legacy `request.html` files remain unchanged for history;
`/request.html` still redirects to `/request`. All PRO, Auth, profiles, pets, requests,
Supabase schema/RLS and legacy runtime files remain untouched. This is not a second CRM.

## Architecture

`app/request/page.tsx` (server, runtime privacy config)
→ `components/request/request-form.tsx` (six-step client UI)
→ `POST /api/request` (same-origin JSON, streamed 32 KiB limit, Zod revalidation)
→ `lib/lynx/public-intake.ts` (`server-only`, 12-second timeout, no redirects/retries)
→ configured Lynx intake URL.

No secret or upstream payload is returned to the browser. Only a validated `request_id`
is returned on success. The browser does not receive submission/contact/opportunity IDs.
There is no payload logging, Supabase write, PDF attachment, upload, pet creation, or
WhatsApp click event. The shared global site's social links are not the submission flow.

## Manual production configuration — NOT performed by this change

| Server environment variable | Required value |
| --- | --- |
| `LYNX_NIDO_AUTHORIZATION` | Full existing `Bearer <integration-key-id>.<integration-secret>` value, entered privately by the owner |
| `LYNX_PUBLIC_INTAKE_URL` | Optional override; default `https://lynx-business-os.vercel.app/api/v1/public-intake/nido-website` |
| `NIDO_PRIVACY_POLICY_VERSION` | Required: `NIDO-PDP-1.0-2026-09-02`; no server default |
| `NIDO_PRIVACY_POLICY_URL` | Required: `https://nidocanino.org/privacidad`; no server default |

Do not add a real credential to this document, source, tests, logs, client props or a
`NEXT_PUBLIC_*` variable. `.env.local` is ignored by Git; the checked-in `.env.example`
only contains blanks/placeholders. Existing public Supabase variables are unchanged.

### Privacy policy in the project

`app/privacidad/page.tsx` publishes the React route `/privacidad` within the project, using
the existing Header/Footer layout. No production deployment was performed in this change.
The document is **Política de Tratamiento de Datos Personales y Privacidad**, code
`NIDO-PDP`, version **1.0**, effective **2 September 2026**, technical identifier
`NIDO-PDP-1.0-2026-09-02`. Expected production URL: `https://nidocanino.org/privacidad`.

The responsible person approved by the owner is **Alba Lilian Deaza Alfonso**, a natural
person operating under the commercial name Nido Canino, domiciled in Bogotá D.C., Colombia.
Approved contact: Calle 23D No. 72B-20, Bogotá D.C.; +57 312 461 1816;
`bienestar@nidocanino.org`. No personal identification number, corporate NIT or company
registration is published or invented.

The policy covers the supplied Colombian scope, data categories, service purposes,
processors, authorization, sensitive data, minors, rights, consultations and complaints,
security, retention, changes and validity. Legal procedure checks used the official
[Ley 1581 de 2012](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/ley_1581_2012.htm)
and [Decreto 1074 de 2015, capítulo 25](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/decreto_1074_2015_pr025.htm).

### Operational privacy channel

**`bienestar@nidocanino.org` is the approved operational privacy contact for go-live.**
This mailbox must remain operational and monitored.

### GO-LIVE BLOCKERS: publication and configuration

- Publish and verify `/privacidad` on the production domain through the owner's authorized
  release process. This change does not deploy.
- Privately configure the three required production variables: `LYNX_NIDO_AUTHORIZATION`,
  `NIDO_PRIVACY_POLICY_VERSION` and `NIDO_PRIVACY_POLICY_URL`, using the values above.
  `LYNX_PUBLIC_INTAKE_URL` is optional because a production endpoint default already exists.
- Verify that runtime version/URL match the actual policy shown before enabling traffic.
  Future policy revisions must update the document and runtime configuration together;
  this change adds no hardcoded policy version to the server and no new configuration gate.
- Confirm the operational procedures, authorization evidence, processor safeguards and
  retention practices with the responsible person. The page itself does not implement them.

Without either policy variable, the UI disables canine submission and the backend fails closed. Without
authorization, the backend fails closed without calling Lynx. `TEST-POLICY` is allowed
only for tests/development and explicitly rejected in production. This test fixture is
not a legal document or legal default.

The `/request` authorization uses the approved short copy and links directly to `/privacidad`
in a separate tab (`noopener noreferrer`) to preserve the form. Its checkbox remains required,
initially unchecked, and records the actual acceptance time. The policy URL and version
continue to be loaded and validated from environment configuration by `getPrivacyPolicy`;
the server passes them to the form. The document link is the requested local route, not an
environment-dependent navigation destination. Its configured version is included in the browser
envelope to bind the consent to the displayed policy. The server compares this value
against current configuration and constructs `consent.policy_version` from that config.
A changed policy yields a safe conflict, not a silent consent-version replacement.

The footer now includes “Privacidad y tratamiento de datos” → `/privacidad`.
**Separate legal-content debt:** “Términos y condiciones” still points to `#`; it has been
preserved, and no terms page or commercial conditions were created in this slice.

## Answers and validation

- Required tutor: `full_name`, `phone`, `locality`, `zone`; no email field.
- Origin: `source_self_reported`; `source_detail` optional and only active for recommendation,
  flyer/conjunto, ally, event, other. Option labels exactly match the supplied contract.
- `need_type` controls `trip_start`/`trip_end`, `weekly_days_count`/`weekly_days`, or `single_date`.
- Travel dates must exist and end >= start; equal dates are allowed. Date format YYYY-MM-DD.
- Weekly: integer 1–5 and unique weekdays Monday–Friday; selected count must match the array.
- `dog_count`: integer 1–5. Each visible dog requires `dog_N_name`, `dog_N_age`,
  `dog_N_breed_or_type`, `dog_N_sex`, `dog_N_size`, `dog_N_neutered`.
- Convivencia: `dog_relationship`, `cat_reaction`, `bite_history`, `special_health_need`.
- `bite_context` required only for `bite_history = Sí`.
- `care_concern` optional; `privacy_consent` must be boolean true.

The projection whitelist runs BEFORE server validation: hidden conditional values, unknown
answers and all `dog_N_*` above the count are omitted, not sent as empty strings. The UI
may retain prior hidden values in memory when going back, but they never enter the
effective payload. Optional blank strings are omitted. No HTML is evaluated.

Bounds: full name 120, phone 40 (7–15 digits plus normal phone punctuation), locality 100,
zone 120, source detail 300, dog name 100, age 80, breed 120, health 1500, bite context 1000,
care concern 1000 characters. Select enums are revalidated server-side. Dog/weekly counts
are transmitted as numbers; weekly days as a string array; consent as boolean.

## Exact Nido → Lynx mapping

| Lynx path | Source |
| --- | --- |
| `metadata.schema_version` | `1` |
| `metadata.external_request_id` | `nido-request-<v4 UUID>` from the frozen browser attempt |
| `metadata.submitted_at` | ISO UTC captured on first send of the logical attempt |
| `metadata.form_slug` / `form_version` | `website-intake` / `1` |
| `attribution.source_self_reported` / `source_detail` | Validated answers; detail only when active/nonempty |
| Remaining attribution | Validated allowlisted URL/referrer capture, described below |
| `contact.full_name`, `phone`, `locality`, `zone` | Corresponding validated answer |
| `request.intent` | Exact selected `need_type` label (no undocumented receiver enum invented) |
| `request.requested_dates` | Travel `[trip_start, trip_end]`; single day `[single_date]`; otherwise omitted |
| `request.frequency` | Weekly only: `<count> días/semana: <selected weekdays>` |
| `request.concern` | Trimmed `care_concern`, or `Solicitud inicial enviada desde nidocanino.org/request` |
| `context` | `{}` |
| `answers` | Validated effective contract fields only |
| `consent.accepted` | `true` |
| `consent.policy_version` | Current real server configuration, matching the policy shown |
| `consent.accepted_at` | Actual checkbox acceptance timestamp from this form interaction, retained on retry |

Timestamps are browser attestations, syntax/order checked server-side with a five-minute
future-clock tolerance. They are not proof of an authenticated identity. `submitted_at`
and `accepted_at` stay fixed across retries so the full upstream payload stays stable
while server configuration is unchanged. Never use a telephone or name as an ID.

The supplied receiver brief does not enumerate `request.intent` or constrain the format
of `request.frequency`. This implementation preserves exact need labels and a factual
weekly string. Verify this mapping against the real receiver during the owner-controlled
end-to-end smoke test; no production call was used to infer an undocumented contract.

## Idempotency / retry / errors

An immutable envelope is created before the first request and retained in component
memory. Rapid double clicks are guarded with a ref. Server timeout is 12 seconds; browser
timeout 18 seconds. There is no automatic retry and no new ID for a network retry.

Every error offers “Intentar nuevamente” and “Editar solicitud”. Retry keeps the fields
locked and resends the identical body/ID, including consent and submit timestamps. Editing
abandons the client attempt, retains entered data, unlocks step navigation and requires
fresh authorization. The next send always has a new ID and timestamps, even if the answers
are unchanged. Ambiguous outcomes show a warning about creating a new request; editing
does not cancel anything the receiver may already have stored. A 429 countdown blocks sending,
not editing. Authorization/configuration unavailability remains explained during editing.
After success, “Crear una nueva solicitud” resets all form values for another request.

No PII is put in localStorage/sessionStorage. Limitation: a reload/tab close loses draft and
attempt correlation. The UI warns against reloading while waiting. Cross-device recovery
or durable receipt recovery is a later slice, not a duplicate local CRM.

| Receiver outcome | Nido outcome |
| --- | --- |
| 202 + `accepted: true` + valid `request_id` | 202, success; offer WhatsApp link |
| 400 / 422 | 422 validation, review/retry |
| 401 / 403 | 503 authorization unavailable; no internals shown |
| 409 | 409 conflict, retry same reference or explicitly edit as a new request |
| 429 | 429, bounded Retry-After (1–300 seconds), disabled retry until elapsed |
| 5xx / unexpected HTTP | 502 upstream failure |
| Timeout | 504, retained envelope |
| Network / malformed response | Safe failure, no success |
| Missing auth/policy config | 503 before fetch |
| Policy changed | 409 before fetch |

WhatsApp is never opened automatically for canine requests. Only successful acceptance
renders the continuation link. Message: tutor, dog names, need, actual dates when relevant,
external reference. No 50-answer dump, no PDF, no claim of confirmed booking. Internal
error text, stack traces, SQL and auth headers are never reflected to the browser.

## Attribution

Capture at form mount: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`,
`campaign_or_qr_code`, valid HTTP(S) `document.referrer`, `landing_path`.
`landing_path` retains allowlisted query params, including legacy `source` and `intent`.
These legacy values do NOT become visible answers and are not added as undocumented
top-level attribution keys. Referrer fragments and URLs containing credentials are rejected/
removed. No unknown query params (e.g. arbitrary email) are copied.

Only attribution available on arrival at `/request` is captured. There is no site-wide
first-touch storage, analytics cookie, or inference from missing data. Each parameter is
bounded; landing path is capped at 2048 without cutting encoded parameters in half.

## Nido accounts and feline requests

Existing Supabase sessions live in the legacy browser client. No secure server-side session
verification is added in this slice. Therefore no email, external user/pet IDs or pet names
are sent in `context`, even if the browser claims an identity. Future authenticated linkage
needs verified server-side sessions; no matching by name/phone is performed.

The canine form explicitly offers a separate feline WhatsApp consultation link. It sends
no canine submission, fake dog fields or CRM success claim. A structured feline Lynx flow
requires its own contract/form; none is assumed. `intent=felino` is retained as URL context
and does not populate canine answers automatically.

## Checks and local smoke test (no production calls)

Install dependencies and the browser once:

```powershell
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm lint
pnpm typecheck
pnpm test:request
pnpm test:request:e2e
pnpm build
git diff --check
```

E2E starts a local receiver on 127.0.0.1:4319 and Next on 127.0.0.1:4318 with explicitly
fake test configuration. It does not read the real integration secret or forward to Lynx.
The mock rejects non-test policy/auth values and cannot run with NODE_ENV=production.
Browser external requests are blocked in E2E. Receiver data remains in test-process memory.

For manual local UI smoke, start two terminals in this repository (these env values are
test fixtures only; do not copy them into deployment settings):

Terminal 1:

```powershell
$env:NIDO_TEST_MOCK = "1"
pnpm test:request:mock
```

Terminal 2:

```powershell
$env:LYNX_PUBLIC_INTAKE_URL = "http://127.0.0.1:4319/intake"
$env:LYNX_NIDO_AUTHORIZATION = "Bearer TEST-ID.TEST-NOT-A-SECRET"
$env:NIDO_PRIVACY_POLICY_VERSION = "TEST-POLICY"
$env:NIDO_PRIVACY_POLICY_URL = "https://example.test/privacy"
pnpm dev --hostname 127.0.0.1 --port 4318
```

1. Open `http://127.0.0.1:4318/request?source=services&intent=evaluacion&utm_campaign=smoke`.
2. Use fictitious data only. The example.test policy URL is a test placeholder, not legal text.
3. Fill six steps, consent and send. Normal test names yield 202. Inspect the browser's
   same-origin `/api/request`: no Authorization header or internal CRM IDs should appear.
4. Confirm the WhatsApp continuation appears only after acceptance; do not send the test
   message to the real business number. Inspect the link/reference without sending.
5. New request with full name `TEST ERROR` yields 503; no canine continuation link.
6. `TEST RATE LIMIT` yields 429 once, then 202 for the identical envelope/ID.
7. `TEST TIMEOUT` delays beyond the server timeout once, then accepts the same ID on retry.
8. Test dog_count 3→1, travel→weekly, bite Sí→No; hidden keys must disappear from JSON.
9. Clear either policy env value and restart Next: sending must be unavailable.
10. Check the feline outlet separately; it must not POST a canine intake.

Stop both terminals afterward. Production smoke is a separate owner-authorized operation
after publication of the real policy and manual secret configuration. This change does
not commit, push, deploy, configure credentials, or modify external services.

## Verification performed in this repository

Privacy-policy slice:

- 68 focal tests: existing request schema, mapping, error/retry and client boundaries,
  plus policy rendering, responsible person/contact, version/date, statutory deadlines,
  contents anchors, footer, required unchecked consent and runtime policy configuration.
- `/privacidad` checked in Chromium against the local production build at 360 / 390 /
  768 / 1280 px: HTTP 200, 16 sections, footer link and no horizontal overflow.
- Visual review of mobile and desktop captures; no production traffic or submission.
- TypeScript, ESLint, production build and whitespace diff checks.
- No test calls the productive Lynx endpoint or writes to Nido Supabase.

The prior error-recovery slice passed 7 local-mock E2E cases, including full-envelope
retry after 429/timeout and editing with a new ID and conditional dog pruning. That E2E
suite was not rerun as part of this privacy-only change; request focal regressions were.
