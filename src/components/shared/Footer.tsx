import Link from "next/link";
import { Camera, Mail, MapPin, Phone, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-200 text-[#404751]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-20 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link href="/" className="mb-5 inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#005e97] text-white shadow-lg shadow-sky-900/10">
              <span className="text-lg font-bold">LB</span>
            </div>
            <div className="leading-tight">
              <span className="block text-lg font-bold text-[#1a1c1c]">Lembongan</span>
              <span className="block text-lg font-bold text-[#005e97]">Breeze</span>
            </div>
          </Link>
          <p className="max-w-xl leading-relaxed text-[#404751]">
            Your gateway to the hidden gems of Nusa Lembongan. Experience the
            island through the eyes of those who call it home.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-[#1a1c1c]">
            Quick Links
          </h4>
          <div className="flex flex-col gap-3">
            <Link className="hover:text-[#005e97]" href="/about">
              About Our Island
            </Link>
            <Link className="hover:text-[#005e97]" href="/activities">
              Tours & Packages
            </Link>
            <Link className="hover:text-[#005e97]" href="/activities">
              Rental Fleet
            </Link>
            <Link className="hover:text-[#005e97]" href="/blog">
              Travel Blog
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-[#1a1c1c]">
            Support
          </h4>
          <div className="flex flex-col gap-3">
            <Link className="hover:text-[#005e97]" href="/contact">
              Terms of Service
            </Link>
            <Link className="hover:text-[#005e97]" href="/contact">
              Privacy Policy
            </Link>
            <Link className="hover:text-[#005e97]" href="/contact">
              Contact Us
            </Link>
            <Link className="font-semibold hover:text-[#005e97]" href="/contact">
              WhatsApp Support
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-[#1a1c1c]">
            Newsletter
          </h4>
          <p className="mb-4 text-[#404751]">
            Get island updates and exclusive offers.
          </p>
          <div className="flex overflow-hidden rounded-xl border border-slate-300 bg-[#f9f9f9]">
            <input
              type="email"
              placeholder="Email address"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-[#1a1c1c] outline-none"
            />
            <button
              type="button"
              className="flex items-center justify-center bg-[#005e97] px-4 text-white transition hover:bg-[#004f80]"
              aria-label="Subscribe"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-5 flex items-center gap-3 text-sm text-[#404751]">
            <MapPin className="h-4 w-4" />
            <span>Nusa Lembongan, Bali, Indonesia</span>
          </div>
          <div className="mt-3 flex items-center gap-3 text-sm text-[#404751]">
            <Phone className="h-4 w-4" />
            <a href="tel:+6281234567890" className="hover:text-[#005e97]">
              +62 812 3456 7890
            </a>
          </div>
          <div className="mt-3 flex items-center gap-3 text-sm text-[#404751]">
            <Mail className="h-4 w-4" />
            <a href="mailto:info@funtripbali.com" className="hover:text-[#005e97]">
              info@funtripbali.com
            </a>
          </div>
          <div className="mt-3 flex items-center gap-3 text-sm text-[#404751]">
            <Camera className="h-4 w-4" />
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#005e97]">
              @funtripbali
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-300/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs font-semibold uppercase tracking-widest text-[#404751] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Nusa Lembongan Breeze Rentals &amp; Tours.</p>
          <div className="flex items-center gap-2">
            <span className="text-[#005e97]">SECURE BOOKING GUARANTEED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
