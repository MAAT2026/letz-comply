import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const PRIORITIES = [
  { id: "high",   label: "High",   color: "bg-red-50 text-red-700 border-red-200" },
  { id: "medium", label: "Medium", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "low",    label: "Low",    color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
];

const CATEGORIES = [
  { id: "compliance",  label: "Compliance",  emoji: "✅" },
  { id: "risk",        label: "Risk",        emoji: "⚠️" },
  { id: "reporting",   label: "Reporting",   emoji: "📊" },
  { id: "governance",  label: "Governance",  emoji: "🏛️" },
  { id: "aml",         label: "AML / KYC",  emoji: "🛡️" },
  { id: "operations",  label: "Operations",  emoji: "⚙️" },
  { id: "legal",       label: "Legal",       emoji: "⚖️" },
  { id: "other",       label: "Other",       emoji: "📌" },
];

const SUGGESTIONS = [
  "Review delegation agreement with fund administrator",
  "Update conflicts of interest register",
  "Prepare quarterly board pack",
  "Review and sign off on NAV report",
  "Conduct KYC refresh on investor",
  "Update business continuity plan",
  "Review AML/CFT risk assessment",
  "Prepare compliance monitoring report",
  "Review investment management agreement",
  "File quarterly regulatory report",
  "Schedule risk committee meeting",
  "Update valuation policy",
  "Perform DORA gap assessment",
  "Review SFDR disclosures",
  "Update fund prospectus",
  "Conduct delegate oversight review",
  "Prepare for CSSF supervisory visit",
  "Review whistleblowing reports",
  "Update sanctions screening list",
  "Complete annual AML training",
];

export default function AddActionModal({ onClose, onSaved, functionId }) {
  const [form, setForm] = useState({
    text: "",
    priority: "medium",
    category: "other",
    due_date: "",
    function_id: functionId || "",
  });
  const [saving, setSaving] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = SUGGESTIONS.filter(s =>
    form.text.length > 0 && s.toLowerCase().includes(form.text.toLowerCase())
  );

  const handleSave = async () => {
    if (!form.text.trim()) return;
    setSaving(true);
    await base44.entities.UserAction.create({ ...form, completed: false });
    setSaving(false);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <Card className="w-full max-w-md p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm">Add Custom Task</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title with suggestions */}
        <div className="relative">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Task</label>
          <Input
            placeholder="e.g. Review delegation agreement…"
            value={form.text}
            onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
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
                  onMouseDown={() => setForm(f => ({ ...f, text: s }))}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Priority */}
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Priority</label>
          <div className="flex gap-2">
            {PRIORITIES.map(p => (
              <button
                key={p.id}
                onClick={() => setForm(f => ({ ...f, priority: p.id }))}
                className={cn(
                  "flex-1 text-[11px] px-2 py-1.5 rounded-lg border font-semibold transition-all",
                  form.priority === p.id ? p.color : "bg-background text-muted-foreground border-border hover:border-primary/40"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Category</label>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setForm(f => ({ ...f, category: c.id }))}
                className={cn(
                  "text-[11px] px-2.5 py-1 rounded-full border font-medium transition-all",
                  form.category === c.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40"
                )}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Due date */}
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Due Date (optional)</label>
          <Input
            type="date"
            value={form.due_date}
            onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))}
            className="text-sm"
          />
        </div>

        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1 text-sm h-9" onClick={onClose}>Cancel</Button>
          <Button
            className="flex-1 text-sm h-9"
            onClick={handleSave}
            disabled={!form.text.trim() || saving}
          >
            {saving ? "Saving…" : "Add Task"}
          </Button>
        </div>
      </Card>
    </div>
  );
}