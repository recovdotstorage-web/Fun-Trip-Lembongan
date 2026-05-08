import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Users,
  Star,
  Shield,
  MapPin,
  Phone,
  MessageCircle,
  Car,
  Bike,
  Waves,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Fun Trip Lembongan",
  description:
    "Learn about Fun Trip Lembongan — your trusted local guide for tours, buggy car rental, motor rental, and snorkeling experiences in Nusa Lembongan.",
};

const values = [
  {
    icon: Heart,
    title: "Locally Owned",
    desc: "Born and raised in Nusa Lembongan. We love our island and we want you to love it too.",
    color: "text-rose-500 bg-rose-50",
  },
  {
    icon: Shield,
    title: "Safe & Reliable",
    desc: "All activities come with proper safety briefings and well-maintained equipment.",
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: Users,
    title: "Personal Service",
    desc: "We treat every guest like family. Direct communication via WhatsApp, no middlemen.",
    color: "text-emerald-500 bg-emerald-50",
  },
  {
    icon: Star,
    title: "Best Experience",
    desc: "We know every hidden gem, sunset spot, and local secret — so you don't miss a thing.",
    color: "text-amber-500 bg-amber-50",
  },
];

const services = [
  {
    icon: Car,
    name: "Buggy Car Rental",
    desc: "Explore the island in style. No driver's license required! Note: Buggy cannot cross to Nusa Ceningan.",
  },
  {
    icon: Bike,
    name: "Motor / Scooter Rental",
    desc: "Freedom to roam. Reach Nusa Ceningan via the iconic Yellow Bridge. No license needed in Lembongan.",
  },
  {
    icon: Waves,
    name: "Snorkeling",
    desc: "Swim with tropical fish, turtles, and manta rays in the crystal-clear waters around the island.",
  },
  {
    icon: Compass,
    name: "Island Tour",
    desc: "A guided full-day or half-day tour covering the best spots on Nusa Lembongan and Nusa Ceningan.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-emerald-300 text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              <span>Nusa Lembongan, Bali, Indonesia</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
              Your Local{" "}
              <span className="text-emerald-400">Island Expert</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Fun Trip Lembongan is your trusted local partner for unforgettable
              experiences on Nusa Lembongan. From buggy car adventures to
              snorkeling with manta rays — we make island life easy and fun.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/activities"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
              >
                See Our Activities
              </Link>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                A Lembongan family business with a passion for hospitality
              </h2>
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Fun Trip Lembongan is run by Kak Trisna — a proud local from
                  Nusa Lembongan who has spent years showing visitors the very
                  best of this beautiful island. What started as a small
                  operation has grown into the go-to choice for tourists looking
                  for authentic, hassle-free island experiences.
                </p>
                <p>
                  We believe that the best travel memories come from genuine
                  connections and honest service. That&apos;s why all bookings
                  are handled directly via WhatsApp — no online platforms, no
                  hidden fees, just real people helping real travelers.
                </p>
                <p>
                  Whether you want to zip around on a buggy car, explore Nusa
                  Ceningan on a motor, snorkel with rays, or join a guided island
                  tour — we&apos;ve got you covered.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { number: "500+", label: "Happy Guests" },
                { number: "4", label: "Services Offered" },
                { number: "5★", label: "Average Rating" },
                { number: "24/7", label: "WhatsApp Support" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-center border border-emerald-100"
                >
                  <p className="text-4xl font-bold text-emerald-600">
                    {stat.number}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-xl ${val.color} flex items-center justify-center mb-4`}>
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
              What We Offer
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Our Services
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="flex gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <svc.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{svc.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Disclaimers */}
      <section className="py-12 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-amber-900 mb-4">
            🏝️ Important Information for Visitors
          </h3>
          <ul className="space-y-3 text-amber-800 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold mt-0.5">•</span>
              <span>
                <strong>No driver&apos;s license required</strong> to ride a
                motor or buggy car in Nusa Lembongan — this is one of the unique
                perks of the island!
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold mt-0.5">•</span>
              <span>
                <strong>Buggy cars cannot cross the bridge</strong> to Nusa
                Ceningan. If you want to explore Nusa Ceningan, rent a
                motor/scooter instead.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold mt-0.5">•</span>
              <span>
                Guests are informed upfront about vehicle/equipment condition
                and are responsible for any damage caused during the rental
                period.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to explore Lembongan?
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Book directly via WhatsApp — quick, easy, and personal.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition shadow-xl shadow-emerald-900/20 hover:-translate-y-0.5"
            >
              Browse Activities
            </Link>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition border border-emerald-400 hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5" />
              Book via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
