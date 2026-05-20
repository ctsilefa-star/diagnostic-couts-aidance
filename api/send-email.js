// /api/send-email.js — Vercel Function pour envoyer les emails du Diagnostic Coût Aidant via Resend

// Helpers
const fmt = (n) => new Intl.NumberFormat("fr-FR").format(Math.round(Number(n) || 0));
const escape = (s) => String(s || "").replace(/[<>&"']/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#39;"}[c]));

// ── Template HTML email INTERNE (notification Vivalea) ───────────────
function buildInternalEmail(d) {
  return `
<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>Nouveau lead Diagnostic</title></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#F8F6F4;color:#18263F;">
<div style="max-width:600px;margin:0 auto;background:#FFFFFF;">
  <div style="background:#8F1349;color:#FFF;padding:24px 28px;">
    <div style="font-size:11px;letter-spacing:0.15em;opacity:0.8;text-transform:uppercase;margin-bottom:6px;">Nouveau lead · Diagnostic Coût Aidants</div>
    <div style="font-size:22px;font-weight:700;">${escape(d.entreprise)}</div>
    <div style="font-size:13px;opacity:0.9;margin-top:4px;">${escape(d.secteur)} · ${escape(d.fonction)}</div>
  </div>
  
  <div style="padding:24px 28px;border-bottom:1px solid #E8E2DD;">
    <div style="font-size:11px;color:#8F1349;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:14px;">📇 Coordonnées du lead</div>
    <table style="width:100%;font-size:13px;line-height:1.7;">
      <tr><td style="color:#6B7280;width:140px;">Nom</td><td><strong>${escape(d.nom)}</strong></td></tr>
      <tr><td style="color:#6B7280;">Entreprise</td><td><strong>${escape(d.entreprise)}</strong></td></tr>
      <tr><td style="color:#6B7280;">Email</td><td><a href="mailto:${escape(d.email)}" style="color:#8F1349;">${escape(d.email)}</a></td></tr>
      <tr><td style="color:#6B7280;">Fonction</td><td>${escape(d.fonction)}</td></tr>
      <tr><td style="color:#6B7280;">Secteur</td><td>${escape(d.secteur)}</td></tr>
    </table>
  </div>
  
  <div style="padding:24px 28px;border-bottom:1px solid #E8E2DD;">
    <div style="font-size:11px;color:#8F1349;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:14px;">🏢 Profil entreprise</div>
    <table style="width:100%;font-size:13px;line-height:1.7;">
      <tr><td style="color:#6B7280;width:200px;">Effectif (ETP)</td><td><strong>${fmt(d.effectif)}</strong></td></tr>
      <tr><td style="color:#6B7280;">Tranche d'âge majoritaire</td><td>${escape(d.tranche_age)}</td></tr>
      <tr><td style="color:#6B7280;">Salaire moyen chargé (€)</td><td>${escape(d.salaire_moyen)} €</td></tr>
      <tr><td style="color:#6B7280;">Taux absentéisme</td><td>${escape(d.taux_absenteisme)}%</td></tr>
      <tr><td style="color:#6B7280;">Départs 12 mois</td><td>${escape(d.nb_departs)}</td></tr>
    </table>
  </div>
  
  <div style="padding:24px 28px;border-bottom:1px solid #E8E2DD;background:#F8F6F4;">
    <div style="font-size:11px;color:#8F1349;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:14px;">📊 Diagnostic calculé</div>
    <div style="display:flex;gap:12px;margin-bottom:16px;">
      <div style="flex:1;background:#FFFFFF;padding:14px;border-radius:8px;border:1px solid #E8E2DD;">
        <div style="font-size:11px;color:#6B7280;margin-bottom:4px;">Aidants estimés</div>
        <div style="font-size:22px;font-weight:700;color:#8F1349;">${fmt(d.n_aidants)}</div>
      </div>
      <div style="flex:1;background:#FFFFFF;padding:14px;border-radius:8px;border:1px solid #E8E2DD;">
        <div style="font-size:11px;color:#6B7280;margin-bottom:4px;">Fuite annuelle</div>
        <div style="font-size:22px;font-weight:700;color:#DC2626;">${escape(d.fuite_financiere)} €</div>
      </div>
      <div style="flex:1;background:#FFFFFF;padding:14px;border-radius:8px;border:1px solid #E8E2DD;">
        <div style="font-size:11px;color:#6B7280;margin-bottom:4px;">Gain potentiel</div>
        <div style="font-size:22px;font-weight:700;color:#0F766E;">${escape(d.roi_total)} €</div>
      </div>
    </div>
    <table style="width:100%;font-size:13px;line-height:1.7;">
      <tr><td style="color:#6B7280;width:200px;">Score CSRD actuel</td><td><strong>${escape(d.score_csrd)}/100</strong></td></tr>
      <tr><td style="color:#6B7280;">ROI Absentéisme</td><td>${escape(d.roi_absenteisme)} €</td></tr>
      <tr><td style="color:#6B7280;">ROI Présentéisme</td><td>${escape(d.roi_presenteisme)} €</td></tr>
      <tr><td style="color:#6B7280;">ROI Turnover</td><td>${escape(d.roi_turnover)} €</td></tr>
      <tr><td style="color:#6B7280;">ROI Désorganisation</td><td>${escape(d.roi_desorganisation)} €</td></tr>
      <tr><td style="color:#6B7280;">ROI RPS / Arrêts longs</td><td>${escape(d.roi_rps)} €</td></tr>
      <tr><td style="color:#6B7280;">ROI Marque employeur</td><td>${escape(d.roi_marque)} €</td></tr>
      <tr><td style="color:#6B7280;border-top:1px solid #E8E2DD;padding-top:6px;">Investissement Vivalea</td><td style="border-top:1px solid #E8E2DD;padding-top:6px;"><strong>${escape(d.investissement)} €</strong> (${escape(d.nb_contrats)} contrats)</td></tr>
      <tr><td style="color:#6B7280;">ROI %</td><td><strong>${escape(d.roi_pct)}%</strong></td></tr>
    </table>
  </div>
  
  <div style="padding:24px 28px;background:#FFF6E0;border-bottom:1px solid #E8E2DD;">
    <div style="font-size:11px;color:#E9552E;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:14px;">🎯 Intelligence commerciale</div>
    <table style="width:100%;font-size:13px;line-height:1.7;">
      <tr><td style="color:#6B7280;width:200px;vertical-align:top;">Culture managers</td><td>${escape(d.culture_manager)}</td></tr>
      <tr><td style="color:#6B7280;vertical-align:top;">Dispositifs existants</td><td>${escape(d.dispositifs) || '<em style="color:#6B7280;">Aucun</em>'}</td></tr>
      <tr><td style="color:#6B7280;vertical-align:top;">Pilotage data</td><td>${escape(d.pilotage_data)}</td></tr>
      <tr><td style="color:#6B7280;vertical-align:top;">Mesures CSRD</td><td>${escape(d.mesures_csrd) || '<em style="color:#6B7280;">Aucune</em>'}</td></tr>
      <tr><td style="color:#6B7280;vertical-align:top;"><strong>Contrat crèche</strong></td><td><strong style="color:${d.contrat_creche.includes('OUI')?'#0F766E':'#6B7280'}">${escape(d.contrat_creche)}</strong></td></tr>
    </table>
  </div>
  
  <div style="padding:18px 28px;background:#18263F;color:#FFFFFF;text-align:center;font-size:11px;opacity:0.85;">
    Vivalea Care · Lead capturé depuis le simulateur CSRD 2026<br/>
    Reçu le ${new Date().toLocaleString("fr-FR",{dateStyle:"long",timeStyle:"short"})}
  </div>
</div>
</body></html>`;
}

// ── Template HTML email PROSPECT (récap court) ──────────────────────
function buildProspectEmail(d) {
  return `
<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>Votre diagnostic Vivalea</title></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#F8F6F4;color:#18263F;">
<div style="max-width:600px;margin:0 auto;background:#FFFFFF;">
  <div style="background:#8F1349;color:#FFF;padding:32px 28px;text-align:center;">
    <div style="font-size:28px;font-weight:700;letter-spacing:-0.02em;">Vivalea <span style="font-size:13px;opacity:0.75;font-weight:400;letter-spacing:0.15em;">CARE</span></div>
    <div style="font-size:14px;opacity:0.9;margin-top:6px;">Votre diagnostic personnalisé</div>
  </div>
  
  <div style="padding:32px 28px;">
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">Bonjour ${escape(d.nom)},</p>
    <p style="font-size:15px;line-height:1.6;color:#18263F;margin:0 0 24px;">Merci d'avoir réalisé votre <strong>Diagnostic de Matérialité Sociale & Impact Aidance</strong>. Voici les principaux résultats de votre simulation pour <strong>${escape(d.entreprise)}</strong> :</p>
    
    <div style="background:#F8F6F4;border-radius:12px;padding:24px;margin-bottom:24px;">
      <div style="display:flex;gap:12px;margin-bottom:16px;">
        <div style="flex:1;background:#FFFFFF;padding:16px;border-radius:8px;text-align:center;border:1px solid #E8E2DD;">
          <div style="font-size:11px;color:#6B7280;margin-bottom:6px;">Aidants estimés</div>
          <div style="font-size:24px;font-weight:700;color:#8F1349;">${fmt(d.n_aidants)}</div>
        </div>
        <div style="flex:1;background:#FFFFFF;padding:16px;border-radius:8px;text-align:center;border:1px solid #E8E2DD;">
          <div style="font-size:11px;color:#6B7280;margin-bottom:6px;">Fuite annuelle estimée</div>
          <div style="font-size:24px;font-weight:700;color:#DC2626;">${escape(d.fuite_financiere)} €</div>
        </div>
      </div>
      <div style="background:#E8F5E9;padding:16px;border-radius:8px;text-align:center;">
        <div style="font-size:12px;color:#0F766E;font-weight:600;margin-bottom:4px;">✅ Gain potentiel avec accompagnement</div>
        <div style="font-size:28px;font-weight:700;color:#0F766E;">${escape(d.roi_total)} €/an</div>
      </div>
    </div>
    
    <div style="background:#FFF;border:1px solid #E8E2DD;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
      <div style="font-size:13px;color:#6B7280;margin-bottom:6px;">🏛️ Votre Score CSRD aujourd'hui</div>
      <div style="font-size:32px;font-weight:700;color:#8F1349;">${escape(d.score_csrd)}<span style="font-size:16px;color:#6B7280;font-weight:400;">/100</span></div>
      <div style="font-size:12px;color:#6B7280;margin-top:8px;">Projection avec Vivalea Care : <strong style="color:#0F766E;">80/100</strong> (conformité ESRS S1)</div>
    </div>
    
    <p style="font-size:15px;line-height:1.6;color:#18263F;margin:0 0 16px;">Le rapport complet contenant l'ensemble des analyses, la décomposition du ROI sur 6 postes et les sources scientifiques est disponible en téléchargement sur la page de résultats du simulateur.</p>
    
    <div style="text-align:center;margin:32px 0;">
      <a href="https://calendly.com/vivalea" style="display:inline-block;background:#8F1349;color:#FFF;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;">Prendre un moment pour détailler ensemble votre simulation →</a>
      <div style="font-size:11px;color:#6B7280;margin-top:8px;">30 min · Gratuit · Sans engagement</div>
    </div>
    
    <p style="font-size:13px;line-height:1.6;color:#6B7280;margin:24px 0 0;border-top:1px solid #E8E2DD;padding-top:20px;">À très bientôt,<br/><strong style="color:#18263F;">L'équipe Vivalea Care</strong></p>
  </div>
  
  <div style="padding:18px 28px;background:#18263F;color:#FFFFFF;text-align:center;font-size:11px;opacity:0.85;">
    Vivalea · Entreprise à impact et ESS · Données indicatives basées sur vos paramètres.<br/>
    Vos données sont traitées de manière confidentielle.
  </div>
</div>
</body></html>`;
}

// ── Handler principal ───────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS pour iframe embed Webflow
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  
  const data = req.body;
  if (!data || !data.email || !data.entreprise) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) return res.status(500).json({ error: "RESEND_API_KEY not configured" });
  
  const FROM = process.env.RESEND_FROM || "Vivalea Care <onboarding@resend.dev>";
  const INTERNAL_TO = process.env.INTERNAL_EMAIL || "ctsilefa@vivalea.fr";
  
  try {
    // 1️⃣ Email interne (notification Vivalea avec toutes les données)
    const internalRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [INTERNAL_TO],
        reply_to: data.email,
        subject: `🎯 Nouveau lead Diagnostic — ${data.entreprise} (${data.secteur})`,
        html: buildInternalEmail(data),
      }),
    });
    
    const internalResult = await internalRes.json();
    if (!internalRes.ok) {
      console.error("Internal email failed:", internalResult);
      return res.status(500).json({ error: "Internal email failed", details: internalResult });
    }
    
    // 2️⃣ Email prospect (récap)
    const prospectRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [data.email],
        reply_to: INTERNAL_TO,
        subject: `Votre Diagnostic Vivalea Care — ${data.entreprise}`,
        html: buildProspectEmail(data),
      }),
    });
    
    const prospectResult = await prospectRes.json();
    if (!prospectRes.ok) {
      // L'email interne a déjà été envoyé, on signale juste le partial fail
      console.warn("Prospect email failed:", prospectResult);
      return res.status(200).json({ ok: true, prospectFailed: true, details: prospectResult });
    }
    
    return res.status(200).json({ ok: true, internalId: internalResult.id, prospectId: prospectResult.id });
  } catch (err) {
    console.error("Send error:", err);
    return res.status(500).json({ error: err.message });
  }
}
