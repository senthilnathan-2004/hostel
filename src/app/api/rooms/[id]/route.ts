import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Room from '@/models/Room';

export async function GET(
  request: Request,
  context: { params: any }
) {
  try {
    await connectDB();
    const params = await context.params;
    const id = params.id;
    
    if (id.startsWith('mock-')) {
      return NextResponse.json({ error: 'Mock data cannot be retrieved from DB' }, { status: 400 });
    }

    const room = await Room.findById(id);
    if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    return NextResponse.json(room);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: any }
) {
  try {
    await connectDB();
    const params = await context.params;
    const id = params.id;
    
    if (id.startsWith('mock-')) {
      return NextResponse.json({ 
        error: 'This is sample data. Please create a "New Room" to edit and manage it.' 
      }, { status: 400 });
    }

    const body = await request.json();
    const room = await Room.findByIdAndUpdate(id, body, { new: true });
    if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    return NextResponse.json(room);
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
    
    if (id.startsWith('mock-')) {
      return NextResponse.json({ 
        error: 'Sample data cannot be deleted. It will disappear once you add your first real room.' 
      }, { status: 400 });
    }

    const room = await Room.findByIdAndDelete(id);
    if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    return NextResponse.json({ message: 'Room deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
