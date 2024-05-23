'use client'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
  } from "react";
  import { WishList } from "@/types/store/wishList";

export interface WishListContext {
  wishList: WishList;
  setWishList: Dispatch<SetStateAction<WishList>>;
}

export const wishListContext = createContext<WishListContext | null>(null);

export function WishListProvider({ children }: { children: ReactNode }) {
  const [wishList, setWishList] = useState<WishList>({
    products: [],
  });

  return (
    <wishListContext.Provider value={{ wishList, setWishList }}>
      {children}
    </wishListContext.Provider>
  );
}