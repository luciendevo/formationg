# Formation G CRM - Guide de Déploiement Netlify Complet

## 📋 Prérequis

- Compte Netlify (gratuit ou payant)
- Compte Supabase (pour la base de données PostgreSQL)
- Repository Git (GitHub, GitLab, ou Bitbucket)
- Node.js 18+ installé localement
- Compte email pour les notifications (Gmail recommandé)

## 🚀 Étapes de Déploiement

### 1. Préparation de la Base de Données

#### A. Création du Projet Supabase
1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet "formation-g-crm"
3. Noter l'URL du projet et la clé API anonyme
4. Aller dans SQL Editor et exécuter :
   ```sql
   -- Copier le contenu de database/formation_g_schema.sql
   -- Puis exécuter database/seed_data.sql
   ```

#### B. Configuration RLS (Row Level Security)
```sql
-- Activer RLS sur les tables sensibles
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cpf_submissions ENABLE ROW LEVEL SECURITY;
-- Voir le fichier schema.sql pour toutes les politiques
```

### 2. Déploiement sur Netlify

#### A. Déploiement via Git (Recommandé)

1. **Connecter le Repository**
   - Aller sur [netlify.com](https://netlify.com)
   - Cliquer "New site from Git"
   - Choisir GitHub/GitLab/Bitbucket
   - Sélectionner le repository `zenacademyLP`

2. **Configuration Build (Auto-détectée via netlify.toml)**
   ```toml
   [build]
     publish = "dist"
     command = "npm run build"
     functions = "netlify/functions"
   
   [build.environment]
     NODE_VERSION = "18"
     NPM_VERSION = "9"
   ```

3. **Variables d'Environnement Obligatoires**
   Dans Site settings > Environment variables, ajouter :
   ```
   VITE_APP_NAME=Formation G CRM
   VITE_APP_URL=https://votre-site.netlify.app
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=votre-cle-anonyme-supabase
   JWT_SECRET=votre-secret-jwt-super-securise
   SUPABASE_SERVICE_ROLE_KEY=votre-cle-service-supabase
   ```

4. **Variables d'Environnement Optionnelles**
   ```
   VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   SMTP_HOST=smtp.gmail.com
   SMTP_USER=votre-email@formationg.fr
   SMTP_PASS=votre-mot-de-passe-app
   ```

#### B. Déploiement Manuel (Alternative)

1. **Build Local**
   ```bash
   npm install
   npm run build
   ```
# 2. Drag & drop le dossier 'dist' sur netlify.com
```

## ⚡ Optimisations Incluses

### 🔒 Sécurité
- Headers de sécurité (CSP, XSS Protection)
- Protection contre le clickjacking
- Référrer policy strict

### 🚀 Performance
- Cache immutable pour les assets (1 an)
- Cache optimisé pour les images (1 semaine)
- Preload des ressources critiques
- Compression automatique

### 🔄 SPA Support
- Redirections pour React Router
- Fallback vers index.html pour toutes les routes

## 📊 Métriques de Performance

### Lighthouse Score Attendu
- ✅ Performance: 95+
- ✅ Accessibility: 100
- ✅ Best Practices: 100
- ✅ SEO: 95+

### Taille du Bundle
- CSS: ~49KB (8KB gzipped)
- JS: ~202KB (59KB gzipped)
- Total: ~250KB optimisé

## 🌐 Domaine Personnalisé (Optionnel)

1. **Aller dans Site settings > Domain management**
2. **Ajouter votre domaine**
3. **Configurer les DNS** selon les instructions Netlify
4. **SSL automatique** activé par défaut

## 🔍 Monitoring et Analytics

### Netlify Analytics (Payant)
- Trafic en temps réel
- Performance monitoring
- Géolocalisation des visiteurs

### Google Analytics (Gratuit)
```javascript
// À ajouter dans index.html si souhaité
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## 🛠️ Commandes Utiles

```bash
# Test local
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview

# Lint
npm run lint

# Test du build localement
npx serve dist
```

## 🚨 Résolution de Problèmes

### Build Failed
1. Vérifier les erreurs dans les logs Netlify
2. Tester le build localement: `npm run build`
3. Vérifier la version Node.js (.nvmrc)

### 404 sur les routes
- ✅ Fichier `_redirects` présent
- ✅ Configuration `netlify.toml` active

### Performance Lente
1. Vérifier la taille des images
2. Analyser le bundle avec `npm run build -- --analyze`
3. Optimiser les imports

## 📱 Test Multi-Device

Après déploiement, tester sur :
- ✅ Desktop (Chrome, Firefox, Safari)
- ✅ Mobile (iOS Safari, Android Chrome)
- ✅ Tablet
- ✅ Lecteurs d'écran

## 🎯 Checklist Pré-Déploiement

- [x] Build réussi localement
- [x] Lint sans erreurs
- [x] Tests d'accessibilité OK
- [x] Images optimisées
- [x] Meta tags SEO complets
- [x] Responsive design testé
- [x] Performance Lighthouse > 90

## 📞 Support

En cas de problème :
1. Consulter les logs de build Netlify
2. Vérifier la documentation Netlify
3. Tester localement avec les mêmes paramètres

---
✨ **Application prête pour la production !** ✨