"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, Menu, X } from "lucide-react";
import { CONTACT_INFO } from "@/constants/contact";

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
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <span className="font-semibold text-2xl tracking-tight text-zinc-900">
              FUN TRIP{" "}
              <span className="text-zinc-500 font-light">LEMBONGAN</span>
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

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-zinc-200 px-4 pt-2 pb-6 space-y-3 shadow-lg absolute w-full">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block px-3 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 uppercase tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              handleWaClick();
              setIsMobileMenuOpen(false);
            }}
            className="w-full mt-4 bg-zinc-900 text-white px-6 py-3 font-medium tracking-wide flex justify-center items-center gap-2"
          >
            <Send className="h-4 w-4" /> Book via WhatsApp
          </button>
        </div>
      )}
    </nav>
  );
}
