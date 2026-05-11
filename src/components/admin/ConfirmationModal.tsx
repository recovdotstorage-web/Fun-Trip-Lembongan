"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isPending?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
  isPending = false,
}: ConfirmationModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const colors = {
    danger: {
      bg: "bg-rose-50",
      icon: "text-rose-600",
      button: "bg-rose-600 hover:bg-rose-700 shadow-rose-500/20",
      border: "border-rose-100",
    },
    warning: {
      bg: "bg-amber-50",
      icon: "text-amber-600",
      button: "bg-amber-600 hover:bg-amber-700 shadow-amber-500/20",
      border: "border-amber-100",
    },
    info: {
      bg: "bg-zinc-50",
      icon: "text-zinc-600",
      button: "bg-zinc-900 hover:bg-zinc-800 shadow-zinc-900/20",
      border: "border-zinc-100",
    },
  };

  const style = colors[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-12 h-12 rounded-2xl ${style.bg} flex items-center justify-center shrink-0`}>
                  <AlertTriangle className={`w-6 h-6 ${style.icon}`} />
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors rounded-xl hover:bg-zinc-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-zinc-900">{title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isPending}
                  className="flex-1 px-6 py-3 text-sm font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-2xl transition-all border border-transparent hover:border-zinc-100 disabled:opacity-50"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isPending}
                  className={`flex-1 px-6 py-3 text-sm font-bold text-white rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${style.button}`}
                >
                  {isPending ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : null}
                  {isPending ? "Processing..." : confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
