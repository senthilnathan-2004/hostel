import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  room_id: mongoose.Types.ObjectId;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: Date;
  check_out: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  total_amount: number;
  createdAt: Date;
}

const BookingSchema: Schema = new Schema({
  room_id: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  guest_name: { type: String, required: true },
  guest_email: { type: String, required: true },
  guest_phone: { type: String },
  check_in: { type: Date, required: true },
  check_out: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  total_amount: { type: Number },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
