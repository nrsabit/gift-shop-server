import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductService = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductsService = async (query: Record<string, unknown>) => {
  const productsQuery = new QueryBuilder(ProductModel.find(), query)
    .search(ProductSearchableFields)
    .filter();

  const result = await productsQuery.modelQuery;
  return result;
};

const getSingleProductService = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const updateProductService = async (id: string, payload: Partial<TProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload);
  return result;
};

const deleteProductService = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

const deleteSelectedProductService = async (ids: string[]) => {
  const result = await ProductModel.deleteMany({ _id: { $in: ids } });
  return result;
};

export const ProductServices = {
  createProductService,
  getAllProductsService,
  updateProductService,
  deleteProductService,
  getSingleProductService,
  deleteSelectedProductService,
};
