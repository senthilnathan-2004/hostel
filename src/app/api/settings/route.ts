import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';

// Fallback Mock Data for when DB is unreachable
const mockSettings = {
  heroTitle: 'Welcome to Star Mens PG',
  heroSubtitle: 'Your home away from home',
  offerText: 'Limited Offer: 10% Off on First Month!',
  stats: {
    startingPrice: '599',
    location: 'Downtown City',
    rating: '4.8',
    community: '500+',
  },
  roomsTitle: 'Choose Your Comfort',
  roomsSubtitle: 'Whether you want a private sanctuary or a social hub, we have the perfect space for you.',
  amenitiesTitle: 'Everything You Need',
  amenities: [
    { title: 'High-speed Wi-Fi', description: 'Seamless connectivity throughout the hostel.', icon: 'Wifi' },
    { title: 'Social Cafe', description: 'Fresh coffee and workspace for digital nomads.', icon: 'Coffee' },
    { title: 'Shared Kitchen', description: 'Fully equipped kitchen for your culinary experiments.', icon: 'Utensils' },
    { title: '24/7 Security', description: 'Lockers and round-the-clock surveillance for peace of mind.', icon: 'Shield' },
  ],
  reviewsTitle: 'Travelers Love Us',
  reviews: [
    { name: 'Sarah Jenkins', role: 'Solo Traveler', comment: 'The best hostel experience I have had!', avatar: '' },
    { name: 'Marco Rossi', role: 'Digital Nomad', comment: 'Perfect workspace and lightning-fast Wi-Fi.', avatar: '' },
  ],
  specialOfferTitle: 'Special Offer: 20% Off for Long Stays!',
  specialOfferText: 'Book for 7 days or more and get an exclusive discount.',
  specialOfferCode: 'TRAVELER20',
  storyTitle: 'Our Story',
  storyHeading: 'More Than Just a Place to Sleep',
  storyDescription: 'HostelConnect was born in 2020 out of a passion for backpacking...',
  storyBullets: ['Community-driven events', 'Eco-friendly', 'Safe environment'],
  highlightsTitle: 'Our Community',
  highlightsHeading: 'Hostel Highlights',
  highlights: [
    { title: 'Passionate Staff', description: 'Seasoned travelers at your service.' },
  ],
  contactEmail: 'hello@hostelconnect.com',
  contactPhone: '+91 98765 43210',
  address: '123 Travel Street, Backpackers District, City',
  socialLinks: {
    instagram: '',
    facebook: '',
    whatsapp: '',
  },
  gallery: [],
};

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(mockSettings);
    }
    return NextResponse.json(settings);
  } catch (error: any) {
    console.error('Settings API Error (using fallback):', error.message);
    // Return mock data instead of 500 error when DB is unreachable
    return NextResponse.json(mockSettings);
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create(body);
    } else {
      settings = await Settings.findOneAndUpdate({}, body, { new: true });
    }
    
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
