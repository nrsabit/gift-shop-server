import { z } from 'zod';

const createSaleValidationSchema = z.object({
  body: z.object({
    product: z.string(),
    productName: z.string(),
    quantity: z.number(),
    buyerName: z.string(),
    saleDate: z.string().datetime(),
    seller : z.string()
  }),
});

export const SaleValidations = {
  createSaleValidationSchema,
};
