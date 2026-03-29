import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

const ASSET_CLASSES = [
  { key: "real_estate", label: "Real Estate", hint: "Direct property, REITs, real estate debt" },
  { key: "private_equity", label: "Private Equity", hint: "Buyout, growth, co-investment" },
  { key: "venture_capital", label: "Venture Capital", hint: "Early-stage, seed, Series A-C" },
  { key: "private_debt", label: "Private Debt / Credit", hint: "Direct lending, mezzanine, distressed" },
  { key: "infrastructure", label: "Infrastructure", hint: "Greenfield, brownfield, core/core+" },
  { key: "hedge", label: "Hedge Strategies", hint: "Long/short, macro, event-driven" },
  { key: "liquid", label: "Liquid Securities", hint: "Listed equities, fixed income, money market" },
  { key: "digital_assets", label: "Digital Assets / Crypto", hint: "Tokens, DeFi, blockchain-based assets" },
  { key: "fund_of_funds", label: "Fund of Funds", hint: "Investing in other funds" },
  { key: "commodities", label: "Commodities", hint: "Physical, derivatives" },
  { key: "multi_asset", label: "Mixed / Multi-Asset", hint: "Combination strategies" },
];

export default function StepAssetClasses({ answers, updateAnswers }) {
  const toggle = (key) => {
    const current = answers.assetClasses || [];
    if (current.includes(key)) {
      updateAnswers("assetClasses", current.filter((c) => c !== key));
    } else {
      updateAnswers("assetClasses", [...current, key]);
    }
  };

  const hasLiquidOnly = answers.assetClasses.length === 1 && answers.assetClasses.includes("liquid");
  const hasDigitalAssets = answers.assetClasses.includes("digital_assets");

  return (
    <div className="space-y-4">
      {hasLiquidOnly && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 text-sm text-blue-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>UCITS is a strong candidate for liquid securities exclusively.</p>
        </div>
      )}

      {hasDigitalAssets && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-sm text-amber-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>Note: CSSF has evolving guidance on digital assets. Consider compliance implications.</p>
        </div>
      )}

      <div className="space-y-3">
        {ASSET_CLASSES.map((ac) => (
          <div key={ac.key} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50">
            <Checkbox
              id={ac.key}
              checked={answers.assetClasses?.includes(ac.key) || false}
              onCheckedChange={() => toggle(ac.key)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor={ac.key} className="font-medium text-sm cursor-pointer">
                {ac.label}
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">{ac.hint}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}