import { Types } from 'mongoose';

export type TSale = {
  product: Types.ObjectId;
  quantity: number;
  salePrice: number;
  buyerName: string;
};
