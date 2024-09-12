import { ProductIdAndQuantity } from "@/types/store/product";
import { Cart } from "@/types/store/cart";
import {
  decreaseProductQuantity,
  removeProductFromCart,
  getProductFromCart,
} from "@/utils/cart/utils";
import { removeFromCart as removeFromCartService } from "@/service/cart";

export const removeFromCart = async (
  cart: Cart,
  product: ProductIdAndQuantity,
  changeCart: (cart: Cart) => void,
  loggedIn?: boolean,
) => {
  const { productId, quantity } = product;
  removeFromCartContext(cart, productId, quantity, changeCart);
  if (loggedIn) {
    return await removeFromCartService({
      productId,
      quantity,
    });
  }
  return [undefined, undefined];
};

const removeFromCartContext = (
  cart: Cart,
  productId: string,
  quantity: number,
  changeCart: (cart: Cart) => void,
) => {
  const product = getProductFromCart(cart, productId);

  if (!product) return;

  let newCart: Cart;

  if (quantity >= product.quantity) {
    newCart = removeProductFromCart(cart, productId);
  } else {
    newCart = decreaseProductQuantity(cart, productId, quantity);
  }

  changeCart(newCart);
};
