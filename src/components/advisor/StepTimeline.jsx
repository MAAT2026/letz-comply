import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

const TIMELINES = [
  { key: "urgent", label: "ASAP (< 2 months)", hint: "RAIF, unregulated SCSp (no CSSF approval)" },
  { key: "standard", label: "2–4 months", hint: "RAIF (2-4 weeks), SIF/SICAR (3-4 months)" },
  { key: "comfortable", label: "4–6 months", hint: "All structures including UCITS (4-6 months)" },
  { key: "flexible", label: "6–12 months", hint: "All structures, time for bespoke structuring" },
  { key: "planning", label: "No rush / planning phase", hint: "All structures" },
];

export default function StepTimeline({ answers, updateAnswers }) {
  const isUrgent = answers.timeline === "urgent";

  return (
    <div className="space-y-4">
      {isUrgent && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-sm text-amber-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>CSSF-regulated structures (UCITS, SIF, SICAR) require 3-6 months approval. RAIF or unregulated SCSp recommended.</p>
        </div>
      )}

      <RadioGroup value={answers.timeline} onValueChange={(val) => updateAnswers("timeline", val)}>
        {TIMELINES.map((tl) => (
          <div key={tl.key} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50">
            <RadioGroupItem value={tl.key} id={tl.key} className="mt-1" />
            <div className="flex-1">
              <Label htmlFor={tl.key} className="font-medium text-sm cursor-pointer">
                {tl.label}
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">{tl.hint}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}