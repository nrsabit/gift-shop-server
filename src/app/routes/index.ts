import { Router } from 'express';

const router = Router();

const applicationRoutes = [
  {
    path: '/products',
    route: '',
  },
  {
    path: '/sales',
    route: '',
  },
  {
    path: '/auth',
    route: '',
  },
];

applicationRoutes.forEach(route => router.use(route.path, route.route));

export default router;
