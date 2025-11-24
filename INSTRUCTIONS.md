# 📋 Instructions de Déploiement - GitHub Pages

## ⚡ Déploiement Rapide (5 minutes)

### Étape 1 : Créer le dépôt GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur "New repository"
3. Nommez-le (ex: `techsolutions-network-docs`)
4. **Ne cochez PAS** "Add a README file"
5. Cliquez sur "Create repository"

### Étape 2 : Configuration ✅

**Le projet est déjà configuré pour le dépôt `HamaBytes/doc`**

- ✅ `vite.config.js` : base path = `/doc/`
- ✅ `src/App.jsx` : basename = `/doc`

Aucune modification nécessaire !

### Étape 3 : Pousser le code sur GitHub

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - Documentation TechSolutions"

# Renommer la branche en main
git branch -M main

# Ajouter le remote GitHub
git remote add origin https://github.com/HamaBytes/doc.git

# Pousser le code
git push -u origin main
```

### Étape 4 : Activer GitHub Pages

1. Allez sur votre dépôt GitHub
2. Cliquez sur **Settings** (en haut à droite)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Sous **Source**, sélectionnez **"GitHub Actions"**
5. Le workflow se déclenchera automatiquement

### Étape 5 : Attendre le déploiement

1. Allez dans l'onglet **Actions** de votre dépôt
2. Vous verrez un workflow "Déploiement GitHub Pages" en cours
3. Attendez 2-3 minutes que le déploiement se termine
4. Une fois terminé, cliquez sur le workflow et vous verrez un lien vers votre site

### Étape 6 : Accéder à votre site

Votre site sera disponible sur :
```
https://hamabytes.github.io/doc/
```

## 🔄 Mettre à jour le site

Après chaque modification :

```bash
git add .
git commit -m "Description des modifications"
git push origin main
```

Le site se mettra à jour automatiquement en 2-3 minutes.

## 🐛 Problèmes Courants

### Le site affiche une page blanche

**Solution** : Vérifiez que GitHub Pages est bien activé et que le workflow s'est terminé avec succès.

### Les liens ne fonctionnent pas

**Solution** : Assurez-vous que le `basename` dans `App.jsx` correspond au nom du dépôt.

### Erreur 404 sur les pages

**Solution** : Vérifiez que le fichier `public/.nojekyll` existe bien.

### Le workflow échoue

**Solution** : 
- Vérifiez que toutes les dépendances sont dans `package.json`
- Vérifiez les logs dans l'onglet "Actions" pour plus de détails

## 📝 Checklist de Déploiement

- [x] Dépôt GitHub : `HamaBytes/doc` ✅
- [x] Nom du dépôt configuré dans `vite.config.js` ✅
- [x] Nom du dépôt configuré dans `src/App.jsx` ✅
- [ ] Code poussé sur GitHub
- [ ] GitHub Pages activé (Source: GitHub Actions)
- [ ] Workflow terminé avec succès
- [ ] Site accessible sur https://hamabytes.github.io/doc/

## 🎉 C'est tout !

Votre site est maintenant en ligne ! Partagez l'URL avec votre équipe.

---

**Besoin d'aide ?** Consultez [DEPLOY.md](./DEPLOY.md) pour plus de détails.

