// /api/send-email.js — Vercel Function pour le Diagnostic Coût Aidant (Resend + notif.vivalea.fr)
// Templates harmonisés avec MaPrimeAdapt' (même structure, mêmes couleurs)

const fmt = (n) => new Intl.NumberFormat("fr-FR").format(Math.round(Number(n) || 0));
const esc = (s) => String(s || "").replace(/[<>&"']/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#39;"}[c]));

const C = {
  magenta: "#8F1349", navy: "#18263F", orange: "#E9552E",
  green: "#0F766E", red: "#DC2626",
  bg: "#F8F6F4", border: "#E8E2DD", muted: "#6B7280",
  white: "#FFFFFF", cream: "#FFF1E4",
};

const header = (badge, title, subtitle) => `
  <div style="background:${C.magenta};color:${C.white};padding:28px 32px;">
    <div style="font-size:11px;letter-spacing:0.18em;opacity:0.75;text-transform:uppercase;margin-bottom:10px;">${esc(badge)}</div>
    <div style="font-size:24px;font-weight:700;line-height:1.2;">${esc(title)}</div>
    ${subtitle ? `<div style="font-size:13px;opacity:0.9;margin-top:6px;">${esc(subtitle)}</div>` : ""}
  </div>`;

const section = (icon, title, content, bgColor = "transparent") => `
  <div style="padding:24px 32px;border-bottom:1px solid ${C.border};${bgColor !== "transparent" ? `background:${bgColor};` : ""}">
    <div style="font-size:11px;color:${C.magenta};font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:14px;">${icon} ${esc(title)}</div>
    ${content}
  </div>`;

const row = (label, value, options = {}) => `
  <tr>
    <td style="color:${C.muted};width:200px;padding:3px 0;vertical-align:top;">${esc(label)}</td>
    <td style="padding:3px 0;${options.bold ? "font-weight:700;" : ""}${options.color ? `color:${options.color};` : ""}">${options.raw ? value : esc(value || "—")}</td>
  </tr>`;

const table = (rows) => `<table style="width:100%;font-size:13px;line-height:1.6;">${rows}</table>`;

const footer = (subline) => `
  <div style="padding:20px 32px;background:${C.navy};color:${C.white};text-align:center;font-size:11px;line-height:1.6;">
    <div style="opacity:0.95;font-weight:600;letter-spacing:0.05em;">Vivalea · Entreprise à impact et ESS</div>
    <div style="opacity:0.7;margin-top:4px;">${esc(subline)}</div>
  </div>`;

const kpiCard = (label, value, color) => `
  <div style="flex:1;background:${C.white};padding:16px 14px;border-radius:10px;border:1px solid ${C.border};text-align:center;">
    <div style="font-size:11px;color:${C.muted};margin-bottom:6px;">${esc(label)}</div>
    <div style="font-size:22px;font-weight:700;color:${color};line-height:1.2;">${value}</div>
  </div>`;

// ── EMAIL INTERNE ────────────────────────────────────────────────────
function buildInternalEmail(d) {
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>Nouveau lead Diagnostic</title></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:${C.bg};color:${C.navy};">
<div style="max-width:640px;margin:0 auto;background:${C.white};">
  ${header("Nouveau lead · Diagnostic Coût Aidants", d.nom, `${d.entreprise} · ${d.secteur} · ${d.fonction}`)}
  <div style="padding:24px 32px;border-bottom:1px solid ${C.border};background:${C.bg};">
    <div style="display:flex;gap:10px;">
      ${kpiCard("Aidants estimés", fmt(d.n_aidants), C.magenta)}
      ${kpiCard("Fuite annuelle", `${esc(d.fuite_financiere)} €`, C.red)}
      ${kpiCard("Gain potentiel", `${esc(d.roi_total)} €`, C.green)}
    </div>
  </div>
  ${section("📇", "Coordonnées du lead", table(
    row("Nom", d.nom, {bold: true}) +
    row("Entreprise", d.entreprise, {bold: true}) +
    row("Email", `<a href="mailto:${esc(d.email)}" style="color:${C.magenta};text-decoration:none;">${esc(d.email)}</a>`, {raw: true}) +
    row("Fonction", d.fonction) +
    row("Secteur", d.secteur)
  ))}
  ${section("🏢", "Profil entreprise", table(
    row("Effectif (ETP)", fmt(d.effectif), {bold: true}) +
    row("Tranche d'âge majoritaire", d.tranche_age) +
    row("Salaire moyen chargé", `${esc(d.salaire_moyen)} €`) +
    row("Taux d'absentéisme", `${esc(d.taux_absenteisme)}%`) +
    row("Départs sur 12 mois", d.nb_departs)
  ))}
  ${section("📊", "Diagnostic calculé — détail ROI", table(
    row("Score CSRD actuel", `${esc(d.score_csrd)}/100`, {bold: true, color: C.magenta}) +
    row("ROI Absentéisme", `${esc(d.roi_absenteisme)} €`) +
    row("ROI Présentéisme", `${esc(d.roi_presenteisme)} €`) +
    row("ROI Turnover", `${esc(d.roi_turnover)} €`) +
    row("ROI Désorganisation", `${esc(d.roi_desorganisation)} €`) +
    row("ROI RPS / Arrêts longs", `${esc(d.roi_rps)} €`) +
    row("ROI Marque employeur", `${esc(d.roi_marque)} €`)
  ), C.bg)}
  ${section("💰", "Investissement & ROI projeté", table(
    row("Investissement Vivalea", `${esc(d.investissement)} €`, {bold: true}) +
    row("Nombre de contrats", `${esc(d.nb_contrats)} contrats`) +
    row("ROI %", `${esc(d.roi_pct)}%`, {bold: true, color: C.green})
  ))}
  ${section("🎯", "Intelligence commerciale", table(
    row("Culture managers", d.culture_manager) +
    row("Dispositifs existants", d.dispositifs) +
    row("Pilotage data", d.pilotage_data) +
    row("Mesures CSRD prévues", d.mesures_csrd) +
    row("Contrat crèche", `<strong style="color:${d.contrat_creche.includes("OUI") ? C.green : C.muted};">${esc(d.contrat_creche)}</strong>`, {raw: true})
  ), "#FFF6E0")}
  ${footer(`Lead capturé le ${new Date().toLocaleString("fr-FR", {dateStyle: "long", timeStyle: "short"})}`)}
</div>
</body></html>`;
}

// ── EMAIL PROSPECT (récap complet) ───────────────────────────────────
function buildProspectEmail(d) {
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>Votre diagnostic Vivalea Care</title></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:${C.bg};color:${C.navy};">
<div style="max-width:640px;margin:0 auto;background:${C.white};">
  ${header("Votre diagnostic personnalisé", "Vivalea Care", `Merci ${d.nom}, voici votre rapport`)}
  <div style="padding:28px 32px;border-bottom:1px solid ${C.border};background:${C.bg};">
    <div style="display:flex;gap:10px;margin-bottom:16px;">
      ${kpiCard("Aidants estimés", fmt(d.n_aidants), C.magenta)}
      ${kpiCard("Fuite annuelle", `${esc(d.fuite_financiere)} €`, C.red)}
    </div>
    <div style="background:#E6F5F0;padding:18px;border-radius:10px;text-align:center;border:1px solid ${C.green}33;">
      <div style="font-size:12px;color:${C.green};font-weight:600;margin-bottom:4px;letter-spacing:0.05em;">✅ GAIN POTENTIEL ANNUEL</div>
      <div style="font-size:30px;font-weight:700;color:${C.green};line-height:1.1;">${esc(d.roi_total)} €<span style="font-size:16px;font-weight:400;">/an</span></div>
    </div>
  </div>
  ${section("📋", "Récapitulatif de votre saisie", table(
    row("Entreprise", d.entreprise, {bold: true}) +
    row("Secteur", d.secteur) +
    row("Votre fonction", d.fonction) +
    row("Effectif (ETP)", fmt(d.effectif)) +
    row("Tranche d'âge majoritaire", d.tranche_age) +
    row("Salaire moyen chargé", `${esc(d.salaire_moyen)} €`) +
    row("Taux d'absentéisme", `${esc(d.taux_absenteisme)}%`) +
    row("Départs sur 12 mois", d.nb_departs)
  ))}
  ${section("📈", "ROI récupérable par poste", table(
    row("Absentéisme", `${esc(d.roi_absenteisme)} €`) +
    row("Présentéisme", `${esc(d.roi_presenteisme)} €`) +
    row("Turnover", `${esc(d.roi_turnover)} €`) +
    row("Désorganisation", `${esc(d.roi_desorganisation)} €`) +
    row("RPS / Arrêts longs", `${esc(d.roi_rps)} €`) +
    row("Marque employeur", `${esc(d.roi_marque)} €`)
  ), C.bg)}
  ${section("🏛️", "Votre Score CSRD", `
    <div style="display:flex;gap:14px;align-items:center;">
      <div style="flex:1;padding:18px;background:${C.bg};border-radius:10px;border:1px solid ${C.border};text-align:center;">
        <div style="font-size:11px;color:${C.muted};margin-bottom:6px;">Aujourd'hui</div>
        <div style="font-size:30px;font-weight:700;color:${C.magenta};line-height:1;">${esc(d.score_csrd)}<span style="font-size:14px;color:${C.muted};font-weight:400;">/100</span></div>
      </div>
      <div style="color:${C.muted};font-size:22px;">→</div>
      <div style="flex:1;padding:18px;background:#E6F5F0;border-radius:10px;border:1px solid ${C.green}33;text-align:center;">
        <div style="font-size:11px;color:${C.green};margin-bottom:6px;font-weight:600;">Avec Vivalea</div>
        <div style="font-size:30px;font-weight:700;color:${C.green};line-height:1;">80<span style="font-size:14px;color:${C.muted};font-weight:400;">/100</span></div>
      </div>
    </div>
    <div style="font-size:12px;color:${C.muted};margin-top:14px;line-height:1.5;">Avec l'accompagnement Vivalea Care : formation managers, dispositifs structurés et pilotage KPI sociaux. Conformité ESRS S1 acquise.</div>
  `)}
  ${section("💼", "Accompagnement Vivalea Care", `
    <div style="text-align:center;padding:8px 0;">
      <div style="font-size:13px;color:${C.muted};margin-bottom:4px;">À partir de</div>
      <div style="font-size:38px;font-weight:700;color:${C.magenta};line-height:1.1;">180 €<span style="font-size:16px;color:${C.muted};font-weight:400;"> /mois</span></div>
      <div style="font-size:12px;color:${C.muted};margin-top:6px;">par salarié aidant accompagné</div>
    </div>
  `, C.bg)}
  <div style="padding:28px 32px;text-align:center;">
    <a href="https://calendly.com/vivalea" style="display:inline-block;background:${C.magenta};color:${C.white};padding:16px 32px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;">Prendre un moment pour détailler ensemble votre simulation →</a>
    <div style="font-size:11px;color:${C.muted};margin-top:10px;">30 min · Gratuit · Sans engagement</div>
  </div>
  <div style="padding:0 32px 28px;font-size:13px;line-height:1.6;color:${C.muted};">
    À très bientôt,<br/>
    <strong style="color:${C.navy};">L'équipe Vivalea Care</strong>
  </div>
  ${footer("Données indicatives basées sur vos paramètres · Vos données sont traitées de manière confidentielle.")}
</div>
</body></html>`;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const data = req.body;
  if (!data || !data.email || !data.entreprise) return res.status(400).json({ error: "Missing required fields" });
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) return res.status(500).json({ error: "RESEND_API_KEY not configured" });
  const FROM = process.env.RESEND_FROM || "Vivalea Care <onboarding@resend.dev>";
  const INTERNAL_TO = process.env.INTERNAL_EMAIL || "ctsilefa@vivalea.fr";
  
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  
  async function sendEmail(payload, label) {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await resp.json();
    console.log(`[${label}] status=${resp.status} result=${JSON.stringify(result)}`);
    return { ok: resp.ok, status: resp.status, result };
  }
  
  try {
    // 1️⃣ Email INTERNE
    const internal = await sendEmail({
      from: FROM, to: [INTERNAL_TO], reply_to: data.email,
      subject: `🎯 Nouveau lead Diagnostic — ${data.entreprise} (${data.secteur})`,
      html: buildInternalEmail(data),
    }, "INTERNAL");
    
    if (!internal.ok) {
      return res.status(500).json({ error: "Internal email failed", details: internal.result });
    }
    
    // ⏱️ Délai pour respecter le rate-limit Resend (2 req/sec en gratuit)
    await sleep(700);
    
    // 2️⃣ Email PROSPECT
    const prospect = await sendEmail({
      from: FROM, to: [data.email], reply_to: INTERNAL_TO,
      subject: `Votre Diagnostic Vivalea Care — ${data.entreprise}`,
      html: buildProspectEmail(data),
    }, "PROSPECT");
    
    if (!prospect.ok) {
      return res.status(207).json({
        ok: true, internalSent: true, prospectFailed: true,
        prospectError: prospect.result, internalId: internal.result.id,
      });
    }
    
    return res.status(200).json({
      ok: true, internalId: internal.result.id, prospectId: prospect.result.id,
    });
  } catch (err) {
    console.error("Send error:", err.message, err.stack);
    return res.status(500).json({ error: err.message });
  }
}
