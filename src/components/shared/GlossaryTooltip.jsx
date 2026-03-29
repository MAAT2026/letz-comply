import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export default function GlossaryTooltip({ term, definition, asBadge = false }) {
  if (asBadge) {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="text-xs cursor-help border-dashed border-primary/30">
              {term}
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs text-xs leading-relaxed">
            <p className="font-semibold mb-1">{term}</p>
            <p className="text-muted-foreground">{definition}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="underline decoration-dotted decoration-primary/40 underline-offset-2 cursor-help font-medium text-primary/80">
            {term}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-xs leading-relaxed">
          <p className="font-semibold mb-1">{term}</p>
          <p className="text-muted-foreground">{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}