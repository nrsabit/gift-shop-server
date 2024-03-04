import { Router } from 'express';
import { SaleControllers } from './sale.controller';
import requestValidator from '../../middlewares/requestValidator';
import { SaleValidations } from './sale.validation';
import auth from '../../middlewares/auth';

const router = Router();

// getting all sales
router.get(
  '/',
  auth('manager', 'seller'),
  SaleControllers.getAllSalesController,
);

// getting the sales history based on period
router.get(
  '/:period',
  auth('manager', 'seller'),
  SaleControllers.saleHistoryController,
);

// selling an item.
router.post(
  '/',
  auth('manager', 'seller'),
  requestValidator(SaleValidations.createSaleValidationSchema),
  SaleControllers.createProductcontroller,
);

export const SaleRoutes = router;
