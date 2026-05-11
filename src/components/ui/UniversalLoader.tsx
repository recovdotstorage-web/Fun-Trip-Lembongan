"use client";

import { motion } from "framer-motion";

export function UniversalLoader() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative flex items-center justify-center">
          <motion.div
            className="w-10 h-10 border-2 border-zinc-100 border-t-zinc-900 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">
          Loading
        </span>
      </motion.div>
    </div>
  );
}
