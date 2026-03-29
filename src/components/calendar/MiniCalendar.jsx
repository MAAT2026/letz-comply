import React from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday, getDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MiniCalendar({ currentMonth, onMonthChange, selectedDate, onDateSelect, getDotsForDate }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const paddingDays = getDay(monthStart) === 0 ? 6 : getDay(monthStart) - 1;

  return (
    <Card className="p-3 shrink-0 w-[260px]">
      <div className="flex items-center justify-between mb-2">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => onMonthChange(subMonths(currentMonth, 1))}>
          <ChevronLeft className="w-3.5 h-3.5" />
        </Button>
        <span className="text-xs font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => onMonthChange(addMonths(currentMonth, 1))}>
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-px">
        {["M","T","W","T","F","S","S"].map((d, i) => (
          <div key={i} className="text-[9px] font-medium text-muted-foreground text-center py-1">{d}</div>
        ))}
        {Array.from({ length: paddingDays }).map((_, i) => <div key={`pad-${i}`} />)}
        {days.map(day => {
          const dots = getDotsForDate(day); // array of color strings
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect(isSelected ? null : day)}
              className={cn(
                "h-7 w-full flex flex-col items-center justify-center rounded text-[11px] transition-all",
                isToday(day) && "font-bold",
                isSelected ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
                !isSameMonth(day, currentMonth) && "opacity-20"
              )}
            >
              {format(day, "d")}
              {dots.length > 0 && !isSelected && (
                <div className="flex gap-0.5 mt-px">
                  {dots.slice(0, 3).map((color, i) => (
                    <div key={i} className={cn("w-1 h-1 rounded-full", color)} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-3 mt-3 pt-2 border-t justify-center flex-wrap">
        <span className="flex items-center gap-1 text-[9px] text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400" /> Compliance
        </span>
        <span className="flex items-center gap-1 text-[9px] text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-lux-blue" /> Industry
        </span>
        <span className="flex items-center gap-1 text-[9px] text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" /> My Events
        </span>
      </div>
    </Card>
  );
}