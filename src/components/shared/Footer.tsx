import Link from "next/link";
import { Palmtree, Camera, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Palmtree className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">Fun Trip</span>
                <span className="text-lg font-bold text-emerald-400">
                  {" "}
                  Lembongan
                </span>
              </div>
            </Link>
            <p className="text-gray-500 max-w-md leading-relaxed">
              Discover the magic of Nusa Lembongan with our curated tours and
              activities. From snorkeling in crystal-clear waters to exploring
              mangrove forests — create unforgettable memories with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/activities"
                className="hover:text-emerald-400 transition-colors"
              >
                Activities
              </Link>
              <Link
                href="/contact"
                className="hover:text-emerald-400 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+6281234567890"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +62 812 3456 7890
              </a>
              <a
                href="mailto:info@funtripbali.com"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@funtripbali.com
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Camera className="w-4 h-4" />
                @funtripbali
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Nusa Lembongan, Bali, Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Fun Trip Lembongan. All rights reserved.
          </p>
          <p className="text-sm text-gray-700">
            Crafted with ❤️ in Bali
          </p>
        </div>
      </div>
    </footer>
  );
}
