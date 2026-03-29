import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { JOB_TITLES } from "@/lib/regData";
import TagInput from "@/components/onboard/TagInput";

const FUND_TYPES = [
  "Closed-ended (PE/VC/RE/Infra/Debt)",
  "Open-ended (UCITS/AIF)",
  "Semi-open-ended",
  "Single asset / SPV",
  "Fund of Funds",
  "Other",
];
const CURRENCIES = ["EUR", "USD", "GBP", "CHF", "Other"];
const FUND_LEGAL_FORMS = ["SCSp", "SCA", "SICAV-SIF", "SICAV-RAIF", "SICAV-UCITS", "FCP", "S.A.", "S.à r.l.", "SCS", "Other"];
const REG_REGIMES = ["Full AIFM (AuM >€100m)", "Sub-threshold AIFM (AuM <€100m)", "UCITS", "Registered AIF", "Unregulated", "Other"];
const GP_FORMS = ["S.à r.l.", "S.A.", "SCA", "SCSp", "Other"];
const MANCO_TYPES = ["Client's own licensed ManCo", "Third-party AIFM (our platform)", "Third-party AIFM (other)", "No ManCo / Self-managed"];
const DEPOSITARY_TYPES = ["Full depositary", "Depositary-lite", "Custodian only", "Not required"];
const CARRY_FORMS = ["S.à r.l.", "SCSp", "S.A.", "Other"];
const CARRY_STRUCTURES = ["Fund-level waterfall (European)", "Deal-by-deal (American)", "Hybrid", "N/A"];
const COINVEST_FORMS = ["SCSp", "S.à r.l.", "Other"];
const FEEDER_ADMIN = ["Yes — we administer", "No — third party", "TBD"];
const ADVISOR_JURISDICTIONS = ["Luxembourg", "UK", "Other EU", "Non-EU"];
const ADVISOR_REG = ["Regulated", "Unregulated / Exempt", "Pending authorisation"];

function Sel({ value, onChange, placeholder, options, className }) {
  return (
    <Select value={value || ""} onValueChange={onChange}>
      <SelectTrigger className={className}><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>{options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
    </Select>
  );
}

function SmallSel({ value, onChange, placeholder, options }) {
  return (
    <Select value={value || ""} onValueChange={onChange}>
      <SelectTrigger className="h-8 text-xs"><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>{options.map(o => <SelectItem key={o} value={o} className="text-xs">{o}</SelectItem>)}</SelectContent>
    </Select>
  );
}

function EntitySection({ title, enabled, onToggle, defaultOn, children }) {
  return (
    <div className={`border rounded-lg transition-all ${enabled ? "border-primary/30 bg-primary/5" : "border-border bg-card"}`}>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-semibold text-sm">{title}</span>
        <Switch checked={enabled} onCheckedChange={onToggle} disabled={defaultOn} />
      </div>
      {enabled && (
        <div className="px-4 pb-4 pt-1 border-t border-border/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, children, span2 }) {
  return (
    <div className={`space-y-1 ${span2 ? "sm:col-span-2" : ""}`}>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="sm:col-span-2 flex items-center justify-between py-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function setE(data, onChange, entity, field, value) {
  onChange({ ...data, [entity]: { ...(data[entity] || {}), [field]: value } });
}
function toggleEntity(data, onChange, entity) {
  onChange({ ...data, [entity]: { ...(data[entity] || {}), enabled: !(data[entity]?.enabled) } });
}

export default function StepFundOverview({ overview, onChangeOverview, entities, onChangeEntities, onNext }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showServiceProviders, setShowServiceProviders] = useState(false);

  const set = (key, val) => onChangeOverview({ ...overview, [key]: val });
  const e = entities || {};
  const s = (entity, field, value) => setE(e, onChangeEntities, entity, field, value);
  const t = (entity) => toggleEntity(e, onChangeEntities, entity);

  const isClosed = overview.fundType?.includes("Closed") || overview.fundType?.includes("Semi");
  const mancoType = e.manco?.type;
  const showMancoName = mancoType && mancoType !== "No ManCo / Self-managed";

  const handleNext = () => {
    const jobTitleValid = overview.jobTitle && (overview.jobTitle !== "Other" || overview.jobTitleOther);
    if (!overview.clientName || !overview.fundName || !overview.fundType || !jobTitleValid) return;
    const finalOverview = {
      ...overview,
      jobTitle: overview.jobTitle === "Other" ? overview.jobTitleOther : overview.jobTitle,
    };
    onNext(finalOverview, e);
  };

  const isValid = overview.clientName && overview.fundName && overview.fundType && overview.jobTitle && (overview.jobTitle !== "Other" || overview.jobTitleOther);

  return (
    <div className="space-y-5">
      {/* Client & Fund basics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Client name *</Label>
          <Input placeholder="e.g. Acme Capital" value={overview.clientName || ""} onChange={e => set("clientName", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Fund name *</Label>
          <Input placeholder="e.g. Acme Capital Fund II" value={overview.fundName || ""} onChange={e => set("fundName", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Fund type *</Label>
          <Sel value={overview.fundType} onChange={v => set("fundType", v)} placeholder="Select fund type" options={FUND_TYPES} />
        </div>
        <div className="space-y-1.5">
          <Label>First close date</Label>
          <Input type="date" value={overview.targetCloseDate || ""} onChange={e => set("targetCloseDate", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Target size</Label>
          <Input type="number" placeholder="e.g. 250000000" value={overview.targetFundSize || ""} onChange={e => set("targetFundSize", Number(e.target.value))} />
        </div>
        <div className="space-y-1.5">
          <Label>Geographic focus</Label>
          <Input placeholder="e.g. Pan-European, Global" value={overview.geographicFocus || ""} onChange={e => set("geographicFocus", e.target.value)} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Target investments</Label>
          <Input placeholder="e.g. 10-12 or 20+ or Single asset" value={overview.targetInvestments || ""} onChange={e => set("targetInvestments", e.target.value)} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Investment focus / strategy</Label>
        <Textarea placeholder="Describe the fund's investment strategy, sector focus, etc." value={overview.investmentStrategy || ""} onChange={e => set("investmentStrategy", e.target.value)} rows={3} />
      </div>

      <div className="space-y-1.5">
        <Label>Your job title *</Label>
        <Sel value={overview.jobTitle === "Other" ? "Other" : overview.jobTitle || ""} onChange={v => set("jobTitle", v)} placeholder="Select your job title" options={JOB_TITLES} />
        {overview.jobTitle === "Other" && (
          <Input placeholder="Please specify your job title" value={overview.jobTitleOther || ""} onChange={e => set("jobTitleOther", e.target.value)} className="mt-2" />
        )}
      </div>

      {/* Successor fund */}
      <div className="p-3 border rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <Label className="cursor-pointer font-medium">This is a successor fund</Label>
          <Switch checked={overview.isSuccessor || false} onCheckedChange={v => set("isSuccessor", v)} />
        </div>
        {overview.isSuccessor && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Previous fund name</Label>
              <Input className="h-8 text-sm" placeholder="e.g. Acme Fund I" value={overview.previousFundName || ""} onChange={e => set("previousFundName", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Previous fund size (EUR)</Label>
              <Input type="number" className="h-8 text-sm" value={overview.previousFundSize || ""} onChange={e => set("previousFundSize", Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Previous fund domicile</Label>
              <Input className="h-8 text-sm" placeholder="e.g. Cayman Islands" value={overview.previousFundDomicile || ""} onChange={e => set("previousFundDomicile", e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* ── ADVANCED OPTIONS ── */}
      <div className="border rounded-lg">
        <button
          type="button"
          className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium hover:text-foreground text-muted-foreground transition-colors"
          onClick={() => setShowAdvanced(v => !v)}
        >
          <span>Advanced options (structure, entities, terms)</span>
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAdvanced && (
          <div className="px-4 pb-4 border-t border-border/50 space-y-4 pt-4">
            {/* Core fund fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Regulatory regime</Label>
                <SmallSel value={e.fund?.regime} onChange={v => s("fund", "regime", v)} placeholder="Select" options={REG_REGIMES} />
              </div>
              <div className="space-y-1.5">
                <Label>Legal form</Label>
                <SmallSel value={e.fund?.legalForm} onChange={v => s("fund", "legalForm", v)} placeholder="Select" options={FUND_LEGAL_FORMS} />
              </div>
              <div className="space-y-1.5">
                <Label>Currency</Label>
                <SmallSel value={overview.fundCurrency} onChange={v => set("fundCurrency", v)} placeholder="Select" options={CURRENCIES} />
                {overview.fundCurrency === "Other" && (
                  <Input className="mt-1 h-8 text-xs" placeholder="Specify currency" value={overview.fundCurrencyOther || ""} onChange={e => set("fundCurrencyOther", e.target.value)} />
                )}
              </div>
              <div className="space-y-1.5">
                <Label>Management fee (%)</Label>
                <Input type="number" step="0.1" placeholder="e.g. 2" className="h-8 text-xs" value={overview.managementFee || ""} onChange={e => set("managementFee", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Fund term (years)</Label>
                <Input type="number" placeholder="e.g. 10" className="h-8 text-xs" value={overview.fundTerm || ""} onChange={e => set("fundTerm", e.target.value)} />
              </div>
              {isClosed && (
                <>
                  <div className="space-y-1.5">
                    <Label>Carried interest (%)</Label>
                    <Input type="number" step="0.1" placeholder="e.g. 20" className="h-8 text-xs" value={overview.carry || ""} onChange={e => set("carry", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Investment period (years)</Label>
                    <Input type="number" placeholder="e.g. 5" className="h-8 text-xs" value={overview.investmentPeriod || ""} onChange={e => set("investmentPeriod", e.target.value)} />
                  </div>
                </>
              )}
            </div>

            <p className="text-xs text-muted-foreground font-medium pt-2">Fund Vehicle Entity</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <Label className="text-xs text-muted-foreground">Entity name</Label>
                <Input className="h-8 text-xs" placeholder="e.g. Acme Capital Fund I SCSp" value={e.fund?.name || ""} onChange={ev => s("fund", "name", ev.target.value)} />
              </div>
              <div className="sm:col-span-2 flex items-center justify-between py-1">
                <Label className="text-xs text-muted-foreground">Umbrella / compartments?</Label>
                <Switch checked={e.fund?.umbrella || false} onCheckedChange={v => s("fund", "umbrella", v)} />
              </div>
              {e.fund?.umbrella && (
                <>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Number of sub-funds</Label>
                    <Input type="number" className="h-8 text-xs" value={e.fund?.subFundCount || ""} onChange={ev => s("fund", "subFundCount", ev.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Sub-fund names</Label>
                    <TagInput value={e.fund?.subFundNames || []} onChange={v => s("fund", "subFundNames", v)} placeholder="Type name and press Enter" />
                  </div>
                </>
              )}
            </div>

            {/* GP */}
            <EntitySection title="General Partner (GP)" enabled={e.gp?.enabled || false} onToggle={() => t("gp")}>
              <Row label="Entity name" span2><Input className="h-8 text-xs" placeholder="e.g. Acme Capital GP S.à r.l." value={e.gp?.name || ""} onChange={ev => s("gp", "name", ev.target.value)} /></Row>
              <Row label="Legal form"><SmallSel value={e.gp?.legalForm} onChange={v => s("gp", "legalForm", v)} placeholder="Select" options={GP_FORMS} /></Row>
              <Row label="GP commitment (EUR)"><Input type="number" className="h-8 text-xs" placeholder="Optional" value={e.gp?.commitment || ""} onChange={ev => s("gp", "commitment", ev.target.value)} /></Row>
              <ToggleRow label="GP already exists?" checked={e.gp?.exists || false} onChange={v => s("gp", "exists", v)} />
            </EntitySection>

            {/* ManCo */}
            <EntitySection title="Management Company (ManCo / AIFM)" enabled={e.manco?.enabled || false} onToggle={() => t("manco")}>
              <Row label="Type" span2><SmallSel value={e.manco?.type} onChange={v => s("manco", "type", v)} placeholder="Select" options={MANCO_TYPES} /></Row>
              {showMancoName && (
                <Row label={mancoType === "Client's own licensed ManCo" ? "ManCo / AIFM legal name" : "Third-party ManCo name"} span2>
                  <Input className="h-8 text-xs" placeholder={mancoType === "Client's own licensed ManCo" ? `e.g. ${overview.clientName || "Acme"} Management S.A.` : "Name of AIFM"} value={e.manco?.name || ""} onChange={ev => s("manco", "name", ev.target.value)} />
                </Row>
              )}
            </EntitySection>

            {/* Depositary */}
            <EntitySection title="Depositary Bank" enabled={e.depositary?.enabled || false} onToggle={() => t("depositary")}>
              <Row label="Institution name" span2><Input className="h-8 text-xs" placeholder="e.g. BNP Paribas Securities Services" value={e.depositary?.institutionName || ""} onChange={ev => s("depositary", "institutionName", ev.target.value)} /></Row>
              <Row label="Depositary type"><SmallSel value={e.depositary?.type} onChange={v => s("depositary", "type", v)} placeholder="Select" options={DEPOSITARY_TYPES} /></Row>
              <ToggleRow label="Already appointed?" checked={e.depositary?.appointed || false} onChange={v => s("depositary", "appointed", v)} />
              {e.depositary?.appointed && (
                <Row label="Contact name"><Input className="h-8 text-xs" placeholder="Contact name" value={e.depositary?.name || ""} onChange={ev => s("depositary", "name", ev.target.value)} /></Row>
              )}
            </EntitySection>

            {/* Additional service providers */}
            <div className="border rounded-lg">
              <button type="button" className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowServiceProviders(v => !v)}>
                <span>+ Add service providers (Advisor, Carry, SPV, Co-invest, Feeders)</span>
                {showServiceProviders ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showServiceProviders && (
                <div className="px-4 pb-4 space-y-3 border-t border-border/50">
                  <EntitySection title="Investment Advisor / Manager" enabled={e.advisor?.enabled || false} onToggle={() => t("advisor")}>
                    <Row label="Entity name" span2><Input className="h-8 text-xs" placeholder="e.g. Acme Asset Management Ltd" value={e.advisor?.name || ""} onChange={ev => s("advisor", "name", ev.target.value)} /></Row>
                    <Row label="Legal form"><SmallSel value={e.advisor?.legalForm} onChange={v => s("advisor", "legalForm", v)} placeholder="Select" options={["S.à r.l.", "S.A.", "LLP", "Ltd", "Other"]} /></Row>
                    <Row label="Jurisdiction"><SmallSel value={e.advisor?.jurisdiction} onChange={v => s("advisor", "jurisdiction", v)} placeholder="Select" options={ADVISOR_JURISDICTIONS} /></Row>
                    <Row label="Regulatory status"><SmallSel value={e.advisor?.regStatus} onChange={v => s("advisor", "regStatus", v)} placeholder="Select" options={ADVISOR_REG} /></Row>
                    <ToggleRow label="Already exists?" checked={e.advisor?.exists || false} onChange={v => s("advisor", "exists", v)} />
                  </EntitySection>
                  <EntitySection title="Carry / Incentive Vehicle" enabled={e.carry?.enabled || false} onToggle={() => t("carry")}>
                    <Row label="Entity name" span2><Input className="h-8 text-xs" placeholder="e.g. Acme Carry SCSp" value={e.carry?.name || ""} onChange={ev => s("carry", "name", ev.target.value)} /></Row>
                    <Row label="Legal form"><SmallSel value={e.carry?.legalForm} onChange={v => s("carry", "legalForm", v)} placeholder="Select" options={CARRY_FORMS} /></Row>
                    <Row label="Carry structure"><SmallSel value={e.carry?.structure} onChange={v => s("carry", "structure", v)} placeholder="Select" options={CARRY_STRUCTURES} /></Row>
                  </EntitySection>
                  <EntitySection title="Holding / SPV Vehicle(s)" enabled={e.spv?.enabled || false} onToggle={() => t("spv")}>
                    <Row label="Number of SPVs"><Input type="number" className="h-8 text-xs" value={e.spv?.count || ""} onChange={ev => s("spv", "count", ev.target.value)} /></Row>
                    <Row label="Purpose"><Input className="h-8 text-xs" placeholder="e.g. Asset holding, Blocker" value={e.spv?.purpose || ""} onChange={ev => s("spv", "purpose", ev.target.value)} /></Row>
                    <Row label="Jurisdictions" span2><TagInput value={e.spv?.jurisdictions || []} onChange={v => s("spv", "jurisdictions", v)} placeholder="e.g. Luxembourg, Netherlands" /></Row>
                  </EntitySection>
                  <EntitySection title="Co-investment Vehicle(s)" enabled={e.coinvest?.enabled || false} onToggle={() => t("coinvest")}>
                    <Row label="Number of vehicles"><Input type="number" className="h-8 text-xs" value={e.coinvest?.count || ""} onChange={ev => s("coinvest", "count", ev.target.value)} /></Row>
                    <Row label="Legal form"><SmallSel value={e.coinvest?.legalForm} onChange={v => s("coinvest", "legalForm", v)} placeholder="Select" options={COINVEST_FORMS} /></Row>
                  </EntitySection>
                  <EntitySection title="Feeder Fund(s)" enabled={e.feeder?.enabled || false} onToggle={() => t("feeder")}>
                    <Row label="Number of feeders"><Input type="number" className="h-8 text-xs" value={e.feeder?.count || ""} onChange={ev => s("feeder", "count", ev.target.value)} /></Row>
                    <Row label="Administered by us?"><SmallSel value={e.feeder?.adminBy} onChange={v => s("feeder", "adminBy", v)} placeholder="Select" options={FEEDER_ADMIN} /></Row>
                    <Row label="Feeder jurisdictions" span2><TagInput value={e.feeder?.jurisdictions || []} onChange={v => s("feeder", "jurisdictions", v)} placeholder="e.g. Spain, UK, Cayman" /></Row>
                  </EntitySection>
                </div>
              )}
            </div>

            {/* Advanced terms */}
            <p className="text-xs text-muted-foreground font-medium pt-2">Advanced Terms</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Hurdle rate (%)</Label>
                <Input type="number" step="0.1" placeholder="0 = no hurdle" className="h-8 text-xs" value={overview.hurdle || ""} onChange={e => set("hurdle", e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Waterfall structure</Label>
                <SmallSel value={overview.waterfall} onChange={v => set("waterfall", v)} placeholder="Select" options={["Fund-level (European)", "Deal-by-deal (American)", "Hybrid"]} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Catch-up</Label>
                <SmallSel value={overview.catchup} onChange={v => set("catchup", v)} placeholder="Select" options={["Full catch-up (100%)", "Partial catch-up", "No catch-up", "N/A"]} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Fee basis</Label>
                <SmallSel value={overview.managementFeeBasis} onChange={v => set("managementFeeBasis", v)} placeholder="Select" options={["Aggregate commitments", "Net invested capital", "NAV", "Deployed capital", "Other"]} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Capital calls per year</Label>
                <Input placeholder="e.g. 2-4" className="h-8 text-xs" value={overview.capitalCalls || ""} onChange={e => set("capitalCalls", e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Distributions per year</Label>
                <Input placeholder="e.g. 2-4" className="h-8 text-xs" value={overview.distributions || ""} onChange={e => set("distributions", e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Financial year end</Label>
                <SmallSel value={overview.yearEnd} onChange={v => set("yearEnd", v)} placeholder="Select" options={["31 December", "31 March", "30 June", "30 September", "Other"]} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Reporting frequency</Label>
                <SmallSel value={overview.reportingFrequency} onChange={v => set("reportingFrequency", v)} placeholder="Select" options={["Monthly", "Quarterly", "Semi-annually", "Annually"]} />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label className="text-sm">Allow extension?</Label>
              <Switch checked={overview.allowExtension || false} onCheckedChange={v => set("allowExtension", v)} />
            </div>
            {overview.allowExtension && (
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Extension period (years)</Label>
                <Input type="number" placeholder="e.g. 2" className="h-8 text-xs" value={overview.extensionPeriod || ""} onChange={e => set("extensionPeriod", e.target.value)} />
              </div>
            )}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label className="text-sm">GP clawback?</Label>
              <Switch checked={overview.gpClawback || false} onCheckedChange={v => set("gpClawback", v)} />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label className="text-sm">Key person provisions?</Label>
              <Switch checked={overview.keyPerson || false} onCheckedChange={v => set("keyPerson", v)} />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label className="text-sm">Additional share classes / currency hedging?</Label>
              <Switch checked={overview.shareclasses || false} onCheckedChange={v => set("shareclasses", v)} />
            </div>
            {overview.shareclasses && (
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Currencies / classes</Label>
                <TagInput value={overview.shareclassCurrencies || []} onChange={v => set("shareclassCurrencies", v)} placeholder="e.g. EUR, USD, GBP" />
              </div>
            )}
          </div>
        )}
      </div>

      <Button onClick={handleNext} className="w-full" disabled={!isValid}>
        Continue to Structure & Terms →
      </Button>
    </div>
  );
}