import { backendClient } from "@/service/backend-client";
import { ProductIdAndQuantity } from "@/types/store/product";
import { handleError } from "@/utils/error";
const checkoutEndpoint = "checkout";

const checkoutClient = {
  post: (queryParams?: Record<string, string>) =>
    backendClient.post(checkoutEndpoint, undefined, queryParams),
};

export const checkout = (
  products?: ProductIdAndQuantity[],
): Promise<[string | undefined, { url: string } | undefined]> => {
  const client = checkoutClient.post();
  return client({ products });
};
