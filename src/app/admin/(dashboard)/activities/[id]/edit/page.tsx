import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ActivityForm } from "../../ActivityForm";
import { deleteActivity } from "../../actions";
import { Trash2 } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

export default async function EditActivityPage({ params }: Props) {
  const { id } = await params;

  const [activity, categories] = await Promise.all([
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

  if (!activity) notFound();

  return (
    <div>
      <ActivityForm categories={categories} activity={activity} />

      {/* Danger zone */}
      <div className="px-6 lg:px-8 pb-12 max-w-4xl mx-auto">
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="text-base font-semibold text-red-800 mb-1">
            Danger Zone
          </h3>
          <p className="text-sm text-red-600 mb-4">
            Permanently delete this activity and all its images. This cannot be
            undone.
          </p>
          <form
            action={deleteActivity.bind(null, activity.id)}
          >
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition"
              onClick={(e) => {
                if (
                  !confirm(
                    `Delete "${activity.name}"? This action cannot be undone.`
                  )
                ) {
                  e.preventDefault();
                }
              }}
            >
              <Trash2 className="w-4 h-4" />
              Delete Activity
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
