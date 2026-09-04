import type { Metadata } from 'next'
import Link from 'next/link'
import { privacyPolicyContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Mister Steph On Sax',
  description:
    'Comment vos données personnelles sont traitées sur le site Mister Steph On Sax.',
}

// AD-1 — static Server Component, no interactivity. Prose page on
// surface/ink tokens (DESIGN.md), no new tokens introduced (AD-6).
export default function PolitiqueDeConfidentialitePage() {
  const {
    responsableTraitement,
    donneesCollectees,
    finalite,
    baseLegale,
    sousTraitant,
    dureeConservation,
    droitsRgpd,
    cookies,
  } = privacyPolicyContent

  return (
    <main className="bg-surface px-gutter-mobile py-section-y md:px-gutter-desktop">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 font-display text-h1 text-ink">
          {privacyPolicyContent.heading}
        </h1>
        <p className="mb-8 font-sans text-body text-ink-soft">
          {privacyPolicyContent.intro}
        </p>

        <section className="mb-8">
          <h2 className="mb-2 font-display text-h3 text-ink">
            {responsableTraitement.heading}
          </h2>
          <p className="font-sans text-body text-ink-soft">
            <span className="font-semibold text-ink">
              {responsableTraitement.body}
            </span>{' '}
            — contact : {responsableTraitement.contact}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 font-display text-h3 text-ink">
            {donneesCollectees.heading}
          </h2>
          <p className="font-sans text-body text-ink-soft">
            {donneesCollectees.body}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 font-display text-h3 text-ink">
            {finalite.heading}
          </h2>
          <p className="font-sans text-body text-ink-soft">{finalite.body}</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 font-display text-h3 text-ink">
            {baseLegale.heading}
          </h2>
          <p className="font-sans text-body text-ink-soft">{baseLegale.body}</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 font-display text-h3 text-ink">
            {sousTraitant.heading}
          </h2>
          <p className="font-sans text-body text-ink-soft">
            {sousTraitant.body}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 font-display text-h3 text-ink">
            {dureeConservation.heading}
          </h2>
          <p className="font-sans text-body text-ink-soft">
            {dureeConservation.body}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 font-display text-h3 text-ink">
            {droitsRgpd.heading}
          </h2>
          <p className="font-sans text-body text-ink-soft">
            {droitsRgpd.body} {droitsRgpd.email}.
          </p>
          <p className="mt-2 font-sans text-body text-ink-soft">
            {droitsRgpd.reclamation}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 font-display text-h3 text-ink">
            {cookies.heading}
          </h2>
          <p className="font-sans text-body text-ink-soft">{cookies.body}</p>
        </section>

        <Link
          href="/"
          className="font-sans text-body-sm text-ink underline underline-offset-2"
        >
          <span aria-hidden="true">←</span> Retour à l’accueil
        </Link>
      </div>
    </main>
  )
}
