# Simulateur de Crédits d'Impôt - Industrie Musicale Française

Un simulateur professionnel pour calculer les crédits d'impôt disponibles dans l'industrie musicale française.

## Fonctionnalités

### Types de Crédits d'Impôt

1. **CIPP - Crédit d'Impôt Phonographique (Disque)**
   - Pour labels et producteurs
   - Taux : 40% (PME/TPE) ou 20% (Grande Entreprise)
   - Plafond : 1 500 000 € par an

2. **CISV - Crédit d'Impôt Spectacle Vivant**
   - Pour tourneurs et producteurs de spectacles
   - Taux : 30% (PME/TPE) ou 15% (Grande Entreprise)
   - Plafond : 750 000 € par an

3. **CIEM - Crédit d'Impôt Éditeurs Musicaux**
   - Pour éditeurs
   - Taux : 30% (PME/TPE) ou 15% (Grande Entreprise)
   - Plafond : 500 000 € par an

### Fonctionnalités Clés

- ✅ Validation automatique de l'éligibilité
- ✅ Calcul des équivalent-ventes (ventes physiques + streams)
- ✅ Vérification de l'obligation de francophonie
- ✅ Application des plafonds réglementaires
- ✅ Récapitulatif global des crédits
- ✅ Interface responsive et professionnelle
- ✅ Design adapté pour impression

## Installation Locale

```bash
# Cloner le repository
git clone [votre-repo]
cd music-tax-simulator

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

Le serveur de développement sera accessible sur http://localhost:5173

## Déploiement sur Vercel

### Méthode 1 : Via le Dashboard Vercel (Recommandé)

1. **Créer un compte Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Créez un compte (gratuit) avec GitHub, GitLab ou BitBucket

2. **Importer le projet**
   - Cliquez sur "Add New Project"
   - Importez votre repository Git
   - Vercel détectera automatiquement Vite

3. **Configuration (automatique)**
   - Framework Preset : Vite
   - Build Command : `npm run build`
   - Output Directory : `dist`
   - Install Command : `npm install`

4. **Déployer**
   - Cliquez sur "Deploy"
   - Votre site sera en ligne en 2-3 minutes
   - URL : `https://your-project-name.vercel.app`

### Méthode 2 : Via CLI Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

### Configuration Automatique

Le fichier `vercel.json` est déjà configuré pour optimiser le déploiement :
- Build automatique avec Vite
- Configuration du répertoire de sortie
- Optimisations de performance

## Structure du Projet

```
music-tax-simulator/
├── src/
│   ├── components/           # Composants React
│   │   ├── FrancophonieChecker.jsx
│   │   ├── CIPPCalculator.jsx
│   │   ├── CISVCalculator.jsx
│   │   ├── CIEMCalculator.jsx
│   │   └── GlobalSummary.jsx
│   ├── utils/
│   │   └── calculations.js   # Logique de calcul
│   ├── App.jsx               # Composant principal
│   ├── App.css               # Styles principaux
│   ├── main.jsx              # Point d'entrée
│   └── index.css             # Styles globaux
├── public/                   # Fichiers statiques
├── vercel.json              # Configuration Vercel
├── package.json             # Dépendances
└── vite.config.js          # Configuration Vite
```

## Logique de Calcul

### Équivalent-Ventes
```
Équivalent-Ventes = Ventes Physiques + [(Streams Totaux - (Streams Titre Phare / 2)) / 1500]
```

### Nouveau Talent
Un artiste/auteur est considéré comme "Nouveau Talent" si :
- Équivalent-Ventes < 100 000 unités sur 2 albums distincts

### Obligation de Francophonie
- **Règle générale** : Minimum 50% de production francophone requise
- **Exception** : Micro-entreprises exemptées (ratio 1-pour-1)
- **Impact** : Les projets non-francophones ne sont pas éligibles si le ratio n'est pas respecté

### Plafonnement des Dépenses
- **CIPP** : Développement plafonné à 700 000 € par album
- **CISV** : Dépenses plafonnées à 500 000 € par spectacle
- **CIEM** : Dépenses plafonnées à 300 000 € par contrat

## Technologies Utilisées

- **React 18** - Framework UI
- **Vite** - Build tool et dev server
- **CSS3** - Styling moderne et responsive
- **JavaScript ES6+** - Logique métier

## Performance

- ⚡ Temps de chargement < 1s
- 📱 100% responsive (mobile, tablet, desktop)
- 🖨️ Optimisé pour l'impression
- ♿ Accessible (WCAG 2.1)

## Avertissement Légal

Ce simulateur est fourni à titre indicatif uniquement. Les résultats ne constituent pas un conseil juridique ou fiscal. Pour une analyse précise de votre situation et la validation de votre éligibilité aux crédits d'impôt, veuillez impérativement consulter un expert-comptable ou un avocat fiscaliste qualifié.

## Support

Pour toute question ou assistance :
- Documentation officielle : [Code Général des Impôts](https://www.legifrance.gouv.fr/)
- Centre National de la Musique : [cnm.fr](https://cnm.fr)

## Licence

© 2025 - Tous droits réservés
# V0DEY
