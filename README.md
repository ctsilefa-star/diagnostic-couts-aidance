# Simulateur Coût Aidant — Vivalea Care

**Diagnostic de Matérialité Sociale & Impact Aidance (CSRD 2026)**

Simulateur B2B de calcul du coût caché de l'aidance en entreprise. Outil de lead generation destiné aux DRH, RSE et DAF.

## 🎯 Fonctionnalités

- **Wizard 5 étapes** : profil entreprise, variables structurelles, coûts cachés, stratégie CSRD, gate email
- **Rapport CODIR interactif** : KPIs, ROI détaillé sur 6 postes, score CSRD, équation investissement
- **PDF généré côté client** (jsPDF) — auto-download + bouton re-téléchargement
- **Double envoi EmailJS** : notification Vivalea (avec intelligence commerciale) + récap prospect
- **Responsive** : adapté mobile (< 640px) et desktop
- **Sources citées** : OCIRP 2023, Malakoff Humanis 2025, Deloitte 2024, HBR/Gallup, etc.

## 🧮 Logique de calcul

| Variable | Formule |
|----------|---------|
| N° Aidants | Effectif × Coeff_Age (0.12 / 0.20 / 0.32) |
| Coût/Jour | Salaire moyen / 218 jours ouvrés |
| Fuite financière | N° Aidants × 16 jours × Coût/Jour |
| ROI Total | Somme des 6 postes de ROI récupérable |
| Score CSRD | Formation managers + dispositifs (5 pts chacun, max 40) + pilotage KPI |
| Investissement | 15% des aidants × 180 €/mois × 12 |

## 📁 Structure

```
├── index.html                          # Fichier standalone (déploiement Netlify)
├── src/
│   └── simulateur-diagnostic-aidants.jsx  # Source React (artifact Claude.ai)
├── docs/
│   └── guide-emailjs-diagnostic.md     # Guide config EmailJS + templates HTML
├── netlify.toml                        # Config Netlify
└── README.md
```

## 🚀 Déploiement

### Netlify (méthode actuelle)
1. Drag & drop `index.html` sur [app.netlify.com/drop](https://app.netlify.com/drop)
2. Ou connecter ce repo GitHub à Netlify pour auto-deploy

### Webflow (iframe)
```html
<iframe src="https://votre-site.netlify.app" width="100%" height="800" frameborder="0"></iframe>
```

## 📧 Configuration EmailJS

Voir le guide complet dans [`docs/guide-emailjs-diagnostic.md`](docs/guide-emailjs-diagnostic.md)

| Config | Valeur |
|--------|--------|
| Service ID | `service_jo37wws` |
| Template notification Vivalea | `template_427e77g` |
| Template récap prospect | `template_8maoisj` |
| Public Key | `NkeIMabZ5jVKjFjKu` |

## 🛠️ Stack technique

- **React 18** via CDN (pas de build step)
- **Babel Standalone** pour JSX
- **jsPDF** pour la génération PDF côté client
- **EmailJS** REST API pour l'envoi d'emails
- **Netlify** pour l'hébergement
- **Webflow** pour l'intégration iframe

## 🏢 Vivalea

Entreprise à impact et ESS · Maintien à domicile & Accompagnement des aidants salariés

---

*Développé avec la méthodologie BMAD (Business, Marketing, Architecture, Développement)*
