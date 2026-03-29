import React, { useState } from "react";
import { Rocket, Briefcase, ArrowLeft, Save, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import FundWizard from "@/components/simulation/FundWizard";
import Onboard from "./Onboard";
import ProjectsPanel from "@/components/tools/ProjectsPanel";
import SaveProjectModal from "@/components/tools/SaveProjectModal";

export default function ToolsPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null); // null | "simulate" | "onboard"
  const [activeProject, setActiveProject] = useState(null); // project being edited
  const [showSave, setShowSave] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBack = () => {
    setMode(null);
    setActiveProject(null);
  };

  const handleSaved = (didSave) => {
    setShowSave(false);
    if (didSave) setRefreshKey(k => k + 1);
  };

  const handleOpenProject = (project) => {
    setActiveProject(project);
    setMode(project.type === "onboarding" ? "onboard" : "simulate");
  };

  if (mode === "simulate") {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </button>
          <button
            onClick={() => setShowSave(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-lux-blue hover:underline transition-colors"
          >
            <Save className="w-4 h-4" />
            {activeProject ? "Update project" : "Save project"}
          </button>
        </div>
        <div className="bg-gradient-to-br from-lux-blue/5 to-lux-red/5 rounded-xl">
          <FundWizard />
        </div>
        {showSave && (
          <SaveProjectModal
            open
            onClose={handleSaved}
            type="simulation"
            data={{}}
            existingProject={activeProject}
          />
        )}
      </div>
    );
  }

  if (mode === "onboard") {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </button>
          <button
            onClick={() => setShowSave(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-lux-red hover:underline transition-colors"
          >
            <Save className="w-4 h-4" />
            {activeProject ? "Update project" : "Save project"}
          </button>
        </div>
        <Onboard />
        {showSave && (
          <SaveProjectModal
            open
            onClose={handleSaved}
            type="onboarding"
            data={{}}
            existingProject={activeProject}
          />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-10">
      {/* Tool chooser */}
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Fund Tools</h1>
          <p className="text-muted-foreground text-sm">
            Simulate a fund structure or run a full client onboarding — then save your work as a project.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <button
            onClick={() => { setActiveProject(null); setMode("simulate"); }}
            className={cn(
              "group flex flex-col items-start gap-4 p-6 rounded-xl border bg-card text-left",
              "hover:border-lux-blue hover:shadow-md transition-all duration-200"
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-lux-blue/10 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-lux-blue" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-lg mb-1">Simulate Fund</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Explore fund structures, compare UCITS vs AIF regimes, estimate timelines, and validate regulatory requirements.
              </p>
            </div>
            <span className="text-xs font-medium text-lux-blue group-hover:underline mt-auto">
              Launch simulation →
            </span>
          </button>

          <button
            onClick={() => navigate("/app/fund-advisor")}
            className={cn(
              "group flex flex-col items-start gap-4 p-6 rounded-xl border bg-card text-left",
              "hover:border-purple-500 hover:shadow-md transition-all duration-200"
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-lg mb-1">Fund Structure Advisor</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Interactive wizard to identify the optimal Luxembourg fund vehicle for your strategy. Get AI-powered recommendations.
              </p>
            </div>
            <span className="text-xs font-medium text-purple-600 group-hover:underline mt-auto">
              Start advisor →
            </span>
          </button>

          <button
            onClick={() => { setActiveProject(null); setMode("onboard"); }}
            className={cn(
              "group flex flex-col items-start gap-4 p-6 rounded-xl border bg-card text-left",
              "hover:border-lux-red hover:shadow-md transition-all duration-200"
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-lux-red/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-lux-red" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-lg mb-1">Onboard Client</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Run a full structured onboarding — capture mandate details, investor profile, fund terms, services, and generate a proposal.
              </p>
            </div>
            <span className="text-xs font-medium text-lux-red group-hover:underline mt-auto">
              Start onboarding →
            </span>
          </button>
        </div>
      </div>

      {/* Projects */}
      <div className="border-t pt-8">
        <ProjectsPanel key={refreshKey} onOpen={handleOpenProject} />
      </div>
    </div>
  );
}