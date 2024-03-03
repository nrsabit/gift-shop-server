import { Router } from 'express';
import { ProductControllers } from './product.controller';
import requestValidator from '../../middlewares/requestValidator';
import { productValidations } from './product.validation';
import auth from '../../middlewares/auth';

const router = Router();

// getting all products
router.get('/', auth(), ProductControllers.getAllProductsController);

// getting single product
router.get('/:id', auth(), ProductControllers.getSingleProductController);

// creating a new product
router.post(
  '/create-product',
  auth(),
  requestValidator(productValidations.createProductValidationSchema),
  ProductControllers.createProductcontroller,
);

// deleting a list of products
router.delete(
  '/bulk-delete',
  auth(),
  ProductControllers.deleteSelectedProductController,
);

// deleting a product
router.delete('/:id', auth(), ProductControllers.deleteProductController);

// updating a product
router.patch(
  '/:id',
  auth(),
  requestValidator(productValidations.updateProductValidationSchema),
  ProductControllers.updateProductController,
);

export const ProductRoutes = router;
