"use client";

import { useState, useEffect, ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";
import { UniversalLoader } from "./UniversalLoader";
import { AnimatePresence } from "framer-motion";

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <UniversalLoader key="universal-loader" />}
      </AnimatePresence>
      <Suspense fallback={<UniversalLoader />}>
        {children}
      </Suspense>
    </>
  );
}


