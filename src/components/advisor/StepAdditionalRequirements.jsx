import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const REQUIREMENTS = [
  { key: "sfdr", label: "ESG / SFDR Article 8 or 9 classification needed" },
  { key: "shariah", label: "Shariah compliance required" },
  { key: "tokenization", label: "Tokenization / blockchain-based distribution" },
  { key: "masterFeeder", label: "Master-feeder structure" },
  { key: "umbrella", label: "Umbrella with multiple sub-funds / compartments" },
  { key: "sidePockets", label: "Side pockets / co-investment vehicles" },
  { key: "eltif", label: "European Long-Term Investment Fund (ELTIF) label" },
  { key: "euveca", label: "EuVECA or EuSEF label" },
];

export default function StepAdditionalRequirements({ answers, updateAnswers }) {
  const toggle = (key) => {
    updateAnswers(key, !answers[key]);
  };

  const hasSFDR = answers.sfdr;

  return (
    <div className="space-y-6">
      {/* Checkboxes */}
      <Card className="p-4">
        <h3 className="font-semibold text-sm mb-3">Select any that apply:</h3>
        <div className="space-y-3">
          {REQUIREMENTS.map((req) => (
            <div key={req.key} className="flex items-center gap-2">
              <Checkbox
                id={req.key}
                checked={answers[req.key] || false}
                onCheckedChange={() => toggle(req.key)}
              />
              <Label htmlFor={req.key} className="font-medium text-sm cursor-pointer">
                {req.label}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* SFDR article selection */}
      {hasSFDR && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-sm mb-2">SFDR Classification</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="sfdr_8"
                name="sfdr_article"
                value="8"
                checked={answers.sfdrArticle === "8"}
                onChange={(e) => updateAnswers("sfdrArticle", e.target.value)}
                className="rounded"
              />
              <Label htmlFor="sfdr_8" className="text-sm cursor-pointer">
                Article 8 (sustainability characteristics)
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="sfdr_9"
                name="sfdr_article"
                value="9"
                checked={answers.sfdrArticle === "9"}
                onChange={(e) => updateAnswers("sfdrArticle", e.target.value)}
                className="rounded"
              />
              <Label htmlFor="sfdr_9" className="text-sm cursor-pointer">
                Article 9 (sustainability focus / impact)
              </Label>
            </div>
          </div>
        </Card>
      )}

      {/* Free text */}
      <Card className="p-4">
        <h3 className="font-semibold text-sm mb-2">Anything else we should know?</h3>
        <Textarea
          placeholder="Any specific constraints, unique requirements, or additional context..."
          value={answers.freeText || ""}
          onChange={(e) => updateAnswers("freeText", e.target.value)}
          className="text-sm min-h-24"
        />
      </Card>
    </div>
  );
}