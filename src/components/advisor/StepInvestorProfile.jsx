import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

const INVESTOR_TYPES = [
  { key: "institutional", label: "Institutional investors", hint: "Pension funds, insurance, sovereign wealth" },
  { key: "well_informed", label: "Well-informed investors", hint: "€125k min + written confirmation (SIF standard)" },
  { key: "hnwi", label: "High-net-worth individuals (HNWI)", hint: "Typically >€1M investable" },
  { key: "family_office", label: "Family offices", hint: "Single or multi-family" },
  { key: "retail", label: "Retail investors", hint: "General public, no minimum qualification" },
  { key: "swf", label: "Sovereign wealth funds", hint: "State-owned" },
];

export default function StepInvestorProfile({ answers, updateAnswers }) {
  const toggle = (key) => {
    const current = answers.investorTypes || [];
    if (current.includes(key)) {
      updateAnswers("investorTypes", current.filter((c) => c !== key));
    } else {
      updateAnswers("investorTypes", [...current, key]);
    }
  };

  const hasRetail = answers.investorTypes?.includes("retail");
  const onlyFamilyOffice = answers.investorTypes?.length === 1 && answers.investorTypes.includes("family_office");

  return (
    <div className="space-y-4">
      {hasRetail && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2 text-sm text-red-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>Only UCITS or Part II UCI are viable for retail investors. AIF structures eliminated.</p>
        </div>
      )}

      {onlyFamilyOffice && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 text-sm text-blue-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>Single family office + fund under &#8364;100M? Unregulated SCSp/SCS may be optimal (no AIFM requirement).</p>
        </div>
      )}

      <div className="space-y-3">
        {INVESTOR_TYPES.map((it) => (
          <div key={it.key} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50">
            <Checkbox
              id={it.key}
              checked={answers.investorTypes?.includes(it.key) || false}
              onCheckedChange={() => toggle(it.key)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor={it.key} className="font-medium text-sm cursor-pointer">
                {it.label}
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">{it.hint}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}