import { backendClient } from "@/service/backend-client";
import { ProductIdAndQuantity } from "@/types/store/product";
import { Cart } from "@/types/store/cart";

const cartsEndpoint = "cart";

const cartsClient = {
  post: () => backendClient.post(cartsEndpoint),
};

type CartClientFunction<T, K> = (
  data: T,
) => Promise<[string | undefined, K | undefined]>;

export const mergeCart: CartClientFunction<ProductIdAndQuantity[], {}> = async (
  data,
) => {
  const client = cartsClient.post();
  const headers = { action: "merge" };
  return await client({ products: data }, headers);
};

export const addToCart: CartClientFunction<ProductIdAndQuantity, {}> = async (
  data,
) => {
  const client = cartsClient.post();
  const headers = { action: "add" };
  return await client(data, headers);
};

export const removeFromCart: CartClientFunction<
  ProductIdAndQuantity,
  {}
> = async (data) => {
  const client = cartsClient.post();
  const headers = { action: "remove" };
  return await client(data, headers);
};

export const getCart: CartClientFunction<
  ProductIdAndQuantity[],
  { cart: Cart }
> = async (data) => {
  const client = cartsClient.post();
  const headers = { action: "get" };
  return await client(data, headers);
};
