import { Cart } from "./cart";
import { Order } from "./order";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  version: number;
  cart?: Cart;
  orders: Order[];
}
