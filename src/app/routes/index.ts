import { Router } from 'express';
import { ProductRoutes } from '../modules/product/product.routes';

const router = Router();

const applicationRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
];

applicationRoutes.forEach(route => router.use(route.path, route.route));

export default router;
