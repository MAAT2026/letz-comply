import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

export default function XPToast({ message, visible, onHide }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onHide, 2000);
      return () => clearTimeout(t);
    }
  }, [visible, onHide]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
        >
          <div className="flex items-center gap-2 bg-gradient-to-r from-primary to-purple-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-2xl">
            <Zap className="w-4 h-4" />
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}