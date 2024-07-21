import { Cart } from "@/types/store/cart";

export const loadCart = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    if (cart) {
      console.log("loading cart from local storage:", cart);
      return JSON.parse(cart);
    }
    console.log("no cart found on local storage. Initializing an empty cart");
    return {
      id: "0",
      items: [],
    };
  }
  return {
    id: "0",
    items: [],
  };
};

export const syncCart = (cart: Cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
