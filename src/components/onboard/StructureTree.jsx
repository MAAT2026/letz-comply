import React from "react";

const NODE_ACCENT = {
  investors: "#3b82f6",
  feeder: "#a78bfa",
  fund: "#6366f1",
  gp: "#ef4444",
  manco: "#f59e0b",
  advisor: "#10b981",
  carry: "#ec4899",
  depositary: "#14b8a6",
};

const NODE_ICON = {
  investors: "👥",
  feeder: "🔀",
  fund: "🏛",
  gp: "⚖️",
  manco: "🏢",
  advisor: "💡",
  carry: "💼",
  depositary: "🏦",
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

function TreeNode({ colorKey, label, details = [], children, level = 0 }) {
  const accent = NODE_ACCENT[colorKey] || "#94a3b8";
  const icon = NODE_ICON[colorKey];
  const ml = level * 40;

  return (
    <div style={{ marginLeft: ml }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 16,
        }}
      >
        {level > 0 && (
          <div
            style={{
              width: 20,
              height: 1,
              backgroundColor: "#e2e8f0",
              marginTop: 8,
              marginLeft: -40,
            }}
          />
        )}
        <div
          style={{
            flex: 1,
            background: "#ffffff",
            border: `1px solid ${accent}`,
            borderRadius: 8,
            padding: "12px 14px",
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: accent,
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
            {label}
          </p>
          {details.map((detail, i) => (
            <p
              key={i}
              style={{
                fontSize: 11,
                color: detail.muted ? "#cbd5e1" : "#64748b",
                margin: "4px 0 0",
                fontStyle: detail.muted ? "italic" : "normal",
              }}
            >
              {detail.text}
            </p>
          ))}
        </div>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}

export default function StructureTree({ entities, overview }) {
  const e = entities || {};
  const ov = overview || {};

  const hasFeeder = e.feeder?.enabled;
  const hasGP = e.gp?.enabled;
  const hasManco = e.manco?.enabled;
  const hasDepositary = e.depositary?.enabled;
  const hasAdvisor = e.advisor?.enabled;
  const hasCarry = e.carry?.enabled;

  const fundName = e.fund?.name || ov.fundName || "Fund Vehicle";
  const fundRegime = shortRegime(e.fund?.regime);
  const gpCommitment = fmt(e.gp?.commitment);

  return (
    <div style={{ padding: 16, background: "#f8fafc", borderRadius: 12 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(148,163,184,0.6)",
          marginBottom: 20,
        }}
      >
        Structure Hierarchy
      </p>

      <div style={{ position: "relative" }}>
        {/* Investors → Fund Vehicle */}
        <TreeNode
          colorKey="investors"
          label="Investors"
          details={[
            ov.investorCount
              ? { text: `${ov.investorCount} investors` }
              : { text: "Count TBC", muted: true },
            ov.investorTypes?.length
              ? { text: ov.investorTypes.slice(0, 2).join(" · ") }
              : { text: "Types TBC", muted: true },
            ov.minCommitment
              ? { text: `Min. €${Number(ov.minCommitment).toLocaleString()}` }
              : null,
          ].filter(Boolean)}
          level={0}
        >
          {/* Fund Vehicle */}
          <TreeNode
            colorKey="fund"
            label={fundName}
            details={[
              e.fund?.legalForm ? { text: e.fund.legalForm } : null,
              fundRegime ? { text: fundRegime } : { text: "Regime TBC", muted: true },
            ].filter(Boolean)}
            level={1}
          >
            {/* Feeder Funds */}
            {hasFeeder && (
              <TreeNode
                colorKey="feeder"
                label={`Feeder Fund${e.feeder?.count > 1 ? "s" : ""}`}
                details={
                  e.feeder?.jurisdictions?.length
                    ? [{ text: e.feeder.jurisdictions.join(", ") }]
                    : [{ text: "Jurisdictions TBC", muted: true }]
                }
                level={2}
              />
            )}

            {/* Investment Advisor */}
            {hasAdvisor && (
              <TreeNode
                colorKey="advisor"
                label={e.advisor?.name || "Investment Advisor"}
                details={[
                  e.advisor?.jurisdiction ? { text: e.advisor.jurisdiction } : null,
                  e.advisor?.regStatus
                    ? { text: e.advisor.regStatus }
                    : { text: "Reg status TBC", muted: true },
                ].filter(Boolean)}
                level={2}
              />
            )}

            {/* GP */}
            {hasGP && (
              <TreeNode
                colorKey="gp"
                label={e.gp?.name || "General Partner"}
                details={[
                  e.gp?.legalForm ? { text: e.gp.legalForm } : null,
                  gpCommitment ? { text: `Commitment: ${gpCommitment}` } : null,
                ].filter(Boolean)}
                level={2}
              >
                {/* Carry Vehicle */}
                {hasCarry && (
                  <TreeNode
                    colorKey="carry"
                    label={e.carry?.name || "Carry Vehicle"}
                    details={[
                      e.carry?.legalForm ? { text: e.carry.legalForm } : null,
                      e.carry?.structure
                        ? { text: e.carry.structure.split(" ")[0] }
                        : null,
                    ].filter(Boolean)}
                    level={3}
                  />
                )}
              </TreeNode>
            )}

            {/* ManCo */}
            {hasManco && (
              <TreeNode
                colorKey="manco"
                label={e.manco?.name || "ManCo / AIFM"}
                details={[
                  e.manco?.type
                    ? { text: e.manco.type.split(" ")[0] }
                    : { text: "Type TBC", muted: true },
                  { text: "Luxembourg" },
                ]}
                level={2}
              />
            )}

            {/* Depositary */}
            {hasDepositary && (
              <TreeNode
                colorKey="depositary"
                label={e.depositary?.institutionName || "Depositary"}
                details={[
                  e.depositary?.type
                    ? { text: e.depositary.type }
                    : { text: "Type TBC", muted: true },
                ]}
                level={2}
              />
            )}
          </TreeNode>
        </TreeNode>
      </div>
    </div>
  );
}