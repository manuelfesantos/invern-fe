"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Cart } from "@/types/store/cart";
import { loadCart } from "@/utils/syncCart";

export interface CartContext {
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
}

export const cartContext = createContext<CartContext | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    id: "0",
    items: [],
  });
  useEffect(() => {
    setCart(loadCart());
  }, []);
  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}
