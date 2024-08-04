"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/store/user";
import { loadUser } from "@/utils/syncUser";

export interface UserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const userContext = createContext<UserContext | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    try {
      setUser(loadUser());
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
