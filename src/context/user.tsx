'use client'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
  } from "react";
  import { User } from "@/types/store/user";

export interface UserContext {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const userContext = createContext<UserContext | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    version: 0,
    cart: {
        id: 0,
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
      },
    orders: [],
  });

  return (
  <userContext.Provider value={{ user, setUser }}>
    {children}
  </userContext.Provider>
  );
}