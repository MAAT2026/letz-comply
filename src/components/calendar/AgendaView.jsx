import React from "react";
import { format, differenceInDays, isToday, isTomorrow } from "date-fns";
import { AlertTriangle, Calendar, User, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

function CountdownBadge({ date }) {
  const days = differenceInDays(new Date(date), new Date());
  if (days < 0) return <span className="text-[10px] text-muted-foreground">Past</span>;
  if (days > 30) return null;
  const color = days < 7 ? "bg-red-100 text-red-700" : days < 14 ? "bg-orange-100 text-orange-700" : "bg-amber-50 text-amber-700";
  const label = isToday(new Date(date)) ? "Today!" : isTomorrow(new Date(date)) ? "Tomorrow" : `${days} days left`;
  return <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", color)}>{label}</span>;
}

const dotColor = {
  deadline: "bg-red-400",
  industry: "bg-lux-blue",
  personal: "bg-gray-400",
};

const tagStyle = {
  deadline: "bg-red-50 text-red-700",
  industry: "bg-blue-50 text-blue-700",
  personal: "bg-gray-100 text-gray-600",
};

const tagLabel = {
  deadline: "Compliance",
  industry: "Industry",
  personal: "My Event",
};

export default function AgendaView({ events, userFunction, onSelect }) {
  // Group by month
  const grouped = {};
  events.forEach(e => {
    const key = e.date ? format(new Date(e.date), "MMMM yyyy") : "Recurring";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  });

  if (events.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        No events match your current filters.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([month, monthEvents]) => (
        <div key={month}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 pb-1 border-b">
            {month}
          </h3>
          <div className="space-y-1.5">
            {monthEvents.map((event, i) => {
              return (
                <button
                  key={i}
                  onClick={() => onSelect(event)}
                  className="w-full text-left flex items-start gap-3 p-3 rounded-xl border bg-card hover:border-primary/40 hover:shadow-sm transition-all group"
                >
                  {/* Date column */}
                  <div className="shrink-0 w-12 text-center">
                    {event.date ? (
                      <>
                        <div className="text-lg font-bold text-foreground leading-none">{format(new Date(event.date), "d")}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">{format(new Date(event.date), "EEE")}</div>
                      </>
                    ) : (
                      <div className="text-[10px] text-muted-foreground font-medium">Recur.</div>
                    )}
                  </div>

                  {/* Dot */}
                  <div className="mt-1.5 shrink-0">
                    <div className={cn("w-2 h-2 rounded-full", dotColor[event._layer] || "bg-gray-400")} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">{event.title}</p>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {event.date && <CountdownBadge date={event.date} />}
                      </div>
                    </div>
                    {(event.summary || event.description) && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{event.summary || event.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", tagStyle[event._layer])}>
                        {tagLabel[event._layer]}
                      </span>
                      {event.source && (
                        <span className="text-[10px] text-muted-foreground">{event.source}</span>
                      )}
                      {event.organiser && (
                        <span className="text-[10px] text-muted-foreground">{event.organiser}</span>
                      )}
                      {event.location && (
                        <span className="text-[10px] text-muted-foreground">📍 {event.location}</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}