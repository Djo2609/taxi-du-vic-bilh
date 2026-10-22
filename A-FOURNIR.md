# À fournir / à valider : Taxi du Vic-Bilh

Liste à reprendre avec le client avant la mise en ligne. Dans le code, chaque point est repéré par un commentaire `<!-- À VALIDER -->` (ou `À COMPLÉTER`, `À FOURNIR`, `À INTÉGRER`).

## 1. Visuels manquants (priorité haute)

| Élément | Pourquoi | Format idéal |
|---|---|---|
| **Logo en vectoriel** (SVG/AI/PDF) ou PNG transparent ≥ 1000 px | Le seul logo disponible fait 200 × 200 px sur fond blanc (photo de profil Facebook). Le site utilise en attendant un wordmark en HTML/CSS qui reprend le logo (TAXI avec le trait jaune sur le X, « du VIC-BILH » sur fond jaune). | SVG |
| **Photo du père, de la mère et du fils** (chacun devant son taxi) | L'élément le plus fort pour le côté familial. La section « Une famille au volant » (accueil et page La famille) montre pour l'instant les trois taxis sans leurs chauffeurs (photo Facebook 1080 px) : une photo avec la famille la remplacerait idéalement. | JPG ≥ 1600 px, format paysage |
| **Prénoms du père, de la mère et du fils** | Pour signer la lettre (« Marie, Julien et Hugo » plutôt que « La famille Taxi du Vic-Bilh ») et légender la photo. | Texte |
| **Photos HD des véhicules** | Les photos récupérées sur Facebook sont en basse définition (960 px pour la principale, 590 px pour la route au coucher de soleil, 160 px pour les vignettes de l’album « sur la route »). | JPG ≥ 2000 px, horizontales |
| Photos d'intérieur (sièges arrière, coffre, siège enfant installé) | Rassure les familles et les patients. | JPG ≥ 1600 px |
| 2 ou 3 photos de paysages du Vic-Bilh avec le taxi (vignes de Madiran, coteaux) | Ancrage local, pages Longue distance et Particuliers. | JPG ≥ 2000 px |

Images déjà intégrées (récupérées sur la page Facebook publique du client) : les deux taxis électriques sous les arbres, le taxi lilas sur la route, l'hôpital Saint-André (CHU de Bordeaux, entrée et cour), plus 3 vignettes.

## 2. Informations à confirmer

- [ ] **Nom de domaine** : `taxiduvicbilh.fr` a été supposé (d'après l'e-mail). À confirmer ou à remplacer partout.
- [ ] **Adresse postale complète** (rue) : Facebook n'indique que « Saint-Jean-Poudge ». Elle manque aussi dans les données structurées (JSON-LD).
- [ ] **Petite histoire de la famille** : la lettre « Une famille au volant » (accueil et page La famille) est rédigée de façon générique ; à personnaliser (année de création, pourquoi le taxi, une anecdote).
- [x] **Nombre de véhicules** : 3 taxis, un par membre de la famille (le père, la mère, le fils).
- [ ] **Motorisation du 3e taxi** (SUV blanc, apparemment un Audi Q5) : électrique, hybride ? Le site parle de « véhicules électriques » de façon générale (badge du haut, promesse « On conduit tout doux ») ; à ajuster si ce véhicule n'est pas électrique.
- [ ] **Modèles exacts** (les deux autres semblent être des Xpeng G6 électriques) et nombre de places (4 passagers indiqués).
- [ ] **Sièges enfants / rehausseurs** disponibles ? Très mis en avant dans la version familiale (badge du hero, frise, FAQ, formulaire).
- [ ] **« Les règles de la maison »** (5 règles : on attend le client, on porte les sacs, discrétion, conduite douce, on ne repart pas avant que vous soyez rentré) : à valider avec le client.
- [ ] **Planificateur « On part à quelle heure ? »** : durées de trajet et marges (15 min avant un rendez-vous, 1 h 30 avant un vol) à faire relire par la famille ; destinations à ajuster.
- [ ] **Frise « Une journée avec nous »** : c'est une journée *type* (5 h aéroport, 8 h 30 rendez-vous médical…) ; vérifier que les exemples collent à l'activité réelle.
- [ ] **Moyens de paiement** : non affichés sur le site ; à ajouter dans la FAQ si le client le souhaite.
- [ ] **Tiers payant CPAM** pratiqué systématiquement ? (formulé « dans la plupart des cas »).
- [ ] **Facture à chaque course** pour les pros (indiqué dans la frise) ?
- [x] **Trajets vers l'Espagne** : confirmé (« toutes distances, Espagne comprise »), affiché dans le hero, la frise, le tableau de route, la zone et la FAQ.
- [ ] **Distances et temps du « tableau de route »** : valeurs indicatives (arrondies) à faire relire par le chauffeur.
- [ ] **Liste des communes desservies** : à ajuster selon les habitudes réelles.

- [ ] **Numéros des deux licences (ADS)** de Caubios-Loos et de Labastide-Monréjeau : les communes sont affichées (bulle de l'accueil, zone desservie, mentions légales), les numéros restent à compléter dans `mentions-legales.html`.
- [ ] **« Fauteuil médicalisé »** : préciser ce que ça couvre (fauteuil roulant pliant transporté dans le coffre ? transfert du patient ?) pour éviter tout malentendu côté patients et CPAM.
- [ ] **« Animaux acceptés »** : conditions éventuelles (taille, caisse de transport, supplément) à indiquer dans la FAQ si besoin.

## 3. Éléments laissés en placeholder

- [ ] **Mentions légales** : forme juridique, SIRET, TVA, n° ADS, carte professionnelle, n° de convention CPAM, responsable de publication, hébergeur, agence (tout ce qui est entre crochets).
- [ ] **Formulaire de réservation** (`contact.html`) : remplacer `VOTRE_ID` par l'identifiant Formspree (voir README §3).
- [ ] **Avis clients** : la page Facebook affiche 0 avis. La page `avis.html` et le bandeau avis de l'accueil invitent à en laisser ; dès que les premiers vrais avis arrivent, en afficher 2 ou 3 à cet endroit. Aucun avis n'a été inventé.
- [ ] **Lien « laisser un avis Google »** : à récupérer une fois la fiche Google Business Profile créée.
- [ ] **Polaroïd « CHU de Bordeaux, juste à temps »** (page Sur la route et zone desservie de la page Contact) : repris de la dernière publication Facebook.

## 4. Recommandations hors site

- Créer ou revendiquer la **fiche Google Business Profile** (indispensable pour un taxi local).
- Demander aux premiers clients satisfaits un avis Google.
- Ajouter le lien du site sur la page Facebook.
