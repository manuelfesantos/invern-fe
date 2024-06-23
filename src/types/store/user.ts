import { Cart } from "./cart";
import { Order } from "./order";

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    version: number;
    cart: Cart;
    orders: Order[]
}