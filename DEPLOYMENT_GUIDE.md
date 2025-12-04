# Guide de Déploiement sur Vercel

Ce guide vous explique comment déployer le simulateur de crédits d'impôt sur Vercel en quelques minutes.

## Prérequis

1. Un compte GitHub, GitLab ou Bitbucket (gratuit)
2. Le code du projet uploadé sur un de ces services
3. Un compte Vercel (gratuit)

## Étape 1 : Préparer votre Repository Git

### Si vous n'avez pas encore de repository :

```bash
# Initialiser git dans le dossier du projet
cd music-tax-simulator
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - Simulateur de crédits d'impôt"

# Créer un repository sur GitHub/GitLab/Bitbucket
# Puis lier votre repository local :
git remote add origin [URL_DE_VOTRE_REPO]
git branch -M main
git push -u origin main
```

## Étape 2 : Créer un Compte Vercel

1. Allez sur https://vercel.com
2. Cliquez sur "Sign Up"
3. Choisissez "Continue with GitHub" (ou GitLab/Bitbucket)
4. Autorisez Vercel à accéder à vos repositories

## Étape 3 : Importer le Projet

1. **Dashboard Vercel**
   - Une fois connecté, cliquez sur "Add New Project"
   - Vous verrez une liste de vos repositories

2. **Sélectionner le Repository**
   - Trouvez "music-tax-simulator" dans la liste
   - Cliquez sur "Import"

3. **Configuration Automatique**
   Vercel détectera automatiquement :
   - ✅ Framework : Vite
   - ✅ Build Command : `npm run build`
   - ✅ Output Directory : `dist`
   - ✅ Install Command : `npm install`

   **Vous n'avez RIEN à modifier !**

4. **Nom du Projet** (optionnel)
   - Par défaut : `music-tax-simulator`
   - Vous pouvez le personnaliser : `simulateur-credits-impot`

5. **Variables d'Environnement** (optionnel pour ce projet)
   - Ce projet n'a pas besoin de variables d'environnement
   - Laissez cette section vide

## Étape 4 : Déployer

1. Cliquez sur le bouton **"Deploy"**
2. Vercel va :
   - Cloner votre repository
   - Installer les dépendances (`npm install`)
   - Construire l'application (`npm run build`)
   - Déployer sur leur CDN global

3. **Durée** : 2-3 minutes

## Étape 5 : Accéder à Votre Site

Une fois le déploiement terminé :

1. Vous verrez un écran de succès avec confettis 🎉
2. Votre URL sera affichée : `https://[nom-du-projet].vercel.app`
3. Cliquez sur "Visit" pour voir votre site en ligne

### URLs Disponibles

Vercel vous donne 3 types d'URLs :
- **Production** : `https://[nom-du-projet].vercel.app` (principale)
- **Prévisualisation** : Une URL unique pour chaque commit
- **Alias personnalisé** : Vous pouvez ajouter votre propre domaine

## Étape 6 : Domaine Personnalisé (Optionnel)

Pour utiliser votre propre domaine (ex: simulateur.votrecabinet.fr) :

1. Dans le dashboard du projet, allez dans "Settings"
2. Cliquez sur "Domains"
3. Ajoutez votre domaine personnalisé
4. Suivez les instructions pour configurer vos DNS

## Mises à Jour Automatiques

**C'est le meilleur de Vercel !**

Chaque fois que vous faites un `git push` sur votre repository :
- Vercel détecte automatiquement le changement
- Lance un nouveau build
- Déploie la nouvelle version
- **Zéro downtime !**

```bash
# Modifier votre code
# Sauvegarder vos changements

git add .
git commit -m "Amélioration du calculateur CIPP"
git push

# ✨ Vercel déploie automatiquement !
```

## Monitoring et Analytics

### Dashboard Vercel

Dans votre projet sur Vercel, vous avez accès à :
- **Analytics** : Visiteurs, pages vues, performances
- **Logs** : Logs de build et d'exécution
- **Deployments** : Historique de tous vos déploiements
- **Speed Insights** : Métriques de performance réelles

### Activer Analytics (Gratuit)

1. Allez dans votre projet
2. Cliquez sur "Analytics"
3. Cliquez sur "Enable Analytics"

## Rollback en Cas de Problème

Si un déploiement pose problème :

1. Allez dans "Deployments"
2. Trouvez la version précédente qui fonctionnait
3. Cliquez sur les "..." à droite
4. Sélectionnez "Promote to Production"

→ Retour instantané à la version précédente !

## Optimisations Automatiques de Vercel

Vercel optimise automatiquement votre site :
- ✅ Compression Gzip/Brotli
- ✅ CDN global (Edge Network)
- ✅ HTTP/3 et protocoles modernes
- ✅ Cache intelligent
- ✅ Optimisation des images
- ✅ Minification CSS/JS

## Limites du Plan Gratuit

Le plan gratuit Vercel inclut :
- ✅ Bande passante illimitée
- ✅ Déploiements illimités
- ✅ 100 GB/mois de bande passante
- ✅ Domaines personnalisés
- ✅ HTTPS automatique
- ✅ Analytics basiques

**Pour ce projet, le plan gratuit est largement suffisant !**

## Dépannage

### Le build échoue

1. Vérifiez que le projet fonctionne en local :
   ```bash
   npm install
   npm run build
   ```

2. Si ça fonctionne en local, vérifiez les logs Vercel :
   - Allez dans "Deployments"
   - Cliquez sur le déploiement qui a échoué
   - Lisez les logs d'erreur

### Le site affiche une erreur 404

1. Vérifiez que le "Output Directory" est bien `dist`
2. Vérifiez que le build s'est terminé avec succès

### Le site est lent

1. Vérifiez dans "Speed Insights"
2. Le CDN de Vercel devrait rendre le site très rapide (<1s de chargement)

## Support

- Documentation Vercel : https://vercel.com/docs
- Support Vercel : https://vercel.com/support
- Community Discord : https://vercel.com/discord

## Checklist Finale

Avant de partager le lien avec vos clients :

- [ ] Le site se charge correctement
- [ ] Tous les calculateurs fonctionnent
- [ ] Les calculs sont corrects
- [ ] L'avertissement légal est visible
- [ ] Le site est responsive (testez sur mobile)
- [ ] Le domaine personnalisé est configuré (si applicable)
- [ ] Analytics est activé

---

**Félicitations ! Votre simulateur est maintenant en ligne et accessible 24/7 !** 🚀
