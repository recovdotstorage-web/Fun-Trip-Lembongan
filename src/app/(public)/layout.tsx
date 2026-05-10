import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className="min-h-screen bg-[#FDFBF7] text-zinc-900"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}
