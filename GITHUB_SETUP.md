# 🚀 Configuration GitHub Pages - Guide Rapide

## ✅ Ce qui est déjà configuré

- ✅ Workflow GitHub Actions (`.github/workflows/deploy.yml`)
- ✅ Configuration Vite pour GitHub Pages
- ✅ React Router avec basename
- ✅ Fichier `.nojekyll` pour GitHub Pages
- ✅ Tous les textes en français

## ✅ Configuration

Le projet est déjà configuré pour le dépôt **HamaBytes/doc**

- ✅ `vite.config.js` : base path = `/doc/`
- ✅ `src/App.jsx` : basename = `/doc`

## 📤 Commandes pour pousser sur GitHub

```bash
# 1. Initialiser Git (si pas déjà fait)
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Créer le commit
git commit -m "Initial commit - Documentation TechSolutions"

# 4. Renommer la branche
git branch -M main

# 5. Ajouter le remote
git remote add origin https://github.com/HamaBytes/doc.git

# 6. Pousser
git push -u origin main
```

## ⚙️ Activer GitHub Pages

1. Allez sur votre dépôt GitHub
2. **Settings** → **Pages**
3. **Source** : Sélectionnez **"GitHub Actions"**
4. Le workflow se déclenchera automatiquement

## 🌐 Votre site sera sur

```
https://hamabytes.github.io/doc/
```

## 📝 Checklist

- [x] Nom du dépôt configuré dans `vite.config.js` ✅
- [x] Nom du dépôt configuré dans `src/App.jsx` ✅
- [ ] Code poussé sur GitHub
- [ ] GitHub Pages activé (Source: GitHub Actions)
- [ ] Workflow terminé avec succès

## 🎉 C'est tout !

Voir [INSTRUCTIONS.md](./INSTRUCTIONS.md) pour plus de détails.

