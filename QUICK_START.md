# Quick Start Guide - Simulateur de Crédits d'Impôt

## 🚀 Démarrage Rapide (5 minutes)

### Option 1 : Voir le site localement MAINTENANT

```bash
cd music-tax-simulator
npm run dev
```

→ Ouvrez http://localhost:5173 dans votre navigateur

### Option 2 : Déployer sur Vercel (RECOMMANDÉ)

#### Étape 1 : Créer un Repository Git

```bash
cd music-tax-simulator

# Initialiser Git
git init
git add .
git commit -m "Initial commit - Simulateur de crédits d'impôt"

# Créer un repo sur GitHub.com puis :
git remote add origin [VOTRE_URL_GITHUB]
git branch -M main
git push -u origin main
```

#### Étape 2 : Déployer sur Vercel

1. Allez sur https://vercel.com
2. Cliquez sur "Sign Up" → "Continue with GitHub"
3. Cliquez sur "Add New Project"
4. Importez votre repository "music-tax-simulator"
5. Cliquez sur "Deploy" (ne changez RIEN)

✨ **C'est tout ! Votre site sera en ligne en 2 minutes.**

### URL de votre site

Après le déploiement, votre URL sera :
```
https://music-tax-simulator.vercel.app
```

Vous pouvez la personnaliser dans les settings.

---

## 📋 Ce Qui a Été Créé

### ✅ Calculateurs Fonctionnels

1. **CIPP (Disque)** - Crédit d'impôt phonographique
   - Calcul automatique de l'équivalent-ventes
   - Validation du statut "Nouveau Talent"
   - Plafonnement à 700k€ pour le développement
   - Taux : 40% (PME) ou 20% (Grande Entreprise)

2. **CISV (Spectacle Vivant)**
   - Validation des critères (≥4 dates, ≥3 lieux)
   - Vérification de la jauge selon le type
   - Plafonnement à 500k€ par spectacle
   - Taux : 30% (PME) ou 15% (Grande Entreprise)

3. **CIEM (Édition Musicale)**
   - Validation de la date de contrat (>01/01/2022)
   - Calcul du statut "Nouveau Talent" pour l'auteur
   - Plafonnement à 300k€ par contrat
   - Taux : 30% (PME) ou 15% (Grande Entreprise)

### ✅ Fonctionnalités Spéciales

- **Obligation de Francophonie** : Validation automatique du ratio 50%
- **Exemption Micro-Entreprise** : Gestion du ratio 1-pour-1
- **Récapitulatif Global** : Vue d'ensemble de tous les crédits
- **Design Professionnel** : Interface épurée et professionnelle
- **Responsive** : Fonctionne sur mobile, tablette et desktop
- **Impression** : Optimisé pour l'impression des résultats
- **Avertissement Légal** : Disclaimer complet et visible

---

## 🔍 Tester les Calculs

### Test CIPP (Exemple)

**Données de test :**
- Statut : PME (40%)
- Ventes précédentes : 10,000 unités
- Streams totaux : 50,000,000
- Streams titre phare : 15,000,000
- Production : 100,000€
- Développement : 200,000€
- Subventions : 0€
- Langue : Francophone

**Résultat attendu :**
- Équivalent-ventes : ~38,333 unités → ✅ Nouveau Talent (< 100k)
- Assiette : 300,000€
- Crédit : 120,000€ (300k × 40%)

### Test Francophonie

**Scénario 1 : Conformité**
- Albums FR : 5
- Albums Non-FR : 3
- Ratio : 62.5% → ✅ OK

**Scénario 2 : Non-conformité**
- Albums FR : 2
- Albums Non-FR : 5
- Ratio : 28.6% → ❌ Projets non-FR non éligibles

---

## 📝 Structure des Fichiers

```
music-tax-simulator/
├── src/
│   ├── components/
│   │   ├── FrancophonieChecker.jsx    ← Vérification francophonie
│   │   ├── CIPPCalculator.jsx         ← Calculateur disque
│   │   ├── CISVCalculator.jsx         ← Calculateur spectacle
│   │   ├── CIEMCalculator.jsx         ← Calculateur édition
│   │   └── GlobalSummary.jsx          ← Récapitulatif
│   ├── utils/
│   │   └── calculations.js            ← Toute la logique de calcul
│   ├── App.jsx                        ← Application principale
│   └── App.css                        ← Styles
├── README.md                          ← Documentation complète
├── DEPLOYMENT_GUIDE.md                ← Guide de déploiement détaillé
├── QUICK_START.md                     ← Ce fichier
└── vercel.json                        ← Configuration Vercel
```

---

## 🛠️ Commandes Utiles

```bash
# Développement local
npm run dev

# Construire pour production
npm run build

# Prévisualiser le build de production
npm run preview

# Installer les dépendances
npm install
```

---

## ⚙️ Personnalisation

### Modifier les Couleurs

Éditez `src/App.css` (lignes 8-15) :
```css
:root {
  --primary-color: #1e3a8a;    /* Bleu principal */
  --secondary-color: #3b82f6;  /* Bleu secondaire */
  --success-color: #10b981;    /* Vert succès */
  /* ... */
}
```

### Modifier le Titre

Éditez `src/App.jsx` (lignes 39-40) :
```jsx
<h1>Simulateur de Crédits d'Impôt</h1>
<p className="subtitle">Industrie Musicale Française</p>
```

### Modifier l'Avertissement Légal

Éditez `src/App.jsx` (lignes 67-73)

---

## ✅ Checklist Avant Mise en Ligne

- [ ] Testé tous les calculateurs avec des données réelles
- [ ] Vérifié les calculs manuellement
- [ ] Testé sur mobile et desktop
- [ ] Vérifié l'affichage de l'avertissement légal
- [ ] Configuré un domaine personnalisé (optionnel)
- [ ] Informé votre équipe de l'URL

---

## 📞 Support

**Pour toute question sur le déploiement :**
- Consultez `DEPLOYMENT_GUIDE.md` pour des instructions détaillées
- Documentation Vercel : https://vercel.com/docs

**Pour modifier les calculs :**
- Éditez `src/utils/calculations.js`
- Testez avec `npm run dev`
- Commitez et poussez → Vercel redéploie automatiquement

---

## 🎯 Prochaines Étapes

1. ✅ **Déployé sur Vercel** → Partagez l'URL avec vos clients
2. 🔄 **Mises à jour** → `git push` = déploiement automatique
3. 📊 **Analytics** → Activez dans le dashboard Vercel
4. 🌐 **Domaine custom** → Configurez votre propre domaine

---

**Félicitations ! Votre simulateur est prêt à être utilisé.** 🎉
