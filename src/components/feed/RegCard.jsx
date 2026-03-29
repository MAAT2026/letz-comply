import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { computeRelevanceScore } from "@/lib/regData";

const sourceColors = {
  CSSF: "bg-lux-red-light text-lux-red border-transparent",
  ESMA: "bg-lux-blue-light text-lux-blue border-transparent",
  ALFI: "bg-emerald-50 text-emerald-700 border-transparent",
  LPEA: "bg-purple-50 text-purple-700 border-transparent",
};

const relevanceMeta = {
  high: { color: "bg-red-50 text-red-700", dot: "bg-red-500", glow: "shadow-red-100" },
  medium: { color: "bg-amber-50 text-amber-700", dot: "bg-amber-500", glow: "shadow-amber-50" },
  low: { color: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500", glow: "" },
};

export default function RegCard({ regulation, userFunction, onClick, index = 0, userProfile }) {
  const forYou = regulation.forYou?.[userFunction];
  const score = userProfile ? computeRelevanceScore(regulation, userProfile) : null;
  const scoreBadgeColor = score > 70 ? "#10B981" : score > 40 ? "#F59E0B" : "#9CA3AF";
  const scoreBadgeBg = score > 70 ? "bg-emerald-50" : score > 40 ? "bg-amber-50" : "bg-gray-100";
  const scoreBadgeText = score > 70 ? "text-emerald-700" : score > 40 ? "text-amber-700" : "text-gray-600";
  const applicableTo = regulation.applicableTo || [];
  const segment = userProfile?.segment;
  const fundTypeLabel = applicableTo.length >= 10 ? "All fund types" : segment && applicableTo.includes(segment) ? "2713 " + segment : applicableTo.length > 0 ? "Other types" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "p-4 sm:p-5 cursor-pointer transition-all group relative overflow-hidden",
          "hover:shadow-xl hover:border-primary/30 hover:-translate-y-0.5",
          score > 70 && "shadow-md shadow-red-50"
        )}
        onClick={onClick}
      >
        {/* Gradient accent bar left */}
        <div className={cn(
          "absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all group-hover:w-1.5",
          score > 70 ? "bg-gradient-to-b from-lux-red to-orange-400" :
          score > 40 ? "bg-gradient-to-b from-amber-400 to-yellow-300" :
          "bg-gradient-to-b from-emerald-400 to-teal-300"
        )} />

        <div className="flex items-start justify-between gap-3 pl-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="secondary" className={cn("text-[10px] font-semibold", sourceColors[regulation.source])}>
                {regulation.source}
              </Badge>
              <span className={cn("inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full", rel.color)}>
                <span className={cn("w-1.5 h-1.5 rounded-full", scoreBadgeColor)} />
                {score !== null && score + "% match"}
              </span>
              {fundTypeLabel && (
                <span className="text-[10px] text-muted-foreground">{fundTypeLabel}</span>
              )}
              <span className="text-[10px] text-muted-foreground">{regulation.date}</span>
            </div>
            <h3 className="font-semibold text-sm leading-snug text-foreground group-hover:text-primary transition-colors">
              {regulation.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
              {regulation.summary}
            </p>
            {forYou && (
              <div className="mt-3 p-2.5 rounded-lg bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/10">
                <div className="flex items-center gap-1 mb-0.5">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                    What this means for you
                  </p>
                </div>
                <p className="text-xs font-medium text-foreground">{forYou.headline}</p>
              </div>
            )}
          </div>
          <motion.div
            className="shrink-0 mt-1"
            animate={{ x: 0 }}
            whileHover={{ x: 3 }}
          >
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}