"use server";

import { prisma } from "@/lib/prisma";

type InquiryResult = { ok: true } | { ok: false; error: string };

function sanitizeText(val: unknown, maxLen: number): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  // Minimal format check — no regex injection risk
  return (
    email.length >= 3 &&
    email.length <= 254 &&
    email.includes("@") &&
    !email.includes(" ") &&
    email.indexOf("@") > 0 &&
    email.lastIndexOf(".") > email.indexOf("@")
  );
}

export async function submitInquiry(
  formData: FormData
): Promise<InquiryResult> {
  // Sanitize all inputs server-side
  const name = sanitizeText(formData.get("name"), 100);
  const phone = sanitizeText(formData.get("phone"), 30);
  const emailRaw = sanitizeText(formData.get("email"), 254);
  const message = sanitizeText(formData.get("message"), 2000);

  // Validate required fields
  if (!name || name.length < 2) {
    return { ok: false, error: "Please enter your full name (min 2 chars)." };
  }
  if (!phone || phone.length < 5) {
    return { ok: false, error: "Please enter a valid phone number." };
  }
  if (!message || message.length < 10) {
    return {
      ok: false,
      error: "Please write a message (at least 10 characters).",
    };
  }

  // Email is optional — validate only if provided
  const email = emailRaw || null;
  if (email && !isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  await prisma.inquiry.create({
    data: { name, phone, email, message },
  });

  return { ok: true };
}
