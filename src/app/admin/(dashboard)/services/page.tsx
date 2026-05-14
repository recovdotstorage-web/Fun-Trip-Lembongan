import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Compass, Search, Pencil, Eye } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EditButton, ViewButton } from "@/components/admin/AdminButtons";
import * as motion from "framer-motion/client";

export const dynamic = "force-dynamic";

import { formatCurrency } from "@/lib/utils";

function timeAgo(date: Date) {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string; limit?: string }>;
}) {
  const { page = "1", sort = "desc", limit = "10" } = await searchParams;
  const currentPage = parseInt(page);
  const pageSize = parseInt(limit);
  const order = sort === "asc" ? "asc" : "desc";

  const [services, totalServices] = await Promise.all([
    prisma.activity.findMany({
      orderBy: { createdAt: order },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      include: {
        category: { select: { name: true } },
        images: { where: { isPrimary: true }, take: 1 },
      },
    }),
    prisma.activity.count(),
  ]);

  const totalPages = Math.ceil(totalServices / pageSize);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto bg-[#FDFBF7] min-h-screen"
    >
      <AdminHeader
        title="Service"
        highlight="Portfolio"
        category="Inventory Control"
        subtitle={`Manage your island packages and experiences. ${totalServices} total activities recorded.`}
        addButton={{
          href: "/admin/services/new",
          label: "Add New Service",
        }}
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-zinc-100 shadow-sm mt-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-zinc-50 p-1 rounded-lg border border-zinc-100">
            <Link
              href={`/admin/services?page=1&sort=desc&limit=${pageSize}`}
              className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                order === "desc"
                  ? "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Newest
            </Link>
            <Link
              href={`/admin/services?page=1&sort=asc&limit=${pageSize}`}
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
                  href={`/admin/services?page=1&sort=${order}&limit=${val}`}
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
      </div>

      {totalServices === 0 ? (
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm py-32 text-center">
          <Compass className="w-16 h-16 text-zinc-100 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-zinc-400 font-serif italic">
            No services in the grid
          </h2>
          <p className="text-sm text-zinc-300 mt-2 mb-8 max-w-xs mx-auto">
            Your portfolio is currently empty. Start by creating an island experience.
          </p>
          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-3 px-8 py-3 bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            Create Service
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white border border-zinc-100 rounded-xl overflow-hidden shadow-sm">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-50">
                    <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Service Details</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Price</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Last Updated</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {services.map((act) => (
                    <tr key={act.id} className="group hover:bg-zinc-50 transition-colors duration-500">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 group-hover:scale-105 transition-transform duration-500">
                            {act.images[0] ? (
                              <Image
                                src={act.images[0].imageUrl}
                                alt={act.name}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-200">
                                <Compass className="w-6 h-6" strokeWidth={1} />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-zinc-900 group-hover:translate-x-1 transition-transform duration-500">{act.name}</p>
                            <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest mt-1">{act.category.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="text-sm font-medium text-zinc-900">
                          {formatCurrency(act.price)}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${
                          act.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-600" : "bg-zinc-50 text-zinc-400"
                        }`}>
                          {act.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-[10px] text-zinc-300 font-bold uppercase tracking-widest">
                        {timeAgo(act.updatedAt)}
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <ViewButton href={`/services/${act.slug}`} />
                          <EditButton href={`/admin/services/${act.id}/edit`} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List View */}
            <div className="md:hidden divide-y divide-zinc-50">
              {services.map((act) => (
                <div key={act.id} className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0">
                      {act.images[0] ? (
                        <Image
                          src={act.images[0].imageUrl}
                          alt={act.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-200">
                          <Compass className="w-8 h-8" strokeWidth={1} />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-bold text-zinc-900 truncate">{act.name}</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">{act.category.name}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <p className="text-sm font-bold text-zinc-900">{formatCurrency(act.price)}</p>
                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-widest ${
                          act.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-600" : "bg-zinc-50 text-zinc-400"
                        }`}>
                          {act.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <EditButton href={`/admin/services/${act.id}/edit`} variant="full" />
                    <ViewButton href={`/services/${act.slug}`} variant="full" />
                  </div>
                </div>
              ))}
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
                  href={`/admin/services?page=${currentPage - 1}&sort=${order}&limit=${pageSize}`}
                  className="px-4 py-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-900 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-zinc-100 transition-colors"
                >
                  Previous
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`/admin/services?page=${currentPage + 1}&sort=${order}&limit=${pageSize}`}
                  className="px-4 py-2 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-sm"
                >
                  Next Page
                </Link>
              )}
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div className="mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-10 pb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-zinc-100" />
          <p className="text-[9px] text-zinc-300 font-bold uppercase tracking-[0.4em]">End of registry</p>
        </div>
        <p className="text-[9px] text-zinc-300 font-medium uppercase tracking-widest">Fun Trip Lembongan Portfolio v1.1</p>
      </div>
    </motion.div>
  );
}
