import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap, Trophy, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const LEVELS = [
  { level: 1, label: "Trainee", min: 0, max: 100, color: "from-slate-400 to-slate-500" },
  { level: 2, label: "Associate", min: 100, max: 250, color: "from-emerald-400 to-teal-500" },
  { level: 3, label: "Analyst", min: 250, max: 500, color: "from-blue-400 to-cyan-500" },
  { level: 4, label: "Expert", min: 500, max: 900, color: "from-violet-400 to-purple-500" },
  { level: 5, label: "Regulator", min: 900, max: 1500, color: "from-amber-400 to-orange-500" },
];

function getLevelInfo(xp) {
  return LEVELS.find(l => xp >= l.min && xp < l.max) || LEVELS[LEVELS.length - 1];
}

export default function XPBar({ xp = 120, streak = 3, readCount = 0 }) {
  const levelInfo = getLevelInfo(xp);
  const progress = ((xp - levelInfo.min) / (levelInfo.max - levelInfo.min)) * 100;
  const [showToast, setShowToast] = useState(null);

  return (
    <div className="relative">
      {/* XP Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg z-50 whitespace-nowrap"
          >
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-card/80 backdrop-blur-sm border-b px-4 sm:px-6 py-2">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          {/* Level badge */}
          <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r shrink-0", levelInfo.color)}>
            <Trophy className="w-3 h-3" />
            <span>Lv.{levelInfo.level} {levelInfo.label}</span>
          </div>

          {/* XP bar */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] text-muted-foreground font-medium">{xp} XP</span>
              <span className="text-[10px] text-muted-foreground">{levelInfo.max} XP</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full bg-gradient-to-r", levelInfo.color)}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1 shrink-0">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Flame className={cn("w-4 h-4", streak > 0 ? "text-orange-500" : "text-muted-foreground")} />
            </motion.div>
            <span className="text-xs font-bold text-foreground">{streak}</span>
            <span className="text-[10px] text-muted-foreground hidden sm:inline">day streak</span>
          </div>

          {/* Articles read */}
          <div className="items-center gap-1 shrink-0 hidden sm:flex">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground">{readCount}</span>
            <span className="text-[10px] text-muted-foreground">read</span>
          </div>
        </div>
      </div>
    </div>
  );
}