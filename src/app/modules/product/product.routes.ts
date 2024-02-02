import { Router } from 'express';
import { ProductControllers } from './product.controller';
import requestValidator from '../../middlewares/requestValidator';
import { productValidations } from './product.validation';

const router = Router();

router.get('/', ProductControllers.getAllProductsController);

router.get('/:id', ProductControllers.getSingleProductController);

router.post(
  '/',
  requestValidator(productValidations.createProductValidationSchema),
  ProductControllers.createProductcontroller,
);

router.delete('/:id', ProductControllers.deleteProductController);

router.patch(
  '/:id',
  requestValidator(productValidations.updateProductValidationSchema),
  ProductControllers.updateProductController,
);

export const ProductRoutes = router;
