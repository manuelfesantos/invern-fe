import { ProductIdAndQuantity } from "@/types/store/product";
import { Cart } from "@/types/store/cart";
import {
  decreaseProductQuantity,
  removeProductFromCart,
  getProductFromCart,
  cartExistsInBackend,
} from "@/utils/cart/utils";
import { removeFromCart as removeFromCartService } from "@/service/cart";

export const removeFromCart = async (
  cart: Cart,
  product: ProductIdAndQuantity,
  changeCart: (cart: Cart) => void,
) => {
  const { productId, quantity } = product;
  removeFromCartContext(cart, productId, quantity, changeCart);
  if (cartExistsInBackend(cart)) {
    await removeFromCartService(cart.cartId, {
      productId,
      quantity,
    });
  }
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
