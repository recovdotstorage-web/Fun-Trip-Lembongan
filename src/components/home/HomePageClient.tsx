"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { BookingWidget } from "@/components/home/BookingWidget";
import { TrustedSection } from "@/components/home/TrustedSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { FAQSection } from "@/components/home/FAQSection";
import { ContactSection } from "@/components/home/ContactSection";
import { CONTACT_INFO } from "@/constants/contact";

const WA_NUMBER = CONTACT_INFO.whatsapp;

export function HomePageClient({ services, exchangeRate }: { services: any[], exchangeRate: number }) {
  const handleWhatsAppRedirect = (message?: string) => {
    const defaultMessage =
      "Hello Funtrip Lembongan, I would like to book a service.";
    const encodedMessage = encodeURIComponent(message || defaultMessage);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      <HeroSection onWaClick={handleWhatsAppRedirect} />
      <BookingWidget onWaClick={handleWhatsAppRedirect} />
      <TrustedSection />
      <ServicesSection onWaClick={handleWhatsAppRedirect} services={services} exchangeRate={exchangeRate} />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection onWaClick={handleWhatsAppRedirect} />
      <ContactSection onWaClick={handleWhatsAppRedirect} />
    </>
  );
}
