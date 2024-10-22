import { backendClient } from "@/service/backend-client";
import { ProductIdAndQuantity } from "@/types/store/product";
const checkoutEndpoint = "checkout";

const checkoutClient = (params?: Record<string, string>) => ({
  post: backendClient.post(checkoutEndpoint, undefined, params),
});

export const checkout = (
  products?: ProductIdAndQuantity[],
  countryCode?: string,
): Promise<[string | undefined, { url: string } | undefined]> => {
  const client = checkoutClient();
  return client.post({ products, countryCode });
};
