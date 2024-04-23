import { IProduct } from "@/types/store/product";

export interface Cart {
  id: number;
  totalPrice: number;
  totalQuantity: number;
  items: CartItem[];
}

export interface CartItem {
  id: number;
  quantity: number;
  price: number;
  product: IProduct;
}