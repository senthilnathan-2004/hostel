import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  room_id: mongoose.Types.ObjectId;
  guest_name: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  room_id: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  guest_name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
