import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Room from '@/models/Room';

export async function GET() {
  try {
    await connectDB();
    const rooms = await Room.find().sort({ createdAt: -1 });
    // Removed mock fallback as per user request to start with real data
    return NextResponse.json(rooms);
  } catch (error: any) {
    console.error('Rooms API Error:', error.message);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const room = await Room.create(body);
    return NextResponse.json(room);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
