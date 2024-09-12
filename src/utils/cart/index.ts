import { Cart, CartItem } from "@/types/store/cart";
import { addToCart } from "@/utils/cart/add-to-cart";
import { mergeCart } from "@/utils/cart/merge-cart";
import { removeFromCart } from "@/utils/cart/remove-from-cart";
import { changeCartFunction } from "@/utils/cart/change-cart-function";
import { removeCheckoutUrl } from "@/utils/checkout-url";

export enum ActionType {
  ADD = "add",
  REMOVE = "remove",
  MERGE = "merge",
}

export const updateCart = async ({
  products,
  cart,
  setCart,
  action,
  setQuantity,
  loggedIn,
}: {
  products: CartItem[];
  cart: Cart;
  setCart: (cart: Cart) => void;
  action: ActionType;
  setQuantity?: (quantity: number) => void;
  loggedIn?: boolean;
}) => {
  removeCheckoutUrl();
  if (setQuantity) setQuantity(1);
  const changeCart = changeCartFunction(setCart);
  switch (action) {
    case ActionType.ADD:
      return await addToCart(products[0], cart, changeCart, loggedIn);
    case ActionType.REMOVE:
      return await removeFromCart(cart, products[0], changeCart, loggedIn);
    case ActionType.MERGE:
      return await mergeCart(cart);
  }
};
