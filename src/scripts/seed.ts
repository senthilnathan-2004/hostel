import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Room from '../models/Room';
import Gallery from '../models/Gallery';
import connectDB from '../lib/mongodb';

dotenv.config({ path: '.env' });

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected!');

    console.log('Cleaning collection...');
    await Room.deleteMany({});
    await Gallery.deleteMany({});

    console.log('Seeding data...');

    // Seed Rooms
    const rooms = await Room.insertMany([
      {
        name: 'Deluxe Private Suite',
        description: 'A premium suite for maximum comfort.',
        price: 1499,
        capacity: 2,
        type: 'Private',
        status: 'Available',
        amenities: ['AC', 'Wifi', 'Private Bath', 'TV'],
        images: ['/private-room.png']
      },
      {
        name: 'Mixed Social Dorm (6 Bed)',
        description: 'Perfect for travelers wanting to socialize.',
        price: 599,
        capacity: 6,
        type: 'Dorm',
        status: 'Available',
        amenities: ['Bunk Bed', 'Wifi', 'Locker', 'Reading Light'],
        images: ['/dorm-room.png']
      },
      {
        name: 'Female Only Dorm (4 Bed)',
        description: 'Safe and comfortable space for female travelers.',
        price: 649,
        capacity: 4,
        type: 'Dorm',
        status: 'Maintenance',
        amenities: ['Bunk Bed', 'Wifi', 'Locker', 'Mirror'],
        images: ['/dorm-room.png']
      }
    ]);

    console.log(`${rooms.length} rooms seeded`);

    // Seed Gallery
    const galleryItems = await Gallery.insertMany([
      { url: '/hero.png', category: 'Rooms', title: 'Deluxe Private' },
      { url: '/dorm-room.png', category: 'Common Area', title: 'Social Lounge' },
      { url: '/private-room.png', category: 'Rooms', title: 'Twin Private' },
    ]);

    console.log(`${galleryItems.length} gallery items seeded`);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
