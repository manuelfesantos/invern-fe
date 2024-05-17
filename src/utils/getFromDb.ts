import { ICollectionDetails, ICollection } from "@/types/store/collection";
import { IProductDetails, IProduct } from "@/types/store/product";
import axios from "axios";

export async function getCollections(): Promise<ICollection[]> {
    return (await axios.get('https://api-local.invernspirit.com/collections')).data.data
}

export async function getProducts():Promise<IProduct[]> {
    return (await axios.get('https://api-local.invernspirit.com/products')).data.data
  }

export async function getCollectionById(id: string): Promise<ICollectionDetails> {
    return (await axios.get(`https://api-local.invernspirit.com/collections/${id}`)).data.data
}

export async function getProductById(id:string):Promise<IProductDetails> {
    return (await axios.get(`https://api-local.invernspirit.com/products/${id}`)).data.data
}