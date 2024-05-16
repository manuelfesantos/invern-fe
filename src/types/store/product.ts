import { Image } from "./image";

export interface IProduct {
    productId: string;
    productName: string;
    price: number;
    stock: number;
    productImage: Image
}

export interface IProductDetails {
    productId: string;
    productName: string;
    price: number;
    stock: number;
    description: string;
    collectionName: string;
    productImages: Image[]
}
//size missing