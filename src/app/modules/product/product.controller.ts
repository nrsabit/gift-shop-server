import requestHandler from '../../utils/requestHandler';
import responseHandler from '../../utils/responseHandler';
import { ProductServices } from './product.service';

const createProductcontroller = requestHandler(async (req, res) => {
  const result = await ProductServices.createProductService(req.body);
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Product is Created Successfully',
    data: result,
  });
});

const getAllProductsController = requestHandler(async (req, res) => {
  const result = await ProductServices.getAllProductsService(req.query);
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Products are Created Successfully',
    data: result,
  });
});

const getSingleProductController = requestHandler(async (req, res) => {
  const id = req.params.id;
  const result = await ProductServices.getSingleProductService(id);
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Products is Retrieved Successfully',
    data: result,
  });
});

const updateProductController = requestHandler(async (req, res) => {
  const id = req.params.id;
  const result = await ProductServices.updateProductService(id, req.body);
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Product is Updated Successfully',
    data: result,
  });
});

const deleteProductController = requestHandler(async (req, res) => {
  const id = req.params.id;
  const result = await ProductServices.deleteProductService(id);
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Product is Deleted Successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProductcontroller,
  getAllProductsController,
  updateProductController,
  deleteProductController,
  getSingleProductController,
};
