import { prisma } from "./src/lib/prisma";

async function run() {
  await prisma.activity.deleteMany({
    where: { slug: "scooter-island-tour" }
  });

  const scooterRental = await prisma.activity.findUnique({
    where: { slug: "scooter-rental" }
  });

  if (scooterRental) {
    const existingTier = await prisma.activityPriceTier.findFirst({
      where: { activityId: scooterRental.id, tierLabel: "3-4 Hours (with driver)" }
    });

    if (!existingTier) {
      await prisma.activityPriceTier.create({
        data: {
          tierGroup: "Scooter Island Tour",
          tierLabel: "3-4 Hours (with driver)",
          price: 400000,
          sortOrder: 3,
          activity: { connect: { id: scooterRental.id } }
        }
      });
    }
  }

  console.log("Done");
}

run().catch(console.error).finally(() => prisma.$disconnect());
