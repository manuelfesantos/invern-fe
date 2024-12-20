import { Image } from "./image";

export interface IProduct {
  id: string;
  name: string;
  priceInCents: number;
  stock: number;
  images: Image[];
}

export interface IProductDetails {
  id: string;
  name: string;
  priceInCents: number;
  stock: number;
  description: string;
  collectionId: string;
  images: Image[];
}

export interface ProductIdAndQuantity {
  id: string;
  quantity: number;
}
