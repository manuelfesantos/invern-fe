"use client";
import {
  Context,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/store/user";
import { loadUser } from "@/utils/syncUser";
import { cartContext, CartContext } from "@/context/cart";

export interface UserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const userContext = createContext<UserContext | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { setCart } = useContext<CartContext>(
    cartContext as Context<CartContext>,
  );
  useEffect(() => {
    const initUser = async () => {
      try {
        setUser(await loadUser(setCart));
      } catch (error) {
        console.error(error);
      }
    };
    initUser();
  }, []);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
