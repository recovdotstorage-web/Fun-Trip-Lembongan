import Link from "next/link";
import {
  Anchor,
  Waves,
  TreePalm,
  Sun,
  Star,
  ArrowRight,
  Shield,
  Users,
  Clock,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "Licensed guides & certified equipment for every adventure.",
  },
  {
    icon: Users,
    title: "Small Groups",
    desc: "Intimate experiences with max 10 pax per trip for personal attention.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    desc: "Custom itineraries that fit your travel plans perfectly.",
  },
  {
    icon: Star,
    title: "Local Experts",
    desc: "Born and raised in Lembongan — we know every hidden gem.",
  },
];

const activities = [
  {
    title: "Snorkeling Adventure",
    desc: "Crystal-clear waters with manta rays and tropical fish",
    icon: Waves,
    gradient: "from-cyan-500 to-blue-600",
    shadow: "shadow-cyan-500/25",
  },
  {
    title: "Mangrove Tour",
    desc: "Kayak through pristine mangrove forests",
    icon: TreePalm,
    gradient: "from-emerald-500 to-green-600",
    shadow: "shadow-emerald-500/25",
  },
  {
    title: "Island Hopping",
    desc: "Explore Ceningan, Penida & Lembongan in one day",
    icon: Anchor,
    gradient: "from-orange-500 to-amber-600",
    shadow: "shadow-orange-500/25",
  },
  {
    title: "Sunset Cruise",
    desc: "Unforgettable golden hour on a traditional boat",
    icon: Sun,
    gradient: "from-rose-500 to-pink-600",
    shadow: "shadow-rose-500/25",
  },
];

const testimonials = [
  {
    name: "Sarah & Tom",
    country: "Australia",
    text: "Best snorkeling experience ever! The crew was amazing and we saw so many manta rays. Highly recommend!",
    rating: 5,
  },
  {
    name: "Yuki Tanaka",
    country: "Japan",
    text: "The mangrove tour was breathtaking. Our guide knew everything about the ecosystem. A must-do activity!",
    rating: 5,
  },
  {
    name: "Marco & Lisa",
    country: "Germany",
    text: "Island hopping was the highlight of our Bali trip. Professional, fun, and great value for money!",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent" />

        {/* Floating Decorations */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-emerald-300 text-sm font-medium mb-8 animate-fade-in-up">
              <Waves className="w-4 h-4" />
              <span>Nusa Lembongan, Bali</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Explore Paradise
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Discover breathtaking tours and unforgettable activities in the
              heart of Nusa Lembongan. From snorkeling with manta rays to serene
              sunset cruises.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/activities"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5"
              >
                Explore Activities
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all"
              >
                Contact Us
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {[
                { value: "500+", label: "Happy Travelers" },
                { value: "15+", label: "Activities" },
                { value: "4.9", label: "Avg Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Your Adventure,{" "}
              <span className="text-emerald-600">Our Expertise</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ACTIVITIES PREVIEW ===================== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Popular Activities
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Unforgettable{" "}
              <span className="text-emerald-600">Experiences</span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Hand-picked activities by our local experts, designed to give you the
              most authentic Lembongan experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((act) => (
              <div
                key={act.title}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${act.gradient} text-white overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-xl ${act.shadow}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                <div className="relative">
                  <act.icon className="w-10 h-10 mb-4 opacity-90" />
                  <h3 className="text-xl font-bold mb-2">{act.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                    {act.desc}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-emerald-600 bg-emerald-50 rounded-2xl hover:bg-emerald-100 transition-all"
            >
              View All Activities
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              What Our <span className="text-emerald-600">Guests Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA SECTION ===================== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto">
            Let us help you plan the perfect Lembongan experience. Contact us now
            and get a personalized itinerary!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-emerald-700 bg-white rounded-2xl hover:bg-gray-50 transition-all shadow-2xl hover:-translate-y-0.5"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl hover:bg-white/25 transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
