import { backendClient } from "@/service/backend-client";
import { IProduct, ProductIdAndQuantity } from "@/types/store/product";
import { Cart, CartItem } from "@/types/store/cart";

const cartsEndpoint = "cart";

const cartsClient = () => ({
  post: backendClient.post(cartsEndpoint),
});

type CartClientFunction<T, K> = (
  data: T,
) => Promise<[string | undefined, K | undefined]>;

export const mergeCart: CartClientFunction<ProductIdAndQuantity[], {}> = async (
  data,
) => {
  const client = cartsClient();
  const headers = { action: "merge" };
  return await client.post({ products: data }, headers);
};

export const addToCart: CartClientFunction<ProductIdAndQuantity, {}> = async (
  data,
) => {
  const client = cartsClient();
  const headers = { action: "add" };
  return await client.post(data, headers);
};

export const removeFromCart: CartClientFunction<
  ProductIdAndQuantity,
  {}
> = async (data) => {
  const client = cartsClient();
  const headers = { action: "remove" };
  return await client.post(data, headers);
};

export const getCart: CartClientFunction<
  ProductIdAndQuantity[],
  { products: CartItem[] }
> = async (data) => {
  const client = cartsClient();
  const headers = { action: "get" };
  return await client.post(data, headers);
};
