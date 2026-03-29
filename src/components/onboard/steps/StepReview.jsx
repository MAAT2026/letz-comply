import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Save, CheckCircle2 } from "lucide-react";
import StructureTree from "@/components/onboard/StructureTree";

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

function buildTextSummary({ overview, entities, investorProfile, fundTerms, services }) {
  const e = entities || {};
  const ip = investorProfile || {};
  const t = fundTerms || {};
  const s = services || {};
  const currency = overview.fundCurrency === "Other" ? (overview.fundCurrencyOther || "") : (overview.fundCurrency || "EUR");

  const fmt = (n) => n ? Number(n).toLocaleString() : "—";

  const entityLines = Object.entries(e)
    .filter(([, v]) => v?.enabled)
    .map(([k, v]) => {
      const labels = { fund:"Fund Vehicle", gp:"GP", advisor:"Investment Advisor", carry:"Carry Vehicle", manco:"ManCo/AIFM", spv:"SPV(s)", coinvest:"Co-invest", feeder:"Feeder Fund(s)", depositary:"Depositary" };
      return `• ${labels[k] || k}: ${v.legalForm || v.type || "—"}${v.regime ? ` (${v.regime})` : ""}`;
    });

  const serviceCategories = {
    "Administration": ["aifm","fundAccounting","navCalc","investorReporting","amlKyc","mlro","fatcaCrs","annexIV","formPF","callDist","transferAgency","shareholderRegister"],
    "Corporate": ["corpSec","directors","registeredOffice","substance","boardMeetings","agm","regulatoryFilings"],
    "Banking": ["bankAccounts","cashMgmt","fx","paymentProcessing"],
    "ManCo Support": ["mancoAccounting","mancoPayroll","apAr","mancoRegReporting","mancoCompliance"],
    "Tax": ["fundTax","transferPricing","vat","subTax","whtReclaims","dac6"],
    "Advisory": ["esg","regAdvisory","dora","restructuring","windDown","irSupport","carryCalc"],
  };

  const serviceLines = Object.entries(serviceCategories)
    .map(([cat, keys]) => {
      const enabled = keys.filter(k => s[k]?.enabled);
      if (!enabled.length) return null;
      const labels = { aifm:"AIFM", fundAccounting:"Fund accounting", navCalc:"NAV calculation", investorReporting:"Investor reporting", amlKyc:"AML/KYC", mlro:"MLRO/AMLCO", fatcaCrs:"FATCA/CRS", annexIV:"Annex IV", formPF:"Form PF", callDist:"Capital calls/distributions", transferAgency:"Transfer agency", shareholderRegister:"Shareholder register", corpSec:"Corporate secretarial", directors:"Director services", registeredOffice:"Registered office", substance:"Luxembourg substance", boardMeetings:"Board meetings", agm:"AGM", regulatoryFilings:"Regulatory filings", bankAccounts:"Bank accounts", cashMgmt:"Cash management", fx:"FX/hedging", paymentProcessing:"Payment processing", mancoAccounting:"ManCo accounting", mancoPayroll:"ManCo payroll", apAr:"AP/AR", mancoRegReporting:"ManCo reg reporting", mancoCompliance:"ManCo compliance", fundTax:"Fund tax", transferPricing:"Transfer pricing", vat:"VAT", subTax:"Subscription tax", whtReclaims:"WHT reclaims", dac6:"DAC6/MDR", esg:"ESG/SFDR", regAdvisory:"Reg advisory", dora:"DORA", restructuring:"Restructuring", windDown:"Wind-down", irSupport:"IR support", carryCalc:"Carry calculation" };
      return `${cat}: ${enabled.map(k => labels[k] || k).join(", ")}`;
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
• ${ip.investorCount || "—"} investors${ip.investorTypes?.length ? ` (${ip.investorTypes.map(t=>t.split(" ")[0]).join(", ")})` : ""}
${ip.anchorInvestors?.length ? `• Anchors: ${ip.anchorInvestors.join(", ")}` : ""}
• US investors: ${ip.usInvestors ? "Yes" : "No"}${ip.ukInvestors ? " | UK investors: Yes" : ""}
• Min commitment: ${currency} ${fmt(ip.minCommitment)}

TERMS
${[
  t.managementFee && `Management fee: ${t.managementFee}%${t.managementFeeBasis ? ` (${t.managementFeeBasis})` : ""}`,
  t.carry && `Carried interest: ${t.carry}%`,
  t.waterfall && `Waterfall: ${t.waterfall}`,
  t.hurdle && `Hurdle: ${t.hurdle}%`,
  t.fundTerm && `Fund term: ${t.fundTerm} years${t.extensionPeriod ? ` + ${t.extensionPeriod}yr extension` : ""}`,
  t.reportingFrequency && `Reporting: ${t.reportingFrequency}`,
  t.navFrequency && `NAV: ${t.navFrequency}`,
  t.redemptionFrequency && `Redemptions: ${t.redemptionFrequency}${t.redemptionNotice ? ` (notice: ${t.redemptionNotice})` : ""}`,
].filter(Boolean).join("\n") || "—"}

SERVICES REQUESTED
${serviceLines.join("\n") || "None selected"}

Generated by LetzComply`;
}

export default function StepReview({ overview, entities, investorProfile, fundTerms, services, onBack, onGoToStep }) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const nextSteps = buildNextSteps({ entities, services, investorProfile, fundType: overview.fundType });
  const currency = overview.fundCurrency === "Other" ? (overview.fundCurrencyOther || "") : (overview.fundCurrency || "EUR");

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
      fundTerms,
      services,
      status: "draft",
    });
    setSaving(false);
    setSaved(true);
    toast({ title: "Mandate saved", description: `${overview.fundName} has been saved as a draft.` });
  };

  const handleCopy = () => {
    const text = buildTextSummary({ overview, entities, investorProfile, fundTerms, services });
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: "Summary copied as formatted text." });
  };

  const ip = investorProfile || {};
  const t = fundTerms || {};
  const e = entities || {};
  const s = services || {};

  const enabledEntities = Object.entries(e).filter(([, v]) => v?.enabled);
  const enabledServices = Object.entries(s).filter(([, v]) => v?.enabled);

  return (
    <div className="space-y-4">
      {/* Client Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            Client Overview
            {onGoToStep && <button onClick={() => onGoToStep(1)} className="text-xs text-primary font-normal hover:underline">Edit</button>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          <InfoRow label="Client" value={overview.clientName} />
          <InfoRow label="Fund" value={overview.fundName} />
          <InfoRow label="Type" value={overview.fundType} />
          <InfoRow label="Generation" value={overview.fundGeneration} />
          <InfoRow label="Target size" value={overview.targetFundSize ? `${currency} ${Number(overview.targetFundSize).toLocaleString()}` : null} />
          <InfoRow label="Target close" value={overview.targetCloseDate} />
          <InfoRow label="Currency" value={currency} />
          <InfoRow label="Strategy" value={overview.investmentStrategy} />
          <InfoRow label="Geography" value={overview.geographicFocus} />
          <InfoRow label="Investments" value={overview.targetInvestments} />
        </CardContent>
      </Card>

      {/* Structure Tree */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            Structure
            {onGoToStep && <button onClick={() => onGoToStep(2)} className="text-xs text-primary font-normal hover:underline">Edit</button>}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <StructureTree entities={e} overview={{ ...overview, ...ip }} />
        </CardContent>
      </Card>

      {/* Investor Profile */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            Investor Profile
            {onGoToStep && <button onClick={() => onGoToStep(3)} className="text-xs text-primary font-normal hover:underline">Edit</button>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="Expected investors" value={ip.investorCount} />
          {ip.investorTypes?.length > 0 && <InfoRow label="Types" value={ip.investorTypes.join(", ")} />}
          {ip.anchorInvestors?.length > 0 && <InfoRow label="Anchors" value={ip.anchorInvestors.join(", ")} />}
          <InfoRow label="Min commitment" value={ip.minCommitment ? `${currency} ${Number(ip.minCommitment).toLocaleString()}` : null} />
          <InfoRow label="GP commitment" value={ip.gpCommitment ? `${currency} ${Number(ip.gpCommitment).toLocaleString()}` : null} />
          <InfoRow label="US investors" value={ip.usInvestors ? "Yes ⚠️ FATCA/Form PF required" : "No"} />
          <InfoRow label="UK investors" value={ip.ukInvestors ? "Yes — NPPR review recommended" : "No"} />
        </CardContent>
      </Card>

      {/* Fund Terms */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            Fund Terms
            {onGoToStep && <button onClick={() => onGoToStep(4)} className="text-xs text-primary font-normal hover:underline">Edit</button>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="Management fee" value={t.managementFee ? `${t.managementFee}%` : null} />
          <InfoRow label="Fee basis" value={t.managementFeeBasis} />
          <InfoRow label="Carry" value={t.carry ? `${t.carry}%` : null} />
          <InfoRow label="Waterfall" value={t.waterfall} />
          <InfoRow label="Hurdle" value={t.hurdle ? `${t.hurdle}%` : null} />
          <InfoRow label="Fund term" value={t.fundTerm ? `${t.fundTerm} years` : null} />
          <InfoRow label="Investment period" value={t.investmentPeriod ? `${t.investmentPeriod} years` : null} />
          <InfoRow label="Extension" value={t.extensionPeriod ? `${t.extensionPeriod} years` : null} />
          <InfoRow label="Reporting" value={t.reportingFrequency} />
          <InfoRow label="Year end" value={t.yearEnd} />
          <InfoRow label="NAV frequency" value={t.navFrequency} />
          <InfoRow label="Redemptions" value={t.redemptionFrequency} />
          <InfoRow label="Redemption notice" value={t.redemptionNotice} />
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            Services Scope
            {onGoToStep && <button onClick={() => onGoToStep(5)} className="text-xs text-primary font-normal hover:underline">Edit</button>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {enabledServices.length === 0 ? (
            <p className="text-sm text-muted-foreground">No services selected</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {enabledServices.map(([k, v]) => {
                const labelMap = { aifm:"AIFM", fundAccounting:"Fund Accounting", navCalc:"NAV", investorReporting:"Investor Reporting", amlKyc:"AML/KYC", mlro:"MLRO/AMLCO", fatcaCrs:"FATCA/CRS", annexIV:"Annex IV", formPF:"Form PF", callDist:"Capital Calls", transferAgency:"Transfer Agency", shareholderRegister:"Shareholder Register", corpSec:"Corp Sec", directors:"Directors", registeredOffice:"Reg. Office", substance:"Substance", boardMeetings:"Board Meetings", agm:"AGM", regulatoryFilings:"Reg. Filings", bankAccounts:"Bank Accounts", cashMgmt:"Cash Mgmt", fx:"FX", paymentProcessing:"Payments", mancoAccounting:"ManCo Accounting", mancoPayroll:"ManCo Payroll", apAr:"AP/AR", mancoRegReporting:"ManCo Reporting", mancoCompliance:"ManCo Compliance", fundTax:"Fund Tax", transferPricing:"Transfer Pricing", vat:"VAT", subTax:"Sub Tax", whtReclaims:"WHT Reclaims", dac6:"DAC6", esg:"ESG/SFDR", regAdvisory:"Reg Advisory", dora:"DORA", restructuring:"Restructuring", windDown:"Wind-down", irSupport:"IR Support", carryCalc:"Carry Calc" };
                return (
                  <span key={k} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {labelMap[k] || k}
                    {k === "bankAccounts" && v.count ? ` (${v.count})` : ""}
                  </span>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Onboarding Readiness */}
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

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={onBack} className="sm:flex-none">← Back</Button>
        <Button variant="outline" onClick={handleCopy} className="flex-1 gap-2">
          <Copy className="w-4 h-4" /> Copy Summary
        </Button>
        <Button onClick={handleSave} disabled={saving || saved} className="flex-1 gap-2">
          {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : saving ? "Saving..." : <><Save className="w-4 h-4" /> Save Mandate</>}
        </Button>
      </div>
    </div>
  );
}