import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  url: string;
  category: 'Rooms' | 'Common Area' | 'Events';
  title: string;
  createdAt: Date;
}

const GallerySchema: Schema = new Schema({
  url: { type: String, required: true },
  category: { type: String, enum: ['Rooms', 'Common Area', 'Events'], required: true },
  title: { type: String },
}, { timestamps: true });

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
