import { backendClient } from "@/service/backend-client";
import { ProductIdAndQuantity } from "@/types/store/product";
import { handleError } from "@/utils/error";

const cartsEndpoint = "carts";

const cartsClient = {
  put: (params: { cartId?: string }, queryParams?: Record<string, string>) =>
    backendClient.put(cartsEndpoint, params, queryParams),
  get: (params: { cartId?: string }, queryParams?: Record<string, string>) =>
    backendClient.get(cartsEndpoint, params, queryParams),
};

export const mergeCart = async (
  cartId: string,
  products: ProductIdAndQuantity[],
) => {
  const client = cartsClient.put({ cartId });
  const headers = { action: "merge" };
  try {
    return await client({ products }, headers);
  } catch (error) {
    handleError(error);
  }
};

export const addToCart = async (
  cartId: string,
  product: ProductIdAndQuantity,
) => {
  const client = cartsClient.put({ cartId });
  const headers = { action: "add" };
  try {
    return await client(product, headers);
  } catch (error) {
    handleError(error);
  }
};

export const removeFromCart = async (
  cartId: string,
  product: ProductIdAndQuantity,
) => {
  const client = cartsClient.put({ cartId });
  const headers = { action: "remove" };
  try {
    return await client(product, headers);
  } catch (error) {
    handleError(error);
  }
};
