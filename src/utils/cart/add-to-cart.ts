import { CartItem } from "@/types/store/cart";
import { Cart } from "@/types/store/cart";
import { addToCart as addToCartService } from "@/service/cart";
import {
  addProductToCart,
  cartContainsProduct,
  cartExistsInBackend,
  increaseProductQuantity,
} from "@/utils/cart/utils";

export const addToCart = async (
  product: CartItem,
  cart: Cart,
  changeCart: (cart: Cart) => void,
) => {
  addToCartContext(cart, product, changeCart);

  if (cartExistsInBackend(cart)) {
    await addToCartService(cart.cartId, {
      productId: product.productId,
      quantity: product.quantity,
    });
  }
};

const addToCartContext = (
  cart: Cart,
  product: CartItem,
  changeCart: (cart: Cart) => void,
) => {
  const newCart = cartContainsProduct(cart, product.productId)
    ? increaseProductQuantity(cart, product.productId, product.quantity)
    : addProductToCart(cart, product);

  changeCart(newCart);
};
