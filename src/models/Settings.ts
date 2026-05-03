import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  // Hero & General
  heroTitle: string;
  heroSubtitle: string;
  offerText: string;
  
  // Quick Stats
  stats: {
    startingPrice: string;
    location: string;
    rating: string;
    community: string;
  };

  // Rooms Section Header
  roomsTitle: string;
  roomsSubtitle: string;

  // Amenities Section
  amenitiesTitle: string;
  amenities: {
    title: string;
    description: string;
    icon: string;
  }[];

  // Reviews
  reviewsTitle: string;
  reviews: {
    name: string;
    role: string;
    comment: string;
    avatar: string;
  }[];

  // Special Offer
  specialOfferTitle: string;
  specialOfferText: string;
  specialOfferCode: string;

  // About / Story
  storyTitle: string;
  storyHeading: string;
  storyDescription: string;
  storyBullets: string[];

  // Highlights
  highlightsTitle: string;
  highlightsHeading: string;
  highlights: {
    title: string;
    description: string;
  }[];

  // Contact
  contactEmail: string;
  contactPhone: string;
  address: string;
  mapUrl: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  
  gallery: string[];
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema({
  heroTitle: { type: String, default: 'Welcome to Star Mens PG' },
  heroSubtitle: { type: String, default: 'Your home away from home' },
  offerText: { type: String, default: 'Limited Offer: 10% Off on First Month!' },
  
  stats: {
    startingPrice: { type: String, default: '599' },
    location: { type: String, default: 'Downtown City' },
    rating: { type: String, default: '4.8' },
    community: { type: String, default: '500+' },
  },

  roomsTitle: { type: String, default: 'Choose Your Comfort' },
  roomsSubtitle: { type: String, default: 'Whether you want a private sanctuary or a social hub, we have the perfect space for you.' },

  amenitiesTitle: { type: String, default: 'Everything You Need' },
  amenities: [{
    title: String,
    description: String,
    icon: String,
  }],

  reviewsTitle: { type: String, default: 'Travelers Love Us' },
  reviews: [{
    name: String,
    role: String,
    comment: String,
    avatar: String,
  }],

  specialOfferTitle: { type: String, default: 'Special Offer: 20% Off for Long Stays!' },
  specialOfferText: { type: String, default: 'Book for 7 days or more and get an exclusive discount.' },
  specialOfferCode: { type: String, default: 'TRAVELER20' },

  storyTitle: { type: String, default: 'Our Story' },
  storyHeading: { type: String, default: 'More Than Just a Place to Sleep' },
  storyDescription: { type: String, default: 'HostelConnect was born in 2020 out of a passion for backpacking...' },
  storyBullets: { type: [String], default: [] },

  highlightsTitle: { type: String, default: 'Our Community' },
  highlightsHeading: { type: String, default: 'Hostel Highlights' },
  highlights: [{
    title: String,
    description: String,
  }],

  contactEmail: { type: String, default: 'hello@hostelconnect.com' },
  contactPhone: { type: String, default: '+91 98765 43210' },
  address: { type: String, default: '123 Travel Street, Backpackers District, City' },
  mapUrl: { type: String, default: '' },
  socialLinks: {
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
  },
  gallery: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
