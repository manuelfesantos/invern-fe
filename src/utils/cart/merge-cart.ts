import { Cart } from "@/types/store/cart";
import { mergeCart as mergeCartService } from "@/service/cart";

export const mergeCart = async (cart: Cart) => {
  const products = cart.products.map(({ id, quantity }) => ({
    id,
    quantity,
  }));
  return await mergeCartService(products);
};
