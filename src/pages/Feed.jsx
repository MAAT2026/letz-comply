import React, { useState, useEffect } from "react";
import { REGULATIONS, ENTITY_RELEVANCE, ENTITY_TYPES } from "@/lib/regData";
import { base44 } from "@/api/base44Client";
import FilterBar from "@/components/feed/FilterBar";
import RegCard from "@/components/feed/RegCard";
import RegDetail from "@/components/feed/RegDetail";
import FunctionSwitcher from "@/components/shared/FunctionSwitcher";
import { Badge } from "@/components/ui/badge";
import { Wifi } from "lucide-react";

// Normalise a DB regulation to match the shape of static REGULATIONS
function normaliseDbReg(reg) {
  return {
    ...reg,
    forYou: reg.function_insights || {},
    concepts: [],
    chain: [],
    isLive: true,
  };
}

export default function Feed({ userProfile, onFunctionChange }) {
  const [filters, setFilters] = useState({
    search: "",
    source: "All Sources",
    topic: "All Topics",
    relevance: "All Relevance",
    dateRange: "All Dates",
  });
  const [selectedReg, setSelectedReg] = useState(null);
  const [liveRegs, setLiveRegs] = useState([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    base44.entities.Regulation.list('-date', 50)
      .then((regs) => {
        setLiveRegs(regs.map(normaliseDbReg));
        setLoadError(false);
      })
      .catch((err) => {
        console.error("Failed to load live regulations:", err);
        setLoadError(true);
      });
  }, []);

  const entityPriority = ENTITY_RELEVANCE[userProfile?.entityType] || [];

  // Normalise a title for dedup comparison
  const normTitle = (t = '') => t.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();

  // Merge: live DB regs first (newest), then static ones — max 6 months old, deduplicated by title
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const recentStatic = REGULATIONS.filter(r => r.date && new Date(r.date) >= sixMonthsAgo);

  const seen = new Set();
  const deduped = [];
  for (const reg of [...liveRegs, ...recentStatic]) {
    const key = normTitle(reg.title);
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(reg);
    }
  }
  const allRegs = deduped;

  const filtered = allRegs
    .filter((reg) => {
      if (filters.search && !reg.title.toLowerCase().includes(filters.search.toLowerCase()) && !reg.summary.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.source !== "All Sources" && reg.source !== filters.source) return false;
      if (filters.topic !== "All Topics" && reg.topic !== filters.topic) return false;
      if (filters.relevance !== "All Relevance" && reg.relevance !== filters.relevance.toLowerCase()) return false;
      if (filters.dateRange && filters.dateRange !== "All Dates") {
        const now = new Date();
        const cutoffs = {
          "Last 7 days": 7,
          "Last 30 days": 30,
          "Last 3 months": 90,
          "Last year": 365,
        };
        const days = cutoffs[filters.dateRange];
        if (days && reg.date) {
          const regDate = new Date(reg.date);
          const diff = (now - regDate) / (1000 * 60 * 60 * 24);
          if (diff > days) return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      // Live regs always float to top, then sort by entity-type priority
      if (a.isLive && !b.isLive) return -1;
      if (!a.isLive && b.isLive) return 1;
      const aIdx = entityPriority.indexOf(a.id);
      const bIdx = entityPriority.indexOf(b.id);
      if (aIdx === -1 && bIdx === -1) return new Date(b.date) - new Date(a.date);
      if (aIdx === -1) return 1;
      if (bIdx === -1) return -1;
      return aIdx - bIdx;
    });

  if (selectedReg) {
    return (
      <RegDetail
        regulation={selectedReg}
        userFunction={userProfile.function}
        onBack={() => setSelectedReg(null)}
      />
    );
  }

  const entityInfo = ENTITY_TYPES.find(e => e.id === userProfile?.entityType);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Regulatory feed</h2>
          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
            {entityInfo ? `Personalised for ${entityInfo.label} professionals` : "Latest updates from CSSF, ESMA, ALFI & LPEA"}
            {liveRegs.length > 0 && (
              <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-emerald-300 text-emerald-600 bg-emerald-50 gap-1">
                <Wifi className="w-2.5 h-2.5" /> {liveRegs.length} live
              </Badge>
            )}
          </p>
        </div>
        <FunctionSwitcher currentFunction={userProfile.function} onChange={onFunctionChange} />
      </div>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      {loadError && (
        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Could not load live updates. Showing cached regulations.
        </div>
      )}

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No regulations match your filters.</p>
          </div>
        ) : (
          filtered.map((reg, i) => (
            <RegCard
              key={reg.id || i}
              regulation={reg}
              userFunction={userProfile.function}
              onClick={() => setSelectedReg(reg)}
              index={i}
                userProfile={userProfile}
            />
          ))
        )}
      </div>
    </div>
  );
}