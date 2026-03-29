import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Plus, LayoutList, Grid3X3 } from "lucide-react";
import { format, isSameDay, isFuture } from "date-fns";
import { cn } from "@/lib/utils";
import { useAppContext } from "./AppWrapper";

import MiniCalendar from "@/components/calendar/MiniCalendar";
import AgendaView from "@/components/calendar/AgendaView";
import CalendarFilters from "@/components/calendar/CalendarFilters";
import EventDetailModal from "@/components/calendar/EventDetailModal";
import AddEventModal from "@/components/calendar/AddEventModal";

export default function CalendarView() {
  const { userProfile } = useAppContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState("agenda"); // "agenda" | "month"
  const [autoNavigated, setAutoNavigated] = useState(false);
  const [layerFilter, setLayerFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  const [deadlines, setDeadlines] = useState([]);
  const [industryEvents, setIndustryEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  const loadAll = async () => {
    const [dl, ie, ue] = await Promise.all([
      base44.entities.RegulatoryDeadline.list(),
      base44.entities.IndustryEvent.list(),
      base44.entities.CalendarEvent.list(),
    ]);
    setDeadlines(dl);
    setIndustryEvents(ie);
    setUserEvents(ue);
  };

  useEffect(() => { loadAll(); }, []);

  // Normalise all events into one shape with _layer tag
  const allEvents = useMemo(() => {
    const dl = deadlines.map(e => ({ ...e, _layer: "deadline" }));
    const ie = industryEvents.map(e => ({ ...e, _layer: "industry" }));
    const ue = userEvents.map(e => ({ ...e, _layer: "personal" }));
    return [...dl, ...ie, ...ue].sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    });
  }, [deadlines, industryEvents, userEvents]);

  // Apply filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter(e => {
      if (layerFilter !== "all" && e._layer !== layerFilter) return false;
      if (sourceFilter !== "all") {
        const src = e.source || e.organiser || "";
        if (src !== sourceFilter) return false;
      }
      return true;
    });
  }, [allEvents, layerFilter, sourceFilter]);

  // Auto-navigate to earliest month with events when switching to month view
  useEffect(() => {
    if (viewMode !== "month" || autoNavigated || filteredEvents.length === 0) return;
    const today = new Date();
    const sameMonthHasEvents = filteredEvents.some(e => {
      if (!e.date) return false;
      const d = new Date(e.date);
      return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    });
    if (!sameMonthHasEvents) {
      const next = filteredEvents.find(e => e.date && new Date(e.date) >= today);
      if (next) setCurrentMonth(new Date(next.date));
    }
    setAutoNavigated(true);
  }, [viewMode, filteredEvents, autoNavigated]);

  // Future events only for agenda (from today onwards)
  const upcomingFiltered = useMemo(() => {
    return filteredEvents.filter(e => !e.date || isFuture(new Date(e.date)) || isSameDay(new Date(e.date), new Date()));
  }, [filteredEvents]);

  // Events for selected date
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return filteredEvents.filter(e => e.date && isSameDay(new Date(e.date), selectedDate));
  }, [filteredEvents, selectedDate]);

  // Events this month for mini right-panel
  const thisMonthEvents = useMemo(() => {
    return filteredEvents.filter(e => {
      if (!e.date) return false;
      const d = new Date(e.date);
      return d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [filteredEvents, currentMonth]);

  const getDotsForDate = (day) => {
    const events = filteredEvents.filter(e => e.date && isSameDay(new Date(e.date), day));
    const dots = [];
    if (events.some(e => e._layer === "deadline")) dots.push("bg-red-400");
    if (events.some(e => e._layer === "industry")) dots.push("bg-lux-blue");
    if (events.some(e => e._layer === "personal")) dots.push("bg-gray-400");
    return dots;
  };

  const handleDeletePersonal = async (id) => {
    await base44.entities.CalendarEvent.delete(id);
    loadAll();
  };

  const eventsToShow = selectedDate ? selectedDateEvents : (viewMode === "agenda" ? upcomingFiltered : thisMonthEvents);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-foreground">Regulatory Calendar</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Compliance deadlines, industry events & your reminders</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-secondary rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("agenda")}
              className={cn("p-1.5 rounded-md transition-all", viewMode === "agenda" ? "bg-card shadow-sm" : "text-muted-foreground")}
              title="Agenda view"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setViewMode("month"); setAutoNavigated(false); }}
              className={cn("p-1.5 rounded-md transition-all", viewMode === "month" ? "bg-card shadow-sm" : "text-muted-foreground")}
              title="Month view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
          <Button size="sm" className="h-8 gap-1.5 text-xs" onClick={() => setShowModal(true)}>
            <Plus className="w-3.5 h-3.5" /> Add Event
          </Button>
        </div>
      </div>

      {/* Filters */}
      <CalendarFilters
        layerFilter={layerFilter}
        sourceFilter={sourceFilter}
        onLayerChange={v => { setLayerFilter(v); setSelectedDate(null); }}
        onSourceChange={v => setSourceFilter(v)}
      />

      {/* Layout */}
      <div className="flex gap-4 items-start">
        {/* Mini calendar */}
        <div className="hidden sm:block">
          <MiniCalendar
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            getDotsForDate={getDotsForDate}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {selectedDate && (
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold">{format(selectedDate, "EEEE, MMMM d")}</p>
              <button className="text-xs text-muted-foreground hover:text-foreground" onClick={() => setSelectedDate(null)}>
                Show all upcoming
              </button>
            </div>
          )}

          {viewMode === "agenda" || selectedDate ? (
            <AgendaView
              events={eventsToShow}
              userFunction={userProfile?.function}
              onSelect={setSelectedEvent}
            />
          ) : (
            // Month-list view
            <div className="space-y-1.5">
              {thisMonthEvents.length === 0 ? (() => {
                const nextEvent = filteredEvents.find(e => e.date && new Date(e.date) > new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0));
                return (
                  <div className="text-center py-10 text-sm text-muted-foreground space-y-2">
                    <p>No events this month.</p>
                    {nextEvent && (
                      <p>
                        Next event:{" "}
                        <button
                          onClick={() => setCurrentMonth(new Date(nextEvent.date))}
                          className="text-primary font-medium hover:underline"
                        >
                          {nextEvent.title}
                        </button>
                        {" "}on {format(new Date(nextEvent.date), "MMMM d, yyyy")}
                      </p>
                    )}
                  </div>
                );
              })() : (
                thisMonthEvents.map((event, i) => {
                  const dotC = event._layer === "deadline" ? "bg-red-400" : event._layer === "industry" ? "bg-lux-blue" : "bg-gray-400";
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedEvent(event)}
                      className="w-full text-left flex items-center gap-3 p-3 rounded-xl border bg-card hover:border-primary/40 hover:shadow-sm transition-all"
                    >
                      <div className={cn("w-2 h-2 rounded-full shrink-0", dotC)} />
                      <span className="text-xs text-muted-foreground w-20 shrink-0">{event.date ? format(new Date(event.date), "MMM d") : "Recurring"}</span>
                      <span className="text-sm font-medium flex-1 truncate">{event.title}</span>
                      {event.source && <span className="text-[10px] text-muted-foreground shrink-0">{event.source}</span>}
                      {event.organiser && <span className="text-[10px] text-muted-foreground shrink-0">{event.organiser}</span>}
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      {showModal && (
        <AddEventModal
          defaultDate={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); loadAll(); }}
        />
      )}
    </div>
  );
}