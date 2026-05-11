"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { recordAuditLog } from "@/lib/audit";
import bcrypt from "bcryptjs";

async function requireAdmin() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

// ── Create User ──────────────────────────────────────────────────────────────

export async function createUser(formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "USER";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
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

// ── Update User ──────────────────────────────────────────────────────────────

export async function updateUser(id: string, formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;
  const newPassword = (formData.get("password") as string)?.trim();

  const data: Record<string, string> = { name, email, role };
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

// ── Update Role (kept for backward compat) ────────────────────────────────────

export async function updateUserRole(userId: string, role: string) {
  const session = await requireAdmin();

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  await recordAuditLog({
    action: "UPDATE",
    entity: "User",
    entityId: user.id,
    entityName: user.email || user.name || "Unknown",
  });

  revalidatePath("/admin/users");
}

// ── Delete User ───────────────────────────────────────────────────────────────

export async function deleteUser(userId: string) {
  const session = await requireAdmin();

  // Prevent self-deletion
  if (session.user.id === userId) {
    throw new Error("You cannot delete your own account.");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  await prisma.user.delete({ where: { id: userId } });

  await recordAuditLog({
    action: "DELETE",
    entity: "User",
    entityId: userId,
    entityName: user.email || user.name || "Unknown",
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}
