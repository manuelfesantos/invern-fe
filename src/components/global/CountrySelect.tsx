"use client";

import { CountryContext, countryContext } from "@/context/country";
import { Context, useContext } from "react";
import { configContext, ConfigContext } from "@/context/config";
import { Country } from "@/types/store/country";

const CountrySelect = () => {
  const { country, setCountry } = useContext(
    countryContext as Context<CountryContext>,
  );
  const { availableCountries } = useContext(
    configContext as Context<ConfigContext>,
  );
  return (
    <select
      id="select"
      className="hidden lg:block bg-[#4C4B48] text-white px-2"
      onChange={(e) => {
        const country = availableCountries.find(
          (country) => country.code === e.target.value,
        );
        setCountry(country!);
        console.log("country", country);
        localStorage.setItem("country", e.target.value);
      }}
    >
      {availableCountries.map((selectedCountry: Country) => (
        <option
          key={selectedCountry.code}
          value={selectedCountry.code}
          selected={selectedCountry.code === country?.code}
        >
          {selectedCountry.code.toLowerCase()}
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;
