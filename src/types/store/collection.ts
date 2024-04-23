import { IProduct } from "@/types/store/product";

export interface ICollection {
  id: number;
  name: string;
  description: string;
  products: IProduct[];
}