"use client";

import { useState } from "react";
import { Send, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = ["Services", "Reviews", "Blog", "FAQ", "Contact"];

interface HomeNavbarProps {
  onWaClick: (message?: string) => void;
}

export function HomeNavbar({ onWaClick }: HomeNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <span className="font-bold text-2xl tracking-tight text-slate-800">
              FUN TRIP{" "}
              <span className="text-[#005b96]">LEMBONGAN</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-slate-600 hover:text-[#005b96] font-medium transition-colors uppercase text-sm tracking-wide"
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => onWaClick()}
              className="bg-[#005b96] hover:bg-[#004a7a] text-white px-6 py-2.5 font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Send className="h-4 w-4" /> Book via WhatsApp
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg absolute w-full">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-[#005b96] hover:bg-slate-50 uppercase tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <button
            onClick={() => {
              onWaClick();
              setIsMobileMenuOpen(false);
            }}
            className="w-full mt-4 bg-[#005b96] text-white px-6 py-3 font-bold shadow-md flex justify-center items-center gap-2"
          >
            <Send className="h-4 w-4" /> Book via WhatsApp
          </button>
        </div>
      )}
    </nav>
  );
}
