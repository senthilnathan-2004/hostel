import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';

export async function GET(
  request: Request,
  context: { params: any }
) {
  try {
    await connectDB();
    const params = await context.params;
    const roomId = params.roomId;
    
    const reviews = await Review.find({ room_id: roomId }).sort({ createdAt: -1 });
    
    // Calculate stats
    const total = reviews.length;
    const average = total > 0 
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1) 
      : 0;

    return NextResponse.json({ reviews, stats: { total, average } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  context: { params: any }
) {
  try {
    await connectDB();
    const params = await context.params;
    const roomId = params.roomId;
    const { guest_name, rating, comment } = await request.json();

    if (!guest_name || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const review = await Review.create({
      room_id: roomId,
      guest_name,
      rating,
      comment
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
