import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SaveProjectModal({ open, onClose, type, data, existingProject }) {
  const [name, setName] = useState(existingProject?.name || "");
  const [notes, setNotes] = useState(existingProject?.notes || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const payload = { name: name.trim(), notes, type, data, status: "in-progress" };
    if (existingProject?.id) {
      await base44.entities.Project.update(existingProject.id, payload);
    } else {
      await base44.entities.Project.create(payload);
    }
    setSaving(false);
    onClose(true);
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{existingProject ? "Update Project" : "Save Project"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Project name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Acme RAIF 2025" autoFocus />
          </div>
          <div className="space-y-1.5">
            <Label>Notes <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any context or notes…" rows={3} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onClose(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving || !name.trim()}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}