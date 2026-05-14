import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { CONTACT_INFO } from "@/constants/contact";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ];

  const services = [
    { label: "Buggy Car Rental", slug: "buggy-car-rental" },
    { label: "Scooter Rental", slug: "scooter-rental" },
    { label: "Snorkeling Safari", slug: "snorkeling-safari" },
    { label: "Lembongan Island Tour", slug: "lembongan-island-tour" },
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-32 pb-12 border-t border-zinc-900 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-24">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-8">
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-outfit)] font-semibold text-3xl tracking-tighter text-white">
                FUN TRIP
              </span>
              <span className="text-zinc-500 font-light tracking-[0.3em] text-[10px] uppercase -mt-1 ml-0.5">
                LEMBONGAN
              </span>
            </div>
            <p className="text-sm leading-relaxed font-light">
              We curate premium island experiences in Nusa Lembongan. From luxury buggy rentals to hidden snorkeling gems, our local expertise ensures your journey is nothing short of extraordinary.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white font-semibold tracking-widest uppercase text-[10px] mb-10 border-l-2 border-zinc-500 pl-4">
              Explore
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light hover:text-white transition-all flex items-center group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <ArrowRight className="w-3 h-3 mr-2" />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-white font-semibold tracking-widest uppercase text-[10px] mb-10 border-l-2 border-zinc-500 pl-4">
              Our Experiences
            </h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm font-light hover:text-white transition-all flex items-center group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <ArrowRight className="w-3 h-3 mr-2" />
                    </span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Reach Us */}
          <div>
            <h4 className="text-white font-semibold tracking-widest uppercase text-[10px] mb-10 border-l-2 border-zinc-500 pl-4">
              Connect
            </h4>
            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-none bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-zinc-500 transition-colors">
                  <MapPin className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase tracking-tighter text-zinc-600 font-bold">Office</span>
                  <a 
                    href={CONTACT_INFO.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-light hover:text-zinc-200 transition-colors block leading-snug"
                  >
                    Jungutbatu, Nusa Lembongan, Bali 80771
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-none bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-zinc-500 transition-colors">
                  <Phone className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase tracking-tighter text-zinc-600 font-bold">Contact</span>
                  <a href={`tel:${CONTACT_INFO.whatsapp}`} className="text-sm font-light hover:text-zinc-200 transition-colors block">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-none bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-zinc-500 transition-colors">
                  <Mail className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase tracking-tighter text-zinc-600 font-bold">Email</span>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm font-light hover:text-zinc-200 transition-colors block">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-zinc-900/50 flex flex-col  items-center ">
          <p className="text-[10px] tracking-widest text-zinc-600 font-light uppercase">
            &copy; {currentYear} Fun Trip Lembongan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
