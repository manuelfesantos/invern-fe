import { Cart, CartItem } from "@/types/store/cart";
import { addToCart } from "@/utils/cart/add-to-cart";
import { mergeCart } from "@/utils/cart/merge-cart";
import { removeFromCart } from "@/utils/cart/remove-from-cart";
import { changeCartFunction } from "@/utils/cart/change-cart-function";

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
  cartId,
  setQuantity,
}: {
  products: CartItem[];
  cart: Cart;
  setCart: (cart: Cart) => void;
  action: ActionType;
  cartId: string;
  setQuantity?: (quantity: number) => void;
}) => {
  if (setQuantity) setQuantity(1);
  const changeCart = changeCartFunction(setCart);
  switch (action) {
    case ActionType.ADD:
      return await addToCart(products[0], cart, changeCart);
    case ActionType.REMOVE:
      return await removeFromCart(cart, products[0], changeCart);
    case ActionType.MERGE:
      return await mergeCart(cartId, cart, changeCart);
  }
};
