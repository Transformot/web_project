# Projet Web : un chat centralisé

Le projet est à réaliser par groupe de trois, et à rendre pour le **14/01/23**.  
Les seuls outils disponibles sont ceux utilisés en classe, c'est-à-dire **Django**, **JQuery** et **Bootstrap**.  
La logique à avoir est une logique *orientée objet*.  
Les commentaires sont nécessaires pour comprendre le code des autres et fournir une documentation.  
Les *coding style* sont à respecter (par ex. **PEP8** pour *Python* et **JavaScript Styleguide** pour *JavaScript*).  

## Cahier des charges :

- Django côté serveur / JavaScript côté client
- Système de login (inscription + connexion)
- Création de salons de discussion
- Possibilité d'avoir plusieurs salons
- Implémentation de fonctions de modération et de droits
- Gestion des emojis

> **Transformot** : En gros, on doit faire un *Discord* v2 ?!  
> **Tolosmoc** : Bon courage !

### Membres du projet :

- `Transformot` : Pierre GIEN
- `Tolosmoc` : Guilhem LACASSAGNE
- `Six_quart` : Arthur SICARD

### Palette de couleur :

- Bleu clair : `#8BA5D6`
- Jaune : `#FFDC00`
- Bleu foncé : `#005CA8`

## Choix pris :

### Pour définir les rôles de chaque language :
- la partie serveur sera géré par Django/Python et elle aura pour rôle de d'héberger le site, stocker les données, les fichier et de gérer les données.
- la partie client sera géré par du HTML, du CSS et du JavaScript. Le JS aura pour rôle d'afficher dynamiquement les données.

#### - HTML :
  3 pages: index.html, sign.html, chat.html
  
#### - CSS :
  style.css --> index.html, conection/inscription.html, chat.html
  homepage.css --> index.html
  fichier.css --> conection/inscription.html
  chatpage.css --> chat.html
  style-sign.css --> sign.html
  
#### - Python :
  
#### - JavaScript :
  traitement.js --> gère l'envoie et la reception de message
                    la création d'un nouveau salon
                    rejoindre un salon
                    etc...
                    
  connection.js --> gère le formulaire d'inscription
                    la connexion
                    l'annimation inscription/connexion
                    
  index-sign.js --> gère l'animation entre la page de connextion et d'inscription
  
### Partie envoie/reception de message :

  Pour parler entre le client et le serveur, on fait des requêtes HTTP avec le format de données JSON. Après s'être connecté, on est diriger sur la page de chat d'accuiel, on clique sur un salon dans la barre de navigation à gauche. Il s'affiche la boite de dialogue avec les 5 derniers message du salon. Donc le JS/JQuery a fait une demande des 5 derniers message (en requête HTTP avec datatype JSON avec methode GET), Python/Django reçoie la demande, va dans sa base de donné en SQL, il prend les 5 derniers message du bon salon et il revoie les data en datatype JSON, JS récupère les donné en JSON les converti et les affiche correctement sur le site.
  Pour envoyer un message, JS/JQuery envoie (en requete HTTP avec datatype JSON avec la méthode PUT) son message qui est recue par Python/Django qui se charge d'ajouter les nouvelles données à sa base de données. 
  Pour recevoir un message, Python/Django envoie (en requete HTTP avec datatype JSON avec la méthode PUT) à toutes les personnes connectées du salon le dernier message, JS/JQuery recoit la requete et affiche le message.
  
### Gestion des salons :

les salons sont tous public (pour l'instant)
pour y accéder, il faut connaitre leur code (id)
chaque salon a:
- son créateur
- liste de discuteur
- liste de banni

  
  
  
  
  
  
  
