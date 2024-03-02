/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { ProductModel } from '../product/product.model';
import { TSale } from './sale.interface';
import { SaleModel } from './sale.model';
import mongoose from 'mongoose';

const createSaleService = async (payload: TSale) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const product = await ProductModel.findById(payload.product);
    if (payload.quantity > product!.productQuantity) {
      throw new Error(`Only ${product?.productQuantity} Items Available..!!`);
    }

    // generate the price by quantity.
    const salePrice = product!.productPrice * payload.quantity;
    payload.salePrice = salePrice;

    // update the product quantity
    await ProductModel.findByIdAndUpdate(
      product?._id,
      {
        productQuantity: product!.productQuantity - payload.quantity,
      },
      { new: true, runValidators: true, session },
    );

    // create the new sale
    const result = await SaleModel.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getSaleHistory = async (period: string) => {
  let startDate: Date;
  let endDate: Date;

  const currentDate = moment();

  switch (period) {
    case 'daily':
      startDate = currentDate.clone().startOf('day').toDate();
      endDate = currentDate.clone().endOf('day').toDate();
      break;
    case 'weekly':
      startDate = currentDate.clone().startOf('week').toDate();
      endDate = currentDate.clone().endOf('week').toDate();
      break;
    case 'monthly':
      startDate = currentDate.clone().startOf('month').toDate();
      endDate = currentDate.clone().endOf('month').toDate();
      break;
    case 'yearly':
      startDate = currentDate.clone().startOf('year').toDate();
      endDate = currentDate.clone().endOf('year').toDate();
      break;
    default:
      throw new Error('Invalid Period');
  }

  // the pipeline to aggregate and retrieve the sale value.
  const aggregationPipeline = [
    { $match: { saleDate: { $gte: startDate, $lte: endDate } } },
    {
      $group: {
        _id: null,
        totalItemsSold: { $sum: '$quantity' },
        totalSaleValue: { $sum: '$salePrice' },
        sales: { $push: '$$ROOT' },
      },
    },
    { $unwind: '$sales' },
    { $sort: { 'sales.quantity': -1 } },
    { $limit: 5 },
    {
      $group: {
        _id: null,
        totalItemsSold: { $first: '$totalItemsSold' },
        totalSaleValue: { $first: '$totalSaleValue' },
        soldItemsSorted: { $push: '$sales' },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'soldItemsSorted.product',
        foreignField: '_id',
        as: 'populatedProducts',
      },
    },
  ] as any[];

  const salesByPeriod = await SaleModel.aggregate(aggregationPipeline);

  const totalItemsSold = salesByPeriod[0]?.totalItemsSold || 0;
  const totalSaleValue = salesByPeriod[0]?.totalSaleValue || 0;
  const soldItemsSorted = salesByPeriod[0]?.soldItemsSorted || [];

  const result = { totalItemsSold, totalSaleValue, soldItemsSorted };
  return result;
};

export const SaleServices = {
  createSaleService,
  getSaleHistory,
};
