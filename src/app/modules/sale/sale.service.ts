/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { ProductModel } from '../product/product.model';
import { TSale } from './sale.interface';
import { SaleModel } from './sale.model';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { saleSearchableFields } from './sale.constant';

// get all sales.
const getAllSalesService = async (query: Record<string, unknown>) => {
  const salesQuery = new QueryBuilder(
    SaleModel.find().populate('seller'),
    query,
  ).search(saleSearchableFields);

  const result = await salesQuery.modelQuery;
  return result;
};

// selling an item
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

    // apply discount if available.
    if (payload.discountPercentage) {
      payload.salePrice =
        payload.salePrice -
        (payload.salePrice * payload.discountPercentage) / 100;

      delete payload.discountPercentage;
    }

    // update the product quantity
    await ProductModel.findByIdAndUpdate(
      product?._id,
      {
        $set: {
          productQuantity: product!.productQuantity - payload.quantity,
        },
        $addToSet: {
          recipients: payload.buyerName,
        },
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

// getting sales history based on period
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
  getAllSalesService,
};
