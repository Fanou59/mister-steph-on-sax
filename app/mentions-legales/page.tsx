import type { Metadata } from 'next'
import Link from 'next/link'
import { legalNoticeContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Mentions légales — Mister Steph On Sax',
  description: 'Mentions légales du site Mister Steph On Sax.',
}

// AD-1 — static Server Component, no interactivity. Prose page on
// surface/ink tokens (DESIGN.md), no new tokens introduced (AD-6).
export default function MentionsLegalesPage() {
  const { editeur, directeurPublication, hebergeur, contact } =
    legalNoticeContent

  return (
    <main className="bg-surface px-gutter-mobile py-section-y md:px-gutter-desktop">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 font-display text-h1 text-ink">
          {legalNoticeContent.heading}
        </h1>

        <section className="mb-8">
          <h2 className="mb-2 font-display text-h3 text-ink">
            {editeur.heading}
          </h2>
          <p className="font-sans text-body text-ink-soft">
            <span className="font-semibold text-ink">{editeur.nomStatut}</span>
            <br />
            <span className="font-semibold text-ink">{editeur.adresse}</span>
            <br />
            SIRET : <span className="font-semibold text-ink">{editeur.siret}</span>
            <br />
            Téléphone :{' '}
            <span className="font-semibold text-ink">{editeur.telephone}</span>
            <br />
            Contact : {editeur.contact}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 font-display text-h3 text-ink">
            {directeurPublication.heading}
          </h2>
          <p className="font-sans text-body text-ink-soft">
            <span className="font-semibold text-ink">
              {directeurPublication.nom}
            </span>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 font-display text-h3 text-ink">
            {hebergeur.heading}
          </h2>
          <p className="font-sans text-body text-ink-soft">
            {hebergeur.nom}
            <br />
            {hebergeur.adresse}
            <br />
            Voir{' '}
            <a
              href={hebergeur.lienLegalHref}
              className="text-ink underline underline-offset-2"
            >
              {hebergeur.lienLegalLabel}
            </a>{' '}
            {hebergeur.note}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 font-display text-h3 text-ink">
            {contact.heading}
          </h2>
          <p className="font-sans text-body text-ink-soft">
            {contact.body} {contact.email}.
          </p>
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
