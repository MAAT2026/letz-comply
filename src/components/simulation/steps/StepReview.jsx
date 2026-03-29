import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function StepReview({ fundData, onLaunch, loading }) {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-lux-blue/10 to-lux-red/10 p-4 rounded-lg border border-lux-blue/20">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">All regulatory checks passed!</p>
            <p className="text-muted-foreground text-xs mt-1">Your fund is ready to be registered with CSSF</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-2">Fund Name</p>
          <p className="font-bold">{fundData.name}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-2">Fund Type</p>
          <p className="font-bold">{fundData.fundType}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-2">Legal Form</p>
          <p className="font-bold">{fundData.legalForm}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-2">Management</p>
          <p className="font-bold">{fundData.managementStructure === "self-managed" ? "Self-Managed" : "External AIFM"}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-2">Min. Net Assets</p>
          <p className="font-bold">€{fundData.minNetAssets?.toLocaleString()}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-2">Est. Fees</p>
          <p className="font-bold">{fundData.estimatedFees}%</p>
        </Card>
      </div>

      <Card className="p-4">
        <p className="text-xs text-muted-foreground mb-2">Asset Classes</p>
        <div className="flex flex-wrap gap-1">
          {fundData.assetClasses?.map(asset => (
            <Badge key={asset} variant="secondary" className="text-xs">{asset}</Badge>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <p className="text-xs text-muted-foreground mb-2">Investors ({fundData.investors?.length || 0})</p>
        <div className="flex flex-wrap gap-1">
          {fundData.investors?.map((investor, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">{investor}</Badge>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <p className="text-xs text-muted-foreground mb-2">Portfolio Assets ({fundData.assets?.length || 0})</p>
        <div className="flex flex-wrap gap-1">
          {fundData.assets?.map((asset, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">{asset}</Badge>
          ))}
        </div>
      </Card>

      <Button
        onClick={onLaunch}
        disabled={loading}
        className="w-full bg-lux-blue hover:bg-lux-blue/90 text-white"
      >
        {loading ? "Registering Fund..." : "🚀 Register Fund with CSSF"}
      </Button>
    </div>
  );
}