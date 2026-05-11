"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { ConfirmationModal } from "./ConfirmationModal";

export interface DeleteButtonProps {
  action: (id: string) => Promise<void>;
  id: string;
  name: string;
  variant?: "icon" | "full";
  className?: string;
  onSuccess?: () => void;
}

/**
 * Standard Delete Button with Confirmation for all Admin Pages
 */
export function DeleteButton({ 
  action, 
  id, 
  name, 
  variant = "full", 
  className = "",
  onSuccess 
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleConfirmDelete() {
    startTransition(async () => {
      try {
        await action(id);
        setIsModalOpen(false);
        if (onSuccess) onSuccess();
      } catch (error: any) {
        // Next.js redirect() throws a special error that should not be caught as a real error
        if (error.message?.includes("NEXT_REDIRECT")) {
          return;
        }
        alert(error.message || "Failed to delete item");
      }
    });
  }

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          disabled={isPending}
          className={`p-2.5 text-zinc-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100 transition-all group active:scale-95 disabled:opacity-50 ${className}`}
          title={`Delete ${name}`}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
          ) : (
            <Trash2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          )}
        </button>
      ) : (
        <button
          type="button"
          disabled={isPending}
          onClick={() => setIsModalOpen(true)}
          className={`inline-flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition shadow-lg shadow-rose-500/20 disabled:opacity-60 active:scale-95 ${className}`}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          {isPending ? "Deleting..." : "Delete Item"}
        </button>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isPending={isPending}
        title="Delete Confirmation"
        message={`Are you sure you want to delete "${name}"? This action cannot be undone and will permanently remove the data.`}
        confirmText="Yes, Delete"
      />
    </>
  );
}
