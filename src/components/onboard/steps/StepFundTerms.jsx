import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TagInput from "@/components/onboard/TagInput";

const CURRENCIES = ["EUR", "USD", "GBP", "CHF", "Other"];

function Row({ label, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}

function Sel({ value, onChange, placeholder, options }) {
  return (
    <Select value={value || ""} onValueChange={onChange}>
      <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>{options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
    </Select>
  );
}

export default function StepFundTerms({ data, onChange, onNext, onBack, fundType }) {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const isClosed = fundType?.includes("Closed") || fundType?.includes("Semi");
  const isOpen = fundType?.includes("Open") || fundType?.includes("Semi");

  return (
    <div className="space-y-6">
      {/* General Terms */}
      <div>
        <h3 className="font-semibold text-sm text-foreground mb-3 pb-1 border-b">General Terms</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Row label="Currency">
            <Sel value={data.fundCurrency} onChange={v => set("fundCurrency", v)} placeholder="Select currency" options={CURRENCIES} />
            {data.fundCurrency === "Other" && (
              <Input className="mt-1" placeholder="Specify currency" value={data.fundCurrencyOther || ""} onChange={e => set("fundCurrencyOther", e.target.value)} />
            )}
          </Row>
          <Row label="Reporting frequency">
            <Sel value={data.reportingFrequency} onChange={v => set("reportingFrequency",v)} placeholder="Select" options={["Monthly","Quarterly","Semi-annually","Annually"]} />
          </Row>
          <Row label="Financial year end">
            <Sel value={data.yearEnd} onChange={v => set("yearEnd",v)} placeholder="Select" options={["31 December","31 March","30 June","30 September","Other"]} />
          </Row>

          {/* Fees: 2-column groups */}
          <Row label="Management fee (%)">
            <Input type="number" step="0.1" placeholder="e.g. 2" value={data.managementFee || ""} onChange={e => set("managementFee", e.target.value)} />
          </Row>
          <Row label="Fee basis">
            <Sel value={data.managementFeeBasis} onChange={v => set("managementFeeBasis",v)} placeholder="Select" options={["Aggregate commitments","Net invested capital","NAV","Deployed capital","Other"]} />
          </Row>
        </div>

        <div className="flex items-center justify-between mt-3 p-3 border rounded-lg">
          <Label>Additional share classes / currency hedging?</Label>
          <Switch checked={data.shareclasses || false} onCheckedChange={v => set("shareclasses",v)} />
        </div>
        {data.shareclasses && (
          <div className="mt-2">
            <Row label="Currencies / classes">
              <TagInput value={data.shareclassCurrencies || []} onChange={v => set("shareclassCurrencies",v)} placeholder="e.g. EUR, USD, GBP" />
            </Row>
          </div>
        )}
      </div>

      {/* Closed-ended */}
      {isClosed && (
        <div>
          <h3 className="font-semibold text-sm text-foreground mb-3 pb-1 border-b">Closed-ended Terms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Row label="Carried interest (%)">
              <Input type="number" step="0.1" placeholder="e.g. 20" value={data.carry || ""} onChange={e => set("carry", e.target.value)} />
            </Row>
            <Row label="Hurdle rate (%)">
              <Input type="number" step="0.1" placeholder="0 = no hurdle" value={data.hurdle || ""} onChange={e => set("hurdle", e.target.value)} />
            </Row>
            <Row label="Waterfall structure">
              <Sel value={data.waterfall} onChange={v => set("waterfall",v)} placeholder="Select" options={["Fund-level (European)","Deal-by-deal (American)","Hybrid"]} />
            </Row>
            <Row label="Catch-up">
              <Sel value={data.catchup} onChange={v => set("catchup",v)} placeholder="Select" options={["Full catch-up (100%)","Partial catch-up","No catch-up","N/A"]} />
            </Row>
            <Row label="Fund term (years)">
              <Input type="number" placeholder="e.g. 10" value={data.fundTerm || ""} onChange={e => set("fundTerm", e.target.value)} />
            </Row>
            <Row label="Investment period (years)">
              <Input type="number" placeholder="e.g. 5" value={data.investmentPeriod || ""} onChange={e => set("investmentPeriod", e.target.value)} />
            </Row>
            <Row label="Capital calls per year">
              <Input placeholder="e.g. 2-4" value={data.capitalCalls || ""} onChange={e => set("capitalCalls", e.target.value)} />
            </Row>
            <Row label="Distributions per year">
              <Input placeholder="e.g. 2-4" value={data.distributions || ""} onChange={e => set("distributions", e.target.value)} />
            </Row>
          </div>

          {/* Extension toggle */}
          <div className="mt-3 p-3 border rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <Label>Allow extension?</Label>
              <Switch checked={data.allowExtension || false} onCheckedChange={v => set("allowExtension",v)} />
            </div>
            {data.allowExtension && (
              <div className="pt-1">
                <Row label="Extension period (years)">
                  <Input type="number" placeholder="e.g. 2" value={data.extensionPeriod || ""} onChange={e => set("extensionPeriod", e.target.value)} />
                </Row>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-2 p-3 border rounded-lg">
            <Label>GP clawback?</Label>
            <Switch checked={data.gpClawback || false} onCheckedChange={v => set("gpClawback",v)} />
          </div>
          <div className="flex items-center justify-between mt-2 p-3 border rounded-lg">
            <Label>Key person provisions?</Label>
            <Switch checked={data.keyPerson || false} onCheckedChange={v => set("keyPerson",v)} />
          </div>
        </div>
      )}

      {/* Open-ended */}
      {isOpen && (
        <div>
          <h3 className="font-semibold text-sm text-foreground mb-3 pb-1 border-b">Open-ended Terms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Row label="NAV frequency">
              <Sel value={data.navFrequency} onChange={v => set("navFrequency",v)} placeholder="Select" options={["Daily","Weekly","Bi-monthly","Monthly","Quarterly"]} />
            </Row>
            <Row label="Subscription frequency">
              <Sel value={data.subscriptionFrequency} onChange={v => set("subscriptionFrequency",v)} placeholder="Select" options={["Daily","Weekly","Monthly","Quarterly"]} />
            </Row>
            <Row label="Redemption frequency">
              <Sel value={data.redemptionFrequency} onChange={v => set("redemptionFrequency",v)} placeholder="Select" options={["Daily","Weekly","Monthly","Quarterly"]} />
            </Row>
            <Row label="Redemption notice">
              <Input placeholder="e.g. 30 calendar days" value={data.redemptionNotice || ""} onChange={e => set("redemptionNotice", e.target.value)} />
            </Row>
            <Row label="Lock-up period">
              <Input placeholder="e.g. 12 months or None" value={data.lockup || ""} onChange={e => set("lockup", e.target.value)} />
            </Row>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {[["swingPricing","Swing pricing?"],["antiDilution","Anti-dilution levy?"],["redemptionGates","Redemption gates?"]].map(([k,l]) => (
              <div key={k} className="flex items-center justify-between p-3 border rounded-lg">
                <Label className="text-sm">{l}</Label>
                <Switch checked={data[k] || false} onCheckedChange={v => set(k,v)} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">← Back</Button>
        <Button onClick={() => onNext(data)} className="flex-1">Continue to Services →</Button>
      </div>
    </div>
  );
}