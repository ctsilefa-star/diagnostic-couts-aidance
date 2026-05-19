import { useState, useEffect, useRef } from "react";

const COLORS = {
  magenta: "#8F1349",
  magentaLight: "#8F134915",
  magentaHover: "#7A1040",
  navy: "#18263F",
  orange: "#E9552E",
  orangeLight: "#E9552E12",
  white: "#FFFFFF",
  bg: "#F8F6F4",
  bgCard: "#FFFFFF",
  border: "#E8E2DD",
  textMuted: "#6B7280",
  green: "#0F766E",
  greenLight: "#0F766E12",
  red: "#DC2626",
  redLight: "#DC262612",
  amber: "#D97706",
  amberLight: "#D9770612",
};

const SECTORS = [
  "Industrie",
  "Santé",
  "Services & Finance",
  "BTP",
  "Public",
  "Autre",
];

const AGE_OPTIONS = [
  { value: "junior", label: "Junior (< 35 ans)", coeff: 0.12 },
  { value: "equilibree", label: "Équilibrée (35-45 ans)", coeff: 0.20 },
  { value: "senior", label: "Sénior (> 45 ans)", coeff: 0.32 },
];

const MANAGER_OPTIONS = [
  { value: "oui", label: "Oui, tous", points: 20 },
  { value: "partiel", label: "Partiellement / En cours", points: 10 },
  { value: "non", label: "Non, pas à ce jour", points: 0 },
];

const DISPOSITIFS = [
  { value: "teletravail", label: "Télétravail flexible / Aménagement horaires" },
  { value: "conge_aidant", label: "Congé proche aidant (rémunéré ou complété)" },
  { value: "don_jours", label: "Don de jours de congés entre collègues" },
  { value: "ecoute_psy", label: "Ligne d'écoute / Soutien psychologique" },
  { value: "referent", label: "Référent aidant en entreprise" },
  { value: "cesu", label: "CESU (Chèques Emploi Service Universels)" },
  { value: "formation_managers", label: "Sensibilisation / Formation managers" },
  { value: "mutuelle", label: "Mutuelle / Assistance classique" },
  { value: "care", label: "Service dédié de Care Management" },
  { value: "rien", label: "Rien de spécifique" },
];

const PILOTAGE_OPTIONS = [
  { value: "oui", label: "Oui", points: 20 },
  { value: "non", label: "Non", points: 0 },
];

const MESURES_CSRD = [
  { value: "bilan_carbone", label: "Bilan carbone / Empreinte environnementale" },
  { value: "rapport_rse", label: "Rapport RSE / DPEF" },
  { value: "indicateurs_sociaux", label: "Indicateurs sociaux (absentéisme, QVT, diversité)" },
  { value: "audit_extrafi", label: "Audit extra-financier" },
  { value: "label_rse", label: "Label RSE / Certification (B Corp, Lucie, EcoVadis…)" },
  { value: "aucune", label: "Aucune mesure en place" },
];

/* ─── EmailJS config ─── */
const EMAILJS_SERVICE = "service_jo37wws";
const EMAILJS_TEMPLATE_VIVALEA = "template_427e77g";
const EMAILJS_TEMPLATE_CLIENT = "template_8maoisj";
const EMAILJS_PUBLIC_KEY = "NkeIMabZ5jVKjFjKu";

/* ─── Fonts ─── */
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

/* ─── Styles ─── */
const styles = {
  container: {
    fontFamily: "'DM Sans', sans-serif",
    maxWidth: 580,
    margin: "0 auto",
    padding: "24px 16px",
    minHeight: "100vh",
    background: COLORS.bg,
    color: COLORS.navy,
  },
  header: {
    textAlign: "center",
    marginBottom: 8,
  },
  logoBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  logoText: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 22,
    color: COLORS.magenta,
    fontWeight: 400,
  },
  tagline: {
    fontSize: 11,
    color: COLORS.textMuted,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: COLORS.magentaLight,
    color: COLORS.magenta,
    fontSize: 11,
    fontWeight: 600,
    padding: "6px 14px",
    borderRadius: 20,
    marginBottom: 20,
  },
  card: {
    background: COLORS.bgCard,
    borderRadius: 20,
    padding: "32px 28px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    border: `1px solid ${COLORS.border}`,
    marginBottom: 16,
    animation: "fadeIn 0.4s ease-out",
  },
  stepTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 22,
    color: COLORS.navy,
    marginBottom: 4,
    lineHeight: 1.3,
  },
  stepSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 24,
    lineHeight: 1.5,
  },
  label: {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.navy,
    marginBottom: 8,
  },
  sublabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: 400,
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: `1.5px solid ${COLORS.border}`,
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    color: COLORS.navy,
    background: COLORS.white,
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },
  inputFocus: {
    borderColor: COLORS.magenta,
  },
  select: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: `1.5px solid ${COLORS.border}`,
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    color: COLORS.navy,
    background: COLORS.white,
    outline: "none",
    appearance: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  radioOption: (selected) => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    borderRadius: 12,
    border: `1.5px solid ${selected ? COLORS.magenta : COLORS.border}`,
    background: selected ? COLORS.magentaLight : COLORS.white,
    cursor: "pointer",
    transition: "all 0.2s",
    fontSize: 14,
    fontWeight: selected ? 600 : 400,
    color: COLORS.navy,
  }),
  radioDot: (selected) => ({
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: `2px solid ${selected ? COLORS.magenta : COLORS.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }),
  radioDotInner: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: COLORS.magenta,
  },
  checkboxOption: (checked) => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    borderRadius: 12,
    border: `1.5px solid ${checked ? COLORS.magenta : COLORS.border}`,
    background: checked ? COLORS.magentaLight : COLORS.white,
    cursor: "pointer",
    transition: "all 0.2s",
    fontSize: 14,
    fontWeight: checked ? 600 : 400,
    color: COLORS.navy,
  }),
  checkboxBox: (checked) => ({
    width: 18,
    height: 18,
    borderRadius: 5,
    border: `2px solid ${checked ? COLORS.magenta : COLORS.border}`,
    background: checked ? COLORS.magenta : COLORS.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.2s",
  }),
  progressBar: {
    display: "flex",
    gap: 6,
    marginBottom: 20,
  },
  progressDot: (active, done) => ({
    flex: 1,
    height: 4,
    borderRadius: 2,
    background: done ? COLORS.magenta : active ? COLORS.orange : COLORS.border,
    transition: "background 0.3s",
  }),
  fieldGroup: {
    marginBottom: 20,
  },
  buttonPrimary: (disabled) => ({
    width: "100%",
    padding: "16px",
    borderRadius: 14,
    border: "none",
    background: disabled ? `${COLORS.magenta}60` : COLORS.magenta,
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 700,
    fontFamily: "'DM Sans', sans-serif",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s",
    letterSpacing: "0.02em",
  }),
  buttonSecondary: {
    width: "100%",
    padding: "14px",
    borderRadius: 14,
    border: `1.5px solid ${COLORS.border}`,
    background: COLORS.white,
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  navRow: {
    display: "flex",
    gap: 10,
    marginTop: 8,
  },
  footer: {
    textAlign: "center",
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 16,
    lineHeight: 1.6,
  },
  /* ─── Results Page ─── */
  resultHeader: {
    textAlign: "center",
    padding: "28px 24px 24px",
    borderBottom: `2px solid ${COLORS.border}`,
    margin: "-32px -28px 24px -28px",
    background: COLORS.bg,
  },
  resultTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 24,
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 13,
    opacity: 0.85,
  },
  metricCard: (bgColor) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 18px",
    borderRadius: 14,
    background: bgColor,
    marginBottom: 10,
  }),
  metricLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: COLORS.navy,
  },
  metricValue: (color) => ({
    fontSize: 18,
    fontWeight: 700,
    color: color,
    fontFamily: "'DM Sans', sans-serif",
  }),
  bigNumber: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 36,
    color: COLORS.magenta,
    textAlign: "center",
    lineHeight: 1.1,
  },
  bigLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: "center",
    marginBottom: 20,
  },
  scoreGauge: (score) => ({
    width: "100%",
    height: 8,
    borderRadius: 4,
    background: COLORS.border,
    position: "relative",
    marginTop: 8,
    marginBottom: 4,
  }),
  scoreGaugeFill: (score) => ({
    height: "100%",
    borderRadius: 4,
    background: score >= 60 ? COLORS.green : score >= 30 ? COLORS.amber : COLORS.red,
    width: `${score}%`,
    transition: "width 1s ease-out",
  }),
  roiBar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    borderRadius: 10,
    background: COLORS.bg,
    marginBottom: 6,
    fontSize: 13,
  },
  roiBarFill: (width, color) => ({
    height: 6,
    borderRadius: 3,
    background: color,
    width: `${width}%`,
    minWidth: 8,
    transition: "width 0.8s ease-out",
  }),
  divider: {
    height: 1,
    background: COLORS.border,
    margin: "20px 0",
  },
  csrdBadge: (score) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
    background: score >= 60 ? COLORS.greenLight : score >= 30 ? COLORS.amberLight : COLORS.redLight,
    color: score >= 60 ? COLORS.green : score >= 30 ? COLORS.amber : COLORS.red,
  }),
  errorText: {
    fontSize: 12,
    color: COLORS.red,
    marginTop: 4,
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  input:focus, select:focus {
    border-color: ${COLORS.magenta} !important;
    box-shadow: 0 0 0 3px ${COLORS.magenta}20;
  }
  input::placeholder { color: ${COLORS.textMuted}; }
  button:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  * { box-sizing: border-box; }
`;
document.head.appendChild(styleSheet);

/* ─── Helpers ─── */
const fmt = (n) => new Intl.NumberFormat("fr-FR").format(Math.round(n));
const fmtK = (n) => {
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return fmt(n);
};

/* ─── Progress Bar ─── */
function ProgressBar({ step, total }) {
  return (
    <div style={styles.progressBar}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={styles.progressDot(i === step, i < step)}
        />
      ))}
    </div>
  );
}

/* ─── Check Icon ─── */
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Main Component ─── */
export default function DiagnosticAidants() {
  const [step, setStep] = useState(0);
  const [sending, setSending] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const cardRef = useRef(null);

  /* ─── Responsive ─── */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ─── Form Data ─── */
  const [data, setData] = useState({
    // Page 1
    nom: "",
    entreprise: "",
    secteur: "",
    secteurAutre: "",
    fonction: "",
    // Page 2
    effectif: "",
    trancheAge: "",
    salaireMoyen: "45000",
    // Page 3
    tauxAbsenteisme: "",
    nbDeparts: "",
    // Page 4
    cultureManager: "",
    dispositifs: [],
    pilotageData: "",
    mesuresCsrd: [],
    mesuresCsrdAutre: "",
    contratCreche: "",
    // Page 5
    email: "",
  });

  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const toggleDispositif = (val) => {
    setData(prev => {
      let arr = [...prev.dispositifs];
      if (val === "rien") {
        arr = arr.includes("rien") ? [] : ["rien"];
      } else {
        arr = arr.filter(v => v !== "rien");
        arr.includes(val) ? (arr = arr.filter(v => v !== val)) : arr.push(val);
      }
      return { ...prev, dispositifs: arr };
    });
  };

  const toggleMesure = (val) => {
    setData(prev => {
      let arr = [...prev.mesuresCsrd];
      if (val === "aucune") {
        arr = arr.includes("aucune") ? [] : ["aucune"];
      } else {
        arr = arr.filter(v => v !== "aucune");
        arr.includes(val) ? (arr = arr.filter(v => v !== val)) : arr.push(val);
      }
      return { ...prev, mesuresCsrd: arr };
    });
  };

  /* ─── Validation ─── */
  const validateStep = (s) => {
    const errs = {};
    if (s === 0) {
      if (!data.nom.trim()) errs.nom = "Requis";
      if (!data.entreprise.trim()) errs.entreprise = "Requis";
      if (!data.secteur) errs.secteur = "Requis";
      if (data.secteur === "Autre" && !data.secteurAutre.trim()) errs.secteur = "Précisez votre secteur";
      if (!data.fonction.trim()) errs.fonction = "Requis";
    }
    if (s === 1) {
      if (!data.effectif || Number(data.effectif) < 1) errs.effectif = "Requis";
      if (!data.trancheAge) errs.trancheAge = "Requis";
      if (!data.salaireMoyen || Number(data.salaireMoyen) < 1) errs.salaireMoyen = "Requis";
    }
    if (s === 2) {
      if (data.tauxAbsenteisme === "" || Number(data.tauxAbsenteisme) < 0) errs.tauxAbsenteisme = "Requis";
      if (data.nbDeparts === "" || Number(data.nbDeparts) < 0) errs.nbDeparts = "Requis";
    }
    if (s === 3) {
      if (!data.cultureManager) errs.cultureManager = "Requis";
      if (data.dispositifs.length === 0) errs.dispositifs = "Sélectionnez au moins un élément";
      if (!data.pilotageData) errs.pilotageData = "Requis";
    }
    if (s === 4) {
      if (!data.email.trim()) errs.email = "Requis";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Format email invalide";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    if (step < 4) {
      setStep(step + 1);
      scrollTop();
    } else {
      handleSubmit();
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
      scrollTop();
    }
  };

  const scrollTop = () => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* ─── Calculation ─── */
  const calcResults = () => {
    const effectif = Number(data.effectif) || 0;
    const ageOption = AGE_OPTIONS.find(a => a.value === data.trancheAge);
    const coeffAge = ageOption ? ageOption.coeff : 0.20;
    const salaire = Number(data.salaireMoyen) || 45000;
    const tauxAbs = Number(data.tauxAbsenteisme) || 5;
    const departs = Number(data.nbDeparts) || 0;

    const nAidants = Math.round(effectif * coeffAge);
    const coutJour = salaire / 218;
    const fuiteFinanciere = nAidants * 16 * coutJour;
    const gainPotentiel = fuiteFinanciere * 0.25;

    // Score CSRD (sur 100)
    let scoreCsrd = 0;
    const managerOpt = MANAGER_OPTIONS.find(m => m.value === data.cultureManager);
    scoreCsrd += managerOpt ? managerOpt.points : 0;

    // Dispositifs scoring (5 pts par dispositif, max 40)
    const hasDispositifs = data.dispositifs.filter(d => d !== "rien");
    scoreCsrd += Math.min(hasDispositifs.length * 5, 40);

    const pilotageOpt = PILOTAGE_OPTIONS.find(p => p.value === data.pilotageData);
    scoreCsrd += pilotageOpt ? pilotageOpt.points : 0;

    // ROI détaillé (ratios basés sur le document source)
    const roiAbsenteisme = fuiteFinanciere * 0.07;
    const roiPresenteisme = fuiteFinanciere * 0.19;
    const roiTurnover = departs > 0 ? Math.round(departs * 0.20 * salaire * 0.75 * 0.5) : fuiteFinanciere * 0.30;
    const roiDesorganisation = fuiteFinanciere * 0.10;
    const roiRps = fuiteFinanciere * 0.12;
    const roiMarque = fuiteFinanciere * 0.06;

    const roiTotal = roiAbsenteisme + roiPresenteisme + roiTurnover + roiDesorganisation + roiRps + roiMarque;

    // Investissement Vivalea
    const nbContrats = Math.max(5, Math.round(nAidants * 0.15));
    const investissement = nbContrats * 180 * 12;
    const roiPct = investissement > 0 ? Math.round((roiTotal / investissement) * 100) : 0;

    return {
      effectif,
      nAidants,
      coutJour: Math.round(coutJour),
      fuiteFinanciere: Math.round(fuiteFinanciere),
      gainPotentiel: Math.round(gainPotentiel),
      scoreCsrd: Math.min(scoreCsrd, 100),
      roiAbsenteisme: Math.round(roiAbsenteisme),
      roiPresenteisme: Math.round(roiPresenteisme),
      roiTurnover: Math.round(roiTurnover),
      roiDesorganisation: Math.round(roiDesorganisation),
      roiRps: Math.round(roiRps),
      roiMarque: Math.round(roiMarque),
      roiTotal: Math.round(roiTotal),
      nbContrats,
      investissement,
      roiPct,
      tauxAbs,
      coeffAge,
      salaire,
    };
  };

  /* ─── Generate PDF ─── */
  const generatePDF = (results, includeLeadInfo = false) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, M = 18;
    const secteur = data.secteur === "Autre" ? data.secteurAutre : data.secteur;
    let y = 20;

    const addLine = () => { doc.setDrawColor(200); doc.line(M, y, W - M, y); y += 6; };
    const addText = (text, x, size, color, weight) => {
      doc.setFontSize(size);
      doc.setTextColor(...color);
      if (weight === "bold") doc.setFont("helvetica", "bold");
      else doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(text, W - 2 * M - (x - M));
      doc.text(lines, x, y);
      y += lines.length * (size * 0.45);
    };

    // Header
    doc.setFillColor(248, 246, 244);
    doc.rect(0, 0, W, 42, "F");
    doc.setFontSize(10); doc.setTextColor(143, 19, 73); doc.setFont("helvetica", "bold");
    doc.text("VIVALEA CARE", M, 14);
    doc.setFontSize(18); doc.setTextColor(24, 38, 63);
    doc.text(`Coût de l'aidance chez ${data.entreprise}`, M, 26);
    doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.setTextColor(107, 114, 128);
    doc.text(`${secteur} · Rapport CODIR`, M, 33);
    y = 50;

    // Lead info (Vivalea only)
    if (includeLeadInfo) {
      doc.setFillColor(143, 19, 73); doc.rect(M, y - 4, W - 2 * M, 28, "F");
      doc.setTextColor(255, 255, 255); doc.setFontSize(9); doc.setFont("helvetica", "bold");
      doc.text("COORDONNÉES DU LEAD", M + 4, y + 2);
      doc.setFont("helvetica", "normal"); doc.setFontSize(9);
      doc.text(`Nom : ${data.nom}`, M + 4, y + 8);
      doc.text(`Email : ${data.email}`, M + 4, y + 13);
      doc.text(`Fonction : ${data.fonction}`, M + 4, y + 18);
      doc.text(`Crèche partenaire : ${data.contratCreche === "oui" ? "OUI ✓" : "Non"}`, W / 2, y + 8);
      doc.text(`Dispositifs : ${data.dispositifs.map(d => DISPOSITIFS.find(x => x.value === d)?.label).join(", ")}`, M + 4, y + 23, { maxWidth: W - 2 * M - 8 });
      y += 34;
    }

    // KPIs
    addText("INDICATEURS CLÉS", M, 11, [143, 19, 73], "bold"); y += 2;
    doc.setFillColor(248, 246, 244); doc.roundedRect(M, y - 4, 52, 18, 2, 2, "F");
    doc.setFontSize(9); doc.setTextColor(107, 114, 128); doc.setFont("helvetica", "normal");
    doc.text("Aidants estimés", M + 4, y + 1);
    doc.setFontSize(16); doc.setTextColor(143, 19, 73); doc.setFont("helvetica", "bold");
    doc.text(`${results.nAidants}`, M + 4, y + 10);

    doc.setFillColor(248, 246, 244); doc.roundedRect(M + 58, y - 4, 52, 18, 2, 2, "F");
    doc.setFontSize(9); doc.setTextColor(107, 114, 128); doc.setFont("helvetica", "normal");
    doc.text("Coût / jour", M + 62, y + 1);
    doc.setFontSize(16); doc.setTextColor(233, 85, 46); doc.setFont("helvetica", "bold");
    doc.text(`${fmt(results.coutJour)} €`, M + 62, y + 10);

    doc.setFillColor(220, 38, 38, 15); doc.roundedRect(M + 116, y - 4, 58, 18, 2, 2, "F");
    doc.setFontSize(9); doc.setTextColor(220, 38, 38); doc.setFont("helvetica", "normal");
    doc.text("Fuite financière / an", M + 120, y + 1);
    doc.setFontSize(16); doc.setFont("helvetica", "bold");
    doc.text(`${fmt(results.fuiteFinanciere)} €`, M + 120, y + 10);
    y += 24;

    doc.setFontSize(8); doc.setTextColor(107, 114, 128); doc.setFont("helvetica", "normal");
    doc.text(`Méthode : ${results.nAidants} aidants × 16 jours × ${fmt(results.coutJour)} €/jour`, M, y);
    y += 4;
    doc.setFontSize(7); doc.setTextColor(143, 19, 73);
    doc.text("Sources : OCIRP/Viavoice 2023 · Malakoff Humanis 2025 · France Travail 2024", M, y);
    y += 8;

    addLine();

    // ROI table
    addText("ROI RÉCUPÉRABLE PAR POSTE", M, 11, [143, 19, 73], "bold"); y += 2;
    const roiData = [
      ["Absentéisme", results.roiAbsenteisme, "Malakoff Humanis 2025"],
      ["Présentéisme", results.roiPresenteisme, "OCIRP/Viavoice 2023"],
      ["Turnover", results.roiTurnover, "Deloitte 2024 · HBR/Gallup"],
      ["Désorganisation", results.roiDesorganisation, "N. Chusseau, Univ. Lille 2023"],
      ["RPS / Arrêts longs", results.roiRps, "OCIRP 2023 · Verlingue 2023"],
      ["Marque employeur", results.roiMarque, "Études RH 2024-2025"],
    ];
    roiData.forEach(([label, value, src]) => {
      doc.setFontSize(9); doc.setTextColor(24, 38, 63); doc.setFont("helvetica", "bold");
      doc.text(label, M, y);
      doc.text(`${fmt(value)} €`, W - M, y, { align: "right" });
      doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(143, 19, 73);
      doc.text(`📎 ${src}`, M, y + 4);
      y += 9;
    });
    y += 2;

    // Total
    doc.setFillColor(15, 118, 110, 15); doc.roundedRect(M, y - 4, W - 2 * M, 16, 2, 2, "F");
    doc.setFontSize(10); doc.setTextColor(15, 118, 110); doc.setFont("helvetica", "bold");
    doc.text("Gain potentiel total avec accompagnement", M + 4, y + 2);
    doc.setFontSize(18);
    doc.text(`${fmt(results.roiTotal)} € /an`, W - M - 4, y + 8, { align: "right" });
    y += 22;

    addLine();

    // CSRD Score
    addText("SCORE DE MATURITÉ CSRD", M, 11, [143, 19, 73], "bold"); y += 2;
    const csrdLabel = results.scoreCsrd >= 60 ? "Maturité avancée" : results.scoreCsrd >= 30 ? "En progression" : "Vulnérabilité élevée";
    doc.setFontSize(14); doc.setTextColor(24, 38, 63); doc.setFont("helvetica", "bold");
    doc.text(`${results.scoreCsrd}/100`, M, y);
    doc.setFontSize(10); doc.setFont("helvetica", "normal");
    doc.text(`— ${csrdLabel}`, M + 22, y);
    y += 6;
    // Gauge bar
    doc.setFillColor(200, 200, 200); doc.roundedRect(M, y, W - 2 * M, 3, 1.5, 1.5, "F");
    const gColor = results.scoreCsrd >= 60 ? [15, 118, 110] : results.scoreCsrd >= 30 ? [217, 119, 6] : [220, 38, 38];
    doc.setFillColor(...gColor); doc.roundedRect(M, y, (W - 2 * M) * results.scoreCsrd / 100, 3, 1.5, 1.5, "F");
    y += 10;

    addLine();

    // Investissement
    addText("L'ÉQUATION VIVALEA CARE", M, 11, [143, 19, 73], "bold"); y += 2;
    doc.setFontSize(10); doc.setTextColor(24, 38, 63); doc.setFont("helvetica", "bold");
    doc.text(`Investissement : ${fmt(results.investissement)} €/an`, M, y);
    doc.text(`ROI : ${results.roiPct}%`, W / 2, y);
    y += 5;
    doc.setFontSize(8); doc.setFont("helvetica", "normal"); doc.setTextColor(107, 114, 128);
    doc.text(`${results.nbContrats} contrats × 180 €/mois · Retour constaté dès 6 mois`, M, y);
    y += 10;

    // Footer
    doc.setDrawColor(200); doc.line(M, y, W - M, y); y += 6;
    doc.setFontSize(7); doc.setTextColor(107, 114, 128); doc.setFont("helvetica", "normal");
    doc.text("Vivalea · Entreprise à impact et ESS · Simulation indicative, non contractuelle.", M, y);
    doc.text("Vos données sont traitées de manière confidentielle.", M, y + 3);

    return doc;
  };

  /* ─── Submit ─── */
  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setSending(true);

    const results = calcResults();
    const secteur = data.secteur === "Autre" ? data.secteurAutre : data.secteur;

    // Generate PDFs
    let pdfClientBase64 = "";
    let pdfVivaleaBase64 = "";
    try {
      const pdfClient = generatePDF(results, false);
      const pdfVivalea = generatePDF(results, true);
      pdfClientBase64 = pdfClient.output("datauristring").split(",")[1];
      pdfVivaleaBase64 = pdfVivalea.output("datauristring").split(",")[1];

      // Auto-download client PDF
      pdfClient.save(`Diagnostic-Aidance-${data.entreprise.replace(/\s+/g, "-")}.pdf`);
    } catch (err) {
      console.log("PDF generation:", err);
    }

    // Common params
    const commonParams = {
      nom: data.nom,
      entreprise: data.entreprise,
      secteur,
      fonction: data.fonction,
      effectif: data.effectif,
      tranche_age: AGE_OPTIONS.find(a => a.value === data.trancheAge)?.label || "",
      salaire_moyen: fmt(Number(data.salaireMoyen)),
      taux_absenteisme: data.tauxAbsenteisme,
      nb_departs: data.nbDeparts,
      email: data.email,
      n_aidants: results.nAidants,
      fuite_financiere: fmt(results.fuiteFinanciere),
      roi_total: fmt(results.roiTotal),
      score_csrd: results.scoreCsrd,
      roi_pct: results.roiPct,
      roi_absenteisme: fmt(results.roiAbsenteisme),
      roi_presenteisme: fmt(results.roiPresenteisme),
      roi_turnover: fmt(results.roiTurnover),
      roi_desorganisation: fmt(results.roiDesorganisation),
      roi_rps: fmt(results.roiRps),
      roi_marque: fmt(results.roiMarque),
      investissement: fmt(results.investissement),
      nb_contrats: results.nbContrats,
    };

    // Email 1 → Vivalea (full data + lead info + commercial intelligence)
    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE,
          template_id: EMAILJS_TEMPLATE_VIVALEA,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            ...commonParams,
            culture_manager: MANAGER_OPTIONS.find(m => m.value === data.cultureManager)?.label || "",
            dispositifs: data.dispositifs.map(d => DISPOSITIFS.find(x => x.value === d)?.label).join(", "),
            pilotage_data: data.pilotageData === "oui" ? "Oui" : "Non",
            mesures_csrd: data.mesuresCsrd.map(m => MESURES_CSRD.find(x => x.value === m)?.label).join(", ") + (data.mesuresCsrdAutre ? ` | Autre : ${data.mesuresCsrdAutre}` : ""),
            contrat_creche: data.contratCreche === "oui" ? "✅ OUI — Opportunité Care" : "Non",
          },
        }),
      });
    } catch (err) {
      console.log("EmailJS Vivalea:", err);
    }

    // Email 2 → Client (rapport uniquement, pas de data commerciale)
    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE,
          template_id: EMAILJS_TEMPLATE_CLIENT,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            ...commonParams,
            to_email: data.email,
          },
        }),
      });
    } catch (err) {
      console.log("EmailJS Client:", err);
    }

    setTimeout(() => {
      setSending(false);
      setShowResult(true);
      scrollTop();
    }, 1500);
  };

  /* ─── Result Page ─── */
  if (showResult) {
    const r = calcResults();
    const maxRoi = Math.max(r.roiAbsenteisme, r.roiPresenteisme, r.roiTurnover, r.roiDesorganisation, r.roiRps, r.roiMarque);
    const barWidth = (val) => Math.max(5, (val / maxRoi) * 100);

    const roiItems = [
      { label: "Absentéisme", value: r.roiAbsenteisme, color: COLORS.magenta, desc: "51% des aidants ont eu un arrêt maladie en 2024 vs 42% des non-aidants. L'accompagnement réduit les absences liées à l'épuisement et aux urgences familiales.", src: "Baromètre Malakoff Humanis 2025 · OCIRP/Viavoice 2023" },
      { label: "Présentéisme", value: r.roiPresenteisme, color: COLORS.orange, desc: "82% des aidants manquent de temps et 1/3 surcompensent pour masquer une baisse de productivité. Le soutien libère la charge mentale et restaure la concentration.", src: "OCIRP/Viavoice 2023 · Études présentéisme 2023" },
      { label: "Turnover", value: r.roiTurnover, color: COLORS.navy, desc: "44% des aidants craignent de perdre leur emploi. Remplacer un salarié coûte 6 à 9 mois de salaire. Un dispositif dédié fidélise les talents à risque de départ.", src: "OCIRP 2023 · Deloitte 2024 · Harvard Business Review / Gallup 2021-2024" },
      { label: "Désorganisation", value: r.roiDesorganisation, color: COLORS.amber, desc: "Les absences imprévues désorganisent les équipes, surchargent les collègues et génèrent des retards en chaîne. Le care management anticipe et fluidifie.", src: "Nathalie Chusseau, Université de Lille 2023 · France Info" },
      { label: "RPS / Arrêts longs", value: r.roiRps, color: COLORS.red, desc: "51% des aidants renoncent à consulter un médecin. Sans accompagnement, la charge mentale conduit à des arrêts longue durée (burn-out, dépression).", src: "OCIRP/Viavoice 2023 · Verlingue 2023 · Verspieren 2025" },
      { label: "Marque employeur", value: r.roiMarque, color: COLORS.green, desc: "Une marque employeur engagée réduit les coûts de recrutement de 43%. 90% des DRH soutiennent l'inscription du soutien aux aidants dans la RSE.", src: "Études RH 2024-2025 · OCIRP/Viavoice 2023" },
    ];

    const csrdLabel = r.scoreCsrd >= 60 ? "Maturité avancée" : r.scoreCsrd >= 30 ? "En progression" : "Vulnérabilité élevée";
    const csrdEmoji = r.scoreCsrd >= 60 ? "🟢" : r.scoreCsrd >= 30 ? "🟡" : "🔴";

    return (
      <div style={{ ...styles.container, maxWidth: isMobile ? "100%" : 900 }} ref={cardRef}>
        <div style={styles.header}>
          <div style={styles.logoBar}>
            <span style={styles.logoText}>Vivalea</span>
            <span style={{ ...styles.tagline, fontSize: 10 }}>Care</span>
          </div>
        </div>

          <div style={{ padding: 0, overflow: "hidden", animation: "fadeIn 0.5s ease-out", ...styles.card }}>
          {/* Header */}
          <div style={{ textAlign: "center", padding: isMobile ? "20px 16px 18px" : "28px 32px 24px", borderBottom: `2px solid ${COLORS.border}`, margin: isMobile ? "-32px -28px 20px -28px" : "-32px -28px 24px -28px", background: COLORS.bg }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 20 : 24, color: COLORS.navy, marginBottom: 6, lineHeight: 1.3 }}>
              Coût de l'aidance chez<br /><span style={{ color: COLORS.magenta }}>{data.entreprise}</span>
            </div>
            <div style={{ fontSize: isMobile ? 12 : 13, color: COLORS.textMuted }}>{data.secteur === "Autre" ? data.secteurAutre : data.secteur} · Rapport CODIR</div>
          </div>

          <div style={{ padding: isMobile ? "0 16px 24px" : "0 32px 32px" }}>

            {/* ─── ROW 1: KPI cards + Fuite financière ─── */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1.4fr", gap: isMobile ? 10 : 14, marginBottom: 8, marginTop: 4 }}>
              <div style={styles.metricCard(COLORS.magentaLight)}>
                <div>
                  <div style={{ ...styles.metricLabel, fontSize: 11 }}>Aidants estimés</div>
                  <div style={styles.metricValue(COLORS.magenta)}>{r.nAidants}</div>
                </div>
                <div style={{ fontSize: 22 }}>👥</div>
              </div>
              <div style={styles.metricCard(COLORS.orangeLight)}>
                <div>
                  <div style={{ ...styles.metricLabel, fontSize: 11 }}>Coût / jour</div>
                  <div style={styles.metricValue(COLORS.orange)}>{fmt(r.coutJour)} €</div>
                </div>
                <div style={{ fontSize: 22 }}>📊</div>
              </div>
              <div style={{ textAlign: "center", padding: "16px 12px", background: COLORS.redLight, borderRadius: 14, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 11, color: COLORS.red, fontWeight: 600, marginBottom: 2 }}>
                  💸 Fuite financière annuelle
                </div>
                <div style={{ ...styles.bigNumber, color: COLORS.red, fontSize: isMobile ? 24 : 28 }}>{fmt(r.fuiteFinanciere)} €</div>
                <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 2 }}>
                  {r.nAidants} × 16 j × {fmt(r.coutJour)} €
                </div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, lineHeight: 1.5, marginBottom: 20, padding: "0 4px" }}>
              <strong>Méthode :</strong> aidants estimés selon la tranche d'âge (12% si &lt; 35 ans, 20% entre 35-45 ans, 32% si &gt; 45 ans). Coût journalier sur 218 jours ouvrés. <strong>16 jours</strong> = moyenne d'absence annuelle supplémentaire constatée chez les salariés aidants (arrêts, congés sans solde, absences non déclarées).
              <br /><span style={{ fontSize: 10, color: COLORS.magenta, fontStyle: "italic", opacity: 0.7 }}>📎 OCIRP/Viavoice 2023 · Baromètre Malakoff Humanis 2025 · France Travail 2024 · Nathalie Chusseau, Univ. de Lille 2023</span>
            </div>

            <div style={styles.divider} />

            {/* ─── ROI breakdown — 2 colonnes ─── */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>
                📈 ROI récupérable par poste
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "0" : "0 20px" }}>
                {roiItems.map((item) => (
                  <div key={item.label} style={{ marginBottom: 14 }}>
                    <div style={styles.roiBar}>
                      <div style={{ width: isMobile ? 90 : 110, fontSize: 12, fontWeight: 500, flexShrink: 0 }}>{item.label}</div>
                      <div style={{ flex: 1, height: 6, borderRadius: 3, background: COLORS.border }}>
                        <div style={styles.roiBarFill(barWidth(item.value), item.color)} />
                      </div>
                      <div style={{ width: 70, textAlign: "right", fontSize: 13, fontWeight: 700, color: item.color, flexShrink: 0 }}>
                        {fmt(item.value)} €
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, lineHeight: 1.4, padding: "2px 14px 0" }}>
                      {item.desc}
                    </div>
                    <div style={{ fontSize: 10, color: COLORS.magenta, fontStyle: "italic", padding: "2px 14px 0", opacity: 0.7 }}>
                      📎 {item.src}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── ROI total ─── */}
            <div style={{ textAlign: "center", marginBottom: 8, padding: "18px 16px", background: COLORS.greenLight, borderRadius: 14 }}>
              <div style={{ fontSize: 12, color: COLORS.green, fontWeight: 600, marginBottom: 4 }}>
                ✅ Gain potentiel total avec accompagnement
              </div>
              <div style={{ ...styles.bigNumber, color: COLORS.green }}>{fmt(r.roiTotal)} €<span style={{ fontSize: 16 }}>/an</span></div>
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, lineHeight: 1.5, marginBottom: 20, padding: "0 4px" }}>
              <strong>Comment est calculé ce gain ?</strong> C'est la somme des économies récupérables sur les 6 postes ci-dessus, en appliquant un taux de récupération conservateur de 25 à 30% basé sur les résultats constatés par les entreprises ayant déployé un dispositif d'accompagnement aidants.
              <br /><span style={{ fontSize: 10, color: COLORS.magenta, fontStyle: "italic", opacity: 0.7 }}>📎 Baromètre Malakoff Humanis 2025 · Deloitte 2024 · Harvard Business Review / Gallup 2021-2024</span>
            </div>

            <div style={styles.divider} />

            {/* ─── ROW 3: CSRD + Investissement côte à côte ─── */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20, marginBottom: 8 }}>
              {/* CSRD */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy }}>
                    🏛️ Score CSRD
                  </div>
                  <div style={styles.csrdBadge(r.scoreCsrd)}>
                    {csrdEmoji} {csrdLabel}
                  </div>
                </div>
                <div style={styles.scoreGauge(r.scoreCsrd)}>
                  <div style={styles.scoreGaugeFill(r.scoreCsrd)} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.textMuted }}>
                  <span>0</span>
                  <span style={{ fontWeight: 700, color: r.scoreCsrd >= 60 ? COLORS.green : r.scoreCsrd >= 30 ? COLORS.amber : COLORS.red }}>
                    {r.scoreCsrd}/100
                  </span>
                  <span>100</span>
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, lineHeight: 1.4, marginTop: 8 }}>
                  Évalue votre préparation au pilier social CSRD (ESRS S1) : formation managers, dispositifs existants, pilotage KPI sociaux. {r.scoreCsrd < 60 ? "Score < 60 = axes d'amélioration prioritaires avant 2026." : "Maturité solide."}
                  <br /><span style={{ fontSize: 10, color: COLORS.magenta, fontStyle: "italic", opacity: 0.7 }}>📎 Directive CSRD / ESRS S1 · OCIRP 2023</span>
                </div>
              </div>

              {/* Investissement */}
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy, marginBottom: 12, textAlign: "center" }}>
                  🎯 L'équation Vivalea Care
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, alignItems: "center" }}>
                  <div style={{ padding: 12, background: COLORS.bg, borderRadius: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>Investissement</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy }}>{fmt(r.investissement)} €</div>
                    <div style={{ fontSize: 10, color: COLORS.textMuted }}>{r.nbContrats} × 180 €/mois</div>
                  </div>
                  <div style={{ fontSize: 20, color: COLORS.textMuted }}>→</div>
                  <div style={{ padding: 12, background: COLORS.magentaLight, borderRadius: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>ROI</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.magenta }}>{r.roiPct}%</div>
                    <div style={{ fontSize: 10, color: COLORS.magenta }}>retour sur investissement</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, lineHeight: 1.4, marginTop: 8 }}>
                  Accompagnement de 15% de vos aidants ({r.nbContrats} contrats) à 180 €/mois. Retour constaté dès 6 mois.
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              {/* Download PDF */}
              <button
                style={{ ...styles.buttonSecondary, width: "100%", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                onClick={() => {
                  try {
                    const pdf = generatePDF(calcResults(), false);
                    pdf.save(`Diagnostic-Aidance-${data.entreprise.replace(/\s+/g, "-")}.pdf`);
                  } catch (err) { console.log("PDF download:", err); }
                }}
              >
                📄 Télécharger le rapport PDF
              </button>
              {/* CTA */}
              <button
                style={styles.buttonPrimary(false)}
                onClick={() => window.open("https://calendly.com/vivalea", "_blank")}
              >
                Planifier un rendez-vous stratégique →
              </button>
              <div style={{ textAlign: "center", fontSize: 11, color: COLORS.textMuted, marginTop: 8 }}>
                30 min · Gratuit · Sans engagement
              </div>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          Vivalea · Entreprise à impact et ESS · Données indicatives basées sur vos paramètres.
          <br />Vos données sont traitées de manière confidentielle.
        </div>
      </div>
    );
  }

  /* ─── Steps ─── */
  const TOTAL_STEPS = 5;

  const renderStep = () => {
    switch (step) {
      /* ─── PAGE 1: Profil ─── */
      case 0:
        return (
          <div style={styles.card} key="step0">
            <div style={{ fontSize: 11, color: COLORS.magenta, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
              Étape 1/5 — Votre profil
            </div>
            <div style={styles.stepTitle}>Présentons-nous</div>
            <div style={styles.stepSubtitle}>
              Ces informations nous permettent de contextualiser votre diagnostic.
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Votre nom</label>
              <input
                style={styles.input}
                placeholder="Ex : Jean Dupont"
                value={data.nom}
                onChange={e => update("nom", e.target.value)}
              />
              {errors.nom && <div style={styles.errorText}>{errors.nom}</div>}
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Nom de l'entreprise</label>
              <input
                style={styles.input}
                placeholder="Ex : Groupe Dupont"
                value={data.entreprise}
                onChange={e => update("entreprise", e.target.value)}
              />
              {errors.entreprise && <div style={styles.errorText}>{errors.entreprise}</div>}
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Secteur d'activité</label>
              <div style={{ position: "relative" }}>
                <select
                  style={styles.select}
                  value={data.secteur}
                  onChange={e => update("secteur", e.target.value)}
                >
                  <option value="">Sélectionner...</option>
                  {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: COLORS.textMuted }}>▾</span>
              </div>
              {data.secteur === "Autre" && (
                <input
                  style={{ ...styles.input, marginTop: 8 }}
                  placeholder="Précisez votre secteur…"
                  value={data.secteurAutre}
                  onChange={e => update("secteurAutre", e.target.value)}
                />
              )}
              {errors.secteur && <div style={styles.errorText}>{errors.secteur}</div>}
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Votre fonction
                <span style={styles.sublabel}> (ex : DRH, RSE, DAF)</span>
              </label>
              <input
                style={styles.input}
                placeholder="Ex : DRH"
                value={data.fonction}
                onChange={e => update("fonction", e.target.value)}
              />
              {errors.fonction && <div style={styles.errorText}>{errors.fonction}</div>}
            </div>

            <button style={styles.buttonPrimary(false)} onClick={goNext}>
              Continuer →
            </button>
          </div>
        );

      /* ─── PAGE 2: Variables structurelles ─── */
      case 1:
        return (
          <div style={styles.card} key="step1">
            <div style={{ fontSize: 11, color: COLORS.magenta, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
              Étape 2/5 — Variables structurelles
            </div>
            <div style={styles.stepTitle}>Le moteur de calcul</div>
            <div style={styles.stepSubtitle}>
              Ces données alimentent votre simulation personnalisée.
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Effectif global
                <span style={styles.sublabel}> — Combien de collaborateurs (ETP) ?</span>
              </label>
              <input
                style={styles.input}
                type="number"
                placeholder="Ex : 500"
                min="1"
                value={data.effectif}
                onChange={e => update("effectif", e.target.value)}
              />
              {errors.effectif && <div style={styles.errorText}>{errors.effectif}</div>}
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Tranche d'âge majoritaire</label>
              <div style={styles.radioGroup}>
                {AGE_OPTIONS.map(opt => (
                  <div
                    key={opt.value}
                    style={styles.radioOption(data.trancheAge === opt.value)}
                    onClick={() => update("trancheAge", opt.value)}
                  >
                    <div style={styles.radioDot(data.trancheAge === opt.value)}>
                      {data.trancheAge === opt.value && <div style={styles.radioDotInner} />}
                    </div>
                    {opt.label}
                  </div>
                ))}
              </div>
              {errors.trancheAge && <div style={styles.errorText}>{errors.trancheAge}</div>}
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Salaire annuel moyen chargé
                <span style={styles.sublabel}> (Brut + Charges patronales)</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  style={{ ...styles.input, paddingRight: 36 }}
                  type="number"
                  placeholder="45 000"
                  min="1"
                  step="100"
                  value={data.salaireMoyen}
                  onChange={e => update("salaireMoyen", e.target.value)}
                />
                <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: COLORS.textMuted, fontSize: 14, fontWeight: 600 }}>€</span>
              </div>
              {errors.salaireMoyen && <div style={styles.errorText}>{errors.salaireMoyen}</div>}
            </div>

            <div style={styles.navRow}>
              <button style={{ ...styles.buttonSecondary, flex: "0 0 auto", width: "auto", padding: "14px 20px" }} onClick={goBack}>
                ← Retour
              </button>
              <button style={{ ...styles.buttonPrimary(false), flex: 1 }} onClick={goNext}>
                Continuer →
              </button>
            </div>
          </div>
        );

      /* ─── PAGE 3: Performance & Coûts cachés ─── */
      case 2:
        return (
          <div style={styles.card} key="step2">
            <div style={{ fontSize: 11, color: COLORS.magenta, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
              Étape 3/5 — Performance & Coûts cachés
            </div>
            <div style={styles.stepTitle}>La douleur invisible</div>
            <div style={styles.stepSubtitle}>
              L'absentéisme et le turnover cachent souvent un problème d'aidance non diagnostiqué.
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Taux d'absentéisme global actuel
                <span style={styles.sublabel}> (%)</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  style={{ ...styles.input, paddingRight: 36 }}
                  type="number"
                  placeholder="Ex : 5"
                  min="0"
                  max="100"
                  step="0.1"
                  value={data.tauxAbsenteisme}
                  onChange={e => update("tauxAbsenteisme", e.target.value)}
                />
                <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: COLORS.textMuted, fontSize: 14, fontWeight: 600 }}>%</span>
              </div>
              {errors.tauxAbsenteisme && <div style={styles.errorText}>{errors.tauxAbsenteisme}</div>}
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Départs sur les 12 derniers mois
                <span style={styles.sublabel}> (démissions / ruptures)</span>
              </label>
              <input
                style={styles.input}
                type="number"
                placeholder="Ex : 20"
                min="0"
                value={data.nbDeparts}
                onChange={e => update("nbDeparts", e.target.value)}
              />
              {errors.nbDeparts && <div style={styles.errorText}>{errors.nbDeparts}</div>}
            </div>

            {/* Contextual insight */}
            <div style={{ padding: "14px 16px", background: COLORS.orangeLight, borderRadius: 12, marginBottom: 20, fontSize: 12, color: COLORS.navy, lineHeight: 1.6 }}>
              <strong style={{ color: COLORS.orange }}>💡 Le saviez-vous ?</strong>
              <br />
              51% des aidants ont eu au moins un arrêt maladie en 2024, contre 42% des non-aidants. 75% ne préviennent pas leur employeur.
            </div>

            <div style={styles.navRow}>
              <button style={{ ...styles.buttonSecondary, flex: "0 0 auto", width: "auto", padding: "14px 20px" }} onClick={goBack}>
                ← Retour
              </button>
              <button style={{ ...styles.buttonPrimary(false), flex: 1 }} onClick={goNext}>
                Continuer →
              </button>
            </div>
          </div>
        );

      /* ─── PAGE 4: Stratégie & CSRD ─── */
      case 3:
        return (
          <div style={styles.card} key="step3">
            <div style={{ fontSize: 11, color: COLORS.magenta, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
              Étape 4/5 — Stratégie & Conformité CSRD
            </div>
            <div style={styles.stepTitle}>Votre niveau de maturité</div>
            <div style={styles.stepSubtitle}>
              Ces réponses déterminent votre score de préparation à la CSRD (pilier social, normes ESRS S1).
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Vos managers sont-ils formés à identifier et orienter un salarié aidant ?
              </label>
              <div style={styles.radioGroup}>
                {MANAGER_OPTIONS.map(opt => (
                  <div
                    key={opt.value}
                    style={styles.radioOption(data.cultureManager === opt.value)}
                    onClick={() => update("cultureManager", opt.value)}
                  >
                    <div style={styles.radioDot(data.cultureManager === opt.value)}>
                      {data.cultureManager === opt.value && <div style={styles.radioDotInner} />}
                    </div>
                    {opt.label}
                  </div>
                ))}
              </div>
              {errors.cultureManager && <div style={styles.errorText}>{errors.cultureManager}</div>}
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Quels outils proposez-vous déjà ?</label>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
                {DISPOSITIFS.map(opt => (
                  <div
                    key={opt.value}
                    style={styles.checkboxOption(data.dispositifs.includes(opt.value))}
                    onClick={() => toggleDispositif(opt.value)}
                  >
                    <div style={styles.checkboxBox(data.dispositifs.includes(opt.value))}>
                      {data.dispositifs.includes(opt.value) && <CheckIcon />}
                    </div>
                    <span style={{ fontSize: 13 }}>{opt.label}</span>
                  </div>
                ))}
              </div>
              {errors.dispositifs && <div style={styles.errorText}>{errors.dispositifs}</div>}
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Mesurez-vous l'impact de vos actions sociales sur vos KPI financiers ?
                <span style={styles.sublabel}> (normes ESRS S1)</span>
              </label>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
                {PILOTAGE_OPTIONS.map(opt => (
                  <div
                    key={opt.value}
                    style={styles.radioOption(data.pilotageData === opt.value)}
                    onClick={() => update("pilotageData", opt.value)}
                  >
                    <div style={styles.radioDot(data.pilotageData === opt.value)}>
                      {data.pilotageData === opt.value && <div style={styles.radioDotInner} />}
                    </div>
                    {opt.label === "Oui" ? "Oui" : "Non"}
                  </div>
                ))}
              </div>
              {errors.pilotageData && <div style={styles.errorText}>{errors.pilotageData}</div>}
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Quelles mesures d'impact RSE / CSRD avez-vous mises en place ?
              </label>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
                {MESURES_CSRD.map(opt => (
                  <div
                    key={opt.value}
                    style={styles.checkboxOption(data.mesuresCsrd.includes(opt.value))}
                    onClick={() => toggleMesure(opt.value)}
                  >
                    <div style={styles.checkboxBox(data.mesuresCsrd.includes(opt.value))}>
                      {data.mesuresCsrd.includes(opt.value) && <CheckIcon />}
                    </div>
                    <span style={{ fontSize: 13 }}>{opt.label}</span>
                  </div>
                ))}
                {/* Option Autre */}
                <div
                  style={styles.checkboxOption(data.mesuresCsrd.includes("autre"))}
                  onClick={() => toggleMesure("autre")}
                >
                  <div style={styles.checkboxBox(data.mesuresCsrd.includes("autre"))}>
                    {data.mesuresCsrd.includes("autre") && <CheckIcon />}
                  </div>
                  Autre
                </div>
              </div>
              {data.mesuresCsrd.includes("autre") && (
                <input
                  style={{ ...styles.input, marginTop: 8 }}
                  placeholder="Précisez votre mesure d'impact…"
                  value={data.mesuresCsrdAutre}
                  onChange={e => update("mesuresCsrdAutre", e.target.value)}
                />
              )}
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Avez-vous un partenariat avec des crèches pour vos salariés parents ?
              </label>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
                {[
                  { value: "oui", label: "Oui" },
                  { value: "non", label: "Non" },
                ].map(opt => (
                  <div
                    key={opt.value}
                    style={styles.radioOption(data.contratCreche === opt.value)}
                    onClick={() => update("contratCreche", opt.value)}
                  >
                    <div style={styles.radioDot(data.contratCreche === opt.value)}>
                      {data.contratCreche === opt.value && <div style={styles.radioDotInner} />}
                    </div>
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.navRow}>
              <button style={{ ...styles.buttonSecondary, flex: "0 0 auto", width: "auto", padding: "14px 20px" }} onClick={goBack}>
                ← Retour
              </button>
              <button style={{ ...styles.buttonPrimary(false), flex: 1 }} onClick={goNext}>
                Continuer →
              </button>
            </div>
          </div>
        );

      /* ─── PAGE 5: Email Gate ─── */
      case 4:
        return (
          <div style={styles.card} key="step4">
            <div style={{ fontSize: 11, color: COLORS.magenta, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
              Étape 5/5 — Votre diagnostic
            </div>
            <div style={styles.stepTitle}>Dernière étape</div>
            <div style={styles.stepSubtitle}>
              Renseignez votre email professionnel pour recevoir votre rapport CODIR personnalisé de 3 pages : calcul de ROI, score CSRD et plan d'action.
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Votre email professionnel</label>
              <input
                style={styles.input}
                type="email"
                placeholder="prenom.nom@entreprise.fr"
                value={data.email}
                onChange={e => update("email", e.target.value)}
              />
              {errors.email && <div style={styles.errorText}>{errors.email}</div>}
            </div>

            {/* Reassurance */}
            <div style={{ padding: "14px 16px", background: COLORS.greenLight, borderRadius: 12, marginBottom: 20, fontSize: 12, color: COLORS.navy, lineHeight: 1.6 }}>
              <strong style={{ color: COLORS.green }}>🔒 Confidentialité garantie</strong>
              <br />
              Vos données sont traitées de manière strictement confidentielle et ne seront jamais communiquées à des tiers. Ce diagnostic est un outil d'aide à la décision, pas un engagement.
            </div>

            <div style={styles.navRow}>
              <button style={{ ...styles.buttonSecondary, flex: "0 0 auto", width: "auto", padding: "14px 20px" }} onClick={goBack}>
                ← Retour
              </button>
              <button
                style={{ ...styles.buttonPrimary(sending), flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                onClick={goNext}
                disabled={sending}
              >
                {sending ? (
                  <>
                    <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #fff4", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                    Génération en cours...
                  </>
                ) : (
                  "Générer mon Diagnostic →"
                )}
              </button>
            </div>

            {/* Spinner animation */}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ ...styles.container, maxWidth: step === 3 && !isMobile ? 780 : 580, transition: "max-width 0.3s ease" }} ref={cardRef}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoBar}>
          <span style={styles.logoText}>Vivalea</span>
          <span style={styles.tagline}>Care</span>
        </div>
        <div style={styles.badge}>
          🏛️ Diagnostic CSRD 2026 · Gratuit · Confidentiel
        </div>
      </div>

      {/* Progress */}
      <ProgressBar step={step} total={TOTAL_STEPS} />

      {/* Active Step */}
      {renderStep()}

      {/* Footer */}
      <div style={styles.footer}>
        Vivalea · Entreprise à impact et ESS · Simulation indicative, non contractuelle.
        <br />Vos données sont traitées de manière confidentielle.
      </div>
    </div>
  );
}
