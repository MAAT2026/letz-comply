import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

function runChecks(fundData) {
  const type = fundData.fundType;
  const capital = fundData.minNetAssets || 0;
  const legalForm = fundData.legalForm || "";
  const mgmt = fundData.managementStructure || "";
  const assets = fundData.assetClasses || [];
  const name = fundData.name || "";

  const pass = (rule, detail) => ({ rule, status: "pass", detail });
  const fail = (rule, detail) => ({ rule, status: "fail", detail });
  const warn = (rule, detail) => ({ rule, status: "warn", detail });

  const checks = [];

  // ─── COMMON CHECKS ───────────────────────────────────────────────────
  if (!name.trim()) {
    checks.push(fail("Fund name", "A fund name is required for CSSF registration"));
  } else {
    checks.push(pass("Fund name", `"${name}" — accepted`));
  }

  const validForms = {
    UCITS: ["FCP", "SICAV"],
    SIF: ["SICAV", "S.A.", "S.à r.l."],
    RAIF: ["FCP", "SICAV", "S.A.", "S.à r.l."],
    "ELTIF 2.0": ["SICAV", "S.A."],
  };
  if (!legalForm) {
    checks.push(fail("Legal form", `A legal form is required. Valid options for ${type}: ${(validForms[type] || []).join(", ")}`));
  } else if (!(validForms[type] || []).includes(legalForm)) {
    checks.push(fail("Legal form", `"${legalForm}" is not a valid legal form for ${type}. Valid: ${(validForms[type] || []).join(", ")}`));
  } else {
    checks.push(pass("Legal form", `${legalForm} — valid for ${type}`));
  }

  if (assets.length === 0) {
    checks.push(fail("Asset classes", "At least one asset class must be selected"));
  }

  // ─── UCITS ───────────────────────────────────────────────────────────
  if (type === "UCITS") {
    if (mgmt === "self-managed") {
      if (capital < 1250000) {
        checks.push(fail("Minimum capital (self-managed)", `€${capital.toLocaleString()} is below the €1,250,000 minimum for a self-managed UCITS SICAV`));
      } else {
        checks.push(pass("Minimum capital (self-managed)", `€${capital.toLocaleString()} — meets the €1,250,000 requirement`));
      }
    } else {
      if (capital < 1250000) {
        checks.push(warn("Minimum net assets", `€${capital.toLocaleString()} — UCITS funds typically need €1,250,000 minimum capital at launch`));
      } else {
        checks.push(pass("Minimum net assets", `€${capital.toLocaleString()} — sufficient`));
      }
    }

    const ineligible = assets.filter(a => ["Private Equity", "Real Estate", "Infrastructure"].includes(a));
    if (ineligible.length > 0) {
      checks.push(fail("UCITS eligible assets", `${ineligible.join(", ")} — not permitted in a UCITS fund. UCITS can only invest in transferable securities, money market instruments, and eligible derivatives.`));
    } else if (assets.length > 0) {
      checks.push(pass("UCITS eligible assets", "All selected asset classes are UCITS-eligible"));
    }

    checks.push(pass("Daily redemption rights", "UCITS must offer at least bi-monthly redemption (weekly is standard practice)"));
    checks.push(pass("Risk spreading limits", "10% single issuer limit and 5/10/40 rule will apply"));
    checks.push(pass("Depositary requirement", "An independent Luxembourg depositary bank is required"));
    checks.push(pass("CSSF authorisation", "Full CSSF product approval required — estimated 60–90 days"));
  }

  // ─── SIF ─────────────────────────────────────────────────────────────
  if (type === "SIF") {
    if (mgmt === "self-managed" && capital < 300000) {
      checks.push(fail("Minimum capital (self-managed SIF)", `€${capital.toLocaleString()} is below the €300,000 minimum for a self-managed SIF`));
    } else if (capital < 1250000) {
      checks.push(warn("Minimum net assets", `€${capital.toLocaleString()} — SIF must reach €1,250,000 within 12 months of launch`));
    } else {
      checks.push(pass("Minimum net assets", `€${capital.toLocaleString()} — meets the €1,250,000 requirement`));
    }
    checks.push(warn("Well-informed investors only", "SIF is restricted to well-informed investors (institutional, professional, or investing ≥€125,000 with written declaration)"));
    checks.push(pass("CSSF product approval", "CSSF approval required — estimated 90 days"));
    checks.push(pass("Diversification", "30% single asset limit applies (relaxed vs UCITS)"));
  }

  // ─── RAIF ────────────────────────────────────────────────────────────
  if (type === "RAIF") {
    if (mgmt === "self-managed") {
      checks.push(fail("External AIFM required", "A RAIF must be managed by an authorised AIFM — self-management is not permitted for RAIFs"));
    } else {
      checks.push(pass("External AIFM", "RAIF will be managed by an authorised AIFM — required"));
    }
    if (capital < 1250000) {
      checks.push(warn("Minimum net assets", `€${capital.toLocaleString()} — RAIF must reach €1,250,000 within 12 months of launch`));
    } else {
      checks.push(pass("Minimum net assets", `€${capital.toLocaleString()} — meets the €1,250,000 requirement`));
    }
    checks.push(pass("No CSSF product approval needed", "RAIF only requires notarial deed and RCS registration — fast time-to-market"));
    checks.push(warn("Well-informed investors only", "RAIF is restricted to well-informed investors (same eligibility as SIF)"));
  }

  // ─── ELTIF 2.0 ───────────────────────────────────────────────────────
  if (type === "ELTIF 2.0") {
    const eltifEligible = ["Real Estate", "Infrastructure", "Private Equity"];
    const hasEligible = assets.some(a => eltifEligible.includes(a));
    if (!hasEligible && assets.length > 0) {
      checks.push(fail("ELTIF eligible assets", `ELTIF must invest at least 55% in long-term eligible assets (real estate, infrastructure, private equity, SME loans). Your selection (${assets.join(", ")}) does not include any eligible long-term asset class.`));
    } else if (hasEligible) {
      checks.push(pass("ELTIF eligible assets", `Includes ${assets.filter(a => eltifEligible.includes(a)).join(", ")} — eligible long-term asset classes`));
    }
    if (capital < 10000000) {
      checks.push(warn("Minimum fund size", `€${capital.toLocaleString()} — ELTIF funds typically need €10M+ to be economically viable given the long lock-up period`));
    } else {
      checks.push(pass("Minimum fund size", `€${capital.toLocaleString()} — sufficient for ELTIF structure`));
    }
    checks.push(pass("CSSF authorisation", "Full CSSF product approval required — estimated 90–120 days"));
    checks.push(warn("Retail investor eligibility", "ELTIF 2.0 allows retail investors, but suitability assessment is required. Minimum investment €10,000 unless investor portfolio > €500,000"));
    checks.push(pass("Redemption policy", "ELTIF 2.0 allows limited redemption windows — must define a clear liquidity policy"));
  }

  return checks;
}

const statusConfig = {
  pass: { icon: CheckCircle2, color: "text-emerald-600", bg: "border-emerald-200 bg-emerald-50" },
  fail: { icon: XCircle, color: "text-red-600", bg: "border-red-200 bg-red-50" },
  warn: { icon: AlertCircle, color: "text-amber-600", bg: "border-amber-200 bg-amber-50" },
};

export default function StepRegulatoryValidation({ fundData, onNext }) {
  const [validating, setValidating] = useState(true);
  const checks = runChecks(fundData);
  const failures = checks.filter(c => c.status === "fail");
  const warnings = checks.filter(c => c.status === "warn");
  const allPassed = failures.length === 0;

  useEffect(() => {
    const timer = setTimeout(() => setValidating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    onNext({
      regulatoryChecks: checks,
      timeline: {
        estimatedLaunchDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        regulatoryApprovalDays: 90,
      },
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Running CSSF compliance checks against {fundData.fundType || "—"} regulations...
      </p>

      <div className="space-y-2">
        {checks.map((check, idx) => {
          const config = statusConfig[check.status] || statusConfig.pass;
          const Icon = config.icon;
          return (
            <div
              key={idx}
              className={`p-3 rounded-lg border transition-all ${validating ? "border-amber-200 bg-amber-50" : config.bg}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">{check.rule}</p>
                  <p className="text-xs text-muted-foreground mt-1">{check.detail}</p>
                </div>
                {validating ? (
                  <div className="w-5 h-5 border-2 border-amber-400 border-t-amber-600 rounded-full animate-spin mt-1" />
                ) : (
                  <Icon className={`w-5 h-5 ${config.color} mt-1 flex-shrink-0`} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!validating && (
        <>
          {allPassed && warnings.length === 0 && (
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-emerald-900">All regulatory requirements met!</p>
                <p className="text-emerald-700 text-xs mt-1">Estimated approval time: 90 days</p>
              </div>
            </div>
          )}
          {allPassed && warnings.length > 0 && (
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-900">Passed with {warnings.length} warning{warnings.length > 1 ? "s" : ""}</p>
                <p className="text-amber-700 text-xs mt-1">Review the warnings above before proceeding</p>
              </div>
            </div>
          )}
          {!allPassed && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-red-900">{failures.length} regulatory check{failures.length > 1 ? "s" : ""} failed</p>
                <p className="text-red-700 text-xs mt-1">Go back and fix the issues above, or continue to see the impact</p>
              </div>
            </div>
          )}
        </>
      )}

      <Button
        onClick={handleContinue}
        disabled={validating}
        variant={allPassed ? "default" : "outline"}
        className="w-full"
      >
        {validating ? "Validating..." : allPassed ? "Continue to Investors & Assets →" : "Continue anyway (with issues) →"}
      </Button>
    </div>
  );
}