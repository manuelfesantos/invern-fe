"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Cart, emptyCart } from "@/types/store/cart";

export interface CartContext {
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
}

export const cartContext = createContext<CartContext | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(emptyCart);
  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}
