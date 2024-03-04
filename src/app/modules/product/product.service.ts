import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from './product.constant';
import { TCoupon, TProduct } from './product.interface';
import { CouponModel, ProductModel } from './product.model';

// creating a new product
const createProductService = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

// retreiving all products with filter and search
const getAllProductsService = async (query: Record<string, unknown>) => {
  const productsQuery = new QueryBuilder(ProductModel.find(), query)
    .search(ProductSearchableFields)
    .filter();

  const result = await productsQuery.modelQuery;
  return result;
};

// getting a single product
const getSingleProductService = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

// updating single product
const updateProductService = async (id: string, payload: Partial<TProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload);
  return result;
};

// deleting a single product
const deleteProductService = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

// deleting a list of products
const deleteSelectedProductService = async (ids: string[]) => {
  const result = await ProductModel.deleteMany({ _id: { $in: ids } });
  return result;
};

// creating a new coupon
const createCouponService = async (payload: TCoupon) => {
  const result = await CouponModel.create(payload);
  return result;
};

export const ProductServices = {
  createProductService,
  createCouponService,
  getAllProductsService,
  updateProductService,
  deleteProductService,
  getSingleProductService,
  deleteSelectedProductService,
};
