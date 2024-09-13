import { ICollectionDetails, ICollection } from "@/types/store/collection";
import { IProductDetails, IProduct } from "@/types/store/product";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_HOST || "https://preview-api.invernspirit.com";
export async function getCollections(): Promise<ICollection[]> {
  const collectionsPromise = await fetch(`${BASE_URL}/collections`, {
    headers: {
      "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0.access",
      "CF-Access-Client-Secret":
        "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
    },
  });

  console.log("getting collections from", BASE_URL);

  return (await collectionsPromise.json()).data;
}

export async function getProducts(): Promise<IProduct[]> {
  const productsPromise = await fetch(`${BASE_URL}/products`, {
    headers: {
      "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0.access",
      "CF-Access-Client-Secret":
        "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
    },
  });

  return (await productsPromise.json()).data;
}

export async function getCollectionById(
  id: string,
): Promise<ICollectionDetails> {
  const collectionPromise = await fetch(`${BASE_URL}/collections/${id}`, {
    headers: {
      "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0.access",
      "CF-Access-Client-Secret":
        "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
    },
  });

  return (await collectionPromise.json()).data;
}

export async function getProductById(id: string): Promise<IProductDetails> {
  const productPromise = await fetch(`${BASE_URL}/products/${id}`, {
    headers: {
      "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0.access",
      "CF-Access-Client-Secret":
        "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
    },
  });

  return (await productPromise.json()).data;
}
