"use client";

import { useState, useEffect, ReactNode, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { UniversalLoader } from "./UniversalLoader";
import { AnimatePresence } from "framer-motion";

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle initial mount and subsequent route changes
  useEffect(() => {
    setIsLoading(true);
    
    // Ensure the loader stays visible for a minimum duration (e.g., 800ms)
    // to provide a smooth, premium "transition" feel.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <UniversalLoader />}
      </AnimatePresence>
      
      {/* Suspense is still used for actual server-side streaming fallbacks */}
      <Suspense fallback={<UniversalLoader />}>
        {children}
      </Suspense>
    </>
  );
}
