import React from "react";

const NODE_ACCENT = {
  investors:  "#3b82f6",
  feeder:     "#a78bfa",
  fund:       "#6366f1",
  gp:         "#ef4444",
  manco:      "#f59e0b",
  advisor:    "#10b981",
  carry:      "#ec4899",
  depositary: "#14b8a6",
  spv:        "#6366f1",
  coinvest:   "#f97316",
  portfolio:  "#10b981",
};

const NODE_ICON = {
  investors:  "👥",
  feeder:     "🔀",
  fund:       "🏛",
  gp:         "⚖️",
  manco:      "🏢",
  advisor:    "💡",
  carry:      "💼",
  depositary: "🏦",
  spv:        "🏗",
  coinvest:   "🤝",
  portfolio:  "📊",
};

function fmt(n) {
  if (!n) return null;
  const num = Number(n);
  if (isNaN(num)) return null;
  if (num >= 1e9) return `€${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `€${(num / 1e6).toFixed(0)}M`;
  return `€${num.toLocaleString()}`;
}

function shortRegime(regime) {
  if (!regime) return null;
  if (regime.includes("UCITS")) return "UCITS";
  if (regime.includes("Sub-threshold")) return "Sub-threshold AIFM";
  if (regime.includes("Full AIFM")) return "Full AIFM";
  if (regime.includes("Registered")) return "Registered AIF";
  if (regime.includes("Unregulated")) return "Unregulated";
  return regime.split(" ")[0];
}

function fmtInvestorTypes(types) {
  if (!types?.length) return null;
  const display = types.slice(0, 3).join(" · ");
  const extra = types.length > 3 ? ` +${types.length - 3}` : "";
  return display + extra;
}

function trunc(s, max = 20) {
  if (!s) return null;
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

function shortFundType(fundType) {
  if (!fundType) return null;
  if (fundType.includes("Closed")) return "Closed-ended";
  if (fundType.includes("Open")) return "Open-ended";
  if (fundType.includes("Semi")) return "Semi-open-ended";
  if (fundType.includes("Single")) return "Single asset";
  if (fundType.includes("Fund of Funds")) return "Fund of Funds";
  return null;
}

const BASE_W = 300;
const BASE_H = 650;
const NODE_W = 240;
const NODE_W_SM = 160;
const NODE_H = 70;

function buildLayout(enabledCount) {
  const scale = enabledCount > 8 ? 0.75 : enabledCount > 6 ? 0.85 : 1;
  const basePositions = {
    investors:  { idx: 0 },
    feeder:     { idx: 1 },
    fund:       { idx: 2 },
    advisor:    { idx: 3 },
    gp:         { idx: 4 },
    carry:      { idx: 5 },
    manco:      { idx: 6 },
    depositary: { idx: 7 },
  };

  const spacing = 90 * scale;
  const W = BASE_W * scale;
  const H = BASE_H * scale;

  const NODE_POS = {};
  const POS = {};
  const cx = W / 2;

  Object.entries(basePositions).forEach(([key, { idx }]) => {
    const top = 10 + idx * spacing;
    NODE_POS[key] = { top, left: "50%", transform: "translateX(-50%)" };
    POS[key] = { x: cx, y: top };
  });

  return { W, H, NODE_POS, POS, scale };
}

function NodeCard({ colorKey, label, sublabels = [], small, dimmed, placeholder, NODE_POS }) {
  const accent = NODE_ACCENT[colorKey] || "#94a3b8";
  const icon = NODE_ICON[colorKey];
  const nw = small ? NODE_W_SM : NODE_W;
  const pos = NODE_POS[colorKey];
  if (!pos) return null;

  return (
    <div
      style={{
        position: "absolute",
        ...pos,
        width: nw,
        opacity: dimmed ? 0.4 : 1,
        transition: "opacity 0.2s",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: 8,
          borderLeft: `4px solid ${accent}`,
          padding: "10px 12px",
          minWidth: 120,
          maxWidth: 150,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{
          fontSize: 13,
          fontWeight: 600,
          color: placeholder ? "#94a3b8" : accent,
          margin: 0,
          lineHeight: 1.3,
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontStyle: placeholder ? "italic" : "normal",
        }}>
          {icon && <span style={{ fontSize: 11 }}>{icon}</span>}
          {label}
        </p>
        {sublabels.map((sub, i) =>
          sub ? (
            <p key={i} style={{
              fontSize: 10,
              color: sub.muted ? "#cbd5e1" : "#64748b",
              margin: "2px 0 0",
              lineHeight: 1.3,
              fontStyle: sub.muted ? "italic" : "normal",
            }}>
              {sub.text}
            </p>
          ) : null
        )}
      </div>
    </div>
  );
}

// Arrow between two fixed positions
// from/to: { x (center), y (top) }, nodeH
function Arrow({ from, fromH, to, toH, color = "#334155" }) {
  const x1 = from.x;
  const y1 = from.y + fromH;
  const x2 = to.x;
  const y2 = to.y;

  // Straight line
  const d = `M ${x1} ${y1} L ${x2} ${y2}`;

  const id = `arr-${Math.round(x1)}-${Math.round(y1)}-${Math.round(x2)}-${Math.round(y2)}`;

  return (
    <g className="connector-line">
      <defs>
        <marker id={id} markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={color} />
        </marker>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        markerEnd={`url(#${id})`}
        style={{ transition: "stroke 0.2s" }}
      />
    </g>
  );
}

export default function StructureDiagram({ entities, overview }) {
  const e = entities || {};
  const ov = overview || {};

  const hasFeeder    = e.feeder?.enabled;
  const hasGP        = e.gp?.enabled;
  const hasManco     = e.manco?.enabled;
  const hasDepositary = e.depositary?.enabled;
  const hasAdvisor   = e.advisor?.enabled;
  const hasCarry     = e.carry?.enabled;
  const hasSPV       = e.spv?.enabled;
  const hasCoinvest  = e.coinvest?.enabled;

  const enabledCount = [hasFeeder, hasGP, hasManco, hasDepositary, hasAdvisor, hasCarry, hasSPV, hasCoinvest].filter(Boolean).length;
  const { W, H, NODE_POS, POS, scale } = buildLayout(enabledCount);

  const investorTypes = fmtInvestorTypes(ov.investorTypes);
  const investorCount = ov.investorCount;
  const minCommit     = fmt(ov.minCommitment);
  const fundName      = e.fund?.name || ov.fundName;
  const fundRegime    = shortRegime(e.fund?.regime);
  const fundType      = shortFundType(ov.fundType);
  const targetSize    = fmt(ov.targetFundSize);
  const geography     = trunc(ov.geographicFocus, 22);
  const investments   = ov.targetInvestments;

  // All nodes same height in vertical layout
  const invH  = NODE_H * scale;

  const lineColor = "#334155";

  return (
    <div
      style={{
        background: "transparent",
        border: "none",
        borderRadius: 12,
        userSelect: "none",
        width: "100%",
        minHeight: H,
        position: "relative",
        overflow: "visible",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Header */}
      <div style={{
        padding: "10px 16px",
        borderBottom: "none",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00b4d8" }} />
        <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(148,163,184,0.6)" }}>
          Live Structure
        </span>
      </div>

      {/* Fixed-layout diagram */}
      <div style={{ position: "relative", width: W, height: H, padding: 24 * scale }}>

        {/* SVG connector layer — behind nodes */}
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }}
        >
          {/* Investors → Fund Vehicle */}
          <Arrow
            from={POS.investors} fromH={invH}
            to={hasFeeder ? POS.feeder : POS.fund} toH={NODE_H}
            color={lineColor}
          />
          {/* Feeder → Fund (if active) */}
          {hasFeeder && (
            <Arrow from={POS.feeder} fromH={NODE_H} to={POS.fund} toH={NODE_H} color={lineColor} />
          )}
          {/* Fund → Advisor */}
          {hasAdvisor && (
            <Arrow from={POS.fund} fromH={NODE_H * scale} to={POS.advisor} toH={NODE_H * scale} color={lineColor} />
          )}
          {/* Fund → GP */}
          {hasGP && (
            <Arrow from={POS.fund} fromH={NODE_H * scale} to={POS.gp} toH={NODE_H * scale} color={lineColor} />
          )}
          {/* GP → Carry */}
          {hasCarry && hasGP && (
            <Arrow from={POS.gp} fromH={NODE_H * scale} to={POS.carry} toH={NODE_H * scale} color={lineColor} />
          )}
          {/* GP → ManCo */}
          {hasManco && hasGP && (
            <Arrow from={POS.gp} fromH={NODE_H * scale} to={POS.manco} toH={NODE_H * scale} color={lineColor} />
          )}
          {/* ManCo → Depositary or Fund → Depositary */}
          {hasDepositary && (
            <Arrow from={hasManco ? POS.manco : (hasCarry ? POS.carry : (hasAdvisor ? POS.advisor : (hasGP ? POS.gp : POS.fund)))} fromH={NODE_H * scale} to={POS.depositary} toH={NODE_H * scale} color={lineColor} />
          )}
        </svg>

        {/* Nodes — above SVG */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>

          {/* Investors */}
          <NodeCard
            colorKey="investors"
            label="Investors"
            sublabels={[
              investorCount ? { text: `${investorCount} investors` } : { text: "Count TBC", muted: true },
              investorTypes ? { text: investorTypes } : { text: "Types TBC", muted: true },
              minCommit ? { text: `Min. ${minCommit}` } : null,
            ]}
            NODE_POS={NODE_POS}
          />

          {/* Feeder (if active) */}
          {hasFeeder && (
            <NodeCard
              colorKey="feeder"
              label={`Feeder Fund${e.feeder.count > 1 ? "s" : ""}`}
              sublabels={[
                e.feeder.jurisdictions?.length ? { text: e.feeder.jurisdictions.join(", ") } : null,
              ]}
              NODE_POS={NODE_POS}
            />
          )}

          {/* Fund Vehicle */}
          <NodeCard
            colorKey="fund"
            label={fundName || "Fund Vehicle"}
            placeholder={!fundName}
            sublabels={[
              e.fund?.legalForm ? { text: e.fund.legalForm } : { text: "Legal form TBC", muted: true },
              fundRegime ? { text: fundRegime } : { text: "Regime TBC", muted: true },
              fundType ? { text: fundType } : null,
            ]}
            NODE_POS={NODE_POS}
          />

          {/* Investment Advisor */}
          {hasAdvisor && (
            <NodeCard
              colorKey="advisor"
              label={e.advisor?.name || "Investment Advisor"}
              dimmed={!hasAdvisor}
              sublabels={[
                e.advisor?.jurisdiction ? { text: e.advisor.jurisdiction } : null,
                e.advisor?.regStatus ? { text: e.advisor.regStatus } : { text: "Reg status TBC", muted: true },
              ]}
              small
              NODE_POS={NODE_POS}
            />
          )}

          {/* GP */}
          <NodeCard
            colorKey="gp"
            label={hasGP ? (e.gp?.name || "GP") : "GP"}
            placeholder={!hasGP}
            dimmed={!hasGP}
            sublabels={hasGP ? [e.gp?.legalForm ? { text: e.gp.legalForm } : { text: "Not configured", muted: true }] : [{ text: "Not configured", muted: true }]}
            small
            NODE_POS={NODE_POS}
          />

          {/* Carry Vehicle */}
          {hasCarry && (
            <NodeCard
              colorKey="carry"
              label={e.carry?.name || "Carry Vehicle"}
              dimmed={!hasCarry}
              sublabels={[
                e.carry?.legalForm ? { text: e.carry.legalForm } : { text: "Form TBC", muted: true },
                e.carry?.structure ? { text: e.carry.structure.split(" ")[0] } : { text: "Structure TBC", muted: true },
              ]}
              small
              NODE_POS={NODE_POS}
            />
          )}

          {/* ManCo / AIFM */}
          <NodeCard
            colorKey="manco"
            label={hasManco ? (e.manco?.name || "ManCo / AIFM") : "ManCo / AIFM"}
            placeholder={!hasManco}
            dimmed={!hasManco}
            sublabels={hasManco ? [
              e.manco?.type ? { text: e.manco.type.split(" ")[0] } : { text: "Not configured", muted: true },
              { text: "Luxembourg" },
            ] : [{ text: "Not configured", muted: true }]}
            small
            NODE_POS={NODE_POS}
          />

          {/* Depositary (right side) */}
          <NodeCard
            colorKey="depositary"
            label={hasDepositary ? (e.depositary?.institutionName || "Depositary") : "Depositary"}
            placeholder={!hasDepositary}
            dimmed={!hasDepositary}
            sublabels={hasDepositary ? [e.depositary?.type ? { text: e.depositary.type } : { text: "Type TBC", muted: true }] : [{ text: "Not configured", muted: true }]}
            small
            NODE_POS={NODE_POS}
          />



        </div>
      </div>
    </div>
  );
}