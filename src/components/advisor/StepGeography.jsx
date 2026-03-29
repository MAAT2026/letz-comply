import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const GEOGRAPHIES = [
  { key: "lux", label: "Luxembourg only" },
  { key: "eu", label: "European Union" },
  { key: "global_dm", label: "Global (developed markets)" },
  { key: "global_em", label: "Global (including emerging markets)" },
  { key: "specific", label: "Specific countries / regions", hasInput: true },
];

export default function StepGeography({ answers, updateAnswers }) {
  return (
    <div className="space-y-4">
      <RadioGroup value={answers.geography} onValueChange={(val) => updateAnswers("geography", val)}>
        {GEOGRAPHIES.map((geo) => (
          <div key={geo.key}>
            <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
              <RadioGroupItem value={geo.key} id={geo.key} />
              <Label htmlFor={geo.key} className="font-medium text-sm cursor-pointer">
                {geo.label}
              </Label>
            </div>
            {geo.hasInput && answers.geography === geo.key && (
              <div className="ml-8 mt-2 mb-3">
                <Input
                  placeholder="e.g. Germany, France, Switzerland"
                  value={answers.geographySpecific || ""}
                  onChange={(e) => updateAnswers("geographySpecific", e.target.value)}
                  className="text-sm h-8"
                />
              </div>
            )}
          </div>
        ))}
      </RadioGroup>

      {answers.geography && answers.geography !== "lux" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800 mt-4">
          Distribution outside the EU? AIFMD passport has third-country marketing limitations.
        </div>
      )}
    </div>
  );
}