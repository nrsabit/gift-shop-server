import { z } from 'zod';

const createUserValidation = z.object({
  body: z.object({
    userName: z.string(),
    email: z.string(),
    password: z.string(),
  }),
});

const loginValidation = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const AuthValidations = {
  createUserValidation,
  loginValidation,
};
