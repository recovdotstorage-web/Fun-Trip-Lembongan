"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { sanitizeString } from "@/lib/utils/sanitization";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = sanitizeString(formData.get("email") as string);
    const password = sanitizeString(formData.get("password") as string);

    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          setError("Invalid authentication credentials. Access denied.");
        } else {
          router.push("/admin/dashboard");
          router.refresh();
        }
      } catch (err) {
        setError("A system error occurred. Please try again later.");
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-200/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-200/50 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-zinc-900 rounded-3xl mb-8 shadow-2xl shadow-zinc-950/20"
          >
            <ShieldCheck className="w-8 h-8 text-white" strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-3 uppercase tracking-[0.2em]">
            Vanguard Terminal
          </h1>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.3em]">
            Authorized Personnel Only
          </p>
        </div>

        <div className="p-[1px] bg-zinc-200 rounded-[2rem] shadow-2xl shadow-zinc-200/50 overflow-hidden">
          <div className="p-1 bg-white rounded-[1.95rem]">
            <div className="p-8 bg-[#FDFBF7] border border-zinc-100 rounded-[1.75rem]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                    Identification
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="admin@funtriplembongan.com"
                      className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all placeholder:text-zinc-300 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                    Security Key
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      name="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all placeholder:text-zinc-300 font-medium"
                    />
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 bg-rose-50 border border-rose-100 rounded-xl"
                  >
                    <p className="text-[11px] font-bold text-rose-600 uppercase tracking-wide leading-relaxed">
                      {error}
                    </p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-zinc-900/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Establish Link
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4 opacity-30">
          <div className="h-px w-8 bg-zinc-300" />
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-500">
            Secure Layer v2.1
          </span>
          <div className="h-px w-8 bg-zinc-300" />
        </div>
      </motion.div>
    </div>
  );
}
