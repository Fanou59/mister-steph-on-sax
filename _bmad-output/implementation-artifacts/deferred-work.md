# Deferred Work

- source_spec: `_bmad-output/implementation-artifacts/spec-landing-page.md`
  summary: Reject event dates already in the past on the contact form.
  evidence: Edge Case Hunter review — no planning doc (DESIGN.md/EXPERIENCE.md/ARCHITECTURE-SPINE.md/spec) specifies date-range validation; real if wanted, but not caused by a defect against stated intent.

- source_spec: `_bmad-output/implementation-artifacts/spec-landing-page.md`
  summary: Add a timeout around `resend.emails.send()` calls in `lib/resend.ts` so a network hang doesn't leave the form's pending state stuck.
  evidence: Edge Case Hunter review — Vercel's platform function-timeout is a backstop today; a correct client-visible timeout adds non-trivial complexity beyond a direct correction.

- source_spec: `_bmad-output/implementation-artifacts/spec-landing-page.md`
  summary: Guard against a native Enter-key form submission bypassing the submit button's pending guard (double concurrent Server Action call).
  evidence: Edge Case Hunter review — real gap, but the smallest robust fix needs care to avoid reopening the focus-loss anti-pattern the UX accessibility review deliberately fixed via `aria-disabled` over native `disabled`; no AD addresses concurrent-submission guarding.

- source_spec: `_bmad-output/implementation-artifacts/spec-landing-page.md`
  summary: Add Open Graph/Twitter card meta, a favicon, and a `viewport` export to `app/layout.tsx`.
  evidence: Blind Hunter review — real gap for a page meant to be shared on social media, but never specified in any planning doc.

- source_spec: `_bmad-output/implementation-artifacts/spec-landing-page.md`
  summary: Add standard App Router scaffolding — `app/robots.ts`, `app/sitemap.ts`, `not-found.tsx`, `error.tsx`.
  evidence: Blind Hunter review — never specified in any planning doc.

- source_spec: `_bmad-output/implementation-artifacts/spec-landing-page.md`
  summary: Add a CI workflow (e.g. GitHub Actions) running `npm run lint` and `npm run test` on push/PR.
  evidence: Blind Hunter review — never specified in any planning doc.

- source_spec: `_bmad-output/implementation-artifacts/spec-landing-page.md`
  summary: Add a `README.md` documenting local setup, required env vars, and how to run dev/lint/test.
  evidence: Blind Hunter review — never specified in any planning doc.

- source_spec: `_bmad-output/implementation-artifacts/spec-legal-footer-rgpd.md`
  summary: RESOLVED (2026-09-04) — Stephane confirmed the real address; `contactFormMessages.technicalError` and all legal-page contacts now use `contact@misterstephonsax.fr` via the shared `legalContactEmail` constant. Kept here only as a record; no action needed.

- source_spec: `_bmad-output/implementation-artifacts/spec-legal-footer-rgpd.md`
  summary: Add rendering-test coverage (Footer's legal links, the two new legal pages, the contact form's GDPR notice/link) once the project has DOM-rendering test infrastructure.
  evidence: Verification Gap + Blind Hunter review — the repo's Vitest suite runs in a plain `node` environment with no jsdom/testing-library; adding that is a tooling decision beyond this diff's scope, not a one-line test.

- source_spec: `_bmad-output/implementation-artifacts/spec-legal-footer-rgpd.md`
  summary: Decide whether/how to comply with the French consumer-mediation disclosure requirement (médiateur de la consommation, Code de la consommation art. L616-1) for a professional selling to consumers (weddings/private events) — likely needs a CGV page too. Needs Stephane's decision (and possibly real legal counsel), not something to improvise from a code-review finding.
  evidence: Blind Hunter review — a real, separate French legal obligation, out of scope for "footer + mentions légales + politique de confidentialité" as requested.
