import { Cart } from "@/types/store/cart";
import { mergeCart as mergeCartService } from "@/service/cart";

export const mergeCart = async (
  cartId: string,
  cart: Cart,
  changeCart: (cart: Cart) => void,
) => {
  const products = cart.products.map(({ productId, quantity }) => ({
    productId,
    quantity,
  }));
  await mergeCartService(cartId, products);
  const newCart = { ...cart, cartId };
  changeCart(newCart);
};
