# 🚀 Guide de Déploiement sur GitHub Pages

Ce guide vous explique comment déployer l'application sur GitHub Pages.

## 📋 Prérequis

1. Un compte GitHub
2. Un dépôt GitHub (créé ou existant)
3. Node.js 18+ installé localement

## 🔧 Configuration Initiale

### 1. Dépôt GitHub

✅ Le dépôt est déjà créé : **HamaBytes/doc**

### 2. Configuration ✅

**Le projet est déjà configuré** pour le dépôt `HamaBytes/doc` :

- ✅ `vite.config.js` : base path = `/doc/`
- ✅ `src/App.jsx` : basename = `/doc`

Aucune modification nécessaire !

### 3. Initialiser Git (si pas déjà fait)

```bash
git init
git add .
git commit -m "Initial commit - Documentation TechSolutions"
git branch -M main
git remote add origin https://github.com/HamaBytes/doc.git
git push -u origin main
```

## 🌐 Déploiement Automatique

### Option 1 : GitHub Actions (Recommandé)

1. **Activer GitHub Pages** :
   - Allez dans Settings → Pages de votre dépôt
   - Source : "GitHub Actions"

2. **Le workflow est déjà configuré** dans `.github/workflows/deploy.yml`
   - Il se déclenche automatiquement à chaque push sur `main`
   - Vous pouvez aussi le déclencher manuellement dans l'onglet "Actions"

3. **Vérifier le déploiement** :
   - Allez dans l'onglet "Actions" de votre dépôt
   - Attendez que le workflow se termine (environ 2-3 minutes)
   - Votre site sera disponible sur : `https://hamabytes.github.io/doc/`

### Option 2 : Déploiement Manuel

```bash
# Build de l'application
npm run build

# Le dossier dist/ contient les fichiers à déployer
# Vous pouvez utiliser gh-pages ou déployer manuellement
```

## 🔄 Mise à Jour

Pour mettre à jour le site après des modifications :

```bash
git add .
git commit -m "Description des modifications"
git push origin main
```

Le déploiement se fera automatiquement via GitHub Actions.

## ⚙️ Configuration Avancée

### Changer le nom du dépôt

Si vous changez le nom de votre dépôt :

1. Mettez à jour `vite.config.js` et `src/App.jsx` avec le nouveau nom
2. Mettez à jour l'URL du remote :
   ```bash
   git remote set-url origin https://github.com/HamaBytes/NOUVEAU-NOM.git
   ```

### Déploiement sur un sous-domaine personnalisé

1. Créez un fichier `CNAME` dans le dossier `public/` :
   ```
   votre-domaine.com
   ```

2. Configurez votre DNS selon la [documentation GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## 🐛 Dépannage

### Le site ne se charge pas

- Vérifiez que GitHub Pages est activé dans Settings → Pages (Source: GitHub Actions)
- Vérifiez les logs dans l'onglet "Actions"
- Vérifiez que le workflow s'est terminé avec succès

### Les routes ne fonctionnent pas

- Assurez-vous que le `basename` dans `App.jsx` correspond au nom du dépôt
- Vérifiez que le fichier `public/.nojekyll` existe

### Build échoue

- Vérifiez que toutes les dépendances sont installées : `npm install`
- Vérifiez les logs dans l'onglet "Actions" pour plus de détails

## 📝 Notes

- Le déploiement prend généralement 2-3 minutes
- Les modifications peuvent prendre quelques minutes à apparaître (cache GitHub)
- Le site est accessible en HTTPS automatiquement

---

**Besoin d'aide ?** Consultez la [documentation GitHub Pages](https://docs.github.com/en/pages)

