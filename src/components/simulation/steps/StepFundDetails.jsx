import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Info, Building2, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LEGAL_FORMS = {
  UCITS: ["FCP", "SICAV"],
  SIF: ["SICAV", "S.A.", "S.à r.l."],
  RAIF: ["FCP", "SICAV", "S.A.", "S.à r.l."],
  "ELTIF 2.0": ["SICAV", "S.A."],
};

const ASSET_CLASSES = [
  "Equities",
  "Bonds",
  "Real Estate",
  "Infrastructure",
  "Private Equity",
  "Commodities",
  "Derivatives",
  "Money Market",
];

export default function StepFundDetails({ fundData, onNext }) {
  const [formData, setFormData] = useState({
    name: fundData.name || "",
    legalForm: fundData.legalForm || "",
    managementStructure: fundData.managementStructure || "external-aifm",
    minNetAssets: fundData.minNetAssets || 1000000,
    assetClasses: fundData.assetClasses || [],
    estimatedFees: fundData.estimatedFees || 2,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "minNetAssets" || name === "estimatedFees" ? parseFloat(value) : value,
    }));
  };

  const handleAssetClassToggle = (asset) => {
    setFormData(prev => ({
      ...prev,
      assetClasses: prev.assetClasses.includes(asset)
        ? prev.assetClasses.filter(a => a !== asset)
        : [...prev.assetClasses, asset],
    }));
  };

  const handleContinue = () => {
    if (formData.name && formData.legalForm && formData.assetClasses.length > 0) {
      onNext(formData);
    }
  };

  const availableLegalForms = LEGAL_FORMS[fundData.fundType] || [];

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name">Fund Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="e.g., Luxembourg Growth Fund I"
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="legalForm">Legal Form</Label>
          <Select value={formData.legalForm} onValueChange={(value) =>
            setFormData(prev => ({ ...prev, legalForm: value }))
          }>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select legal form" />
            </SelectTrigger>
            <SelectContent>
              {availableLegalForms.map(form => (
                <SelectItem key={form} value={form}>{form}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="management">Management Structure</Label>
          <Select value={formData.managementStructure} onValueChange={(value) =>
            setFormData(prev => ({ ...prev, managementStructure: value }))
          }>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="self-managed">Self-Managed</SelectItem>
              <SelectItem value="external-aifm">External AIFM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="assets">Min. Net Assets (EUR)</Label>
          <Input
            id="assets"
            name="minNetAssets"
            type="number"
            value={formData.minNetAssets}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="fees">Est. Management Fees (%)</Label>
          <Input
            id="fees"
            name="estimatedFees"
            type="number"
            step="0.1"
            value={formData.estimatedFees}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Asset Classes (select at least one)</Label>
        <div className="grid grid-cols-2 gap-2">
          {ASSET_CLASSES.map(asset => (
            <button
              key={asset}
              onClick={() => handleAssetClassToggle(asset)}
              className={`p-2 rounded border text-sm font-medium transition-all ${
                formData.assetClasses.includes(asset)
                  ? "border-lux-blue bg-lux-blue/10 text-lux-blue"
                  : "border-border text-foreground hover:border-lux-blue"
              }`}
            >
              {asset}
            </button>
          ))}
        </div>
      </div>

      {/* UCI Administrator info panel */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold text-blue-900">UCI Administrator (Central Administration Agent)</p>
            <p className="text-xs text-blue-800 mt-1 mb-2">Required under CSSF Circular 22/811 (as amended by 25/900). Performs 3 core functions:</p>
            <ul className="text-blue-800 text-xs space-y-1 list-disc list-inside">
              <li><strong>Registrar agent</strong> — maintains register of unitholders, processes subscriptions/redemptions, handles investor AML/KYC</li>
              <li><strong>NAV calculation & accounting</strong> — calculates NAV, maintains fund accounts, reconciles with depositary, applies valuation policy</li>
              <li><strong>Client communication & reporting</strong> — prepares financial reports, investor notices, and regulatory filings</li>
            </ul>
            <p className="text-[10px] text-blue-700 mt-2">
              {fundData.fundType === "RAIF"
                ? "For RAIFs: Your authorised AIFM may perform central administration in-house or delegate to a third-party administrator."
                : fundData.fundType === "UCITS"
                ? "For UCITS: Central administration is typically delegated to a specialised administrator, though the ManCo retains oversight responsibility."
                : "You will need to appoint a UCI administrator (or perform these functions in-house if your ManCo/AIFM is authorised to do so)."}
            </p>
          </div>
        </div>
      </Card>

      {/* Depositary requirement */}
      <Card className="p-4 bg-emerald-50 border-emerald-200">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold text-emerald-900">Depositary (Custodian) — Mandatory for all fund types</p>
            <p className="text-xs text-emerald-800 mt-1">All Luxembourg UCIs must appoint a <strong>depositary established in Luxembourg</strong> — a credit institution authorised in Luxembourg or a Luxembourg branch of an EU credit institution. The depositary safekeeps fund assets, oversees cash flows, and verifies compliance with fund documents.</p>
            <p className="text-[10px] text-emerald-700 mt-1">Art. 17 of the 2010 Law (UCITS) · Art. 19 of the 2013 Law (AIFs) · Applies equally to RAIFs.</p>
          </div>
        </div>
      </Card>

      {/* Marketing & distribution */}
      <Card className="p-4 bg-purple-50 border-purple-200">
        <div className="flex gap-3">
          <Globe className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold text-purple-900">Marketing & Distribution Compliance</p>
            <p className="text-xs text-purple-800 mt-1">All marketing communications must be <strong>fair, clear, and not misleading</strong> (CBDF Regulation (EU) 2019/1156, Art. 4). Materials must be identifiable as marketing, present risks and rewards equally prominently, and not contradict the prospectus/KID.</p>
            <ul className="text-purple-800 text-[10px] mt-1 space-y-0.5 list-disc list-inside">
              <li>Cross-border EU passport: notification to CSSF and host regulator required</li>
              <li>AIF pre-marketing to professional investors: notify CSSF within 2 weeks (AIFMD Art. 30a)</li>
              {fundData.fundType === "UCITS" && <li>UCITS can be marketed to retail investors EU-wide with the UCITS passport</li>}
              {(fundData.fundType === "RAIF" || fundData.fundType === "SIF") && <li>AIFs can generally only be marketed to professional investors unless host state allows retail</li>}
            </ul>
            <p className="text-[10px] text-purple-700 mt-1">CSSF Circular 22/795 · CBDF Regulation (EU) 2019/1156</p>
          </div>
        </div>
      </Card>

      <Button
        onClick={handleContinue}
        disabled={!formData.name || !formData.legalForm || formData.assetClasses.length === 0}
        className="w-full"
      >
        Check Regulatory Requirements →
      </Button>
    </div>
  );
}