import { Types } from 'mongoose';

export type TSale = {
  product: Types.ObjectId;
  productName: string;
  quantity: number;
  salePrice?: number;
  buyerName: string;
  saleDate: Date;
  seller: Types.ObjectId;
  discountPercentage?: number;
};
