---
title: 'Legal footer, mentions légales, privacy policy & GDPR notice'
type: 'feature'
created: '2026-09-04'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: 'edfdf7eaa6f1f2be62be17987be74e22da99893e'
context:
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-Mister_Steph_On_Sax-2026-09-04/DESIGN.md'
  - '{project-root}/_bmad-output/planning-artifacts/architecture/architecture-Mister_Steph_On_Sax-2026-09-04/ARCHITECTURE-SPINE.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The site has no footer, no mentions légales, and no privacy policy — required for a public French business site, and the contact form collects personal data (nom, prénom, email, date, lieu) with no GDPR-compliant notice, no stated legal basis, no stated retention period, and no acknowledgement that the data transits through Resend (a sub-processor).

**Approach:** Add a static Footer (Server Component) linking two new static pages (`/mentions-legales`, `/politique-de-confidentialite`), both styled with existing DESIGN.md tokens. Add a short passive GDPR notice line near the contact form's submit button linking to the privacy policy — no opt-in checkbox (the request is a direct pre-contractual contact, not marketing; legitimate-interest/pre-contractual-necessity basis applies, matching how most quote-request forms are actually built). Content lives in `lib/content.ts` per AD-5.

**Always:** Follow ARCHITECTURE-SPINE.md's paradigm (Footer is a Server Component, no new Client island). Name Resend explicitly as a data sub-processor in the privacy policy (data does transit its servers to send the notification/confirmation emails, per `lib/resend.ts`). Vercel's hosting details in mentions légales cite its publicly published registered address (Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA) with a pointer to vercel.com/legal for the authoritative current version — do not invent a different host or address.

**Never:** No cookie-consent banner (no analytics/tracking exists yet — Deferred in ARCHITECTURE-SPINE.md; add one only if that changes). No opt-in checkbox on the contact form unless Stephane asks for one. No invented business identity, SIRET, or address for Stephane — the fields below that he hasn't supplied yet render as a visible `[À COMPLÉTER : ...]` marker, never a guessed value.

**Decided by Stephane:**
- Éditeur du site: name, legal status, postal address, and SIRET are **not yet supplied** — each renders as its own `[À COMPLÉTER : <what's missing>]` marker on the mentions légales page (e.g. `[À COMPLÉTER : nom et statut de l'éditeur]`), not a single blanket placeholder, so each missing fact is independently visible and fillable later.
- Contact for legal/GDPR requests (both pages) and the contact-form's technical-error fallback (superseding the earlier placeholder `contact@mistersteponsax.fr`): **`contact@misterstephonsax.fr`**.
- Data retention: **3 ans** à compter du dernier contact (durée CNIL pour les prospects commerciaux non convertis).
- Footer copyright line required, current year (2026) — computed via `new Date().getFullYear()` so it never needs a manual bump, rather than a hardcoded string.

</frozen-after-approval>

## Code Map

- `components/hero.tsx`, `components/listen-teaser.tsx`, `components/formules.tsx`, `components/contact-form/contact-form.tsx` — existing Server/Client component pattern to mirror for the new `Footer`.
- `lib/content.ts` — existing AD-5 content module; new legal/footer strings join it, keyed similarly to existing exports (`heroContent`, `contactSection`, etc.).
- `app/page.tsx` — currently assembles Hero → Écoute → Formules → ContactForm; `Footer` is appended after `ContactForm`, outside the fixed 4-section order EXPERIENCE.md governs (footer is site-chrome, not one of the 4 sections).
- `app/globals.css` — DESIGN.md tokens (colors, typography, spacing) to reuse for the new pages; no new tokens needed, these are prose pages on `surface`/`ink`.
- `lib/resend.ts` — confirms exactly what data reaches Resend and why, for the privacy policy's sub-processor disclosure to be accurate.

## Tasks & Acceptance

**Execution:**
- [ ] `lib/content.ts` -- add `footerContent`, `legalNoticeContent`, `privacyPolicyContent`, and a short `gdprNotice` string for the contact form -- AD-5, filled from Stephane's decided values above
- [ ] `lib/content.ts` -- replace `contactFormMessages.technicalError`'s placeholder `contact@mistersteponsax.fr` with the real `contact@misterstephonsax.fr` now that Stephane has confirmed it
- [ ] `components/footer.tsx` -- Server Component; copyright line + links to the two new pages, styled with existing tokens (`bg-navy`/`text-on-navy` or `bg-surface`, matching the page's closing tone)
- [ ] `app/mentions-legales/page.tsx` -- static page: éditeur, hébergeur (Vercel, with citation), directeur de publication
- [ ] `app/politique-de-confidentialite/page.tsx` -- static page: responsable du traitement, données collectées, finalité, base légale, sous-traitant (Resend, named), durée de conservation, droits RGPD + contact, absence de cookies/tracking
- [ ] `components/contact-form/contact-form.tsx` -- add one short line near the submit button: what the data is used for + a link to `/politique-de-confidentialite` (no new Client state — plain text/link)
- [ ] `app/page.tsx` -- render `<Footer />` after `<ContactForm />`

**Acceptance Criteria:**
- Given any page load, when scrolled to the bottom, then a footer with working links to both legal pages is visible.
- Given the contact form, when viewed, then a GDPR notice with a working link to the privacy policy is visible near the submit button, without adding a new Client island.
- Given the privacy policy, when read, then Resend is named as the sub-processor handling email delivery.
- Given the mentions légales, when read, then no field shows an invented value — every fact traces to Stephane's answer or to Vercel's cited public registration.

## Implementation Notes

- Original implementation placed `<Footer />` in `app/page.tsx` only — the Reviewer Gate caught that this left the footer (and its only links to the two legal pages) missing from the legal pages themselves, contradicting this spec's own acceptance criteria. Moved `<Footer />` to `app/layout.tsx` so it renders on every route.
- Added `export const revalidate = 86400` to `app/layout.tsx` so the footer's `new Date().getFullYear()` — otherwise baked permanently into the static HTML at build time — can't drift more than a day stale across a year rollover without a redeploy.
- Privacy policy hardened per review: added droit à la portabilité and droit de réclamation auprès de la CNIL to `droitsRgpd`; named Resend explicitly as a US company and cited its SCC-based DPA (`resend.com/legal/dpa`, verified via web search) for the international-transfer safeguard; added a qualifying sentence distinguishing the 3-year prospect-contact retention from separate statutory retention that would apply if a booking is confirmed.
- Added an `editeurTelephonePlaceholder` (`[À COMPLÉTER : numéro de téléphone]`) — a French commercial site's mentions légales conventionally includes a phone number, which had no field at all.
- Renamed the "Hébergement" heading to "Hébergeur" (standard mentions-légales terminology for this exact section).
- Added `aria-hidden="true"` to the decorative "←" arrow on both legal pages' back-to-home links.
- Removed the now-resolved "replace placeholder fallback contact" entry from `deferred-work.md` (this spec's Stephane-supplied `legalContactEmail` resolves it) and logged two new deferred items: adding rendering-test coverage for the Footer/legal pages/GDPR notice (needs new jsdom/testing-library infra, out of scope here) and deciding on the separate French consumer-mediation (médiateur de la consommation) / CGV obligation, which needs Stephane's decision, not a code fix.

## Review Triage Log

Three parallel review layers ran against the implementation diff (Blind Hunter, Edge Case Hunter, Verification Gap). Findings verified and routed below.

- **high** — Edge Case Hunter (confidence: high): the acceptance criterion "any page load, footer with working links visible" failed for the two new legal pages themselves — `Footer` was only rendered from `app/page.tsx`, never from the legal pages. *Fixed:* moved `<Footer />` into `app/layout.tsx`; verified in a real browser that all three routes now show it.
- **medium** — Edge Case Hunter (confidence: medium): the footer's `new Date().getFullYear()` is baked into the static HTML at build time; nothing revalidates it, so the spec's implicit "shows the current year without manual upkeep" claim would silently go stale a year from now with no redeploy. *Fixed:* `export const revalidate = 86400` on the root layout.
- **medium** — Blind Hunter: `droitsRgpd` listed access/rectification/erasure/limitation/opposition but omitted the droit à la portabilité (GDPR Art. 20) and the droit de réclamation auprès de la CNIL — the one right that doesn't route through the site owner's own contact address, routinely required in French privacy notices. *Fixed:* both added.
- **medium** — Blind Hunter: `sousTraitant` named Resend as sub-processor without disclosing it's a US company, meaning an international transfer under GDPR Chapter V with no stated safeguard. *Fixed:* verified via web search that Resend's DPA includes EU Standard Contractual Clauses (`resend.com/legal/dpa`); added that disclosure.
- **low** — Blind Hunter: no field/placeholder at all for a phone number in the mentions légales éditeur section, conventionally included on a French commercial site. *Fixed:* added `editeurTelephonePlaceholder`.
- **low** — Blind Hunter: "Hébergement" heading drifts from the standard mentions-légales term "Hébergeur" for this section. *Fixed:* renamed.
- **low** — Blind Hunter: the decorative "←" on both legal pages' back-links has no `aria-hidden`, so a screen reader may announce a stray "leftwards arrow". *Fixed:* added `aria-hidden="true"`.
- **low** — Blind Hunter: `deferred-work.md` still listed the fallback-contact-email item as outstanding, though this spec resolves it. *Fixed:* marked resolved in place.
- **defer** — Verification Gap + Blind Hunter, same root cause: no rendering-test covers the Footer's legal links or the contact form's GDPR notice/link — the repo's Vitest suite runs in a plain `node` environment with no jsdom/testing-library, so closing this needs new test infrastructure, not a one-line addition. Logged to `deferred-work.md`.
- **defer** — Blind Hunter: the French consumer-mediation disclosure requirement (médiateur de la consommation, Code de la consommation art. L616-1) and a CGV page are a separate, real French legal obligation for a professional selling to consumers — out of scope for "footer + mentions légales + politique de confidentialité" as requested, and needs Stephane's decision (possibly real legal counsel), not a code fix. Logged to `deferred-work.md` and flagged directly to him.
- **medium (partially addressed, not fully closed)** — Blind Hunter: the blanket 3-year retention doesn't distinguish a confirmed booking's separate accounting/invoicing retention obligations. *Addressed:* added a qualifying sentence rather than inventing specific figures for an invoicing feature that doesn't exist yet on this site.

All `patch`-routed findings applied directly (re-verified: `npm run build` ✓ — footer confirmed on all 3 routes in a real browser, `npm run lint` ✓, `npm run test` → 9/9 ✓, no regression).

## Verification

**Commands:**
- `npm run build` -- expected: succeeds with zero type errors (both new routes prerender static)
- `npm run lint` -- expected: zero errors
- `npm run test` -- expected: existing 9 tests still pass (no regression)

**Manual checks (if no CLI):**
- `npm run dev`, open in browser: confirm the footer renders on the page, both legal pages load and read correctly, and the GDPR notice link on the contact form navigates to the privacy policy.
