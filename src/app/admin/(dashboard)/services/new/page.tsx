import { prisma } from "@/lib/prisma";
import { ActivityForm } from "../ActivityForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewServicePage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  if (categories.length === 0) {
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h2 className="font-semibold text-amber-900 mb-2">
            No categories found
          </h2>
          <p className="text-sm text-amber-700">
            You need at least one category before creating a service. Please
            seed the database or create a category first.
          </p>
        </div>
      </div>
    );
  }

  return <ActivityForm categories={categories} />;
}
