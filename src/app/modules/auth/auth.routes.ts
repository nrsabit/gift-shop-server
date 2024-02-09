import { Router } from 'express';
import requestValidator from '../../middlewares/requestValidator';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post(
  '/register',
  requestValidator(AuthValidations.createUserValidation),
  AuthControllers.registerController,
);

router.post(
  '/login',
  requestValidator(AuthValidations.loginValidation),
  AuthControllers.loginController,
);

export const AuthRoutes = router;
