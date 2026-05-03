import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const AdminSchema: Schema = new Schema({
  name: { type: String, default: 'Super Admin' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
