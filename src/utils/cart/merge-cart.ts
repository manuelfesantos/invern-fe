import { Cart } from "@/types/store/cart";
import { mergeCart as mergeCartService } from "@/service/cart";

export const mergeCart = async (cart: Cart) => {
  const products = cart.products.map(({ productId, quantity }) => ({
    productId,
    quantity,
  }));
  return await mergeCartService(products);
};
