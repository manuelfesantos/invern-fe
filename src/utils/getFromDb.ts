import { ICollectionDetails, ICollection } from "@/types/store/collection";
import { IProductDetails, IProduct } from "@/types/store/product";

const envCredentialsMap = {
  local: {
    headers: {
      "CF-Access-Client-Id": "ac5ba45efda6100737a2436a86f2f06e.access",
      "CF-Access-Client-Secret":
        "2d8297f347997c6765d02d211e714d61fee75efab442baa088d7efff24a9a1d3",
    },
    host: "https://api-local.invernspirit.com",
  },
  preview: {
    headers: {
      "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0",
      "CF-Access-Client-Secret":
        "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
    },
    host: "https://preview-api.invernspirit.com",
  },
  production: {
    headers: {
      "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0",
      "CF-Access-Client-Secret":
        "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
    },
    host: "https://api.invernspirit.com",
  },
};

const getCredentials = (env?: string) => {
  const selectedEnv = Object.entries(envCredentialsMap).find(
    ([key]) => key === env,
  );

  if (!selectedEnv) {
    throw new Error("Invalid env: " + env);
  }

  return selectedEnv[1];
};

const BASE_URL =
  process.env.NEXT_PUBLIC_API_HOST || "https://preview-api.invernspirit.com";

const credentials = getCredentials(process.env.NEXT_PUBLIC_ENV);
export async function getCollections(): Promise<ICollection[]> {
  const collectionsPromise = await fetch(`${BASE_URL}/collections`, {
    headers: credentials.headers,
  });

  console.log("getting collections from", BASE_URL);

  return (await collectionsPromise.json()).data;
}

export async function getProducts(): Promise<IProduct[]> {
  const productsPromise = await fetch(`${BASE_URL}/products`, {
    headers: credentials.headers,
  });

  return (await productsPromise.json()).data;
}

export async function getCollectionById(
  id: string,
): Promise<ICollectionDetails> {
  const collectionPromise = await fetch(`${BASE_URL}/collections/${id}`, {
    headers: credentials.headers,
  });

  return (await collectionPromise.json()).data;
}

export async function getProductById(id: string): Promise<IProductDetails> {
  const productPromise = await fetch(`${BASE_URL}/products/${id}`, {
    headers: credentials.headers,
  });

  return (await productPromise.json()).data;
}
