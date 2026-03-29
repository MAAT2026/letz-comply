import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { cn } from "@/lib/utils";
import { Rocket, Briefcase, Pencil, Trash2, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const TYPE_META = {
  simulation: { label: "Simulation", icon: Rocket, color: "text-lux-blue", bg: "bg-lux-blue/10", border: "hover:border-lux-blue" },
  onboarding: { label: "Onboarding", icon: Briefcase, color: "text-lux-red", bg: "bg-lux-red/10", border: "hover:border-lux-red" },
};

const STATUS_COLORS = {
  draft: "bg-secondary text-muted-foreground",
  "in-progress": "bg-amber-100 text-amber-700",
  complete: "bg-emerald-100 text-emerald-700",
};

export default function ProjectsPanel({ onOpen, onNew }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    base44.entities.Project.list("-updated_date", 50)
      .then(setProjects)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!confirm("Delete this project?")) return;
    await base44.entities.Project.delete(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  if (loading) return <div className="h-24 flex items-center justify-center text-sm text-muted-foreground">Loading projects…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground">My Projects</h2>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 border border-dashed rounded-xl text-muted-foreground text-sm">
          No saved projects yet. Start a simulation or onboarding above.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map(project => {
            const meta = TYPE_META[project.type] || TYPE_META.simulation;
            const Icon = meta.icon;
            return (
              <div
                key={project.id}
                onClick={() => onOpen(project)}
                className={cn(
                  "group relative flex flex-col gap-3 p-4 rounded-xl border bg-card cursor-pointer transition-all duration-200",
                  meta.border, "hover:shadow-md"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", meta.bg)}>
                    <Icon className={cn("w-4 h-4", meta.color)} />
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, project.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground leading-tight">{project.name}</p>
                  {project.notes && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{project.notes}</p>}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Badge className={cn("text-[10px] px-1.5 py-0 border-0", STATUS_COLORS[project.status])}>
                    {project.status}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {project.updated_date ? formatDistanceToNow(new Date(project.updated_date), { addSuffix: true }) : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}