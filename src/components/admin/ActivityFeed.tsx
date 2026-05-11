"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, ChevronLeft, ChevronRight } from "lucide-react";

interface Log {
  id: string;
  action: string;
  entity: string;
  entityName?: string;
  adminEmail: string;
  createdAt: Date | string;
}

interface ActivityFeedProps {
  initialLogs: Log[];
}

export function ActivityFeed({ initialLogs }: ActivityFeedProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil(initialLogs.length / itemsPerPage);
  const currentLogs = initialLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function timeAgo(date: Date | string) {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-3">
          System Activity
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
             <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-zinc-600" />
            </button>
            <span className="text-[10px] font-bold text-zinc-900 min-w-[3rem] text-center uppercase tracking-widest">
              {currentPage} / {totalPages || 1}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 rounded-md hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            </button>
          </div>
        </div>
      </div>
        
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-100">
        <div className="divide-y divide-zinc-50 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              {currentLogs.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-sm text-zinc-300 font-light italic">No activity recorded.</p>
                </div>
              ) : (
                currentLogs.map((log) => (
                  <div key={log.id} className="group flex items-center justify-between px-8 py-5 hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center border border-zinc-100 bg-zinc-50 text-zinc-400 group-hover:text-zinc-900 group-hover:border-zinc-300 transition-all">
                        <History className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
                          {log.action} <span className="text-zinc-400">{log.entity}</span>
                        </p>
                        <p className="text-[10px] text-zinc-400 font-medium truncate max-w-[150px]">
                          By {log.adminEmail}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-zinc-900 tracking-tighter mb-1">
                        {log.entityName || "N/A"}
                      </p>
                      <p className="text-[8px] text-zinc-300 uppercase font-black tracking-widest italic">
                        {timeAgo(log.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Visual Telemetry Detail */}
        <div className="px-8 py-4 bg-zinc-50 flex items-center justify-between">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`w-1 h-1 rounded-full ${i <= (currentPage % 5 || 5) ? "bg-zinc-900/50" : "bg-zinc-200"}`} />
            ))}
          </div>
          <p className="text-[8px] font-bold text-zinc-400 tracking-[0.2em] uppercase">Page {currentPage} of {totalPages || 1}</p>
        </div>
      </div>
    </div>
  );
}
