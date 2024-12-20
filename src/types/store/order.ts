import { IProduct } from "@/types/store/product";
import { Payment } from "@/types/store/payment";
import { Address } from "@/types/store/address";

export interface Order {
  id?: string;
  clientId: string;
  createdAt: string;
  snapshot: string;
  products: IProduct[];
  payment: Payment;
  address: Address;
}
