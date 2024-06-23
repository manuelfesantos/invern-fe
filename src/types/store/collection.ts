import { IProduct } from "@/types/store/product";
import { Image } from "./image";

export interface ICollection {
  collectionId: string;
  collectionName: string;
  images: Image
}

export interface ICollectionDetails {
  collectionId: number;
  collectionName: string;
  description: string;
  products: IProduct[];
}