# 🚀 Activation GitHub Pages - Guide Étape par Étape

## ✅ Votre code est déjà sur GitHub !

Le dépôt est configuré : `https://github.com/HamaBytes/doc`

## 📋 Étapes pour Activer GitHub Pages

### Étape 1 : Aller sur votre dépôt GitHub

1. Ouvrez votre navigateur
2. Allez sur : **https://github.com/HamaBytes/doc**
3. Connectez-vous si nécessaire

### Étape 2 : Accéder aux Paramètres

1. Cliquez sur l'onglet **"Settings"** (en haut du dépôt, à droite)
   - Si vous ne voyez pas "Settings", vérifiez que vous êtes connecté et que vous avez les droits d'administration

### Étape 3 : Activer GitHub Pages

1. Dans le menu de gauche, faites défiler jusqu'à **"Pages"** (dans la section "Code and automation")
2. Cliquez sur **"Pages"**

### Étape 4 : Configurer la Source

1. Sous **"Source"**, vous verrez un menu déroulant
2. **Sélectionnez "GitHub Actions"** (pas "Deploy from a branch")
3. GitHub Pages est maintenant activé !

### Étape 5 : Vérifier le Déploiement

1. Allez dans l'onglet **"Actions"** (en haut du dépôt)
2. Vous devriez voir un workflow "Déploiement GitHub Pages" en cours
3. Attendez 2-3 minutes que le workflow se termine
4. Une fois terminé (icône verte ✓), votre site sera en ligne !

### Étape 6 : Accéder à votre Site

Votre site sera disponible sur :
```
https://hamabytes.github.io/doc/
```

## 🔍 Vérification du Workflow

Si le workflow ne se déclenche pas automatiquement :

1. Allez dans **"Actions"**
2. Cliquez sur **"Déploiement GitHub Pages"** dans la liste
3. Cliquez sur **"Run workflow"** (bouton en haut à droite)
4. Sélectionnez la branche **"main"**
5. Cliquez sur **"Run workflow"**

## ⚠️ Si vous voyez une erreur

### Erreur : "GitHub Pages is currently disabled"

**Solution** : 
- Vérifiez que vous avez bien sélectionné "GitHub Actions" comme source
- Attendez quelques secondes et rafraîchissez la page

### Erreur : "Workflow failed"

**Solution** :
1. Cliquez sur le workflow qui a échoué
2. Regardez les logs pour voir l'erreur
3. Vérifiez que tous les fichiers sont bien commités

### Le site ne se charge pas

**Solution** :
- Vérifiez que le workflow s'est terminé avec succès (icône verte)
- Attendez 1-2 minutes supplémentaires (propagation DNS)
- Vérifiez l'URL : `https://hamabytes.github.io/doc/` (avec le `/` à la fin)

## 📝 Checklist Rapide

- [ ] Aller sur https://github.com/HamaBytes/doc
- [ ] Cliquer sur "Settings"
- [ ] Aller dans "Pages"
- [ ] Sélectionner "GitHub Actions" comme source
- [ ] Aller dans "Actions" pour voir le workflow
- [ ] Attendre que le workflow se termine (2-3 minutes)
- [ ] Accéder à https://hamabytes.github.io/doc/

## 🎉 C'est tout !

Une fois le workflow terminé, votre site sera en ligne et accessible publiquement !

---

**Besoin d'aide ?** Les logs dans l'onglet "Actions" vous donneront plus de détails en cas de problème.

