# Formation G CRM - Base de Données

## 📁 Structure des Fichiers

- **`formation_g_schema.sql`** : Schéma complet de la base de données PostgreSQL
- **`seed_data.sql`** : Données d'exemple pour le développement et les tests
- **`README.md`** : Ce fichier de documentation

## 🗄️ Architecture de la Base de Données

### Tables Principales

#### **Users & Authentication**
- `users` : Profils utilisateurs avec authentification
- `user_sessions` : Gestion des sessions JWT
- Politiques RLS pour la sécurité

#### **Training System**
- `training_categories` : Catégories de formation (Web, Data, Marketing, etc.)
- `trainings` : Programmes de formation avec détails complets
- `training_sessions` : Sessions programmées avec instructeurs
- Support CPF intégré

#### **CPF Form System**
- `cpf_submissions` : Soumissions de formulaires CPF avec scoring
- `cpf_questions` : Configuration des 50 questions détaillées
- Logique conditionnelle et validation

#### **Enrollment & Progress**
- `enrollments` : Inscriptions avec suivi de progression
- `notifications` : Système de notifications
- Gestion des paiements et certifications

#### **Analytics & Reporting**
- `activity_logs` : Journalisation des activités
- `system_metrics` : Métriques système
- Vues pour tableaux de bord

## 🚀 Installation

### 1. Avec Supabase (Recommandé)

```sql
-- 1. Créer un nouveau projet sur supabase.com
-- 2. Aller dans SQL Editor
-- 3. Copier-coller le contenu de formation_g_schema.sql
-- 4. Exécuter le script
-- 5. Copier-coller le contenu de seed_data.sql
-- 6. Exécuter les données d'exemple
```

### 2. Avec PostgreSQL Local

```bash
# Créer la base de données
createdb formation_g_crm

# Exécuter le schéma
psql -d formation_g_crm -f database/formation_g_schema.sql

# Insérer les données d'exemple
psql -d formation_g_crm -f database/seed_data.sql
```

## 🔒 Sécurité

### Row Level Security (RLS)
- Activé sur toutes les tables sensibles
- Politiques pour admin/user séparées
- Protection des données personnelles

### Authentification
- JWT avec expiration configurable
- Hachage bcrypt pour les mots de passe
- Sessions trackées avec IP/User-Agent

## 📊 Données d'Exemple

### Utilisateurs de Test
- **Admin** : admin@formationg.fr / Admin@2022
- **User** : user@formationg.fr / User@2022
- **50 utilisateurs** avec profils réalistes

### Formations
- **5 catégories** : Web, Data, Marketing, Management, Design
- **50 formations** avec descriptions complètes
- **Sessions programmées** Décembre 2022 - Janvier 2023

### Formulaire CPF
- **50 questions détaillées** réparties en 6 étapes
- **Logique conditionnelle** et validation
- **Système de scoring** intégré

## 🔧 Maintenance

### Backup
```sql
-- Export complet
pg_dump formation_g_crm > backup_$(date +%Y%m%d).sql

-- Import
psql -d formation_g_crm -f backup_20250111.sql
```

### Monitoring
```sql
-- Statistiques utilisateurs
SELECT COUNT(*) as total_users, 
       COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users
FROM users;

-- Formations populaires
SELECT t.title, COUNT(e.id) as enrollments
FROM trainings t
LEFT JOIN training_sessions ts ON t.id = ts.training_id
LEFT JOIN enrollments e ON ts.id = e.session_id
GROUP BY t.id, t.title
ORDER BY enrollments DESC;
```

## 🔄 Migrations

Pour les futures mises à jour, créer des fichiers de migration :
```sql
-- migrations/001_add_new_feature.sql
ALTER TABLE users ADD COLUMN new_field VARCHAR(100);
```

## 📞 Support

- **Documentation PostgreSQL** : [postgresql.org/docs](https://postgresql.org/docs)
- **Documentation Supabase** : [supabase.com/docs](https://supabase.com/docs)
- **Issues** : Créer une issue sur le repository GitHub

---

✨ **Base de données prête pour Formation G CRM !** ✨
