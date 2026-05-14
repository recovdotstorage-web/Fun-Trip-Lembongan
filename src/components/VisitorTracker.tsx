"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
  const pathname = usePathname();
  const trackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Only track once per path change to avoid duplicate logs in strict mode
    if (trackedPath.current === pathname) return;
    trackedPath.current = pathname;

    const trackVisitor = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: pathname }),
        });
      } catch (error) {
        // Silent fail for tracking
      }
    };

    // Delay slightly to not block initial render
    const timeoutId = setTimeout(() => {
      trackVisitor();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
