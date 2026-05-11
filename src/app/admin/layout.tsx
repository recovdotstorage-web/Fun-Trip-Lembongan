import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin — Fun Trip Lembongan",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {children}
    </div>
  );
}
