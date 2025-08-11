# Formation G CRM - Guide de Dépannage

## 🚨 Erreur MIME Type (JavaScript Modules)

### **Erreur :**
```
Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/octet-stream"
```

### **Cause :**
Netlify ne reconnaît pas les fichiers `.js` comme des modules JavaScript ES6.

### **✅ Solutions Appliquées :**

#### 1. **Configuration `netlify.toml`**
```toml
[[headers]]
  for = "*.js"
  [headers.values]
    Content-Type = "application/javascript; charset=utf-8"

[[headers]]
  for = "*.mjs"
  [headers.values]
    Content-Type = "application/javascript; charset=utf-8"
```

#### 2. **Fichier `public/_headers`**
```
/*.js
  Content-Type: application/javascript; charset=utf-8

/*.mjs
  Content-Type: application/javascript; charset=utf-8
```

### **🔄 Étapes de Résolution :**

1. **Re-déployer** l'application avec les nouveaux fichiers
2. **Vider le cache** du navigateur (Ctrl+F5)
3. **Attendre 2-3 minutes** pour la propagation Netlify
4. **Tester** sur un navigateur en mode incognito

### **🔍 Vérification :**
```bash
# Vérifier les headers dans les DevTools
Network > main.tsx > Response Headers
Content-Type: application/javascript; charset=utf-8
```

---

## 🚨 Autres Erreurs Courantes

### **404 sur les Routes React**
**Solution :** Le fichier `public/_redirects` redirige tout vers `index.html`

### **Variables d'Environnement Non Trouvées**
**Solution :** Ajouter dans Netlify Dashboard > Site settings > Environment variables

### **Build Failed**
**Solutions :**
1. Vérifier `package.json` et dépendances
2. Vérifier la version Node.js (18+)
3. Consulter les logs de build Netlify

### **Fonctions Serverless Erreur**
**Solutions :**
1. Vérifier `netlify/functions/` existe
2. Vérifier les variables d'environnement
3. Tester localement avec `netlify dev`

---

## 📞 Support

Si les problèmes persistent :
1. **Logs Netlify** : Site overview > Functions > View logs
2. **DevTools Browser** : Console + Network tabs
3. **Netlify Support** : [docs.netlify.com](https://docs.netlify.com)

---

✨ **Formation G CRM - Prêt pour la production !** ✨
