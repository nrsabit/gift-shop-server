import config from '../../config';
import { TLogin, TUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { UserModel } from './auth.model';
import jwt from 'jsonwebtoken';

const register = async (payload: TUser) => {
  const isUserExists = await UserModel.findOne({ userName: payload.userName });
  if (isUserExists) {
    throw new Error('User Already Exists');
  }

  // encrypt the password
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  payload.password = hashedPassword;

  const newUser = await UserModel.create(payload);
  const result = await UserModel.findById(newUser._id).select('-password');
  return result;
};

const login = async (payload: TLogin) => {
  // check the user is exists or not.
  const isUserExists = await UserModel.findOne({ email: payload.email });
  if (!isUserExists) {
    throw new Error('User Not Found');
  }

  // check the password matched or not.
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExists.password,
  );
  if (!isPasswordMatched) {
    throw new Error('Password did not match');
  }

  const { _id, userName, email } = isUserExists;
  const jwtPayload = {
    _id,
    userName,
    email,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });
  const user = await UserModel.findById(isUserExists._id).select('-password');

  return { user, token };
};

export const AuthServices = {
  register,
  login,
};
