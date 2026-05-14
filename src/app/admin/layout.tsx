import type { Metadata } from "next";
import type { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin — Fun Trip Lembongan",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {children}
    </div>
  );
}
