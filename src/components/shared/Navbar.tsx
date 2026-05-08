import Link from "next/link";
import { Search, UserCircle } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/activities", label: "Tours" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-[#f9f9f9]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3">
        <div className="font-serif text-2xl font-bold text-[#005e97]">
          Lembongan Breeze
        </div>

        <nav className="flex items-center gap-12">
          {navLinks.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
                index === 0
                  ? "border-b-2 border-[#005e97] pb-1 text-[#005e97]"
                  : "text-[#404751] hover:text-[#005e97]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full p-1 text-[#404751] transition-transform hover:scale-105"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="rounded-full p-1 text-[#404751] transition-transform hover:scale-105"
              aria-label="Account"
            >
              <UserCircle className="h-5 w-5" />
            </button>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-[#0077be] px-6 py-2 text-[11px] font-bold uppercase tracking-widest text-[#f7f9ff] transition-transform hover:scale-105"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
