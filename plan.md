Berikut adalah dokumen Product Requirements Document (PRD) lengkap dan *production-ready* yang sudah diperbarui dengan arsitektur **Next.js Fullstack, Turso (SQLite), Cloudinary, dan YouTube Embed**. 

Kamu bisa langsung *copy-paste* teks di bawah ini ke dalam file `dokumen.md` di dalam *repository* proyek `antigravity` milikmu.

---

# 📄 PRODUCT REQUIREMENTS DOCUMENT (PRD)
**Project:** Tour & Activity Platform (MVP)  
**Architecture:** Next.js Fullstack Modular  

## 1. 🛠️ TECH STACK
* **Framework:** Next.js (App Router)
* **Frontend:** React, Tailwind CSS, shadcn/ui (opsional untuk UI base)
* **Database:** Turso (Edge SQLite)
* **ORM:** Prisma (dengan `@prisma/adapter-libsql`)
* **Authentication:** NextAuth.js / Auth.js (Credentials/JWT untuk Admin)
* **Validation:** Zod
* **Media Storage (Images):** Cloudinary
* **Video Hosting:** YouTube (Embed)

## 2. 🎯 SCOPE PRODUK
Website katalog *Tour & Activity* dengan fokus pada konversi melalui *inquiry* langsung (WhatsApp/Email).

**Termasuk (In-Scope):**
* Katalog *activity* dengan detail lengkap (Itinerary, Include/Exclude, Harga, Video, Gallery).
* Form *inquiry* & *redirect* WhatsApp dengan *pre-filled text*.
* Admin dashboard untuk CRUD data *activity*, manajemen gambar, dan pengaturan web.

**Tidak Termasuk (Out-of-Scope):**
* *Payment gateway* terintegrasi.
* Sistem *booking* *real-time* & kalender *availability*.
* Manajemen *inventory* kamar/villa.

## 3. 🏗️ ARSITEKTUR & STRUKTUR FOLDER
Sistem menggunakan **Layered Architecture** untuk memisahkan UI, *routing*, *business logic*, dan *database access*.

### 3.1. Alur Data (Data Flow)
`Client Request` ➡️ `app/api/.../route.ts` (Extract Payload) ➡️ `validations/*.ts` (Zod) ➡️ `services/*.ts` (Business Logic) ➡️ `repositories/*.ts` (Prisma DB Access) ➡️ `Response`

### 3.2. Struktur Folder
```text
src/
├── app/                  
│   ├── (public)/         # UI: Homepage, /activities, /activities/[slug]
│   ├── (admin)/          # UI: Dashboard admin & autentikasi
│   └── api/              # Backend: Next.js Route Handlers
├── components/           
│   ├── ui/               # Base reusable components (Button, Input, Card)
│   └── shared/           # Complex components (Navbar, Footer, ActivityCard)
├── lib/                  
│   ├── prisma.ts         # Singleton Prisma client + Turso adapter
│   └── utils.ts          # Helper (Tailwind merge, currency formatter)
├── repositories/         # Layer Akses DB (Hanya query Prisma)
│   ├── activity.repo.ts
│   └── inquiry.repo.ts
├── services/             # Layer Business Logic
│   ├── activity.service.ts
│   └── media.service.ts
└── validations/          # Layer Validasi Data (Zod Schema)
    ├── activity.schema.ts
    └── auth.schema.ts
```

## 4. 🧠 DATABASE DESIGN (PRISMA SCHEMA)
*Catatan: Menggunakan SQLite (Turso), sehingga tipe data `Decimal` diganti `Int` dan `Enum` diganti `String`.*

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Category {
  id         String     @id @default(cuid())
  name       String
  slug       String     @unique
  activities Activity[]
  createdAt  DateTime   @default(now())
}

model Activity {
  id               String   @id @default(cuid())
  name             String
  slug             String   @unique
  categoryId       String
  category         Category @relation(fields: [categoryId], references: [id])
  
  price            Int      // Disimpan dalam nilai integer terkecil (Rupiah utuh)
  duration         String
  shortDescription String
  description      String
  status           String   @default("DRAFT") // DRAFT, PUBLISHED, ARCHIVED
  youtubeVideoId   String?  // Hanya menyimpan ID, misal: "dQw4w9WgXcQ"
  
  images           ActivityImage[]
  itineraries      ActivityItinerary[]
  includes         ActivityInclude[]
  excludes         ActivityExclude[]
  inquiries        Inquiry[]
  
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model ActivityImage {
  id         String   @id @default(cuid())
  activityId String
  activity   Activity @relation(fields: [activityId], references: [id], onDelete: Cascade)
  
  publicId   String   // ID Cloudinary (wajib untuk hapus gambar nanti)
  imageUrl   String   // Cloudinary secure_url
  isPrimary  Boolean  @default(false)
  createdAt  DateTime @default(now())
}

model ActivityItinerary {
  id          String   @id @default(cuid())
  activityId  String
  activity    Activity @relation(fields: [activityId], references: [id], onDelete: Cascade)
  stepOrder   Int
  title       String
  description String
}

model ActivityInclude {
  id         String   @id @default(cuid())
  activityId String
  activity   Activity @relation(fields: [activityId], references: [id], onDelete: Cascade)
  item       String
}

model ActivityExclude {
  id         String   @id @default(cuid())
  activityId String
  activity   Activity @relation(fields: [activityId], references: [id], onDelete: Cascade)
  item       String
}

model Inquiry {
  id         String    @id @default(cuid())
  name       String
  email      String?
  phone      String
  message    String
  activityId String?
  activity   Activity? @relation(fields: [activityId], references: [id], onDelete: SetNull)
  status     String    @default("NEW") // NEW, READ, REPLIED
  createdAt  DateTime  @default(now())
}

// Untuk menyimpan pengaturan dinamis seperti Nomor WA Admin, Link Socmed, dll
model Setting {
  id        String   @id @default(cuid())
  key       String   @unique // contoh: "WHATSAPP_NUMBER", "SITE_TITLE"
  value     String   @db.Text
  updatedAt DateTime @updatedAt
}

// Opsional: Untuk Content Marketing & SEO
model BlogPost {
  id               String   @id @default(cuid())
  title            String
  slug             String   @unique
  content          String   @db.Text // Bisa simpan HTML/Markdown
  thumbnailPublicId String?  // Cloudinary Public ID
  thumbnailUrl     String?  // Cloudinary URL
  metaTitle        String?
  metaDescription  String?
  status           String   @default("DRAFT") // DRAFT, PUBLISHED
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
```

## 5. 🌐 ALUR FITUR & API DESIGN

### 5.1. Public User Flow
* **Homepage & Catalog:** User membuka web. Frontend memanggil `/api/activities?status=PUBLISHED` (menggunakan Next.js *fetch* dengan ISR/revalidation untuk optimasi SEO).
* **Activity Detail:** Menampilkan UI berdasarkan `/api/activities/[slug]`. 
    * Jika ada video: render `react-lite-youtube-embed` menggunakan `youtubeVideoId`.
    * Gambar di-render dengan komponen Next/Image menggunakan *loader* Cloudinary (opsional) atau langsung dari `imageUrl`.
* **Inquiry:** User submit form ➡️ `POST /api/inquiries`. Backend validasi (Zod), simpan ke Turso, return success.

### 5.2. Admin Flow & Media Management
* **Autentikasi:** Melalui `NextAuth.js`. Rute `/admin/*` dilindungi oleh *middleware*.
* **Alur Upload Gambar (Cloudinary Direct Upload):**
    1. Admin pilih gambar di UI.
    2. UI *request* *signature* rahasia ke `GET /api/admin/upload-signature`.
    3. UI *upload* langsung ke server Cloudinary menggunakan *signature* (menghemat beban server *app*).
    4. Cloudinary mengembalikan `secure_url` dan `public_id`.
    5. UI mengirim data *activity* berserta data gambar ke `POST /api/admin/activities`.
* **Alur Input Video:** Admin paste URL lengkap YouTube. Backend/Zod bertugas mengekstrak ID videonya saja sebelum masuk ke DB.
* **Hapus Data:** Jika admin menghapus activity (`DELETE /api/admin/activities/[id]`), *service layer* akan:
    1. Ambil semua `publicId` gambar dari DB.
    2. Panggil API Cloudinary untuk menghapus fisik gambar.
    3. Hapus row di database (relasi *Cascade* otomatis membersihkan *itinerary*, dll).

## 6. 🛡️ STANDAR PENGEMBANGAN (CORE RULES)
1.  **Tanpa God File:** Pecah logika di *route handler* ke *services* masing-masing. *Route handler* HANYA bertugas menerima *request*, memanggil *service*, dan memformat *response*.
2.  **Validasi Ketat:** Tidak ada input (query param, body, params) yang masuk ke *service* tanpa melewati validasi Zod.
3.  **Optimalisasi Database:** Saat GET detail *activity*, pastikan menggunakan relasi `include` pada Prisma agar tidak terjadi `N+1 Problem`.
4.  **Error Handling Sentral:** Gunakan blok `try/catch` pada *route handler* dan kembalikan struktur respons error yang konsisten (misal: `{ success: false, message: "...", error: ... }`).

## 7. 📜 STANDAR API RESPONSE (CONTRACT)
Semua *Route Handlers* (`app/api/*`) WAJIB mengembalikan format JSON yang seragam. Jangan pernah me-*return* array secara langsung.

**7.1. Success Response (200, 201)**
```json
{
  "success": true,
  "message": "Activity created successfully",
  "data": { ... }, 
  "meta": {            // Opsional, khusus untuk endpoint list/pagination
    "page": 1,
    "limit": 10,
    "total": 45
  }
}
```

**7.2. Error Response (400, 401, 403, 404, 500)**
```json
{
  "success": false,
  "message": "Validation Error", // Pesan error general
  "error": {                     // Detail error (contoh dari Zod)
    "price": ["Expected number, received string"],
    "slug": ["Slug already exists"]
  }
}
```

# Database (Turso)
DATABASE_URL="libsql://[NAMA-DB]-[USERNAME].turso.io"
TURSO_AUTH_TOKEN="your_turso_secret_token"

# Autentikasi (NextAuth)
NEXTAUTH_URL="http://localhost:3000" # Ganti dengan URL production saat deploy
NEXTAUTH_SECRET="generate_random_string_using_openssl"

# Admin Credentials (Hardcoded untuk MVP / Bisa pakai tabel DB terpisah)
ADMIN_EMAIL="admin@antigravity.com"
ADMIN_PASSWORD="hashed_password_or_strong_string"

# Cloudinary (Media Storage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# App Settings
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

SECURITY & PERFORMANCE (BEST PRACTICES)
Anti-Spam (Inquiry Form):

Wajib gunakan validasi Client-Side (Zod) sebelum data dikirim.

Implementasi Rate Limiting sederhana di Route Handler POST /api/inquiries (misal: batasi berdasarkan IP, max 5 request per menit) menggunakan Redis (Upstash) atau di level Middleware Vercel/Cloudflare jika memungkinkan.

Form Handling (Client): * Gunakan react-hook-form yang dipadukan dengan @hookform/resolvers/zod agar schema validasi Frontend dan Backend (API) menggunakan 1 sumber kebenaran (SOT) yang sama.

Caching Strategy (Next.js App Router):

Data Activity publik (katalog & detail) menggunakan force-static atau revalidate (ISR) setiap 60-3600 detik.

Setiap kali Admin melakukan Create/Update/Delete (CUD) Activity, panggil fungsi revalidatePath('/activities') dan revalidatePath('/activities/[slug]') agar cache publik langsung ter-refresh otomatis.