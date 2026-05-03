import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error('Error fetching bookings (using fallback):', error.message);
    return NextResponse.json([]); // Return empty list if DB is down
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const bookingData = await req.json();
    const { guest_name, guest_email, guest_phone, room_id, check_in, check_out } = bookingData;

    if (!guest_name || !guest_email || !room_id || !check_in || !check_out) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      );
    }

    const newBooking = await Booking.create({
      guest_name,
      guest_email,
      guest_phone,
      room_id,
      check_in,
      check_out,
      status: 'pending'
    });

    // Send Confirmation Email to Guest
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Star Mens PG" <${process.env.EMAIL_FROM}>`,
        to: guest_email,
        subject: 'Booking Received - Star Mens PG',
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #00B5EF;">Booking Received!</h2>
            <p>Hi ${guest_name},</p>
            <p>Thank you for choosing Star Mens PG. We have received your booking request for the following dates:</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Check-in:</strong> ${check_in}</p>
              <p><strong>Check-out:</strong> ${check_out}</p>
            </div>
            <p>Our team will verify the availability and send you a confirmation email shortly.</p>
            <p>See you soon!</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">Star Mens PG Admin Team</p>
          </div>
        `,
      });

      // Send Notification Email to Admin
      await transporter.sendMail({
        from: `"Booking System" <${process.env.EMAIL_FROM}>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Booking Alert!',
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #00B5EF;">New Booking Request</h2>
            <p>A new booking has been submitted:</p>
            <ul>
              <li><strong>Guest:</strong> ${guest_name}</li>
              <li><strong>Email:</strong> ${guest_email}</li>
              <li><strong>Dates:</strong> ${check_in} to ${check_out}</li>
            </ul>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/bookings" style="background: #00B5EF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Manage Booking</a></p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error('Mail sending failed:', mailError);
      // We don't fail the booking if email fails
    }

    return NextResponse.json(
      { message: 'Booking submitted successfully', booking: newBooking },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking', details: error.message },
      { status: 500 }
    );
  }
}
