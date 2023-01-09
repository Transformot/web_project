# Role des technologies :

- HTML/CSS :  
responsive
mettre le meme style sur les 3 pages, mettre tout en ordre
chat.html link style.css et booot.css
bien renommer les fichier fichier.html et fichier.css


- Django :  
crée les models
relier les pages
regarder protocole HTTP
recupération et sauvegarde de données SQL
convertion JSON/SQL

## Requete HTTP coté serveur :

### inscription : 
-reçois "User_name","MDP". Créer un nouvelle utilisateur dans BdD_(base de donné) avec "MDP","User_name","User_id"=nb_user+1,"Liste_channel"=[].

### connexion : 
-reçois "User_name","MDP". Compare avec BdD, renvoie à l'utilisateur 'None' si faux, sinon "User_id","Liste_channel".

### création salon : 
-reçois "Channel_name","User_id". Crée un nouveau salon "Channel_id" avec "Liste_user" associé initialisé avec "User_id","State_user"=0(non présent),"Role_user"=0(chef). Renvoie à l'utilisateur "Liste_salon" modifié.

### rejoindre le salon : 
- reçois "Channel_id","User_id". Ajoute "User_id","State_user"=0,"Role_user"=1(classique) à "Liste_user" du salon. Renvoie à l'utilisateur "Liste_salon" modifié.
- base de donné modifier : utilisateur du salon -> envoie la modification (nouveau membre) à toutes les personnes actifs.

### aller dans le salon :
- reçois "Channel_id","User_id". Modifie "State_user"=1(présent) de "Liste_user" du salon. Renvoie à l'utilisateur "historique_message".
- base de donné modifier : utilisateur du salon -> envoie la modification (membre arrivé) à toutes les personnes actifs.

### partir du salon :
- reçois "Channel_id","User_id". Modifie "State_user"=0 de "Liste_user" du salon. Renvoie à l'utilisateur 'None'.
- base de donné modifier : utilisateur du salon -> envoie la modification (membre départ) à toutes les personnes actifs.

### quitter le salon :
- reçois "Channel_id","User_id". Supprime "User_id" de "Liste_user" du salon et supprime "Channel_id" de "Liste_channel" de l'utilisateur. Renvoie à l'utilisateur "Liste_channel" modifié.
- base de donné modifier : utilisateur du salon -> envoie la modification (ancien membre) à toutes les personnes actifs.

### bannir du salon :
- reçois "Channel_id","User_id". Modifie "State_user"=2(banni) de "Liste_user" du salon et supprime "Channel_id" de "Liste_channel" de l'utilisateur banni.
- base de donné modifier : utilisateur du salon -> envoie la modification (membre banni) à toutes les personnes actifs du salon.
- base de donné modifier : liste des salons -> envoie à l'utilisateur banni si présent "Liste_channel" modifié.

### envoyer message : 
- reçois un "Date","User","Role","Msg". Ajoute message à BdD. Renvoie à l'utilisateur 'ok'
- base de donné modifier : messages du salon -> envoie la modification (dernier message) à toutes les personnes actifs.

## Models Django :

### class User (models.Model)
username = models.CharField(man_length=20)
password = models.CharField(man_length=20)

### class Channel (models.Model)
name = models.CharField(man_length=20)
User = models.ManyToManyField(User, related_name = "channels"

### class Message (models.Model)

channel = models.
date = models.CharField(man_lenth=7)
user = models.ForienKey(User, on_delet=SET_NULL, related_name="messages")
data = models.CharField(man_lenth=300)




