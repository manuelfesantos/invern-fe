import { ICollectionDetails, ICollection } from "@/types/store/collection";
import { IProductDetails, IProduct } from "@/types/store/product";
import axios from "axios";

export async function getCollections(): Promise<ICollection[]> {
    return (await axios.get('https://preview.invern-be.pages.dev/collections', {
        headers: {
            'CF-Access-Client-Id': '9a316892e7496497c4d7ac97e20a05c0.access',
            'CF-Access-Client-Secret': 'a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9'
        }
    })).data.data
}

export async function getProducts():Promise<IProduct[]> {
    return (await axios.get('https://preview.invern-be.pages.dev/products', {
        headers: {
            'CF-Access-Client-Id': '9a316892e7496497c4d7ac97e20a05c0.access',
            'CF-Access-Client-Secret': 'a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9'
        }
    })).data.data
}

export async function getCollectionById(id: string): Promise<ICollectionDetails> {
    return (await axios.get(`https://preview.invern-be.pages.dev/collections/${id}`, {
        headers: {
            'CF-Access-Client-Id': '9a316892e7496497c4d7ac97e20a05c0.access',
            'CF-Access-Client-Secret': 'a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9'
        }
    })).data.data
}

export async function getProductById(id:string):Promise<IProductDetails> {
    return (await axios.get(`https://preview.invern-be.pages.dev/products/${id}`, {
        headers: {
            'CF-Access-Client-Id': '9a316892e7496497c4d7ac97e20a05c0.access',
            'CF-Access-Client-Secret': 'a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9'
        }
    })).data.data
}
