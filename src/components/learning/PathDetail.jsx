import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, BookOpen, HelpCircle, Zap, Clock, ChevronRight, Trophy, ExternalLink, ChevronDown } from "lucide-react";
import QuizModal from "./QuizModal";

const colorMap = {
  blue: "text-blue-600 bg-blue-50", emerald: "text-emerald-600 bg-emerald-50",
  amber: "text-amber-600 bg-amber-50", red: "text-red-600 bg-red-50",
  rose: "text-rose-600 bg-rose-50", pink: "text-pink-600 bg-pink-50",
  slate: "text-slate-600 bg-slate-50", purple: "text-purple-600 bg-purple-50",
  orange: "text-orange-600 bg-orange-50", indigo: "text-indigo-600 bg-indigo-50",
  yellow: "text-yellow-600 bg-yellow-50", teal: "text-teal-600 bg-teal-50",
};

export default function PathDetail({ path, fnColor, progress, onModuleComplete, onBack }) {
  const [activeModule, setActiveModule] = useState(null);
  const [readModules, setReadModules] = useState(new Set());
  const [expandedModule, setExpandedModule] = useState(null);

  const done = path.modules.filter(m => progress[m.id]?.done).length;
  const pct = Math.round((done / path.modules.length) * 100);

  const handleMarkRead = (module) => {
    if (progress[module.id]?.done) return;
    setReadModules(prev => new Set([...prev, module.id]));
    onModuleComplete(module.id, module.xp);
  };

  const handleQuizComplete = (module) => {
    onModuleComplete(module.id, module.xp);
    setActiveModule(null);
  };

  return (
    <div className="space-y-5">
      {activeModule && activeModule.type === "quiz" && (
        <QuizModal
          module={activeModule}
          onComplete={() => handleQuizComplete(activeModule)}
          onClose={() => setActiveModule(null)}
        />
      )}

      {/* Header */}
      <div>
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to paths
        </button>
        <h3 className="text-xl font-bold">{path.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{path.description}</p>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex-1">
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span>{done}/{path.modules.length} modules complete</span>
              <span className="font-medium text-primary">{pct}%</span>
            </div>
            <Progress value={pct} className="h-2" />
          </div>
          <div className="flex items-center gap-1 text-primary shrink-0">
            <Zap className="w-3.5 h-3.5" />
            <span className="text-sm font-bold">{path.xp} XP</span>
          </div>
        </div>

        {pct === 100 && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3">
            <Trophy className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-emerald-800">Path complete!</p>
              <p className="text-xs text-emerald-600">You've earned all {path.xp} XP from this path.</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Module list */}
      <div className="space-y-2">
        {path.modules.map((module, i) => {
          const isDone = progress[module.id]?.done;
          const isQuiz = module.type === "quiz";

          return (
            <motion.div key={module.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <Card
                className={cn(
                  "p-4 transition-all",
                  isDone ? "bg-emerald-50/50 border-emerald-200" : "hover:shadow-sm hover:border-primary/20"
                )}
              >
                <div
                  className={cn("flex items-start gap-3", !isQuiz && "cursor-pointer")}
                  onClick={() => !isQuiz && setExpandedModule(expandedModule === module.id ? null : module.id)}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-all mt-0.5",
                    isDone ? "bg-emerald-500 text-white" : cn(colorMap[fnColor], "border border-current/20")
                  )}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : isQuiz ? <HelpCircle className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={cn("text-sm font-medium", isDone && "line-through text-muted-foreground")}>{module.title}</p>
                      <Badge variant="outline" className="text-[9px] py-0 px-1.5">
                        {isQuiz ? "Quiz" : "Read"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" /> {module.duration}</span>
                      <span className="flex items-center gap-0.5 text-primary"><Zap className="w-2.5 h-2.5" /> +{module.xp} XP</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {!isDone && (
                      <Button
                        size="sm"
                        variant={isQuiz ? "default" : "outline"}
                        className="h-7 text-xs gap-1"
                        onClick={e => { e.stopPropagation(); isQuiz ? setActiveModule(module) : handleMarkRead(module); }}
                      >
                        {isQuiz ? "Start Quiz" : "Mark Read"}
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    )}
                    {isDone && (
                      <Badge className="text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200">✓ Done</Badge>
                    )}
                    {!isQuiz && (
                      <motion.div animate={{ rotate: expandedModule === module.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {!isQuiz && expandedModule === module.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pl-11 space-y-3">
                        {module.content && (
                          <p className="text-xs text-foreground/80 leading-relaxed">{module.content}</p>
                        )}
                        {module.sources?.length > 0 && (
                          <div className="space-y-1.5">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Primary sources</p>
                            {module.sources.map((src, si) => (
                              <div key={si} className="flex items-start gap-2 bg-secondary/70 rounded-lg px-2.5 py-1.5">
                                <BookOpen className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                                <div>
                                  <span className="text-[11px] font-semibold text-foreground">{src.label}</span>
                                  {src.ref && <span className="text-[11px] text-muted-foreground"> — {src.ref}</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}