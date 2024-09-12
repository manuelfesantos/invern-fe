import { backendClient } from "@/service/backend-client";

const productsEndpoint = "products";

const productsClient = {
  get: (
    params?: { productId?: string },
    queryParams?: Record<string, string>,
  ) => backendClient.get(productsEndpoint, params, queryParams),
};

export const getProductsBySearch = async (search: string) => {
  const client = productsClient.get(undefined, { search });
  const headers = {};
  return await client(headers);
};
