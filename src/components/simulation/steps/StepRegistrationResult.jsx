import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, HelpCircle, TrendingUp, Info } from "lucide-react";
import FundStructureVisual from "../FundStructureVisual";

const CSSF_CHALLENGES = {
  UCITS: [
    {
      category: "Risk Spreading",
      severity: "warning",
      question: "Your fund holds 15% in a single issuer. CSSF requires max 10% concentration for any single issuer. How do you propose to comply?",
      context: "Risk spreading is critical for investor protection in UCITS.",
    },
    {
      category: "Depositary",
      severity: "warning",
      question: "Have you secured an independent depositary agreement? CSSF requires depositary to be operationally independent.",
      context: "Deposits and assets must be held by a qualified custodian.",
    },
    {
      category: "Liquidity Management",
      severity: "info",
      question: "Your redemption policy states weekly redemptions. Can you ensure sufficient liquidity in volatile markets?",
      context: "Daily/weekly redemptions require robust liquidity management.",
    },
    {
      category: "KIID & Prospectus",
      severity: "warning",
      question: "CSSF will conduct a detailed review of your Key Investor Information Document (KIID). Have you included all material risks?",
      context: "Misleading KIIDs are a top regulatory concern.",
    },
  ],
  SIF: [
    {
      category: "Investor Base",
      severity: "info",
      question: "You've listed 45 investors. For a SIF, ensure all are professional investors per CSSF Circular 18/698. Have you conducted investor categorization?",
      context: "SIFs must maintain professional investor base (no retail).",
    },
    {
      category: "Risk Management",
      severity: "warning",
      question: "Your fund allows concentrated positions in alternative assets. What is your risk management framework?",
      context: "CSSF expects documented procedures for monitoring concentration risk.",
    },
    {
      category: "Management Company",
      severity: "warning",
      question: "Have you established an independent risk management function, separate from portfolio management?",
      context: "CSSF requires two-line control model.",
    },
    {
      category: "Conflicts of Interest",
      severity: "warning",
      question: "Your fund manager has other funds under management. How do you manage conflicts of interest in portfolio decisions?",
      context: "Conflicts of interest require documented procedures.",
    },
  ],
  RAIF: [
    {
      category: "Marketing",
      severity: "info",
      question: "You claim marketing exemption under AIFMD. Have you documented which countries you will NOT market to?",
      context: "RAIFs have specific marketing restrictions outside the EU.",
    },
    {
      category: "Valuation",
      severity: "warning",
      question: "Many RAIF assets (private equity, real estate) lack observable market prices. What is your valuation methodology?",
      context: "Fair value estimation is complex and heavily scrutinized.",
    },
    {
      category: "AIFM Authorization",
      severity: "warning",
      question: "Have you appointed a qualified AIFM? CSSF requires AIFM to have: i) minimum capital, ii) professional team, iii) robust systems.",
      context: "External AIFM authorization is a separate process.",
    },
    {
      category: "Investor Rights",
      severity: "info",
      question: "RAIFs have limited redemption rights. Have you clearly disclosed lock-up periods and any gates in the offering document?",
      context: "Transparency on illiquidity is essential.",
    },
  ],
  "ELTIF 2.0": [
    {
      category: "Asset Allocation",
      severity: "error",
      question: "ELTIF 2.0 requires minimum 55% in eligible long-term assets (infrastructure, SMEs, real assets, green investments) per Regulation (EU) 2023/606. Verify your allocation meets this threshold.",
      context: "Under ELTIF 2.0 (effective 10 January 2024), the eligible assets minimum was revised from 70% to 55%. This is a mandatory compliance requirement.",
    },
    {
      category: "Term Length",
      severity: "warning",
      question: "You declared 10-year term, but ELTIF 2.0 recommends longer (15+ years for infrastructure). Can you justify this shorter horizon?",
      context: "Shorter terms may not deliver intended long-term impact.",
    },
    {
      category: "Impact & Reporting",
      severity: "warning",
      question: "ELTIFs must track ESG/impact metrics. What is your framework for monitoring infrastructure impact?",
      context: "Reporting to investors on impact is mandatory.",
    },
    {
      category: "Diversification",
      severity: "warning",
      question: "Your fund concentrates in 3 infrastructure projects. CSSF expects better diversification to manage project-specific risks.",
      context: "Single-asset concentration introduces portfolio risk.",
    },
  ],
};

export default function StepRegistrationResult({ fundData, onReset }) {
  const [expandedChallenge, setExpandedChallenge] = useState(null);
  const challenges = CSSF_CHALLENGES[fundData.fundType] || [];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "error":
        return "border-destructive bg-destructive/5";
      case "warning":
        return "border-amber-300 bg-amber-50";
      case "info":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-border";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "error":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case "info":
        return <HelpCircle className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-300 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-emerald-900">Simulation Complete</p>
            <p className="text-sm text-emerald-800 mt-1">
              Your {fundData.fundType} fund has been modelled against CSSF requirements. This is a simulation only — no documents have been filed with CSSF.
            </p>
            <p className="text-xs text-emerald-700 mt-3 italic">
              This tool is for educational and planning purposes only. It does not constitute legal or regulatory advice, and no submission has been made to any regulatory body.
            </p>
          </div>
        </div>
      </div>

      {/* Fund structure visual */}
      <div>
        <h3 className="font-bold text-lg mb-3">Fund structure</h3>
        <FundStructureVisual fundData={fundData} />
      </div>

      {/* CSSF challenges & questions */}
      <div>
        <h3 className="font-bold text-lg mb-3">
          <AlertCircle className="w-5 h-5 inline mr-2 text-amber-600" />
          Expected CSSF feedback & challenges
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Based on your fund structure, CSSF will likely raise these questions during regulatory review. Prepare responses in advance.
        </p>

        <div className="space-y-3">
          {challenges.map((challenge, idx) => (
            <Card
              key={idx}
              className={`p-4 cursor-pointer transition-all ${getSeverityColor(challenge.severity)}`}
              onClick={() => setExpandedChallenge(expandedChallenge === idx ? null : idx)}
            >
              <div className="flex items-start gap-3">
                {getSeverityIcon(challenge.severity)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 justify-between">
                    <div>
                      <p className="font-bold text-sm">{challenge.category}</p>
                      <p className="text-sm mt-2">{challenge.question}</p>
                    </div>
                    <Badge variant="outline" className="flex-shrink-0 ml-2">
                      {challenge.severity === "error"
                        ? "Must Fix"
                        : challenge.severity === "warning"
                        ? "Prepare"
                        : "FYI"}
                    </Badge>
                  </div>

                  {expandedChallenge === idx && (
                    <div className="mt-3 pt-3 border-t text-sm">
                      <p className="text-muted-foreground italic">💡 Context: {challenge.context}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AIFMD II banner */}
      <Card className="p-4 bg-amber-50 border-amber-200">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold text-amber-900">AIFMD II / UCITS VI — Effective 16 April 2026</p>
            <ul className="text-amber-800 text-xs mt-2 space-y-1 list-disc list-inside">
              <li><strong>LMTs:</strong> All open-ended AIFs and UCITS must select at least one Liquidity Management Tool from the harmonised EU list (CSSF LMT selection module opened 23 March 2026, deadline 16 April 2026)</li>
              <li><strong>Delegation:</strong> Enhanced substance requirements — CSSF will require more detailed reporting on non-EU delegation arrangements</li>
              <li><strong>Loan origination (AIFs):</strong> New framework with leverage caps (175% NAV open-ended / 300% closed-ended) and 5% risk retention</li>
              <li><strong>Leverage reporting:</strong> Standardised Annex IV — quarterly for large AIFMs, enhanced granularity required</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* What happens next */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold text-blue-900">What happens next</p>
            <ul className="text-blue-800 text-xs mt-2 space-y-1 list-disc list-inside">
              <li>CSSF conducts initial eligibility review (1–2 weeks)</li>
              <li>Detailed compliance verification of fund documentation</li>
              <li>CSSF may request additional information or clarifications</li>
              <li>Fund manager conducts investor suitability assessments</li>
              <li>Final approval and registration with CSSF</li>
            </ul>
          </div>
        </div>
      </Card>

      <Button onClick={onReset} className="w-full">
        Create Another Fund
      </Button>
    </div>
  );
}