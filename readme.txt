Groupe:
Rucher Thibault
Lenglet Jolan
Orveau Rémi

Informations utiles:
identifiant d'un utilisateur : user1@mail.com
mot de passe d'un utilisateur : user1

identifiant d'un administrateur : admin1@mail.com
mot de passe d'un administrateur : admin1

Informations pour la base de données:
Dans pgAdmin crée une base de donnée nommée 'Projet' avec pour mot de passe et identifiant 'postgres'.
Dans le schéma de la bd Projet crée, faire Query Tool puis sélectionné le fichier backup.sql fournit avec nos fichiers de codes et lancé la query.
La base de données est alors initialisé avec les bonnes données.

Informations pour npm:
Faire 'npm i' depuis une invite de commande dans le dossier projet.

Pages:
Home/PlanningTable: La page d'accueil du site, accessible par les admins, utilisateurs et visiteurs.
Permet de consulté les noms et dates des plannings, elle offre également un accès vers les manches du planning sélectionné.
La suppression et rajout d'un planning n'ai disponible que pour les administrateurs.

Home/Planning: La page qui affiche les manches suite au clique sur un planning, accessible par les admins, utilisateurs et visiteurs.
Permet de consulté l'ordre et le nom d'une manche d'un planning, elle offre également un accès vers les informations de la manche du planning sélectionné.
Le rajout d'une manche ai disponible pour les utilisateurs et administrateurs
La suppression d'une manche n'ai disponible que pour les administrateurs.

Home/Manche: La page qui affiche les informations d'une manche, on y retrouve les utilisateurs qui se sont insrits à cette manche.
Les administrateurs et visiteurs peuvent s'inscrire à une manche.
La supprresion d'un utilisateur dans une manche n'ai disponible que pour les admins, de plus ils dispose d'un affichage suplémentaire, un deuxième tableau.
Celui ci leur permet de facilement rajouter n'importe qu'elle utilisateur sur une manche.

Manage User: Page accessible uniquement par les administrateurs.
Elle permet de consulter les informations des utilisateurs inscrit sur le site ainsi que de savoir s'il sont connecté.
Des bouttons leur permette de déconnecté tout le monde ou tout les admins ou les utilisateurs.

Profile: Page disponbible grâce à l'icone utilisateur en haut a droite de la page, accessible pour les utilisateurs et admins.
Elle permet de facilement visualiser dans quel manches un utilisateur s'est inscrit mais également de se désinscrire des évènements.

Login: Accessible par tous pour se connecter.

Register: Accessible pour les non connecté pour s'enregistrer.

