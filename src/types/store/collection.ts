import { IProduct } from "@/types/store/product";
import { Image } from "./image";

export interface ICollection {
  collectionId: number;
  collectionName: string;
  collectionImage: Image
}

export interface ICollectionDetails {
  collectionId: number;
  collectionName: string;
  description: string;
  products: IProduct[];
}