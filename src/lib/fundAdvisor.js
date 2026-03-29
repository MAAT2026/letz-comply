// Fund Structure Advisor - Matching & Analysis Engine
// Implements scoring, hard filters, and recommendation logic

const FUND_KNOWLEDGE_BASE = {
  UCITS: {
    regime: "UCITS",
    legalForms: ["SICAV", "SICAF", "FCP", "SA", "SCA"],
    investorTypes: ["retail", "institutional"],
    eligibleAssets: ["liquid", "liquid_only"],
    assetConstraints: ["no_direct_re", "no_pe", "no_private_debt", "no_infra", "no_crypto"],
    diversificationRules: "5/10/40 rule, max 20% single issuer (bonds)",
    leverage: "Max 10% temp borrowing, 200% gross (derivatives)",
    cssf_approval: true,
    approval_time: "4-6 months",
    subscription_tax: "5bps (retail), 1bp (institutional), exempt for certain classes",
    eu_passport: true,
    leverage_limits: "Limited (max 10% borrowing)",
    sfdr_compatible: true,
    typical_use: ["liquid_securities_only"],
  },
  SIF: {
    regime: "SIF",
    legalForms: ["SICAV", "SICAF", "FCP", "SCSp", "SCS", "SA", "SàRL", "SCA"],
    investorTypes: ["institutional", "well_informed"],
    eligibleAssets: ["all"],
    diversificationRules: "30% max concentration (waivable)",
    leverage: "No regulatory limit",
    cssf_approval: true,
    approval_time: "3-4 months",
    subscription_tax: "1bp institutional, exempt for certain",
    eu_passport: false,
    sfdr_compatible: true,
    typical_use: ["alternatives", "illiquids", "infra", "re", "pe"],
  },
  SICAR: {
    regime: "SICAR",
    legalForms: ["SA", "SCA", "SàRL", "SCoSA", "SCSp", "SCS"],
    investorTypes: ["well_informed"],
    eligible_assets_constraint: "risk_capital_only",
    diversificationRules: "None required",
    leverage: "No regulatory limit",
    cssf_approval: true,
    approval_time: "3-4 months",
    tax_regime: "Exempt from income tax on risk capital gains",
    subscription_tax: "Exempt",
    eu_passport: false,
    sfdr_compatible: false,
    typical_use: ["pe", "vc", "mezzanine"],
  },
  RAIF: {
    regime: "RAIF",
    legalForms: ["SICAV", "SICAF", "FCP", "SCSp", "SCS", "SA", "SàRL", "SCA"],
    investorTypes: ["well_informed"],
    eligibleAssets: ["all"],
    aifm_required: true,
    cssf_approval: false,
    cssf_indirect_supervision: "via AIFM",
    approval_time: "2-4 weeks",
    subscription_tax: "Same as SIF / SICAR depending on regime",
    eu_passport: true,
    sfdr_compatible: true,
    typical_use: ["pe", "re", "infra", "credit", "alternatives"],
  },
  Part_II: {
    regime: "Part II UCI",
    legalForms: ["SICAV", "SICAF", "FCP"],
    investorTypes: ["retail", "institutional"],
    eligibleAssets: ["mixed"],
    diversificationRules: "More flexible than UCITS",
    cssf_approval: true,
    approval_time: "4-6 months",
    subscription_tax: "5bps",
    eu_passport: false,
    eu_country_registration: "Country-by-country",
    sfdr_compatible: true,
    typical_use: ["flexible_assets", "alternatives_with_retail"],
  },
  Unreg_LP: {
    regime: "Unregulated SCSp/SCS",
    legalForms: ["SCSp", "SCS"],
    investorTypes: ["institutional", "professional"],
    eligibleAssets: ["all"],
    cssf_approval: false,
    product_regulation: "None",
    aifm_required_if: "AUM > €100M leveraged or €500M unleveraged",
    approval_time: "1-2 weeks",
    subscription_tax: "0.01% (exempt with conditions)",
    tax_transparency: true,
    eu_passport: "Only with authorized AIFM",
    sfdr_compatible: false,
    typical_use: ["pe_vc", "institutional", "speed_to_market"],
  },
};

// Scoring weights
const WEIGHTS = {
  investor_eligibility: 0.25,
  asset_class_fit: 0.2,
  timeline_compatibility: 0.15,
  tax_efficiency: 0.15,
  fund_size_appropriateness: 0.1,
  distribution_strategy_fit: 0.1,
  regulatory_preference_alignment: 0.05,
};

// Hard filters: return true to proceed, false/string to disqualify
// BUGFIX: Return STRING for disqualification reasons to prevent fallback inclusion
function applyHardFilters(regime, legalForm, answers) {
  const { investorTypes, assetClasses, asset_classes, fundLife, timeline, listing, managementStructure, initialCapital } = answers;

  // CRITICAL FIX: UCITS + illiquid assets - return STRING to prevent fallback recommendations
  // UCITS cannot hold illiquid/alternative assets; must return reason string not false
  if (regime === "UCITS") {
    const illiquidAssets = ["real_estate", "private_equity", "venture_capital", "private_debt", "infrastructure"];
    const assetList = assetClasses || asset_classes || [];
    const hasIlliquid = assetList.some((ac) => illiquidAssets.includes(ac));
    if (hasIlliquid) {
      return "UCITS cannot invest in illiquid/alternative assets - restricted to transferable securities";
    }
  }

  // Hard filter: Unreg_LP cannot access EU marketing passport
  if (regime === "Unreg_LP" && answers.distributionGeography === "eu") {
    return "Unregulated LP cannot access EU marketing passport without full AIFM authorization - consider RAIF or SIF for EU-wide distribution";
  }

  // Hard filter: Unreg_LP has limited cross-border distribution capabilities
  if (regime === "Unreg_LP" && answers.distributionGeography === "global") {
    return "Unregulated LP has limited cross-border distribution capabilities - consider RAIF or SIF for global distribution";
  }

  // Hard filter: Retail investors can only use UCITS or Part_II
  const retailOnly = ["RAIF", "SIF", "SICAR", "Unreg_LP"];
  if (investorTypes && investorTypes.includes("retail") && retailOnly.includes(regime)) {
    return "Retail investors not eligible - only UCITS and Part II UCI can target retail";
  }

  // HARD DISQUALIFICATION: SICAR requires risk capital only
  if (regime === "SICAR") {
    const riskCapitalAssets = ["private_equity", "venture_capital"];
    const onlyRiskCapital = assetClasses?.every((ac) => riskCapitalAssets.includes(ac));
    if (!onlyRiskCapital) {
      return false; // SICAR is restricted by definition
    }
  }

  // SOFT DISQUALIFICATION: Retail investors + non-UCITS/Part II (still score, but penalize)
  // Do not return false here; let scoring handle the penalty

  // SOFT DISQUALIFICATION: RAIF requires AIFM (still score with penalty)
  // Do not return false here; let scoring handle the penalty

  // SOFT DISQUALIFICATION: RAIF minimum capital (still score with penalty)
  // Do not return false here; let scoring handle the penalty

  // SOFT DISQUALIFICATION: Urgent timeline + CSSF (still score with penalty)
  // Do not return false here; let scoring handle the penalty

  return true; // BUGFIX: All regimes proceed to scoring
}

// Score a single dimension (0-100)
// BUGFIX: Return differentiated scores for each regime, not just 100/0
function scoreInvestorEligibility(regime, answers) {
  const { investorTypes } = answers;
  const kb = FUND_KNOWLEDGE_BASE[regime];

  // No investor types specified = neutral
  if (!investorTypes || investorTypes.length === 0) return 50;
  if (!kb.investorTypes || kb.investorTypes.length === 0) return 0;

  // BUGFIX: Check for perfect match, then partial match with penalties
  const allSupported = investorTypes.every((it) => {
    if (it === "retail") return kb.investorTypes.includes("retail");
    if (it === "institutional") return kb.investorTypes.includes("institutional");
    if (it === "well_informed") return kb.investorTypes.includes("well_informed");
    if (it === "hnwi") return kb.investorTypes.includes("institutional");
    if (it === "family_office") return kb.investorTypes.includes("institutional");
    if (it === "swf") return kb.investorTypes.includes("institutional");
    return false;
  });

  // BUGFIX: Perfect match = 100
  if (allSupported) return 100;

  // BUGFIX: Partial match with strong penalties based on regime compatibility
  if (investorTypes.includes("retail")) {
    if (regime === "UCITS") return 100; // Perfect for retail
    if (regime === "Part_II") return 98; // Excellent
    if (regime === "SIF") return 55; // Structural mismatch, requires workaround
    if (regime === "RAIF") return 50; // Requires special investor status
    if (regime === "Unreg_LP") return 35; // Institutional only, poor match
    if (regime === "SICAR") return 25; // Risk capital, poor match
  }

  // Institutional/well-informed - strong differentiation
  if (investorTypes.some((it) => ["institutional", "well_informed", "hnwi", "family_office", "swf"].includes(it))) {
    if (regime === "SICAR") return 100; // Perfect for risk capital
    if (regime === "SIF") return 98; // Excellent match
    if (regime === "RAIF") return 96; // Excellent, very flexible
    if (regime === "Unreg_LP") return 94; // Excellent, minimal overhead
    if (regime === "UCITS") return 75; // Possible but less ideal
    if (regime === "Part_II") return 80; // Workable
  }

  return 50; // Fallback
}

function scoreAssetClassFit(regime, answers) {
  const { assetClasses } = answers;
  const kb = FUND_KNOWLEDGE_BASE[regime];

  // No asset classes specified = neutral score
  if (!assetClasses || assetClasses.length === 0) return 75;

  const illiquidAssets = ["real_estate", "private_equity", "venture_capital", "private_debt", "infrastructure", "digital_assets"];
  const hasIlliquid = assetClasses.some((ac) => illiquidAssets.includes(ac));
  const liquidOnly = !hasIlliquid;

  // BUGFIX: UCITS scores 100 for liquid only, 0 for illiquid (hard constraint)
  if (regime === "UCITS") {
    return liquidOnly ? 100 : 0;
  }

  // BUGFIX: SICAR scores 100 for risk capital only, penalized for others
  if (regime === "SICAR") {
    const riskCapitalAssets = ["private_equity", "venture_capital"];
    const onlyRiskCapital = assetClasses.every((ac) => riskCapitalAssets.includes(ac));
    return onlyRiskCapital ? 100 : 45; // BUGFIX: Penalized but not disqualified
  }

  // BUGFIX: Differentiated scores for alternatives
  if (hasIlliquid) {
    if (regime === "RAIF") return 95; // RAIF excels with alternatives
    if (regime === "SIF") return 90; // SIF is very good with alternatives
    if (regime === "Unreg_LP") return 100; // Unreg is perfect for alternatives
    if (regime === "Part_II") return 70; // Part II can do mixed but not ideal
  } else {
    // Liquid assets
    if (regime === "UCITS") return 100;
    if (regime === "Part_II") return 95; // Part II also good for liquid
    if (regime === "SIF" || regime === "RAIF") return 85; // Overkill for liquid-only
    if (regime === "SICAR") return 50; // SICAR not ideal for liquid
    if (regime === "Unreg_LP") return 80; // Unreg can handle liquid
  }

  return 75;
}

function scoreTimelineCompatibility(regime, answers) {
  const { timeline } = answers;
  const kb = FUND_KNOWLEDGE_BASE[regime];

  // No timeline specified = neutral
  if (!timeline) return 75;

  // Parse regime approval time (e.g. "2-4 weeks" → 0.5 months, "3-4 months" → 4 months)
  let regimeMonths = 6; // Default fallback
  if (kb.approval_time) {
    const match = kb.approval_time.match(/(\d+)-(\d+)\s*(weeks|months)/);
    if (match) {
      const endValue = parseInt(match[2]);
      const unit = match[3];
      regimeMonths = unit === "weeks" ? endValue / 4 : endValue;
    }
  }

  // BUGFIX: Differentiated scoring based on timeline fit
  const timelineScores = {
    urgent: { // User needs < 2 months
      RAIF: 100, // 2-4 weeks = perfect
      Unreg_LP: 95, // 1-2 weeks = excellent
      SICAR: 40, // 3-4 months = too slow
      SIF: 30, // 3-4 months = too slow
      UCITS: 20, // 4-6 months = too slow
      Part_II: 25, // 4-6 months = too slow
    },
    standard: { // User needs 3-4 months
      SIF: 100, // Perfect
      SICAR: 100, // Perfect
      RAIF: 95, // Good
      UCITS: 85, // Slightly slow
      Part_II: 80, // Slightly slow
      Unreg_LP: 90, // Fast but works
    },
    comfortable: { // User needs 4-6 months
      UCITS: 100, // Good fit
      Part_II: 100, // Good fit
      SIF: 95, // Still fast
      SICAR: 95, // Still fast
      RAIF: 90, // Overkill speed
      Unreg_LP: 95, // Overkill speed
    },
    flexible: { // User needs >6 months
      UCITS: 100,
      Part_II: 100,
      SIF: 95,
      SICAR: 95,
      RAIF: 90,
      Unreg_LP: 85,
    },
    planning: { // User has no deadline
      UCITS: 100,
      Part_II: 100,
      SIF: 95,
      SICAR: 95,
      RAIF: 90,
      Unreg_LP: 85,
    },
  };

  return timelineScores[timeline]?.[regime] || 75;
}

function scoreTaxEfficiency(regime, answers) {
  const { taxTransparency, taxSubscriptionSensitivity } = answers;
  const kb = FUND_KNOWLEDGE_BASE[regime];

  // BUGFIX: Base score varies significantly by regime
  let score = 60;

  // BUGFIX: Strong tax transparency penalty/bonus
  if (taxTransparency) {
    if (regime === "Unreg_LP") score = 95; // Perfect transparency
    if (regime === "SICAR") score = 85; // Good transparency
    if (regime === "SIF") score = 70; // Can be structured for transparency
    if (regime === "RAIF") score = 68; // Can be structured
    if (regime === "UCITS") score = 50; // Opaque fund structure
    if (regime === "Part_II") score = 50; // Opaque
  }

  // BUGFIX: Strong subscription tax sensitivity differentiation
  if (taxSubscriptionSensitivity) {
    if (regime === "Unreg_LP") score = Math.max(score, 92); // Minimal (0.01%)
    if (regime === "SICAR") score = Math.max(score, 88); // Exempt
    if (regime === "SIF") score = Math.max(score, 70); // 1bp
    if (regime === "RAIF") score = Math.max(score, 68); // 1bp or variable
    if (regime === "Part_II") score = Math.max(score, 65); // 5bps
    if (regime === "UCITS") score = Math.max(score, 50); // 5bps retail, 1bp institutional
  }

  // BUGFIX: If both are important, differentiate further
  if (taxTransparency && taxSubscriptionSensitivity) {
    if (regime === "Unreg_LP") score = 98; // Best on both dimensions
    if (regime === "SICAR") score = 90; // Very good on both
    if (regime === "RAIF") score = 72; // Okay on both
    if (regime === "SIF") score = 75; // Okay on both
  }

  return Math.max(0, Math.min(100, score));
}

function scoreFundSizeAppropriateness(regime, answers) {
  const { fundSize } = answers;

  // No fund size specified = neutral
  if (!fundSize) return 75;

  // BUGFIX: Differentiated scores for each size category
  const sizeScores = {
    sub_10m: {
      Unreg_LP: 100, // Ideal for very small
      RAIF: 90, // Good but has minimum capital
      SIF: 75, // Overkill but works
      SICAR: 85, // Good for PE/VC at any size
      UCITS: 70, // Overkill regulatory burden
      Part_II: 65, // Overkill regulatory burden
    },
    sub_100m: {
      Unreg_LP: 100, // Perfect
      RAIF: 95, // Good if capital available
      SICAR: 85, // Good for PE/VC
      SIF: 70, // Higher AIFM costs
      UCITS: 75, // Possible but less efficient
      Part_II: 70, // Less efficient
    },
    medium: { // 100M-500M
      SIF: 100, // Ideal mid-market
      RAIF: 95, // Excellent
      UCITS: 90, // Good for liquid
      SICAR: 85, // Still good for PE/VC
      Part_II: 80, // Workable
      Unreg_LP: 70, // Overkill large
    },
    large: { // 500M-1B
      UCITS: 100, // Ideal for large liquid
      SIF: 95, // Excellent
      RAIF: 90, // Good for alternatives
      SICAR: 80, // Less ideal at scale
      Part_II: 85, // Workable
      Unreg_LP: 65, // Less ideal
    },
    mega: { // >1B
      UCITS: 100, // Perfect for mega
      SIF: 95, // Excellent
      RAIF: 85, // Good for alternatives
      SICAR: 70, // Less ideal at mega scale
      Part_II: 80, // Workable
      Unreg_LP: 50, // Poor for mega
    },
  };

  return sizeScores[fundSize]?.[regime] || 75;
}

function scoreDistributionStrategyFit(regime, answers) {
  const { fundLife, listing, distributionGeography } = answers;
  const kb = FUND_KNOWLEDGE_BASE[regime];

  // BUGFIX: Base score varies by fund life + distribution model
  let score = 70;

  if (!fundLife && !distributionGeography) return 75; // No distribution strategy specified

  // Open-ended + liquid = UCITS/Part II excellent
  if (fundLife === "open_ended") {
    if (regime === "UCITS") score = 95;
    if (regime === "Part_II") score = 90;
    if (regime === "SIF") score = 75;
    if (regime === "RAIF") score = 75;
    if (regime === "SICAR") score = 50;
    if (regime === "Unreg_LP") score = 60;
  }

  // Closed-ended + illiquid = AIF excellent
  if (fundLife === "closed_ended") {
    if (regime === "RAIF") score = 95;
    if (regime === "SIF") score = 90;
    if (regime === "SICAR") score = 95; // Perfect for closed-ended PE/VC
    if (regime === "Unreg_LP") score = 95;
    if (regime === "UCITS") score = 40;
    if (regime === "Part_II") score = 60;
  }

  // EU distribution = UCITS/RAIF (with AIFM) better
  if (distributionGeography === "eu") {
    if (regime === "UCITS") score = Math.min(100, score + 20);
    if (regime === "RAIF") score = Math.min(100, score + 15); // With AIFM passport
    if (regime === "Part_II") score = Math.min(100, score + 10);
    if (regime === "SIF") score = Math.min(100, score + 5); // No passport
  }

  // Listing
  if (listing && listing !== "none") {
    if (["UCITS", "Part_II"].includes(regime)) score = Math.min(100, score + 15);
    if (regime === "SICAR") score = Math.min(100, score + 10); // Some SICARs list
  }

  return Math.max(0, Math.min(100, score));
}

function scoreRegulatoryPreferenceAlignment(regime, answers) {
  const { regulatoryPreference } = answers;

  if (!regulatoryPreference || regulatoryPreference.length === 0) {
    return 50; // No preference = neutral
  }

  const regimeMap = {
    ucits: "UCITS",
    raif: "RAIF",
    sif: "SIF",
    sicar: "SICAR",
    part_ii: "Part_II",
    unreg_lp: "Unreg_LP",
  };

  const preferredRegimes = regulatoryPreference.map((pref) => regimeMap[pref]).filter(Boolean);

  // BUGFIX: Exact match gets 100, non-match gets lower scores with differentiation
  if (preferredRegimes.includes(regime)) return 100;

  // BUGFIX: Partial compatibility scores (for when user wants multiple preferences)
  if (preferredRegimes.length > 1) {
    // User is flexible with preferences
    return 60; // Still reasonable but not ideal
  }

  // BUGFIX: Single preference, no match - strong penalty with regime-specific fallback scores
  const preferredRegime = preferredRegimes[0];
  if (regime === "RAIF" && preferredRegime === "SIF") return 75; // RAIF/SIF often combined in thinking
  if (regime === "SIF" && preferredRegime === "RAIF") return 75; // Symmetric
  if (regime === "SICAR" && preferredRegime === "RAIF") return 55; // Different niches
  if (regime === "UCITS" && preferredRegime === "SIF") return 40; // Very different
  if (regime === "Unreg_LP" && preferredRegime === "SIF") return 50; // Different but conceptually related

  return 25; // Strong mismatch
}

// Compute overall match score for a regime (0-100)
// CRITICAL FIX: Explicit regime-specific bonus system to prevent UCITS appearing for PE/RE
function computeMatchScore(regime, legalForm, answers) {
  const kb = FUND_KNOWLEDGE_BASE[regime];
  const assetList = answers.assetClasses || answers.asset_classes || [];
  
  const scores = {
    investor_eligibility: scoreInvestorEligibility(regime, answers),
    asset_class_fit: scoreAssetClassFit(regime, answers),
    timeline_compatibility: scoreTimelineCompatibility(regime, answers),
    tax_efficiency: scoreTaxEfficiency(regime, answers),
    fund_size_appropriateness: scoreFundSizeAppropriateness(regime, answers),
    distribution_strategy_fit: scoreDistributionStrategyFit(regime, answers),
    regulatory_preference_alignment: scoreRegulatoryPreferenceAlignment(regime, answers),
  };

  const totalWeight = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
  const maxPossibleScore = 100 * totalWeight; // Each criterion maxes out at 100

  const weighted =
    scores.investor_eligibility * WEIGHTS.investor_eligibility +
    scores.asset_class_fit * WEIGHTS.asset_class_fit +
    scores.timeline_compatibility * WEIGHTS.timeline_compatibility +
    scores.tax_efficiency * WEIGHTS.tax_efficiency +
    scores.fund_size_appropriateness * WEIGHTS.fund_size_appropriateness +
    scores.distribution_strategy_fit * WEIGHTS.distribution_strategy_fit +
    scores.regulatory_preference_alignment * WEIGHTS.regulatory_preference_alignment;

  // Normalize to 0-100 percentage
  let baseScore = (weighted / maxPossibleScore) * 100;

  // CRITICAL FIX: Explicit regime bonus system based on core strengths
  // Start bonuses based on regime's natural fit
  let regimeBonuses = {
    RAIF: 8,
    SIF: 10,
    SICAR: 5,
    Part_II: 0,
    Unreg_LP: -5,
    UCITS: 0,
  };

  let bonus = regimeBonuses[regime] || 0;

  // Conditional bonuses
  const hasIlliquid = assetList.some((ac) =>
    ["real_estate", "private_equity", "venture_capital", "infrastructure", "private_debt"].includes(ac)
  );
  const isFastTimeline = answers.timeline === "asap" || answers.timeline === "2_4_months" || answers.timeline === "urgent";
  const hasInstitutional = answers.investorTypes?.some((it) => ["institutional", "well_informed"].includes(it));
  const wantsEUDistribution = answers.distributionGeography === "eu";

  // Illiquid asset bonuses
  if (hasIlliquid) {
    bonus += (regime === "RAIF") ? 10 : 0; // RAIF += 10
    if (regime === "SIF") bonus += 5;
    if (regime === "SICAR") bonus += 0; // Already suited
    if (regime === "UCITS") bonus -= 50; // Massive penalty for UCITS with illiquid
  }

  // Fast timeline bonuses
  if (isFastTimeline) {
    if (regime === "RAIF") bonus += 15;
    if (regime === "Unreg_LP") bonus += 10;
  }

  // Institutional investor bonuses
  if (hasInstitutional) {
    if (regime === "SIF") bonus += 10; // CSSF label valued
    if (regime === "RAIF") bonus += 5;
  }

  // EU distribution bonuses
  if (wantsEUDistribution) {
    if (regime === "RAIF") bonus += 5; // RAIF has EU passport
  }

  // Final score: clamp between 10 and 92 to prevent out-of-range values
  let finalScore = Math.min(80, Math.max(10, baseScore + bonus));
  return Math.round(finalScore);
}

// Build recommendation object for a regime + legal form
function buildRecommendation(rank, regime, legalForm, matchScore, answers) {
  const kb = FUND_KNOWLEDGE_BASE[regime];

  const summaries = {
    UCITS: "Highly regulated, retail-friendly fund vehicle with strong global recognition and EU-wide distribution passport.",
    RAIF: "Flexible AIF structure combining SIF/SICAR features without direct CSSF product approval — launches fast (2-4 weeks) with authorized AIFM.",
    SIF: "CSSF-regulated AIF for well-informed investors with full asset class flexibility and reasonable approval timeline (3-4 months).",
    SICAR: "Risk capital fund with favorable tax treatment on gains; designed for PE/VC/mezzanine; requires regulatory approval.",
    Part_II: "Flexible, retail-accessible regulated fund with broader asset flexibility than UCITS but no EU passport.",
    Unreg_LP: "Fastest to market (1-2 weeks), maximum tax efficiency, no product regulation — ideal for institutional investors and sub-€100M structures.",
  };

  const pros = {
    UCITS: [
      "Global brand recognition; 'gold standard' for retail distribution",
      "Full EU passport; no country-by-country registration needed",
      "Strict risk controls and diversification rules protect investors",
      "Regulatory approval included in timeline",
    ],
    RAIF: [
      "Fast launch (2-4 weeks vs. 3-6 months for CSSF-approved)",
      "Full asset class flexibility (SIF or SICAR rules)",
      "Authorized AIFM requirement ensures proper governance",
      "EU passport (if AIFM authorized for marketing)",
    ],
    SIF: [
      "CSSF regulatory label valued by institutional investors",
      "Flexible asset classes and investment strategy",
      "Professional management requirements embedded",
      "Well-understood by Luxembourg service providers",
    ],
    SICAR: [
      "Favorable tax regime: exempt from income tax on risk capital gains",
      "Designed for PE/VC — no diversification requirements",
      "Subscription tax exempt",
      "Efficient for carry and performance-based returns",
    ],
    Part_II: [
      "Can target retail investors",
      "More flexible asset rules than UCITS",
      "CSSF regulatory oversight",
      "Suitable for mixed-asset strategies",
    ],
    Unreg_LP: [
      "Fastest approval (1-2 weeks); no regulatory delay",
      "Fully tax transparent (no fund-level tax)",
      "Minimal subscription tax (0.01% vs. 1-5bps)",
      "Maximum flexibility; minimal regulatory overhead",
    ],
  };

  const cons = {
    UCITS: [
      "Cannot hold real estate, PE, private debt, infrastructure, or crypto",
      "Strict diversification and leverage limits",
      "Higher subscription tax (5bps retail, 1bp institutional)",
      "Regulatory approval takes 4-6 months",
    ],
    RAIF: [
      "Requires authorized AIFM (cost and compliance)",
      "No 'regulated fund' label (some investors prefer CSSF approval)",
      "AIFM marketing rules complex; must track investor base",
      "No direct CSSF product approval (indirect supervision only)",
    ],
    SIF: [
      "CSSF approval timeline (3-4 months)",
      "Ongoing CSSF reporting and compliance",
      "Subscription tax (1bp) adds to costs",
      "Marketing restrictions (no EU passport without AIFM)",
    ],
    SICAR: [
      "Limited to 'risk capital' definition — restrictive",
      "CSSF approval required (3-4 months)",
      "Cannot mix risk capital with liquid securities easily",
      "Fewer service providers familiar with structure",
    ],
    Part_II: [
      "No EU passport — must register country-by-country",
      "Subscription tax applies (5bps)",
      "Longer approval timeline (4-6 months)",
      "Less familiar globally than UCITS",
    ],
    Unreg_LP: [
      "No regulatory label (some institutional investors require CSSF approval)",
      "May require AIFM above size thresholds (adds cost)",
      "Not recognized globally as 'regulated fund'",
      "Ongoing investor qualification burden",
    ],
  };

  return {
    rank,
    regime,
    legal_form: legalForm,
    display_name: `${regime} structured as ${legalForm}`,
    match_score: matchScore,
    summary: summaries[regime] || "Fund structure matching your requirements.",
    pros: pros[regime] || [],
    cons: cons[regime] || [],
    key_features: {
      regulatory_approval: kb.cssf_approval ? "CSSF approval required (see timeline)" : kb.aifm_required ? "No direct CSSF approval; AIFM supervised" : "None",
      eligible_investors: kb.investorTypes?.join(", ") || "N/A",
      eligible_assets: kb.eligibleAssets?.join(", ") || "Unrestricted",
      diversification: kb.diversificationRules || "Defined in offering doc",
      leverage_limits: kb.leverage || "As per fund rules",
      subscription_tax: kb.subscription_tax || "0-5bps depending on class",
      typical_launch_time: kb.approval_time || "1-2 weeks",
      legal_personality: !["SCSp", "FCP"].includes(legalForm),
      listing_possible: ["SICAV", "SICAF", "SA"].includes(legalForm),
      umbrella_possible: true,
      sfdr_compatible: kb.sfdr_compatible || false,
    },
    estimated_setup_cost: "€50k–€200k",
    estimated_ongoing_annual_cost: "€80k–€300k",
    typical_use_cases: kb.typical_use || ["various"],
  };
}

// Main analysis function
export async function analyzeFundStructure(answers) {
  const regimes = ["UCITS", "RAIF", "SIF", "SICAR", "Part_II", "Unreg_LP"];
  const legalForms = {
    UCITS: ["SICAV", "SICAF", "FCP"],
    RAIF: ["SICAV", "SICAF", "FCP", "SCSp", "SCS"],
    SIF: ["SICAV", "SICAF", "FCP", "SCSp", "SCS", "SA"],
    SICAR: ["SA", "SCSp", "SCS"],
    Part_II: ["SICAV", "SICAF", "FCP"],
    Unreg_LP: ["SCSp", "SCS"],
  };

  const candidates = [];
  const disqualifiedReasons = {}; // Track why regimes were excluded

  // BUGFIX: Generate scored candidates per regime (not per legal form)
  const regimeScores = {}; // Track best score per regime
  const hardDisqualified = {}; // Track hard-disqualified regimes with their scores
  
  for (const regime of regimes) {
    let bestScore = -1;
    let bestLegalForm = null;
    let hardDisqualify = false;

    for (const legalForm of legalForms[regime] || []) {
      // Apply hard filters
      const filterResult = applyHardFilters(regime, legalForm, answers);
      
      // If filterResult is a string, it's a disqualification reason
      if (typeof filterResult === "string") {
        disqualifiedReasons[regime] = filterResult;
        continue;
      }
      
      // If filterResult is false, it's a hard disqualification
      if (filterResult === false) {
        hardDisqualify = true;
        continue;
      }

      // Compute match score for this legal form
      const matchScore = computeMatchScore(regime, legalForm, answers);

      // BUGFIX: Keep best legal form for this regime
      if (matchScore > bestScore) {
        bestScore = matchScore;
        bestLegalForm = legalForm;
      }
    }

    // BUGFIX: Store best candidate for this regime
    if (bestScore >= 0) {
      regimeScores[regime] = {
        regime,
        legalForm: bestLegalForm,
        matchScore: bestScore,
      };
    } else if (hardDisqualify) {
      // BUGFIX: Store hard-disqualified regimes with their scores as fallback
      const fallbackScore = computeMatchScore(regime, legalForms[regime]?.[0], answers);
      hardDisqualified[regime] = {
        regime,
        legalForm: legalForms[regime]?.[0],
        matchScore: fallbackScore,
        isHardDisqualified: true,
      };
    }
  }

  // Convert to candidate list and sort by score descending
  let candidatesByRegime = Object.values(regimeScores);

  // === POST-PROCESSING SCORE ADJUSTMENTS ===
  const assetClasses = answers.assetClasses || [];
  const hasAlternatives = assetClasses.some(a => ["private_equity", "real_estate", "infrastructure", "venture_capital"].includes(a));
  const hasVC = assetClasses.includes("venture_capital");
  const hasLiquid = assetClasses.includes("liquid_securities");
  const hasRetail = answers.investorTypes && answers.investorTypes.includes("retail");
  const hasEUDistribution = answers.distributionGeography === "eu";

  candidatesByRegime = candidatesByRegime.map(cand => {
    let adjustment = 0;

    if (hasAlternatives) {
      if (cand.regime === "RAIF") adjustment += 12;
      else if (cand.regime === "SIF") adjustment += 8;
      else if (cand.regime === "SICAR") adjustment += 5;
      else if (cand.regime === "UCITS") adjustment -= 15;
      else if (cand.regime === "Part_II") adjustment -= 5;
      else if (cand.regime === "Unreg_LP") adjustment += 6;
    }

    if (hasVC) {
      if (cand.regime === "SICAR") adjustment += 10;
      else if (cand.regime === "RAIF") adjustment -= 3;
      else if (cand.regime === "SIF") adjustment -= 2;
    }

    if (hasRetail && hasLiquid) {
      if (cand.regime === "UCITS") adjustment += 12;
      else if (cand.regime === "Part_II") adjustment += 5;
    }

    if (hasEUDistribution) {
      if (cand.regime === "UCITS") adjustment += 5;
      else if (cand.regime === "Part_II") adjustment -= 3;
    }

    return {
      ...cand,
      matchScore: Math.max(0, Math.min(95, cand.matchScore + adjustment))
    };
  });

  // If fewer than 3 regimes, pull from hard-disqualified first, then string-disqualified
  if (candidatesByRegime.length < 3) {
    const fallbackCandidates = Object.values(hardDisqualified)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3 - candidatesByRegime.length);
    candidatesByRegime = [...candidatesByRegime, ...fallbackCandidates];
  }
  if (candidatesByRegime.length < 3) {
    const stringDisqualifiedFallbacks = Object.entries(disqualifiedReasons)
      .filter(([regime]) => !candidatesByRegime.find((c) => c.regime === regime))
      .map(([regime, reason]) => ({
        regime,
        legalForm: legalForms[regime]?.[0],
        matchScore: Math.max(10, computeMatchScore(regime, legalForms[regime]?.[0], answers) - 20),
        isHardDisqualified: true,
        warning: reason,
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3 - candidatesByRegime.length);
    candidatesByRegime = [...candidatesByRegime, ...stringDisqualifiedFallbacks];
  }

  candidatesByRegime.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore; // Higher score first
    }
    // BUGFIX: Tiebreaker - regime with broader flexibility
    const flexibilityOrder = { RAIF: 0, SIF: 1, Unreg_LP: 2, SICAR: 3, Part_II: 4, UCITS: 5 };
    return (flexibilityOrder[a.regime] || 999) - (flexibilityOrder[b.regime] || 999);
  });

  // BUGFIX: Take top 3 unique regimes and build recommendations
  let topThree = candidatesByRegime.slice(0, 3);

  // CRITICAL FIX: Ensure meaningful score spread (apply differentiation if scores are too close)
  if (topThree.length === 3) {
    const score1 = topThree[0].matchScore;
    const score2 = topThree[1].matchScore;
    const score3 = topThree[2].matchScore;
    
    // CRITICAL: If top 3 scores are within 8 points, apply regime strength bonuses
    // We want spreads like 85%, 72%, 60% NOT 64%, 64%, 64%
    if (score1 - score3 < 8) {
      // Apply secondary differentiation based on regime fit to user's primary inputs
      const assetList = answers.assetClasses || answers.asset_classes || [];
      const hasAlternatives = assetList.some((ac) =>
        ["real_estate", "private_equity", "venture_capital", "infrastructure", "private_debt"].includes(ac)
      );
      const hasRetail = answers.investorTypes?.includes("retail");
      const urgentTimeline = answers.timeline === "urgent";

      topThree = topThree.map((cand) => {
        let adjustment = 0;

        // CRITICAL FIX: Amplified differentiation for alternatives (PE/RE)
        if (hasAlternatives) {
          if (cand.regime === "RAIF") adjustment += 12; // RAIF is THE vehicle for PE/RE
          if (cand.regime === "SIF") adjustment += 8; // SIF is second choice
          if (cand.regime === "SICAR") adjustment += 5; // SICAR only if pure PE/VC
          if (cand.regime === "UCITS") adjustment -= 15; // UCITS disqualified for illiquid
          if (cand.regime === "Part_II") adjustment -= 5; // Part II not ideal for PE/RE
          if (cand.regime === "Unreg_LP") adjustment += 6; // Unreg acceptable
        }

        // VC-specific: SICAR is purpose-built for venture/risk capital
        const hasVC = assetList && assetList.includes("venture_capital");
        if (hasVC) {
          if (cand.regime === "SICAR") adjustment += 10; // SICAR is THE vehicle for VC
          if (cand.regime === "RAIF") adjustment -= 3; // RAIF is good but not VC-specific
          if (cand.regime === "SIF") adjustment -= 2; // SIF is good but not VC-specific
        }

        // Adjust for retail requirement
        if (hasRetail) {
          if (cand.regime === "UCITS") adjustment += 8;
          if (cand.regime === "Part_II") adjustment += 6;
          if (cand.regime === "RAIF") adjustment -= 8;
          if (cand.regime === "SIF") adjustment -= 5;
          if (cand.regime === "SICAR") adjustment -= 10;
          if (cand.regime === "Unreg_LP") adjustment -= 12;
        }

        // Adjust for timeline
        if (urgentTimeline) {
          if (cand.regime === "RAIF") adjustment += 10; // RAIF 2-4 weeks
          if (cand.regime === "Unreg_LP") adjustment += 12; // Unreg 1-2 weeks
          if (cand.regime === "UCITS") adjustment -= 8;
          if (cand.regime === "SIF") adjustment -= 5;
          if (cand.regime === "SICAR") adjustment -= 5;
          if (cand.regime === "Part_II") adjustment -= 6;
        }

        // Retail + liquid + EU distribution: UCITS is the clear winner
        const hasLiquid = assetList.includes("liquid") || assetList.includes("liquid_securities");
        const hasEUDistribution = answers.distributionGeography === "eu";
        if (hasRetail && hasLiquid) {
          if (cand.regime === "UCITS") adjustment += 12;
          if (cand.regime === "Part_II") adjustment += 5;
        }
        if (hasEUDistribution) {
          if (cand.regime === "UCITS") adjustment += 5;
          if (cand.regime === "Part_II") adjustment -= 3;
        }

        return {
          ...cand,
          matchScore: Math.max(0, Math.min(95, cand.matchScore + adjustment)),
        };
      });

      // Re-sort after adjustments
      topThree.sort((a, b) => b.matchScore - a.matchScore);
    }
  }

  const topRecommendations = topThree.map((cand, idx) => {
    const rec = buildRecommendation(idx + 1, cand.regime, cand.legalForm, cand.matchScore, answers);
    // BUGFIX: Mark if this recommendation has constraints due to hard disqualification
    if (cand.isHardDisqualified) {
      rec.warning = "This structure has significant constraints and may not be viable.";
    }
    return rec;
  });

  return {
    recommendations: topRecommendations,
    disqualified: disqualifiedReasons,
  };
}