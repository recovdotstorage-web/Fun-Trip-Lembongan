import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t-4 border-[#005b96]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer: 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Col 1: Brand Identity */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-bold text-2xl tracking-tight text-white">
                FUN TRIP{" "}
                <span className="text-sky-400">LEMBONGAN</span>
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
            <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Services", href: "/#services" },
                { label: "Reviews", href: "/#reviews" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/#faq" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-sky-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#005b96] text-xs">■</span>{" "}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-6">
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
                    className="text-sm hover:text-sky-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#005b96] text-xs">■</span> {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-6">
              Contact Us
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 text-sm group">
                <div className="bg-white/10 p-2 shrink-0 group-hover:bg-[#005b96] transition-colors">
                  <MapPin className="h-4 w-4 text-sky-400 group-hover:text-white" />
                </div>
                <span className="pt-1">
                  Jl. Jungutbatu, Nusa Lembongan, Bali 80771
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm group">
                <div className="bg-white/10 p-2 shrink-0 group-hover:bg-[#005b96] transition-colors">
                  <Phone className="h-4 w-4 text-sky-400 group-hover:text-white" />
                </div>
                <a href="tel:+6281234567890" className="pt-1 hover:text-sky-400 transition-colors">
                  +62 812 3456 7890
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm group">
                <div className="bg-white/10 p-2 shrink-0 group-hover:bg-[#005b96] transition-colors">
                  <Mail className="h-4 w-4 text-sky-400 group-hover:text-white" />
                </div>
                <a href="mailto:hello@funtriplembongan.com" className="pt-1 hover:text-sky-400 transition-colors">
                  hello@funtriplembongan.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col items-center">
          <div className="text-sm text-slate-500 font-medium text-center">
            &copy; {new Date().getFullYear()} Fun Trip Lembongan. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
