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
  heading: 'Une date à réserver ? Parlons‑en.',
}

// ---------------------------------------------------------------------------
// Legal / GDPR — shared contact address (spec-legal-footer-rgpd.md).
// Single source of truth: used by the footer's implicit contact path, the
// contact form's technical-error fallback, and both legal pages, so the
// address is never re-typed (and never drifts) between them.
// ---------------------------------------------------------------------------

export const legalContactEmail = 'contact@misterstephonsax.fr'

// Stephane's legal identity — shared by the mentions légales "éditeur"
// section and the privacy policy's "responsable du traitement" section,
// which describe the same entity.
export const editeurNomStatut = 'Guery Stéphane — Auto-entrepreneur'
export const editeurAdresse = '180 route de Cobrieux, 59242 Genech'
export const editeurSiret = '982 059 156 00017'
export const editeurTelephone = '07 60 73 57 33'
export const directeurPublicationNom = 'Stéphane Guery'

export const footerContent: {
  brand: string
  rightsReserved: string
  links: { href: string; label: string }[]
} = {
  brand: 'Mister Steph On Sax',
  rightsReserved: 'Tous droits réservés.',
  links: [
    { href: '/mentions-legales', label: 'Mentions légales' },
    {
      href: '/politique-de-confidentialite',
      label: 'Politique de confidentialité',
    },
  ],
}

export const legalNoticeContent = {
  heading: 'Mentions légales',
  editeur: {
    heading: 'Éditeur du site',
    nomStatut: editeurNomStatut,
    adresse: editeurAdresse,
    siret: editeurSiret,
    telephone: editeurTelephone,
    contact: legalContactEmail,
  },
  directeurPublication: {
    heading: 'Directeur de la publication',
    nom: directeurPublicationNom,
  },
  hebergeur: {
    heading: 'Hébergeur',
    nom: 'Vercel Inc.',
    adresse: '340 S Lemon Ave #4133, Walnut, CA 91789, USA',
    lienLegalHref: 'https://vercel.com/legal',
    lienLegalLabel: 'vercel.com/legal',
    note: 'pour la version actuelle et faisant foi des informations légales de l’hébergeur.',
  },
  contact: {
    heading: 'Contact',
    body: 'Pour toute question relative aux présentes mentions légales, écrivez à',
    email: legalContactEmail,
  },
}

export const privacyPolicyContent = {
  heading: 'Politique de confidentialité',
  intro:
    'Cette page décrit comment vos données personnelles sont traitées lorsque vous utilisez le formulaire de contact de ce site.',
  responsableTraitement: {
    heading: 'Responsable du traitement',
    body: editeurNomStatut,
    contact: legalContactEmail,
  },
  donneesCollectees: {
    heading: 'Données collectées',
    body: 'Via le formulaire de contact : nom, prénom, adresse email, date de l’événement souhaité, type de prestation et lieu de l’événement.',
  },
  finalite: {
    heading: 'Finalité',
    body: 'Ces données sont utilisées exclusivement pour traiter votre demande de devis ou de réservation et vous répondre.',
  },
  baseLegale: {
    heading: 'Base légale',
    body: 'Le traitement repose sur les démarches précontractuelles engagées à votre initiative (article 6.1.b du RGPD) : vous nous contactez directement pour obtenir un devis, il ne s’agit pas de prospection commerciale.',
  },
  sousTraitant: {
    heading: 'Sous-traitant',
    body: 'L’envoi des emails de notification et de confirmation liés à votre demande est assuré par Resend, qui agit en tant que sous-traitant. Resend est une société américaine : ce transfert de données hors de l’Union européenne est encadré par les clauses contractuelles types (SCC) prévues dans son accord de traitement des données (resend.com/legal/dpa).',
  },
  dureeConservation: {
    heading: 'Durée de conservation',
    body: 'Vos données sont conservées 3 ans à compter de notre dernier contact (durée recommandée par la CNIL pour les prospects commerciaux non convertis), puis supprimées. Si votre demande donne lieu à une prestation réservée, les données nécessaires à sa réalisation et à nos obligations comptables sont conservées le temps prévu par ces obligations légales, distinct de cette durée.',
  },
  droitsRgpd: {
    heading: 'Vos droits',
    body: 'Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité sur vos données. Pour l’exercer, écrivez à',
    email: legalContactEmail,
    reclamation:
      'Si vous estimez que vos droits ne sont pas respectés, vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).',
  },
  cookies: {
    heading: 'Cookies et traceurs',
    body: 'Ce site n’utilise aucun cookie ni outil d’analyse ou de suivi. Aucune bannière de consentement n’est donc affichée.',
  },
}

export const gdprNotice: { text: string; linkLabel: string; href: string } = {
  text: 'Les informations transmises via ce formulaire sont utilisées uniquement pour traiter votre demande. En savoir plus dans notre',
  linkLabel: 'politique de confidentialité',
  href: '/politique-de-confidentialite',
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
  technicalError:
    `Une erreur est survenue — réessayez, ou contactez-nous directement à ${legalContactEmail}.`,
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
