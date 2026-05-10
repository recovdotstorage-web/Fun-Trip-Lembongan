"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <div className="w-full max-w-md">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-12 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-medium uppercase tracking-widest">
          Back to Site
        </span>
      </Link>

      <div className="mb-10">
        <h2 className="text-3xl font-medium text-zinc-900 mb-2 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-zinc-500 font-light text-sm">
          Please enter your credentials to access your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs px-4 py-3 rounded-none flex items-center gap-2"
          >
            <div className="w-1 h-1 bg-zinc-900 rounded-full" />
            {error}
          </motion.div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@funtriplembongan.com"
              className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 focus:border-zinc-900 focus:bg-white outline-none transition-all text-sm rounded-none font-light"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type={showPw ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-4 bg-zinc-50 border border-zinc-100 focus:border-zinc-900 focus:bg-white outline-none transition-all text-sm rounded-none font-light"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              {showPw ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-8"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Authenticating...
            </>
          ) : (
            "Sign In to Portal"
          )}
        </button>
      </form>

      <div className="mt-12 pt-8 border-t border-zinc-100 text-center">
        <p className="text-[10px] text-zinc-400 font-light uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Fun Trip Lembongan &bull; All Rights
          Reserved
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side: Visual/Editorial */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900 items-center justify-center p-12">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Nusa Lembongan"
            className="w-full h-full object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-zinc-950/40" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center"
        >
          <h1 className="text-6xl font-light text-white tracking-tighter mb-4">
            Fun Trip <span className="font-semibold">Lembongan</span>
          </h1>
          <p className="text-zinc-400 font-light tracking-widest uppercase text-xs">
            Management Portal
          </p>
        </motion.div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <Suspense
            fallback={
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-zinc-900 animate-spin" />
                <p className="text-[10px] text-zinc-400 font-light uppercase tracking-widest">
                  Loading Portal...
                </p>
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}
