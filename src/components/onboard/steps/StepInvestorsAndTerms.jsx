import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const INVESTOR_TYPES = [
  "Institutional",
  "Pension Funds",
  "Sovereign Wealth Funds",
  "Family Offices",
  "HNWIs",
  "Fund of Funds",
  "Corporates",
  "DFIs",
  "Retail (UCITS / ELTIF)",
  "Government / Public Sector",
];

export default function StepInvestorsAndTerms({ data, onChange, onNext, onBack }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const toggleType = (t) => {
    const types = data.investorTypes || [];
    set("investorTypes", types.includes(t) ? types.filter(x => x !== t) : [...types, t]);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Expected investors</Label>
          <Input
            placeholder="e.g. 20-35 or 50+"
            value={data.investorCount || ""}
            onChange={e => set("investorCount", e.target.value)}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Minimum commitment</Label>
          <Input type="number" placeholder="e.g. 10000000" value={data.minCommitment || ""} onChange={e => set("minCommitment", Number(e.target.value))} />
        </div>
        <div className="space-y-1.5">
          <Label>Target at first close</Label>
          <Input type="number" placeholder="Optional" value={data.firstCloseCount || ""} onChange={e => set("firstCloseCount", Number(e.target.value))} />
        </div>
        <div className="space-y-1.5">
          <Label>Target at final close</Label>
          <Input type="number" placeholder="Optional" value={data.finalCloseCount || ""} onChange={e => set("finalCloseCount", Number(e.target.value))} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Investor types</Label>
        <div className="flex flex-wrap gap-2">
          {INVESTOR_TYPES.map(t => {
            const selected = (data.investorTypes || []).includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleType(t)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                  selected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <Label className="cursor-pointer">US investors?</Label>
          <Switch checked={data.usInvestors || false} onCheckedChange={v => set("usInvestors", v)} />
        </div>
        {data.usInvestors && (
          <div className="flex gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            US investor presence requires additional FATCA compliance, Regulation S/D considerations, possible Form PF reporting, and potential ERISA analysis if pension capital is involved.
          </div>
        )}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <Label className="cursor-pointer">UK investors?</Label>
          <Switch checked={data.ukInvestors || false} onCheckedChange={v => set("ukInvestors", v)} />
        </div>
        {data.ukInvestors && (
          <div className="flex gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            Post-Brexit, UK investors may require an FCA-recognised scheme or national private placement regime (NPPR) notification.
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">← Back</Button>
        <Button onClick={() => onNext(data)} className="flex-1">Continue to Services & Review →</Button>
      </div>
    </div>
  );
}