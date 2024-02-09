import { Router } from 'express';
import { ProductRoutes } from '../modules/product/product.routes';
import { SaleRoutes } from '../modules/sale/sale.route';
import { AuthRoutes } from '../modules/auth/auth.routes';

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
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

applicationRoutes.forEach(route => router.use(route.path, route.route));

export default router;
