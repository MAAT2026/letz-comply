import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ShieldAlert, Info, CheckCircle2, Copy, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import TagInput from "@/components/onboard/TagInput";
import StructureTree from "@/components/onboard/StructureTree";

// ── Service packages ──────────────────────────────────────────────
const CORE_ADMIN_SERVICES = ["fundAccounting", "navCalc", "investorReporting", "amlKyc", "fatcaCrs", "shareholderRegister"];
const FULL_SERVICE_SERVICES = [
  ...CORE_ADMIN_SERVICES,
  "corpSec", "directors", "registeredOffice", "substance", "bankAccounts", "regulatoryFilings", "fundTax",
];

function ServiceItem({ id, label, checked, onToggle, recommended, children }) {
  return (
    <div className={cn("border rounded-lg transition-all", checked ? "border-primary/30 bg-primary/5" : "border-border")}>
      <div className="flex items-center justify-between px-3 py-2.5 gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-sm">{label}</span>
          {recommended && <Badge className="text-[9px] px-1.5 py-0 h-4 bg-amber-100 text-amber-700 border-amber-200">Recommended</Badge>}
        </div>
        <Switch checked={checked} onCheckedChange={onToggle} />
      </div>
      {checked && children && (
        <div className="px-3 pb-3 border-t border-border/50 pt-2 space-y-2">{children}</div>
      )}
    </div>
  );
}

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
        <span className="font-semibold text-sm">{title}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 space-y-2">{children}</CollapsibleContent>
    </Collapsible>
  );
}

function InfoRow({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex justify-between gap-2 text-sm py-1 border-b border-border/40 last:border-0">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-medium text-right">{String(value)}</span>
    </div>
  );
}

function buildNextSteps({ entities, services, investorProfile, fundType }) {
  const steps = [];
  const e = entities || {};
  const s = services || {};
  const ip = investorProfile || {};
  if (s.aifm?.enabled) steps.push(`Prepare AIFM engagement letter${e.fund?.regime ? ` (${e.fund.regime})` : ""}`);
  if (s.amlKyc?.enabled) steps.push(`Initiate AML/KYC for ${ip.investorCount || "—"} investors`);
  if (s.bankAccounts?.enabled) steps.push(`Set up ${s.bankAccounts.count || ""} bank account(s)${s.bankAccounts.currencies?.length ? ` (${s.bankAccounts.currencies.join(", ")})` : ""}`);
  if (s.directors?.enabled) steps.push("Appoint Director A and Director B (Luxembourg substance)");
  if (s.annexIV?.enabled) steps.push("Prepare Annex IV reporting framework");
  if (e.gp?.enabled && !e.gp?.exists) steps.push(`Incorporate GP entity${e.gp.legalForm ? ` (${e.gp.legalForm})` : ""}`);
  if (e.advisor?.enabled && !e.advisor?.exists) steps.push(`Incorporate Investment Advisor${e.advisor.legalForm ? ` (${e.advisor.legalForm})` : ""}${e.advisor.jurisdiction ? ` — ${e.advisor.jurisdiction}` : ""}`);
  if (e.feeder?.enabled) steps.push(`Coordinate with ${e.feeder.jurisdictions?.join(", ") || "feeder"} feeder fund administration`);
  if (ip.usInvestors) steps.push("Initiate FATCA / Form PF compliance review (US investors present)");
  if (ip.ukInvestors) steps.push("Assess UK NPPR / FCA recognition requirement");
  if (s.corpSec?.enabled) steps.push("Prepare corporate secretarial setup (constitutional documents)");
  if (s.fundTax?.enabled) steps.push("Engage fund tax compliance team");
  steps.push("Prepare service proposal and fee schedule");
  steps.push("Schedule onboarding kick-off call with client");
  return steps;
}

function buildTextSummary({ overview, entities, investorProfile, services }) {
  const e = entities || {};
  const ip = investorProfile || {};
  const s = services || {};
  const currency = overview.fundCurrency === "Other" ? (overview.fundCurrencyOther || "") : (overview.fundCurrency || "EUR");
  const fmt = (n) => n ? Number(n).toLocaleString() : "—";
  const entityLines = Object.entries(e).filter(([, v]) => v?.enabled).map(([k, v]) => {
    const labels = { fund: "Fund Vehicle", gp: "GP", advisor: "Investment Advisor", carry: "Carry Vehicle", manco: "ManCo/AIFM", spv: "SPV(s)", coinvest: "Co-invest", feeder: "Feeder Fund(s)", depositary: "Depositary" };
    return `• ${labels[k] || k}: ${v.legalForm || v.type || "—"}${v.regime ? ` (${v.regime})` : ""}`;
  });
  const serviceCategories = {
    "Administration": ["aifm", "fundAccounting", "navCalc", "investorReporting", "amlKyc", "mlro", "fatcaCrs", "annexIV", "formPF", "callDist", "transferAgency", "shareholderRegister"],
    "Corporate": ["corpSec", "directors", "registeredOffice", "substance", "boardMeetings", "agm", "regulatoryFilings"],
    "Banking": ["bankAccounts", "cashMgmt", "fx", "paymentProcessing"],
    "ManCo Support": ["mancoAccounting", "mancoPayroll", "apAr", "mancoRegReporting", "mancoCompliance"],
    "Tax": ["fundTax", "transferPricing", "vat", "subTax", "whtReclaims", "dac6"],
    "Advisory": ["esg", "regAdvisory", "dora", "restructuring", "windDown", "irSupport", "carryCalc"],
  };
  const labelMap = { aifm: "AIFM", fundAccounting: "Fund accounting", navCalc: "NAV calculation", investorReporting: "Investor reporting", amlKyc: "AML/KYC", mlro: "MLRO/AMLCO", fatcaCrs: "FATCA/CRS", annexIV: "Annex IV", formPF: "Form PF", callDist: "Capital calls/distributions", transferAgency: "Transfer agency", shareholderRegister: "Shareholder register", corpSec: "Corporate secretarial", directors: "Director services", registeredOffice: "Registered office", substance: "Luxembourg substance", boardMeetings: "Board meetings", agm: "AGM", regulatoryFilings: "Regulatory filings", bankAccounts: "Bank accounts", cashMgmt: "Cash management", fx: "FX/hedging", paymentProcessing: "Payment processing", mancoAccounting: "ManCo accounting", mancoPayroll: "ManCo payroll", apAr: "AP/AR", mancoRegReporting: "ManCo reg reporting", mancoCompliance: "ManCo compliance", fundTax: "Fund tax", transferPricing: "Transfer pricing", vat: "VAT", subTax: "Subscription tax", whtReclaims: "WHT reclaims", dac6: "DAC6/MDR", esg: "ESG/SFDR", regAdvisory: "Reg advisory", dora: "DORA", restructuring: "Restructuring", windDown: "Wind-down", irSupport: "IR support", carryCalc: "Carry calculation" };
  const serviceLines = Object.entries(serviceCategories).map(([cat, keys]) => {
    const enabled = keys.filter(k => s[k]?.enabled);
    if (!enabled.length) return null;
    return `${cat}: ${enabled.map(k => labelMap[k] || k).join(", ")}`;
  }).filter(Boolean);

  return `MANDATE SUMMARY — ${overview.fundName || "Unnamed Fund"}

Client: ${overview.clientName || "—"}
Fund: ${overview.fundName || "—"}
Type: ${overview.fundType || "—"}
Target Close: ${overview.targetCloseDate || "—"}
Target Size: ${currency} ${fmt(overview.targetFundSize)}
Strategy: ${overview.investmentStrategy || "—"}
Focus: ${overview.geographicFocus || "—"}${overview.targetInvestments ? ` (${overview.targetInvestments} investments)` : ""}

STRUCTURE
${entityLines.join("\n") || "No entities configured"}

INVESTORS
• ${ip.investorCount || "—"} investors${ip.investorTypes?.length ? ` (${ip.investorTypes.map(t => t.split(" ")[0]).join(", ")})` : ""}
• US investors: ${ip.usInvestors ? "Yes" : "No"}${ip.ukInvestors ? " | UK investors: Yes" : ""}
• Min commitment: ${currency} ${fmt(ip.minCommitment)}

TERMS
${[
  overview.managementFee && `Management fee: ${overview.managementFee}%${overview.managementFeeBasis ? ` (${overview.managementFeeBasis})` : ""}`,
  overview.carry && `Carried interest: ${overview.carry}%`,
  overview.waterfall && `Waterfall: ${overview.waterfall}`,
  overview.hurdle && `Hurdle: ${overview.hurdle}%`,
  overview.fundTerm && `Fund term: ${overview.fundTerm} years${overview.extensionPeriod ? ` + ${overview.extensionPeriod}yr extension` : ""}`,
  overview.reportingFrequency && `Reporting: ${overview.reportingFrequency}`,
].filter(Boolean).join("\n") || "—"}

SERVICES REQUESTED
${serviceLines.join("\n") || "None selected"}

Generated by LetzComply`;
}

export default function StepServicesAndReview({ overview, entities, investorProfile, services, onChangeServices, onBack, onSave }) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activePackage, setActivePackage] = useState(null);

  const s = services || {};
  const set = (k, v) => onChangeServices({ ...s, [k]: v });
  const toggle = (k) => set(k, { ...(s[k] || {}), enabled: !(s[k]?.enabled) });
  const setSub = (k, field, v) => set(k, { ...(s[k] || {}), [field]: v });

  const isClosed = overview.fundType?.includes("Closed") || overview.fundType?.includes("Semi");
  const isOpen = overview.fundType?.includes("Open") || overview.fundType?.includes("Semi");
  const isAIFM = entities?.fund?.regime?.includes("AIFM");
  const usInvestors = investorProfile?.usInvestors;

  const entityOptions = [
    "Fund Vehicle",
    entities?.gp?.enabled && "GP",
    entities?.advisor?.enabled && "Investment Advisor",
    entities?.manco?.enabled && "ManCo / AIFM",
    entities?.carry?.enabled && "Carry Vehicle",
    entities?.spv?.enabled && "SPV(s)",
    entities?.coinvest?.enabled && "Co-invest Vehicle(s)",
    entities?.feeder?.enabled && "Feeder Fund(s)",
  ].filter(Boolean);

  const applyPackage = (pkg) => {
    setActivePackage(pkg);
    if (pkg === "custom") return;
    const keys = pkg === "core" ? CORE_ADMIN_SERVICES : FULL_SERVICE_SERVICES;
    const newServices = {};
    // Reset all first, then enable selected
    const allKeys = [...FULL_SERVICE_SERVICES, "aifm", "mlro", "annexIV", "formPF", "callDist", "transferAgency", "cashMgmt", "fx", "paymentProcessing", "mancoAccounting", "mancoPayroll", "apAr", "mancoRegReporting", "mancoCompliance", "transferPricing", "vat", "subTax", "whtReclaims", "dac6", "esg", "regAdvisory", "dora", "restructuring", "windDown", "irSupport", "carryCalc", "boardMeetings", "agm", "bankAccounts"];
    allKeys.forEach(k => { newServices[k] = { ...(s[k] || {}), enabled: false }; });
    keys.forEach(k => { newServices[k] = { ...(s[k] || {}), enabled: true }; });
    onChangeServices({ ...s, ...newServices });
  };

  const currency = overview.fundCurrency === "Other" ? (overview.fundCurrencyOther || "") : (overview.fundCurrency || "EUR");
  const e = entities || {};
  const ip = investorProfile || {};
  const enabledServices = Object.entries(s).filter(([, v]) => v?.enabled);
  const nextSteps = buildNextSteps({ entities, services: s, investorProfile, fundType: overview.fundType });

  const handleSave = async () => {
    setSaving(true);
    await base44.entities.Mandate.create({
      clientName: overview.clientName,
      fundName: overview.fundName,
      fundType: overview.fundType,
      fundGeneration: overview.fundGeneration,
      previousFundSize: overview.previousFundSize,
      previousFundDomicile: overview.previousFundDomicile,
      targetCloseDate: overview.targetCloseDate,
      targetFundSize: overview.targetFundSize,
      fundCurrency: currency,
      investmentStrategy: overview.investmentStrategy,
      geographicFocus: overview.geographicFocus,
      targetInvestments: overview.targetInvestments,
      notes: overview.notes,
      entities,
      investorProfile,
      fundTerms: {
        fundCurrency: overview.fundCurrency,
        managementFee: overview.managementFee,
        managementFeeBasis: overview.managementFeeBasis,
        carry: overview.carry,
        hurdle: overview.hurdle,
        waterfall: overview.waterfall,
        catchup: overview.catchup,
        fundTerm: overview.fundTerm,
        investmentPeriod: overview.investmentPeriod,
        allowExtension: overview.allowExtension,
        extensionPeriod: overview.extensionPeriod,
        gpClawback: overview.gpClawback,
        keyPerson: overview.keyPerson,
        capitalCalls: overview.capitalCalls,
        distributions: overview.distributions,
        reportingFrequency: overview.reportingFrequency,
        yearEnd: overview.yearEnd,
        shareclasses: overview.shareclasses,
        shareclassCurrencies: overview.shareclassCurrencies,
      },
      services: s,
      status: "draft",
    });
    setSaving(false);
    setSaved(true);
    toast({ title: "Mandate saved", description: `${overview.fundName} has been saved as a draft.` });
    if (onSave) onSave();
  };

  const handleCopy = () => {
    const text = buildTextSummary({ overview, entities, investorProfile, services: s });
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: "Summary copied as formatted text." });
  };

  const labelMap = { aifm: "AIFM", fundAccounting: "Fund Accounting", navCalc: "NAV", investorReporting: "Investor Reporting", amlKyc: "AML/KYC", mlro: "MLRO/AMLCO", fatcaCrs: "FATCA/CRS", annexIV: "Annex IV", formPF: "Form PF", callDist: "Capital Calls", transferAgency: "Transfer Agency", shareholderRegister: "Shareholder Register", corpSec: "Corp Sec", directors: "Directors", registeredOffice: "Reg. Office", substance: "Substance", boardMeetings: "Board Meetings", agm: "AGM", regulatoryFilings: "Reg. Filings", bankAccounts: "Bank Accounts", cashMgmt: "Cash Mgmt", fx: "FX", paymentProcessing: "Payments", mancoAccounting: "ManCo Accounting", mancoPayroll: "ManCo Payroll", apAr: "AP/AR", mancoRegReporting: "ManCo Reporting", mancoCompliance: "ManCo Compliance", fundTax: "Fund Tax", transferPricing: "Transfer Pricing", vat: "VAT", subTax: "Sub Tax", whtReclaims: "WHT Reclaims", dac6: "DAC6", esg: "ESG/SFDR", regAdvisory: "Reg Advisory", dora: "DORA", restructuring: "Restructuring", windDown: "Wind-down", irSupport: "IR Support", carryCalc: "Carry Calc" };

  return (
    <div className="space-y-5">

      {/* ── Service packages ── */}
      <div>
        <p className="text-sm font-semibold mb-3">Service Package</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "core", label: "Core Admin", description: "Fund accounting, NAV, Investor reporting, AML/KYC, FATCA/CRS, Shareholder register" },
            { id: "full", label: "Full Service", description: "Core Admin + Corporate secretarial, Directors, Registered office, Substance, Bank setup, Reg filings, Tax" },
            { id: "custom", label: "Custom", description: "Pick services manually below" },
          ].map(pkg => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => applyPackage(pkg.id)}
              className={cn(
                "p-3 rounded-lg border text-left transition-all space-y-1",
                activePackage === pkg.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/40"
              )}
            >
              <p className="text-sm font-semibold">{pkg.label}</p>
              <p className="text-[11px] text-muted-foreground leading-snug">{pkg.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <div className="space-y-3">
        <Section title="Core Fund Administration & AIFM" defaultOpen>
          <ServiceItem id="aifm" label={`AIFM services${isAIFM ? ` (${entities?.fund?.regime})` : ""}`} checked={s.aifm?.enabled || false} onToggle={() => toggle("aifm")} />
          <ServiceItem id="fundAccounting" label="Fund accounting & bookkeeping" checked={s.fundAccounting?.enabled || false} onToggle={() => toggle("fundAccounting")} />
          <ServiceItem id="navCalc" label={`NAV calculation${overview.reportingFrequency ? ` (${overview.reportingFrequency})` : ""}`} checked={s.navCalc?.enabled || false} onToggle={() => toggle("navCalc")} />
          <ServiceItem id="investorReporting" label={`Investor reporting${overview.reportingFrequency ? ` (${overview.reportingFrequency})` : ""}`} checked={s.investorReporting?.enabled || false} onToggle={() => toggle("investorReporting")} />
          <ServiceItem id="amlKyc" label="AML/KYC investor onboarding" checked={s.amlKyc?.enabled || false} onToggle={() => toggle("amlKyc")} recommended>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 p-2 rounded bg-rose-50 border border-rose-200 text-rose-800">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <div>
                  <p className="font-semibold mb-1">AML/CFT Legal Framework</p>
                  <p className="text-[11px]">Law of 12 November 2004 on AML/CFT (as amended by Law of 6 February 2025) · CSSF Regulation No 12-02 (as amended by No 20-05) · EU 4th AML Directive (2015/849) as amended by 5th (2018/843).</p>
                </div>
              </div>
              <div className="p-2 rounded bg-secondary border text-muted-foreground space-y-1">
                <p className="font-medium text-foreground text-[11px]">Standard CDD checklist per investor (Art. 3(2) of the 2004 Law)</p>
                <p className="text-[11px]"><strong>Natural persons:</strong> Full name · Date/place of birth · Nationality · Residential address · Photo ID (passport or national ID copy)</p>
                <p className="text-[11px]"><strong>Legal entities:</strong> Company name, legal form, registered address · Directors/managers · Certified RCS extract (≤3 months old)</p>
                <p className="text-[11px]"><strong>Beneficial owners:</strong> Identify all natural persons owning/controlling &gt;25% of shares or voting rights. Verify against Luxembourg RBE register where available.</p>
                <p className="text-[11px]"><strong>EDD required if:</strong> PEP · High-risk third country · Complex/unusual transaction.</p>
                <p className="text-[11px]"><strong>Ongoing monitoring:</strong> High-risk: annually · Medium-risk: every 2 years · Low-risk: every 3–5 years.</p>
              </div>
            </div>
          </ServiceItem>
          <ServiceItem id="mlro" label="MLRO / AMLCO / DMLRO services" checked={s.mlro?.enabled || false} onToggle={() => toggle("mlro")} />
          <ServiceItem id="fatcaCrs" label="FATCA/CRS reporting" checked={s.fatcaCrs?.enabled || false} onToggle={() => toggle("fatcaCrs")} recommended />
          {isAIFM && <ServiceItem id="annexIV" label="Annex IV reporting (AIFMD)" checked={s.annexIV?.enabled || false} onToggle={() => toggle("annexIV")} recommended />}
          {usInvestors && <ServiceItem id="formPF" label="Form PF services" checked={s.formPF?.enabled || false} onToggle={() => toggle("formPF")} recommended />}
          {isClosed && <ServiceItem id="callDist" label="Capital call / distribution processing" checked={s.callDist?.enabled || false} onToggle={() => toggle("callDist")} />}
          {isOpen && <ServiceItem id="transferAgency" label="Transfer agency" checked={s.transferAgency?.enabled || false} onToggle={() => toggle("transferAgency")} />}
          <ServiceItem id="shareholderRegister" label="Shareholder register maintenance" checked={s.shareholderRegister?.enabled || false} onToggle={() => toggle("shareholderRegister")} />
        </Section>

        <Section title="Corporate & Governance">
          <ServiceItem id="corpSec" label="Corporate secretarial services" checked={s.corpSec?.enabled || false} onToggle={() => toggle("corpSec")} />
          <ServiceItem id="directors" label="Director services (Director A / Director B)" checked={s.directors?.enabled || false} onToggle={() => toggle("directors")} />
          <ServiceItem id="registeredOffice" label="Local registered office address" checked={s.registeredOffice?.enabled || false} onToggle={() => toggle("registeredOffice")} />
          <ServiceItem id="substance" label="Luxembourg substance & presence" checked={s.substance?.enabled || false} onToggle={() => toggle("substance")} />
          <ServiceItem id="boardMeetings" label="Board meeting coordination" checked={s.boardMeetings?.enabled || false} onToggle={() => toggle("boardMeetings")} />
          <ServiceItem id="agm" label="Annual general meeting organisation" checked={s.agm?.enabled || false} onToggle={() => toggle("agm")} />
          <ServiceItem id="regulatoryFilings" label="Regulatory filings (RCS, CSSF notifications)" checked={s.regulatoryFilings?.enabled || false} onToggle={() => toggle("regulatoryFilings")} />
        </Section>

        <Section title="Banking & Treasury">
          <ServiceItem id="bankAccounts" label="Bank account setup" checked={s.bankAccounts?.enabled || false} onToggle={() => toggle("bankAccounts")}>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Number of accounts</Label>
                <Input type="number" className="h-8 text-xs" value={s.bankAccounts?.count || ""} onChange={ev => setSub("bankAccounts", "count", ev.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Which entities?</Label>
                <div className="flex flex-wrap gap-1.5">
                  {entityOptions.map(ent => (
                    <label key={ent} className="flex items-center gap-1 cursor-pointer text-xs border rounded px-2 py-1 hover:bg-secondary">
                      <input type="checkbox"
                        checked={(s.bankAccounts?.entityList || []).includes(ent)}
                        onChange={() => {
                          const list = s.bankAccounts?.entityList || [];
                          setSub("bankAccounts", "entityList", list.includes(ent) ? list.filter(x => x !== ent) : [...list, ent]);
                        }}
                      />
                      {ent}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Currencies</Label>
                <TagInput value={s.bankAccounts?.currencies || []} onChange={v => setSub("bankAccounts", "currencies", v)} placeholder="EUR, USD, GBP..." />
              </div>
            </div>
          </ServiceItem>
          <ServiceItem id="cashMgmt" label="Cash management / treasury" checked={s.cashMgmt?.enabled || false} onToggle={() => toggle("cashMgmt")} />
          <ServiceItem id="fx" label="FX spot / hedging" checked={s.fx?.enabled || false} onToggle={() => toggle("fx")} />
          <ServiceItem id="paymentProcessing" label="Payment processing" checked={s.paymentProcessing?.enabled || false} onToggle={() => toggle("paymentProcessing")} />
        </Section>

        <Section title="Management Company Support">
          <ServiceItem id="mancoAccounting" label="ManCo accounting" checked={s.mancoAccounting?.enabled || false} onToggle={() => toggle("mancoAccounting")} />
          <ServiceItem id="mancoPayroll" label="ManCo payroll" checked={s.mancoPayroll?.enabled || false} onToggle={() => toggle("mancoPayroll")} />
          <ServiceItem id="apAr" label="Accounts payable / receivable" checked={s.apAr?.enabled || false} onToggle={() => toggle("apAr")} />
          <ServiceItem id="mancoRegReporting" label="ManCo regulatory reporting" checked={s.mancoRegReporting?.enabled || false} onToggle={() => toggle("mancoRegReporting")} />
          <ServiceItem id="mancoCompliance" label="ManCo compliance monitoring" checked={s.mancoCompliance?.enabled || false} onToggle={() => toggle("mancoCompliance")} />
        </Section>

        <Section title="Tax & Compliance">
          <ServiceItem id="fundTax" label="Fund tax compliance & reporting" checked={s.fundTax?.enabled || false} onToggle={() => toggle("fundTax")} />
          <ServiceItem id="transferPricing" label="Transfer pricing documentation" checked={s.transferPricing?.enabled || false} onToggle={() => toggle("transferPricing")} />
          <ServiceItem id="vat" label="VAT compliance" checked={s.vat?.enabled || false} onToggle={() => toggle("vat")} />
          <ServiceItem id="subTax" label="Subscription tax (taxe d'abonnement)" checked={s.subTax?.enabled || false} onToggle={() => toggle("subTax")} />
          <ServiceItem id="whtReclaims" label="Withholding tax reclaims" checked={s.whtReclaims?.enabled || false} onToggle={() => toggle("whtReclaims")} />
          <ServiceItem id="dac6" label="DAC6 / MDR reporting" checked={s.dac6?.enabled || false} onToggle={() => toggle("dac6")} />
        </Section>

        <Section title="Optional / Advisory">
          <ServiceItem id="esg" label="ESG / SFDR reporting & advisory" checked={s.esg?.enabled || false} onToggle={() => toggle("esg")} />
          <ServiceItem id="regAdvisory" label="Regulatory advisory (AIFMD II readiness)" checked={s.regAdvisory?.enabled || false} onToggle={() => toggle("regAdvisory")} />
          <ServiceItem id="dora" label="DORA compliance support" checked={s.dora?.enabled || false} onToggle={() => toggle("dora")} />
          <ServiceItem id="restructuring" label="Fund restructuring advisory" checked={s.restructuring?.enabled || false} onToggle={() => toggle("restructuring")} />
          <ServiceItem id="windDown" label="Liquidation / wind-down services" checked={s.windDown?.enabled || false} onToggle={() => toggle("windDown")} />
          <ServiceItem id="irSupport" label="Investor relations support" checked={s.irSupport?.enabled || false} onToggle={() => toggle("irSupport")} />
          <ServiceItem id="carryCalc" label="Performance fee / carry calculation" checked={s.carryCalc?.enabled || false} onToggle={() => toggle("carryCalc")} />
        </Section>
      </div>

      {/* ── Review Summary ── */}
      <div className="pt-4 border-t space-y-4">
        <p className="text-sm font-semibold">Mandate Summary</p>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Client Overview</CardTitle></CardHeader>
          <CardContent className="space-y-0">
            <InfoRow label="Client" value={overview.clientName} />
            <InfoRow label="Fund" value={overview.fundName} />
            <InfoRow label="Type" value={overview.fundType} />
            <InfoRow label="Target size" value={overview.targetFundSize ? `${currency} ${Number(overview.targetFundSize).toLocaleString()}` : null} />
            <InfoRow label="Target close" value={overview.targetCloseDate} />
            <InfoRow label="Currency" value={currency} />
            <InfoRow label="Strategy" value={overview.investmentStrategy} />
            <InfoRow label="Geography" value={overview.geographicFocus} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Structure</CardTitle></CardHeader>
          <CardContent className="py-4">
            <StructureTree entities={e} overview={{ ...overview, ...ip }} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Investor Profile</CardTitle></CardHeader>
          <CardContent>
            <InfoRow label="Expected investors" value={ip.investorCount} />
            {ip.investorTypes?.length > 0 && <InfoRow label="Types" value={ip.investorTypes.join(", ")} />}
            <InfoRow label="Min commitment" value={ip.minCommitment ? `${currency} ${Number(ip.minCommitment).toLocaleString()}` : null} />
            <InfoRow label="US investors" value={ip.usInvestors ? "Yes ⚠️ FATCA/Form PF required" : "No"} />
            <InfoRow label="UK investors" value={ip.ukInvestors ? "Yes — NPPR review recommended" : "No"} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Terms</CardTitle></CardHeader>
          <CardContent>
            <InfoRow label="Management fee" value={overview.managementFee ? `${overview.managementFee}%` : null} />
            <InfoRow label="Fee basis" value={overview.managementFeeBasis} />
            <InfoRow label="Carry" value={overview.carry ? `${overview.carry}%` : null} />
            <InfoRow label="Waterfall" value={overview.waterfall} />
            <InfoRow label="Hurdle" value={overview.hurdle ? `${overview.hurdle}%` : null} />
            <InfoRow label="Fund term" value={overview.fundTerm ? `${overview.fundTerm} years` : null} />
            <InfoRow label="Investment period" value={overview.investmentPeriod ? `${overview.investmentPeriod} years` : null} />
            <InfoRow label="Reporting" value={overview.reportingFrequency} />
            <InfoRow label="Year end" value={overview.yearEnd} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Services Scope</CardTitle></CardHeader>
          <CardContent>
            {enabledServices.length === 0 ? (
              <p className="text-sm text-muted-foreground">No services selected</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {enabledServices.map(([k, v]) => (
                  <span key={k} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {labelMap[k] || k}{k === "bankAccounts" && v.count ? ` (${v.count})` : ""}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-lux-blue/30 bg-lux-blue-light">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-lux-blue">Onboarding Readiness — Next Steps</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-lux-blue shrink-0 mt-0.5" />
                  {step}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="sm:flex-none">← Back</Button>
        <Button variant="outline" onClick={handleCopy} className="flex-1 gap-2">
          <Copy className="w-4 h-4" /> Copy Summary
        </Button>
        <Button onClick={handleSave} disabled={saving || saved} className="flex-1 gap-2">
          {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : saving ? "Saving..." : <><Save className="w-4 h-4" /> Generate Proposal</>}
        </Button>
      </div>
    </div>
  );
}