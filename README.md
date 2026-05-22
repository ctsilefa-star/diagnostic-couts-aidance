# 🎯 Diagnostic de Matérialité Sociale & Impact Aidance (CSRD 2026)

Simulateur B2B interactif de **lead generation** pour Vivalea Care.
Calcule le coût caché des salariés aidants pour les entreprises et leur niveau de préparation à la directive CSRD 2026 (pilier social ESRS S1).

**Cibles** : DRH, RSE Manager, DAF de PME/ETI/grands groupes.

---

## 🌐 URLs

| Environnement | URL |
|---|---|
| **Production** ✅ | https://diagnostic-aidants.vivalea.fr |
| Production (Vercel direct) | https://diagnostic-couts-aidance.vercel.app |
| Repo GitHub | https://github.com/ctsilefa-star/diagnostic-couts-aidance |
| Dashboard Vercel | https://vercel.com/vivalea/diagnostic-couts-aidance |

---

## 🛠️ Stack technique

- **Frontend** : React 18 + Babel standalone (via CDN, **pas de build step**)
- **PDF** : jsPDF 2.5.2 (CDN cdnjs + fallback unpkg)
- **Backend** : Vercel Serverless Function (Node.js)
- **Email** : Resend (3000 emails/mois gratuit)
- **Hébergement** : Vercel (auto-deploy depuis GitHub)
- **DNS** : OVH (zone DNS de vivalea.fr)

---

## 📂 Structure du projet

```
diagnostic-couts-aidance/
├── index.html                       # App React standalone (1 seul fichier)
├── api/
│   └── send-email.js                # Vercel Function (envoi Resend)
├── src/
│   └── simulateur-diagnostic-aidants.jsx  # Source JSX historique (référence)
├── vercel.json                      # Config Vercel (HTML statique)
├── netlify.toml                     # Config Netlify (legacy, ignoré)
└── README.md
```

---

## 🚀 Déploiement

**Auto-déploiement** : chaque `git push` sur `main` déclenche un rebuild Vercel (~30 sec).

```bash
git add .
git commit -m "feat: description du changement"
git push origin main
# Vercel rebuild automatiquement
```

---

## 🔐 Variables d'environnement Vercel

Configurer sur https://vercel.com/vivalea/diagnostic-couts-aidance/settings/environment-variables

| Clé | Valeur | Notes |
|---|---|---|
| `RESEND_API_KEY` | `re_...` | API Key Resend (à régénérer si compromise) |
| `RESEND_FROM` | `Vivalea Care <noreply@notif.vivalea.fr>` | Expéditeur emails |
| `INTERNAL_EMAIL` | `lea@vivalea.fr` | Destinataire des notifs lead |

⚠️ Après modification d'une variable, **forcer un redeploy** (commit "factice" + push).

---

## 📝 Logique du formulaire (5 étapes)

| Étape | Champs collectés |
|---|---|
| **1 · Profil** | Nom, Entreprise, Secteur, Fonction |
| **2 · Variables structurelles** | Effectif ETP, Tranche d'âge majoritaire, Salaire moyen chargé |
| **3 · Performance** | Taux d'absentéisme, Nombre de départs 12 mois |
| **4 · Stratégie & CSRD** | Culture managers, Dispositifs existants, Pilotage data, Mesures CSRD, Contrat crèche |
| **5 · Contact** | Email professionnel (déclenche l'envoi) |

---

## 🧮 Formules de calcul

| Variable | Formule |
|---|---|
| `n_aidants` | Effectif × coeff selon âge (junior 0.12 / équilibrée 0.20 / sénior 0.32) |
| `cout_jour` | Salaire moyen / 218 jours ouvrés |
| `fuite_financiere` | `n_aidants × 16 jours × cout_jour` |
| `score_csrd` (sur 100) | Managers (0/10/20) + Dispositifs (5 pts/dispositif, max 40) + Pilotage (0/20) |
| `roi_absenteisme` | `fuite_financiere × 0.07` |
| `roi_presenteisme` | `fuite_financiere × 0.19` |
| `roi_turnover` | `fuite_financiere × 0.30` |
| `roi_total` | Somme des 6 postes ROI (absentéisme, présentéisme, turnover, désorganisation, RPS, marque employeur) |
| `investissement` | 15% des aidants × 180 €/mois × 12 |

Sources scientifiques : OCIRP/Viavoice 2023, Malakoff Humanis 2025, Deloitte 2024, HBR/Gallup 2021-2024.

---

## 📧 Système d'emails (Resend)

À la soumission du formulaire, 2 emails sont envoyés via `/api/send-email` :

### Email 1 — Interne (vers `lea@vivalea.fr`)

- Header magenta avec nom du lead
- 3 KPIs en tête : Aidants estimés / Fuite annuelle / Gain potentiel
- Sections : Coordonnées, Profil entreprise, ROI détaillé, Investissement, **Intelligence commerciale** (incluant le contrat crèche)

### Email 2 — Prospect (vers l'email saisi)

- Header personnalisé "Bienvenue {Nom}"
- KPIs colorés (Aidants, Fuite, Gain potentiel)
- Récapitulatif complet de la saisie
- ROI 6 postes
- Score CSRD actuel + projection Vivalea (80/100)
- Bloc prix "à partir de 180€/mois"
- CTA Calendly

### Configuration DNS Resend (déjà en place)

| Type | Sous-domaine | Cible |
|---|---|---|
| TXT (DKIM) | `resend._domainkey.notif` | `p=MIG...` |
| MX | `send.notif` | `feedback-smtp.eu-west-1.amazonses.com.` (priorité 10) |
| TXT (SPF) | `send.notif` | `v=spf1 include:amazonses.com ~all` |
| TXT (DMARC) | `_dmarc.notif` | `v=DMARC1; p=none; rua=mailto:lea@vivalea.fr` |

---

## 🌐 Intégration Webflow (iframe)

Code à coller dans un bloc **"Embed"** Webflow :

```html
<div class="vivalea-diagnostic-wrapper" style="width: 100%; max-width: 960px; margin: 0 auto;">
  <iframe 
    id="vivalea-diagnostic-iframe"
    src="https://diagnostic-aidants.vivalea.fr/" 
    title="Diagnostic Aidants Salariés — Vivalea Care"
    loading="lazy"
    scrolling="no"
    style="width: 100%; min-height: 1100px; border: none; display: block; background: #F8F6F4; border-radius: 12px; transition: height 0.3s ease;"
    allow="clipboard-write"
  ></iframe>
</div>

<script>
  (function() {
    var iframe = document.getElementById('vivalea-diagnostic-iframe');
    if (!iframe) return;
    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'vivalea-resize' && typeof e.data.height === 'number') {
        var newHeight = Math.max(e.data.height + 20, 1100);
        iframe.style.height = newHeight + 'px';
      }
    });
    setTimeout(function() {
      if (iframe.offsetHeight < 1200) iframe.style.height = '1400px';
    }, 3000);
  })();
</script>
```

L'iframe communique sa hauteur réelle au parent Webflow via `postMessage` (auto-resize fluide entre les étapes).

---

## 🎨 Identité visuelle

- **Magenta** : `#8F1349` (primary)
- **Magenta hover** : `#7A1040`
- **Navy** : `#18263F` (texte)
- **Orange accent** : `#E9552E`
- **Vert succès** : `#0F766E`
- **Rouge alerte** : `#DC2626`
- **Background** : `#F8F6F4`
- **Bordures** : `#E8E2DD`
- **Texte muted** : `#6B7280`
- **Fonts** : DM Serif Display (titres) + DM Sans (corps)

---

## 🐛 Debug & Troubleshooting

### Logs runtime Vercel
👉 https://vercel.com/vivalea/diagnostic-couts-aidance/logs

### Tableau de bord emails Resend
👉 https://resend.com/emails

### Problèmes connus

| Symptôme | Cause probable | Solution |
|---|---|---|
| Email prospect non reçu | Variable `RESEND_FROM` mal configurée | Vérifier qu'elle pointe sur `noreply@notif.vivalea.fr` |
| PDF ne se télécharge pas | Adblocker bloque cdnjs | Le fallback unpkg devrait prendre le relais |
| Iframe affiche page blanche | Cache Webflow | Hard refresh (Ctrl+Shift+R) |
| Status "Invalid Configuration" Vercel domaine | CNAME pas propagé | Attendre 5-15 min |

---

## 🧪 Tester en local

Aucun build n'est nécessaire :

```bash
# Option 1 : Python (préinstallé sur Mac/Linux)
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000

# Option 2 : Node http-server
npx serve .
```

⚠️ Le `/api/send-email` ne fonctionnera qu'en production Vercel (pas en local).

---

## 📦 Méthodologie BMAD utilisée

Ce projet suit la méthodologie **BMAD** :
- **B**usiness : positionnement ESS / CSRD / lead generation B2B
- **M**arketing : ciblage DRH/RSE/DAF, design tunnel de conversion 5 étapes
- **A**rchitecture : Vercel + React inline + Resend
- **D**éveloppement : itération rapide sans build step

---

## 📞 Contacts

- **Project Owner** : Touxah (touxah@vivalea.fr)
- **Lead notif** : lea@vivalea.fr

---

**🟢 Dernière mise à jour** : Mai 2026 · Migration EmailJS → Resend, domaine custom configuré
