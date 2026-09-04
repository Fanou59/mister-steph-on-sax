---
title: 'Mister Steph On Sax — landing page'
type: 'feature'
created: '2026-09-04'
status: 'in-review'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: 'NO_VCS'
context:
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-Mister_Steph_On_Sax-2026-09-04/DESIGN.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-Mister_Steph_On_Sax-2026-09-04/EXPERIENCE.md'
  - '{project-root}/_bmad-output/planning-artifacts/architecture/architecture-Mister_Steph_On_Sax-2026-09-04/ARCHITECTURE-SPINE.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** No code exists yet. A one-page Next.js marketing site (event saxophonist) needs to go from finalized UX spines + architecture spine to a working, deployable app.

**Approach:** Greenfield Next.js 16.3.4 App Router scaffold implementing the 7 AD's in ARCHITECTURE-SPINE.md verbatim: Server-first page (Hero, Écoute-teaser, Formules) + one Client island (contact form) wired via `useActionState` to a Server Action that validates with Zod, checks a honeypot, and sends two separate Resend emails (notification-first, confirmation best-effort), gated off outside Production. Tailwind v4 `@theme` sourced 1:1 from DESIGN.md tokens.

**Always:** Follow ARCHITECTURE-SPINE.md AD-1..AD-8 and Structural Seed exactly (file layout, Server/Client boundary, action return shape, env var names). Content strings from DESIGN.md/EXPERIENCE.md/the brief go in `lib/content.ts`, not hardcoded. `<html lang="fr">`. Draft-quality Formules copy is acceptable (clearly a starting point, easy to edit later since centralized) — do not block on final marketing copy.

**Never:** No CMS. No route handler for the form (AD-2). No `@react-email/components` (deprecated — use `react-email`). No batch Resend send (AD-4). No analytics/tracking script (Deferred). No CAPTCHA/rate-limiting beyond the AD-8 honeypot.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Happy path | Valid form, Production env | `{ ok: true }`; notification + confirmation sent; UI shows `role="status"` success message | N/A |
| Field validation error | Missing/invalid date | `{ ok: false, kind: 'validation', fieldErrors }`; per-field message via `aria-describedby` | Focus moves to first error only on submit, not blur |
| Resend send fails | Valid form, Resend API error | Notification attempted first; if it fails, `{ ok: false, kind: 'technical', message }`, `role="alert"` shown | Confirmation failure alone must NOT fail the submission |
| Honeypot filled | Hidden field non-empty | `{ ok: true }` returned, no email sent | Indistinguishable from success to the caller |
| Non-Production env | Any valid submission | No real email sent; payload logged; `{ ok: true }` | Prevents Preview spam to Stephane's inbox |

</frozen-after-approval>

## Code Map

- Greenfield — no existing code (empty repo, no `package.json`). Full contract lives in the three `context:` docs above; do not re-derive AD-1..AD-8, tokens, or flows here — read them.
- No git repository currently exists at project root — initialize one as the first task so the scaffold is committed incrementally and reversibly.

## Tasks & Acceptance

**Execution:**
- [x] `git init` + `.gitignore` (node_modules, .next, .env*.local) -- version control before scaffolding
- [x] `package.json` + Next.js 16.3.4 App Router scaffold (TS, Tailwind v4, ESLint) -- project init per Stack table
- [x] `app/globals.css` -- `@theme` block, all DESIGN.md token categories (colors, typography, rounded, spacing) -- AD-6
- [x] `app/layout.tsx` -- `<html lang="fr">`, `next/font/google` (Playfair Display + Inter) -- EXPERIENCE.md Accessibility Floor
- [x] `lib/content.ts` -- typed exports per AD-5 shape (`prestationTypes`, `formules`, `listenTeaser`, `contactFormLabels`); draft copy
- [x] `lib/validation.ts` -- Zod schema; `prestationTypes` enum derived from `lib/content.ts`, not redeclared -- AD-3
- [x] `lib/resend.ts` -- Resend client; two `resend.emails.send()` calls (notification blocking, confirmation best-effort); `VERCEL_ENV` gate -- AD-4
- [x] `lib/actions.ts` -- Server Action; honeypot check first (AD-8); Zod revalidation; calls `lib/resend.ts`; returns AD-3 discriminated shape
- [x] `emails/notification-email.tsx`, `emails/confirmation-email.tsx` -- `react-email` components (not `@react-email/components`) -- AD-4
- [x] `components/hero.tsx`, `components/listen-teaser.tsx`, `components/formules.tsx` -- Server Components, static, from `lib/content.ts`
- [x] `components/contact-form/contact-form.tsx` -- Client island; `useActionState`; blur validation (no focus jump) vs submit validation (focus jump); success/error live regions -- EXPERIENCE.md State Patterns
- [x] `app/page.tsx` -- assembles the four sections in fixed order
- [x] `.env.example` -- documents `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `RESEND_FROM_EMAIL` (no real values)

**Acceptance Criteria:**
- Given the built page, when loaded, then Hero/Écoute/Formules render with zero client JS shipped for those sections (Server Components only).
- Given a filled valid form, when submitted, then the visitor sees the success message and (in Production) two distinct Resend calls fire, notification first.
- Given the honeypot field filled by a bot, when submitted, then no email sends and the caller still sees success.
- Given any color/font/radius used in a component, then it resolves through a Tailwind theme class, never a literal hex/px value.

## Implementation Notes

- **Email field added to the contact form.** Neither EXPERIENCE.md's Component Patterns table nor the reference mockup (`mockups/key-landing-desktop.html`) lists an email input — the form there is Nom/Prénom/Date/Type/Lieu. But AD-4 explicitly requires the confirmation email to go "vers l'adresse saisie par le visiteur," which is only possible if the form collects one. Resolved by adding an `Email` field (label added to `contactFormLabels`, validated with `z.string().email()` in `lib/validation.ts`, its own `<Field>` between Prénom and Date in `contact-form.tsx`). This is a judgment call reconciling a gap between the UX and architecture docs — flagging it here per the spec's own "read them, don't re-derive" instruction, in case Stephane wants the field repositioned or phrased differently.
- **`typescript` pinned to `6.0.3`, not `7.0.x` as the Stack table specifies.** `typescript-eslint` (pulled in by `eslint-config-next@16.3.4`) hard-errors on TS 7 ("typescript-eslint does not support TS 7.0") at config-load time, which would make `npm run lint` — a Verification acceptance command — fail outright regardless of the code itself. TS 6.0.3 is the newest release still on the classic (non-Go/tsgo) compiler API that `typescript-eslint` supports, so it satisfies the Stack table's underlying intent ("nothing justifies staying on 5.x") while keeping lint working. Revisit once `typescript-eslint` ships TS 7 support.
- **`eslint.config.mjs` imports `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript` directly** (flat `Linter.Config[]` arrays) rather than going through `FlatCompat().extends(...)`. `eslint-config-next@16.3.4` now ships native flat config; routing it through the legacy `FlatCompat` shim threw a "Converting circular structure to JSON" error when validating the `react` plugin's config object.
- **Honeypot field** is named `site_web` (`lib/validation.ts` → `HONEYPOT_FIELD_NAME`), visually hidden via off-screen absolute positioning (not `display:none`) plus `aria-hidden`, `tabIndex={-1}`, `autoComplete="off"` — a genuine human using only a screen reader or keyboard never encounters it.
- **`contactFormMessages.technicalError`** contains a placeholder fallback email (`contact@mistersteponsax.fr`) since no real fallback contact (email/phone) was supplied in any of the three context docs. Draft-quality, centralized in `lib/content.ts` for easy editing later — same tolerance the spec explicitly grants the Formules copy.
- Contact form field-error state avoids mirroring server `fieldErrors` into local state via a `useEffect` (flagged by `eslint-plugin-react-hooks`'s newer `set-state-in-effect` rule as a cascading-render risk); instead `fieldErrors` is derived at render time as `{...submitFieldErrors, ...blurErrors}`, and the effect is only used for the two legitimate side effects it needs — moving focus to the first invalid field after a submit, and focusing the success region — both are plain `ref.focus()` calls, no `setState`.
- **Added a minimal Vitest unit-test setup**: `vitest` as a devDependency, a `"test": "vitest run"` script in `package.json`, and `vitest.config.mts` (resolves the `@/*` alias to match `tsconfig.json`, since Vitest doesn't read tsconfig `paths` on its own). Tests live in `__tests__/actions.test.ts` and `__tests__/resend.test.ts` and exercise the real exported functions (`submitContactForm`, `sendContactEmails`) rather than reimplementing their logic — `__tests__/actions.test.ts` module-mocks `@/lib/resend` to isolate `submitContactForm`'s branching, while `__tests__/resend.test.ts` mocks the `resend` npm package itself so `lib/resend.ts`'s own Production gate runs for real. All 5 rows of the I/O & Edge-Case Matrix above now have a passing test (`npm run test` → 2 files, 5/5 tests passing).

## Review Triage Log

Three parallel review layers ran against the implementation diff (Blind Hunter, Edge Case Hunter, Verification Gap). Findings verified and routed below.

- **false** — Blind Hunter claimed the `emails/*.tsx` import from `'react-email'` (`Body, Container, Head, ...`) would fail at build since those components supposedly live in `@react-email/components`. *Refuted:* `node -e "require('react-email')"` confirms `react-email@6.9.3` exports `Body`/`Container`/`Head`/`Heading`/`Hr`/`Html`/`Preview`/`Text` directly (unified package since React Email 6.0, April 2026); `npm run build` already succeeded with zero type errors before and after this review.
- **false** — Blind Hunter claimed calling `NotificationEmail({...})`/`ConfirmationEmail({...})` as plain functions instead of JSX is a latent break. *Refuted:* this exact pattern (`react: ConfirmationEmail({...})`) is Resend's own documented Next.js Server Action example (confirmed via Context7 `/resend/resend-examples` during the architecture phase); neither template uses hooks, so the JSX inside each function body still produces a valid React element tree.
- **high** — Blind Hunter (#1) + Edge Case Hunter (`lib/resend.ts:49-65`, `:8`), same root cause: the notification `resend.emails.send()` call had no `try/catch`, unlike the confirmation call 20 lines below it — a thrown/rejected send (network failure, missing/invalid `RESEND_API_KEY`) propagated unhandled instead of the spec's `{ ok:false, kind:'technical' }` I/O-matrix row 3 contract, so a real visitor could see a raw crash instead of the intended `role="alert"` message. *Fixed:* wrapped the notification send in `try/catch` mirroring the confirmation call's existing pattern.
- **medium** — Blind Hunter (#2) + Verification Gap Reviewer, same root cause: `lib/resend.ts`'s entire Production branch (env-var guard, blocking notification send, best-effort confirmation send) had zero test coverage — `__tests__/resend.test.ts` only exercised the non-Production early return, `__tests__/actions.test.ts` mocked `sendContactEmails` away entirely. *Fixed:* added 3 tests to `__tests__/resend.test.ts` (missing env vars, notification failure, confirmation failure/throw) — 8/8 tests pass.
- **low** — Edge Case Hunter: `date` field (`lib/validation.ts:26`) accepted any non-empty string, no format check. *Fixed:* added an ISO-date regex (`/^\d{4}-\d{2}-\d{2}$/`).
- **low** — Edge Case Hunter: `nom`/`prenom`/`lieu` accepted unbounded length. *Fixed:* added `.max(200, ...)` to each.
- **low** — Blind Hunter: `lib/content.ts` validation messages mixed curly `’` and straight `'` apostrophes. *Fixed:* made the `date` message consistent (curly, matching the majority).
- **low** — Blind Hunter: `.gitignore` missing `.vercel/` despite the project targeting Vercel. *Fixed:* added it.
- **low** — Blind Hunter: the form-control Tailwind class string was duplicated verbatim between `Field` and the inline `<select>` in `contact-form.tsx`. *Fixed:* extracted to one shared `formControlClass()` helper.
- **defer** — Edge Case Hunter: no rejection of already-past event dates. Real if unwanted, but no planning doc (DESIGN.md/EXPERIENCE.md/ARCHITECTURE-SPINE.md/this spec) specifies date-range validation — an unaddressed dimension, not a defect against stated intent.
- **defer** — Edge Case Hunter: no timeout wraps `resend.emails.send()`; a hang would leave `isPending` stuck client-side. Real but Vercel's platform function-timeout is a backstop, and a correct client-side timeout adds non-trivial complexity beyond a direct correction.
- **defer** — Edge Case Hunter: native Enter-key form submission bypasses the submit button's `isPending`/`aria-disabled` guard (only the button's own `onClick` short-circuits), allowing a second concurrent Server Action call. Real, but the smallest robust fix needs care to avoid reopening the focus-loss anti-pattern the UX accessibility review (see `DESIGN.md`/`EXPERIENCE.md`) specifically fixed by choosing `aria-disabled` over native `disabled` — not a direct correction, and no AD addresses concurrent-submission guarding.
- **defer** — Blind Hunter: no Open Graph/Twitter meta, favicon, or `viewport` export in `app/layout.tsx`. Real gap for a page meant to be shared, but never specified in any planning doc.
- **defer** — Blind Hunter: no `robots.ts`/`sitemap.ts`/`not-found.tsx`/`error.tsx`. Standard scaffolding, never specified.
- **defer** — Blind Hunter: no CI workflow running `lint`/`test` on push. Never specified.
- **defer** — Blind Hunter: no `README.md`. Never specified.
- **defer** — Blind Hunter: `contactFormMessages.technicalError` ships a placeholder fallback contact (`contact@mistersteponsax.fr`) that isn't Stephane's real address. Not a code defect — already centralized in `lib/content.ts` for a one-line edit once Stephane supplies the real fallback contact; flagged directly to him.
- **reject** — Edge Case Hunter: `prestationTypes` edited down to zero entries would break `z.enum` at runtime. Self-inflicted content-file edit, would be immediately obvious (empty dropdown) in any manual check; negligible real-world exposure for a defensive check that isn't a direct correction.
- **reject** — Blind Hunter: no `aria-required` on form fields (`noValidate` strips native `required` semantics). `EXPERIENCE.md`'s Accessibility Floor specifies `aria-invalid`/`aria-describedby` as the accessible error signal (already implemented) and `noValidate` is deliberate — letting the specified custom blur/submit validation own the UX instead of native browser popups. Not a defect against the actual spec.
- **reject** — Blind Hunter: no dedicated `lib/validation.ts` unit tests beyond what the I/O matrix requires. The spec's I/O & Edge-Case Matrix defines exactly 5 rows, now all covered; further per-field validation unit tests ask for more thoroughness than was contracted.

All `patch` entries applied directly (re-verified: `npm run build` ✓, `npm run lint` ✓, `npm run test` → 8/8 ✓). All `defer` entries logged to `deferred-work.md`.

## Verification

**Commands:**
- `npm run build` -- expected: succeeds with zero type errors
- `npm run lint` -- expected: zero errors

**Manual checks (if no CLI):**
- Run `npm run dev`, open in browser: verify the full page against `mockups/key-landing-desktop.html` (colors, both eyebrow-color rule, Direction B badge), submit the form with an intentionally invalid date and confirm the inline error, then a valid submission and confirm the on-screen success state.
