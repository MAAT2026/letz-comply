import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function StepTaxConsiderations({ answers, updateAnswers }) {
  const toggleCheckbox = (key) => {
    updateAnswers(key, !answers[key]);
  };

  const addResidency = () => {
    const current = answers.taxInvestorResidencies || [];
    if (current.length < 3) {
      updateAnswers("taxInvestorResidencies", [...current, ""]);
    }
  };

  const updateResidency = (index, value) => {
    const current = answers.taxInvestorResidencies || [];
    const updated = [...current];
    updated[index] = value;
    updateAnswers("taxInvestorResidencies", updated);
  };

  const removeResidency = (index) => {
    const current = answers.taxInvestorResidencies || [];
    updateAnswers("taxInvestorResidencies", current.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Investor residencies */}
      <Card className="p-4">
        <h3 className="font-semibold text-sm mb-3">Investor Tax Residencies (top 3)</h3>
        <div className="space-y-2 mb-3">
          {(answers.taxInvestorResidencies || []).map((residency, idx) => (
            <div key={idx} className="flex gap-2">
              <Input
                placeholder="e.g. Germany, France, Luxembourg"
                value={residency}
                onChange={(e) => updateResidency(idx, e.target.value)}
                className="text-sm h-8"
              />
              <button
                onClick={() => removeResidency(idx)}
                className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {(answers.taxInvestorResidencies || []).length < 3 && (
          <button
            onClick={addResidency}
            className="text-xs text-primary hover:underline"
          >
            + Add country
          </button>
        )}
      </Card>

      {/* Checkboxes */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="tax_transparency"
            checked={answers.taxTransparency || false}
            onCheckedChange={() => toggleCheckbox("taxTransparency")}
          />
          <Label htmlFor="tax_transparency" className="font-medium text-sm cursor-pointer">
            Need for tax transparency / pass-through treatment?
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="tax_parent_sub"
            checked={answers.taxParentSubsidiary || false}
            onCheckedChange={() => toggleCheckbox("taxParentSubsidiary")}
          />
          <Label htmlFor="tax_parent_sub" className="font-medium text-sm cursor-pointer">
            Importance of EU Parent-Subsidiary Directive access?
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="tax_dtt"
            checked={answers.taxDTT || false}
            onCheckedChange={() => toggleCheckbox("taxDTT")}
          />
          <Label htmlFor="tax_dtt" className="font-medium text-sm cursor-pointer">
            Importance of Double Tax Treaty network access?
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="tax_vat"
            checked={answers.taxVAT || false}
            onCheckedChange={() => toggleCheckbox("taxVAT")}
          />
          <Label htmlFor="tax_vat" className="font-medium text-sm cursor-pointer">
            VAT optimization needs?
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="tax_sub_sensitivity"
            checked={answers.taxSubscriptionSensitivity || false}
            onCheckedChange={() => toggleCheckbox("taxSubscriptionSensitivity")}
          />
          <Label htmlFor="tax_sub_sensitivity" className="font-medium text-sm cursor-pointer">
            Subscription tax sensitivity? (taxe d'abonnement: 5bps–exempt)
          </Label>
        </div>
      </Card>
    </div>
  );
}