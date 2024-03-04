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

const deleteSelectedProductController = requestHandler(async (req, res) => {
  const result = await ProductServices.deleteSelectedProductService(req.body);
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Products are Deleted Successfully',
    data: result,
  });
});

const createCouponController = requestHandler(async (req, res) => {
  const result = await ProductServices.createCouponService(req.body);
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Coupon is Created Successfully',
    data: result,
  });
});

const verifyCouponController = requestHandler(async (req, res) => {
  const result = await ProductServices.verifyCouponService(req?.body?.code);
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Coupon is Matched Successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProductcontroller,
  createCouponController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
  getSingleProductController,
  verifyCouponController,
  deleteSelectedProductController,
};
