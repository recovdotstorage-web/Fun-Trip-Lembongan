"use client";

import { motion } from "framer-motion";

export function UniversalLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-12 h-12 border-[1.5px] border-zinc-100 rounded-full" />
          <motion.div
            className="absolute inset-0 border-[1.5px] border-zinc-900 rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-zinc-400">
          Loading experience
        </span>
      </div>
    </motion.div>
  );
}

