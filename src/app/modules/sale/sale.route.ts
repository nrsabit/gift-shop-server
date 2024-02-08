import { Router } from 'express';
import { SaleControllers } from './sale.controller';
import requestValidator from '../../middlewares/requestValidator';
import { SaleValidations } from './sale.validation';

const router = Router();

router.get('/:period', SaleControllers.saleHistoryController);

router.post(
  '/',
  requestValidator(SaleValidations.createSaleValidationSchema),
  SaleControllers.createProductcontroller,
);

export const SaleRoutes = router;
