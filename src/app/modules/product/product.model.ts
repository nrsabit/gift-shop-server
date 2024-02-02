import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    productName: { type: String, required: true, trim: true },
    productPrice: { type: Number, required: true },
    productQuantity: { type: Number, required: true },
    occation: { type: String, required: true },
    category: { type: String, required: true },
    theme: { type: String, required: true },
    brand: { type: String, required: true },
    material: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true },
);

export const ProdectModel = model<TProduct>('Product', productSchema);
