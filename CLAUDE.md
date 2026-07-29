# CLAUDE.md — Garage Martin

Ce fichier est chargé automatiquement par Claude Code à l'ouverture de ce projet. Remplace une
version précédente obsolète (qui décrivait un dépôt ne contenant encore que `brief.md` — ce n'est
plus le cas depuis longtemps, voir état réel ci-dessous).

## Contexte produit

Site vitrine pour "Garage Martin", garage automobile local sans présence en ligne. Objectif :
donner envie d'appeler/prendre RDV, rassurer sur le sérieux de l'artisan. Brief initial complet :
`brief.md`. Le site a ensuite évolué vers un site multi-pages selon `brief-v2.md` (prestations
tarifées, avis, atelier) — les deux briefs restent la référence sur l'intention produit.

## État réel du site (au 29/07/2026)

**100% vanilla HTML/CSS/JS, aucun framework, aucun serveur requis.** Contrairement aux projets Next.js
de l'utilisateur, ce site s'ouvre directement en double-cliquant sur un fichier `.html` — le header
et le footer sont dupliqués dans chaque page (pas de `fetch()`/injection DOM), donc pas de souci CORS
en ouverture `file://`. C'est un vrai avantage sur cette machine sans Node.js : ce projet peut être
testé visuellement dès maintenant, sans rien installer.

16 pages statiques (home, 6 pages prestations, avis, atelier, histoire, blog + 2 articles, mentions
légales, politique de confidentialité, 404), 33 commits, tout poussé sur `main`
(`github.com/juju31840/garage-martin`), rien en attente.

**Séquence déjà implémentée** (voir `git log` pour le détail complet) :
1. V1 — page unique (accueil, prestations en cartes, avis courts, atelier en aperçu).
2. Refonte visuelle "Chapitre Résidentiel" (typo Archivo/Space Mono/Inter, palette kaki/crème/orange,
   carrousels photo).
3. V2 multi-pages complète selon `brief-v2.md` : 6 pages prestations avec grille tarifaire, page avis
   étoffée, page atelier avec galerie/lightbox, mentions légales + politique de confidentialité +
   schema.org + sitemap.xml/robots.txt, navigation en sidebar gauche, blog conseils, RDV en modale,
   WhatsApp, chat en direct (Crisp) avec bandeau de consentement RGPD.
4. Itérations visuelles récentes : remplacement de la palette kaki/orange par une charte "bleu de
   travail" (navy `#223142` / accent bleu `#2e86c1` sur fond écru `#ede6d8` — voir `css/style.css`
   `:root`), ajout d'un logo (badge voiture), corrections d'icônes.

## Points d'attention réels (pas des suppositions — vérifiés dans le code actuel)

- **Les tarifs affichés sont encore des placeholders** (`prestations/*.html`, ex. "Vidange à partir de
  69€") — `brief-v2.md` les qualifiait explicitement de "montants réalistes pour un garage de
  quartier français en 2026, à ajuster avec les vrais tarifs du client avant mise en ligne". Ils
  n'ont, à ce jour, pas été remplacés par de vrais tarifs. **Ne pas mettre le site en ligne sans
  valider ces prix avec le client réel.**
- Les avis clients (page `avis.html`) et témoignages restent fictifs (mockup), pareillement à ne pas
  publier tels quels sans avis réels ou accord explicite.
- Suggestions de `brief-v2.md` §Performance (conversion WebP + `srcset` responsive) **non
  implémentées** — les photos sont encore en JPEG plein format (`assets/photos/`).
- Le reste des suggestions de `brief-v2.md` (schema.org, sitemap, mentions légales, RGPD, 404,
  accessibilité clavier lightbox) semble déjà traité d'après le code actuel et les commits — à
  reconfirmer visuellement (skill `visual-check`) plutôt qu'à supposer.

## Contraintes dures du brief (toujours valables)

- Vanilla uniquement, mobile-first, un seul `<h1>` par page.
- Numéro de téléphone cliquable (`tel:`) sur mobile.
- Palette sobre et rassurante — "artisan de confiance", pas un ton startup.

## MCP et skills configurés

- `.mcp.json` : `exa` (recherche web IA).
- `.claude/skills/` : `design-review` (à utiliser avant tout changement visuel significatif),
  `git-safety` (vérifie l'email auteur + scanne les fichiers stagés pour des secrets avant tout
  commit/push), `visual-check` (rappel de vérification visuelle après toute modif CSS/HTML — adapté
  spécifiquement à ce site : pas de serveur dédié, `css/style.css`, breakpoint sidebar à 900px). Ces
  deux derniers skills ont été rendus autonomes (copiés depuis `world-clock`, qui était ouvert en
  parallèle) pour fonctionner en clonant uniquement ce dépôt.

## Prochaines actions probables

1. Ouvrir les pages en local (double-clic ou `visual-check`) pour reconfirmer visuellement l'état
   avant toute nouvelle demande — ce projet n'a pas les mêmes limitations que Vibetrip, il est
   testable immédiatement.
2. Si mise en ligne envisagée : lever les deux points d'attention ci-dessus (vrais tarifs, vrais
   avis) en priorité — ce sont les seuls éléments factuellement "faux" restants dans le site.
