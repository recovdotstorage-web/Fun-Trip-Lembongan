import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | Fun Trip Lembongan",
  description:
    "Learn about Fun Trip Lembongan — your trusted local guide for tours, buggy car rental, motor rental, and snorkeling experiences in Nusa Lembongan.",
};

export default function AboutPage() {
  return <AboutContent />;
}
