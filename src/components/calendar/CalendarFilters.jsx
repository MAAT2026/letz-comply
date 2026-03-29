import React from "react";
import { cn } from "@/lib/utils";

const LAYERS = [
  { id: "all", label: "All Events" },
  { id: "deadline", label: "Compliance" },
  { id: "industry", label: "Industry" },
  { id: "personal", label: "My Events" },
];

const SOURCES = [
  { id: "all", label: "All Sources" },
  { id: "CSSF", label: "CSSF" },
  { id: "ESMA", label: "ESMA" },
  { id: "EU", label: "EU" },
  { id: "ALFI", label: "ALFI" },
  { id: "LPEA", label: "LPEA" },
];

export default function CalendarFilters({ layerFilter, sourceFilter, onLayerChange, onSourceChange }) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex gap-1 bg-secondary rounded-lg p-0.5">
        {LAYERS.map(l => (
          <button
            key={l.id}
            onClick={() => onLayerChange(l.id)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-md font-medium transition-all",
              layerFilter === l.id
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="flex gap-1 flex-wrap">
        {SOURCES.map(s => (
          <button
            key={s.id}
            onClick={() => onSourceChange(s.id)}
            className={cn(
              "text-xs px-2.5 py-1 rounded-full border font-medium transition-all",
              sourceFilter === s.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary/50"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}