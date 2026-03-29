import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ShieldAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import TagInput from "@/components/onboard/TagInput";

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
        <div className="px-3 pb-3 border-t border-border/50 pt-2 space-y-2">
          {children}
        </div>
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
      <CollapsibleContent className="pt-2 space-y-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function StepServices({ data, onChange, onNext, onBack, fundType, investorProfile, fundTerms, entities }) {
  const s = data || {};
  const set = (k, v) => onChange({ ...s, [k]: v });
  const toggle = (k) => set(k, { ...(s[k] || {}), enabled: !(s[k]?.enabled) });
  const setSub = (k, field, v) => set(k, { ...(s[k] || {}), [field]: v });

  const isClosed = fundType?.includes("Closed") || fundType?.includes("Semi");
  const isOpen = fundType?.includes("Open") || fundType?.includes("Semi");
  const isAIFM = entities?.fund?.regime?.includes("AIFM");
  const usInvestors = investorProfile?.usInvestors;

  // dynamically build entity options for bank accounts
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

  return (
    <div className="space-y-4">
      <Section title="Core Fund Administration & AIFM" defaultOpen>
        <ServiceItem id="aifm" label={`AIFM services${isAIFM ? ` (${entities?.fund?.regime})` : ""}`} checked={s.aifm?.enabled || false} onToggle={() => toggle("aifm")} />
        <ServiceItem id="fundAccounting" label="Fund accounting & bookkeeping" checked={s.fundAccounting?.enabled || false} onToggle={() => toggle("fundAccounting")} />
        <ServiceItem id="navCalc" label={`NAV calculation${fundTerms?.navFrequency ? ` (${fundTerms.navFrequency})` : fundTerms?.reportingFrequency ? ` (${fundTerms.reportingFrequency})` : ""}`} checked={s.navCalc?.enabled || false} onToggle={() => toggle("navCalc")} />
        <ServiceItem id="investorReporting" label={`Investor reporting${fundTerms?.reportingFrequency ? ` (${fundTerms.reportingFrequency})` : ""}`} checked={s.investorReporting?.enabled || false} onToggle={() => toggle("investorReporting")} />
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
              <p className="text-[11px]"><strong>Legal entities:</strong> Company name, legal form, registered address · Directors/managers (name, DOB, nationality) · Certified RCS extract (≤3 months old) · Provisions governing power to bind the entity</p>
              <p className="text-[11px]"><strong>Beneficial owners:</strong> Identify all natural persons owning/controlling <strong>&gt;25%</strong> of shares or voting rights (Art. 1(7)). If none above 25%, identify those exercising control through other means. If still none, identify senior managing official(s). Verify against Luxembourg RBE register where available.</p>
              <p className="text-[11px]"><strong>Purpose & nature:</strong> Document investor's investment objective, source of funds (this transaction), source of wealth (overall), expected holding period.</p>
              <p className="text-[11px]"><strong>EDD required if:</strong> Customer/UBO is a PEP (including family members and close associates) · High-risk third country · Complex/unusual transaction · Correspondent banking (non-EEA). Shell bank relationships are <strong>prohibited</strong>.</p>
              <p className="text-[11px]"><strong>Ongoing monitoring:</strong> High-risk: annually · Medium-risk: every 2 years · Low-risk: every 3–5 years.</p>
              <p className="text-[11px]"><strong>Fund/UCI context:</strong> For omnibus/nominee accounts, apply look-through to underlying investors unless intermediary is subject to equivalent AML obligations in EU/equivalent country (CSSF Reg. 12-02, Art. 20–22).</p>
              <p className="text-[11px]"><strong>Thresholds:</strong> Cash transactions: EUR 15,000 (Art. 3(1)) · Occasional wire transfers: EUR 1,000 (EU Funds Transfer Regulation).</p>
            </div>
            <div className="flex items-start gap-2 p-2 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[11px]">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              Since February 2025: Crypto-asset service providers (CASPs) are explicitly in scope of Luxembourg AML/CFT obligations.
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
              <Input type="number" className="h-8 text-xs" value={s.bankAccounts?.count || ""} onChange={e => setSub("bankAccounts","count",e.target.value)} />
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
                        setSub("bankAccounts","entityList", list.includes(ent) ? list.filter(x=>x!==ent) : [...list, ent]);
                      }}
                    />
                    {ent}
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Currencies</Label>
              <TagInput value={s.bankAccounts?.currencies || []} onChange={v => setSub("bankAccounts","currencies",v)} placeholder="EUR, USD, GBP..." />
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

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">← Back</Button>
        <Button onClick={() => onNext(s)} className="flex-1">Continue to Review →</Button>
      </div>
    </div>
  );
}