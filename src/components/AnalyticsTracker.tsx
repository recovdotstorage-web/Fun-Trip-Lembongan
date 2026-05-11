"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track if not in admin pages to keep logs clean from admin activity
    if (!pathname.startsWith("/admin")) {
      fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: pathname }),
      }).catch((err) => console.error("Error tracking visit:", err));
    }
  }, [pathname]);

  return null;
}
