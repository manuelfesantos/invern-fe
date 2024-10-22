import { backendClient } from "@/service/backend-client";

const productsEndpoint = "products";

const productsClient = (
  params?: { productId?: string },
  queryParams?: Record<string, string>,
) => ({
  get: backendClient.get(productsEndpoint, params, queryParams),
});

export const getProductsBySearch = async (search: string) => {
  const client = productsClient(undefined, { search });
  const headers = {};
  return await client.get(headers);
};
