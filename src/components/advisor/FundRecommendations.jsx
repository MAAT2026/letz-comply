import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, TrendingUp, Download } from "lucide-react";
import { toPng } from "html-to-image";

export default function FundRecommendations({ recommendations, disqualified = {} }) {
   const [selectedRank, setSelectedRank] = useState(1);
   const selected = recommendations.find((r) => r.rank === selectedRank);
   const [isExporting, setIsExporting] = useState(false);

  const handleDownloadPNG = async () => {
    const element = document.getElementById("recommendation-detail");
    const toolbar = document.getElementById("recommendation-toolbar");
    if (!element) return;

    setIsExporting(true);
    try {
      // Hide toolbar during export
      if (toolbar) toolbar.style.display = "none";

      // Create a wrapper with padding and white background
      const wrapper = document.createElement("div");
      wrapper.style.padding = "24px";
      wrapper.style.backgroundColor = "#FFFFFF";
      wrapper.style.width = "fit-content";

      // Clone the element
      const clone = element.cloneNode(true);
      wrapper.appendChild(clone);

      // Temporarily add to DOM for rendering
      document.body.appendChild(wrapper);

      // Generate PNG with high resolution
      const png = await toPng(wrapper, {
        pixelRatio: 2,
        quality: 1.0,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      // Remove temporary wrapper
      document.body.removeChild(wrapper);

      // Download
      const today = new Date().toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).replace(/\s/g, "");
      const filename = `FundStructure_${selected.regime}_${today}.png`;
      
      const link = document.createElement("a");
      link.href = png;
      link.download = filename;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      // Restore toolbar
      if (toolbar) toolbar.style.display = "block";
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fund Structure Recommendations</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Based on your requirements, here are the top structures for your fund.
          </p>
        </div>
      </div>

      {/* Recommendation selector */}
      <div className="flex gap-2 flex-wrap">
        {recommendations.map((rec) => (
          <button
            key={rec.rank}
            onClick={() => setSelectedRank(rec.rank)}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              selectedRank === rec.rank
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary"
            }`}
          >
            <div className="text-xs uppercase tracking-wider opacity-75">Rank {rec.rank}</div>
            <div className="font-bold">{rec.regime}</div>
            <div className="text-xs">{rec.match_score}% match</div>
          </button>
        ))}
      </div>

      {/* Selected recommendation detail */}
      <div id="recommendation-detail" className="space-y-6">
        {/* Header card */}
          <Card className="border-2 border-primary/40 bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        className="bg-primary text-white text-xs h-7 px-3 inline-flex items-center justify-center"
                      >
                        {selected.regime}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="text-xs h-7 px-2 inline-flex items-center justify-center"
                      >
                        {selected.legal_form}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs text-green-700 bg-green-50 border-green-200 h-7 px-3 inline-flex items-center justify-center gap-1"
                      >
                        <TrendingUp className="w-3 h-3" /> {selected.match_score}% match
                      </Badge>
                    </div>
                  <CardTitle className="text-2xl font-bold">{selected.display_name}</CardTitle>
                </div>
              </div>
              <p className="text-sm text-foreground/75 mt-4">{selected.summary}</p>
            </CardHeader>
          </Card>

        {/* Key features table */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(selected.key_features).map(([key, value]) => (
                <div key={key} className="border-b border-gray-200 pb-3 last:border-0">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    {key.replace(/_/g, " ")}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    {typeof value === "boolean" ? (value ? "Yes" : "No") : String(value)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="shadow-sm border-emerald-100">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" /> Advantages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {selected.pros.map((pro, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-foreground">
                    <span className="text-green-600 font-bold">+</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-amber-100">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" /> Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {selected.cons.map((con, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-foreground">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Costs */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Estimated Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                  Setup Cost
                </p>
                <p className="text-lg font-bold">{selected.estimated_setup_cost}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  One-time incorporation, legal, CSSF filing (if applicable)
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                  Annual Operating Cost
                </p>
                <p className="text-lg font-bold">{selected.estimated_ongoing_annual_cost}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Admin, depositary, auditor, ManCo/AIFM (if applicable)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typical use cases */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Typical Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selected.typical_use_cases.map((useCase, idx) => (
                <Badge key={idx} variant="secondary">
                  {useCase}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next steps */}
        <Card className="border-blue-200 bg-blue-50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900">Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-900 space-y-2">
            <p>✓ Review this recommendation with your legal counsel</p>
            <p>✓ Validate alignment with your tax and investor base strategy</p>
            <p>✓ Contact Luxembourg service providers (AIFM, depositary, admin) for detailed proposals</p>
            <p>✓ If CSSF approval required, initiate regulatory pre-filing discussions</p>
            <p>✓ Monitor LetzComply for regulatory changes relevant to your structure</p>
          </CardContent>
        </Card>
      </div>

      {/* Action buttons (hidden during export) */}
      <div id="recommendation-toolbar" className="flex gap-3">
        <Button
          onClick={handleDownloadPNG}
          variant="outline"
          className="gap-2"
          disabled={isExporting}
        >
          <Download className="w-4 h-4" />{" "}
          {isExporting ? "Generating PNG..." : "Download as PNG"}
        </Button>
      </div>

      {/* Comparison hint */}
      {recommendations.length > 1 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
          <p className="font-semibold mb-2">Comparing Recommendations</p>
          <p className="text-muted-foreground">
            Use the buttons at the top to compare the top {recommendations.length} fund structures.
            Each offers a different balance of speed, cost, flexibility, and regulatory standing.
          </p>
        </div>
      )}

      {/* Disqualified structures explanation */}
      {Object.keys(disqualified).length > 0 && (
        <Card className="border-amber-200 bg-amber-50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-amber-900">Structures Not Recommended</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-amber-900 space-y-1">
            {Object.entries(disqualified).map(([regime, reason]) => (
              <p key={regime}>
                <span className="font-semibold">{regime}:</span> {reason}
              </p>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}