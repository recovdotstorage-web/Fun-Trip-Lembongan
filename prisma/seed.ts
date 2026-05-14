import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clean up existing data
  await prisma.activityPriceTier.deleteMany();
  await prisma.activityInclude.deleteMany();
  await prisma.activityExclude.deleteMany();
  await prisma.activityItinerary.deleteMany();
  await prisma.activityImage.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.category.deleteMany();
  // Setting table removed

  // Create Categories
  const snorkeling = await prisma.category.create({
    data: {
      name: "Snorkeling",
      slug: "snorkeling",
    },
  });

  const islandTours = await prisma.category.create({
    data: {
      name: "Island Tours",
      slug: "island-tours",
    },
  });

  const vehicles = await prisma.category.create({
    data: {
      name: "Vehicles",
      slug: "vehicles",
    },
  });

  // Create Activities
  const buggyRental = await prisma.activity.create({
    data: {
      name: "Buggy Car Rental",
      slug: "buggy-car-rental",
      categoryId: vehicles.id,
      price: 600000, // Base "from" price (lowest tier)
      duration: "Flexible (4 Hours to 24 Hours)",
      shortDescription: "Explore Nusa Lembongan comfortably with our premium 4-seater and 7-seater buggy cars. Perfect for families and groups.",
      description: "Our Buggy Car Rental provides the ultimate comfort for island exploration. These vehicles are easy to drive and perfect for navigating the scenic roads of Nusa Lembongan. We offer two types: 4-seater for couples and small families, and 7-seater for larger groups. Rental durations are flexible, ranging from 4-5 hours, 12 hours, up to a full 24 hours. Please note that buggy cars cannot cross the Yellow Bridge to Nusa Ceningan due to weight restrictions.",
      status: "PUBLISHED",
      images: {
        create: [
          {
            publicId: "funtrip-lembongan/buggy-car",
            imageUrl: "/images/buggy.JPG",
            isPrimary: true,
          }
        ]
      },
      includes: {
        create: [
          { item: "Fuel Included" },
          { item: "Free Delivery/Pickup" },
          { item: "Safety Instruction" }
        ]
      },
      excludes: {
        create: [
          { item: "Damage Guarantee" },
          { item: "Driver (Self-drive only)" }
        ]
      },
      itineraries: {
        create: [
          { stepOrder: 1, title: "Pickup", description: "Collect your 4-seater or 7-seater buggy from our office or have it delivered to your hotel." },
          { stepOrder: 2, title: "Island Exploration", description: "Drive to Dream Beach, Devil's Tear, and Panorama Point at your own pace." },
          { stepOrder: 3, title: "Lunch Break", description: "Stop at any local restaurant of your choice." },
          { stepOrder: 4, title: "Sunset at Mushroom Bay", description: "End your day with a beautiful sunset view before returning the buggy." }
        ]
      },
      priceTiers: {
        create: [
          // 4-Seater tiers
          { tierGroup: "4-Seater", tierLabel: "4-5 Hours", price: 600000, sortOrder: 1 },
          { tierGroup: "4-Seater", tierLabel: "12 Hours", price: 900000, sortOrder: 2 },
          { tierGroup: "4-Seater", tierLabel: "24 Hours", price: 1300000, sortOrder: 3 },
          // 7-Seater tiers
          { tierGroup: "7-Seater", tierLabel: "4-5 Hours", price: 800000, sortOrder: 4 },
          { tierGroup: "7-Seater", tierLabel: "12 Hours", price: 1200000, sortOrder: 5 },
          { tierGroup: "7-Seater", tierLabel: "24 Hours", price: 1500000, sortOrder: 6 },
        ]
      }
    }
  });

  const scooterRental = await prisma.activity.create({
    data: {
      name: "Scooter Rental",
      slug: "scooter-rental",
      categoryId: vehicles.id,
      price: 75000,
      duration: "24 Hours",
      shortDescription: "The most flexible way to explore both Nusa Lembongan and Nusa Ceningan. High-quality scooters available.",
      description: "Rent a scooter to enjoy total freedom on the islands. Our scooters are well-maintained and come with helmets. Unlike buggy cars, scooters can cross the Yellow Bridge, allowing you to explore the rugged beauty of Nusa Ceningan as well.",
      status: "PUBLISHED",
      images: {
        create: [
          {
            publicId: "funtrip-lembongan/scooter-rental",
            imageUrl: "/images/scooter.JPG",
            isPrimary: true,
          }
        ]
      },
      includes: {
        create: [
          { item: "2 Helmets" },
          { item: "Full Tank of Fuel" },
          { item: "Lembongan & Ceningan Access" }
        ]
      },
      excludes: {
        create: [
          { item: "Insurance" },
          { item: "Flat Tire Repair" }
        ]
      },
      itineraries: {
        create: [
          { stepOrder: 1, title: "Check-in", description: "Quick paperwork and safety briefing." },
          { stepOrder: 2, title: "Lembongan Highlights", description: "Visit the Blue Lagoon and Yellow Bridge." },
          { stepOrder: 3, title: "Ceningan Adventure", description: "Cross the bridge and explore Ceningan's cliffs." }
        ]
      }
    }
  });

  await prisma.activity.create({
    data: {
      name: "Snorkeling Safari",
      slug: "snorkeling-safari",
      categoryId: snorkeling.id,
      price: 350000,
      duration: "4 Hours",
      shortDescription: "Swim with the majestic Manta Rays at Manta Point and explore 3 beautiful snorkeling spots.",
      description: "Experience the magic of swimming alongside giant manta rays in their natural habitat. Our Snorkeling Safari takes you to the famous Manta Point, followed by Crystal Bay and Mangrove Point. We provide all equipment and a professional guide to ensure your safety and enjoyment.",
      status: "PUBLISHED",
      images: {
        create: [
          {
            publicId: "funtrip-lembongan/manta-snorkeling",
            imageUrl: "/images/snorkeling.png",
            isPrimary: true,
          }
        ]
      },
      includes: {
        create: [
          { item: "Snorkeling Equipment" },
          { item: "Professional Guide" },
          { item: "Mineral Water" },
          { item: "Boat Transfer" }
        ]
      },
      excludes: {
        create: [
          { item: "Lunch" }
        ]
      },
      itineraries: {
        create: [
          { stepOrder: 1, title: "Meet up at Office", description: "Briefing and fitting snorkeling equipment." },
          { stepOrder: 2, title: "Manta Point", description: "Snorkeling with Manta Rays for about 45 minutes." },
          { stepOrder: 3, title: "Crystal Bay", description: "Enjoy the beautiful corals and colorful fishes." },
          { stepOrder: 4, title: "Mangrove Point", description: "Relaxing snorkel at the mangrove forest area." }
        ]
      }
    }
  });

  await prisma.activity.create({
    data: {
      name: "Lembongan Island Tour",
      slug: "lembongan-island-tour",
      categoryId: islandTours.id,
      price: 450000,
      duration: "4-5 Hours",
      shortDescription: "A comprehensive guided tour of Nusa Lembongan's most iconic landmarks.",
      description: "Discover the best of Nusa Lembongan in a single day. Our local expert driver will take you to Dream Beach, Devil's Tear, Panorama Point, and the Yellow Bridge. You'll also enjoy a serene boat ride through the Mangrove Forest.",
      status: "PUBLISHED",
      images: {
        create: [
          {
            publicId: "funtrip-lembongan/island-tour",
            imageUrl: "/images/tour.JPG",
            isPrimary: true,
          }
        ]
      },
      includes: {
        create: [
          { item: "Private Transport" },
          { item: "Mangrove Boat Tour" },
          { item: "Entry Fees" },
          { item: "Local Guide" }
        ]
      },
      excludes: {
        create: [
          { item: "Lunch" }
        ]
      },
      itineraries: {
        create: [
          { stepOrder: 1, title: "Panorama Point", description: "Overview of Jungutbatu village and the ocean." },
          { stepOrder: 2, title: "Devil's Tear", description: "Witness the powerful ocean spray against the cliffs." },
          { stepOrder: 3, title: "Yellow Bridge", description: "Visit the iconic bridge connecting Lembongan and Ceningan." },
          { stepOrder: 4, title: "Mangrove Forest", description: "A quiet boat ride through the mangroves." }
        ]
      }
    }
  });

  await prisma.activity.create({
    data: {
      name: "Nusa Penida West Day Tour",
      slug: "nusa-penida-west-day-tour",
      categoryId: islandTours.id,
      price: 600000,
      duration: "Full Day (8 Hours)",
      shortDescription: "Discover the iconic Kelingking Beach, Broken Beach, and Angel's Billabong on the West side of Nusa Penida.",
      description: "Explore the breathtaking landscapes of Nusa Penida's west coast. This full-day guided tour takes you to the island's most famous photogenic spots. Travel in a comfortable air-conditioned car with our experienced local driver-guide.",
      status: "PUBLISHED",
      images: {
        create: [
          {
            publicId: "funtrip-lembongan/kelingking-beach",
            imageUrl: "/images/island2.jpg",
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
          { item: "Hotel Transfer in Bali" }
        ]
      },
      itineraries: {
        create: [
          { stepOrder: 1, title: "Depart from Sanur", description: "Take the fast boat at 08:00 AM." },
          { stepOrder: 2, title: "Arrive in Nusa Penida", description: "Meet the driver at the port." },
          { stepOrder: 3, title: "Angel's Billabong & Broken Beach", description: "Explore the natural infinity pool and the circular cliff formation." },
          { stepOrder: 4, title: "Kelingking Beach", description: "Visit the iconic T-Rex shaped cliff." }
        ]
      }
    }
  });




  // Create Blog Posts
  await prisma.blogPost.deleteMany();
  await prisma.blogPost.createMany({
    data: [
      {
        title: "Top 5 Snorkeling Spots in Nusa Lembongan",
        slug: "top-5-snorkeling-spots-in-nusa-lembongan",
        content: "<p>Nusa Lembongan and its neighboring islands are renowned for their crystal-clear waters and vibrant marine life. Here are our top 5 picks for snorkeling...</p>",
        thumbnailUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070",
        status: "PUBLISHED"
      },
      {
        title: "A Perfect Day Trip to Nusa Penida",
        slug: "perfect-day-trip-to-nusa-penida",
        content: "<p>Planning a day trip to Nusa Penida? This guide covers everything from taking the fast boat from Sanur to visiting the iconic Kelingking Beach...</p>",
        thumbnailUrl: "https://images.unsplash.com/photo-1559628233-eb1b1a45564b?q=80&w=1964",
        status: "PUBLISHED"
      },
      {
        title: "Exploring the Mangrove Forest of Lembongan",
        slug: "exploring-mangrove-forest-lembongan",
        content: "<p>The tranquil mangrove forest in the north of Nusa Lembongan offers a peaceful escape. Hop on a small traditional boat and glide through the calm waters...</p>",
        thumbnailUrl: "https://images.unsplash.com/photo-1518182170546-076616fd62bf?q=80&w=2070",
        status: "PUBLISHED"
      }
    ]
  });

  // Create Admin User
  console.log("Seeding admin user...");
  const adminEmail = process.env.ADMIN_EMAIL || "admin@funtripbali.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      name: "Admin",
      password: hashedPassword,
    },
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
