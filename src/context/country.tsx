"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Country } from "@/types/store/country";

export interface CountryContext {
  country: Country | null;
  setCountry: Dispatch<SetStateAction<Country | null>>;
  countryIsValid: boolean;
  setCountryIsValid: Dispatch<SetStateAction<boolean>>;
}

export const countryContext = createContext<CountryContext | null>(null);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<Country | null>(null);
  const [countryIsValid, setCountryIsValid] = useState(true);

  return (
    <countryContext.Provider
      value={{ country, setCountry, countryIsValid, setCountryIsValid }}
    >
      {children}
    </countryContext.Provider>
  );
}
