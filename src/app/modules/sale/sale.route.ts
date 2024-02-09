import { Router } from 'express';
import { SaleControllers } from './sale.controller';
import requestValidator from '../../middlewares/requestValidator';
import { SaleValidations } from './sale.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/:period', auth(), SaleControllers.saleHistoryController);

router.post(
  '/',
  auth(),
  requestValidator(SaleValidations.createSaleValidationSchema),
  SaleControllers.createProductcontroller,
);

export const SaleRoutes = router;
