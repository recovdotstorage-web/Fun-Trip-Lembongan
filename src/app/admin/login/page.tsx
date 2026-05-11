"use client";

import { useState, Suspense, useEffect, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Loader2, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { sanitizeString } from "@/lib/utils/sanitization";

/**
 * Vanguard_UI_Architect Persona
 * Objective: $150k+ agency-level Admin Login
 * Archetype: Editorial Split + Editorial Luxury Vibe
 */

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/admin/dashboard";
  const authError = params.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  useEffect(() => {
    if (authError) {
      if (authError === "CredentialsSignin") {
        setError("Invalid email or password. Access denied.");
      } else {
        setError("An authentication error occurred. Please try again.");
      }
    }
  }, [authError]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const sanitizedEmail = sanitizeString(email);
    const sanitizedPassword = sanitizeString(password);

    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          email: sanitizedEmail,
          password: sanitizedPassword,
          redirect: false,
        });

        if (res?.error) {
          setError("The credentials provided do not match our records.");
        } else {
          router.push(callbackUrl);
          router.refresh();
        }
      } catch (err) {
        setError("An unexpected authentication error occurred.");
      }
    });
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-8 group"
        >
          <div className="w-6 h-6 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-zinc-900 transition-colors">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Return to Site</span>
        </Link>

        <h2 className="text-4xl font-light text-zinc-900 mb-3 tracking-tight font-serif italic">
          Admin <span className="font-semibold not-italic">Portal</span>
        </h2>
        <p className="text-zinc-500 font-light text-sm leading-relaxed">
          Secure access for Fun Trip Lembongan management.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              className="p-4 bg-red-50/50 border border-red-100 rounded-2xl flex items-start gap-3 overflow-hidden"
            >
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-red-600">!</span>
              </div>
              <p className="text-xs text-red-800 font-medium leading-relaxed">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Double-Bezel Input Architecture */}
        <div className="space-y-5">
          <div className="space-y-2 group">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-zinc-900 transition-colors">
              Email Address
            </label>
            <div className="p-1.5 bg-zinc-100/50 rounded-[1.5rem] border border-zinc-100 group-focus-within:border-zinc-200 group-focus-within:bg-zinc-100 transition-all">
              <div className="relative bg-white rounded-[calc(1.5rem-0.375rem)] shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@funtriplembongan.com"
                  className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-sm font-light placeholder:text-zinc-300"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1 group-focus-within:text-zinc-900 transition-colors">
              Security Key
            </label>
            <div className="p-1.5 bg-zinc-100/50 rounded-[1.5rem] border border-zinc-100 group-focus-within:border-zinc-200 group-focus-within:bg-zinc-100 transition-all">
              <div className="relative bg-white rounded-[calc(1.5rem-0.375rem)] shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-transparent outline-none text-sm font-light placeholder:text-zinc-300"
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

        {/* Island Button Architecture */}
        <button
          type="submit"
          disabled={isPending}
          className="group relative w-full p-1.5 bg-zinc-900 rounded-full overflow-hidden hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="relative flex items-center justify-between px-6 py-3.5 bg-transparent rounded-full border border-white/10">
            <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">
              {isPending ? "Verifying..." : "Authorize Access"}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors group-hover:translate-x-1">
              {isPending ? (
                <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-white" />
              )}
            </div>
          </div>
        </button>
      </form>

      <div className="mt-16 pt-8 border-t border-zinc-100 flex items-center justify-between">
        <p className="text-[9px] text-zinc-300 font-bold uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} FTL System
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-[100dvh] bg-[#FDFBF7] flex flex-col lg:flex-row overflow-hidden font-sans">
      {/* Background Physical Texture Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] grayscale bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Left: Editorial / Visual Split */}
      <section className="hidden lg:flex lg:w-[45%] relative bg-zinc-950 items-center justify-center p-20 overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0">
          <img
            src="/images/hero.png"
            alt="Nusa Lembongan Management"
            className="w-full h-full object-cover opacity-30 grayscale scale-110 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-left w-full"
        >
          <div className="w-12 h-[1px] bg-zinc-700 mb-12" />
          <h1 className="text-7xl font-light text-white tracking-tighter leading-[0.9] mb-8">
            Superior <br />
            <span className="font-serif italic text-zinc-400">Management</span>
          </h1>
          <p className="text-zinc-500 font-light tracking-[0.3em] uppercase text-[10px] max-w-xs leading-loose">
            High-integrity infrastructure for island operations and digital commerce.
          </p>
        </motion.div>

        {/* Status Indicators */}
        <div className="absolute bottom-12 left-12 flex gap-8">
          <div className="space-y-1">
            <p className="text-[8px] text-zinc-600 uppercase tracking-widest">Network</p>
            <p className="text-[10px] text-zinc-400 font-medium">Encrypted SSL</p>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] text-zinc-600 uppercase tracking-widest">Version</p>
            <p className="text-[10px] text-zinc-400 font-medium">v2.4.0-Stable</p>
          </div>
        </div>
      </section>

      {/* Right: Authentication Core */}
      <section className="flex-1 flex items-center justify-center p-8 sm:p-20 relative bg-white lg:rounded-l-[3rem] lg:-ml-12 shadow-[-40px_0_80px_rgba(0,0,0,0.05)] z-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full max-w-sm"
        >
          <Suspense
            fallback={
              <div className="flex flex-col items-center gap-6">
                <Loader2 className="w-10 h-10 text-zinc-900 animate-spin stroke-[1]" />
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.3em]">Initialising Security...</p>
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </motion.div>
      </section>
    </main>
  );
}
