"use client";

import { useState, useRef, useEffect } from "react";
import { Car, Bike, Ship, MapPin, Calendar, ChevronDown, Send } from "lucide-react";

interface BookingWidgetProps {
  onWaClick: (message?: string) => void;
}

const services = [
  { label: "Buggy Car Rental", icon: Car },
  { label: "Scooter Rental", icon: Bike },
  { label: "Snorkeling Trip", icon: Ship },
  { label: "Island Tour", icon: MapPin },
];

export function BookingWidget({ onWaClick }: BookingWidgetProps) {
  const [selectedService, setSelectedService] = useState(services[2]);
  const [isOpen, setIsOpen] = useState(false);
  const [travelDate, setTravelDate] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQuickBook = () => {
    const message = `*Quick Booking Request*\n\n*Service:* ${selectedService.label}\n*Travel Date:* ${travelDate || "Not specified"}\n\nHi Funtrip Lembongan, is this available?`;
    onWaClick(message);
  };

  const SelectedIcon = selectedService.icon;

  return (
    <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-16 mb-8">
      <div className="bg-white shadow-xl shadow-slate-200/50 p-5 md:p-6 border border-slate-100 flex flex-col md:flex-row gap-4 md:gap-6 items-end">

        {/* Service Type — Custom Dropdown */}
        <div className="w-full md:w-2/5 flex flex-col gap-2" ref={dropdownRef}>
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">
            Service Type
          </label>
          <div className="relative">
            {/* Trigger */}
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="w-full flex items-center gap-3 bg-slate-50 border border-slate-200 hover:border-[#005b96] focus:border-[#005b96] focus:outline-none py-3.5 pl-4 pr-4 transition-colors text-left"
            >
              <SelectedIcon className="h-5 w-5 text-[#005b96] shrink-0" />
              <span className="flex-1 text-slate-700 font-medium text-sm">{selectedService.label}</span>
              <ChevronDown
                className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Options List */}
            {isOpen && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-slate-200 shadow-xl mt-1 py-1">
                {services.map((svc) => {
                  const Icon = svc.icon;
                  const isSelected = svc.label === selectedService.label;
                  return (
                    <button
                      key={svc.label}
                      type="button"
                      onClick={() => {
                        setSelectedService(svc);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${
                        isSelected
                          ? "bg-[#005b96] text-white"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${isSelected ? "text-white" : "text-[#005b96]"}`} />
                      <span className="font-medium">{svc.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Travel Date Picker */}
        <div className="w-full md:w-2/5 flex flex-col gap-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">
            Travel Date
          </label>
          <div className="relative flex items-center bg-slate-50 border border-slate-200 hover:border-[#005b96] transition-colors focus-within:border-[#005b96]">
            <Calendar className="h-5 w-5 text-[#005b96] absolute left-4" />
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full bg-transparent py-3.5 pl-12 pr-4 focus:outline-none text-slate-700 font-medium cursor-pointer"
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full md:w-1/5">
          <button
            onClick={handleQuickBook}
            className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold transition-all shadow-md flex justify-center items-center gap-2"
          >
            <Send className="h-4 w-4" /> Check Avail
          </button>
        </div>
      </div>
    </div>
  );
}
