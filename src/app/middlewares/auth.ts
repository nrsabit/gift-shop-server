import { NextFunction, Request, Response } from 'express';
import requestHandler from '../utils/requestHandler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { UserModel } from '../modules/auth/auth.model';
import { TUserRoles } from '../modules/auth/auth.constant';

const auth = (...roles: TUserRoles[]) => {
  return requestHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // check if the token received or not.
      const token = req.headers.authorization;
      if (!token) {
        throw new Error('Unauthorized Access');
      }

      // varify the token
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      if (!decoded) {
        throw new Error('Unauthorized Access');
      }

      const { _id, role } = decoded;
      // check if the user is exists or not.
      const user = await UserModel.findById(_id);
      if (!user) {
        throw new Error('Unauthorized Access');
      }

      // check the role of the user.
      if (roles && !roles.includes(role)) {
        throw new Error('Unauthorized Access');
      }

      req.user = decoded as JwtPayload;
      next();
    },
  );
};

export default auth;
