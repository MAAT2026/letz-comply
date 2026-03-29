import React, { useState } from "react";
import { X, ExternalLink, Plus, Download, MapPin, Calendar, Tag, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, differenceInDays } from "date-fns";
import { base44 } from "@/api/base44Client";
import { cn } from "@/lib/utils";

function CountdownBadge({ date }) {
  const days = differenceInDays(new Date(date), new Date());
  if (days < 0 || days > 30) return null;
  const color = days < 7 ? "bg-red-100 text-red-700 border-red-200" : days < 14 ? "bg-orange-100 text-orange-700 border-orange-200" : "bg-amber-50 text-amber-700 border-amber-200";
  const label = days === 0 ? "Due today!" : days === 1 ? "Tomorrow" : days < 7 ? `${days} days left` : `${days} days left`;
  return <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full border", color)}>{label}</span>;
}

function generateICS(event) {
  const dateStr = (event.date || "").replace(/-/g, "");
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//LetzComply//Calendar//EN",
    "BEGIN:VEVENT",
    `DTSTART;VALUE=DATE:${dateStr}`,
    `DTEND;VALUE=DATE:${dateStr}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${(event.summary || event.description || "").replace(/\n/g, "\\n")}`,
    event.url ? `URL:${event.url}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).join("\r\n");

  const blob = new Blob([content], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.title.replace(/\s+/g, "_")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

function googleCalendarLink(event) {
  const dateStr = (event.date || "").replace(/-/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${dateStr}/${dateStr}`,
    details: event.summary || event.description || "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function EventDetailModal({ event, onClose }) {
  if (!event) return null;
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const isDeadline = event._layer === "deadline";
  const isIndustry = event._layer === "industry";
  const isPersonal = event._layer === "personal";

  const handleAddToActions = async () => {
    setAdding(true);
    const user = await base44.auth.me();
    await base44.entities.UserAction.create({
      text: event.title,
      priority: isDeadline ? "high" : "medium",
      category: isDeadline ? "compliance" : "other",
      due_date: event.date || "",
      function_id: user?.function || "compliance",
      from_calendar: true,
    });
    setAdding(false);
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  };

  const tagColor = isDeadline
    ? "bg-red-50 text-red-700 border-red-200"
    : isIndustry
    ? "bg-blue-50 text-blue-700 border-blue-200"
    : "bg-gray-100 text-gray-600 border-gray-200";

  const layerLabel = isDeadline ? "Compliance Deadline" : isIndustry ? "Industry Event" : "My Event";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <Card
        className="w-full max-w-lg p-6 space-y-4 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge className={cn("text-[10px] border", tagColor)}>{layerLabel}</Badge>
              {event.source && <Badge variant="outline" className="text-[10px]">{event.source}</Badge>}
              {event.category && <Badge variant="outline" className="text-[10px]">{event.category}</Badge>}
            </div>
            <h3 className="font-bold text-base text-foreground leading-snug">{event.title}</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground shrink-0 mt-0.5">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {event.date ? format(new Date(event.date), "EEEE, d MMMM yyyy") : "Recurring"}
          </span>
          {event.date && <CountdownBadge date={event.date} />}
        </div>

        {event.location && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {event.location}
          </div>
        )}

        {event.access && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Tag className="w-3.5 h-3.5 shrink-0" />
            {event.access}
          </div>
        )}

        {(event.summary || event.description) && (
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
              {isDeadline ? "Why it matters" : "About"}
            </p>
            <p className="text-sm text-foreground leading-relaxed">{event.summary || event.description}</p>
          </div>
        )}

        {event.relevant_functions?.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-muted-foreground font-medium">Relevant to:</span>
            {event.relevant_functions.map(f => (
              <span key={f} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium capitalize">{f}</span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-1 border-t">
          {!isPersonal && (
            <Button
              size="sm"
              variant={added ? "default" : "outline"}
              className={cn("text-xs h-8 gap-1.5 transition-all", added && "bg-emerald-500 hover:bg-emerald-500 border-emerald-500 text-white")}
              onClick={handleAddToActions}
              disabled={adding || added}
            >
              <Plus className="w-3 h-3" />
              {added ? "Added to My Actions ✓" : adding ? "Adding…" : "Add to My Actions"}
            </Button>
          )}
          <Button size="sm" variant="outline" className="text-xs h-8 gap-1.5" onClick={() => generateICS(event)}>
            <Download className="w-3 h-3" /> Download .ics
          </Button>
          {event.date && (
            <Button size="sm" variant="outline" className="text-xs h-8 gap-1.5" asChild>
              <a href={googleCalendarLink(event)} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3" /> Google Calendar
              </a>
            </Button>
          )}
          {event.url && (
            <Button size="sm" variant="outline" className="text-xs h-8 gap-1.5" asChild>
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3" /> Source
              </a>
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}