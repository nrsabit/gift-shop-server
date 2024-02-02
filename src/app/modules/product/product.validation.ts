import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    productName: z.string(),
    productPrice: z.number(),
    productQuantity: z.number(),
    occation: z.string(),
    category: z.string(),
    theme: z.string(),
    brand: z.string(),
    material: z.string(),
    color: z.string(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    productName: z.string().optional(),
    productPrice: z.number().optional(),
    productQuantity: z.number().optional(),
    occation: z.string().optional(),
    category: z.string().optional(),
    theme: z.string().optional(),
    brand: z.string().optional(),
    material: z.string().optional(),
    color: z.string().optional(),
  }),
});

export const productValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
