"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { userContext, UserContext } from "@/context/user";
import { cartContext, CartContext } from "@/context/cart";
import { CountryContext, countryContext } from "@/context/country";
import { Country, validCountries } from "@/types/store/country";
import { getConfig } from "@/service/config";
import { User } from "@/types/store/user";
import { Cart, emptyCart } from "@/types/store/cart";

export type ConfigContext = {
  configIsLoaded: boolean;
};

export const configContext = createContext<ConfigContext>({
  configIsLoaded: false,
});

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [configIsLoaded, setConfigIsLoaded] = useState(false);
  const { setUser } = useContext(userContext) as UserContext;
  const { setCart } = useContext(cartContext) as CartContext;
  const { setCountry, setCountryIsValid } = useContext(
    countryContext,
  ) as CountryContext;

  const getCountryData = async (): Promise<Country[]> => {
    const countryResponse = await fetch(
      `${process.env.NEXT_PUBLIC_COUNTRIES_BUCKET}`,
      {
        ...(process.env.NEXT_PUBLIC_ENV === "local" && {
          headers: {
            [`${process.env.NEXT_PUBLIC_BFF_ID_KEY}`]: `${process.env.NEXT_PUBLIC_BFF_ID_VALUE}`,
            [`${process.env.NEXT_PUBLIC_BFF_SECRET_KEY}`]: `${process.env.NEXT_PUBLIC_BFF_SECRET_VALUE}`,
          },
        }),
      },
    );
    if (countryResponse.status !== 200) {
      console.log("Failed to fetch countries");
      return [];
    }
    const countryData = await countryResponse.json();
    return countryData.data;
  };

  const getCountryFromCountryCode = (
    countryCode: string,
    countryData: Country[],
  ): Country | undefined =>
    countryData.find((country) => country.code === countryCode);

  const getStoredCountryCode = (countryData: Country[]): string | undefined => {
    const storedCountryCode = localStorage.getItem("country");
    if (storedCountryCode && validCountries.includes(storedCountryCode)) {
      const country = getCountryFromCountryCode(storedCountryCode, countryData);
      if (country) {
        setCountry(country);
        return storedCountryCode;
      }
    }
    setCountryIsValid(false);
    localStorage.removeItem("country");
  };

  const getStoredUser = (): User | undefined => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : undefined;
    if (parsedUser) {
      setUser(parsedUser);
      return parsedUser;
    }
  };

  const getStoredCart = (): Cart | undefined => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : null;
    if (parsedCart && parsedCart.products) {
      setCart(parsedCart);
      return parsedCart;
    }
    setCart(emptyCart);
    localStorage.setItem("cart", JSON.stringify(emptyCart));
  };

  const getConfigData = async (
    countryData: Country[],
    storedCountryCode?: string,
    storedUser?: User,
  ) => {
    const remember = localStorage.getItem("remember");
    const [error, config] = await getConfig(
      storedCountryCode,
      storedUser?.version ?? undefined,
      remember === "true",
    );

    if (error) {
      console.error("error getting config from backend:", error);
      return;
    }

    const { country: countryCode, user, deleteUser } = config ?? {};

    if (countryCode) {
      if (validCountries.includes(countryCode)) {
        const country = getCountryFromCountryCode(countryCode, countryData);
        if (country) {
          localStorage.setItem("country", countryCode);
          setCountry(country);
        }
      } else {
        setCountryIsValid(false);
      }
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      localStorage.setItem("cart", JSON.stringify(user.cart));
      setCart(user.cart);
    }

    if (deleteUser) {
      localStorage.removeItem("user");
      localStorage.removeItem("remember");
      localStorage.setItem("cart", JSON.stringify(emptyCart));
      setCart(emptyCart);
      setUser(null);
    }
  };

  useEffect(() => {
    const initConfig = async () => {
      const countryData = await getCountryData();
      const storedCountryCode = getStoredCountryCode(countryData);
      const storedUser = getStoredUser();
      getStoredCart();
      await getConfigData(countryData, storedCountryCode, storedUser);
      setConfigIsLoaded(true);
    };
    initConfig();
  }, []);

  return (
    <configContext.Provider value={{ configIsLoaded }}>
      {children}
    </configContext.Provider>
  );
};
