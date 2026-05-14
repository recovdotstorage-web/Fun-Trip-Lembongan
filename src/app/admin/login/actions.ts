"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/admin/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    // Re-throw redirect errors (NEXT_REDIRECT)
    throw error;
  }
}
