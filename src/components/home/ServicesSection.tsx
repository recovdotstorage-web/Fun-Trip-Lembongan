import { Car, Bike, Ship, MapPin, CheckCircle, Send } from "lucide-react";
import Image from "next/image";

interface ServicesSectionProps {
  onWaClick: (message?: string) => void;
}

const services = [
  {
    id: 1,
    title: "Buggy Car Rental",
    price: "Best Price",
    icon: <Car className="h-6 w-6 text-[#005b96]" />,
    image: "/images/surfing.png",
    features: [
      "Comfortable seating for groups",
      "Explore Lembongan easily",
      "No access to Nusa Ceningan (Bridge limit)",
      "Fuel included",
    ],
  },
  {
    id: 2,
    title: "Scooter Rental",
    price: "Best Price",
    icon: <Bike className="h-6 w-6 text-[#005b96]" />,
    image: "/images/diving.png",
    features: [
      "No driving license required",
      "Helmets provided",
      "Full island access (Lembongan & Ceningan)",
      "Note: No damage guarantee",
    ],
    popular: true,
  },
  {
    id: 3,
    title: "Snorkeling Safari",
    price: "Best Price",
    icon: <Ship className="h-6 w-6 text-[#005b96]" />,
    image: "/images/snorkeling.png",
    features: [
      "Swim with Manta Rays",
      "Visit Crystal Bay & Mangrove Point",
      "Snorkeling Equipment provided",
      "Professional Guide & Boat",
    ],
  },
  {
    id: 4,
    title: "Lembongan Island Tour",
    price: "Best Price",
    icon: <MapPin className="h-6 w-6 text-[#005b96]" />,
    image: "/images/island-tour.png",
    features: [
      "Dream Beach & Devil's Tear",
      "Yellow Bridge & Panorama Point",
      "Mangrove Forest Tour",
      "Local Expert Driver",
    ],
  },
];

export function ServicesSection({ onWaClick }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#005b96] font-bold tracking-widest uppercase text-sm mb-2">
            What We Offer
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Our Services &amp; Rentals
          </h3>
          <p className="text-lg text-slate-600">
            Choose from our premium rentals to explore on your own, or join our
            guided tours to see the best of Nusa Lembongan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv) => (
            <ServiceCard key={srv.id} service={srv} onWaClick={onWaClick} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  onWaClick,
}: {
  service: (typeof services)[0];
  onWaClick: (message?: string) => void;
}) {
  const handleBook = () => {
    const message = `*Service Inquiry*\n*Item:* ${service.title}\n\nHi Funtrip Lembongan, I want to book this. How much is it?`;
    onWaClick(message);
  };

  return (
    <div
      className={`bg-white overflow-hidden shadow-lg border border-slate-100 transition-transform duration-300 hover:-translate-y-2 flex flex-col ${
        service.popular ? "ring-2 ring-[#005b96] relative" : ""
      }`}
    >
      {service.popular && (
        <div className="absolute top-4 right-4 bg-[#005b96] text-white text-xs font-bold px-3 py-1 z-10 uppercase tracking-wider">
          Most Booked
        </div>
      )}
      <div className="h-48 overflow-hidden relative">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 bg-white p-2">{service.icon}</div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h4 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h4>
        <div className="text-lg font-extrabold text-[#005b96] mb-6 border-b border-slate-100 pb-4">
          {service.price}{" "}
          <span className="text-xs font-medium text-slate-500 uppercase ml-1">
            Via WhatsApp
          </span>
        </div>

        <ul className="space-y-3 mb-8 flex-grow">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-slate-600 text-sm">
              <CheckCircle className="h-4 w-4 text-[#005b96] mr-3 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleBook}
          className="w-full py-3 px-4 bg-slate-900 hover:bg-[#005b96] text-white font-bold transition-colors flex justify-center items-center gap-2 text-sm uppercase tracking-wider"
        >
          <Send className="h-4 w-4" /> Book on WhatsApp
        </button>
      </div>
    </div>
  );
}
