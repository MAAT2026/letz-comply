import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ArrowDown, ArrowUpDown } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA  (CSSF 18/698 structure)
// ─────────────────────────────────────────────────────────────────────────────

const NODES = {
  board: {
    id: "board", label: "Board of Directors", icon: "🏛️",
    color: "#1e3a8a", bg: "#dbeafe", border: "#3b82f6", tag: "Governance",
    description: "The governing body of the IFM. Must have at least 3 members with a majority of non-executive directors. Sets strategy, approves policies, and receives annual reports from all three lines of defence.",
    responsibilities: [
      "Sets investment strategy and overall risk appetite",
      "Approves the compliance charter, risk management procedure, and internal audit charter",
      "Receives annual reports from compliance, risk management, and internal audit",
      "Approves delegation arrangements and material outsourcing decisions",
      "Supervises the conducting officers",
    ],
    flows: [
      { to: "conducting-officers", label: "Strategic direction, delegation approvals", type: "governance" },
      { to: "internal-audit", label: "Receives independent annual audit report", type: "reporting" },
      { to: "compliance", label: "Receives annual compliance summary report", type: "reporting" },
      { to: "risk", label: "Receives annual Risk Management Procedure (RMP)", type: "reporting" },
    ],
    keyReg: "CSSF 18/698 §§59-77",
  },

  "conducting-officers": {
    id: "conducting-officers", label: "Conducting Officers (min. 2)", icon: "👔",
    color: "#0c4a6e", bg: "#e0f2fe", border: "#0ea5e9", tag: "Executive",
    description: "The two minimum CSSF-pre-approved executives who effectively conduct the business of the IFM. Permanently based in Luxembourg. Collectively responsible for all key functions. One conducting officer cannot simultaneously head both a risk-taking function (e.g. portfolio management) and a risk-control function (e.g. risk management).",
    responsibilities: [
      "Collectively responsible for all key IFM functions per §94",
      "Day-to-day management of the IFM",
      "CSSF primary point of contact for operational matters",
      "Ensure letter-box entity rules are not breached (§413-414)",
      "Approve and monitor all delegation arrangements",
    ],
    flows: [
      { to: "portfolio-management", label: "Investment mandate and strategy", type: "governance" },
      { to: "valuation", label: "Valuation oversight mandate", type: "governance" },
      { to: "compliance", label: "Compliance direction and resources", type: "governance" },
      { to: "risk", label: "Risk appetite and risk tolerance", type: "governance" },
      { to: "aml", label: "AML/CFT mandate", type: "governance" },
      { to: "accounting", label: "Accounting oversight", type: "governance" },
      { to: "operations", label: "Operational direction", type: "governance" },
      { to: "it", label: "IT governance and cloud officer designation", type: "governance" },
      { to: "legal", label: "Legal and fund documentation oversight", type: "governance" },
      { to: "investor-relations", label: "Distribution and investor service oversight", type: "governance" },
    ],
    keyReg: "CSSF 18/698 §§78-96",
  },

  "internal-audit": {
    id: "internal-audit", label: "Internal Audit", icon: "🔎",
    color: "#581c87", bg: "#f5f3ff", border: "#a855f7", tag: "3rd Line",
    description: "The fully independent third line of defence. Reports exclusively to the Board — not to the conducting officers. Cannot be performed by the same person responsible for compliance (§169). Follows a multi-year, risk-based audit plan covering all IFM activities.",
    responsibilities: [
      "Independent review of all IFM activities and internal controls",
      "Multi-year risk-based audit plan, approved by the Board",
      "Annual audit report submitted to the CSSF within 5 months of year-end",
      "Assess the adequacy and effectiveness of 1st and 2nd line controls",
      "No operational responsibilities — purely independent review",
    ],
    flows: [
      { to: "board", label: "Annual internal audit report (direct to Board only)", type: "reporting" },
    ],
    keyReg: "CSSF 18/698 §§261-299",
  },

  compliance: {
    id: "compliance", label: "Compliance", icon: "✅",
    color: "#065f46", bg: "#d1fae5", border: "#34d399", tag: "2nd Line",
    description: "Permanent, independent second line function governed by a written Compliance Charter (§230) approved by the Board. Headed by a CSSF-pre-approved Compliance Officer permanently based in Luxembourg. Monitors regulatory obligations, manages conflicts of interest, and oversees AML/CFT.",
    responsibilities: [
      "Regulatory monitoring: identify all rules the IFM is subject to",
      "Assess compliance risks and report to senior management",
      "Manage conflicts of interest policy and register",
      "Oversee and coordinate AML/CFT obligations",
      "Annual compliance summary report to CSSF within 5 months of year-end",
    ],
    flows: [
      { to: "board", label: "Annual compliance summary report", type: "reporting" },
      { to: "conducting-officers", label: "Compliance alerts, regulatory updates, breaches", type: "reporting" },
      { to: "aml", label: "AML/CFT oversight, escalation of high-risk cases", type: "operational" },
      { to: "legal", label: "Regulatory change coordination", type: "operational" },
      { to: "portfolio-management", label: "Mandate and market abuse compliance monitoring", type: "operational" },
    ],
    keyReg: "CSSF 18/698 §§226-260",
  },

  risk: {
    id: "risk", label: "Risk Management", icon: "⚠️",
    color: "#92400e", bg: "#fef3c7", border: "#f59e0b", tag: "2nd Line",
    description: "Permanent, independent second line function. Must be hierarchically and functionally separate from portfolio management (§200). Responsible for identifying, measuring, and controlling all risks across the funds managed. Submits the annual Risk Management Procedure (RMP) to the CSSF.",
    responsibilities: [
      "Monitor market, credit, liquidity, counterparty and operational risk",
      "Maintain and submit annual RMP to CSSF within 5 months of year-end",
      "Conduct stress testing and scenario analysis across all managed funds",
      "Report risk limit breaches immediately to conducting officers and Board",
      "Validate internal models and pricing of complex or illiquid instruments",
    ],
    flows: [
      { to: "board", label: "Annual Risk Management Procedure (RMP)", type: "reporting" },
      { to: "conducting-officers", label: "Risk limit breach alerts and risk dashboards", type: "reporting" },
      { to: "portfolio-management", label: "Risk limits, VaR/leverage monitoring, breach notifications", type: "operational" },
      { to: "valuation", label: "Fair value challenge and illiquid asset pricing oversight", type: "operational" },
    ],
    keyReg: "CSSF 18/698 §§188-220 | Circ. 11/512",
  },

  "portfolio-management": {
    id: "portfolio-management", label: "Portfolio Management", icon: "📈",
    color: "#3730a3", bg: "#e0e7ff", border: "#818cf8", tag: "1st Line",
    description: "Core first line function responsible for executing investment decisions within approved mandates and risk limits. Must be strictly organisationally separate from the risk management function (§200). Often the most common function to be delegated to a sub-manager or portfolio manager under the delegation framework.",
    responsibilities: [
      "Investment decision-making within mandate guidelines and risk limits",
      "Best execution policy implementation (MiFID II)",
      "Portfolio construction, rebalancing, and hedging",
      "Trade order generation and execution",
      "Frequently delegated to an external sub-investment manager",
    ],
    flows: [
      { to: "risk", label: "Trade blotters, positions, and limit utilisation", type: "operational" },
      { to: "valuation", label: "Pricing challenges and fair value inputs for illiquid assets", type: "operational" },
      { to: "operations", label: "Trade instructions for settlement and booking", type: "operational" },
    ],
    keyReg: "CSSF 18/698 §200 | MiFID II",
  },

  valuation: {
    id: "valuation", label: "Valuation", icon: "📊",
    color: "#075985", bg: "#e0f2fe", border: "#38bdf8", tag: "1st Line",
    description: "Must be functionally independent from portfolio management to avoid conflicts of interest in pricing. The IFM retains ultimate responsibility for valuation even when delegated to the fund administrator. Governed by the valuation policy approved by the Board.",
    responsibilities: [
      "Oversight of NAV calculation performed by the fund administrator",
      "Validation of pricing sources and application of fair value methodology",
      "Error detection and 24-hour correction reporting (Circular 24/856)",
      "Maintenance of the fund valuation policy",
      "Approval of independent price verification for complex instruments",
    ],
    flows: [
      { to: "accounting", label: "Validated NAV figures and pricing data for fund accounts", type: "operational" },
      { to: "risk", label: "Fair value assessments for illiquid and hard-to-value assets", type: "operational" },
      { to: "fund-administrator", label: "NAV oversight, validation, and error correction instructions", type: "delegation" },
    ],
    keyReg: "CSSF 02/77 | Circular 24/856",
  },

  aml: {
    id: "aml", label: "AML / Financial Crime", icon: "🛡️",
    color: "#9f1239", bg: "#ffe4e6", border: "#fb7185", tag: "1st Line",
    description: "Two CSSF-pre-approved AML/CFT officers required: one at senior management level and one for day-to-day operations. Both permanently based in Luxembourg. Responsible for the enterprise-wide AML/CFT risk assessment, KYC/UBO procedures, and STR filing with the FIU.",
    responsibilities: [
      "Annual enterprise-wide AML/CFT risk assessment",
      "KYC / CDD on all investors, including UBO identification",
      "Suspicious Transaction Report (STR) filing with the Luxembourg FIU",
      "Enhanced due diligence for PEPs and high-risk investors",
      "Annual AML/CFT report to CSSF within 5 months of year-end",
    ],
    flows: [
      { to: "compliance", label: "Annual AML/CFT report and high-risk escalations", type: "reporting" },
      { to: "investor-relations", label: "Investor KYC clearance before onboarding", type: "operational" },
      { to: "fund-administrator", label: "Investor due diligence coordination with transfer agent", type: "delegation" },
    ],
    keyReg: "CSSF 18/698 §§300-380",
  },

  accounting: {
    id: "accounting", label: "Accounting", icon: "📒",
    color: "#4c1d95", bg: "#ede9fe", border: "#c4b5fd", tag: "1st Line",
    description: "Responsible for fund accounting, financial statements, and regulatory filings. All accounting documents must always be accessible at the Luxembourg head office (§149). The person responsible for accounting must be notified to the CSSF (§146). Often performed by the fund administrator under delegation.",
    responsibilities: [
      "Fund accounting and preparation of annual financial statements",
      "Luxembourg subscription tax (taxe d'abonnement) filings",
      "Ensure all documents accessible at Luxembourg HQ at all times (§149)",
      "CSSF notification of person responsible for the accounting function (§146)",
      "Oversight of accounting delegated to fund administrator",
    ],
    flows: [
      { to: "conducting-officers", label: "Management accounts, financial statements", type: "reporting" },
      { to: "operations", label: "Reconciliation data and financial records", type: "operational" },
      { to: "fund-administrator", label: "Accounting oversight and reconciliation sign-off", type: "delegation" },
    ],
    keyReg: "CSSF 18/698 §§145-153",
  },

  operations: {
    id: "operations", label: "Operations", icon: "⚙️",
    color: "#1e293b", bg: "#f1f5f9", border: "#94a3b8", tag: "1st Line",
    description: "Coordinates day-to-day operational processes: trade settlement, corporate actions, transfer agency oversight, and business continuity. Responsible for DORA operational resilience framework implementation and ongoing monitoring of operational delegates.",
    responsibilities: [
      "Trade settlement, booking, and corporate actions processing",
      "Business Continuity Plan (BCP) maintenance and annual testing",
      "Annual operational resilience testing (DORA / CSSF 25/901)",
      "Oversight of fund administrator and transfer agent SLAs",
      "Map and manage critical third-party operational dependencies",
    ],
    flows: [
      { to: "fund-administrator", label: "Operational instructions, SLA monitoring, and oversight", type: "delegation" },
      { to: "it", label: "System requirements, incident escalation, BCP coordination", type: "operational" },
      { to: "accounting", label: "Settlement and reconciliation data", type: "operational" },
    ],
    keyReg: "CSSF 25/901 | DORA",
  },

  it: {
    id: "it", label: "IT / Data", icon: "💻",
    color: "#be185d", bg: "#fce7f3", border: "#f472b6", tag: "1st Line",
    description: "Responsible for the IFM's IT infrastructure, data management, and digital resilience. Must designate a dedicated cloud officer if cloud services are used (§143). Owns the DORA compliance programme including annual ICT resilience testing and major incident reporting.",
    responsibilities: [
      "IT risk management framework and data security",
      "Designate a cloud officer responsible for cloud services (§143)",
      "Annual ICT resilience testing and threat-led penetration testing (DORA)",
      "4-hour major ICT incident reporting to CSSF capability",
      "Formal third-party ICT risk management programme",
    ],
    flows: [
      { to: "conducting-officers", label: "ICT incident reports and annual resilience test results", type: "reporting" },
      { to: "operations", label: "System support, BCP technical coverage", type: "operational" },
      { to: "risk", label: "Technology and operational risk data", type: "operational" },
    ],
    keyReg: "CSSF 18/698 §§134-143 | DORA",
  },

  legal: {
    id: "legal", label: "Legal / Fund Law", icon: "⚖️",
    color: "#78350f", bg: "#fef9c3", border: "#fbbf24", tag: "1st Line",
    description: "Manages fund documentation, delegation agreements, and regulatory implementation. Coordinates with compliance on regulatory change and with external counsel. Responsible for ensuring the delegation framework is contractually robust and that fund documents are kept current.",
    responsibilities: [
      "Fund documentation: prospectus, KIID/KID, and constitutional documents",
      "Delegation agreement drafting, review, and negotiation",
      "AIFMD II implementation and regulatory change project management",
      "Third-party contract review for DORA and delegation framework compliance",
      "Coordination with external Luxembourg and foreign counsel",
    ],
    flows: [
      { to: "compliance", label: "Legal opinions and regulatory change analysis", type: "operational" },
      { to: "investor-relations", label: "Updated fund documentation and marketing materials", type: "operational" },
      { to: "fund-administrator", label: "Delegation agreements and service level agreements", type: "delegation" },
    ],
    keyReg: "AIFMD II | CSSF 18/698 Ch. 6",
  },

  "investor-relations": {
    id: "investor-relations", label: "Investor Relations", icon: "🤝",
    color: "#134e4a", bg: "#ccfbf1", border: "#2dd4bf", tag: "1st Line",
    description: "Manages investor communications, subscription and redemption processing, SFDR disclosures, and fund distribution. Works with AML on investor KYC and with compliance on marketing approval. Investor complaint handling must be overseen by compliance — not solely by distributors.",
    responsibilities: [
      "Investor onboarding and KYC coordination with AML",
      "Subscription and redemption processing",
      "SFDR pre-contractual and periodic disclosure management",
      "Investor reporting, complaints handling, and fund marketing",
      "Distribution agreement oversight and distributor monitoring",
    ],
    flows: [
      { to: "aml", label: "Investor KYC and UBO data for due diligence", type: "operational" },
      { to: "fund-administrator", label: "Subscription and redemption instructions to transfer agent", type: "delegation" },
      { to: "legal", label: "Marketing material legal and compliance review", type: "operational" },
    ],
    keyReg: "SFDR | ESMA Fund Naming Guidelines",
  },

  "fund-administrator": {
    id: "fund-administrator", label: "Fund Administrator", icon: "🏦",
    color: "#374151", bg: "#f9fafb", border: "#9ca3af", tag: "External Delegate",
    description: "A third-party service provider appointed under the IFM's delegation framework to perform fund accounting, NAV calculation, transfer agency, and regulatory reporting. The IFM retains full responsibility and must perform ongoing monitoring. Monitoring of delegates cannot itself be sub-delegated (§451).",
    responsibilities: [
      "NAV calculation (under IFM valuation oversight and sign-off)",
      "Transfer agency: shareholder register, subscriptions, and redemptions",
      "Fund accounting and production of financial statements",
      "Regulatory reporting: Annex IV, BCL statistical returns, etc.",
      "Subject to IFM initial due diligence and ongoing monitoring",
    ],
    flows: [
      { to: "valuation", label: "NAV drafts, pricing queries, and error notifications", type: "delegation" },
      { to: "accounting", label: "Accounting records, trial balances, and reports", type: "delegation" },
      { to: "operations", label: "SLA reports, operational metrics, and incident notifications", type: "delegation" },
    ],
    keyReg: "CSSF 18/698 §§418-451",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STYLE CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const TAG_STYLES = {
  "Governance":        { bg: "bg-blue-100",    text: "text-blue-800" },
  "Executive":         { bg: "bg-sky-100",      text: "text-sky-800" },
  "3rd Line":          { bg: "bg-purple-100",   text: "text-purple-800" },
  "2nd Line":          { bg: "bg-amber-100",    text: "text-amber-700" },
  "1st Line":          { bg: "bg-emerald-100",  text: "text-emerald-700" },
  "External Delegate": { bg: "bg-gray-100",     text: "text-gray-600" },
};

const FLOW_TYPE_STYLES = {
  governance:  "bg-blue-50   border-blue-200   text-blue-700",
  reporting:   "bg-purple-50 border-purple-200 text-purple-700",
  operational: "bg-emerald-50 border-emerald-200 text-emerald-700",
  delegation:  "bg-amber-50  border-amber-200  text-amber-700",
};

// ─────────────────────────────────────────────────────────────────────────────
// NODE CARD
// ─────────────────────────────────────────────────────────────────────────────

function NodeCard({ id, onClick, isHighlighted, isSelected }) {
  const node = NODES[id];
  if (!node) return null;
  const tagStyle = TAG_STYLES[node.tag] || {};
  return (
    <button
      onClick={() => onClick(id)}
      className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border-2 transition-all duration-150 text-center w-[130px] shrink-0"
      style={{
        borderColor: isSelected ? node.color : node.border,
        backgroundColor: isHighlighted ? node.bg : "#f8fafc",
        opacity: isHighlighted ? 1 : 0.3,
        boxShadow: isSelected ? `0 0 0 4px ${node.color}25` : "none",
        transform: isSelected ? "scale(1.04)" : "scale(1)",
      }}
    >
      <span className="text-2xl leading-none">{node.icon}</span>
      <span className="text-[11px] font-semibold leading-snug" style={{ color: isHighlighted ? node.color : "#64748b" }}>
        {node.label}
      </span>
      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${tagStyle.bg} ${tagStyle.text}`}>
        {node.tag}
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION LABEL
// ─────────────────────────────────────────────────────────────────────────────

function SectionLabel({ color, children }) {
  return (
    <div className="flex items-center gap-3 w-full max-w-4xl px-2">
      <div className="flex-1 h-px" style={{ backgroundColor: color + "50" }} />
      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border" style={{ color, borderColor: color + "40", backgroundColor: color + "08" }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: color + "50" }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DELEGATION SEPARATOR
// ─────────────────────────────────────────────────────────────────────────────

function DelegationSeparator() {
  return (
    <div className="w-full max-w-4xl px-2 py-2">
      <div className="relative flex items-center justify-center">
        {/* dashed border line */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-amber-300" />
        {/* centre label */}
        <div className="relative z-10 flex items-center gap-2 bg-amber-50 border border-amber-300 text-amber-700 rounded-lg px-4 py-2 shadow-sm">
          <ArrowUpDown className="w-3.5 h-3.5 shrink-0" />
          <div className="text-center">
            <p className="text-[11px] font-bold leading-tight">Delegation Boundary</p>
            <p className="text-[9px] font-medium text-amber-600 leading-tight mt-0.5">
              IFM retains full responsibility · Ongoing monitoring required · Sub-delegation of monitoring prohibited
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONNECTOR
// ─────────────────────────────────────────────────────────────────────────────

function Connector({ height = 6 }) {
  return <div className="w-px bg-border mx-auto" style={{ height: `${height * 4}px` }} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

export default function OrgWeb() {
  const [selected, setSelected] = useState(null);
  const selectedNode = selected ? NODES[selected] : null;

  const highlightedIds = selectedNode
    ? new Set([selectedNode.id, ...(selectedNode.flows || []).map(f => f.to)])
    : new Set(Object.keys(NODES));

  const handleClick = (id) => setSelected(prev => prev === id ? null : id);

  const Row = ({ ids, gap = "gap-4" }) => (
    <div className={`flex flex-wrap justify-center ${gap}`}>
      {ids.map(id => (
        <NodeCard key={id} id={id} onClick={handleClick}
          isHighlighted={highlightedIds.has(id)} isSelected={selected === id} />
      ))}
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground">AIFM / ManCo Organisation Structure</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Based on CSSF Circular 18/698 · Click any box to explore its role and information flows
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(TAG_STYLES).map(([label, style]) => (
          <span key={label} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
            {label}
          </span>
        ))}
      </div>

      {/* Side-by-side layout */}
      <div className="flex gap-6 items-start">

        {/* LEFT: Chart */}
        <div className="flex-1 min-w-0 overflow-x-auto">
          <div className="min-w-[520px] flex flex-col items-center gap-0 py-4">

            <Row ids={["board"]} />
            <Connector height={6} />

            <Row ids={["conducting-officers"]} />
            <Connector height={6} />

            <SectionLabel color="#7c3aed">3rd Line · Independent Assurance</SectionLabel>
            <div className="h-3" />
            <Row ids={["internal-audit"]} />
            <div className="h-5" />

            <SectionLabel color="#d97706">2nd Line · Independent Control</SectionLabel>
            <div className="h-3" />
            <Row ids={["compliance", "risk"]} gap="gap-6" />
            <Connector height={6} />

            <SectionLabel color="#059669">1st Line · Operational Functions</SectionLabel>
            <div className="h-3" />
            <Row ids={["portfolio-management", "valuation", "aml", "accounting"]} gap="gap-4" />
            <div className="h-4" />
            <Row ids={["operations", "it", "legal", "investor-relations"]} gap="gap-4" />
            <div className="h-6" />

            <DelegationSeparator />
            <div className="h-6" />

            <SectionLabel color="#374151">External Delegates</SectionLabel>
            <div className="h-3" />
            <Row ids={["fund-administrator"]} />

          </div>
        </div>

        {/* RIGHT: Detail panel (sticky) */}
        <div className="w-[340px] shrink-0 sticky top-4">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.18 }}
              >
                <Card className="p-4 border-2" style={{ borderColor: selectedNode.border, backgroundColor: selectedNode.bg + "44" }}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{selectedNode.icon}</span>
                      <div>
                        <h3 className="font-bold text-sm leading-tight">{selectedNode.label}</h3>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${TAG_STYLES[selectedNode.tag]?.bg} ${TAG_STYLES[selectedNode.tag]?.text}`}>
                            {selectedNode.tag}
                          </span>
                          <Badge variant="outline" className="text-[9px]" style={{ borderColor: selectedNode.border, color: selectedNode.color }}>
                            {selectedNode.keyReg}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-foreground/80 mb-3 leading-relaxed">{selectedNode.description}</p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Key Responsibilities</p>
                      <ul className="space-y-1.5">
                        {selectedNode.responsibilities.map((r, i) => (
                          <li key={i} className="text-[11px] text-muted-foreground flex gap-1.5">
                            <span className="mt-0.5 shrink-0 font-bold" style={{ color: selectedNode.color }}>•</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedNode.flows && selectedNode.flows.length > 0 && (
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Information Flows</p>
                        <div className="space-y-2">
                          {selectedNode.flows.map((flow, i) => {
                            const target = NODES[flow.to];
                            if (!target) return null;
                            return (
                              <div key={i} className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <button
                                    onClick={() => setSelected(flow.to)}
                                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded border shrink-0 hover:opacity-75 transition-opacity"
                                    style={{ borderColor: target.border, color: target.color, backgroundColor: target.bg }}
                                  >
                                    {target.icon} {target.label}
                                  </button>
                                  <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium ${FLOW_TYPE_STYLES[flow.type] || ""}`}>
                                    {flow.type}
                                  </span>
                                </div>
                                <p className="text-[10px] text-muted-foreground pl-0.5">{flow.label}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="p-6 border-dashed flex flex-col items-center justify-center text-center gap-2 min-h-[200px]">
                  <span className="text-3xl">👈</span>
                  <p className="text-xs font-medium text-muted-foreground">Click any department to explore its role and information flows</p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}