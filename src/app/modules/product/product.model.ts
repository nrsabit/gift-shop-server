import { Schema, model } from 'mongoose';
import { TCoupon, TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    productName: { type: String, required: true, trim: true },
    productPrice: { type: Number, required: true },
    productQuantity: { type: Number, required: true },
    occasion: { type: String, required: true },
    category: { type: String, required: true },
    theme: { type: String, required: true },
    brand: { type: String, required: true },
    material: { type: String, required: true },
    color: { type: String, required: true },
    recipients: { type: [String], default: [] },
  },
  { timestamps: true },
);

const couponSchema = new Schema<TCoupon>(
  {
    code: { type: String, required: true },
    percentage: { type: Number, required: true },
  },
  { timestamps: true },
);

export const ProductModel = model<TProduct>('Product', productSchema);

export const CouponModel = model<TCoupon>('Coupon', couponSchema);
