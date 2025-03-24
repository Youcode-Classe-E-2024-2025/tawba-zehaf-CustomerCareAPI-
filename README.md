# 🛠 CustomerCareAPI - API de Gestion des Tickets d’Assistance Client  

## 📖 Description  

**CustomerCareAPI** est une API REST avancée développée en **Laravel** et dédiée à la gestion des tickets d’assistance client.  
Elle permet aux entreprises de gérer efficacement les demandes de support, d’assigner des tickets aux agents et de suivre l’évolution des requêtes.  

L’API est conçue pour être **robuste, sécurisée et évolutive**, tout en respectant les bonnes pratiques du développement d’API.  

---

## 📌 Fonctionnalités principales  

### 🎫 **Gestion des tickets d’assistance**  
- Création, mise à jour et clôture des tickets.  
- Attribution de catégories et de priorités aux tickets.  
- Association des tickets aux clients et agents.  

### 👨‍💼 **Attribution des demandes aux agents**  
- Affectation automatique ou manuelle des tickets aux agents.  
- Notification aux agents assignés.  
- Gestion intelligente de la charge de travail des agents.  

### 📊 **Suivi de l’état des requêtes**  
- Statuts des tickets : **ouvert, en cours, résolu, fermé**.  
- Historique détaillé des modifications et actions effectuées.  
- Suivi des **temps de réponse** et **délais de résolution**.  

### 📝 **Historique des interactions**  
- Enregistrement des **messages et réponses** associées aux tickets.  
- Suivi des modifications et actions des agents et clients.  
- Génération de **rapports et statistiques** sur l’activité du support.  

---

## 🛠️ Technologies et bonnes pratiques  

- **Laravel** & **Eloquent ORM** pour une gestion fluide des données.  
- **Laravel Sanctum** pour l’authentification et la gestion des permissions.  
- **Swagger (OpenAPI)** pour documenter l’API et simplifier son utilisation.  
- **Tests automatisés avec PHPUnit** pour garantir la robustesse du système.  
- Respect des **principes SOLID** et de l’**architecture RESTful**.  

---

## 🚀 Installation et configuration  

### 1️⃣ Cloner le projet  
```bash
git clone https://github.com/Youcode-Classe-E-2024-2025/tawba-zehaf-CustomerCareAPI-.git
### 2️⃣ Installer les dépendances
composer install 
###3️⃣ Configurer l’environnement
Copiez le fichier .env.example en .env et configurez la connexion à votre base de données pgsql.

###4️⃣ Générer la clé d’application
php artisan key:generate
###5️⃣ Exécuter les migrations et générer les données initiales
php artisan migrate --seed
###6️⃣ Générer la documentation Swagger
php artisan l5-swagger:generate
###7️⃣ Démarrer le serveur
php artisan serve
L’API sera accessible à l’adresse : http://127.0.0.1:8000 🎉

🌐 Consommation de l’API
L’API est conçue consommée par frameworks JavaScript moderne:

React (utilisant Fetch API ou Axios).
La documentation Swagger disponible à /api/documentation facilitera l’intégration avec ces technologies.

📢 Contribuer
Les contributions sont les bienvenues ! Pour proposer des améliorations :

Forkez le dépôt.

Créez une branche :
git checkout -b feature/amélioration
Faites vos modifications et committez-les :
git commit -m "Ajout d’une nouvelle fonctionnalité"
Poussez la branche :
git push origin feature/amélioration
Ouvrez une Pull Request.

📄 Licence
Ce projet est sous licence MIT. Vous êtes libre de l’utiliser et de le modifier selon vos besoins.

🚀 Merci d’utiliser CustomerCareAPI ! 🚀