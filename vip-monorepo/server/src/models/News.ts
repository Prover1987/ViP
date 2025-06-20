import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

const NewsSchema = new Schema<INews>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const News = mongoose.model<INews>('News', NewsSchema); 