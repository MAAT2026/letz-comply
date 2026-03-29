import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { JOB_TITLES } from "@/lib/regData";

const FUND_TYPES = [
  "Closed-ended (PE/VC/RE/Infra/Debt)",
  "Open-ended (UCITS/AIF)",
  "Semi-open-ended",
  "Single asset / SPV",
  "Fund of Funds",
  "Other",
];

export default function StepClientOverview({ data, onChange, onNext }) {
  const isSuccessor = data.isSuccessor || false;
  const set = (key, val) => onChange({ ...data, [key]: val });

  const handleNext = () => {
    const jobTitleValid = data.jobTitle && (data.jobTitle !== "Other" || data.jobTitleOther);
    if (!data.clientName || !data.fundName || !data.fundType || !jobTitleValid) return;
    const finalData = {
      ...data,
      jobTitle: data.jobTitle === "Other" ? data.jobTitleOther : data.jobTitle,
    };
    onNext(finalData);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Client name *</Label>
          <Input placeholder="e.g. Acme Capital" value={data.clientName || ""} onChange={e => set("clientName", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Fund name *</Label>
          <Input placeholder="e.g. Acme Capital Fund II" value={data.fundName || ""} onChange={e => set("fundName", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Fund type *</Label>
          <Select value={data.fundType || ""} onValueChange={v => set("fundType", v)}>
            <SelectTrigger><SelectValue placeholder="Select fund type" /></SelectTrigger>
            <SelectContent>{FUND_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>First close date</Label>
          <Input type="date" value={data.targetCloseDate || ""} onChange={e => set("targetCloseDate", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Target size</Label>
          <Input type="number" placeholder="e.g. 250000000" value={data.targetFundSize || ""} onChange={e => set("targetFundSize", Number(e.target.value))} />
        </div>
        <div className="space-y-1.5">
          <Label>Geographic focus</Label>
          <Input placeholder="Describe the fund's investment geography (e.g. Pan-European, Global, DACH)" value={data.geographicFocus || ""} onChange={e => set("geographicFocus", e.target.value)} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Target investments</Label>
          <Input placeholder="e.g. 10-12 or 20+ or Single asset" value={data.targetInvestments || ""} onChange={e => set("targetInvestments", e.target.value)} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Investment focus / strategy</Label>
        <Textarea placeholder="Describe the fund's investment strategy, sector focus, etc." value={data.investmentStrategy || ""} onChange={e => set("investmentStrategy", e.target.value)} rows={3} />
      </div>

      <div className="space-y-1.5">
        <Label>Your job title *</Label>
        <Select value={data.jobTitle === "Other" ? "Other" : data.jobTitle || ""} onValueChange={v => set("jobTitle", v)}>
          <SelectTrigger><SelectValue placeholder="Select your job title" /></SelectTrigger>
          <SelectContent>
            {JOB_TITLES.map(title => (
              <SelectItem key={title} value={title}>{title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {data.jobTitle === "Other" && (
          <Input 
            placeholder="Please specify your job title" 
            value={data.jobTitleOther || ""} 
            onChange={e => set("jobTitleOther", e.target.value)} 
            className="mt-2"
          />
        )}
      </div>

      {/* Successor fund toggle */}
      <div className="p-3 border rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <Label className="cursor-pointer font-medium">This is a successor fund</Label>
          <Switch checked={isSuccessor} onCheckedChange={v => set("isSuccessor", v)} />
        </div>
        {isSuccessor && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Previous fund name</Label>
              <Input className="h-8 text-sm" placeholder="e.g. Acme Fund I" value={data.previousFundName || ""} onChange={e => set("previousFundName", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Previous fund size (EUR)</Label>
              <Input type="number" className="h-8 text-sm" placeholder="e.g. 143000000" value={data.previousFundSize || ""} onChange={e => set("previousFundSize", Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Previous fund domicile</Label>
              <Input className="h-8 text-sm" placeholder="e.g. Cayman Islands" value={data.previousFundDomicile || ""} onChange={e => set("previousFundDomicile", e.target.value)} />
            </div>
          </div>
        )}
      </div>

      <Button onClick={handleNext} className="w-full" disabled={!data.clientName || !data.fundName || !data.fundType || !data.jobTitle || (data.jobTitle === "Other" && !data.jobTitleOther)}>
        Continue to Structure →
      </Button>
    </div>
  );
}