"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, Menu, X } from "lucide-react";
import { CONTACT_INFO } from "@/constants/contact";
import { motion, AnimatePresence } from "framer-motion";

const WA_NUMBER = CONTACT_INFO.whatsapp;

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleWaClick = () => {
    const msg = encodeURIComponent(
      "Hello Funtrip Lembongan, I would like to book a service."
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <img 
              src="/images/logo.jpg" 
              alt="Fun Trip Lembongan Logo" 
              className="h-14 w-14 object-contain"
            />
            <span className="font-semibold text-xl tracking-tight text-zinc-900 leading-tight">
              FUN TRIP<br />
              <span className="text-zinc-500 font-light text-sm tracking-[0.2em] uppercase">LEMBONGAN</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-zinc-500 hover:text-zinc-900 font-medium transition-colors uppercase text-xs tracking-widest"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleWaClick}
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-2.5 font-medium transition-all flex items-center gap-2 text-sm tracking-wide"
            >
              <Send className="h-4 w-4" /> Book via WhatsApp
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-600 hover:text-zinc-900"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 stroke-[1.5]" />
              ) : (
                <Menu className="h-6 w-6 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
            />
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-white border-b border-zinc-200 px-6 pt-4 pb-12 shadow-2xl absolute w-full overflow-hidden"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.1 + (idx * 0.05),
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                  >
                    <Link
                      href={link.href}
                      className="block py-4 text-sm font-medium text-zinc-500 hover:text-zinc-900 border-b border-zinc-50 uppercase tracking-[0.2em] transition-all active:pl-4"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="pt-6"
                >
                  <button
                    onClick={() => {
                      handleWaClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-zinc-900 text-white px-6 py-5 font-medium tracking-[0.2em] uppercase text-xs flex justify-center items-center gap-3 shadow-xl hover:bg-zinc-800 transition-all"
                  >
                    <Send className="h-4 w-4" /> Book via WhatsApp
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </nav>
  );
}
