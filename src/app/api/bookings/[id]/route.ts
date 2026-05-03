import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function PUT(
  request: Request,
  context: { params: any }
) {
  try {
    await connectDB();
    const params = await context.params;
    const id = params.id;
    const body = await request.json();
    
    const booking = await Booking.findByIdAndUpdate(id, body, { new: true });
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    return NextResponse.json(booking);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: any }
) {
  try {
    await connectDB();
    const params = await context.params;
    const id = params.id;
    
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    return NextResponse.json({ message: 'Booking deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
