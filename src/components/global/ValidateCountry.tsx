"use client";
import { CountryContext, countryContext } from "@/context/country";
import { Context, useContext } from "react";
import { ConfigContext, configContext } from "@/context/config";
import { Country } from "@/types/store/country";
import { CustomLink } from "@/components/custom/CustomLink";

const ValidateCountry = () => {
  const { countryIsValid, setCountryIsValid, setCountry, invalidCountryName } =
    useContext(countryContext as Context<CountryContext>);
  const { availableCountries } = useContext(
    configContext as Context<ConfigContext>,
  );
  if (countryIsValid) {
    return;
  }

  const handleClick = (country: Country) => {
    setCountry(country);
    setCountryIsValid(true);
    localStorage.setItem("country", country.code);
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="w-full h-full lg:w-1/2 lg:h-1/2 flex flex-col items-center justify-center text-center px-2">
        <p>{`We're sorry, but we don't ship to ${invalidCountryName || "your country"}.`}</p>
        <p>Please select one of the available countries below:</p>
        {availableCountries.map((country) => (
          <CustomLink
            href={"#"}
            key={country.code}
            onClick={() => handleClick(country)}
          >
            {country.name}
          </CustomLink>
        ))}
      </div>
    </div>
  );
};

export default ValidateCountry;
