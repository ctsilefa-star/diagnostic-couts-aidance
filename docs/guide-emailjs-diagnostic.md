# Configuration EmailJS — Diagnostic Aidants Vivalea Care

## 1. Templates à configurer dans EmailJS

Tu utilises tes **2 templates existants** dans ton dashboard EmailJS (https://dashboard.emailjs.com). Il faut mettre à jour leur contenu HTML avec les nouvelles variables du diagnostic.

| Rôle | Template ID | Destinataire |
|------|-------------|-------------|
| Notification Vivalea | `template_427e77g` | lea@vivalea.fr |
| Récap prospect | `template_8maoisj` | {{to_email}} |

---

### Template 1 : `template_427e77g`
**Destinataire** : lea@vivalea.fr (notification interne)

**Subject** :
```
🏛️ Nouveau Diagnostic Aidants — {{entreprise}} ({{secteur}})
```

**Body (HTML)** — copie-colle ce code dans le champ "Content" en mode HTML :

```html
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #18263F;">
  
  <!-- HEADER -->
  <div style="background: #8F1349; padding: 24px 28px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #fff; font-size: 18px; margin: 0;">🏛️ Nouveau Lead — Diagnostic Aidants</h1>
    <p style="color: #ffcde0; font-size: 13px; margin: 4px 0 0;">{{entreprise}} · {{secteur}}</p>
  </div>

  <!-- COORDONNÉES LEAD -->
  <div style="background: #18263F; padding: 20px 28px; color: #fff;">
    <h2 style="font-size: 14px; margin: 0 0 12px; color: #E9552E;">📋 COORDONNÉES DU LEAD</h2>
    <table style="width: 100%; font-size: 13px;">
      <tr><td style="padding: 4px 0; color: #aab;">Nom</td><td style="padding: 4px 0;"><strong>{{nom}}</strong></td></tr>
      <tr><td style="padding: 4px 0; color: #aab;">Email</td><td style="padding: 4px 0;"><strong>{{email}}</strong></td></tr>
      <tr><td style="padding: 4px 0; color: #aab;">Fonction</td><td style="padding: 4px 0;">{{fonction}}</td></tr>
      <tr><td style="padding: 4px 0; color: #aab;">Entreprise</td><td style="padding: 4px 0;">{{entreprise}}</td></tr>
      <tr><td style="padding: 4px 0; color: #aab;">Secteur</td><td style="padding: 4px 0;">{{secteur}}</td></tr>
      <tr><td style="padding: 4px 0; color: #aab;">Effectif</td><td style="padding: 4px 0;">{{effectif}} ETP</td></tr>
    </table>
  </div>

  <!-- INTELLIGENCE COMMERCIALE -->
  <div style="background: #E9552E; padding: 16px 28px; color: #fff;">
    <h2 style="font-size: 14px; margin: 0 0 8px;">🎯 INTELLIGENCE COMMERCIALE</h2>
    <p style="margin: 4px 0; font-size: 13px;"><strong>Crèche partenaire :</strong> {{contrat_creche}}</p>
    <p style="margin: 4px 0; font-size: 13px;"><strong>Dispositifs existants :</strong> {{dispositifs}}</p>
    <p style="margin: 4px 0; font-size: 13px;"><strong>Mesures RSE/CSRD :</strong> {{mesures_csrd}}</p>
    <p style="margin: 4px 0; font-size: 13px;"><strong>Formation managers :</strong> {{culture_manager}}</p>
    <p style="margin: 4px 0; font-size: 13px;"><strong>Pilotage KPI sociaux :</strong> {{pilotage_data}}</p>
  </div>

  <!-- RAPPORT CHIFFRÉ -->
  <div style="padding: 24px 28px; background: #fff;">
    <h2 style="font-size: 16px; color: #8F1349; margin: 0 0 16px;">📊 RAPPORT CODIR — Coût de l'aidance chez {{entreprise}}</h2>

    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <tr style="background: #f8f6f4;">
        <td style="padding: 10px 12px; font-weight: bold;">Aidants estimés</td>
        <td style="padding: 10px 12px; text-align: right; color: #8F1349; font-weight: bold;">{{n_aidants}}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px;">Tranche d'âge</td>
        <td style="padding: 10px 12px; text-align: right;">{{tranche_age}}</td>
      </tr>
      <tr style="background: #f8f6f4;">
        <td style="padding: 10px 12px;">Salaire moyen chargé</td>
        <td style="padding: 10px 12px; text-align: right;">{{salaire_moyen}} €</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px;">Taux d'absentéisme</td>
        <td style="padding: 10px 12px; text-align: right;">{{taux_absenteisme}} %</td>
      </tr>
      <tr style="background: #f8f6f4;">
        <td style="padding: 10px 12px;">Départs (12 mois)</td>
        <td style="padding: 10px 12px; text-align: right;">{{nb_departs}}</td>
      </tr>
    </table>

    <div style="background: #DC262615; padding: 16px; border-radius: 8px; text-align: center; margin: 16px 0;">
      <div style="font-size: 12px; color: #DC2626; font-weight: bold;">💸 Fuite financière annuelle</div>
      <div style="font-size: 28px; color: #DC2626; font-weight: bold;">{{fuite_financiere}} €</div>
    </div>

    <h3 style="font-size: 14px; color: #8F1349; margin: 20px 0 12px;">📈 ROI récupérable par poste</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <tr style="background: #f8f6f4;"><td style="padding: 8px 12px;">Absentéisme</td><td style="padding: 8px 12px; text-align: right; font-weight: bold;">{{roi_absenteisme}} €</td></tr>
      <tr><td style="padding: 8px 12px;">Présentéisme</td><td style="padding: 8px 12px; text-align: right; font-weight: bold;">{{roi_presenteisme}} €</td></tr>
      <tr style="background: #f8f6f4;"><td style="padding: 8px 12px;">Turnover</td><td style="padding: 8px 12px; text-align: right; font-weight: bold;">{{roi_turnover}} €</td></tr>
      <tr><td style="padding: 8px 12px;">Désorganisation</td><td style="padding: 8px 12px; text-align: right; font-weight: bold;">{{roi_desorganisation}} €</td></tr>
      <tr style="background: #f8f6f4;"><td style="padding: 8px 12px;">RPS / Arrêts longs</td><td style="padding: 8px 12px; text-align: right; font-weight: bold;">{{roi_rps}} €</td></tr>
      <tr><td style="padding: 8px 12px;">Marque employeur</td><td style="padding: 8px 12px; text-align: right; font-weight: bold;">{{roi_marque}} €</td></tr>
    </table>

    <div style="background: #0F766E15; padding: 16px; border-radius: 8px; text-align: center; margin: 16px 0;">
      <div style="font-size: 12px; color: #0F766E; font-weight: bold;">✅ Gain potentiel total</div>
      <div style="font-size: 28px; color: #0F766E; font-weight: bold;">{{roi_total}} € /an</div>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 16px;">
      <tr style="background: #f8f6f4;">
        <td style="padding: 10px 12px;">Score CSRD</td>
        <td style="padding: 10px 12px; text-align: right; font-weight: bold;">{{score_csrd}} / 100</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px;">Investissement proposé</td>
        <td style="padding: 10px 12px; text-align: right;">{{investissement}} € ({{nb_contrats}} contrats)</td>
      </tr>
      <tr style="background: #8F134915;">
        <td style="padding: 10px 12px; font-weight: bold;">ROI estimé</td>
        <td style="padding: 10px 12px; text-align: right; color: #8F1349; font-weight: bold; font-size: 16px;">{{roi_pct}} %</td>
      </tr>
    </table>
  </div>

  <!-- FOOTER -->
  <div style="padding: 16px 28px; background: #f8f6f4; border-radius: 0 0 12px 12px; text-align: center;">
    <p style="font-size: 11px; color: #6B7280; margin: 0;">Vivalea Care · Diagnostic Matérialité Sociale · Généré automatiquement</p>
  </div>
</div>
```

---

### Template 2 : `template_8maoisj`
**Destinataire** : {{to_email}} (le prospect)

**Subject** :
```
Votre diagnostic — Coût de l'aidance chez {{entreprise}}
```

**Body (HTML)** — copie-colle ce code :

```html
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #18263F;">
  
  <!-- HEADER -->
  <div style="background: #f8f6f4; padding: 28px; border-radius: 12px 12px 0 0; text-align: center;">
    <div style="font-size: 20px; color: #8F1349; font-weight: bold; letter-spacing: 0.05em;">VIVALEA CARE</div>
    <h1 style="font-size: 18px; color: #18263F; margin: 12px 0 4px;">Coût de l'aidance chez <span style="color: #8F1349;">{{entreprise}}</span></h1>
    <p style="font-size: 13px; color: #6B7280; margin: 0;">{{secteur}} · Rapport CODIR</p>
  </div>

  <!-- INTRO -->
  <div style="padding: 24px 28px; background: #fff;">
    <p style="font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
      Bonjour {{nom}},<br><br>
      Merci d'avoir complété le Diagnostic de Matérialité Sociale Vivalea Care. Voici la synthèse de votre rapport personnalisé.
    </p>

    <!-- KPIs -->
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="width: 33%; text-align: center; padding: 12px; background: #8F134915; border-radius: 8px;">
          <div style="font-size: 11px; color: #6B7280;">Aidants estimés</div>
          <div style="font-size: 22px; color: #8F1349; font-weight: bold;">{{n_aidants}}</div>
        </td>
        <td style="width: 4%;"></td>
        <td style="width: 63%; text-align: center; padding: 12px; background: #DC262615; border-radius: 8px;">
          <div style="font-size: 11px; color: #DC2626;">Fuite financière annuelle</div>
          <div style="font-size: 22px; color: #DC2626; font-weight: bold;">{{fuite_financiere}} €</div>
        </td>
      </tr>
    </table>

    <!-- ROI -->
    <h2 style="font-size: 15px; color: #8F1349; margin: 0 0 12px;">📈 ROI récupérable</h2>
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <tr style="background: #f8f6f4;"><td style="padding: 8px 12px;">Absentéisme</td><td style="padding: 8px 12px; text-align: right; font-weight: bold;">{{roi_absenteisme}} €</td></tr>
      <tr><td style="padding: 8px 12px;">Présentéisme</td><td style="padding: 8px 12px; text-align: right; font-weight: bold;">{{roi_presenteisme}} €</td></tr>
      <tr style="background: #f8f6f4;"><td style="padding: 8px 12px;">Turnover</td><td style="padding: 8px 12px; text-align: right; font-weight: bold;">{{roi_turnover}} €</td></tr>
      <tr><td style="padding: 8px 12px;">Désorganisation</td><td style="padding: 8px 12px; text-align: right; font-weight: bold;">{{roi_desorganisation}} €</td></tr>
      <tr style="background: #f8f6f4;"><td style="padding: 8px 12px;">RPS / Arrêts longs</td><td style="padding: 8px 12px; text-align: right; font-weight: bold;">{{roi_rps}} €</td></tr>
      <tr><td style="padding: 8px 12px;">Marque employeur</td><td style="padding: 8px 12px; text-align: right; font-weight: bold;">{{roi_marque}} €</td></tr>
    </table>

    <div style="background: #0F766E15; padding: 16px; border-radius: 8px; text-align: center; margin: 16px 0;">
      <div style="font-size: 12px; color: #0F766E; font-weight: bold;">✅ Gain potentiel total avec accompagnement</div>
      <div style="font-size: 26px; color: #0F766E; font-weight: bold;">{{roi_total}} € /an</div>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <tr style="background: #f8f6f4;">
        <td style="padding: 10px 12px;">Score de maturité CSRD</td>
        <td style="padding: 10px 12px; text-align: right; font-weight: bold;">{{score_csrd}} / 100</td>
      </tr>
      <tr style="background: #8F134915;">
        <td style="padding: 10px 12px; font-weight: bold;">ROI estimé</td>
        <td style="padding: 10px 12px; text-align: right; color: #8F1349; font-weight: bold; font-size: 16px;">{{roi_pct}} %</td>
      </tr>
    </table>

    <!-- CTA -->
    <div style="text-align: center; margin: 24px 0;">
      <p style="font-size: 14px; line-height: 1.6;">
        Vous souhaitez approfondir ces résultats avec un expert Vivalea Care ?
      </p>
      <a href="https://calendly.com/vivalea" style="display: inline-block; padding: 14px 32px; background: #8F1349; color: #fff; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px;">
        Planifier un rendez-vous →
      </a>
      <p style="font-size: 11px; color: #6B7280; margin: 8px 0 0;">30 min · Gratuit · Sans engagement</p>
    </div>
  </div>

  <!-- FOOTER -->
  <div style="padding: 16px 28px; background: #f8f6f4; border-radius: 0 0 12px 12px; text-align: center;">
    <p style="font-size: 11px; color: #6B7280; margin: 0;">
      Vivalea · Entreprise à impact et ESS · Simulation indicative, non contractuelle.<br>
      Vos données sont traitées de manière confidentielle.
    </p>
  </div>
</div>
```

---

## 2. Configuration dans EmailJS Dashboard

### Étapes pour mettre à jour chaque template :

1. Va sur https://dashboard.emailjs.com → **Email Templates**
2. Clique sur le template existant (`template_427e77g` ou `template_8maoisj`)
3. **To Email** :
   - Template Vivalea (`template_427e77g`) : `lea@vivalea.fr`
   - Template Client (`template_8maoisj`) : `{{to_email}}`
4. **Subject** : copie le sujet indiqué ci-dessus
5. Passe en mode **HTML** (bouton `<>` dans l'éditeur)
6. Remplace le contenu par le code HTML correspondant
7. **Sauvegarde**

### Variables utilisées dans les templates :

| Variable | Description |
|----------|-------------|
| `{{nom}}` | Nom du lead |
| `{{email}}` | Email du lead |
| `{{to_email}}` | Email destinataire (template client) |
| `{{entreprise}}` | Nom de l'entreprise |
| `{{secteur}}` | Secteur d'activité |
| `{{fonction}}` | Fonction du lead |
| `{{effectif}}` | Nombre d'ETP |
| `{{tranche_age}}` | Tranche d'âge majoritaire |
| `{{salaire_moyen}}` | Salaire moyen chargé |
| `{{taux_absenteisme}}` | Taux d'absentéisme (%) |
| `{{nb_departs}}` | Nombre de départs (12 mois) |
| `{{n_aidants}}` | Nombre d'aidants estimés |
| `{{fuite_financiere}}` | Fuite financière annuelle |
| `{{roi_absenteisme}}` | ROI Absentéisme |
| `{{roi_presenteisme}}` | ROI Présentéisme |
| `{{roi_turnover}}` | ROI Turnover |
| `{{roi_desorganisation}}` | ROI Désorganisation |
| `{{roi_rps}}` | ROI RPS / Arrêts longs |
| `{{roi_marque}}` | ROI Marque employeur |
| `{{roi_total}}` | ROI Total |
| `{{score_csrd}}` | Score CSRD (/100) |
| `{{roi_pct}}` | ROI en % |
| `{{investissement}}` | Investissement Vivalea |
| `{{nb_contrats}}` | Nombre de contrats proposés |
| `{{culture_manager}}` | Formation managers (Vivalea only) |
| `{{dispositifs}}` | Dispositifs existants (Vivalea only) |
| `{{pilotage_data}}` | Pilotage KPI (Vivalea only) |
| `{{mesures_csrd}}` | Mesures RSE/CSRD (Vivalea only) |
| `{{contrat_creche}}` | Partenariat crèche (Vivalea only) |

---

## 3. Flux complet

Quand un prospect clique "Générer mon Diagnostic" :

1. ✅ **PDF généré** côté client (jsPDF) → auto-download sur le poste du prospect
2. ✅ **Email Vivalea** envoyé à lea@vivalea.fr avec :
   - Coordonnées complètes du lead
   - Intelligence commerciale (crèche, dispositifs, mesures CSRD)
   - Rapport chiffré complet (ROI détaillé, score CSRD, investissement)
3. ✅ **Email Client** envoyé au prospect avec :
   - Rapport chiffré (sans données commerciales)
   - CTA vers Calendly
4. ✅ **Rapport affiché** à l'écran avec bouton "Télécharger le rapport PDF"

---

## 4. Limites & évolution Odoo

EmailJS ne permet pas d'attacher un fichier PDF directement dans l'email via l'API REST. Le PDF est donc :
- **Auto-téléchargé** sur le poste du prospect au moment de la soumission
- **Re-téléchargeable** via le bouton sur la page de résultats
- Les emails contiennent le **rapport complet en HTML** (formaté comme un PDF)

Pour l'attachement PDF natif dans les emails, il faudra passer par **Odoo CRM** (prévu) ou un backend Node.js/Python avec Nodemailer/SendGrid.
