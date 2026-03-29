import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, FileText, TrendingUp, Shield } from "lucide-react";

export default function FundStructureVisual({ fundData }) {
  return (
    <div className="space-y-4">
      {/* Fund at Center */}
      <div className="flex justify-center">
        <Card className="p-6 bg-gradient-to-br from-lux-blue/10 to-lux-red/10 border-2 border-lux-blue w-64">
          <h4 className="font-bold text-center text-lg">{fundData.name}</h4>
          <p className="text-xs text-center text-muted-foreground mt-1">{fundData.fundType} • {fundData.legalForm}</p>
          <div className="flex justify-center gap-2 mt-3 flex-wrap">
            {fundData.assetClasses?.slice(0, 3).map(asset => (
              <Badge key={asset} variant="secondary" className="text-[10px]">{asset}</Badge>
            ))}
            {fundData.assetClasses?.length > 3 && (
              <Badge variant="secondary" className="text-[10px]">+{fundData.assetClasses.length - 3}</Badge>
            )}
          </div>
        </Card>
      </div>

      {/* Structure Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Side */}
        <div className="space-y-4">
          {/* Management */}
          <Card className="p-4 border-l-4 border-l-blue-500">
            <div className="flex items-start gap-2">
              <Briefcase className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-blue-900">MANAGEMENT</p>
                <p className="text-sm font-medium mt-1">
                  {fundData.managementStructure === "self-managed" ? "Self-Managed" : "External AIFM"}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Min. Capital: €{fundData.minNetAssets?.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Governance */}
          <Card className="p-4 border-l-4 border-l-purple-500">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-purple-900">GOVERNANCE</p>
                <p className="text-sm font-medium mt-1">Risk Management Function</p>
                <p className="text-[10px] text-muted-foreground mt-1">Compliance Officer</p>
              </div>
            </div>
          </Card>

          {/* Fees */}
          <Card className="p-4 border-l-4 border-l-green-500">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-green-900">FEES</p>
                <p className="text-sm font-medium mt-1">{fundData.estimatedFees}% Management Fee</p>
                <p className="text-[10px] text-muted-foreground mt-1">Plus performance & admin fees</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side */}
        <div className="space-y-4">
          {/* Investors */}
          <Card className="p-4 border-l-4 border-l-orange-500">
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-orange-900">INVESTORS</p>
                <p className="text-sm font-medium mt-1">{fundData.investors?.length || 0} Committed</p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {fundData.investors?.slice(0, 2).map((inv, idx) => (
                    <Badge key={idx} variant="outline" className="text-[10px]">{inv}</Badge>
                  ))}
                  {fundData.investors?.length > 2 && (
                    <Badge variant="outline" className="text-[10px]">+{fundData.investors.length - 2}</Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Portfolio */}
          <Card className="p-4 border-l-4 border-l-teal-500">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-teal-900">PORTFOLIO</p>
                <p className="text-sm font-medium mt-1">{fundData.assets?.length || 0} Assets</p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {fundData.assets?.slice(0, 2).map((asset, idx) => (
                    <Badge key={idx} variant="outline" className="text-[10px]">{asset}</Badge>
                  ))}
                  {fundData.assets?.length > 2 && (
                    <Badge variant="outline" className="text-[10px]">+{fundData.assets.length - 2}</Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-4 border-l-4 border-l-pink-500">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-pink-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-pink-900">TIMELINE</p>
                <p className="text-sm font-medium mt-1">{fundData.timeline?.regulatoryApprovalDays || 90} days</p>
                <p className="text-[10px] text-muted-foreground mt-1">Expected CSSF approval</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Key Regulatory Features */}
      <Card className="p-4 bg-secondary/50">
        <p className="text-xs font-bold mb-2">KEY REGULATORY FEATURES</p>
        <div className="text-xs space-y-1 text-muted-foreground">
          {fundData.fundType === "UCITS" && (
            <>
              <p>✓ Retail investor eligible</p>
              <p>✓ Harmonized EU framework</p>
              <p>✓ Daily redemption rights</p>
            </>
          )}
          {fundData.fundType === "SIF" && (
            <>
              <p>✓ Professional investors only</p>
              <p>✓ Flexible investment strategy</p>
              <p>✓ Simplified notification</p>
            </>
          )}
          {fundData.fundType === "RAIF" && (
            <>
              <p>✓ Alternative strategies allowed</p>
              <p>✓ Marketing exemption (non-EU)</p>
              <p>✓ Flexible redemption terms</p>
            </>
          )}
          {fundData.fundType === "ELTIF 2.0" && (
            <>
              <p>✓ Long-term investment focus</p>
              <p>✓ Infrastructure/SME allocation</p>
              <p>✓ Retail eligible (min €10k)</p>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}