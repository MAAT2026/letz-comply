import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

const INVESTOR_TYPES = [
  "Institutional",
  "High Net Worth Individual",
  "Retail",
  "Pension Fund",
  "Insurance Company",
];

const ASSET_EXAMPLES = {
  Equities: ["Apple", "LVMH", "Nestlé", "Siemens"],
  Bonds: ["German Bunds", "French OAT", "Corporate Bonds"],
  "Real Estate": ["Office Building - Frankfurt", "Retail Center - Luxembourg"],
  Infrastructure: ["Solar Farm", "Wind Park"],
  Commodities: ["Gold", "Oil", "Agricultural"],
};

export default function StepInvestorAssets({ fundData, onNext }) {
  const [investors, setInvestors] = useState(fundData.investors || []);
  const [assets, setAssets] = useState(fundData.assets || []);
  const [newInvestor, setNewInvestor] = useState("");
  const [newAsset, setNewAsset] = useState("");
  const [selectedAssetClass, setSelectedAssetClass] = useState(fundData.assetClasses?.[0] || "");

  const handleAddInvestor = () => {
    if (newInvestor.trim()) {
      setInvestors([...investors, newInvestor]);
      setNewInvestor("");
    }
  };

  const handleAddAsset = () => {
    if (newAsset.trim()) {
      setAssets([...assets, newAsset]);
      setNewAsset("");
    }
  };

  const handleRemoveInvestor = (idx) => {
    setInvestors(investors.filter((_, i) => i !== idx));
  };

  const handleRemoveAsset = (idx) => {
    setAssets(assets.filter((_, i) => i !== idx));
  };

  const assetExamples = ASSET_EXAMPLES[selectedAssetClass] || [];

  const handleContinue = () => {
    if (investors.length > 0 && assets.length > 0) {
      onNext({
        investors,
        assets,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Investors Section */}
      <div>
        <Label className="block mb-3">Add Investors (add at least one)</Label>
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Investor name"
            value={newInvestor}
            onChange={(e) => setNewInvestor(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddInvestor()}
          />
          <Button onClick={handleAddInvestor} variant="outline">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {investors.map((investor, idx) => (
            <Badge key={idx} variant="secondary" className="flex items-center gap-1">
              {investor}
              <button
                onClick={() => handleRemoveInvestor(idx)}
                className="hover:text-destructive"
              >
                ✕
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Assets Section */}
      <div>
        <Label className="block mb-3">Add Assets (add at least one)</Label>

        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-2">Quick add from:</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {fundData.assetClasses?.map(assetClass => (
              <button
                key={assetClass}
                onClick={() => setSelectedAssetClass(assetClass)}
                className={`px-2 py-1 text-xs rounded border transition-all ${
                  selectedAssetClass === assetClass
                    ? "border-lux-blue bg-lux-blue/10 text-lux-blue"
                    : "border-border"
                }`}
              >
                {assetClass}
              </button>
            ))}
          </div>

          {assetExamples.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {assetExamples.map(example => (
                <button
                  key={example}
                  onClick={() => {
                    setAssets([...assets, example]);
                    setNewAsset("");
                  }}
                  className="px-3 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded border border-border"
                >
                  + {example}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Add custom asset"
            value={newAsset}
            onChange={(e) => setNewAsset(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddAsset()}
          />
          <Button onClick={handleAddAsset} variant="outline">
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {assets.map((asset, idx) => (
            <Badge key={idx} variant="secondary" className="flex items-center gap-1">
              {asset}
              <button
                onClick={() => handleRemoveAsset(idx)}
                className="hover:text-destructive"
              >
                ✕
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <Button
        onClick={handleContinue}
        disabled={investors.length === 0 || assets.length === 0}
        className="w-full"
      >
        Review & Launch Fund →
      </Button>
    </div>
  );
}