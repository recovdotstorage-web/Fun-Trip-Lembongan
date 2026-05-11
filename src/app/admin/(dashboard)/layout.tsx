import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { PageTransition } from "@/components/admin/PageTransition";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 lg:overflow-auto">
        <div className="pt-20 lg:pt-0">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </main>
    </div>
  );
}
