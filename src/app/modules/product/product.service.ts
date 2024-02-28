import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductService = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductsService = async (query: Record<string, unknown>) => {
  const {
    minPrice,
    maxPrice,
    occasion,
    category,
    name,
    brand,
    color,
    material,
  } = query;

  const matchQueries: Record<string, unknown> = {};
  if (occasion) {
    matchQueries.occasion = { $regex: occasion, $options: 'i' };
  }
  if (category) {
    matchQueries.category = { $regex: category, $options: 'i' };
  }
  if (name) {
    matchQueries.productName = { $regex: name, $options: 'i' };
  }
  if (brand) {
    matchQueries.brand = { $regex: brand, $options: 'i' };
  }
  if (color) {
    matchQueries.color = { $regex: color, $options: 'i' };
  }
  if (material) {
    matchQueries.material = { $regex: material, $options: 'i' };
  }
  if (minPrice || maxPrice) {
    const productPrice: Record<string, unknown> = {};
    if (minPrice) {
      productPrice.$gte = Number(minPrice);
    }
    if (maxPrice) {
      productPrice.$lte = Number(maxPrice);
    }
    matchQueries.productPrice = productPrice;
  }
  matchQueries.productQuantity = { $gt: 0 };

  const result = await ProductModel.find(matchQueries);
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
