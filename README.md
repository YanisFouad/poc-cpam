- [Mise en place de l'environnement de développement](#mise-en-place-de-lenvironnement-de-développement)
  - [Prérequis](#prérequis)
  - [Installation](#installation)
  - [Extension Visual Studio Code](#extension-visual-studio-code)
- [Frontend](#frontend)
  - [Installation](#installation-1)
  - [SCSS](#scss)
    - [Ajouter un fichier SCSS à l'application](#ajouter-un-fichier-scss-à-lapplication)
  - [JS](#js)
    - [Ajouter un fichier JS à toute l'application](#ajouter-un-fichier-js-à-toute-lapplication)
    - [Ajouter un fichier JS à une page spécifique](#ajouter-un-fichier-js-à-une-page-spécifique)


## Mise en place de l'environnement de développement
L'environnement est fait pour être utilisé uniquement en utilisant Docker (pas besoin de PHP, Composer, MySQL, Node.js, etc. sur votre machine).
### Prérequis
- Docker
- Docker-compose

### Installation
1. Cloner le dépôt : `git clone`
2. Se rendre dans le dossier du projet
3. Copier le fichier `.env.dist` en `.env` : `cp .env.dist .env`
4. Modifier les variables d'environnement si besoin
5. Lancer les conteneurs : `docker-compose up -d`
6. Admirer le magnifique site à l'adresse `http://localhost:8080`
7. Si besoin de lancer des commandes Symfony, Node ou tout ce que tu veux, se rendre dans le conteneur PHP : `docker-compose exec php bash`
8. Pour se connecter à la base de données 2 solutions :
    - Se connecter à la base de données avec un client SQL (ex: HeidiSQL) :
        - Hôte : `localhost`
        - Port : `3306`
        - Utilisateur : `root`
        - Mot de passe : `root`
    - Se connecter à PHPMyAdmin à l'adresse `http://localhost:8081` :
        - Utilisateur : `root`
        - Mot de passe : `root`

### Extension Visual Studio Code
- PHP Intelephense
- PHP DocBlocker
- Twig Language 2

## Frontend
Le frontend est géré par Webpack Encore, il permet de compiler les fichiers SCSS et JS dans une application Symfony. (https://symfony.com/doc/4.x/frontend.html)

### Installation
1. Se rendre dans le conteneur PHP : `docker-compose exec php bash`
2. S'assurer que les dépendances sont à jour : `npm i`
3. Compiler les fichiers : `npm run watch` (compilation des fichiers à chaque modification)

### SCSS
Par défaut tout le style est dans le fichier `app.scss`, il est compilé automatiquement en `app.css` dans le dossier `public/css/` à chaque modification.

#### Ajouter un fichier SCSS à l'application
1. Créer un fichier SCSS dans le dossier `assets/styles/`
2. Importer le fichier dans `app.scss` avec la commande `@import 'nom-du-fichier';`
3. Admirer son magnique style

### JS
#### Ajouter un fichier JS à toute l'application
1. Créer un fichier JS dans le dossier `assets/js/`
2. Importer le fichier dans `app.js` avec la commande `import './nom-du-fichier';` (sans l'extension)
3. Admirer son magnique script qui ne fonctionne pas

#### Ajouter un fichier JS à une page spécifique
1. Créer un fichier JS dans le dossier `assets/js/`
2. Dans `webpack.config.js`, une entrée avec comme clé le nom du fichier et comme valeur le chemin vers le fichier :
```javascript
.addEntry('mon-script', './assets/js/mon-script.js')
```
3. Dans le fichier Twig de la page, ajouter le script avec la commande `{{ encore_entry_script_tags('mon-script') }}`
4. Admirer son magnique script qui fonctionne
