import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const EVENT_TYPES = [
  { id: "committee",  label: "Committee",        emoji: "🏛️" },
  { id: "board",      label: "Board Meeting",    emoji: "👔" },
  { id: "deadline",   label: "Regulatory Deadline", emoji: "⚠️" },
  { id: "reporting",  label: "Reporting",        emoji: "📊" },
  { id: "audit",      label: "Audit / Review",   emoji: "🔎" },
  { id: "regulator",  label: "Regulator Meeting",emoji: "🏛️" },
  { id: "internal",   label: "Internal Meeting", emoji: "🤝" },
  { id: "other",      label: "Other",            emoji: "📌" },
];

const RECURRENCE = [
  { id: "none",      label: "One-off" },
  { id: "monthly",   label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "annually",  label: "Annually" },
];

const SUGGESTIONS = [
  "Risk Committee", "Compliance Committee", "Audit Committee", "Board of Directors",
  "CSSF Supervisory Review", "Internal Audit", "AML/CFT Annual Review",
  "RMP Submission", "Annual Compliance Report", "Annual Audit Report",
  "SFDR Periodic Disclosure", "Annex IV Reporting", "BCL Reporting",
  "DORA Resilience Test", "Annual General Meeting (AGM)", "Investment Committee",
  "Valuation Committee", "Delegation Review", "KYC Refresh",
];

export default function AddEventModal({ onClose, onSaved, defaultDate }) {
  const [form, setForm] = useState({
    title: "",
    date: defaultDate || "",
    type: "committee",
    description: "",
    recurrence: "none",
  });
  const [saving, setSaving] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = SUGGESTIONS.filter(s =>
    form.title.length > 0 && s.toLowerCase().includes(form.title.toLowerCase())
  );

  const handleSave = async () => {
    if (!form.title || !form.date) return;
    setSaving(true);
    await base44.entities.CalendarEvent.create(form);
    setSaving(false);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <Card className="w-full max-w-md p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm">Add Calendar Event</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title with suggestions */}
        <div className="relative">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Event Title</label>
          <Input
            placeholder="e.g. Risk Committee, CSSF Review…"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="text-sm"
          />
          {showSuggestions && filtered.length > 0 && (
            <div className="absolute z-10 top-full mt-1 w-full bg-card border rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filtered.map(s => (
                <button
                  key={s}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-secondary transition-colors"
                  onMouseDown={() => setForm(f => ({ ...f, title: s }))}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Date</label>
          <Input
            type="date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            className="text-sm"
          />
        </div>

        {/* Type */}
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Type</label>
          <div className="flex flex-wrap gap-1.5">
            {EVENT_TYPES.map(t => (
              <button
                key={t.id}
                onClick={() => setForm(f => ({ ...f, type: t.id }))}
                className={cn(
                  "text-[11px] px-2.5 py-1 rounded-full border font-medium transition-all",
                  form.type === t.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40"
                )}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recurrence */}
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Recurrence</label>
          <div className="flex gap-1.5">
            {RECURRENCE.map(r => (
              <button
                key={r.id}
                onClick={() => setForm(f => ({ ...f, recurrence: r.id }))}
                className={cn(
                  "text-[11px] px-2.5 py-1 rounded-full border font-medium transition-all flex-1 text-center",
                  form.recurrence === r.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Notes (optional)</label>
          <Input
            placeholder="Any context or agenda notes…"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="text-sm"
          />
        </div>

        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1 text-sm h-9" onClick={onClose}>Cancel</Button>
          <Button
            className="flex-1 text-sm h-9"
            onClick={handleSave}
            disabled={!form.title || !form.date || saving}
          >
            {saving ? "Saving…" : "Add Event"}
          </Button>
        </div>
      </Card>
    </div>
  );
}