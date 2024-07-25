import { Cart } from "@/types/store/cart";

export const changeCartFunction = (setCart: (cart: Cart) => void) => {
  return (cart: Cart) => {
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };
};
