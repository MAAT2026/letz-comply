import React from "react";
import { X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";

export default function SoftGateBanner({ onDismiss }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground px-4 py-4 shadow-2xl"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm font-medium">
          You've explored 3 items — sign up free to unlock full AI summaries and personalised alerts.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => base44.auth.redirectToLogin("/app/feed")}
            className="bg-primary-foreground text-primary text-xs font-bold px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            Sign Up Free
          </button>
          <button onClick={onDismiss} className="text-white/70 hover:text-white text-xs underline">
            Maybe later
          </button>
          <button onClick={onDismiss} className="text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}