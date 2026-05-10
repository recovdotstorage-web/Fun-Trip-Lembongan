import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-24 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer: 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Col 1: Brand Identity */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-medium text-2xl tracking-tight text-white">
                FUN TRIP{" "}
                <span className="text-zinc-500 font-light">LEMBONGAN</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Premium local tour operator based in Nusa Lembongan. Providing
              hassle-free buggy rentals, scooter hires, and unforgettable
              snorkeling safaris since 2016.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:pl-8">
            <h4 className="text-white font-medium tracking-[0.2em] uppercase text-[11px] mb-8">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { label: "About", href: "/about" },
                { label: "Services", href: "/#services" },
                { label: "Reviews", href: "/#reviews" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/#faq" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light hover:text-white transition-colors flex items-center gap-3"
                  >
                    <span className="text-zinc-700 text-[10px]">■</span>{" "}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-white font-medium tracking-[0.2em] uppercase text-[11px] mb-8">
              Our Services
            </h4>
            <ul className="space-y-4">
              {[
                "Buggy Car Rental",
                "Scooter Rental",
                "Snorkeling Safari",
                "Lembongan Island Tour",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/#services"
                    className="text-sm font-light hover:text-white transition-colors flex items-center gap-3"
                  >
                    <span className="text-zinc-700 text-[10px]">■</span> {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-white font-medium tracking-[0.2em] uppercase text-[11px] mb-8">
              Contact Us
            </h4>
            <ul className="space-y-5">
              <li className="group">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Jl.+Jungutbatu,+Nusa+Lembongan,+Bali+80771"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 text-sm font-light cursor-pointer"
                >
                  <div className="bg-zinc-900 p-2 shrink-0 group-hover:bg-zinc-800 transition-colors border border-zinc-800">
                    <MapPin className="h-3 w-3 text-zinc-400 group-hover:text-white" />
                  </div>
                  <span className="pt-1.5 text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    Jl. Jungutbatu, Nusa Lembongan, Bali 80771
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-4 text-sm font-light group">
                <div className="bg-zinc-900 p-2 shrink-0 group-hover:bg-zinc-800 transition-colors border border-zinc-800">
                  <Phone className="h-3 w-3 text-zinc-400 group-hover:text-white" />
                </div>
                <a href="tel:+6281234567890" className="pt-1.5 text-zinc-400 group-hover:text-white transition-colors">
                  +62 812 3456 7890
                </a>
              </li>
              <li className="flex items-start gap-4 text-sm font-light group">
                <div className="bg-zinc-900 p-2 shrink-0 group-hover:bg-zinc-800 transition-colors border border-zinc-800">
                  <Mail className="h-3 w-3 text-zinc-400 group-hover:text-white" />
                </div>
                <a href="mailto:hello@funtriplembongan.com" className="pt-1.5 text-zinc-400 group-hover:text-white transition-colors">
                  hello@funtriplembongan.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col items-center">
          <div className="text-xs tracking-widest text-zinc-600 font-light text-center uppercase">
            &copy; {new Date().getFullYear()} Fun Trip Lembongan. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
