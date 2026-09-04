---
name: Mister Steph On Sax
status: final
updated: 2026-09-04
---

# Mister Steph On Sax — Experience Spine

> Landing one-page, mobile-first. Cible : toute personne qui cherche un saxophoniste pour un événement (mariages — vin d'honneur, cocktail, cérémonie, soirée — et événementiel privé/entreprise), pas seulement les futures mariées. Paire avec `DESIGN.md`.

## Foundation

Web, une seule surface (page unique à défilement vertical), responsive mobile-first. Pas de framework UI nommé — composants custom construits sur les tokens `DESIGN.md`. Pas de compte, pas d'authentification : l'unique action engageante est l'envoi du formulaire de contact/devis.

## Information Architecture

| Section | Atteinte depuis | Rôle |
|---|---|---|
| Hero | Arrivée sur la page (recherche, lien partagé, réseaux) | Identifier l'offre en un coup d'œil, donner le ton, pousser vers le devis |
| Écoute (teaser) | Scroll depuis Hero | Installer l'ambiance "chill" ; pas encore de démos réelles |
| Présentation & Formules | Scroll depuis Écoute | Détailler les prestations (vin d'honneur, cocktail) pour qualifier l'intérêt |
| Contact / Devis | Scroll depuis Formules, ou clic CTA Hero (ancre directe) | Convertir : capter la demande |

Page unique, ordre fixe, pas de navigation par menu — le CTA du Hero ("Réserver une date") est un lien-ancre direct vers Contact/Devis, il ne saute pas les sections intermédiaires en les cachant, il fait défiler jusqu'à elles.

→ Référence de composition : `mockups/key-landing-desktop.html`. Le spine gagne en cas de conflit.

## Voice and Tone

L'identité de marque (registre chic/chill) vit dans `DESIGN.md.Brand & Style`. Ici, les règles de microcopy.

| Do | Don't |
|---|---|
| "Réserver une date" | "Book now !" / anglicismes marketing |
| "Extraits disponibles sur demande — nouvelles démos bientôt en ligne" | Faire croire qu'un lecteur audio fonctionnel existe déjà |
| Vouvoiement, phrases courtes et complètes | Tutoiement, points d'exclamation en série, emojis |
| "Votre demande a bien été envoyée. Réponse sous 48h." | "Merci !!! 🎷✨" |
| Nommer l'action exacte du bouton ("Envoyer ma demande") | Libellés vagues ("Cliquez ici", "Suivant") |

`[ASSUMPTION]` Vouvoiement retenu par cohérence avec le registre "élégant" du brief — à confirmer si Stephane préfère un tutoiement de proximité.

## Component Patterns

Comportemental. Specs visuelles dans `DESIGN.md.Components`.

| Component | Usage | Règles comportementales |
|---|---|---|
| CTA Hero | Hero | Scroll fluide (`scroll-behavior: smooth`) vers `#contact`, pas de saut brutal. Toujours visible sans interaction (pas de scroll-hijack). |
| Insigne / badge | Hero (unique occurrence) | Statique, pas de lien cliquable propre — le clic sur "Mister Steph On Sax" (nom) n'a pas de destination puisque la page est unique. Purement décoratif (fait doublon avec le H1 adjacent) : `alt=""` / `aria-hidden="true"`. |
| Bloc Écoute (teaser) | Section Écoute | Aucune interaction sonore en v1 (pas de lecteur). Simple bloc statique, visuel d'onde sonore purement décoratif : `alt=""` / `aria-hidden="true"`. Devient un vrai lecteur (Component Pattern à écrire) dès que du contenu audio/vidéo existe — traité en Update de cette spine à ce moment-là, pas anticipé ici. |
| Carte Formule | Présentation & Formules | Pas de clic/expansion — contenu entièrement visible sans interaction (pas d'accordéon). Une carte par formule (vin d'honneur, cocktail). |
| Champ de formulaire | Contact/Devis | Validation au blur (pas seulement au submit) pour Nom/Prénom/Date/Lieu, affichée en place via `aria-describedby` + `aria-invalid` sur le champ — **sans déplacer le focus** (le focus reste où l'utilisateur est). Le déplacement de focus vers le premier champ en erreur est un comportement **de soumission uniquement** (voir État "erreur de validation"). Type de prestation = `<select>` natif, stylé en CSS uniquement (pas de reconstruction en combobox custom, qui exigerait son propre pattern ARIA) — options : *Vin d'honneur / Cocktail / Cérémonie / Soirée complète / Événement d'entreprise / Autre*. |
| Bouton d'envoi | Contact/Devis | Pendant l'envoi : `aria-disabled="true"` + `aria-busy="true"` — **pas** l'attribut natif `disabled`, qui sortirait le bouton du focus/tab order et déplacerait le focus vers `<body>` en pleine soumission. Le bouton reste focusable ; le script bloque juste la ré-activation. Un seul clic possible à la fois — pas de double-soumission. |

## State Patterns

| État | Surface | Traitement |
|---|---|---|
| Chargement initial | Page entière | Pas de splash/loader — contenu statique, doit s'afficher immédiatement (pas de dépendance à un appel réseau pour le rendu du Hero). |
| Teaser Écoute | Section Écoute | État unique et permanent tant qu'aucun contenu audio n'existe : "Extraits disponibles sur demande — nouvelles démos bientôt en ligne". Pas d'état "vide" à gérer, c'est l'état par défaut assumé. |
| Formulaire — repos | Contact/Devis | Champs vides, labels visibles, bouton actif. |
| Formulaire — erreur de validation (blur) | Contact/Devis | Message précis sous le champ concerné ("Merci d'indiquer une date d'événement") via `aria-describedby`/`aria-invalid`, **sans déplacer le focus** — l'utilisateur reste où il est. |
| Formulaire — erreur de validation (submit) | Contact/Devis | Mêmes messages par champ, **et** focus déplacé au premier champ en erreur (seul ce cas déplace le focus). Jamais de message générique global seul. |
| Formulaire — envoi en cours | Contact/Devis | Bouton en état "Envoi…", `aria-disabled` + `aria-busy` (pas `disabled` natif — voir Component Patterns), pas de changement de layout (évite le saut visuel). |
| Formulaire — succès | Contact/Devis | Le formulaire est remplacé par un message de confirmation ("Votre demande a bien été envoyée. Réponse sous 48h.") — pas de reset silencieux du formulaire qui laisserait croire à un échec. Le message est un `role="status"` (région live polie) ou reçoit le focus au moment de son apparition, pour que les utilisateurs de lecteur d'écran l'apprennent sans avoir à re-scanner la page. |
| Formulaire — échec technique (email non envoyé) | Contact/Devis | Message explicite avec solution de repli ("Une erreur est survenue — réessayez, ou contactez-nous directement à [email/téléphone]"), formulaire non vidé pour ne pas faire retaper l'utilisateur. Le message est un `role="alert"` (région live assertive) — l'échec doit interrompre plus fermement que le succès. |

## Interaction Primitives

- Défilement vertical unique, aucune pagination ni carrousel.
- CTA Hero = ancre de scroll, jamais un `<a>` externe ni une modale de réservation.
- Aucune lecture audio/vidéo automatique nulle part (pas d'autoplay, cohérent avec l'absence de contenu réel de toute façon).
- **Banni** : popups d'inscription/newsletter, chat widget intrusif, animations d'entrée agressives au chargement (`prefers-reduced-motion` respecté partout).

## Accessibility Floor

Comportemental. Contraste visuel dans `DESIGN.md`.

- Cibles tactiles ≥ 44px sur mobile pour le CTA et les champs de formulaire.
- Chaque champ de formulaire a un `<label>` associé (pas de placeholder-only). Erreurs annoncées via `aria-describedby` + `aria-invalid` (voir Component Patterns / State Patterns pour la distinction blur/submit).
- État focus visible : anneau `{components.form-field.focusRing}` (`{colors.navy}`) sur fond clair, `{colors.on-navy}` sur fond navy — jamais supprimé par un `outline: none` sans remplacement, jamais `{colors.gold}` comme couleur d'anneau sur fond clair (échoue le contraste, voir `DESIGN.md`).
- Limites de champs/cartes perceptibles avec `{colors.border-strong}`, pas `{colors.border}` (trop peu contrasté pour servir seul de repère visuel, voir `DESIGN.md § Colors`).
- Ordre de tabulation = ordre de lecture (Hero → Écoute → Formules → Formulaire).
- `<html lang="fr">` — tout le contenu est en français, requis pour une prononciation correcte en lecteur d'écran.
- Le CTA du Hero ("Réserver une date", ancre vers `#contact`) sert de mécanisme "aller directement au formulaire" pour les utilisateurs clavier sur cette page à défilement long — pas de skip-link séparé nécessaire.
- `prefers-reduced-motion: reduce` : le scroll fluide de l'ancre CTA devient un saut instantané.

## Responsive & Platform

Mobile-first confirmé (majorité des recherches de prestataire événementiel se font sur téléphone). Breakpoint desktop indicatif ~768px.

- **Hero** : titre et sous-titre resserrent leur taille (`{typography.h1}` clamp déjà responsive dans `DESIGN.md`), CTA pleine largeur sur mobile, largeur intrinsèque sur desktop. Démontré en mobile/desktop dans `.working/direction-hero-A-B-C.html` (Direction B retenue).
- **Formules** : 1 colonne mobile → 2 colonnes desktop (`DESIGN.md.Layout & Spacing`).
- **Formulaire** : champs empilés pleine largeur sur mobile ; sur desktop, Nom/Prénom peuvent partager une ligne (2 colonnes), Date/Type/Lieu restent chacun pleine largeur du formulaire.

## Key Flows

### Flow 1 — Camille organise le vin d'honneur de son mariage (un soir, sur son téléphone)

1. Camille arrive sur la page depuis une recherche Google, en soirée, sur son téléphone.
2. Le Hero s'affiche immédiatement (pas de loader) : nom, sous-titre, insigne, CTA "Réserver une date".
3. Elle scrolle — le bloc Écoute lui indique que des extraits sont disponibles sur demande (pas de lecteur à cet instant, elle ne s'y attarde pas).
4. Elle lit les deux cartes Formules (Vin d'honneur, Cocktail) et reconnaît sa prestation.
5. Elle tape sur le CTA du Hero, ou continue simplement son scroll jusqu'au formulaire.
6. Elle remplit Nom, Prénom, Date, sélectionne "Vin d'honneur" dans le menu déroulant, indique le lieu (secteur).
7. Elle appuie sur le bouton d'envoi — bref état "Envoi…".
8. **Climax :** le formulaire se transforme en message "Votre demande a bien été envoyée. Réponse sous 48h." — elle repose son téléphone rassurée, sans avoir eu besoin de rappeler ou d'envoyer un mail séparé.

Échec : si l'envoi échoue (email non transmis), elle voit le message d'erreur avec une solution de repli et ses champs restent remplis — elle n'a pas à tout retaper.

### Flow 2 — Julien organise une soirée d'entreprise, sur desktop pendant sa pause déjeuner

1. Julien arrive via un lien partagé par un collègue, sur son ordinateur de bureau.
2. Il lit le Hero, moins investi émotionnellement que Camille — il cherche vite une confirmation de sérieux (nom clair, insigne net, pas de tape-à-l'œil).
3. Il saute directement les cartes Formules (aucune ne correspond exactement à "entreprise") pour aller au formulaire.
4. Dans le menu déroulant Type de prestation, il choisit "Événement d'entreprise" — l'option existe, il n'a pas besoin d'écrire un cas particulier en texte libre.
5. Il remplit le reste et envoie.
6. **Climax :** confirmation immédiate à l'écran — il ferme l'onglet sans avoir eu besoin d'envoyer un email de relance pour être sûr que sa demande est bien partie.

Cas limite : si "Autre" est sélectionné, le formulaire reste simple (pas de champ texte libre supplémentaire demandé dans le brief) — ouvert pour une itération si des demandes hors-catégorie s'avèrent fréquentes.
