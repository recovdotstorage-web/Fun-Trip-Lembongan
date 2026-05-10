import { Star } from "lucide-react";

export function TrustedSection() {
  return (
    <section id="reviews-summary" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20 opacity-80">
          <div className="flex flex-col items-center">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <p className="font-bold text-slate-800 text-lg uppercase tracking-wide">
              TripAdvisor
            </p>
            <p className="text-sm text-slate-500 font-medium">
              Highly Recommended
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <p className="font-bold text-slate-800 text-lg uppercase tracking-wide">
              Google Reviews
            </p>
            <p className="text-sm text-slate-500 font-medium">
              Top Rated in Lembongan
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-black text-slate-800">Since 2016</h3>
            <p className="font-medium text-slate-600">Trusted Local Operator</p>
          </div>
        </div>
      </div>
    </section>
  );
}
