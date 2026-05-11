import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { History, User, Activity, FileText } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function AuditLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string; limit?: string }>;
}) {
  const { page = "1", sort = "desc", limit = "10" } = await searchParams;
  const currentPage = parseInt(page);
  const pageSize = parseInt(limit);
  const order = sort === "asc" ? "asc" : "desc";

  const [logs, totalLogs] = prisma.auditLog 
    ? await Promise.all([
        prisma.auditLog.findMany({
          orderBy: { createdAt: order },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        }),
        prisma.auditLog.count()
      ])
    : [[], 0];

  const totalPages = Math.ceil(totalLogs / pageSize);

  const getActionColor = (action: string) => {
    switch (action) {
      case "CREATE":
        return "text-emerald-600 bg-emerald-50";
      case "UPDATE":
        return "text-amber-600 bg-amber-50";
      case "DELETE":
        return "text-rose-600 bg-rose-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getEntityIcon = (entity: string) => {
    switch (entity) {
      case "Activity":
        return <Activity className="w-4 h-4" />;
      case "BlogPost":
        return <FileText className="w-4 h-4" />;
      default:
        return <History className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto bg-[#FDFBF7] min-h-screen">
      <AdminHeader
        title="Audit"
        highlight="Trail"
        subtitle="Chronological record of administrative operations. Essential for system accountability and security auditing."
        category="System Integrity"
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-zinc-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-zinc-50 p-1 rounded-lg border border-zinc-100">
            <Link
              href={`/admin/logs?page=1&sort=desc&limit=${pageSize}`}
              className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                order === "desc"
                  ? "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Newest
            </Link>
            <Link
              href={`/admin/logs?page=1&sort=asc&limit=${pageSize}`}
              className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                order === "asc"
                  ? "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Oldest
            </Link>
          </div>
          
          <div className="h-4 w-[1px] bg-zinc-100" />
          
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Show:</span>
            <div className="flex items-center bg-zinc-50 p-1 rounded-lg border border-zinc-100">
              {[10, 50, 100].map((val) => (
                <Link
                  key={val}
                  href={`/admin/logs?page=1&sort=${order}&limit=${val}`}
                  className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                    pageSize === val
                      ? "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  {val}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2">
          {totalLogs} recorded events
        </div>
      </div>

      <div className="bg-white border border-zinc-100 rounded-xl overflow-hidden shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-50">
                <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Administrator</th>
                <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Operation</th>
                <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Subject</th>
                <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Identifier</th>
                <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center">
                    <p className="text-sm text-zinc-400 font-light italic">Registry is currently void.</p>
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="group hover:bg-zinc-50 transition-colors duration-500">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 border border-zinc-100 group-hover:border-indigo-200 transition-colors">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-semibold text-zinc-700 group-hover:translate-x-1 transition-transform duration-500">
                          {log.adminEmail}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-500">
                        <div className="p-1.5 bg-zinc-50 rounded-lg group-hover:bg-white transition-colors border border-transparent group-hover:border-zinc-100">
                          {getEntityIcon(log.entity)}
                        </div>
                        {log.entity}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-sm text-zinc-400 font-mono lowercase max-w-xs truncate">
                      {log.entityName || log.entityId}
                    </td>
                    <td className="px-10 py-6 text-[10px] text-zinc-300 font-bold uppercase tracking-widest text-right">
                      {format(new Date(log.createdAt), "MMM d, HH:mm:ss")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden divide-y divide-zinc-50">
          {logs.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-zinc-400 font-light italic">Registry is currently void.</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 border border-zinc-100">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-zinc-700 truncate max-w-[150px]">
                      {log.adminEmail}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-widest ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    {getEntityIcon(log.entity)}
                    {log.entity}
                  </div>
                  <p className="text-xs text-zinc-500 font-mono truncate bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                    {log.entityName || log.entityId}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[9px] text-zinc-300 font-bold uppercase tracking-[0.2em]">
                    {format(new Date(log.createdAt), "MMM d, HH:mm:ss")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-zinc-100 shadow-sm">
        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          Page {currentPage} of {totalPages || 1}
        </div>
        <div className="flex items-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/admin/logs?page=${currentPage - 1}&sort=${order}&limit=${pageSize}`}
              className="px-4 py-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-900 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-zinc-100 transition-colors"
            >
              Previous
            </Link>
          )}
          {currentPage < totalPages && (
            <Link
              href={`/admin/logs?page=${currentPage + 1}&sort=${order}&limit=${pageSize}`}
              className="px-4 py-2 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-sm"
            >
              Next Page
            </Link>
          )}
        </div>
      </div>
      
      {/* Decorative Architecture */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-10 pb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-zinc-100" />
          <p className="text-[9px] text-zinc-300 font-bold uppercase tracking-[0.4em]">End of registry</p>
        </div>
        <p className="text-[9px] text-zinc-300 font-medium uppercase tracking-widest">System Activity Log v1.1</p>
      </div>
    </div>
  );
}
