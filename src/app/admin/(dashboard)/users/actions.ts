"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { recordAuditLog } from "@/lib/audit";
import bcrypt from "bcryptjs";
import { sanitizeString } from "@/lib/utils/sanitization";

async function requireAdmin() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  return session as { user: { id: string; email: string; name?: string | null } };
}

export async function createUser(formData: FormData) {
  await requireAdmin();

  const name = sanitizeString(formData.get("name") as string);
  const email = sanitizeString(formData.get("email") as string);
  const password = formData.get("password") as string;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  await recordAuditLog({
    action: "CREATE",
    entity: "User",
    entityId: user.id,
    entityName: user.email || user.name || "Unknown",
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function updateUser(id: string, formData: FormData) {
  await requireAdmin();

  const name = sanitizeString(formData.get("name") as string);
  const email = sanitizeString(formData.get("email") as string);
  const newPassword = (formData.get("password") as string)?.trim();

  const data: Record<string, string> = { name, email };
  if (newPassword && newPassword.length > 0) {
    data.password = await bcrypt.hash(newPassword, 10);
  }

  const user = await prisma.user.update({ where: { id }, data });

  await recordAuditLog({
    action: "UPDATE",
    entity: "User",
    entityId: user.id,
    entityName: user.email || user.name || "Unknown",
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}


export async function deleteUser(userId: string) {
  try {
    const session = await requireAdmin();

    if (session.user.id === userId) {
      return { error: "You cannot delete your own account." };
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return { error: "User not found" };
    }

    await prisma.user.delete({ where: { id: userId } });

    await recordAuditLog({
      action: "DELETE",
      entity: "User",
      entityId: userId,
      entityName: user.email || user.name || "Unknown",
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("Error in deleteUser:", error);
    return { error: error.message || "Failed to delete user" };
  }
}

