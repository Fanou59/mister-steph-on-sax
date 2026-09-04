/**
 * Centralized editorial content (AD-5).
 * Every string a non-developer might reasonably want to edit one day
 * (offers, form labels, email copy, teaser text) lives here — imported
 * by both the page components and the email templates that need it.
 * Draft-quality copy is acceptable where noted; easy to edit later
 * since it's all centralized in this one file.
 */

// ---------------------------------------------------------------------------
// AD-5 minimal exported shapes (stable names — do not redefine elsewhere)
// ---------------------------------------------------------------------------

export const prestationTypes: { value: string; label: string }[] = [
  { value: 'vin-honneur', label: "Vin d'honneur" },
  { value: 'cocktail', label: 'Cocktail' },
  { value: 'ceremonie', label: 'Cérémonie' },
  { value: 'soiree-complete', label: 'Soirée complète' },
  { value: 'entreprise', label: "Événement d'entreprise" },
  { value: 'autre', label: 'Autre' },
]

export const formules: { titre: string; description: string }[] = [
  {
    titre: "Vin d'Honneur",
    description:
      "Une présence discrète et chaleureuse pendant l'accueil des invités — un répertoire choisi pour installer l'ambiance sans jamais la couvrir.",
  },
  {
    titre: 'Cocktail',
    description:
      "Une prestation plus rythmée pour accompagner le cocktail dînatoire, du standard jazz à la reprise contemporaine.",
  },
]

export const listenTeaser: { title: string; body: string } = {
  title: "Un avant-goût de l'ambiance",
  body: 'Extraits disponibles sur demande — nouvelles démos bientôt en ligne.',
}

export const contactFormLabels: {
  nom: string
  prenom: string
  email: string
  date: string
  typePrestation: string
  lieu: string
  submit: string
} = {
  nom: 'Nom',
  prenom: 'Prénom',
  email: 'Email',
  date: "Date de l'événement",
  typePrestation: 'Type de prestation',
  lieu: 'Lieu (région, secteur ou lieu du mariage)',
  submit: 'Envoyer ma demande',
}

// ---------------------------------------------------------------------------
// Section copy — eyebrow labels & headings (EXPERIENCE.md § Information
// Architecture / Voice and Tone, DESIGN.md § Components)
// ---------------------------------------------------------------------------

export const heroContent = {
  eyebrow: "Vin d'honneur · Mariage · Événementiel",
  title: 'Mister Steph On Sax',
  subtitle: "Saxophoniste événementiel & vins d'honneur",
  ctaLabel: 'Réserver une date',
}

export const listenSection = {
  eyebrow: 'Ambiance',
}

export const formulesSection = {
  eyebrow: 'Présentation & Formules',
  heading: 'Deux formules pour accompagner votre réception',
}

export const contactSection = {
  eyebrow: 'Contact & Devis',
  heading: 'Une date à réserver ? Parlons-en.',
}

// ---------------------------------------------------------------------------
// Contact form — state copy (EXPERIENCE.md § State Patterns)
// ---------------------------------------------------------------------------

export const contactFormMessages = {
  submitPending: 'Envoi…',
  success: {
    heading: 'Demande envoyée',
    body: 'Votre demande a bien été envoyée. Réponse sous 48h.',
  },
  // Draft placeholder — replace with Stephane's real fallback contact once confirmed.
  technicalError:
    'Une erreur est survenue — réessayez, ou contactez-nous directement à contact@mistersteponsax.fr.',
  validation: {
    nom: 'Merci d’indiquer votre nom.',
    prenom: 'Merci d’indiquer votre prénom.',
    email: 'Merci d’indiquer une adresse email valide.',
    date: 'Merci d’indiquer une date d’événement valide.',
    typePrestation: 'Merci de sélectionner un type de prestation.',
    lieu: 'Merci d’indiquer un lieu.',
  },
}

// ---------------------------------------------------------------------------
// Email templates (emails/*.tsx) — AD-4 / AD-5
// ---------------------------------------------------------------------------

export const notificationEmailContent = {
  subject: (nom: string, prenom: string) =>
    `Nouvelle demande de devis — ${prenom} ${nom}`,
  heading: 'Nouvelle demande de devis',
  intro: 'Une nouvelle demande vient d’arriver depuis le site.',
  fieldLabels: {
    nom: 'Nom',
    prenom: 'Prénom',
    email: 'Email',
    date: "Date de l'événement",
    typePrestation: 'Type de prestation',
    lieu: 'Lieu',
  },
}

export const confirmationEmailContent = {
  subject: 'Votre demande a bien été reçue — Mister Steph On Sax',
  heading: 'Merci pour votre demande',
  body: 'Votre demande a bien été reçue. Réponse sous 48h.',
  signature: 'Mister Steph On Sax',
}
