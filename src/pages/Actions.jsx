import React, { useState, useEffect } from "react";
import { ACTIONS_DATA, FUNCTIONS } from "@/lib/regData";
import { base44 } from "@/api/base44Client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import FunctionSwitcher from "@/components/shared/FunctionSwitcher";
import XPToast from "@/components/shared/XPToast";
import AddActionModal from "@/components/actions/AddActionModal";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Zap, Plus, Trash2, CalendarDays } from "lucide-react";
import { format } from "date-fns";

const priorityMeta = {
  high:   { color: "bg-red-50 text-red-700 border-red-200",       xp: 30 },
  medium: { color: "bg-amber-50 text-amber-700 border-amber-200", xp: 20 },
  low:    { color: "bg-emerald-50 text-emerald-700 border-emerald-200", xp: 10 },
};

const MILESTONES = [
  { pct: 25, label: "Quarter done! 🚀", icon: "🚀" },
  { pct: 50, label: "Halfway there! ⚡", icon: "⚡" },
  { pct: 75, label: "Almost there! 🔥", icon: "🔥" },
  { pct: 100, label: "All done! 🏆",    icon: "🏆" },
];

export default function Actions({ userProfile, onFunctionChange, onXPChange }) {
  const [completedActions, setCompletedActions] = useState(new Set());
  const [totalXP, setTotalXP] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [celebratedMilestones, setCelebratedMilestones] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [userTasks, setUserTasks] = useState([]);

  const suggestedActions = ACTIONS_DATA[userProfile.function] || [];
  const currentFunc = FUNCTIONS.find(f => f.id === userProfile.function);

  const loadUserTasks = async () => {
    try {
      const tasks = await base44.entities.UserAction.list();
      setUserTasks(tasks);
    } catch (err) {
      console.error("Failed to load user tasks:", err);
      setUserTasks([]);
    }
  };

  useEffect(() => { loadUserTasks(); }, [userProfile.function]);

  const showToast = (msg) => setToast({ visible: true, message: msg });

  // ── Suggested action toggle ───────────────────────────────────────────────
  const awardXP = async (delta) => {
    const newXP = Math.max(0, (userProfile.xp || 0) + delta);
    await base44.auth.updateMe({ xp: newXP });
    if (onXPChange) onXPChange(newXP);
  };

  const toggleSuggested = (action) => {
    const xpVal = priorityMeta[action.priority]?.xp || 10;
    setCompletedActions(prev => {
      const next = new Set(prev);
      if (next.has(action.id)) {
        next.delete(action.id);
        setTotalXP(p => Math.max(0, p - xpVal));
        awardXP(-xpVal);
      } else {
        next.add(action.id);
        setTotalXP(p => p + xpVal);
        showToast(`+${xpVal} XP earned!`);
        awardXP(xpVal);
      }
      return next;
    });
  };

  // ── User task toggle ──────────────────────────────────────────────────────
  const toggleUserTask = async (task) => {
    const xpVal = priorityMeta[task.priority]?.xp || 10;
    const newCompleted = !task.completed;
    await base44.entities.UserAction.update(task.id, { completed: newCompleted });
    if (newCompleted) {
      setTotalXP(p => p + xpVal);
      showToast(`+${xpVal} XP earned!`);
      await awardXP(xpVal);
    } else {
      setTotalXP(p => Math.max(0, p - xpVal));
      await awardXP(-xpVal);
    }
    loadUserTasks();
  };

  const deleteUserTask = async (id) => {
    await base44.entities.UserAction.delete(id);
    loadUserTasks();
  };

  // ── Progress ──────────────────────────────────────────────────────────────
  const totalCount = suggestedActions.length + userTasks.length;
  const doneCount = suggestedActions.filter(a => completedActions.has(a.id)).length
                  + userTasks.filter(t => t.completed).length;
  const progress = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

  useEffect(() => {
    for (const m of MILESTONES) {
      if (progress >= m.pct && !celebratedMilestones.has(m.pct) && doneCount > 0) {
        setCelebratedMilestones(prev => new Set([...prev, m.pct]));
        setTimeout(() => showToast(m.label), 300);
        break;
      }
    }
  }, [progress]);

  const progressColor =
    progress === 100 ? "from-emerald-400 to-teal-500" :
    progress >= 50   ? "from-primary to-purple-500" :
                       "from-lux-blue to-lux-red";

  return (
    <div className="space-y-5">
      <XPToast message={toast.message} visible={toast.visible} onHide={() => setToast(p => ({ ...p, visible: false }))} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">My Actions</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Regulatory tasks for {currentFunc?.label || "your function"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FunctionSwitcher currentFunction={userProfile.function} onChange={onFunctionChange} />
          <Button size="sm" className="h-8 gap-1.5 text-xs shrink-0" onClick={() => setShowModal(true)}>
            <Plus className="w-3.5 h-3.5" /> Add Task
          </Button>
        </div>
      </div>

      {/* Progress card */}
      <Card className="p-5 bg-gradient-to-br from-card to-secondary/40 border-2 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <Trophy className="w-full h-full text-primary" />
        </div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold">{doneCount} of {totalCount} completed</p>
            <p className="text-xs text-muted-foreground">+{totalXP} XP earned this session</p>
          </div>
          <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
          </div>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full bg-gradient-to-r", progressColor)}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <div className="relative h-0">
          {MILESTONES.map(m => (
            <div key={m.pct} className="absolute -top-4 -translate-x-1/2" style={{ left: `${m.pct}%` }}>
              <span className={cn("text-xs transition-all", celebratedMilestones.has(m.pct) ? "opacity-100 scale-125" : "opacity-20")}>
                {m.icon}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Suggested actions */}
      {suggestedActions.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground px-0.5">
            Suggested for your role
          </p>
          <AnimatePresence>
            {suggestedActions.map((action, i) => {
              const isDone = completedActions.has(action.id);
              const meta = priorityMeta[action.priority] || priorityMeta.low;
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.22 }}
                  layout
                >
                  <Card
                    className={cn(
                      "p-4 flex items-start gap-3 transition-all cursor-pointer group",
                      isDone ? "bg-emerald-50/60 border-emerald-200" : "hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
                    )}
                    onClick={() => toggleSuggested(action)}
                  >
                    <motion.div animate={{ scale: isDone ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
                      <Checkbox checked={isDone} onCheckedChange={() => toggleSuggested(action)} className="mt-0.5" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium transition-all", isDone && "line-through text-muted-foreground")}>
                        {action.text}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">+{meta.xp} XP</p>
                    </div>
                    <Badge variant="secondary" className={cn("text-[10px] shrink-0", meta.color)}>
                      {action.priority}
                    </Badge>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* User tasks */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">My Custom Tasks</p>
          <button onClick={() => setShowModal(true)} className="text-[11px] text-primary font-medium hover:underline flex items-center gap-1">
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>

        {userTasks.length === 0 ? (
          <Card className="p-5 border-dashed flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-xs text-muted-foreground">No custom tasks yet.</p>
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={() => setShowModal(true)}>
              <Plus className="w-3 h-3" /> Add your first task
            </Button>
          </Card>
        ) : (
          <AnimatePresence>
            {userTasks.map((task, i) => {
              const meta = priorityMeta[task.priority] || priorityMeta.low;
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.22 }}
                  layout
                >
                  <Card
                    className={cn(
                      "p-4 flex items-start gap-3 transition-all cursor-pointer group",
                      task.completed ? "bg-emerald-50/60 border-emerald-200" : "hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
                    )}
                    onClick={() => toggleUserTask(task)}
                  >
                    <motion.div animate={{ scale: task.completed ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
                      <Checkbox checked={task.completed} onCheckedChange={() => toggleUserTask(task)} className="mt-0.5" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium transition-all", task.completed && "line-through text-muted-foreground")}>
                        {task.text}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <p className="text-[10px] text-muted-foreground">+{meta.xp} XP</p>
                        {task.due_date && (
                          <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                            <CalendarDays className="w-2.5 h-2.5" />
                            {format(new Date(task.due_date), "MMM d")}
                          </span>
                        )}
                        {task.from_calendar && (
                          <span className="text-[10px] bg-lux-blue-light text-lux-blue px-1.5 py-0.5 rounded-full font-medium">
                            📅 from Calendar
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Badge variant="secondary" className={cn("text-[10px]", meta.color)}>{task.priority}</Badge>
                      <button
                        onClick={e => { e.stopPropagation(); deleteUserTask(task.id); }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {showModal && (
        <AddActionModal
          functionId={userProfile.function}
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); loadUserTasks(); }}
        />
      )}
    </div>
  );
}