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
  const display = types.slice(0, 2).join(" · ");
  const extra = types.length > 2 ? ` +${types.length - 2}` : "";
  return display + extra;
}

function CardNode({ label, sublabels = [], width = 180, accent = "#334155", icon }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: `1px solid #e2e8f0`,
        borderRadius: 6,
        padding: "12px 14px",
        width,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <p style={{
        fontSize: 13,
        fontWeight: 700,
        color: accent,
        margin: 0,
        lineHeight: 1.3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
      }}>
        {icon && <span style={{ fontSize: 12 }}>{icon}</span>}
        {label}
      </p>
      {sublabels.map((sub, i) =>
        sub ? (
          <p key={i} style={{
            fontSize: 9,
            color: sub.muted ? "#cbd5e1" : "#64748b",
            margin: "3px 0 0",
            lineHeight: 1.2,
            fontStyle: sub.muted ? "italic" : "normal",
          }}>
            {sub.text}
          </p>
        ) : null
      )}
    </div>
  );
}

function ConnectorLine({ x1, y1, x2, y2, color = "#334155", percentage = "" }) {
  const lineId = `conn-${Math.random()}`;
  return (
    <g>
      <defs>
        <marker id={lineId} markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={color} />
        </marker>
      </defs>
      <path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        markerEnd={`url(#${lineId})`}
      />
      {percentage && (
        <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 8} fontSize="11" fontWeight="600" fill={color} textAnchor="middle">
          {percentage}
        </text>
      )}
    </g>
  );
}

export default function StructureDiagramReview({ entities, overview }) {
  const e = entities || {};
  const ov = overview || {};

  const hasFeeder    = e.feeder?.enabled;
  const hasGP        = e.gp?.enabled;
  const hasManco     = e.manco?.enabled;
  const hasDepositary = e.depositary?.enabled;

  const fundName      = e.fund?.name || ov.fundName;
  const fundRegime    = shortRegime(e.fund?.regime);
  const gpName        = e.gp?.name || "General Partner";
  const mancoName     = e.manco?.name || "ManCo / AIFM";
  const depName       = e.depositary?.institutionName || "Depositary";
  const investorTypes = fmtInvestorTypes(ov.investorTypes);
  const targetSize    = fmt(ov.targetFundSize);

  const W = 1000;
  const H = 700;

  return (
    <div
      style={{
        width: "100%",
        overflow: "auto",
        padding: "20px",
        background: "transparent",
      }}
    >
      <svg width={W} height={H} style={{ background: "transparent" }}>
        {/* GP Branch (left) */}
        {hasGP && (
          <ConnectorLine x1={W/2} y1={60} x2={W/4} y2={140} color={NODE_ACCENT.gp} percentage="100%" />
        )}

        {/* Advisor Branch (right) */}
        {hasManco && (
          <ConnectorLine x1={W/2} y1={60} x2={(3*W)/4} y2={140} color={NODE_ACCENT.manco} percentage="100%" />
        )}

        {/* Fund level (center) */}
        {(hasGP || hasManco) && (
          <>
            <ConnectorLine x1={W/4} y1={200} x2={W/2} y2={280} color={NODE_ACCENT.fund} />
            <ConnectorLine x1={(3*W)/4} y1={200} x2={W/2} y2={280} color={NODE_ACCENT.fund} />
          </>
        )}

        {/* Fund to Portfolio connections */}
        {(hasGP || hasManco) && (
          <>
            <ConnectorLine x1={W/2} y1={340} x2={W/4} y2={420} color={NODE_ACCENT.portfolio} />
            <ConnectorLine x1={W/2} y1={340} x2={(3*W)/4} y2={420} color={NODE_ACCENT.portfolio} />
          </>
        )}

        {/* Depositary connection (far right) */}
        {hasDepositary && (
          <ConnectorLine x1={W/2} y1={310} x2={(7*W)/8} y2={380} color={NODE_ACCENT.depositary} />
        )}

        {/* Portfolio to Investors */}
        <ConnectorLine x1={W/4} y1={480} x2={W/2} y2={560} color={NODE_ACCENT.investors} />
        <ConnectorLine x1={(3*W)/4} y1={480} x2={W/2} y2={560} color={NODE_ACCENT.investors} />
      </svg>

      {/* Node overlays */}
      <div style={{ position: "relative", marginTop: "-680px", pointerEvents: "none" }}>
        {/* Top - Fund */}
        <div style={{ textAlign: "center", marginBottom: "120px" }}>
          <CardNode
            label={fundName || "Fund Vehicle"}
            icon={NODE_ICON.fund}
            accent={NODE_ACCENT.fund}
            width={200}
            sublabels={[
              fundRegime ? { text: fundRegime } : null,
              targetSize ? { text: `${targetSize} target` } : null,
            ]}
          />
        </div>

        {/* Second level - GP and ManCo */}
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "100px", paddingLeft: "40px", paddingRight: "40px" }}>
          {hasGP && (
            <div style={{ width: "200px" }}>
              <CardNode
                label={gpName}
                icon={NODE_ICON.gp}
                accent={NODE_ACCENT.gp}
                sublabels={[e.gp?.legalForm ? { text: e.gp.legalForm } : null]}
              />
            </div>
          )}
          {hasManco && (
            <div style={{ width: "200px" }}>
              <CardNode
                label={mancoName}
                icon={NODE_ICON.manco}
                accent={NODE_ACCENT.manco}
                sublabels={[e.manco?.type ? { text: e.manco.type } : null]}
              />
            </div>
          )}
        </div>

        {/* Third level - Portfolio and Depositary */}
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "100px" }}>
          <div style={{ width: "180px" }}>
            <CardNode
              label="Portfolio"
              icon={NODE_ICON.portfolio}
              accent={NODE_ACCENT.portfolio}
              width={160}
            />
          </div>
          {hasDepositary && (
            <div style={{ width: "180px", marginLeft: "100px" }}>
              <CardNode
                label={depName}
                icon={NODE_ICON.depositary}
                accent={NODE_ACCENT.depositary}
                width={160}
              />
            </div>
          )}
        </div>

        {/* Bottom - Investors */}
        <div style={{ textAlign: "center" }}>
          <CardNode
            label="Investors"
            icon={NODE_ICON.investors}
            accent={NODE_ACCENT.investors}
            width={180}
            sublabels={[investorTypes ? { text: investorTypes } : null]}
          />
        </div>
      </div>
    </div>
  );
}