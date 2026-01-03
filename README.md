# TechSolutions SARL - Documentation Réseau Infrastructure

Site de documentation moderne et professionnel pour le projet d'infrastructure réseau TechSolutions SARL.

🌐 **Version en ligne** : [Voir sur GitHub Pages](https://hamabytes.github.io/documentation_Pi_reseaux/)

> ✅ **Configuration** : Le projet est configuré pour le dépôt `HamaBytes/documentation_Pi_reseaux`

## 🚀 Fonctionnalités

- ✅ **Architecture Réseau Interactive** - Diagrammes SVG interactifs avec zoom et pan
- ✅ **Plan d'Adressage VLSM** - Calculs détaillés avec tableaux triables
- ✅ **Configurations Complètes** - Toutes les configurations routeurs avec syntax highlighting
- ✅ **Protocoles Documentés** - OSPF, DHCP, NAT, Routage statique
- ✅ **Tests & Validation** - Procédures de test complètes
- ✅ **Checklist 60 Items** - Suivi de progression avec localStorage
- ✅ **Référence Commandes** - Toutes les commandes Cisco documentées
- ✅ **PCs & Serveurs** - Configurations complètes avec commandes de test
- ✅ **Export PDF/ZIP** - Export checklist PDF et configurations ZIP
- ✅ **Mode Sombre/Clair** - Toggle avec persistance
- ✅ **Design Responsive** - Mobile, tablette, desktop

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour production
npm run build
```

Le site sera accessible sur `http://localhost:3000`

## 📁 Structure du Projet

```
doc/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Layout.jsx       # Layout principal avec sidebar
│   │   ├── CodeBlock.jsx    # Bloc de code avec syntax highlighting
│   │   ├── NetworkDiagram.jsx # Diagramme réseau interactif
│   │   └── SortableTable.jsx # Tableau triable/filtrable
│   ├── data/                # Données structurées
│   │   ├── networkData.js   # Données réseau (départements, liaisons)
│   │   ├── configurations.js # Configurations routeurs
│   │   └── checklist.js     # Items checklist
│   ├── pages/               # Pages de l'application
│   │   ├── Home.jsx         # Page d'accueil
│   │   ├── Architecture.jsx # Architecture réseau
│   │   ├── VLSM.jsx         # Plan d'adressage VLSM
│   │   ├── Configurations.jsx # Configurations routeurs
│   │   ├── Protocols.jsx   # Protocoles (OSPF, DHCP, NAT)
│   │   ├── Tests.jsx        # Tests et validation
│   │   ├── Checklist.jsx    # Checklist 60 items
│   │   └── CommandReference.jsx # Référence commandes
│   ├── App.jsx              # Composant principal avec routing
│   ├── main.jsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Technologies Utilisées

- **React 18** - Framework UI
- **React Router** - Navigation
- **Tailwind CSS** - Styling (utility classes uniquement)
- **Lucide React** - Icônes
- **Prism.js** - Syntax highlighting
- **Recharts** - Visualisations (prêt pour futures fonctionnalités)
- **jsPDF** - Export PDF
- **JSZip** - Export ZIP
- **Vite** - Build tool

## 📖 Pages Disponibles

1. **Accueil** (`/`) - Vue d'ensemble du projet
2. **Architecture** (`/architecture`) - Topologie réseau avec diagrammes
3. **VLSM Calculator** (`/vlsm`) - Calculs d'adressage VLSM
4. **Configurations** (`/configurations`) - Configurations routeurs
5. **Protocoles** (`/protocols`) - OSPF, DHCP, NAT, Routage
6. **Tests** (`/tests`) - Procédures de test
7. **Checklist** (`/checklist`) - 60 items de validation
8. **Référence Commandes** (`/commands`) - Documentation commandes Cisco
9. **PCs & Serveurs** (`/pcs-servers`) - Configurations complètes des PCs et serveurs par département

## 🔧 Fonctionnalités Clés

### Checklist avec Persistance
- 60 items de validation organisés par catégorie
- Sauvegarde automatique dans localStorage
- Export PDF avec progression
- Filtrage par catégorie

### Export de Configurations
- Export individuel (fichier .txt)
- Export groupé (ZIP avec toutes les configs)
- Syntax highlighting Cisco

### Diagramme Réseau Interactif
- Zoom in/out
- Pan (déplacement)
- Légende des équipements
- Couleurs par type (Backbone, Départements, Internet)

## 🎯 Données du Projet

- **4 Départements** : Web/Marketing, IT, Base de données, Collaboration
- **9 Routeurs** : R1-R4 (Backbone), R-Internet, RZ1-RZ4 (Départements)
- **9,669 Employés** au total
- **OSPF Area 0** : Backbone entièrement maillé
- **VLSM** : Plan d'adressage optimisé

## 📝 Notes

- Le mode sombre est activé par défaut
- Toutes les données sont stockées localement (localStorage)
- Les configurations sont exportables en format texte
- La checklist est sauvegardée automatiquement

## 🚀 Déploiement sur GitHub Pages

Voir le guide complet dans [DEPLOY.md](./DEPLOY.md)

### Déploiement Rapide

1. **Configurer le nom du dépôt** dans `vite.config.js` et `src/App.jsx`
2. **Pousser le code** sur GitHub
3. **Activer GitHub Pages** dans Settings → Pages (Source: GitHub Actions)
4. Le site sera disponible sur `https://VOTRE-USERNAME.github.io/VOTRE-NOM-REPO/`

### Build Local

```bash
# Build pour production
npm run build

# Le dossier `dist/` contient les fichiers à déployer
```

## 📄 Licence

Projet académique - TechSolutions SARL

---

## 🗄️ Supabase (Tests & Screenshots)

- Create a public bucket named `image` and allow public read access.
- The Tests UI uploads screenshots to `image/screenshots/` and stores public URLs in the `tests` table.
- Set environment variables locally (Vite):
  - `VITE_SUPABASE_URL` = your Supabase URL
  - `VITE_SUPABASE_KEY` = your Supabase publishable key
  (Or React-style `REACT_APP_SUPABASE_URL` / `REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY`)
- Run the SQL in `supabase/init.sql` in the Supabase SQL editor to create `tests`, `services`, and `servers` tables.

**Bon courage pour votre validation Semaine 11 ! 🎉**

