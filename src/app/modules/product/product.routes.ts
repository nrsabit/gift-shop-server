import { Router } from 'express';
import { ProductControllers } from './product.controller';
import requestValidator from '../../middlewares/requestValidator';
import { productValidations } from './product.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', auth(), ProductControllers.getAllProductsController);

router.get('/:id', auth(), ProductControllers.getSingleProductController);

router.post(
  '/',
  auth(),
  requestValidator(productValidations.createProductValidationSchema),
  ProductControllers.createProductcontroller,
);

router.delete('/:id', auth(), ProductControllers.deleteProductController);

router.delete(
  '/bulk-delete',
  auth(),
  ProductControllers.deleteSelectedProductController,
);

router.patch(
  '/:id',
  auth(),
  requestValidator(productValidations.updateProductValidationSchema),
  ProductControllers.updateProductController,
);

export const ProductRoutes = router;
