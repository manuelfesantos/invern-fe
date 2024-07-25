import { IProduct, IProductDetails } from "@/types/store/product";

export interface Cart {
  cartId: string;
  products: CartItem[];
}

export type CartItem = IProduct & {
  quantity: number;
};
