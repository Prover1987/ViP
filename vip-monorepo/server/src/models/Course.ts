import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Course = mongoose.model<ICourse>('Course', CourseSchema); 