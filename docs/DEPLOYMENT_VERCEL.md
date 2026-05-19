# Déploiement Vercel — Simulateur Coût Aidant

## 1️⃣ Prérequis

- Compte GitHub avec le repo `ctsilefa-star/simulateur-cout-aidant`
- Compte Vercel (gratuit) : https://vercel.com

## 2️⃣ Déployer depuis Vercel Dashboard

### Étape 1 : Connecter le repo GitHub

1. Va sur https://vercel.com/new
2. Sélectionne **GitHub**
3. Autorise Vercel à accéder à tes repos
4. Sélectionne le repo `simulateur-cout-aidant`

### Étape 2 : Configurer le projet

| Champ | Valeur |
|-------|--------|
| **Project Name** | `simulateur-cout-aidant` |
| **Framework Preset** | `Other` (c'est un site statique) |
| **Root Directory** | `.` (racine) |
| **Build Command** | `echo 'Static site'` (ou laisser vide) |
| **Output Directory** | `.` |

### Étape 3 : Deploy

Clique **Deploy** — Vercel va :
- Cloner le repo
- Détecter `index.html`
- Publier le site en ~1-2 min
- Te donner une URL : `https://simulateur-cout-aidant.vercel.app`

---

## 3️⃣ Domaine personnalisé

### Vercel Domains (gratuit)
1. Dans https://vercel.com/dashboard → Projet
2. **Settings** → **Domains**
3. Ajoute ton domaine Vivalea (ex: `diagnostic.vivalea.fr`)
4. Suis les instructions DNS

### Domaine personnalisé existant
1. Va dans ton registrar (OVH, Gandi, etc.)
2. Ajoute les DNS records Vercel :
   ```
   cname.vercel-dns.com
   ```

---

## 4️⃣ Intégration Webflow (iframe)

```html
<iframe 
  src="https://simulateur-cout-aidant.vercel.app" 
  width="100%" 
  height="800" 
  style="border: none; border-radius: 24px;"
  title="Diagnostic Coût Aidant — Vivalea Care"
></iframe>
```

---

## 5️⃣ Auto-deploy à chaque push GitHub

**C'est automatique avec Vercel :**
- Tu push sur `main` → Vercel détecte le changement
- Redéploie en ~1-2 min
- L'URL reste la même

Aucune config supplémentaire nécessaire.

---

## 6️⃣ Commandes CLI (optionnel)

Si tu préfères utiliser `vercel-cli` :

```bash
# Install
npm i -g vercel

# Login
vercel login

# Deploy
cd simulateur-cout-aidant
vercel

# Production
vercel --prod
```

---

## 7️⃣ Variables d'environnement (si besoin)

Dans Vercel Dashboard → **Settings** → **Environment Variables** :

```
SERVICE_ID=service_jo37wws
TEMPLATE_VIVALEA=template_427e77g
TEMPLATE_CLIENT=template_8maoisj
PUBLIC_KEY=NkeIMabZ5jVKjFjKu
```

*(Optionnel — actuellement hardcodées dans le code)*

---

## 8️⃣ Monitoring & Analytics

- **Vercel Analytics** : performances, visites, uptime
- **EmailJS Logs** : suivi des emails envoyés
- **Browser Console** : debug des erreurs client

---

## 9️⃣ Support Multi-région

Vercel déploie automatiquement sur **40+ régions worldwide**. Le site sera très rapide partout.

---

## 🔟 Rollback & Versions

Dans Vercel Dashboard :
- **Deployments** : historique de tous les déploiements
- Clique sur une version ancienne → **Redeploy** pour revenir en arrière

---

## ❓ Troubleshooting

| Problème | Solution |
|----------|----------|
| PDF ne télécharge pas | Vérifier la console du navigateur (F12) |
| Emails ne reçus pas | Vérifier EmailJS templates + Public Key |
| Erreur 405 sur Netlify | Vercel gère mieux les CDN + CORS |
| iframe bloquée | Headers CORS configurés dans `vercel.json` |

---

## 📊 Coûts

| Tier | Coût | Limite |
|------|------|--------|
| **Hobby (gratuit)** | $0 | 3 déploiements/jour, déploiements illimités, 6000 requêtes/jour |
| **Pro** | $20/mois | Déploiements illimités, analytics avancées |

Le **Hobby plan gratuit** suffit amplement pour ce simulateur.

---

**Déployé et prêt en ~2 minutes ✅**
