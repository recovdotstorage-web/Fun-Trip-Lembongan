import { prisma } from "./prisma";
import { auth } from "@/auth";

export type AuditAction = "CREATE" | "UPDATE" | "DELETE";
export type AuditEntity = "Activity" | "BlogPost" | "Category" | "User";

export async function recordAuditLog({
  action,
  entity,
  entityId,
  entityName,
}: {
  action: AuditAction;
  entity: AuditEntity;
  entityId: string;
  entityName?: string;
}) {
  try {
    const session = await auth();
    const adminEmail = session?.user?.email || "system@funtriplembongan.com";

    await prisma.auditLog.create({
      data: {
        action,
        entity,
        entityId,
        entityName,
        adminEmail,
      },
    });
  } catch (error) {
    console.error("Failed to record audit log:", error);
    // Don't throw error to avoid breaking the main operation
  }
}
