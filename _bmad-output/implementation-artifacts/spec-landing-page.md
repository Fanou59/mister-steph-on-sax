---
title: 'Mister Steph On Sax — landing page'
type: 'feature'
created: '2026-09-04'
status: 'in-progress'
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

## Verification

**Commands:**
- `npm run build` -- expected: succeeds with zero type errors
- `npm run lint` -- expected: zero errors

**Manual checks (if no CLI):**
- Run `npm run dev`, open in browser: verify the full page against `mockups/key-landing-desktop.html` (colors, both eyebrow-color rule, Direction B badge), submit the form with an intentionally invalid date and confirm the inline error, then a valid submission and confirm the on-screen success state.
