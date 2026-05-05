import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  phone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .regex(/^[0-9+\-\s]+$/, "Nomor telepon tidak valid"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
  activityId: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
