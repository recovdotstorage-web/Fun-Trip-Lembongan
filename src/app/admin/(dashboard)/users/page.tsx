import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, Shield, Mail, Calendar, Plus } from "lucide-react";

import { format } from "date-fns";
import { deleteUser } from "./actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EditButton, DeleteButton } from "@/components/admin/AdminButtons";

export const dynamic = "force-dynamic";

export default async function UsersManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string; limit?: string }>;
}) {
  const { page = "1", sort = "desc", limit = "10" } = await searchParams;
  const currentPage = parseInt(page);
  const pageSize = parseInt(limit);
  const order = sort === "asc" ? "asc" : "desc";

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: order },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prisma.user.count(),
  ]);

  const totalPages = Math.ceil(totalUsers / pageSize);

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto bg-[#FDFBF7] min-h-screen">
      {/* Header */}
      <AdminHeader
        title="User"
        highlight="Identity"
        category="Security Control"
        subtitle={`Manage administrative access and system roles. ${totalUsers} ${totalUsers === 1 ? "user" : "users"} in the registry.`}
        addButton={{
          href: "/admin/users/new",
          label: "Add User",
        }}
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-zinc-100 shadow-sm mt-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-zinc-50 p-1 rounded-lg border border-zinc-100">
            <Link
              href={`/admin/users?page=1&sort=desc&limit=${pageSize}`}
              className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                order === "desc"
                  ? "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Newest
            </Link>
            <Link
              href={`/admin/users?page=1&sort=asc&limit=${pageSize}`}
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
                  href={`/admin/users?page=1&sort=${order}&limit=${val}`}
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

      {/* List */}
      {users.length === 0 ? (
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm py-32 text-center">
          <Users className="w-16 h-16 text-zinc-100 mx-auto mb-6" strokeWidth={1} />
          <h2 className="text-xl font-semibold text-zinc-400 font-serif italic">No users yet</h2>
          <p className="text-sm text-zinc-300 mt-2 mb-8 max-w-xs mx-auto">
            Start by adding the first administrator account.
          </p>
          <Link
            href="/admin/users/new"
            className="inline-flex items-center gap-3 px-8 py-3 bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            Add User
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-zinc-100 rounded-xl overflow-hidden shadow-sm">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-50">
                  <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">User</th>
                  <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Joined</th>
                  <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {users.map((user) => (
                  <tr key={user.id} className="group hover:bg-zinc-50 transition-colors duration-300">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-500 shrink-0">
                          <Users className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors duration-500" strokeWidth={1} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-zinc-900 group-hover:translate-x-0.5 transition-transform duration-300">
                            {user.name || "—"}
                          </p>
                          <p className="text-[10px] text-zinc-400 font-medium mt-0.5 flex items-center gap-1.5">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-10 py-6 text-[10px] text-zinc-300 font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <EditButton href={`/admin/users/${user.id}/edit`} />
                        <DeleteButton
                          action={deleteUser}
                          id={user.id}
                          name={user.name || user.email || "this user"}
                          title="User"
                          variant="icon"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <div className="md:hidden divide-y divide-zinc-50">
            {users.map((user) => (
              <div key={user.id} className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-zinc-300" strokeWidth={1} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-zinc-900 truncate">{user.name || "—"}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <EditButton href={`/admin/users/${user.id}/edit`} variant="full" label="Edit User" />

                  <DeleteButton
                    action={deleteUser}
                    id={user.id}
                    name={user.name || user.email || "this user"}
                    title="User"
                    variant="full"
                    className="flex-1 justify-center"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-zinc-100 shadow-sm">
        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          Page {currentPage} of {totalPages || 1}
        </div>
        <div className="flex items-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/admin/users?page=${currentPage - 1}&sort=${order}&limit=${pageSize}`}
              className="px-4 py-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-900 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-zinc-100 transition-colors"
            >
              Previous
            </Link>
          )}
          {currentPage < totalPages && (
            <Link
              href={`/admin/users?page=${currentPage + 1}&sort=${order}&limit=${pageSize}`}
              className="px-4 py-2 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-sm"
            >
              Next Page
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-10 pb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-zinc-100" />
          <p className="text-[9px] text-zinc-300 font-bold uppercase tracking-[0.4em]">End of registry</p>
        </div>
        <p className="text-[9px] text-zinc-300 font-medium uppercase tracking-widest">
          FTM Management — User Control v1.1
        </p>
      </div>
    </div>
  );
}

