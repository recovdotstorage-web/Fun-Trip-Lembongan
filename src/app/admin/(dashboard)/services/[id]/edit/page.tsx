import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ActivityForm } from "../../ActivityForm";
import { deleteService } from "../../actions";
import { DangerZone } from "@/components/admin/DangerZone";
import { getIDRtoUSDRate } from "@/lib/exchange-rate";

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
        priceTiers: { orderBy: { sortOrder: "asc" } },
      },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!service) notFound();

  const rate = await getIDRtoUSDRate();
  return (
    <div>
      <ActivityForm categories={categories} activity={service} exchangeRate={rate} />

      <DangerZone 
        action={deleteService} 
        id={service.id} 
        name={service.name} 
        title="Service"
        redirectTo="/admin/services"
        containerClassName="max-w-7xl px-4 md:px-8 lg:px-12 mx-auto mb-12"
      />
    </div>
  );
}
