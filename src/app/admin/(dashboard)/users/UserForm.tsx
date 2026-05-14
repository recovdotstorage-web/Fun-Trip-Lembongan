"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, Loader2, Save, UserPlus } from "lucide-react";
import Link from "next/link";
import { createUser, updateUser } from "./actions";
import { AdminHeader } from "@/components/admin/AdminHeader";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  role?: string | null;
};

type Props = {
  user?: User;
};

export function UserForm({ user }: Props) {
  const isEdit = !!user;
  const [pending, startTransition] = useTransition();
  const [showPw, setShowPw] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(async () => {
      if (isEdit) {
        await updateUser(user!.id, data);
      } else {
        await createUser(data);
      }
    });
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto bg-[#FDFBF7] min-h-screen">
      {/* Header */}
      <AdminHeader
        title={isEdit ? "Edit" : "Add"}
        highlight="User"
        category="Security Control"
        subtitle={isEdit ? `Editing ${user!.name || user!.email}` : "Create a new administrative user."}
        backButton={{
          href: "/admin/users",
          label: "Back to Users",
        }}
      />

      {/* Form card */}
      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="divide-y divide-zinc-50">
            {/* Name */}
            <div className="px-8 md:px-12 py-8 md:py-10 flex flex-col md:flex-row gap-4 md:gap-12 md:items-start">
              <div className="md:w-52 shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Full Name</p>
              </div>
              <div className="flex-1 max-w-lg">
                <input
                  name="name"
                  required
                  defaultValue={user?.name ?? ""}
                  placeholder="e.g. John Doe"
                  className="w-full px-5 py-3.5 text-sm text-zinc-900 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-300"
                />
              </div>
            </div>

            {/* Email */}
            <div className="px-8 md:px-12 py-8 md:py-10 flex flex-col md:flex-row gap-4 md:gap-12 md:items-start">
              <div className="md:w-52 shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Email</p>
              </div>
              <div className="flex-1 max-w-lg">
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={user?.email ?? ""}
                  placeholder="user@example.com"
                  className="w-full px-5 py-3.5 text-sm text-zinc-900 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-300"
                />
              </div>
            </div>

            {/* Role (Read-only for now) */}
            <div className="px-8 md:px-12 py-8 md:py-10 flex flex-col md:flex-row gap-4 md:gap-12 md:items-start">
              <div className="md:w-52 shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Role</p>
              </div>
              <div className="flex-1 max-w-lg">
                <input
                  name="role"
                  readOnly
                  defaultValue={user?.role ?? "ADMIN"}
                  className="w-full px-5 py-3.5 text-sm text-zinc-400 bg-zinc-50/50 border border-zinc-50 rounded-2xl cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password */}
            <div className="px-8 md:px-12 py-8 md:py-10 flex flex-col md:flex-row gap-4 md:gap-12 md:items-start">
              <div className="md:w-52 shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Password
                </p>
                {isEdit && (
                  <p className="text-[9px] text-zinc-300 mt-1 leading-relaxed">
                    Leave blank to keep current password
                  </p>
                )}
              </div>
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <input
                    name="password"
                    type={showPw ? "text" : "password"}
                    required={!isEdit}
                    minLength={8}
                    placeholder={isEdit ? "Enter new password to change…" : "Min 8 characters"}
                    className="w-full px-5 py-3.5 pr-12 text-sm text-zinc-900 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-900 transition-colors"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 md:px-12 py-6 border-t border-zinc-50 bg-zinc-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/admin/users"
              className="text-xs text-zinc-400 hover:text-zinc-600 font-semibold uppercase tracking-widest transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={pending}
              className="group relative w-full sm:w-auto p-1 bg-zinc-900 rounded-2xl overflow-hidden active:scale-95 transition-all shadow-xl shadow-zinc-900/10 disabled:opacity-60"
            >
              <div className="relative px-8 py-3 bg-zinc-900 border border-white/10 rounded-[calc(1rem-4px)] flex items-center justify-center gap-3">
                {pending ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : isEdit ? (
                  <Save className="w-4 h-4 text-white" />
                ) : (
                  <UserPlus className="w-4 h-4 text-white" />
                )}
                <span className="text-[11px] font-bold text-white uppercase tracking-widest">
                  {pending ? "Saving…" : isEdit ? "Save Changes" : "Create User"}
                </span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
