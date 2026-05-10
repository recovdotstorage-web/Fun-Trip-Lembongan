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

const WA_NUMBER = "6281234567890";

export function HomePageClient() {
  const handleWhatsAppRedirect = (message?: string) => {
    const defaultMessage =
      "Hello Funtrip Lembongan, I would like to inquire about your services.";
    const encodedMessage = encodeURIComponent(message || defaultMessage);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      <HeroSection onWaClick={handleWhatsAppRedirect} />
      <BookingWidget onWaClick={handleWhatsAppRedirect} />
      <TrustedSection />
      <ServicesSection onWaClick={handleWhatsAppRedirect} />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection onWaClick={handleWhatsAppRedirect} />
      <ContactSection onWaClick={handleWhatsAppRedirect} />
    </>
  );
}
