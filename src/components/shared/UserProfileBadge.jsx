import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { ENTITY_TYPES, FUNCTIONS, SENIORITY_LEVELS, SEGMENTS } from "@/lib/regData";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogOut, Settings } from "lucide-react";

export default function UserProfileBadge() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Editable profile state
  const [entityType, setEntityType] = useState("");
  const [functionId, setFunctionId] = useState("");
  const [seniority, setSeniority] = useState("");
  const [segment, setSegment] = useState("");

  useEffect(() => {
    base44.auth.me().then((u) => {
      setUser(u);
      setEntityType(u.entityType || "");
      setFunctionId(u.function || "");
      setSeniority(u.seniority || "");
      setSegment(u.segment || "");
    }).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await base44.auth.updateMe({ entityType, function: functionId, seniority, segment });
    setUser(prev => ({ ...prev, entityType, function: functionId, seniority, segment }));
    setSaving(false);
    setOpen(false);
    // Reload so feed re-personalises
    window.location.reload();
  };

  if (!user) return null;

  const entity = ENTITY_TYPES.find(e => e.id === user.entityType);
  const func = FUNCTIONS.find(f => f.id === user.function);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="hidden sm:flex items-center gap-2 ml-2 hover:opacity-80 transition-opacity">
          {entity && (
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
              {entity.icon} {entity.label}
            </span>
          )}
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white",
            "bg-gradient-to-br from-lux-blue to-lux-red"
          )}>
            {user.full_name ? user.full_name[0].toUpperCase() : "?"}
          </div>
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-sm flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings className="w-4 h-4" /> Profile & Settings
          </SheetTitle>
        </SheetHeader>

        {/* User info */}
        <div className="flex items-center gap-3 mt-4 pb-4 border-b">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0",
            "bg-gradient-to-br from-lux-blue to-lux-red"
          )}>
            {user.full_name ? user.full_name[0].toUpperCase() : "?"}
          </div>
          <div>
            <p className="font-semibold text-sm">{user.full_name || "—"}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Settings form */}
        <div className="flex-1 overflow-y-auto space-y-5 py-4">
          {/* Entity type */}
          <div className="space-y-2">
            <Label className="text-sm">Firm type</Label>
            <div className="grid grid-cols-2 gap-2">
              {ENTITY_TYPES.map(et => (
                <button
                  key={et.id}
                  onClick={() => setEntityType(et.id)}
                  className={cn(
                    "p-2.5 rounded-xl border-2 text-left transition-all text-xs",
                    entityType === et.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <span>{et.icon}</span>
                  <p className="font-semibold mt-1 leading-tight">{et.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Department / Function */}
          <div className="space-y-2">
            <Label className="text-sm">Department / Function</Label>
            <div className="grid grid-cols-2 gap-2">
              {FUNCTIONS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFunctionId(f.id)}
                  className={cn(
                    "p-2.5 rounded-xl border-2 text-left transition-all flex items-center gap-2 text-xs",
                    functionId === f.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <span>{f.icon}</span>
                  <p className="font-medium">{f.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Seniority */}
          <div className="space-y-2">
            <Label className="text-sm">Seniority level</Label>
            <Select value={seniority} onValueChange={setSeniority}>
              <SelectTrigger>
                <SelectValue placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent>
                {SENIORITY_LEVELS.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Segment */}
          <div className="space-y-2">
            <Label className="text-sm">Primary fund segment <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <Select value={segment} onValueChange={setSegment}>
              <SelectTrigger>
                <SelectValue placeholder="Select segment" />
              </SelectTrigger>
              <SelectContent>
                {SEGMENTS.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t pt-4 space-y-2">
          <Button className="w-full" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-destructive"
            onClick={() => base44.auth.logout()}
          >
            <LogOut className="w-4 h-4 mr-2" /> Sign out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}