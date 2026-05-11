"use client";

import Link from "next/link";
import { Plus, Pencil, Eye, ChevronLeft, Trash2, Loader2 } from "lucide-react";
import { ReactNode, useTransition } from "react";

interface ButtonProps {
  href: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Standard Add Button for Admin Headers
 */
export function AddButton({ href, children = "Add New", className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`group relative w-full md:w-auto p-1 bg-zinc-900 rounded-2xl overflow-hidden active:scale-95 transition-all shadow-xl shadow-zinc-900/10 ${className}`}
    >
      <div className="relative px-8 py-4 md:py-3 bg-zinc-900 border border-white/10 rounded-[calc(1rem-4px)] flex items-center justify-center gap-3">
        <Plus className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-500" />
        <span className="text-[11px] font-bold text-white uppercase tracking-widest">
          {children}
        </span>
      </div>
    </Link>
  );
}

/**
 * Standard Edit Button
 */
export function EditButton({ 
  href, 
  className = "", 
  variant = "icon",
  label = "Edit Details"
}: ButtonProps & { variant?: "icon" | "full", label?: string }) {
  if (variant === "full") {
    return (
      <Link
        href={href}
        prefetch={false}
        className={`flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl active:scale-95 transition-all ${className}`}
      >
        <Pencil className="w-3.5 h-3.5" />
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      prefetch={false}
      className={`p-2.5 text-zinc-400 hover:text-zinc-900 hover:bg-white rounded-xl border border-transparent hover:border-zinc-100 transition-all ${className}`}
    >
      <Pencil className="w-4 h-4" />
    </Link>
  );
}

/**
 * Standard View Button
 */
export function ViewButton({ 
  href, 
  className = "", 
  variant = "icon",
  target = "_blank"
}: ButtonProps & { variant?: "icon" | "full", target?: string }) {
  if (variant === "full") {
    return (
      <Link
        href={href}
        target={target}
        prefetch={false}
        className={`w-12 h-12 flex items-center justify-center bg-zinc-50 text-zinc-400 rounded-xl border border-zinc-100 active:scale-95 transition-all ${className}`}
      >
        <Eye className="w-4 h-4" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      target={target}
      prefetch={false}
      className={`p-2.5 text-zinc-400 hover:text-zinc-900 hover:bg-white rounded-xl border border-transparent hover:border-zinc-100 transition-all ${className}`}
    >
      <Eye className="w-4 h-4" />
    </Link>
  );
}


/**
 * Standard Back Button for Edit/New Pages
 */
export function BackButton({ href, children = "Back to List", className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors group mb-8 ${className}`}
    >
      <div className="w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center group-hover:border-zinc-200 transition-colors">
        <ChevronLeft className="w-4 h-4" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest">{children}</span>
    </Link>
  );
}

export { DeleteButton } from "./DeleteButton";
export type { DeleteButtonProps } from "./DeleteButton";
