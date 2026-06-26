import mongoose, { Schema, Document } from 'mongoose';

export interface IReview {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: 'Men' | 'Women' | 'Accessories' | 'Sale';
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  reviews: IReview[];
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Accessories', 'Sale']
  },
  images: [{ type: String, required: true }],
  sizes: [{ type: String }],
  colors: [{ type: String }],
  stock: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: [ReviewSchema]
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
