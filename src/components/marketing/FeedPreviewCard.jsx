import React, { useState } from "react";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import { SOURCE_COLORS } from "@/lib/sampleFeedData";
import { base44 } from "@/api/base44Client";

const PRIORITY_CONFIG = {
  high: { dot: "bg-red-500", label: "High", text: "text-red-600 bg-red-50" },
  medium: { dot: "bg-amber-400", label: "Medium", text: "text-amber-600 bg-amber-50" },
  low: { dot: "bg-emerald-500", label: "Low", text: "text-emerald-600 bg-emerald-50" },
};

export default function FeedPreviewCard({ item, onExpand }) {
  const [expanded, setExpanded] = useState(false);
  const colors = SOURCE_COLORS[item.source] || { bg: "#64748b", text: "#fff" };
  const priority = PRIORITY_CONFIG[item.priority];

  const handleToggle = () => {
    if (!expanded) onExpand();
    setExpanded(v => !v);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <button onClick={handleToggle} className="w-full text-left p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="flex items-center gap-2 flex-wrap mb-2.5">
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: colors.bg, color: colors.text }}
              >
                {item.source}
              </span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${priority.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
                {priority.label}
              </span>
              <span className="text-[11px] text-gray-400">{item.date}</span>
            </div>

            {/* Title */}
            <p className="text-sm font-semibold text-gray-900 leading-snug">{item.title}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {item.tags.map(tag => (
                <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>

            {/* Summary preview */}
            <p className="text-xs text-gray-500 mt-3 leading-relaxed line-clamp-2">{item.summaryPreview}</p>
          </div>
          <div className="shrink-0 text-gray-400 mt-1">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-50 pt-4">
          {/* Blurred full summary */}
          <div className="relative rounded-xl overflow-hidden">
            <div className="select-none" style={{ filter: "blur(5px)", userSelect: "none" }}>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">{item.summaryFull}</p>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-blue-800 mb-1">⚡ Why this matters for Luxembourg funds:</p>
                <p className="text-xs text-blue-700">{item.whyItMatters}</p>
              </div>
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[2px] rounded-xl">
              <div className="text-center px-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Sign up free to read the full AI analysis</p>
                <p className="text-xs text-gray-500 mb-4">Includes plain-language summary + "why it matters" for your role</p>
                <button
                  onClick={() => base44.auth.redirectToLogin(window.location.href)}
                  className="bg-[#003DA5] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Sign Up Free
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}