"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Home,
  Users,
  History,
  HelpCircle,
  FileLock,
  Quote,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Compass,
  },
  {
    label: "Blog & Stories",
    href: "/admin/blog",
    icon: BookOpen,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: Users,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "System Logs",
    href: "/admin/logs",
    icon: History,
  },
  {
    label: "Back to Website",
    href: "/",
    icon: Home,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#FDFBF7] text-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 py-10"
      >
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />
          <div className="relative p-[1px] bg-zinc-100 rounded-xl overflow-hidden backdrop-blur-sm border border-zinc-200 group-hover:border-zinc-300 transition-colors duration-500">
            <div className="p-4 flex items-center gap-4 bg-zinc-50/50">
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-[0.2em] text-zinc-900 uppercase font-sans">
                  FTM
                </span>
                <span className="text-[9px] text-zinc-400 font-medium tracking-[0.3em] uppercase mt-0.5">
                  MANAGEMENT
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.nav
        variants={{
          show: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.2
            }
          }
        }}
        initial="hidden"
        animate="show"
        className="flex-1 px-4 py-6 space-y-2"
      >
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <motion.div
              key={item.href}
              variants={{
                hidden: { opacity: 0, x: -20, filter: "blur(10px)" },
                show: { opacity: 1, x: 0, filter: "blur(0px)" }
              }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`relative group flex items-center gap-4 px-5 py-4 rounded-xl text-xs font-bold tracking-[0.1em] uppercase transition-all duration-500 ${active
                    ? "bg-zinc-900 text-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-zinc-900"
                    : "text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 border border-transparent"
                  }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative z-10 p-2 rounded-xl transition-all duration-500 ${active ? "bg-white text-zinc-900" : "text-zinc-300 group-hover:text-zinc-600"
                    }`}
                >
                  <item.icon
                    className="w-4 h-4 transition-transform duration-500 group-active:scale-95"
                    strokeWidth={1.5}
                  />
                </motion.div>

                <span className="relative z-10">{item.label}</span>

                {active && (
                  <motion.div
                    layoutId="active-nav-glow"
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {active && (
                  <motion.div
                    layoutId="active-indicator"
                    className="ml-auto w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="p-8"
      >
        <div className="p-[1px] bg-zinc-100 rounded-xl group/logout">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center justify-center gap-3 w-full px-4 py-4 rounded-xl text-[10px] font-bold tracking-[0.2em] text-zinc-500 hover:text-rose-600 hover:bg-rose-50 transition-all duration-500 border border-zinc-200 hover:border-rose-200 group"
          >
            <LogOut className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1" strokeWidth={2} />
            TERMINATE SESSION
          </button>
        </div>
        <div className="flex flex-col items-center gap-2 mt-8">
          <div className="w-8 h-[1px] bg-zinc-200" />
          <p className="text-[8px] text-zinc-400 tracking-[0.4em] font-medium uppercase">
            System v2.1.0-STABLE
          </p>
        </div>
      </motion.div>
    </div>
  );

  if (!mounted) return null;

  return (
    <>
      <aside className="hidden lg:flex flex-col w-80 bg-[#FDFBF7] h-screen sticky top-0 border-r border-zinc-200">
        {sidebarContent}
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 h-20 bg-white/80 border-b border-zinc-200 backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 tracking-[0.2em] text-xs uppercase font-sans">FTM</span>
            <span className="text-[8px] text-zinc-500 tracking-[0.1em] uppercase font-medium">MANAGEMENT</span>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-12 h-12 rounded-xl flex items-center justify-center bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 transition-all active:scale-90"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-[20px_0_60px_rgba(0,0,0,0.1)] flex flex-col border-r border-zinc-200"
            >
              {sidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}


