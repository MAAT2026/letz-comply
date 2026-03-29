import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import TagInput from "@/components/onboard/TagInput";
import StructureDiagram from "@/components/onboard/StructureDiagram";

function EntitySection({ title, enabled, onToggle, defaultOn, children }) {
  return (
    <div className={cn("border rounded-lg transition-all", enabled ? "border-primary/30 bg-primary/5" : "border-border bg-card")}>
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
    <div className={cn("space-y-1", span2 && "sm:col-span-2")}>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Sel({ value, onChange, placeholder, options }) {
  return (
    <Select value={value || ""} onValueChange={onChange}>
      <SelectTrigger className="h-8 text-xs"><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>{options.map(o => <SelectItem key={o} value={o} className="text-xs">{o}</SelectItem>)}</SelectContent>
    </Select>
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

const FUND_LEGAL_FORMS = ["SCSp", "SCA", "SICAV-SIF", "SICAV-RAIF", "SICAV-UCITS", "FCP", "S.A.", "S.à r.l.", "SCS", "Other"];
const REG_REGIMES = ["Full AIFM (AuM >€100m)", "Sub-threshold AIFM (AuM <€100m)", "UCITS", "Registered AIF", "Unregulated", "Other"];
const GP_FORMS = ["S.à r.l.", "S.A.", "SCA", "SCSp", "Other"];
const ADVISOR_JURISDICTIONS = ["Luxembourg", "UK", "Other EU", "Non-EU"];
const ADVISOR_REG = ["Regulated", "Unregulated / Exempt", "Pending authorisation"];
const CARRY_FORMS = ["S.à r.l.", "SCSp", "S.A.", "Other"];
const CARRY_STRUCTURES = ["Fund-level waterfall (European)", "Deal-by-deal (American)", "Hybrid", "N/A"];
const MANCO_TYPES = ["Client's own licensed ManCo", "Third-party AIFM (our platform)", "Third-party AIFM (other)", "No ManCo / Self-managed"];
const DEPOSITARY_TYPES = ["Full depositary", "Depositary-lite", "Custodian only", "Not required"];
const COINVEST_FORMS = ["SCSp", "S.à r.l.", "Other"];
const FEEDER_ADMIN = ["Yes — we administer", "No — third party", "TBD"];

function setE(data, onChange, entity, field, value) {
  onChange({ ...data, [entity]: { ...(data[entity] || {}), [field]: value } });
}
function toggle(data, onChange, entity) {
  onChange({ ...data, [entity]: { ...(data[entity] || {}), enabled: !(data[entity]?.enabled) } });
}

export default function StepStructure({ data, onChange, onNext, onBack, overview }) {
  const e = data || {};
  const s = (entity, field, value) => setE(e, onChange, entity, field, value);
  const t = (entity) => toggle(e, onChange, entity);
  const [showServiceProviders, setShowServiceProviders] = useState(false);

  useEffect(() => {
    if (!e.fund?.enabled) onChange({ ...e, fund: { ...(e.fund || {}), enabled: true } });
  }, []);

  const mancoType = e.manco?.type;
  const showMancoName = mancoType && mancoType !== "No ManCo / Self-managed";

  return (
    <div className="space-y-3 max-w-2xl">

        {/* Fund Vehicle — always on */}
        <EntitySection title="Fund Vehicle" enabled={true} onToggle={() => {}} defaultOn>
          <Row label="Entity name" span2>
            <Input className="h-8 text-xs" placeholder="e.g. Acme Capital Fund I SCSp" value={e.fund?.name || ""} onChange={ev => s("fund","name",ev.target.value)} />
          </Row>
          <Row label="Legal form">
            <Sel value={e.fund?.legalForm} onChange={v => s("fund","legalForm",v)} placeholder="Select" options={FUND_LEGAL_FORMS} />
          </Row>
          <Row label="Regulatory regime">
             <Sel value={e.fund?.regime} onChange={v => s("fund","regime",v)} placeholder="Select" options={REG_REGIMES} />
           </Row>
           <ToggleRow label="Umbrella / compartments?" checked={e.fund?.umbrella || false} onChange={v => s("fund","umbrella",v)} />
          {e.fund?.umbrella && (
            <>
              <Row label="Number of sub-funds">
                <Input type="number" className="h-8 text-xs" value={e.fund?.subFundCount || ""} onChange={ev => s("fund","subFundCount",ev.target.value)} />
              </Row>
              <Row label="Sub-fund names">
                <TagInput value={e.fund?.subFundNames || []} onChange={v => s("fund","subFundNames",v)} placeholder="Type name and press Enter" />
              </Row>
            </>
          )}
        </EntitySection>

        {/* GP */}
        <EntitySection title="General Partner (GP)" enabled={e.gp?.enabled || false} onToggle={() => t("gp")}>
          <Row label="Entity name" span2>
            <Input className="h-8 text-xs" placeholder="e.g. Acme Capital GP S.à r.l." value={e.gp?.name || ""} onChange={ev => s("gp","name",ev.target.value)} />
          </Row>
          <Row label="Legal form">
            <Sel value={e.gp?.legalForm} onChange={v => s("gp","legalForm",v)} placeholder="Select" options={GP_FORMS} />
          </Row>
          <Row label="GP commitment (EUR)">
            <Input type="number" className="h-8 text-xs" placeholder="Optional" value={e.gp?.commitment || ""} onChange={ev => s("gp","commitment",ev.target.value)} />
          </Row>
          <ToggleRow label="GP already exists?" checked={e.gp?.exists || false} onChange={v => s("gp","exists",v)} />
        </EntitySection>

        {/* ManCo / AIFM */}
        <EntitySection title="Management Company (ManCo / AIFM)" enabled={e.manco?.enabled || false} onToggle={() => t("manco")}>
          <Row label="Type" span2>
            <Sel value={e.manco?.type} onChange={v => s("manco","type",v)} placeholder="Select" options={MANCO_TYPES} />
          </Row>
          {showMancoName && (
            <Row label={mancoType === "Client's own licensed ManCo" ? "ManCo / AIFM legal name" : "Third-party ManCo name"} span2>
              <Input className="h-8 text-xs"
                placeholder={mancoType === "Client's own licensed ManCo" ? (overview?.clientName ? `${overview.clientName} Management S.A.` : "e.g. Acme Management S.A.") : "Name of AIFM"}
                value={e.manco?.name || ""}
                onChange={ev => s("manco","name",ev.target.value)}
              />
            </Row>
          )}
        </EntitySection>

        {/* Depositary */}
        <EntitySection title="Depositary Bank" enabled={e.depositary?.enabled || false} onToggle={() => t("depositary")}>
          <Row label="Institution name" span2>
            <Input className="h-8 text-xs" placeholder="e.g. BNP Paribas Securities Services" value={e.depositary?.institutionName || ""} onChange={ev => s("depositary","institutionName",ev.target.value)} />
          </Row>
          <Row label="Depositary type">
            <Sel value={e.depositary?.type} onChange={v => s("depositary","type",v)} placeholder="Select" options={DEPOSITARY_TYPES} />
          </Row>
          <ToggleRow label="Already appointed?" checked={e.depositary?.appointed || false} onChange={v => s("depositary","appointed",v)} />
          {e.depositary?.appointed && (
            <Row label="Contact / reference name">
              <Input className="h-8 text-xs" placeholder="Contact name" value={e.depositary?.name || ""} onChange={ev => s("depositary","name",ev.target.value)} />
            </Row>
          )}
        </EntitySection>

        {/* Collapsible service providers */}
        <div className="border rounded-lg">
          <button
            type="button"
            className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowServiceProviders(v => !v)}
          >
            <span>+ Add service providers (Investment Advisor, Carry, SPV, Co-invest, Feeders)</span>
            {showServiceProviders ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showServiceProviders && (
            <div className="px-4 pb-4 space-y-3 border-t border-border/50">

              {/* Investment Advisor */}
              <EntitySection title="Investment Advisor / Manager" enabled={e.advisor?.enabled || false} onToggle={() => t("advisor")}>
                <Row label="Entity name" span2>
                  <Input className="h-8 text-xs" placeholder="e.g. Acme Asset Management Ltd" value={e.advisor?.name || ""} onChange={ev => s("advisor","name",ev.target.value)} />
                </Row>
                <Row label="Legal form">
                  <Sel value={e.advisor?.legalForm} onChange={v => s("advisor","legalForm",v)} placeholder="Select" options={["S.à r.l.","S.A.","LLP","Ltd","Other"]} />
                </Row>
                <Row label="Jurisdiction">
                  <Sel value={e.advisor?.jurisdiction} onChange={v => s("advisor","jurisdiction",v)} placeholder="Select" options={ADVISOR_JURISDICTIONS} />
                </Row>
                <Row label="Regulatory status">
                  <Sel value={e.advisor?.regStatus} onChange={v => s("advisor","regStatus",v)} placeholder="Select" options={ADVISOR_REG} />
                </Row>
                <ToggleRow label="Already exists?" checked={e.advisor?.exists || false} onChange={v => s("advisor","exists",v)} />
              </EntitySection>

              {/* Carry */}
              <EntitySection title="Carry / Incentive Vehicle" enabled={e.carry?.enabled || false} onToggle={() => t("carry")}>
                <Row label="Entity name" span2>
                  <Input className="h-8 text-xs" placeholder="e.g. Acme Carry SCSp" value={e.carry?.name || ""} onChange={ev => s("carry","name",ev.target.value)} />
                </Row>
                <Row label="Legal form">
                  <Sel value={e.carry?.legalForm} onChange={v => s("carry","legalForm",v)} placeholder="Select" options={CARRY_FORMS} />
                </Row>
                <Row label="Carry structure">
                  <Sel value={e.carry?.structure} onChange={v => s("carry","structure",v)} placeholder="Select" options={CARRY_STRUCTURES} />
                </Row>
              </EntitySection>

              {/* SPVs */}
              <EntitySection title="Holding / SPV Vehicle(s)" enabled={e.spv?.enabled || false} onToggle={() => t("spv")}>
                <Row label="Number of SPVs">
                  <Input type="number" className="h-8 text-xs" value={e.spv?.count || ""} onChange={ev => s("spv","count",ev.target.value)} />
                </Row>
                <Row label="Purpose">
                  <Input className="h-8 text-xs" placeholder="e.g. Asset holding, Blocker" value={e.spv?.purpose || ""} onChange={ev => s("spv","purpose",ev.target.value)} />
                </Row>
                <Row label="Jurisdictions" span2>
                  <TagInput value={e.spv?.jurisdictions || []} onChange={v => s("spv","jurisdictions",v)} placeholder="e.g. Luxembourg, Netherlands" />
                </Row>
              </EntitySection>

              {/* Co-invest */}
              <EntitySection title="Co-investment Vehicle(s)" enabled={e.coinvest?.enabled || false} onToggle={() => t("coinvest")}>
                <Row label="Number of vehicles">
                  <Input type="number" className="h-8 text-xs" value={e.coinvest?.count || ""} onChange={ev => s("coinvest","count",ev.target.value)} />
                </Row>
                <Row label="Legal form">
                  <Sel value={e.coinvest?.legalForm} onChange={v => s("coinvest","legalForm",v)} placeholder="Select" options={COINVEST_FORMS} />
                </Row>
              </EntitySection>

              {/* Feeders */}
              <EntitySection title="Feeder Fund(s)" enabled={e.feeder?.enabled || false} onToggle={() => t("feeder")}>
                <Row label="Number of feeders">
                  <Input type="number" className="h-8 text-xs" value={e.feeder?.count || ""} onChange={ev => s("feeder","count",ev.target.value)} />
                </Row>
                <Row label="Administered by us?">
                  <Sel value={e.feeder?.adminBy} onChange={v => s("feeder","adminBy",v)} placeholder="Select" options={FEEDER_ADMIN} />
                </Row>
                <Row label="Feeder jurisdictions" span2>
                  <TagInput value={e.feeder?.jurisdictions || []} onChange={v => s("feeder","jurisdictions",v)} placeholder="e.g. Spain, UK, Cayman" />
                </Row>
              </EntitySection>

            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onBack} className="flex-1">← Back</Button>
          <Button onClick={() => onNext(e)} className="flex-1">Continue to Investors →</Button>
        </div>
    </div>
  );
}