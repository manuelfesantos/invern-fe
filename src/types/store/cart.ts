import { IProduct, IProductDetails } from "@/types/store/product";

export interface Cart {
  id: string;
  items: CartItem[];
}

export interface CartItem {
  id: string;
  quantity: number;
  price: number;
  product: IProduct;
}
