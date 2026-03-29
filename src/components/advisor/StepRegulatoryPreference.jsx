import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const REGIMES = [
  { key: "ucits", label: "UCITS", hint: "Retail-friendly, highly regulated, EU passport" },
  { key: "raif", label: "RAIF", hint: "AIF without direct CSSF approval, fast launch" },
  { key: "sif", label: "SIF", hint: "CSSF-regulated, well-informed investors" },
  { key: "sicar", label: "SICAR", hint: "Risk capital / PE/VC focus, CSSF-regulated" },
  { key: "part_ii", label: "Part II UCI", hint: "Flexible, can target retail, CSSF-regulated" },
  { key: "unreg_lp", label: "Unregulated SCSp/SCS", hint: "No product regulation, fastest to launch" },
  { key: "none", label: "No preference / Recommend for me", hint: "We'll suggest the best fit" },
];

export default function StepRegulatoryPreference({ answers, updateAnswers }) {
  const toggle = (key) => {
    const current = answers.regulatoryPreference || [];
    if (current.includes(key)) {
      updateAnswers("regulatoryPreference", current.filter((c) => c !== key));
    } else {
      if (key === "none") {
        updateAnswers("regulatoryPreference", []);
      } else {
        // If user selects a specific regime, remove "no preference"
        const filtered = current.filter((c) => c !== "none");
        updateAnswers("regulatoryPreference", [...filtered, key]);
      }
    }
  };

  return (
    <div className="space-y-3">
      {REGIMES.map((reg) => (
        <div key={reg.key} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50">
          <Checkbox
            id={reg.key}
            checked={
              reg.key === "none"
                ? answers.regulatoryPreference?.length === 0
                : answers.regulatoryPreference?.includes(reg.key) || false
            }
            onCheckedChange={() => toggle(reg.key)}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor={reg.key} className="font-medium text-sm cursor-pointer">
              {reg.label}
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">{reg.hint}</p>
          </div>
        </div>
      ))}
    </div>
  );
}