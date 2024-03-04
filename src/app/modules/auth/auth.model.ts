import { Schema, model } from 'mongoose';
import { TUser } from './auth.interface';

const userSchema = new Schema<TUser>(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const UserModel = model<TUser>('User', userSchema);
