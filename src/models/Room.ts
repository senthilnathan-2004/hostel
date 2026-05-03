import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
  type: 'Private' | 'Dorm';
  status: 'Available' | 'Maintenance' | 'Full';
  createdAt: Date;
}

const RoomSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  images: { type: [String], default: [] },
  type: { type: String, enum: ['Private', 'Dorm'], required: true },
  status: { type: String, enum: ['Available', 'Maintenance', 'Full'], default: 'Available' },
}, { timestamps: true });

export default mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);
