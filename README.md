# Site vitrine : Taxi du Vic-Bilh

Site statique multipage (HTML + un seul fichier CSS + un petit JS). Il n'y a ni framework, ni base de données, ni étape de compilation : on dépose les fichiers chez un hébergeur et le site fonctionne.

---

## 1. Structure du dossier

Le site est un **one-page** : tout le contenu tient dans `index.html`, découpé en sections accessibles depuis le menu (ancres).

```
/
├── index.html                 La page unique (voir sections ci-dessous)
├── mentions-legales.html      Mentions légales + RGPD (page séparée, obligatoire, non indexée)
├── sitemap.xml                Plan du site pour Google
├── robots.txt                 Autorise l'indexation, pointe vers le sitemap
├── llms.txt                   Résumé du site pour les moteurs IA (ChatGPT, Perplexity…)
├── favicon.svg                Icône d'onglet
├── assets/
│   ├── css/style.css          Feuille de styles unique (tokens en haut du fichier)
│   ├── js/main.js             Menu mobile, section active du menu, animations, formulaire
│   └── img/                   Images .webp optimisées, image de partage, icône iPhone
└── _archive-multipage/        Ancienne version multipage (référence uniquement, NE PAS mettre en ligne)
```

### Sections de la page (ancres)

| Ancre | Section |
|---|---|
| `#accueil` | Accroche + **carte postale** « Bons baisers du Vic-Bilh » (timbre et tampon dessinés en SVG) |
| *(bande sombre)* | Le numéro de téléphone en grand |
| `#famille` | La lettre de la famille + album de 3 polaroïds, puis **« Les règles de la maison »** (note aimantée sur le frigo) |
| `#services` | « Une journée avec nous » : les 6 services en frise horaire (5 h → 23 h 30) |
| `#planificateur` | **« On part à quelle heure ? »** : outil interactif (destination, heure du rendez-vous, adultes / enfants, bagages) → heure de passage conseillée, sièges enfants, 1 ou 2 taxis, puis pré-remplissage du formulaire |
| `#cpam` | Taxi conventionné CPAM : 3 étapes + documents à prévoir |
| *(bande sombre)* | Tableau de route (distances) |
| `#zone` | Communes desservies + polaroïds « sur la route » |
| `#avis` | Invitation à laisser un avis Google / Facebook |
| `#faq` | Questions fréquentes (balisées en FAQPage pour Google) |
| `#contact` | Coordonnées, carte, formulaire de réservation |

> Le brief demandait un `llm.txt` : le fichier s'appelle **`llms.txt`**, le nom standard que lisent les robots IA.

### Note SEO : one-page ou multipage ?
Un one-page ne se positionne que sur **une** URL : il est moins fort qu'un site avec une page par service pour se classer sur plusieurs requêtes (« taxi conventionné Garlin », « taxi aéroport Pau »…). Pour compenser, la page reprend les mots-clés métier dans ses titres et sa FAQ, et ses données structurées décrivent chaque service (`OfferCatalog`) et chaque question (`FAQPage`). Si le client veut plus de visibilité plus tard, la version multipage est conservée dans `_archive-multipage/`.

---

## 2. Tester en local

Double-cliquer sur `index.html` suffit pour la plupart des vérifications. Pour un test fidèle (carte, formulaire), lancez un mini-serveur depuis le dossier :

```bash
python -m http.server 8000
```

Ouvrez ensuite http://localhost:8000.

---

## 3. Avant la mise en ligne (obligatoire)

1. **Nom de domaine.** Le site part du principe que l'adresse sera `https://www.taxiduvicbilh.fr`. Si l'adresse est différente, faites un « rechercher / remplacer » de `https://www.taxiduvicbilh.fr` dans **tous** les fichiers (`.html`, `sitemap.xml`, `robots.txt`, `llms.txt`).
2. **Formulaire de réservation** (section `#contact` de `index.html`) :
   - Créez un compte gratuit sur https://formspree.io avec l'adresse `taxiduvicbilh@gmail.com`, puis créez un formulaire.
   - Remplacez `VOTRE_ID` dans `index.html` (`action="https://formspree.io/f/VOTRE_ID"`) par l'identifiant fourni.
   - Tant que ce n'est pas fait, le bouton « Envoyer » ouvre la messagerie du visiteur avec la demande pré-remplie : aucune demande n'est perdue.
3. **Mentions légales** : remplissez tout ce qui est entre crochets `[ ]` dans `mentions-legales.html`.
4. **Commentaires `À VALIDER`** : recherchez `À VALIDER`, `À COMPLÉTER`, `À FOURNIR` et `À INTÉGRER` dans les fichiers HTML. Chaque commentaire signale une information à confirmer avec le client (voir `A-FOURNIR.md`).

---

## 4. Mise en ligne

### Option A : Netlify (gratuit, le plus simple)
1. Allez sur https://app.netlify.com/drop.
2. Glissez-déposez **le dossier entier** du site.
3. Dans *Domain settings*, ajoutez le nom de domaine `taxiduvicbilh.fr` et suivez les instructions DNS. Le HTTPS s'active automatiquement.

### Option B : hébergement mutualisé (OVH, o2switch, Ionos…)
1. Connectez-vous en FTP (FileZilla) avec les identifiants de l'hébergeur.
2. Envoyez **le contenu** du dossier (pas le dossier lui-même) dans le répertoire `www/` ou `public_html/`.
3. Activez le certificat SSL (Let's Encrypt) dans le panneau de l'hébergeur.

> Ne pas envoyer les dossiers `.claude/` (aperçu local) et `_archive-multipage/` (ancienne version).

---

## 5. Après la mise en ligne

1. **Google Search Console** (https://search.google.com/search-console) : ajoutez le domaine puis soumettez `https://www.taxiduvicbilh.fr/sitemap.xml`.
2. **Fiche Google Business Profile** : créez-la ou revendiquez-la (catégorie « Service de taxi »). Indiquez la même adresse, le même téléphone et les mêmes horaires que sur le site, puis ajoutez le lien du site. C'est le levier n°1 pour le référencement local d'un taxi.
3. Copiez le lien « Demander des avis » de la fiche Google dans la section `#avis` de `index.html`, à la place du lien de recherche Google Maps actuel.
4. Ajoutez le lien du site dans la section « À propos » de la page Facebook.
5. Contrôlez les performances sur https://pagespeed.web.dev (objectif : 90 ou plus).
6. Testez les données structurées sur https://search.google.com/test/rich-results.

---

## 6. Modifier le site

- **Couleurs et typographie** : tout est centralisé en haut de `assets/css/style.css` (section *Tokens*). Changer une couleur à cet endroit la change sur tout le site.
- **Ajouter ou modifier un service** : dans `index.html`, section `#services`, chaque étape de la frise est un `<li>` (heure dans la borne, titre, phrase manuscrite, texte, étiquettes). Mettez aussi à jour le bloc JSON-LD `hasOfferCatalog` dans le `<head>` et la liste « Type de trajet » du formulaire.
- **Planificateur** : les destinations, distances et durées sont dans la liste `<select id="p-dest">` de `index.html` (attributs `data-km`, `data-min` en minutes, `data-time`, `data-type="air"` pour un aéroport). Marges appliquées dans `assets/js/main.js` : 15 min avant un rendez-vous, 1 h 30 avant un vol.
- **Phrases manuscrites** (police Caveat, classe `.hand`) : à garder pour les petites notes personnelles uniquement.
- **Images** : utilisez du `.webp` (convertisseur gratuit : https://squoosh.app), gardez des noms de fichiers en minuscules sans accents, et indiquez `width`, `height` et un `alt` descriptif.
- **Photo de famille** : remplacez la première photo de l'album (`#famille`) dès qu'elle est disponible (commentaire `À FOURNIR` dans le code).

---

## 7. Système de design (rappel pour le webdesigner)

| Token | Valeur | Usage |
|---|---|---|
| `--ink` | `#1B1726` | Encre aubergine : textes, fonds sombres |
| `--paper` | `#F7F6FB` | Fond de page, papier lilas pâle |
| `--lilac` / `--lilac-soft` | `#CFC7EC` / `#ECE8F7` | Aplats ; clin d'œil au taxi lilas du client |
| `--lilac-deep` | `#574A8F` | Liens, accents de texte (contraste 7:1) |
| `--taxi` | `#FFD21F` | Jaune « lumineux taxi » : actions principales (repris du logo) |
| Titres | Familjen Grotesk 600/700 | Grotesque chaleureuse (« familj » = famille en suédois) |
| Texte | Figtree 400/500/700 | Très lisible, chiffres nets pour les numéros |
| Annotations | Caveat 600 | Écriture manuscrite, ambiance « album de famille » (petites notes seulement) |

**Élément signature : la borne kilométrique.** La borne blanche à tête jaune des routes départementales porte les heures de la frise « Une journée avec nous » et les étapes CPAM, et sa silhouette en arche encadre la photo d'accueil. **Ambiance album de famille** : polaroïds scotchés, lettre signée à la main, macaron 24/7, petite flèche « Le taxi lilas ? C'est nous ! ». La **ligne médiane pointillée jaune** court dans la bande du numéro de téléphone (animée, et figée si le visiteur a demandé de réduire les animations) et en haut du pied de page.
