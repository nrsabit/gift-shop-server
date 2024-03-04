import { Router } from 'express';
import { ProductControllers } from './product.controller';
import requestValidator from '../../middlewares/requestValidator';
import { productValidations } from './product.validation';
import auth from '../../middlewares/auth';

const router = Router();

// getting all products
router.get(
  '/',
  auth('manager', 'seller'),
  ProductControllers.getAllProductsController,
);

// getting single product
router.get(
  '/:id',
  auth('manager', 'seller'),
  ProductControllers.getSingleProductController,
);

// creating a new product
router.post(
  '/create-product',
  auth('manager'),
  requestValidator(productValidations.createProductValidationSchema),
  ProductControllers.createProductcontroller,
);

// creating a new coupon
router.post(
  '/create-coupon',
  auth('manager'),
  requestValidator(productValidations.createCouponValidationSchema),
  ProductControllers.createCouponController,
);

// deleting a list of products
router.delete(
  '/bulk-delete',
  auth('manager'),
  ProductControllers.deleteSelectedProductController,
);

// deleting a product
router.delete('/:id', auth(), ProductControllers.deleteProductController);

// updating a product
router.patch(
  '/:id',
  auth('manager'),
  requestValidator(productValidations.updateProductValidationSchema),
  ProductControllers.updateProductController,
);

export const ProductRoutes = router;
