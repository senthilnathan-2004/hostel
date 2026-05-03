# Premium Hostel Management System

A high-converting, professional hostel booking platform built with **Next.js**, **MongoDB**, and **Tailwind CSS**. Designed for modern travelers with a "Real World" booking experience similar to Airbnb and Booking.com.

![Project Preview](public/hero.png)

## Key Features

### High-Converting Frontend
- **Real World Booking UI**: Sophisticated room detail pages with sticky booking widgets and price breakdowns.
- **Advanced Review System**: Live guest feedback system featuring star-rating distribution (percentage bars) and real-time average calculation.
- **Dynamic Hero Section**: High-impact landing page with a floating search/booking bar and luxury aesthetic.
- **Professional Gallery**: Fully integrated media gallery powered by ImageKit for ultra-fast loading.
- **Fully Responsive**: Optimized for seamless experiences on Mobile, Tablet, and Desktop.

### Robust Admin Dashboard
- **Room Management**: Add, edit, and delete rooms with multi-image upload support.
- **Booking Tracking**: Real-time management of guest reservations and status tracking.
- **Guest Inquiries**: Centralized system for managing contact form messages.
- **Site Settings**: Dynamic control over hero text, subtitles, and global offers without touching the code.
- **Secure Authentication**: JWT-based admin login with middleware-protected routes.

### Technical Stack
- **Framework**: Next.js 16+ (App Router)
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS 4.0 + Lucide Icons
- **Media**: ImageKit.io for optimized image delivery
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner toast notifications

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/senthilnathan-2004/hostel.git
cd hostel
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your credentials:
```env
# MongoDB
MONGODB_URI=your_mongodb_uri

# JWT
JWT_SECRET=your_jwt_secret

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_url_endpoint
IMAGEKIT_PRIVATE_KEY=your_private_key

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_password
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
```text
src/
├── app/          # App router (Pages and API Routes)
├── components/   # UI and Layout components
├── lib/          # Shared utilities and DB connection
├── models/       # Mongoose Schemas
├── scripts/      # Database seeding and utility scripts
└── types/        # TypeScript interfaces
```

## License
This project is licensed under the MIT License.

---
Built with by [Senthil Nathan](https://github.com/senthilnathan-2004)
