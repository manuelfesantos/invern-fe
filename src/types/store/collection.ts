import { IProduct } from "@/types/store/product";
import { Image } from "./image";

export interface ICollection {
  id: string;
  name: string;
  image: Image;
}

export interface ICollectionDetails {
  id: number;
  name: string;
  description: string;
  products: IProduct[];
}
