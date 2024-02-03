import { z } from 'zod';

const createSaleValidationSchema = z.object({
  body: z.object({
    product: z.string(),
    quantity: z.number(),
  }),
});

export const SaleValidations = {
  createSaleValidationSchema,
};
