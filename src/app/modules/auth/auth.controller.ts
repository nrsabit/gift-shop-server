import requestHandler from '../../utils/requestHandler';
import responseHandler from '../../utils/responseHandler';
import { AuthServices } from './auth.service';

const registerController = requestHandler(async (req, res) => {
  const result = await AuthServices.register(req.body);
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Signed up Successfully',
    data: result,
  });
});

const loginController = requestHandler(async (req, res) => {
  const result = await AuthServices.login(req.body);
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Logged in Successfully',
    data: result,
  });
});

export const AuthControllers = {
  registerController,
  loginController,
};
