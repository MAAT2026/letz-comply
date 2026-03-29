import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const LEGAL_FORMS = [
  { key: "sicav", label: "SICAV", hint: "Variable capital, most common for open-ended" },
  { key: "sicaf", label: "SICAF", hint: "Fixed capital, closed-ended" },
  { key: "scsp", label: "SCSp", hint: "No legal personality, tax transparent, PE/VC standard" },
  { key: "scs", label: "SCS", hint: "Legal personality, tax transparent" },
  { key: "sa", label: "SA", hint: "Public Limited Company" },
  { key: "sarl", label: "SàRL", hint: "Private Limited Company, smaller structures" },
  { key: "fcp", label: "FCP", hint: "Common Fund / Contractual, no legal personality" },
  { key: "none", label: "No preference / Recommend for me", hint: "We'll suggest the best fit" },
];

export default function StepLegalForm({ answers, updateAnswers }) {
  const toggle = (key) => {
    const current = answers.legalFormPreference || [];
    if (current.includes(key)) {
      updateAnswers("legalFormPreference", current.filter((c) => c !== key));
    } else {
      if (key === "none") {
        updateAnswers("legalFormPreference", []);
      } else {
        const filtered = current.filter((c) => c !== "none");
        updateAnswers("legalFormPreference", [...filtered, key]);
      }
    }
  };

  return (
    <div className="space-y-3">
      {LEGAL_FORMS.map((form) => (
        <div key={form.key} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50">
          <Checkbox
            id={form.key}
            checked={
              form.key === "none"
                ? answers.legalFormPreference?.length === 0
                : answers.legalFormPreference?.includes(form.key) || false
            }
            onCheckedChange={() => toggle(form.key)}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor={form.key} className="font-medium text-sm cursor-pointer">
              {form.label}
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">{form.hint}</p>
          </div>
        </div>
      ))}
    </div>
  );
}