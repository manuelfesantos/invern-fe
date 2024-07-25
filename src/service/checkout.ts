import { backendClient } from "@/service/backend-client";
import { ProductIdAndQuantity } from "@/types/store/product";
import { handleError } from "@/utils/error";
const checkoutEndpoint = "checkout";

const checkoutClient = {
  post: (queryParams?: Record<string, string>) =>
    backendClient.post(checkoutEndpoint, undefined, queryParams),
};

export const checkoutService = (
  products?: ProductIdAndQuantity[],
  cartId?: string,
) => {
  const client = checkoutClient.post();
  const headers = cartId ? { cartId } : undefined;
  try {
    return client({ products }, headers);
  } catch (error) {
    handleError(error);
  }
};
