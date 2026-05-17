/**
 * Script to seed/update price tiers for existing services.
 * Run with: npx tsx prisma/seed-prices.ts
 * 
 * This does NOT delete existing services — it only updates price tiers.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding price tiers...");

  // ─── BUGGY CAR RENTAL ───────────────────────────────────────────
  const buggy = await prisma.activity.findUnique({ where: { slug: "buggy-car-rental" } });
  if (buggy) {
    // Clear existing tiers
    await prisma.activityPriceTier.deleteMany({ where: { activityId: buggy.id } });

    // Self-drive tiers
    await prisma.activityPriceTier.createMany({
      data: [
        { activityId: buggy.id, tierGroup: "4-Seater", tierLabel: "4-5 Hours", price: 600000, sortOrder: 1 },
        { activityId: buggy.id, tierGroup: "4-Seater", tierLabel: "12 Hours", price: 900000, sortOrder: 2 },
        { activityId: buggy.id, tierGroup: "4-Seater", tierLabel: "24 Hours", price: 1300000, sortOrder: 3 },
        { activityId: buggy.id, tierGroup: "7-Seater", tierLabel: "4-5 Hours", price: 800000, sortOrder: 4 },
        { activityId: buggy.id, tierGroup: "7-Seater", tierLabel: "12 Hours", price: 1200000, sortOrder: 5 },
        { activityId: buggy.id, tierGroup: "7-Seater", tierLabel: "24 Hours", price: 1500000, sortOrder: 6 },
      ],
    });

    // Update description to mention driver option
    await prisma.activity.update({
      where: { id: buggy.id },
      data: {
        price: 600000,
        description: "Our Buggy Car Rental provides the ultimate comfort for island exploration. These vehicles are easy to drive and perfect for navigating the scenic roads of Nusa Lembongan.\n\nWe offer two types:\n• 4-Seater — perfect for couples and small families\n• 7-Seater — ideal for larger groups\n\nRental durations are flexible: 4-5 hours, 12 hours, or a full 24 hours. For rentals longer than 24 hours, we offer special discounted rates.\n\n🚗 Self-drive (prices shown above)\n🧑‍✈️ With driver: +Rp 250.000\n\nPlease note: Buggy cars cannot cross the Yellow Bridge to Nusa Ceningan due to weight restrictions.",
      },
    });

    console.log("✅ Buggy Car Rental — 6 price tiers added");
  } else {
    console.log("⚠️ Buggy Car Rental not found, skipping...");
  }

  // ─── SNORKELING TRIP ────────────────────────────────────────────
  const snorkeling = await prisma.activity.findUnique({ where: { slug: "snorkeling-safari" } });
  if (snorkeling) {
    await prisma.activityPriceTier.deleteMany({ where: { activityId: snorkeling.id } });

    await prisma.activityPriceTier.createMany({
      data: [
        { activityId: snorkeling.id, tierGroup: "Private Boat", tierLabel: "2 Pax", price: 1800000, sortOrder: 1 },
        { activityId: snorkeling.id, tierGroup: "Private Boat", tierLabel: "4 Pax", price: 2500000, sortOrder: 2 },
        { activityId: snorkeling.id, tierGroup: "Private Boat", tierLabel: "5 Pax", price: 3000000, sortOrder: 3 },
        { activityId: snorkeling.id, tierGroup: "Private Boat", tierLabel: "6+ Pax", price: 4000000, sortOrder: 4 },
        { activityId: snorkeling.id, tierGroup: "Sharing Boat", tierLabel: "Per Person", price: 300000, sortOrder: 5 },
      ],
    });

    // Update snorkeling details
    await prisma.activityInclude.deleteMany({ where: { activityId: snorkeling.id } });
    await prisma.activityInclude.createMany({
      data: [
        { activityId: snorkeling.id, item: "Snorkeling equipment" },
        { activityId: snorkeling.id, item: "Drinking water & snacks on the boat" },
        { activityId: snorkeling.id, item: "Towel for your convenience" },
        { activityId: snorkeling.id, item: "Underwater photos from your day out" },
        { activityId: snorkeling.id, item: "Snorkeling guide with you in the water at all times" },
        { activityId: snorkeling.id, item: "Safety equipment on the boat" },
        { activityId: snorkeling.id, item: "Free hotel pickup & drop-off" },
      ],
    });

    await prisma.activity.update({
      where: { id: snorkeling.id },
      data: {
        name: "Snorkeling Trip",
        price: 300000,
        duration: "4 Hours",
        shortDescription: "Swim with majestic Manta Rays and explore 4 stunning snorkeling spots around Nusa Lembongan and Nusa Penida.",
        description: "Experience the magic of swimming alongside giant manta rays in their natural habitat. Our Snorkeling Trip takes you to 4 incredible spots:\n\n1. Manta Ray / Manta Bay\n2. Crystal Bay, Nusa Penida\n3. Mangrove Point\n4. Manta Point\n\nChoose between a private boat experience (perfect for families and groups) or join our sharing boat for a budget-friendly adventure. All options include free hotel pickup and drop-off.\n\nPrivate boat includes ticket boat from Nusa Lembongan to Nusa Penida.",
      },
    });

    console.log("✅ Snorkeling Trip — 5 price tiers added");
  }

  // ─── SCOOTER RENTAL ─────────────────────────────────────────────
  const scooter = await prisma.activity.findUnique({ where: { slug: "scooter-rental" } });
  if (scooter) {
    await prisma.activityPriceTier.deleteMany({ where: { activityId: scooter.id } });

    await prisma.activityPriceTier.createMany({
      data: [
        { activityId: scooter.id, tierGroup: "Scoopy", tierLabel: "Per Day", price: 100000, sortOrder: 1 },
        { activityId: scooter.id, tierGroup: "N-Max", tierLabel: "Per Day", price: 150000, sortOrder: 2 },
      ],
    });

    await prisma.activity.update({
      where: { id: scooter.id },
      data: {
        price: 100000,
        shortDescription: "The most flexible way to explore Nusa Lembongan and Nusa Ceningan. Scoopy and N-Max available with full petrol.",
        description: "Rent a scooter to enjoy total freedom on the islands. Our scooters are well-maintained and come with full petrol. Unlike buggy cars, scooters can cross the Yellow Bridge, allowing you to explore the rugged beauty of Nusa Ceningan as well.\n\nAvailable models:\n• Honda Scoopy — Rp 100.000/day\n• Yamaha N-Max — Rp 150.000/day\n\nAll rentals include full petrol and free drop-off/pickup to your hotel.",
      },
    });

    // Update includes
    await prisma.activityInclude.deleteMany({ where: { activityId: scooter.id } });
    await prisma.activityInclude.createMany({
      data: [
        { activityId: scooter.id, item: "2 Helmets" },
        { activityId: scooter.id, item: "Full Tank of Petrol" },
        { activityId: scooter.id, item: "Free Drop-off & Pickup" },
        { activityId: scooter.id, item: "Lembongan & Ceningan Access" },
      ],
    });

    console.log("✅ Scooter Rental — 2 price tiers added");
  }

  // ─── ISLAND TOUR (with scooter driver) ──────────────────────────
  const islandTour = await prisma.activity.findUnique({ where: { slug: "lembongan-island-tour" } });
  if (islandTour) {
    await prisma.activity.update({
      where: { id: islandTour.id },
      data: {
        name: "Lembongan Island Motorbike Tour",
        price: 400000,
        duration: "3-4 Hours",
        shortDescription: "Explore all attractions of Nusa Lembongan and Nusa Ceningan with a private local driver guide on a motorbike. Perfect if you don't ride yourself!",
        description: "If you want to explore our beloved island but can't ride a motorbike, we offer island tours using motorbikes.\n\nTo explore all of Nusa Lembongan's attractions, of course:\n1. Mangrove Point\n2. Mahagiri Beach\n3. Dream Beach\n4. Devil's Steps\n5. Yellow Bridge\n\nAnd:\n1. Blue Lagoon\n2. Secret Beach\n3. Mahana Point\n4. Mushroom Beach",
      },
    });

    console.log("✅ Island Tour — updated to Rp 400.000 with driver");
  }

  // ─── NUSA PENIDA TOUR ───────────────────────────────────────────
  const penidaTour = await prisma.activity.findUnique({ where: { slug: "nusa-penida-island-tour" } });
  if (penidaTour) {
    await prisma.activity.update({
      where: { id: penidaTour.id },
      data: {
        name: "Nusa Penida Island Tour",
        slug: "nusa-penida-island-tour",
        price: 1800000,
        duration: "Full Day",
        shortDescription: "Explore the breathtaking Nusa Penida with a private driver. Choose between West Trip or East Trip routes.",
        description: "Hello everyone, if you're interested in a day trip to Nusa Penida with a driver, please contact me. We have two location options:\n\nWest Trip:\n• Klingking beach\n• Angel Billabong\n• Broken Beach\n• Crystal Beach\n\nEast Trip:\n• Diamond Beach\n• Atuh Beach\n• Treehouse\n• Molenteng Hill\n\nPrice starts from Rp 1.800.000 for 2 persons (private), including:\n• Fast Boat return tickets from Nusa Lembongan to Nusa Penida\n• Free drop-off and pick-up from your hotel\n• English-speaking private driver\n• Entrance fees\n• Lunch",
      },
    });

    // Update itineraries for both routes
    await prisma.activityItinerary.deleteMany({ where: { activityId: penidaTour.id } });
    await prisma.activityItinerary.createMany({
      data: [
        { activityId: penidaTour.id, stepOrder: 1, title: "Hotel Pickup & Boat Transfer", description: "Free pickup from your hotel in Lembongan, then private boat to Nusa Penida." },
        { activityId: penidaTour.id, stepOrder: 2, title: "West Trip: Klingking beach", description: "Visit the iconic Klingking beach with stunning ocean views." },
        { activityId: penidaTour.id, stepOrder: 3, title: "West Trip: Angel Billabong & Broken Beach", description: "Explore the natural infinity pool of Angel Billabong and the circular cliff formation of Broken Beach." },
        { activityId: penidaTour.id, stepOrder: 4, title: "West Trip: Crystal Beach", description: "Relax at the pristine white sand of Crystal Beach with crystal clear water." },
        { activityId: penidaTour.id, stepOrder: 5, title: "East Trip: Diamond Beach & Atuh Beach", description: "Descend the dramatic cliff staircase of Diamond Beach and visit the secluded paradise cove of Atuh Beach." },
        { activityId: penidaTour.id, stepOrder: 6, title: "East Trip: Treehouse & Molenteng Hill", description: "Enjoy panoramic viewpoints from the Treehouse and Molenteng Hill." },
      ],
    });

    await prisma.activityPriceTier.deleteMany({ where: { activityId: penidaTour.id } });
    await prisma.activityPriceTier.createMany({
      data: [
        { activityId: penidaTour.id, tierGroup: "West Trip", tierLabel: "2 Pax", price: 1800000, sortOrder: 1 },
        { activityId: penidaTour.id, tierGroup: "West Trip", tierLabel: "4 Pax", price: 2500000, sortOrder: 2 },
        { activityId: penidaTour.id, tierGroup: "West Trip", tierLabel: "5 Pax", price: 3000000, sortOrder: 3 },
        { activityId: penidaTour.id, tierGroup: "West Trip", tierLabel: "6+ Pax", price: 3500000, sortOrder: 4 },
        { activityId: penidaTour.id, tierGroup: "East Trip", tierLabel: "2 Pax", price: 1800000, sortOrder: 5 },
        { activityId: penidaTour.id, tierGroup: "East Trip", tierLabel: "4 Pax", price: 2500000, sortOrder: 6 },
        { activityId: penidaTour.id, tierGroup: "East Trip", tierLabel: "5 Pax", price: 3000000, sortOrder: 7 },
        { activityId: penidaTour.id, tierGroup: "East Trip", tierLabel: "6+ Pax", price: 3500000, sortOrder: 8 },
      ],
    });

    // Update includes
    await prisma.activityInclude.deleteMany({ where: { activityId: penidaTour.id } });
    await prisma.activityInclude.createMany({
      data: [
        { activityId: penidaTour.id, item: "Private boat from Nusa Lembongan to Nusa Penida" },
        { activityId: penidaTour.id, item: "Free hotel drop-off & pick-up" },
        { activityId: penidaTour.id, item: "English-speaking driver" },
        { activityId: penidaTour.id, item: "Entrance fees" },
        { activityId: penidaTour.id, item: "Lunch" },
      ],
    });

    console.log("✅ Nusa Penida Tour — 8 price tiers (West + East) added");
  }

  console.log("\n🎉 All price tiers seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
