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
  await prisma.testimonial.deleteMany();
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
      price: 100000,
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
          { item: "Full Petrol" },
          { item: "Free Drop off & Pick up" },
          { item: "2 Helmets" },
          { item: "Lembongan & Ceningan Access" }
        ]
      },
      excludes: {
        create: [
          { item: "Insurance" },
          { item: "Flat Tire Repair" }
        ]
      },
      priceTiers: {
        create: [
          { tierGroup: "Scoopy", tierLabel: "1 Day", price: 100000, sortOrder: 1 },
          { tierGroup: "Nmax", tierLabel: "1 Day", price: 150000, sortOrder: 2 },
          { tierGroup: "Scooter Island Tour", tierLabel: "3-4 Hours (with driver)", price: 400000, sortOrder: 3 },
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
      name: "Lembongan Island Motorbike Tour",
      slug: "lembongan-island-tour",
      categoryId: islandTours.id,
      price: 400000,
      duration: "3-4 Hours",
      shortDescription: "Explore all attractions of Nusa Lembongan and Nusa Ceningan with a private local driver guide on a motorbike. Perfect if you don't ride yourself!",
      description: "If you want to explore our beloved island but can't ride a motorbike, we offer island tours using motorbikes.\n\nTo explore all of Nusa Lembongan's attractions, of course:\n1. Mangrove Point\n2. Mahagiri Beach\n3. Dream Beach\n4. Devil's Steps\n5. Yellow Bridge\n\nAnd:\n1. Blue Lagoon\n2. Secret Beach\n3. Mahana Point\n4. Mushroom Beach",
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
          { item: "Guided Motorbike Tour (with local driver)" },
          { item: "All Fuel / Petrol" },
          { item: "Safety Helmet" },
          { item: "Mineral Water" },
          { item: "Free hotel pick-up & drop-off" }
        ]
      },
      excludes: {
        create: [
          { item: "Lunch" },
          { item: "Personal Expenses" }
        ]
      },
      itineraries: {
        create: [
          { stepOrder: 1, title: "Nusa Lembongan Tour", description: "1. Mangrove Point, 2. Mahagiri Beach, 3. Dream Beach, 4. Devil's Steps, 5. Yellow Bridge" },
          { stepOrder: 2, title: "Nusa Ceningan & Mushroom Beach Tour", description: "1. Blue Lagoon, 2. Secret Beach, 3. Mahana Point, 4. Mushroom Beach" }
        ]
      }
    }
  });

  await prisma.activity.create({
    data: {
      name: "Nusa Penida Island Tour",
      slug: "nusa-penida-island-tour",
      categoryId: islandTours.id,
      price: 1800000,
      duration: "Full Day",
      shortDescription: "Explore the breathtaking Nusa Penida with a private driver. Choose between West Trip or East Trip routes.",
      description: "Hello everyone, if you're interested in a day trip to Nusa Penida with a driver, please contact me. We have two location options:\n\nWest Trip:\n• Klingking beach\n• Angel Billabong\n• Broken Beach\n• Crystal Beach\n\nEast Trip:\n• Diamond Beach\n• Atuh Beach\n• Treehouse\n• Molenteng Hill\n\nPrice starts from Rp 1.800.000 for 2 persons (private), including:\n• Fast Boat return tickets from Nusa Lembongan to Nusa Penida\n• Free drop-off and pick-up from your hotel\n• English-speaking private driver\n• Entrance fees\n• Lunch",
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
          { item: "Private boat from Nusa Lembongan to Nusa Penida" },
          { item: "Free hotel drop-off & pick-up" },
          { item: "English-speaking driver" },
          { item: "Entrance fees" },
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
          { stepOrder: 1, title: "Hotel Pickup & Boat Transfer", description: "Free pickup from your hotel in Lembongan, then private boat to Nusa Penida." },
          { stepOrder: 2, title: "West Trip: Klingking beach", description: "Visit the iconic Klingking beach with stunning ocean views." },
          { stepOrder: 3, title: "West Trip: Angel Billabong & Broken Beach", description: "Explore the natural infinity pool of Angel Billabong and the circular cliff formation of Broken Beach." },
          { stepOrder: 4, title: "West Trip: Crystal Beach", description: "Relax at the pristine white sand of Crystal Beach with crystal clear water." },
          { stepOrder: 5, title: "East Trip: Diamond Beach & Atuh Beach", description: "Descend the dramatic cliff staircase of Diamond Beach and visit the secluded paradise cove of Atuh Beach." },
          { stepOrder: 6, title: "East Trip: Treehouse & Molenteng Hill", description: "Enjoy panoramic viewpoints from the Treehouse and Molenteng Hill." }
        ]
      },
      priceTiers: {
        create: [
          { tierGroup: "West Trip", tierLabel: "2 Pax", price: 1800000, sortOrder: 1 },
          { tierGroup: "West Trip", tierLabel: "4 Pax", price: 2500000, sortOrder: 2 },
          { tierGroup: "West Trip", tierLabel: "5 Pax", price: 3000000, sortOrder: 3 },
          { tierGroup: "West Trip", tierLabel: "6+ Pax", price: 3500000, sortOrder: 4 },
          { tierGroup: "East Trip", tierLabel: "2 Pax", price: 1800000, sortOrder: 5 },
          { tierGroup: "East Trip", tierLabel: "4 Pax", price: 2500000, sortOrder: 6 },
          { tierGroup: "East Trip", tierLabel: "5 Pax", price: 3000000, sortOrder: 7 },
          { tierGroup: "East Trip", tierLabel: "6+ Pax", price: 3500000, sortOrder: 8 }
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
