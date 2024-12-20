import { CartItem } from "@/types/store/cart";
import { Cart } from "@/types/store/cart";
import { addToCart as addToCartService } from "@/service/cart";
import {
  addProductToCart,
  cartContainsProduct,
  increaseProductQuantity,
} from "@/utils/cart/utils";

export const addToCart = async (
  product: CartItem,
  cart: Cart,
  changeCart: (cart: Cart) => void,
  loggedIn?: boolean,
) => {
  addToCartContext(cart, product, changeCart);

  if (loggedIn) {
    return await addToCartService({
      id: product.id,
      quantity: product.quantity,
    });
  }
  return [undefined, undefined];
};

const addToCartContext = (
  cart: Cart,
  product: CartItem,
  changeCart: (cart: Cart) => void,
) => {
  const newCart = cartContainsProduct(cart, product.id)
    ? increaseProductQuantity(cart, product.id, product.quantity)
    : addProductToCart(cart, product);

  changeCart(newCart);
};
