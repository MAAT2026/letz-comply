import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const FUND_SIZES = [
  { key: "sub_100m", label: "< €100M", hint: "Sub-threshold AIFM possible; SCSp without AIFM" },
  { key: "mid", label: "€100M–€500M", hint: "Full AIFM required for AIF; economies of scale emerge" },
  { key: "large", label: "€500M–€2B", hint: "Umbrella structures with sub-funds become efficient" },
  { key: "mega", label: "> €2B", hint: "Institutional platform; consider multiple vehicles" },
];

export default function StepFundSize({ answers, updateAnswers }) {
  return (
    <div className="space-y-4">
      <RadioGroup value={answers.fundSize} onValueChange={(val) => updateAnswers("fundSize", val)}>
        {FUND_SIZES.map((size) => (
          <div key={size.key} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50">
            <RadioGroupItem value={size.key} id={size.key} className="mt-1" />
            <div className="flex-1">
              <Label htmlFor={size.key} className="font-medium text-sm cursor-pointer">
                {size.label}
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">{size.hint}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}