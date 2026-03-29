import React from "react";
import { FUNCTIONS } from "@/lib/regData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FunctionSwitcher({ currentFunction, onChange }) {
  const current = FUNCTIONS.find(f => f.id === currentFunction);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground hidden sm:inline">Viewing as:</span>
      <Select value={currentFunction} onValueChange={onChange}>
        <SelectTrigger className="w-44 h-8 text-xs">
          <SelectValue>
            {current && (
              <span className="flex items-center gap-1.5">
                <span>{current.icon}</span>
                <span>{current.label}</span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {FUNCTIONS.map((func) => (
            <SelectItem key={func.id} value={func.id}>
              <span className="flex items-center gap-2">
                <span>{func.icon}</span>
                <span>{func.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}