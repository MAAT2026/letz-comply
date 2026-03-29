import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle } from "lucide-react";

const FUND_TYPES = [
  {
    id: "UCITS",
    name: "UCITS",
    description: "Undertakings for Collective Investment in Transferable Securities",
    law: "Law of 17 December 2010 (Part I)",
    features: ["Retail & professional investors", "EU passport (retail)", "Daily NAV & redemptions", "Strict eligible assets"],
    mustAppoint: ["ManCo or self-managed SIAG", "Depositary (Luxembourg credit institution)", "Auditor (réviseur agréé)", "Administrator"],
    regulatoryDays: 65,
    approvalNote: "CSSF product approval required (~65 working days)",
  },
  {
    id: "SIF",
    name: "SIF",
    description: "Specialised Investment Fund",
    law: "Law of 13 February 2007",
    features: ["Well-informed investors only", "Min EUR 125,000 or professional", "Flexible investment policy", "CSSF supervised"],
    mustAppoint: ["AIFM (if AIF)", "Depositary (Luxembourg credit institution)", "Auditor (réviseur agréé)"],
    regulatoryDays: 90,
    approvalNote: "CSSF product approval required (~3 months)",
  },
  {
    id: "RAIF",
    name: "RAIF",
    description: "Reserved Alternative Investment Fund",
    law: "Law of 23 July 2016",
    features: ["Well-informed investors only", "No CSSF product approval", "Fast setup (2–6 weeks)", "Must have authorised AIFM"],
    mustAppoint: ["Authorised AIFM (mandatory — the regulatory control mechanism)", "Depositary (Luxembourg credit institution)", "Auditor (réviseur agréé)"],
    regulatoryDays: 0,
    approvalNote: "No CSSF product-level approval — speed-to-market vehicle",
  },
  {
    id: "ELTIF 2.0",
    name: "ELTIF 2.0",
    description: "European Long-Term Investment Fund",
    law: "ELTIF Regulation (EU) 2015/760 as amended by (EU) 2023/606",
    features: ["Retail & professional investors", "Min 55% eligible long-term assets", "Infrastructure / SME / real assets", "EU distribution passport"],
    mustAppoint: ["AIFM (typically structured as SIF, SCA, or Part II UCI)", "Depositary (Luxembourg credit institution)", "Auditor (réviseur agréé)"],
    regulatoryDays: 75,
    approvalNote: "CSSF product approval required (~2–3 months)",
  },
];

export default function StepFundSelection({ fundData, onNext }) {
  const [selected, setSelected] = useState(fundData.fundType || "");

  const handleSelect = (fundType) => {
    setSelected(fundType);
  };

  const handleContinue = () => {
    if (selected) {
      onNext({ fundType: selected });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-muted-foreground">
          Choose the fund structure that best fits your investment strategy.
        </p>
        <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-[10px]">
          Updated for AIFMD II / UCITS VI — effective 16 April 2026
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FUND_TYPES.map((fund) => (
          <Card
            key={fund.id}
            className={`p-4 cursor-pointer transition-all ${
              selected === fund.id
                ? "border-lux-blue border-2 bg-lux-blue/5"
                : "border-border hover:border-lux-blue/50"
            }`}
            onClick={() => handleSelect(fund.id)}
          >
            <div className="mb-3">
              <h3 className="font-bold text-lg">{fund.name}</h3>
              <p className="text-xs text-muted-foreground">{fund.description}</p>
              <p className="text-[10px] text-primary mt-0.5">{fund.law}</p>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {fund.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-[10px]">
                    {feature}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {fund.approvalNote}
              </div>
              {selected === fund.id && (
                <div className="mt-2 pt-2 border-t border-border/50">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Must appoint</p>
                  <ul className="space-y-0.5">
                    {fund.mustAppoint.map(item => (
                      <li key={item} className="text-[10px] text-foreground flex items-start gap-1">
                        <span className="text-lux-blue mt-0.5">•</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {selected === fund.id && (
              <div className="mt-2 pt-2 border-t border-lux-blue/20 text-xs font-medium text-lux-blue">
                ✓ Selected
              </div>
            )}
          </Card>
        ))}
      </div>

      <Button
        onClick={handleContinue}
        disabled={!selected}
        className="w-full"
      >
        Continue to Fund Details →
      </Button>
    </div>
  );
}