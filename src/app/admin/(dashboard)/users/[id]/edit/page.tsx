import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { UserForm } from "../../UserForm";
import { deleteUser } from "../../actions";
import { DangerZone } from "@/components/admin/DangerZone";

type Props = { params: Promise<{ id: string }> };

export default async function EditUserPage({ params }: Props) {
  const { id } = await params;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) notFound();

  return (
    <div>
      <UserForm
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }}
      />

      <DangerZone 
        action={deleteUser} 
        id={user.id} 
        name={user.name || user.email || "this user"} 
        title="User"
        redirectTo="/admin/users"
        containerClassName="max-w-7xl px-4 md:px-8 lg:px-12 mx-auto mb-12"
      />
    </div>
  );
}
