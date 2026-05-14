"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { ConfirmationModal } from "./ConfirmationModal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface DeleteButtonProps {
  id: string;
  name: string;
  title?: string;
  action: (id: string) => Promise<any>;
  onSuccess?: () => void;
  redirectTo?: string;
  className?: string;
  variant?: "icon" | "button" | "full" | "outline";
  label?: string;
  confirmMessage?: string;
}

/**
 * A generic delete button with confirmation modal.
 * Used across all admin CRUD modules.
 */
export function DeleteButton({
  id,
  name,
  title = "Item",
  action,
  onSuccess,
  redirectTo,
  className = "",
  variant = "icon",
  label = "Delete",
  confirmMessage,
}: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await action(id);
        
        if (result?.error) {
          toast.error(result.error);
          return;
        }

        toast.success(`${title} deleted successfully`);
        setIsOpen(false);
        
        if (onSuccess) {
          onSuccess();
        } else if (redirectTo) {
          router.push(redirectTo);
          router.refresh();
        } else {
          router.refresh();
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error(`Failed to delete ${title.toLowerCase()}`);
      }
    });
  };

  const getButtonClass = () => {
    if (className) return className;
    
    switch (variant) {
      case "full":
        return "flex-1 flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-rose-100 active:scale-95 transition-all";
      case "button":
        return "px-4 py-2 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-rose-700 active:scale-95 transition-all flex items-center gap-2";
      case "outline":
        return "px-4 py-2 border border-rose-200 text-rose-600 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-rose-50 active:scale-95 transition-all flex items-center gap-2";
      case "icon":
      default:
        return "p-2.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100 transition-all";
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={isPending}
        className={getButtonClass()}
        title={`Delete ${title}`}
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
        {(variant === "button" || variant === "full" || variant === "outline") && (
          <span>{isPending ? "Deleting..." : label}</span>
        )}
      </button>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        isPending={isPending}
        title={`Delete ${title}`}
        message={
          confirmMessage || 
          `Are you sure you want to delete "${name}"? This action is permanent and cannot be undone.`
        }
        confirmText="Confirm Delete"
        variant="danger"
      />
    </>
  );
}
