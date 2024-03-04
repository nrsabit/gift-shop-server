import { Schema, model } from 'mongoose';
import { TSale } from './sale.interface';

const saleSchema = new Schema<TSale>(
  {
    product: { type: Schema.Types.ObjectId, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    salePrice: { type: Number },
    buyerName: { type: String, required: true },
    saleDate: { type: Date, required: true },
    seller: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
);

export const SaleModel = model<TSale>('Sale', saleSchema);
