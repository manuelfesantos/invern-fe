import { Image } from "./image";

export interface IProduct {
  productId: string;
  productName: string;
  priceInCents: number;
  stock: number;
  images: Image[];
}

export interface IProductDetails {
  productId: string;
  productName: string;
  priceInCents: number;
  stock: number;
  description: string;
  collectionId: string;
  images: Image[];
}

export interface ProductIdAndQuantity {
  productId: string;
  quantity: number;
}
