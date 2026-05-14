"use client";

import { DeleteButton, DeleteButtonProps } from "./DeleteButton";

interface DangerZoneProps extends Omit<DeleteButtonProps, "variant" | "className"> {
  description?: string;
  containerClassName?: string;
}

/**
 * A standard Danger Zone section for admin edit pages.
 */
export function DangerZone({
  description,
  title = "Item",
  containerClassName = "",
  ...deleteProps
}: DangerZoneProps) {
  return (
    <div className={`mt-12 rounded-2xl border border-rose-100 bg-white p-6 md:p-8 shadow-sm overflow-hidden relative group ${containerClassName}`}>
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Danger Zone
          </h3>
          <p className="text-[11px] text-zinc-400 font-medium max-w-sm leading-relaxed">
            {description || `Deleting this ${title.toLowerCase()} is permanent. All associated data will be lost forever and cannot be recovered.`}
          </p>
        </div>

        <DeleteButton 
          {...deleteProps}
          title={title}
          variant="button"
          label={deleteProps.label || `Delete ${title}`}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm hover:shadow-md hover:shadow-rose-100 transition-all active:scale-[0.97]"
        />
      </div>
    </div>
  );
}
