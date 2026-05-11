import { ReactNode } from "react";
import { AddButton, BackButton } from "./AdminButtons";

interface AdminHeaderProps {
  title: string;
  subtitle: string;
  highlight?: string;
  category?: string;
  addButton?: {
    href: string;
    label: string;
  };
  backButton?: {
    href: string;
    label?: string;
  };
  children?: ReactNode;
}

export function AdminHeader({
  title,
  subtitle,
  highlight,
  category = "Management System",
  addButton,
  backButton,
  children,
}: AdminHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
      <div className="space-y-4">
        {backButton && (
          <BackButton href={backButton.href}>{backButton.label}</BackButton>
        )}
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
            {category}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-zinc-900 tracking-tighter font-serif italic leading-none">
          {title} {highlight && <span className="font-semibold not-italic">{highlight}</span>}
        </h1>
        <p className="text-zinc-500 font-light text-sm max-w-md leading-relaxed">
          {subtitle}
        </p>
      </div>

      {addButton && (
        <AddButton href={addButton.href}>
          {addButton.label}
        </AddButton>
      )}
      
      {children}
    </div>
  );
}
