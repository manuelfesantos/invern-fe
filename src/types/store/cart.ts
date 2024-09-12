import { IProduct, IProductDetails } from "@/types/store/product";

export interface Cart {
  products: CartItem[];
}

export type CartItem = IProduct & {
  quantity: number;
};

export const emptyCart = {
  products: [],
};
