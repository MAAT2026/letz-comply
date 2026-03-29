import React from "react";
import { X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";

export default function SoftGateModal({ onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card rounded-2xl border border-border shadow-2xl max-w-md w-full p-8 relative"
      >
        <button onClick={onDismiss} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <div className="text-4xl mb-4">😊</div>
          <h2 className="text-xl font-bold text-foreground mb-2">You're clearly interested in Luxembourg fund regulation</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Create a free account to get full AI analysis, personalised feeds, and daily email digests.
          </p>
          <button
            onClick={() => base44.auth.redirectToLogin("/app/feed")}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm mb-3"
          >
            Sign Up Free
          </button>
          <button onClick={onDismiss} className="text-sm text-muted-foreground hover:text-foreground underline">
            Continue exploring
          </button>
        </div>
      </motion.div>
    </div>
  );
}