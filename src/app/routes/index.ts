import { Router } from 'express';
import { ProductRoutes } from '../modules/product/product.routes';
import { SaleRoutes } from '../modules/sale/sale.route';

const router = Router();

const applicationRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/sales',
    route: SaleRoutes,
  },
];

applicationRoutes.forEach(route => router.use(route.path, route.route));

export default router;
