import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { UserForm } from "../../UserForm";
import { deleteUser } from "../../actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

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

      {/* Danger zone */}
      <div className="px-4 md:px-8 lg:px-12 pb-12 max-w-7xl mx-auto">
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="text-base font-semibold text-red-800 mb-1">Danger Zone</h3>
          <p className="text-sm text-red-600 mb-4">
            Permanently delete this user account. This cannot be undone.
          </p>
          <DeleteButton
            action={deleteUser}
            id={user.id}
            name={user.name || user.email || "this user"}
          />
        </div>
      </div>
    </div>
  );
}
