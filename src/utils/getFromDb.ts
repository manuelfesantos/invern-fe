import { ICollectionDetails, ICollection } from "@/types/store/collection";
import { IProductDetails, IProduct } from "@/types/store/product";

const BASE_URL = process.env.BACKEND_HOST;

const headers = {
  [`${process.env.BACKEND_ID_KEY}`]: `${process.env.BACKEND_ID_VALUE}`,
  [`${process.env.BACKEND_SECRET_KEY}`]: `${process.env.BACKEND_SECRET_VALUE}`,
};
export async function getCollections(): Promise<ICollection[]> {
  const collectionsPromise = await fetch(`${BASE_URL}/collections`, {
    headers,
  });

  return (await collectionsPromise.json()).data;
}

export async function getProducts(): Promise<IProduct[]> {
  const productsPromise = await fetch(`${BASE_URL}/products`, {
    headers,
  });

  return (await productsPromise.json()).data;
}

export async function getCollectionById(
  id: string,
): Promise<ICollectionDetails> {
  const collectionPromise = await fetch(`${BASE_URL}/collections/${id}`, {
    headers,
  });

  return (await collectionPromise.json()).data;
}

export async function getProductById(id: string): Promise<IProductDetails> {
  const productPromise = await fetch(`${BASE_URL}/products/${id}`, {
    headers,
  });

  return (await productPromise.json()).data;
}
