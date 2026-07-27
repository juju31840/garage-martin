# Prompt V2 — Garage Martin : site multi-pages (prestations tarifées, avis, atelier)

Ce document est le prompt à utiliser (ici ou dans une nouvelle session) pour lancer la prochaine itération majeure du site. Il part de l'état actuel (site vitrine une page, refonte visuelle façon "Chapitre Résidentiel" : Archivo/Space Mono, palette kaki/crème/orange, carrousels photo) et décrit une évolution vers un site multi-pages avec tarifs, avis et galerie détaillés.

## Contexte à rappeler à Claude en début de session

- Site vanilla HTML/CSS/JS, pas de framework, mobile-first, un seul `<h1>` par page (contrainte du brief initial, à respecter **par page** dans la version multi-pages).
- Palette actuelle : kaki foncé (`--color-primary`), crème (`--color-bg`), orange vif (`--color-accent`), noir (`--color-ink`). Polices auto-hébergées : Archivo (titres/boutons), Space Mono (labels/légendes), Inter (corps de texte).
- 6 prestations : Vidange, Révision, Pneus, Diagnostic, Carrosserie, Freinage — déjà illustrées par des cartes photo cliquables (actuellement liens morts) sur la page d'accueil.
- Sections "Ce que disent nos clients" et "L'atelier en images" existent déjà en version courte sur la home.

## Demande explicite de l'utilisateur

1. **Cliquer sur une carte "prestation"** doit ouvrir une **page dédiée** pour ce service, avec au minimum : description complète, **tarifs**, et un CTA (appeler / prendre RDV).
2. **Cliquer sur "Ce que disent nos clients"** doit ouvrir une **page dédiée avis clients** (plus complète que les 4 témoignages de la home).
3. **Cliquer sur "L'atelier en images"** doit ouvrir une **page galerie dédiée** (plus fournie que les 2 photos actuelles).
4. Être force de proposition : lister toutes les améliorations pertinentes, pas seulement l'exécution littérale de la demande.

---

## 1. Pages prestations (6 pages + éventuelle page index)

**Structure de fichiers proposée** : `prestations/vidange.html`, `prestations/revision.html`, `prestations/pneus.html`, `prestations/diagnostic.html`, `prestations/carrosserie.html`, `prestations/freinage.html`.

**Gabarit de contenu par page** :
- Header/nav identique au reste du site (voir section architecture ci-dessous pour éviter la duplication).
- Hero compact : photo du service (réutiliser celles existantes), nom de la prestation en `<h1>`, courte accroche.
- Description longue (3-4 phrases, plus détaillée que la carte de la home).
- **Grille tarifaire** (proposition de structure, prix fictifs à valider) :

| Prestation | À partir de | Détail |
|---|---|---|
| Vidange | 69 € | Huile + filtre, hors fournitures spécifiques |
| Révision complète | 149 € | Selon carnet constructeur |
| Pneu (unité, hors pneu) | 20 € | Montage + équilibrage |
| Diagnostic électronique | 49 € | Déduit si réparation effectuée dans la foulée |
| Carrosserie (bosse simple) | Sur devis | Devis gratuit sous 24h |
| Freinage (train avant) | 89 € | Plaquettes + main d'œuvre, disques en supplément |

  *(Ces montants sont des placeholders réalistes pour un garage de quartier français en 2026 — à ajuster avec les vrais tarifs du client avant mise en ligne.)*
- Bloc "Ce qui est inclus" (liste à puces).
- Durée moyenne d'intervention (ex. "30-45 min", "sur rendez-vous").
- CTA double : bouton Appeler (`tel:`) + bouton "Prendre rendez-vous" (réutilise la modale RDV existante).
- Fil d'Ariane (`Accueil > Prestations > Vidange`) pour la nav et le SEO.
- Lien retour vers les autres prestations en bas de page (maillage interne).
- Meta title/description uniques par page (ex. "Vidange à Lyon | Garage Martin — à partir de 69€").

## 2. Page Avis clients (`avis.html`)

- Note moyenne mise en avant en grand (ex. "4.8/5 sur 47 avis").
- Tous les témoignages (pas seulement 4) — prévoir 8-10 avis fictifs variés (dates, prestations concernées).
- Optionnel : filtre simple par prestation (JS, sans framework).
- Lien vers la fiche Google Avis réelle du garage.
- CTA "Laisser un avis" et rappel du bouton Appeler.

## 3. Page Atelier en images (`atelier.html`)

- Galerie complète (plus que 2 photos) organisée en catégories : atelier/outillage, l'équipe au travail, avant/après carrosserie si possible.
- Lightbox au clic (vanilla JS, sans librairie).
- Réutiliser le même système de cartes/collage que la home pour la cohérence visuelle.

---

## Architecture technique (rester 100% vanilla)

- **Vrais fichiers HTML séparés** pour chaque page (pas de routing JS côté client, pas de framework) — cohérent avec la contrainte "no framework" et meilleur pour le SEO (chaque page peut être indexée et titrée séparément).
- **Header/footer partagés sans duplication de code** : charger `header.html`/`footer.html` via `fetch()` + injection DOM (petit script vanilla, ~20 lignes). Alternative plus simple mais avec duplication : copier le header/footer dans chaque fichier — à trancher selon la préférence de maintenance.
- Adapter les chemins relatifs (`assets/`, `css/`, `js/`) en `../assets/`, etc. dans les pages imbriquées dans `prestations/`.
- Mettre à jour la nav principale : les liens `#prestations`, `#avis`, `#atelier` de la home renvoient toujours vers les sections courtes de la home (aperçu), mais chaque carte/titre de section devient aussi un lien cliquable vers la page dédiée correspondante ("Voir tous les avis →", "Voir la galerie complète →", chaque carte prestation cliquable).

## Contenu à produire pendant l'implémentation

- Rédiger les tarifs (tableau ci-dessus à affiner avec l'utilisateur).
- Étoffer les descriptions de chaque prestation (actuellement 1 phrase courte → 3-4 phrases).
- Rédiger 4-6 témoignages fictifs supplémentaires pour la page avis.
- Réutiliser/organiser les photos existantes ; en sourcer de nouvelles si besoin pour la galerie complète (même processus de vérification : libres de droits, sans logo de marque visible).

---

## Suggestions supplémentaires (être force de proposition)

### Conversion
- Modale de prise de RDV déjà existante : la rendre accessible depuis **chaque** page prestation, pas seulement la home.
- Barre d'action sticky mobile (Appeler / RDV) présente sur toutes les pages, pas seulement la home.
- Sur les pages prestations : afficher 1-2 avis clients spécifiques à cette prestation (preuve sociale ciblée).

### SEO
- Meta title/description **uniques par page** (déjà mentionné) — c'est le principal gain SEO de ce passage en multi-pages : chaque prestation peut ranker sur "vidange Lyon", "révision Lyon", etc.
- Données structurées **schema.org** : `LocalBusiness`/`AutoRepair` sur la home, `Service` + `Offer` (prix) sur les pages prestations, `Review`/`AggregateRating` sur la page avis.
- `sitemap.xml` + `robots.txt` (inexistants actuellement).
- Fil d'Ariane visible + balisage `BreadcrumbList`.

### Légal / RGPD (point d'attention réel, pas juste cosmétique)
- Le formulaire de contact collecte nom/téléphone/message : une page **Mentions légales** et une **Politique de confidentialité** sont légalement attendues pour un site français qui collecte des données personnelles.
- Si un outil d'analytics est ajouté plus tard, prévoir un bandeau de consentement cookies.

### Accessibilité
- Revérifier les contrastes texte/fond avec la nouvelle palette kaki/orange sur crème (certains textes muted pourraient être limites en contraste AA).
- Vérifier l'alt text de toutes les nouvelles photos de galerie.
- Navigation clavier dans la lightbox de la page atelier (focus trap, Échap pour fermer).

### Performance
- Convertir les photos en WebP avec fallback JPEG (`<picture>`), les fichiers actuels sont en JPEG plein format.
- `srcset`/tailles responsives pour éviter de charger des images 1200px sur mobile.

### Détails techniques
- Page **404 personnalisée**.
- Feuille de style d'impression pour la page tarifs (un client qui veut imprimer un devis).

### Pour aller plus loin (optionnel, à discuter)
- Vrai moteur de réservation de créneaux (au-delà du formulaire actuel).
- Bouton WhatsApp/click-to-chat en plus du `tel:`.
- Blog "conseils entretien" pour du SEO longue traîne (contenu éditorial récurrent).

---

## Priorisation proposée

1. **Phase 1 (cœur de la demande)** : 6 pages prestations + tarifs, page avis, page atelier, mise à jour de la nav et des cartes cliquables.
2. **Phase 2 (conformité)** : mentions légales, politique de confidentialité, schema.org, sitemap/robots.txt.
3. **Phase 3 (optionnel)** : réservation avancée, blog, WebP.

## Points à valider avant de lancer l'implémentation

- Les tarifs ci-dessus sont des **placeholders** — à confirmer/ajuster.
- Choix du mécanisme header/footer partagé (fetch JS vs duplication simple).
- Périmètre de la Phase 1 : tout d'un coup, ou service par service ?
