# Fun Trip Lembongan

Fun Trip Lembongan is a tourism booking and information platform offering the best travel experiences in Nusa Lembongan and Nusa Penida. We provide various services including island tours, snorkeling, and Buggy Car & Scooter rentals to facilitate your holiday.

## Key Features
- **Services Management**: View and manage various activities and vehicle rentals such as Buggy Cars (4 & 7 Seater) and Scooters.
- **Blog & Articles**: Share the latest tourism information, travel guides, and tips around the Nusa Lembongan area.
- **Integrated Admin Dashboard**: Manage (Create, Read, Update, Delete) activities, blogs, and categories directly using an interactive dashboard. Equipped with image uploading using **Cloudinary**.
- **Modern User Experience (UX)**: Responsive, clean, and elegant design optimized for mobile and desktop devices.
- **Auto Redirect**: Dynamic 404 page with an automatic redirect back to the homepage.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS, Framer Motion
- **Database ORM**: Prisma
- **Database Provider**: Turso (LibSQL)
- **Media Storage**: Cloudinary
- **Authentication**: NextAuth.js (Auth.js)

## Installation & Setup

1. Clone this repository
2. Install dependencies by running:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root folder and add the following environment variables:
   ```env
   # Database (Turso / SQLite / PostgreSQL)
   DATABASE_URL=
   TURSO_AUTH_TOKEN=

   # Authentication
   AUTH_SECRET=

   # Cloudinary (For image management)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=

   # Default Admin Setup (Optional)
   ADMIN_EMAIL=admin@funtripbali.com
   ADMIN_PASSWORD=admin123
   ```
4. Run database migrations and seed the data:
   ```bash
   npm run db:push
   npx tsx prisma/seed.ts
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000` in your browser.

## Admin Dashboard Access
To access the control panel (admin dashboard), go to the `/admin/login` page and use the credentials filled in during _seeding_:
- **Email**: `admin@funtripbali.com` (Or the email defined in `.env`)
- **Password**: `admin123` (Or the password defined in `.env`)
