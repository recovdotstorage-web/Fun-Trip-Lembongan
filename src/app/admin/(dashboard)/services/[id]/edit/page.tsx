import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ActivityForm } from "../../ActivityForm";
import { deleteService } from "../../actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

type Props = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;

  const [service, categories] = await Promise.all([
    prisma.activity.findUnique({
      where: { id },
      include: {
        images: { orderBy: { isPrimary: "desc" } },
        includes: true,
        excludes: true,
      },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!service) notFound();

  return (
    <div>
      <ActivityForm categories={categories} activity={service} />

      {/* Danger zone */}
      <div className="px-6 lg:px-8 pb-12 max-w-4xl mx-auto">
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="text-base font-semibold text-red-800 mb-1">
            Danger Zone
          </h3>
          <p className="text-sm text-red-600 mb-4">
            Permanently delete this service and all its images. This cannot be
            undone.
          </p>
          <DeleteButton action={deleteService} id={service.id} name={service.name} />
        </div>
      </div>
    </div>
  );
}
