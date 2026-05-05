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
  console.log("Seeding database...");

  // Clean up existing data
  await prisma.activityInclude.deleteMany();
  await prisma.activityExclude.deleteMany();
  await prisma.activityItinerary.deleteMany();
  await prisma.activityImage.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.category.deleteMany();
  await prisma.setting.deleteMany();

  // Create Categories
  const snorkeling = await prisma.category.create({
    data: {
      name: "Snorkeling",
      slug: "snorkeling",
    },
  });

  const islandTour = await prisma.category.create({
    data: {
      name: "Island Tour",
      slug: "island-tour",
    },
  });

  const waterSports = await prisma.category.create({
    data: {
      name: "Water Sports",
      slug: "water-sports",
    },
  });

  // Create Activities
  await prisma.activity.create({
    data: {
      name: "Manta Ray Snorkeling Safari",
      slug: "manta-ray-snorkeling-safari",
      categoryId: snorkeling.id,
      price: 350000,
      duration: "4 Hours",
      shortDescription: "Swim with the majestic Manta Rays at Manta Point and explore 3 beautiful snorkeling spots around Nusa Penida and Lembongan.",
      description: "Experience the magic of swimming alongside giant manta rays in their natural habitat. Our Manta Ray Snorkeling Safari takes you to the famous Manta Point, followed by Crystal Bay and Mangrove Point. We provide all equipment and a professional guide to ensure your safety and enjoyment.",
      status: "PUBLISHED",
      images: {
        create: [
          {
            publicId: "funtrip-lembongan/manta-snorkeling",
            imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070",
            isPrimary: true,
          }
        ]
      },
      includes: {
        create: [
          { item: "Snorkeling Equipment" },
          { item: "Professional Guide" },
          { item: "Mineral Water" },
          { item: "Boat Transfer" },
          { item: "Towels" }
        ]
      },
      excludes: {
        create: [
          { item: "Personal Expenses" },
          { item: "Hotel Transfer" },
          { item: "Lunch" }
        ]
      },
      itineraries: {
        create: [
          { stepOrder: 1, title: "Meet up at Office", description: "Briefing and fitting snorkeling equipment." },
          { stepOrder: 2, title: "Manta Point", description: "Snorkeling with Manta Rays for about 45 minutes." },
          { stepOrder: 3, title: "Crystal Bay", description: "Enjoy the beautiful corals and colorful fishes." },
          { stepOrder: 4, title: "Mangrove Point", description: "Relaxing snorkel at the mangrove forest area." },
          { stepOrder: 5, title: "Back to Office", description: "Return to base, shower and finish." }
        ]
      }
    }
  });

  await prisma.activity.create({
    data: {
      name: "Nusa Penida West Day Tour",
      slug: "nusa-penida-west-day-tour",
      categoryId: islandTour.id,
      price: 600000,
      duration: "Full Day (8 Hours)",
      shortDescription: "Discover the iconic Kelingking Beach, Broken Beach, and Angel's Billabong on the West side of Nusa Penida.",
      description: "Explore the breathtaking landscapes of Nusa Penida's west coast. This full-day guided tour takes you to the island's most famous photogenic spots. Travel in a comfortable air-conditioned car with our experienced local driver-guide.",
      status: "PUBLISHED",
      images: {
        create: [
          {
            publicId: "funtrip-lembongan/kelingking-beach",
            imageUrl: "https://images.unsplash.com/photo-1559628233-eb1b1a45564b?q=80&w=1964",
            isPrimary: true,
          }
        ]
      },
      includes: {
        create: [
          { item: "Private AC Car" },
          { item: "English Speaking Driver" },
          { item: "Fast Boat Return Tickets (Sanur - Penida)" },
          { item: "Entrance Fees" },
          { item: "Lunch" }
        ]
      },
      excludes: {
        create: [
          { item: "Personal Expenses" },
          { item: "Hotel Transfer in Bali" },
          { item: "Tipping" }
        ]
      },
      itineraries: {
        create: [
          { stepOrder: 1, title: "Depart from Sanur", description: "Take the fast boat at 08:00 AM." },
          { stepOrder: 2, title: "Arrive in Nusa Penida", description: "Meet the driver at the port." },
          { stepOrder: 3, title: "Angel's Billabong & Broken Beach", description: "Explore the natural infinity pool and the circular cliff formation." },
          { stepOrder: 4, title: "Lunch", description: "Enjoy local indonesian food." },
          { stepOrder: 5, title: "Kelingking Beach", description: "Visit the iconic T-Rex shaped cliff." },
          { stepOrder: 6, title: "Crystal Bay", description: "Relax at the beach before heading back." },
          { stepOrder: 7, title: "Return to Sanur", description: "Take the 16:30 PM fast boat back to Bali." }
        ]
      }
    }
  });

  // Create Settings
  await prisma.setting.createMany({
    data: [
      { key: "siteName", value: "Fun Trip Lembongan" },
      { key: "siteDescription", value: "Your best travel partner for exploring Nusa Lembongan and Nusa Penida." },
      { key: "contactPhone", value: "+6281234567890" },
      { key: "contactEmail", value: "info@funtriplembongan.com" },
      { key: "contactAddress", value: "Jungutbatu, Nusa Lembongan, Bali, Indonesia" },
      { key: "instagramUrl", value: "https://instagram.com/funtriplembongan" },
      { key: "facebookUrl", value: "https://facebook.com/funtriplembongan" },
    ]
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
