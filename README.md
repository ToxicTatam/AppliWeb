ENVIRONNEMENT : NODE JS  VERSION 22.10 (la mienne) , peut etre qu'une version inferieure peut marcher mais pas moins de la 19 je pense.
Tout ce qui va suivre ne marche que sur LINUX et testé sur UBUNTU.

EXPLICATION DU CONTENU 

Le repertoire db ---> pour la base de donnée, (c'est un fork de ce qui nous a été donnée en TP) . db.sql est un script de creation du modele conforme à notre schema
remarque: je n ai pas testé db.sql, car je laisse springboot le creer pour moi.

Le repertoire web-app c'est pour le frontend(interfca web)
Le repertoire n7 ---> le backend
Le repertoire LIRE contient les relations entre les entités, et toutes les informations sur celles-ci. Il est conseillé de le lire (au moins les dtos)


ASTUCE POUR LE LANCEMENT D'UN COUP

faite juste depuis le repertoire contenant les projets

SI VOUS N AVEZ PAS INSTALLER LES DEPENDANCES, SI OUI VOUS POUVEZ SAUTER ET ALLER À L ETAPE SUIVANTE

source dependance.sh  (si un probleme est rencontré, faite d abord chmod +x dependance.sh)

---------------------------------------
source start.sh (si un probleme est rencontré, faite d abord chmod +x start.sh)




SI L ETAPE PRECEDENTE NE MARCHE PAS , VOUS POUVEZ FAIRE
Pour lancer le projet, 
demarrer d'abord la base de donnée(hsqldb), en tapant source.sh 

puis vous pouvez lancer independament le back ou le front
(je recommande de lancer le back mais libre à vous)
vous pouvez le lancer depuis votre ide ou tout simplement en vous placant dans le repertoire et tapez la commande : mvn spring-boot:run (si maven installé glovalement) 
ou ./mvnw spring-boot:run sinon



puis le frontend , depuis le terminal (dans le repertoire racine et apres avoir installé les dependances via npm install): npm run dev



