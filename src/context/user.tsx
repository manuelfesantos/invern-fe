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
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const userContext = createContext<UserContext | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
  <userContext.Provider value={{ user, setUser }}>
    {children}
  </userContext.Provider>
  );
}