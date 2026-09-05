---
name: Mister Steph On Sax
description: Landing page one-page pour un saxophoniste événementiel (mariages, vins d'honneur, événementiel). Chic discret, ambiance chill, laiton doré sur bleu nuit.
status: final
updated: 2026-09-05
colors:
  surface: '#F8F6F0'
  surface-card: '#FFFFFF'
  navy: '#1C2541'
  ink: '#1C2541'
  ink-soft: '#4C5468'
  on-navy: '#F8F6F0'
  on-navy-soft: '#C7CBDA'
  gold: '#C59B27'
  on-gold: '#1C2541'
  sage: '#84A59D'
  on-sage: '#1C2541'
  border: '#E4E1D8'
  border-strong: '#8C8268'
  error: '#B3261E'
  on-error: '#FFFFFF'
typography:
  eyebrow:
    fontFamily: 'Inter, system-ui, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 600
    letterSpacing: '0.12em'
  h1:
    fontFamily: 'Playfair Display, Georgia, serif'
    fontSize: 'clamp(2rem, 5vw, 3.4rem)'
    fontWeight: 600
    lineHeight: 1.1
  h2:
    fontFamily: 'Playfair Display, Georgia, serif'
    fontSize: 'clamp(1.5rem, 3vw, 2.1rem)'
    fontWeight: 600
    lineHeight: 1.15
  h3:
    fontFamily: 'Playfair Display, Georgia, serif'
    fontSize: '1.15rem'
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: 'Inter, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: 'Inter, system-ui, sans-serif'
    fontSize: '0.9rem'
    fontWeight: 400
    lineHeight: 1.55
  button:
    fontFamily: 'Inter, system-ui, sans-serif'
    fontSize: '0.95rem'
    fontWeight: 600
    letterSpacing: '0.02em'
  label:
    fontFamily: 'Inter, system-ui, sans-serif'
    fontSize: '0.85rem'
    fontWeight: 500
rounded:
  sm: '3px'
  md: '8px'
  full: '9999px'
spacing:
  gutter-mobile: '1.25rem'
  gutter-desktop: '2.5rem'
  section-y: 'clamp(3rem, 8vw, 6rem)'
  card-gap: '1.5rem'
  form-field-gap: '1.1rem'
components:
  hero:
    background: '{colors.navy}'
    text: '{colors.on-navy}'
    subtitleText: '{colors.on-navy-soft}'
  cta-button:
    background: '{colors.gold}'
    text: '{colors.on-gold}'
    radius: '{rounded.sm}'
    font: '{typography.button}'
  badge:
    stroke: '{colors.gold}'
    background: 'transparent'
    border: '1.5px solid {colors.gold}'
    shape: 'circle'
  audio-teaser:
    background: '{colors.sage}'
    text: '{colors.on-sage}'
  formule-card:
    background: '{colors.surface-card}'
    border: '1px solid {colors.border-strong}'
    radius: '{rounded.md}'
    titleText: '{colors.ink}'
    bodyText: '{colors.ink-soft}'
  form-field:
    border: '1px solid {colors.border-strong}'
    borderError: '1px solid {colors.error}'
    radius: '{rounded.sm}'
    labelText: '{colors.ink}'
    background: '{colors.surface-card}'
    focusRing: '2px solid {colors.navy}'
  error-message:
    text: '{colors.error}'
    font: '{typography.body-sm}'
---

# Mister Steph On Sax — Design Spine

> Landing one-page pour un saxophoniste événementiel (vins d'honneur, cocktails, mariages, événementiel privé/entreprise). Chic mais chaleureux, jamais froid ni corporate ; "chill" est un registre d'ambiance, pas de laisser-aller visuel.

## Brand & Style

Élégance discrète plutôt que tape-à-l'œil : un bleu nuit profond en socle, une touche de laiton (or brossé, jamais doré criard) en accent, et un vert sauge doux pour respirer. Le sérieux d'un événement (mariage, réception professionnelle) rencontre la décontraction du live — d'où l'association Playfair Display (haut de gamme, cérémonial) / Inter (net, sans emphase). Le logo reste un insigne gravé au trait fin (`{colors.gold}` sur `{colors.navy}`), dans l'esprit d'un carton de table ou d'une plaque de laiton — utilisable en petit (favicon, réseaux sociaux, support imprimé) indépendamment de toute photo. **Mise à jour (2026-09-05) :** une photo de Stephane, validée par lui, existe maintenant et remplace l'insigne dans le Hero (Direction A, détourée en vraie transparence — voir Components ci-dessous) ; l'insigne reste disponible pour un usage futur hors-Hero (favicon, réseaux sociaux) si besoin.

## Colors

- **`{colors.surface}`** (Blanc Cassé) — fond des sections claires (Présentation & Formules, Formulaire). Jamais blanc pur : garde la chaleur du reste de la palette.
- **`{colors.navy}`** (Bleu Nuit Profond) — fond du Hero, couleur des textes sur fond clair, couleur de l'insigne (contour). Porte l'essentiel du texte de la page.
- **`{colors.on-navy}`** — texte clair sur fond navy (Hero) ; c'est `{colors.surface}` réemployé, jamais blanc pur, pour rester dans la même famille chromatique.
- **`{colors.gold}`** (Or Brossé) — réservé aux CTA et aux accents ponctuels (insigne, filets, puces). Ne devient jamais une couleur de fond de bloc pleine page — il perd sa valeur de "signal d'action" s'il est partout.
- **`{colors.sage}`** (Vert Sauge Doux) — fond du bloc Écoute/Ambiance uniquement. Couleur d'ambiance, pas d'action : aucun CTA n'est en sage.
- **`{colors.border}`** — filet décoratif très discret uniquement (ex. séparateur pleine largeur entre sections claires) ; jamais utilisé seul comme limite perceptible d'un champ ou d'une carte (≈1.2:1 sur `{colors.surface}`, sous le minimum non-texte AA de 3:1) — pour ça, voir `{colors.border-strong}`. Jamais utilisé sur fond navy (y utiliser une opacité de `{colors.on-navy}` à la place).
- **`{colors.border-strong}`** — limite perceptible des champs de formulaire et cartes Formules (≥3:1 sur `{colors.surface}` et `{colors.surface-card}`, vérifié 3.5:1 / 3.8:1). C'est la valeur à utiliser partout où un utilisateur malvoyant doit distinguer où commence/finit un composant.
- **`{colors.error}`** (rouge brique, pas un rouge pur générique — reste dans la famille chaude de la palette) — texte et bordure d'erreur de formulaire uniquement. Vérifié ≥6:1 sur `{colors.surface}` et `{colors.surface-card}`. `{colors.on-error}` sert uniquement si `error` devient un fond (ex. badge).

Contraste : `{colors.on-gold}` sur `{colors.gold}` et `{colors.on-navy}` sur `{colors.navy}` visés AA pour texte standard (vérifié au rendu des mocks) ; `{colors.on-sage}` sur `{colors.sage}` réservé aux textes courts (titres, labels), pas à de longs paragraphes. Focus visible : `{colors.navy}` sur fonds clairs (≈14:1), `{colors.on-navy}` sur fond navy — jamais `{colors.gold}` comme couleur d'anneau de focus sur fond clair (≈2.4:1, échoue AA).

## Typography

- **Titres (`{typography.h1}`, `{typography.h2}`, `{typography.h3}`)** en Playfair Display — c'est la voix "cérémonie", réservée aux titres de section et au nom de la marque. Jamais utilisée pour un paragraphe entier ni pour un label de formulaire.
- **Corps et interface (`{typography.body}`, `{typography.button}`, `{typography.label}`, `{typography.eyebrow}`)** en Inter — tout le reste : sous-titres longs, descriptions de formules, champs de formulaire, boutons.
- **Eyebrow** (`{typography.eyebrow}`) en majuscules, lettrage espacé — sert d'étiquette de section ("Vin d'honneur · Mariage"), jamais de titre. Couleur conditionnée au fond, pas au choix libre : `{colors.gold}` **uniquement** sur fond `{colors.navy}` (Hero — ≈5.8:1, passe AA) ; `{colors.ink}` sur tout fond clair (`{colors.surface}`, `{colors.surface-card}`, `{colors.sage}`). Ni `{colors.gold}` ni `{colors.sage}` en couleur de texte eyebrow sur fond clair — les deux échouent AA à cette taille (≈2.4:1 et ≈2.5:1 sur `{colors.surface}`).

## Layout & Spacing

Une seule page, un seul flux vertical, quatre blocs dans l'ordre fixé : Hero → Écoute → Présentation & Formules → Contact/Devis. Pas de navigation latérale ni de menu multi-pages. Rythme vertical généreux entre blocs (`{spacing.section-y}`) pour que chaque section respire et se lise comme un chapitre. Mobile-first : `{spacing.gutter-mobile}` en marge latérale sous 640px, `{spacing.gutter-desktop}` au-delà ; les cartes Formules passent de 1 colonne (mobile) à 2 colonnes (desktop).

## Shapes

Angles doux mais pas arrondis "app mobile" : `{rounded.sm}` sur les boutons et champs (net, presque droit), `{rounded.md}` sur les cartes Formules (un peu plus doux pour l'aspect carte imprimée), `{rounded.full}` réservé aux formes rondes intentionnelles (insigne, pastille de tag). Pas de `rounded-xl` généralisé.

## Components

| Component | Visual spec |
|---|---|
| **Hero** | Fond `{components.hero.background}` (hauteur au contenu, pas 100vh forcé). Desktop : photo de Stephane détourée (transparence réelle, pas de fond à raccorder) ancrée à droite, texte à gauche sur environ 64% de la largeur. Mobile : texte d'abord, photo centrée en dessous (voir Structural Seed de l'architecture pour les proportions exactes). Titre `{typography.h1}` en `{components.hero.text}` (plus grand sur desktop que le token de base pour porter la composition élargie), sous-titre `{typography.body}` en `{components.hero.subtitleText}` (opacité réduite ~85%). |
| **CTA button** | `{components.cta-button.background}` / texte `{components.cta-button.text}`, `{components.cta-button.radius}`, `{components.cta-button.font}`. Un seul CTA visuellement fort par écran — pas de second bouton doré en concurrence directe. |
| **Badge / insigne (logo)** | Cercle `{components.badge.shape}`, contour `{components.badge.border}`, fond transparent (laisse voir le fond navy derrière), motif trait fin ligne-sax en `{colors.gold}`. |
| **Bloc Écoute (teaser)** | Fond `{components.audio-teaser.background}`, texte `{components.audio-teaser.text}`. Visuel d'onde sonore statique (pas de lecteur fonctionnel tant qu'aucune démo n'est prête). |
| **Carte Formule** | `{components.formule-card.background}`, `{components.formule-card.border}`, `{components.formule-card.radius}`. Titre `{typography.h3}` en `{components.formule-card.titleText}`, description `{typography.body-sm}` en `{components.formule-card.bodyText}`. |
| **Champ de formulaire** | `{components.form-field.background}`, `{components.form-field.border}` (`{colors.border-strong}`, pas `{colors.border}`), `{components.form-field.radius}`, label `{typography.label}` en `{components.form-field.labelText}` au-dessus du champ (jamais en placeholder seul). État erreur : `{components.form-field.borderError}`. Focus : `{components.form-field.focusRing}`. |
| **Message d'erreur de champ** | `{components.error-message.font}` en `{components.error-message.text}`, sous le champ concerné. |

→ Référence de composition (tous les composants ci-dessus, assemblés) : `mockups/key-landing-desktop.html`. Alternatives de traitement du Hero écartées (A photo-led, C typographique pur) : `.working/direction-hero-A-B-C.html`. Le spine gagne en cas de conflit.

## Do's and Don'ts

- **Do** garder l'or (`{colors.gold}`) rare et intentionnel — CTA, insigne, filets fins.
- **Do** utiliser `{colors.surface}` (blanc cassé) comme neutre par défaut, jamais du blanc pur.
- **Don't** poser une photo qui n'a pas été validée par Stephane (contenu, cadrage, détourage) — la photo actuelle du Hero l'a été.
- **Don't** mettre deux CTA dorés visibles simultanément dans le même écran.
- **Don't** utiliser `{colors.gold}` ou `{colors.sage}` comme couleur de texte eyebrow sur fond clair — échoue le contraste AA (voir § Typography).
- **Don't** utiliser `{colors.border}` seul comme limite visible d'un champ ou d'une carte — utiliser `{colors.border-strong}`.
- **Don't** utiliser Playfair Display en dessous de ~1rem ni pour du texte long — perd sa lisibilité et son effet cérémonial.
