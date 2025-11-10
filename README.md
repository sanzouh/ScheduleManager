# ScheduleManager

Plateforme collaborative pour la création et la gestion d'emploi du temps universitaire.

## 📋 Description

ScheduleManager est une application web permettant de gérer efficacement les emplois du temps universitaires. Elle permet de :
- Créer et gérer des cours
- Assigner des professeurs aux cours
- Gérer les salles et les créneaux horaires
- Organiser les classes par niveau et parcours
- Éviter les conflits d'horaires

## 🚀 Technologies utilisées

### Backend
- **Node.js** avec **Express** (serveur API REST)
- **Prisma** (ORM)
- **SQLite** (base de données)
- **Jest** (tests unitaires)
- **Express Validator** (validation des données)

### Frontend
- **React 19** avec **Vite**
- **ESLint** (qualité de code)

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** (version 18 ou supérieure)
- **npm** (inclus avec Node.js)
- **Git**

## 🔧 Installation

### 1. Cloner le projet

```bash
git clone http://local_proxy@127.0.0.1:47842/git/sanzouh/ScheduleManager.git
cd ScheduleManager
```

### 2. Installation du Backend

```bash
# Accéder au dossier backend
cd backend

# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Créer et initialiser la base de données
npx prisma migrate dev

# (Optionnel) Remplir la base avec des données de test
npm run seed
```

### 3. Configuration de l'environnement Backend

Créez un fichier `.env` dans le dossier `backend/` avec les variables suivantes :

```env
DATABASE_URL="file:./db/schedule.db"
PORT=3000
```

### 4. Installation du Frontend

```bash
# Retourner à la racine puis accéder au dossier frontend
cd ../frontend

# Installer les dépendances
npm install
```

### 5. Configuration de l'environnement Frontend

Créez un fichier `.env` dans le dossier `frontend/` si nécessaire (pour configurer l'URL de l'API) :

```env
VITE_API_URL=http://localhost:3000
```

## 🚀 Lancement du projet

### Lancement en mode développement

Vous aurez besoin de **deux terminaux** :

**Terminal 1 - Backend :**
```bash
cd backend
npm run dev
```
Le serveur backend démarre sur `http://localhost:3000`

**Terminal 2 - Frontend :**
```bash
cd frontend
npm run dev
```
Le serveur frontend démarre sur `http://localhost:5173`

### Autres commandes utiles

**Backend :**
```bash
npm run dev      # Lance le serveur en mode développement avec rechargement automatique
npm start        # Lance le serveur en mode production
npm run seed     # Remplit la base de données avec des données de test
npm test         # Lance les tests unitaires
```

**Frontend :**
```bash
npm run dev      # Lance le serveur de développement
npm run build    # Compile l'application pour la production
npm run preview  # Prévisualise la version de production
npm run lint     # Vérifie la qualité du code
```

## 📁 Structure du projet

```
ScheduleManager/
├── backend/                # API REST Node.js
│   ├── prisma/            # Schéma et migrations Prisma
│   │   ├── schema.prisma  # Définition du modèle de données
│   │   └── seed.js        # Script de données de test
│   ├── src/               # Code source
│   │   ├── server.js      # Point d'entrée de l'application
│   │   ├── routes/        # Routes API
│   │   └── controllers/   # Logique métier
│   └── package.json       # Dépendances backend
│
├── frontend/              # Application React
│   ├── src/               # Code source
│   │   ├── App.jsx        # Composant principal
│   │   └── components/    # Composants React
│   ├── public/            # Fichiers statiques
│   └── package.json       # Dépendances frontend
│
└── README.md              # Ce fichier
```

## 🗄️ Modèle de données

Le système gère les entités suivantes :
- **Matières** : Les cours enseignés (Algorithmique, Base de données, etc.)
- **Professeurs** : Les enseignants (permanents ou vacataires)
- **Classes** : Les groupes d'étudiants (L1, L2, M1, M2, etc.)
- **Salles** : Les locaux disponibles (standard, labo, amphi)
- **Créneaux** : Les plages horaires de cours
- **Cours** : L'association de tous ces éléments dans l'emploi du temps

## 🔐 Contraintes et validations

Le système implémente des contraintes importantes :
- Une classe ne peut pas avoir deux cours au même moment
- Un professeur ne peut pas avoir deux cours simultanément
- Une salle ne peut pas être utilisée par deux cours en même temps

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commiter vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pousser vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request
