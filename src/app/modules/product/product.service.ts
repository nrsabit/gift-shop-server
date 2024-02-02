import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductService = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductsService = async () => {
  const result = await ProductModel.find();
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

export const ProductServices = {
  createProductService,
  getAllProductsService,
  updateProductService,
  deleteProductService,
  getSingleProductService
};
