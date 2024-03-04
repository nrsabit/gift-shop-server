export type TProduct = {
  productName: string;
  productPrice: number;
  productQuantity: number;
  occasion: string;
  category: string;
  theme: string;
  brand: string;
  material: string;
  color: string;
  recipients?: string[];
};

export type TCoupon = {
  code: string;
  percentage: number;
};
