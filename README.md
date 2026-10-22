# Site vitrine : Taxi du Vic-Bilh

Site statique multipage (HTML + un seul fichier CSS + un petit JS). Il n'y a ni framework, ni base de données, ni étape de compilation : on dépose les fichiers chez un hébergeur et le site fonctionne.

---

## 1. Structure du dossier

Site **multipage** : une page par sujet et **une page par service** (c'est ce qui fait remonter chaque prestation sur Google).

```
/
├── index.html                              Accueil : carte postale, la famille (extrait), services, planificateur, CPAM, distances, avis, FAQ
├── a-propos.html                           La famille : lettre, album, « Les règles de la maison », repères
├── services.html                           « Une journée avec nous » : frise 5 h → 23 h 30, chaque étape mène à sa page
├── service-taxi-conventionne-cpam.html     Service : transport médical conventionné CPAM
├── service-taxi-gare-aeroport.html         Service : gares & aéroports
├── service-taxi-longue-distance.html       Service : toutes distances, Espagne comprise
├── service-taxi-professionnels.html        Service : professionnels
├── service-taxi-particuliers.html          Service : particuliers, enfants, mariages & soirées
├── realisations.html                       « Sur la route » : album photo
├── avis.html                               Avis clients (invitation Google / Facebook, engagements)
├── contact.html                            Planificateur « On part à quelle heure ? », formulaire, carte, zone desservie
├── mentions-legales.html                   Mentions légales + RGPD (non indexée)
├── sitemap.xml / robots.txt / llms.txt     Référencement (Google et moteurs IA)
├── favicon.svg
└── assets/
    ├── css/style.css                       Feuille de styles unique (tokens en haut du fichier)
    ├── js/main.js                          Menu mobile, animations, planificateur, formulaire
    └── img/                                Images .webp optimisées, image de partage, icône iPhone
```

> Le brief demandait un `llm.txt` : le fichier s'appelle **`llms.txt`**, le nom standard que lisent les robots IA.

### Éléments signature
- **Carte postale** « Bons baisers du Vic-Bilh » en haut de l'accueil (timbre et tampon dessinés en SVG).
- **Planificateur « On part à quelle heure ? »** (accueil et contact) : destination, heure du rendez-vous, adultes / enfants, bagages → heure de passage conseillée, sièges enfants, 1 ou 2 taxis. « Envoyer ce trajet » pré-remplit le formulaire de `contact.html` (paramètres d'URL).
- **« Les règles de la maison »** (page La famille) : note aimantée sur le frigo.
- **Frise « Une journée avec nous »** (page Services) sur une route dessinée, avec les heures dans des bornes kilométriques.

> La version one-page précédente reste disponible dans l'historique git (commit « Ajoute un bouton Facebook dans le header »).

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
2. **Formulaire de contact** (page `contact.html`) :
   - Créez un compte gratuit sur https://formspree.io avec l'adresse `taxiduvicbilh@gmail.com`, puis créez un formulaire.
   - Remplacez `VOTRE_ID` dans `contact.html` (`action="https://formspree.io/f/VOTRE_ID"`) par l'identifiant fourni.
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

> Ne pas envoyer le dossier `.claude/` (aperçu local), ni `README.md` et `A-FOURNIR.md` (notes internes). Sur Vercel, le fichier `.vercelignore` s'en charge.

---

## 5. Après la mise en ligne

1. **Google Search Console** (https://search.google.com/search-console) : ajoutez le domaine puis soumettez `https://www.taxiduvicbilh.fr/sitemap.xml`.
2. **Fiche Google Business Profile** : créez-la ou revendiquez-la (catégorie « Service de taxi »). Indiquez la même adresse, le même téléphone et les mêmes horaires que sur le site, puis ajoutez le lien du site. C'est le levier n°1 pour le référencement local d'un taxi.
3. Copiez le lien « Demander des avis » de la fiche Google dans `avis.html` et dans le bandeau avis de `index.html`, à la place du lien de recherche Google Maps actuel.
4. Ajoutez le lien du site dans la section « À propos » de la page Facebook.
5. Contrôlez les performances sur https://pagespeed.web.dev (objectif : 90 ou plus).
6. Testez les données structurées sur https://search.google.com/test/rich-results.

---

## 6. Modifier le site

- **Couleurs et typographie** : tout est centralisé en haut de `assets/css/style.css` (section *Tokens*). Changer une couleur à cet endroit la change sur tout le site.
- **En-tête et pied de page** : identiques sur toutes les pages. Pour changer un lien ou le numéro, faites un rechercher / remplacer dans tous les fichiers `.html`.
- **Ajouter une page service** : dupliquez une page `service-*.html`, changez `<title>`, `meta description`, `canonical`, Open Graph, H1, JSON-LD et contenu ; ajoutez-la au pied de page, à `services.html` (frise), à `sitemap.xml` et à `llms.txt`.
- **Planificateur** : destinations, distances et durées dans la liste `<select id="p-dest">` de `index.html` **et** de `contact.html` (attributs `data-km`, `data-min` en minutes, `data-time`, `data-type="air"` pour un aéroport). Marges dans `assets/js/main.js` : 15 min avant un rendez-vous, 1 h 30 avant un vol.
- **Phrases manuscrites** (police Caveat, classe `.hand`) : à garder pour les petites notes personnelles uniquement.
- **Images** : utilisez du `.webp` (convertisseur gratuit : https://squoosh.app), gardez des noms de fichiers en minuscules sans accents, et indiquez `width`, `height` et un `alt` descriptif. Pour les grandes photos, fournissez plusieurs tailles (ex. `-480`, `-800`, pleine taille) avec `srcset` / `sizes`, comme sur la carte postale de l'accueil : le mobile télécharge alors la petite version.
- **Polices** : hébergées dans `assets/fonts/` (Familjen Grotesk, Figtree, Caveat, licence SIL OFL), déclarées en haut de `style.css`. Aucun appel à Google Fonts : plus rapide et sans transfert de données vers Google (RGPD).
- **Cache** : `vercel.json` fixe la durée de cache navigateur (polices 1 an, images 1 semaine, CSS/JS 1 h). Si vous remplacez une police, changez aussi son nom de fichier.

### Performance mobile (Lighthouse, mobile simulé, 21/10/2026)
| Page | Avant | Après |
|---|---|---|
| Accueil | 78 (LCP 3,8 s) | 99 (LCP 2,0 s) |
| Conventionné CPAM | 93 | 100 |
| Contact | 88 | 99 |
- **Photo de famille** : remplacez la grande photo de l'album (section « Une famille au volant » de `index.html` et `a-propos.html`) dès qu'elle est disponible (commentaire `À FOURNIR` dans le code).

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
