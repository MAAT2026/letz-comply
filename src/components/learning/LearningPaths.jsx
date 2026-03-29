import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { LEARNING_PATHS, getRecommendedPaths } from "@/lib/learningPaths";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, BookOpen, ChevronRight, CheckCircle2, Trophy, Star, Lock, ArrowLeft } from "lucide-react";
import PathDetail from "./PathDetail";
import XPToast from "@/components/shared/XPToast";
import GapAnalysisPanel from "./GapAnalysisPanel";

const STORAGE_KEY = "letzcomply_learning_progress";

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const colorMap = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-700 border-red-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  pink: "bg-pink-50 text-pink-700 border-pink-200",
  slate: "bg-slate-50 text-slate-700 border-slate-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  teal: "bg-teal-50 text-teal-700 border-teal-200",
};

const dotMap = {
  blue: "bg-blue-500", emerald: "bg-emerald-500", amber: "bg-amber-500",
  red: "bg-red-500", rose: "bg-rose-500", pink: "bg-pink-500",
  slate: "bg-slate-500", purple: "bg-purple-500", orange: "bg-orange-500",
  indigo: "bg-indigo-500", yellow: "bg-yellow-500", teal: "bg-teal-500",
};

export default function LearningPaths({ userProfile, onXPChange }) {
  const [progress, setProgress] = useState(loadProgress);
  const [selectedPath, setSelectedPath] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [browsingFnId, setBrowsingFnId] = useState(null); // null = user's own function

  const fnId = userProfile?.function;
  const seniority = userProfile?.seniority || "";

  // Active function is either the one being browsed or the user's own
  const activeFnId = browsingFnId || fnId;
  const fnData = LEARNING_PATHS[activeFnId];
  const paths = fnData ? getRecommendedPaths(activeFnId, seniority) : [];

  const totalXP = Object.values(progress).reduce((sum, p) => sum + (p.xp || 0), 0);
  const totalModules = paths.reduce((s, p) => s + p.modules.length, 0);
  const completedModules = paths.reduce((s, p) =>
    s + p.modules.filter(m => progress[m.id]?.done).length, 0);
  const isBrowsing = !!browsingFnId;

  const handleModuleComplete = async (moduleId, xp) => {
    if (progress[moduleId]?.done) return;
    const next = { ...progress, [moduleId]: { done: true, xp } };
    setProgress(next);
    saveProgress(next);
    setToast({ visible: true, message: `+${xp} XP earned!` });

    // Persist to user profile and update XPBar
    const newTotalXP = (userProfile?.xp || 0) + xp;
    onXPChange?.(newTotalXP);
    await base44.auth.updateMe({ xp: newTotalXP });
  };

  const getPathProgress = (path) => {
    const done = path.modules.filter(m => progress[m.id]?.done).length;
    return { done, total: path.modules.length, pct: Math.round((done / path.modules.length) * 100) };
  };

  if (selectedPath) {
    return (
      <>
        <XPToast message={toast.message} visible={toast.visible} onHide={() => setToast(p => ({ ...p, visible: false }))} />
        {isBrowsing && (
          <div className={cn("mb-3 px-3 py-2 rounded-lg border text-xs flex items-center gap-2", colorMap[fnData?.color || "blue"])}>
            <span className="text-base">{fnData?.icon}</span>
            <span>Browsing <strong>{fnData?.label}</strong> paths — XP still counts towards your total!</span>
          </div>
        )}
        <PathDetail
          path={selectedPath}
          fnColor={fnData?.color || "blue"}
          progress={progress}
          onModuleComplete={handleModuleComplete}
          onBack={() => setSelectedPath(null)}
        />
      </>
    );
  }

  if (!fnId || !LEARNING_PATHS[fnId]) {
    return (
      <div className="text-center py-12 space-y-3">
        <div className="text-4xl">📚</div>
        <p className="text-sm font-medium">Complete your profile to unlock learning paths</p>
        <p className="text-xs text-muted-foreground">Your function determines which learning paths are personalised for you.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <XPToast message={toast.message} visible={toast.visible} onHide={() => setToast(p => ({ ...p, visible: false }))} />

      {/* Header stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 flex flex-col items-center justify-center text-center gap-1">
          <div className="flex items-center gap-1 text-primary">
            <Zap className="w-4 h-4" />
            <span className="text-xl font-bold">{totalXP}</span>
          </div>
          <p className="text-[10px] text-muted-foreground">XP earned</p>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center gap-1">
          <div className="flex items-center gap-1 text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xl font-bold">{completedModules}</span>
          </div>
          <p className="text-[10px] text-muted-foreground">of {totalModules} modules</p>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center gap-1">
          <div className="flex items-center gap-1 text-amber-500">
            <Trophy className="w-4 h-4" />
            <span className="text-xl font-bold">{paths.filter(p => getPathProgress(p).pct === 100).length}</span>
          </div>
          <p className="text-[10px] text-muted-foreground">paths completed</p>
        </Card>
      </div>

      {/* Paths for this function */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{fnData.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-base text-foreground">{fnData.label} Learning Paths</h3>
              {isBrowsing && (
                <Badge className="text-[9px] py-0 px-1.5 bg-amber-100 text-amber-700 border-amber-200">Exploring</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isBrowsing ? (
                <button onClick={() => setBrowsingFnId(null)} className="text-primary hover:underline">
                  ← Back to your {LEARNING_PATHS[fnId]?.label} paths
                </button>
              ) : "Personalised for your role and seniority"}
            </p>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {paths.map((path, i) => {
            const { done, total, pct } = getPathProgress(path);
            const isComplete = pct === 100;
            const isLocked = !isBrowsing && !path.recommended && i > 0 && getPathProgress(paths[0]).pct < 50;
            const color = fnData.color;

            return (
              <motion.div key={path.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Card
                  className={cn(
                    "p-4 transition-all cursor-pointer group",
                    isComplete ? "border-emerald-300 bg-emerald-50/40" : "hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5",
                    isLocked && "opacity-60 cursor-not-allowed"
                  )}
                  onClick={() => !isLocked && setSelectedPath(path)}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 border", colorMap[color])}>
                      {isComplete ? <Trophy className="w-5 h-5" /> : isLocked ? <Lock className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-sm">{path.title}</h4>
                        {path.recommended && (
                          <Badge className="text-[9px] py-0 px-1.5 bg-primary/10 text-primary border-primary/20 gap-0.5">
                            <Star className="w-2.5 h-2.5" /> Recommended
                          </Badge>
                        )}
                        {isComplete && (
                          <Badge className="text-[9px] py-0 px-1.5 bg-emerald-100 text-emerald-700 border-emerald-200">
                            ✓ Complete
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{path.description}</p>

                      <div className="mt-3 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span>{done}/{total} modules</span>
                          <span className="font-medium text-primary">{path.xp} XP available</span>
                        </div>
                        <Progress value={pct} className="h-1.5" />
                      </div>
                    </div>

                    <ChevronRight className={cn("w-4 h-4 text-muted-foreground shrink-0 mt-1 transition-transform", !isLocked && "group-hover:translate-x-0.5")} />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Gap Analysis */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Identify your gaps</p>
        <GapAnalysisPanel userProfile={userProfile} />
      </div>

      {/* Other functions teaser */}
      {!isBrowsing && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Explore other functions</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(LEARNING_PATHS).filter(([id]) => id !== fnId).map(([id, fn]) => (
              <button
                key={id}
                onClick={() => { setBrowsingFnId(id); setSelectedPath(null); }}
                className={cn("px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all hover:shadow-sm hover:-translate-y-0.5", colorMap[fn.color])}
              >
                {fn.icon} {fn.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">Click any function to explore its learning paths. XP earned counts towards your total.</p>
        </div>
      )}
    </div>
  );
}