import { Cart } from "@/types/store/cart";

const emptyCart = {
  cartId: "",
  products: [],
};

export const loadCart = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const parsedCart = JSON.parse(cart);
      if (!parsedCart.products) {
        localStorage.setItem("cart", JSON.stringify(emptyCart));
        return emptyCart;
      }
      return JSON.parse(cart);
    }
    localStorage.setItem("cart", JSON.stringify(emptyCart));
    return emptyCart;
  }
  return emptyCart;
};

export const syncCart = (cart: Cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
