# ENAA Leave

## 📌 Présentation du projet

**ENAA Leave** est une plateforme web de gestion des congés destinée à simplifier la gestion des demandes de congé au sein de l'ENAA.

L'application permet aux employés de consulter les types de congés disponibles, leur solde, créer des demandes de congé et suivre leur statut.

Les administrateurs peuvent gérer les types de congés, les soldes et les demandes des employés.

---

## 🎯 Objectifs du projet

L'objectif principal de **ENAA Leave** est de digitaliser et simplifier la gestion des congés.

La plateforme permet de :

- Centraliser les informations liées aux congés.
- Faciliter la création des demandes.
- Permettre le suivi des demandes.
- Consulter les soldes de congés.
- Gérer les différents types de congés.
- Faciliter le travail des administrateurs et responsables.

---

## 👥 Utilisateurs

### 👤 Employé

L'employé peut :

- Créer un compte.
- Se connecter à son espace personnel.
- Consulter les types de congés.
- Consulter son solde de congé.
- Créer une demande de congé.
- Ajouter un justificatif.
- Consulter ses demandes.
- Suivre le statut de ses demandes.

### 👨‍💼 Administrateur

L'administrateur peut :

- Se connecter à son espace administrateur.
- Gérer les types de congés.
- Gérer les soldes de congés.
- Consulter les demandes.
- Gérer les demandes des employés.

---

## ⚙️ Fonctionnalités

### 🔐 Authentification

- Inscription
- Connexion
- Déconnexion
- Authentification avec Laravel Sanctum
- Gestion des rôles
- Protection des routes API

### 📋 Gestion des types de congés

- Afficher les types de congés
- Ajouter un type de congé
- Modifier un type de congé
- Supprimer un type de congé
- Définir une durée maximale

### 💳 Gestion des soldes

- Consulter les utilisateurs
- Ajouter un solde
- Associer un solde à un type de congé
- Définir le nombre de jours disponibles

### 📝 Gestion des demandes de congé

- Créer une demande
- Sélectionner un type de congé
- Choisir une date de début
- Choisir une date de fin
- Choisir le type de journée
- Ajouter un motif
- Ajouter un justificatif
- Consulter les demandes
- Suivre le statut de la demande

---

## 🛠️ Technologies utilisées

### Frontend

- React.js
- JavaScript
- Vite
- Axios
- React Router
- CSS

### Backend

- PHP
- Laravel
- Laravel Sanctum
- API REST

### Base de données

- MySQL

### Outils

- Visual Studio Code
- Git
- GitHub
- Postman
- Docker
- XAMPP

---

## 🏗️ Architecture du projet

Le projet est composé de deux parties principales :

```text
ENAA Leave
│
├── backend/
│   └── Laravel API
│
└── frontend/
    └── React Application