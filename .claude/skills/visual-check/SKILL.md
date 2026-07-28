---
name: visual-check
description: Rappel de vérification visuelle après toute modification de fichiers CSS ou HTML sur ce site (16 pages statiques, css/style.css). À utiliser après avoir édité ou créé un fichier .css ou .html, avant de déclarer la tâche terminée à l'utilisateur.
disable-model-invocation: false
---

# Vérification visuelle après modification CSS/HTML

Ce site (Garage Martin) est du HTML/CSS/JS vanilla sans build ni serveur dédié — les pages s'ouvrent directement en `file://` ou via un serveur statique ad hoc, et il n'y a pas de suite de tests visuels automatisés. La seule façon de savoir si un changement fonctionne réellement est de le voir rendu dans un navigateur. Après avoir modifié un ou plusieurs fichiers `.html` (16 pages : `index.html`, `prestations/*.html`, `blog/*.html`, etc.) ou `css/style.css`, avant de dire à l'utilisateur que c'est fait :

## 1. Ouvrir la page concernée

Pas de build à lancer : un simple rafraîchissement du navigateur (`F5` / `Ctrl+R`) sur le fichier ouvert (ou sur le serveur local si l'utilisateur en a un qui tourne) suffit après un changement CSS/HTML.

## 2. Ne jamais affirmer un résultat visuel sans l'avoir vérifié

Si aucun outil de navigateur pilotable n'est disponible dans la session, il est **interdit** de dire des phrases comme "c'est corrigé", "les cartes sont maintenant bien alignées", "le logo est bien centré" sans qualification — c'est une affirmation invérifiée.

À la place :
- Décris concrètement et techniquement ce qui a changé (sélecteur CSS touché, valeur avant/après, ou markup HTML ajouté/modifié).
- Indique explicitement que ce changement n'a pas été vérifié visuellement dans un navigateur.
- Demande à l'utilisateur d'ouvrir/rafraîchir la page concernée et de confirmer si le rendu correspond à l'attente, en précisant quoi regarder spécifiquement (quel élément, mobile ou desktop si pertinent — ce site est mobile-first avec un layout sidebar qui bascule à 900px).

Si un outil de navigateur est disponible dans la session, utilise-le pour charger la page et vérifier réellement le rendu avant de répondre — dans ce cas, décris ce qui a été observé, pas seulement ce qui a été codé.

## Résumé

Après un changement CSS/HTML : description technique précise du changement → aveu explicite de non-vérification (sauf vérification réelle possible) → demande de confirmation utilisateur, en précisant mobile/desktop si le changement touche le layout responsive. Ne jamais présenter un changement visuel comme confirmé sans preuve.
