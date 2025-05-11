# AppliWeb N7 - Documentation

## Environnement requis

- **Node.js** : Version 22.10 recommandée (version minimale 19)
- **Système d'exploitation** : Linux (testé sur Ubuntu)

## Structure du projet

### Organisation des répertoires

- **db/** : Contient les fichiers pour la base de données
  - `db.sql` : Script de création du modèle conforme au schéma (non testé car SpringBoot s'en charge)

- **web-app/** : Contient le frontend (interface web)

- **n7/** : Contient le backend

- **LIRE/** : Documentation importante sur les relations entre entités et autres informations
  - Il est fortement recommandé de lire au moins les DTOs

## Démarrage rapide

### Installation des dépendances (si non installées)

```bash
# Rendre le script exécutable si nécessaire
chmod +x dependance.sh

# Exécuter le script d'installation
source dependance.sh
```

### Lancement de l'application

```bash
# Rendre le script exécutable si nécessaire
chmod +x start.sh

# Lancer l'application complète
source start.sh
```

## Démarrage manuel (si le lancement automatique échoue)

### 1. Démarrer la base de données HSQLDB

```bash
source source.sh
```

### 2. Lancer le backend (SpringBoot)

Deux options :
- **Via IDE** : Ouvrir et lancer le projet dans votre IDE
- **Via ligne de commande** :
  ```bash
  # Si Maven est installé globalement
  cd n7
  mvn spring-boot:run
  
  # Si Maven n'est pas installé globalement
  cd n7
  ./mvnw spring-boot:run
  ```

### 3. Lancer le frontend

```bash
cd web-app

# Installer les dépendances (si première fois)
npm install

# Lancer le serveur de développement
npm run dev
```

---

**Note** : Pour une compréhension complète des modèles et relations, consultez les fichiers dans le répertoire LIRE/.

