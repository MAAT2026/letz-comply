import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const FUND_LIVES = [
  { key: "open_ended", label: "Open-ended", hint: "Perpetual, regular subscriptions/redemptions" },
  { key: "closed_ended", label: "Closed-ended", hint: "Fixed term, typically 7-12 years with extensions" },
  { key: "semi_open", label: "Semi-open", hint: "Limited liquidity windows" },
];

const LISTINGS = [
  { key: "none", label: "Not listed" },
  { key: "luxse", label: "Luxembourg Stock Exchange (LuxSE)" },
  { key: "other", label: "Other exchange" },
];

const DISTRIBUTION_GEOS = [
  { key: "lux", label: "Luxembourg only" },
  { key: "eu", label: "EU-wide (passport)" },
  { key: "global", label: "Global (including non-EU)" },
  { key: "specific", label: "Specific countries", hasInput: true },
];

export default function StepDistribution({ answers, updateAnswers }) {
  return (
    <div className="space-y-6">
      {/* Fund life */}
      <Card className="p-4">
        <h3 className="font-semibold text-sm mb-3">Fund Life</h3>
        <RadioGroup value={answers.fundLife} onValueChange={(val) => updateAnswers("fundLife", val)}>
          {FUND_LIVES.map((fl) => (
            <div key={fl.key} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50">
              <RadioGroupItem value={fl.key} id={fl.key} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={fl.key} className="font-medium text-sm cursor-pointer">
                  {fl.label}
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">{fl.hint}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </Card>

      {/* Listing */}
      <Card className="p-4">
        <h3 className="font-semibold text-sm mb-3">Listing</h3>
        <RadioGroup value={answers.listing} onValueChange={(val) => updateAnswers("listing", val)}>
          {LISTINGS.map((lst) => (
            <div key={lst.key} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
              <RadioGroupItem value={lst.key} id={lst.key} />
              <Label htmlFor={lst.key} className="font-medium text-sm cursor-pointer">
                {lst.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Card>

      {/* Distribution geography */}
      <Card className="p-4">
        <h3 className="font-semibold text-sm mb-3">Distribution Geography</h3>
        <RadioGroup value={answers.distributionGeography} onValueChange={(val) => updateAnswers("distributionGeography", val)}>
          {DISTRIBUTION_GEOS.map((dgeo) => (
            <div key={dgeo.key}>
              <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
                <RadioGroupItem value={dgeo.key} id={dgeo.key} />
                <Label htmlFor={dgeo.key} className="font-medium text-sm cursor-pointer">
                  {dgeo.label}
                </Label>
              </div>
              {dgeo.hasInput && answers.distributionGeography === dgeo.key && (
                <div className="ml-8 mt-2 mb-3">
                  <Input
                    placeholder="e.g. Germany, UK, Singapore"
                    value={answers.distributionGeoSpecific || ""}
                    onChange={(e) => updateAnswers("distributionGeoSpecific", e.target.value)}
                    className="text-sm h-8"
                  />
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
      </Card>
    </div>
  );
}