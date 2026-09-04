import { formules, formulesSection } from '@/lib/content'

// AD-1 — Server Component, static. No expand/collapse interaction
// (EXPERIENCE.md § Component Patterns — content is fully visible up front).
export function Formules() {
  return (
    <section className="bg-surface px-gutter-mobile py-section-y md:px-gutter-desktop">
      <p className="mb-3 font-sans text-eyebrow uppercase text-ink">
        {formulesSection.eyebrow}
      </p>
      <h2 className="mb-8 max-w-[24ch] font-display text-h2">
        {formulesSection.heading}
      </h2>
      <div className="grid gap-card-gap md:grid-cols-2">
        {formules.map((formule) => (
          <article
            key={formule.titre}
            className="rounded-md border border-border-strong bg-surface-card p-6"
          >
            <h3 className="mb-2 font-display text-h3 text-ink">
              {formule.titre}
            </h3>
            <p className="font-sans text-body-sm text-ink-soft">
              {formule.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
